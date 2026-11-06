import { describe, it, expect } from 'vitest';
import { CATEGORIES, projects, PROFILE } from './projects';

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

  it('真实项目必须带 GitHub 仓库链接', () => {
    for (const p of projects) {
      expect(p.repo).toMatch(/^https:\/\/github\.com\/1020847665\//);
    }
  });

  it('项目标注不再为演示占位', () => {
    for (const p of projects) {
      expect(p.demo).toBe(false);
    }
  });

  it('每个分类至少有 1 个项目，art 分类允许暂缺（真实内容不足时不造假）', () => {
    for (const c of CATEGORIES) {
      if (c.id === 'art') continue; // 真实仓库无对应项目，不强凑
      expect(projects.some((p) => p.category === c.id)).toBe(true);
    }
  });
});

describe('个人资料', () => {
  it('包含真实邮箱（GitHub 公开资料邮箱）', () => {
    expect(PROFILE.email).toBe('1020847665@qq.com');
  });

  it('包含 GitHub 主页链接', () => {
    expect(PROFILE.github).toBe('https://github.com/1020847665');
  });
});
