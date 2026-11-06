import { useEffect, useRef, useState, type ReactNode } from 'react';

export type SceneFallbackKind = 'galaxy' | 'nebula' | 'attractor' | 'stylized';

interface SceneCanvasProps {
  /** data-testid 与 aria-label 基名 */
  kind: SceneFallbackKind;
  label: string;
  /** three 渲染器构造函数：返回 dispose 回调；抛错/不支持则走降级 */
  init: (canvas: HTMLCanvasElement) => () => void;
  children?: ReactNode;
}

/**
 * 场景统一容器：
 * - 挂载后尝试 init(canvas)；失败（无 WebGL/WebGPU、上下文丢失）自动降级
 * - 卸载时 dispose，防 GPU 资源泄漏
 * - prefers-reduced-motion 已由 useDeviceTier 上游拦截，此处不重复
 */
export function SceneCanvas({ kind, label, init, children }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    try {
      dispose = init(canvas);
    } catch {
      setFailed(true);
    }
    return () => dispose?.();
  }, [init]);

  if (failed) {
    return (
      <div
        data-testid={`scene-${kind}`}
        aria-label={label}
        className="absolute inset-0 bg-gradient-to-b from-panel via-void to-void"
      >
        {children}
      </div>
    );
  }

  return (
    <div data-testid={`scene-${kind}`} aria-label={label} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {children}
    </div>
  );
}
