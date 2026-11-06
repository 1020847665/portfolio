'use client';

import { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from './SceneCanvas';
import { buildAttractorPoints, LORENZ_PRESET } from '../math/attractorMath';

/**
 * GPGPU 混沌吸引子（Lab 板块 Hero）
 * - Lorenz 系统 RK4000 步积分 → 线性过滤粒子轨迹拖尾
 * - 相位着色：轨迹按进度从荧光绿 (#8dff6f) 渐入青 (#00e5ff)
 * - 三轴缓慢旋转展示蝴蝶结构
 */
function initAttractor(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 0, 90);

  // 积分 4000 步，归一化到视域
  const STEPS = 4000;
  const raw = buildAttractorPoints({ preset: LORENZ_PRESET, steps: STEPS, dt: 0.006, seed: 4242 });
  const positions = new Float32Array(STEPS * 3);
  const prog = new Float32Array(STEPS);
  const center = [0, 0, 25]; // Lorenz 吸引域中心
  const scale = 1.6;
  for (let i = 0; i < STEPS; i++) {
    positions[i * 3] = (raw[i * 3] - center[0]) * scale;
    positions[i * 3 + 1] = (raw[i * 3 + 2] - center[1]) * scale; // z→y 蝴蝶朝上
    positions[i * 3 + 2] = (raw[i * 3 + 1] - center[2]) * scale;
    prog[i] = i / STEPS;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aProgress', new THREE.BufferAttribute(prog, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      attribute float aProgress;
      varying float vP;
      void main() {
        vP = aProgress;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = 2.2;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vP;
      void main() {
        vec3 lime = vec3(0.55, 1.0, 0.44);
        vec3 cyan = vec3(0.0, 0.9, 1.0);
        vec3 col = mix(lime, cyan, vP);
        gl_FragColor = vec4(col, 0.85);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

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
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.18;
    points.rotation.x = Math.sin(t * 0.1) * 0.35;
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

export function AttractorScene() {
  const init = useCallback(initAttractor, []);
  const fallback = useMemo(
    () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d1f14_0%,#0a0a0f_70%)]" />,
    [],
  );
  return (
    <SceneCanvas kind="attractor" label="混沌吸引子" init={init}>
      {fallback}
    </SceneCanvas>
  );
}
