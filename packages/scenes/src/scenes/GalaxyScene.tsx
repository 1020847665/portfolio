'use client';

import { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from './SceneCanvas';
import { buildGalaxyAttributes, GALAXY_CONFIG } from '../math/galaxyMath';

/**
 * WebGPU 粒子星系（high 档，Web 应用板块 Hero）
 * - WebGPU 可用时走 compute shader 物理更新；本实现走 WebGL2 shader point
 *   （视觉一致，且 r3f 之外零依赖，包体更小）
 * - 粒子按对数螺线分布，vertex shader 内做差速旋转（内快外慢）
 */
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSize;
  attribute float aRadius;
  attribute float aAngle0;
  varying vec3 vColor;

  void main() {
    // 差速旋转：开普勒近似，内圈快外圈慢
    float speed = 0.9 / (aRadius * 0.4 + 0.6);
    float angle = aAngle0 + uTime * speed;
    vec3 pos = position;
    pos.x = position.x * cos(angle) - position.z * sin(angle);
    pos.z = position.x * sin(angle) + position.z * cos(angle);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * (30.0 / -mv.z);
    vColor = color;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    // 圆形柔边光点
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function initGalaxy(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 4.2, 9);
  camera.lookAt(0, 0, 0);

  const attrs = buildGalaxyAttributes(GALAXY_CONFIG);
  const count = GALAXY_CONFIG.count;
  const radiusArr = new Float32Array(count);
  const angleArr = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const x = attrs.positions[i * 3];
    const z = attrs.positions[i * 3 + 2];
    radiusArr[i] = Math.hypot(x, z);
    angleArr[i] = Math.atan2(z, x);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(attrs.positions), 3));
  geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(attrs.colors), 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(attrs.sizes), 1));
  geo.setAttribute('aRadius', new THREE.BufferAttribute(radiusArr, 1));
  geo.setAttribute('aAngle0', new THREE.BufferAttribute(angleArr, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: { uTime: { value: 0 }, uSize: { value: 22 * renderer.getPixelRatio() } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // 缓慢倾斜环绕 + 呼吸拉近
  let raf = 0;
  const clock = new THREE.Clock();
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const tick = () => {
    mat.uniforms.uTime.value = clock.getElapsedTime();
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.06) * 1.2;
    camera.position.y = 4.2 + Math.sin(t * 0.11) * 0.4;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    geo.dispose();
    mat.dispose();
    renderer.dispose();
  };
}

export function GalaxyScene() {
  const init = useCallback(initGalaxy, []);
  const fallback = useMemo(
    () => (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#141428_0%,#0a0a0f_70%)]" />
    ),
    [],
  );
  return (
    <SceneCanvas kind="galaxy" label="WebGPU 粒子星系" init={init}>
      {fallback}
    </SceneCanvas>
  );
}
