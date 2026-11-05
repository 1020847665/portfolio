import { describe, it, expect } from 'vitest';
import { CATEGORIES, projects } from './projects';

describe('项目数据', () => {
  it('定义恰好 4 个分类', () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual(['web', '3d', 'lab', 'art']);
  });

  it('每个分类有标题、路由与主题色', () => {
    for (const c of CATEGORIES) {
      expect(c.title.length).toBeGreaterThan(0);
      expect(c.route).toMatch(/^\/projects\//);
      expect(c.accent).toMatch(/^#/);
    }
  });

  it('项目必须有唯一 slug 且归属合法分类', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const valid = new Set(CATEGORIES.map((c) => c.id));
    for (const p of projects) {
      expect(valid.has(p.category)).toBe(true);
    }
  });

  it('演示内容被明确标注', () => {
    for (const p of projects) {
      expect(p.demo).toBe(true);
    }
  });

  it('每个分类至少有 1 个项目', () => {
    for (const c of CATEGORIES) {
      expect(projects.some((p) => p.category === c.id)).toBe(true);
    }
  });
});
