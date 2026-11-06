'use client';

import { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from './SceneCanvas';

/**
 * Ray Marching 体积星云（mid 档，3D/创意板块 Hero）
 * - 全屏 quad + fragment shader 光线步进，fbm 噪声云 + 双光源辉光
 * - 分辨率减半渲染再拉伸（mid 档性能预算）
 */
const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 uRes;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = (vUv * 2.0 - 1.0) * vec2(uRes.x / uRes.y, 1.0);
    vec3 ro = vec3(0.0, 0.0, -3.0);
    vec3 rd = normalize(vec3(uv * 0.9, 1.0));

    // 相机缓慢漂移
    float t = uTime * 0.05;
    ro.x += sin(t) * 0.3; ro.y += cos(t * 0.7) * 0.2;

    vec3 col = vec3(0.0);
    float transmittance = 1.0;
    float dist = 1.5;
    for (int i = 0; i < 48; i++) {
      if (transmittance < 0.02) break;
      vec3 p = ro + rd * dist;
      // 云域：中心球内
      float shell = length(p) - 2.2;
      if (shell < 0.3) {
        float dens = fbm(p * 1.4 + vec3(0.0, uTime * 0.08, 0.0)) - 0.45 - shell * 0.4;
        if (dens > 0.0) {
          // 双色调光源：青（左上）紫（右下）
          vec3 lightA = vec3(0.0, 0.9, 1.0);
          vec3 lightB = vec3(0.49, 0.36, 1.0);
          float ga = fbm(p * 2.0 + vec3(1.7, 9.2, 0.0));
          vec3 lc = mix(lightA, lightB, clamp(ga + 0.3, 0.0, 1.0));
          float a = dens * 0.22;
          col += lc * a * transmittance;
          transmittance *= (1.0 - a * 2.2);
        }
      }
      dist += 0.09;
    }
    // 辉光背景
    float glow = exp(-length(uv) * 1.6) * 0.35;
    col += vec3(0.16, 0.12, 0.35) * glow;
    col = pow(col, vec3(0.85)); // 轻微提亮暗部
    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function initNebula(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  const scene = new THREE.Scene();
  // 正交相机 + 全屏三角形
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = { uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 } };
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
  );
  geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  scene.add(new THREE.Mesh(geo, mat));

  // mid 档：半分辨率渲染
  const scale = 0.5;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(Math.max(w * scale, 1), Math.max(h * scale, 1), false);
    const size = renderer.getSize(new THREE.Vector2());
    uniforms.uRes.value.set(size.x, size.y);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  let raf = 0;
  const clock = new THREE.Clock();
  const tick = () => {
    uniforms.uTime.value = clock.getElapsedTime();
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

export function NebulaScene() {
  const init = useCallback(initNebula, []);
  const fallback = useMemo(
    () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1030_0%,#0a0a0f_70%)]" />,
    [],
  );
  return (
    <SceneCanvas kind="nebula" label="WebGL 星云" init={init}>
      {fallback}
    </SceneCanvas>
  );
}
