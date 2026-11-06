'use client';

import { useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from './SceneCanvas';

/**
 * 神经风格化渲染（Art 板块 Hero）
 * - 流动 UV 扭曲 + 双色调映射（奎英色板风格的神经迁移观感）
 * - 细胞噪声域扭曲模拟"风格纹理"迁移到几何形体上
 * - 视觉语义：像素/概率场 → 艺术笔触
 */
const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 uRes;
  uniform float uTime;
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  // 细胞噪声（F1）
  float cells(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float d = 8.0;
    for (int y = -1; y <= 1; y++)
      for (int x = -1; x <= 1; x++) {
        vec2 g = vec2(float(x), float(y));
        vec2 o = hash2(i + g);
        d = min(d, length(g + o - f));
      }
    return d;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;
    // 域扭曲（神经风格迁移的"笔触感"）
    vec2 q = vec2(cells(uv * 3.0 + t), cells(uv * 3.0 - t + 5.2));
    vec2 r = vec2(cells(uv * 3.0 + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                  cells(uv * 3.0 + 4.0 * q + vec2(8.3, 2.8) - 0.126 * t));
    float f = cells(uv * 3.0 + 4.0 * r);

    // 洋红-粉-深紫奎英式色板
    vec3 c1 = vec3(0.04, 0.02, 0.10);
    vec3 c2 = vec3(0.49, 0.36, 1.0);
    vec3 c3 = vec3(1.0, 0.31, 0.81);
    vec3 col = mix(c1, c2, clamp(f * f * 2.2, 0.0, 1.0));
    col = mix(col, c3, clamp(length(q) * 0.55, 0.0, 1.0));
    // 流光
    col += c3 * 0.25 * smoothstep(0.48, 0.5, f) * (0.5 + 0.5 * sin(t * 6.0 + f * 10.0));
    col = pow(col, vec3(0.9));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function initStylized(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  const scene = new THREE.Scene();
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

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
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

export function StylizedScene() {
  const init = useCallback(initStylized, []);
  const fallback = useMemo(
    () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#241031_0%,#0a0a0f_70%)]" />,
    [],
  );
  return (
    <SceneCanvas kind="stylized" label="风格化渲染" init={init}>
      {fallback}
    </SceneCanvas>
  );
}
