---
title: 从手写 HTML 到 Hexo：给博客换一套引擎
date: 2026-10-26 15:00:00
updated: 2026-10-26 15:30:00
description: 记录把纯手写 HTML/CSS 的博客迁移到 Hexo + Butterfly，并托管到 GitHub Pages 的全过程。
cover: /images/img1.jpg
categories:
  - 建站
tags:
  - Hexo
  - GitHub Pages
  - Butterfly
  - 前端
---

原来的博客是纯手写的 HTML + CSS：四个页面、一堆 `img` 标签、两个样式表。做课设够用，但想写一篇文章就得手改 HTML，照片墙多一张图就要复制一段标签，越用越别扭。

这次把它换成 Hexo：内容写 Markdown，页面结构交给模板，照片按目录管理，搜索、标签、归档、目录全部自带。

<!-- more -->

## 为什么要换

- **写文章的成本**：以前写点东西要打开 HTML 手排段落、加 `<br>`；现在只写 Markdown。
- **内容与样式耦合**：以前所有卡片和照片都硬编码在页面里，改一次样式要翻四个文件。
- **想要的能力**：标签分类、归档、站内搜索、文章目录、代码高亮、深色模式——这些重新手写一遍不现实。

## 换了什么

| 项目 | 原来 | 现在 |
| --- | --- | --- |
| 内容载体 | 手写 HTML | Markdown |
| 页面模板 | 手写 | Butterfly 主题 |
| 图片管理 | `photos/` 手写标签 | `source/images/` + 目录引用 |
| 站内搜索 | 无 | hexo-generator-searchdb 本地搜索 |
| 部署 | 手动拷贝 | GitHub Actions 自动构建 |

## 保留了原来的视觉

主题色沿用了之前那套藏青 + 蓝紫：主色 `#4169E1`，hover 用 `#000080`，配薰衣草紫的浅底。照片墙的网格样式单独写在 `source/css/custom.css` 里，通过 Butterfly 的 `inject` 注入，不污染主题文件。

## 部署方式

源文件推送到 GitHub，仓库里放一个 GitHub Actions 工作流：每次 push 自动 `npm install` → `hexo generate` → 发布到 Pages。本地不用装环境也能更新，改完 push 就上线。

```yaml
- run: npm install
- run: npx hexo generate
- uses: actions/upload-pages-artifact@v3
  with:
    path: ./public
```

## 踩到的坑

1. **Markdown 里的 HTML 块不会被解析**：照片墙用 `<div class="photo-grid">` 包起来之后，里面的 `##` 标题就不再生效了，得直接写 `<h2>`。
2. **图片体积**：原始照片加起来接近 9MB，直接推上去首页会拖慢，统一压到 1400px 宽、质量 82 之后再上传。
3. **Pages 来源要选 Actions**：仓库 Settings → Pages → Build and deployment 选 "GitHub Actions"，否则推上去只有源码没有站点。
4. **中文文件名**：之前照片叫「红色7.jpg」「幻灯片12.png」，迁移时全改成 `red-story-07.jpg`、`career-04.png` 这类 ASCII 名字，避免 URL 编码问题。

## 下一步

- 把大学履历里的活动照片补齐说明
- 把 HarmonyOS 和 Hi3861 这两个项目的开发记录整理成系列文章
- 继续挂着阅读与写作的习惯，别再让博客变成一张静态名片
