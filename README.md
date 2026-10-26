# 小康博客（Hexo 版）

张康博的个人博客。Hexo 7 + Butterfly 5，内容用 Markdown 写，推送到 GitHub 后由 GitHub Actions 自动构建并发布到 GitHub Pages。

- 线上地址：https://zhkb06.github.io/XiaokangBlog/
- 本地预览：`npm run server` → http://localhost:4000

## 目录结构

```
XiaokangBlog-hexo/
├── _config.yml              站点配置（标题、网址、分页、搜索）
├── _config.butterfly.yml    主题配置（导航、配色、侧边栏、注入）
├── package.json             依赖与脚本
├── scaffolds/               新建文章/页面的模板
├── source/
│   ├── _posts/              文章（Markdown）
│   ├── _drafts/             草稿（不会被发布）
│   ├── about/               关于我（页面）
│   ├── experience/          大学履历（页面，含 8 组照片墙）
│   ├── tags/                标签页
│   ├── 404.md               404 页面
│   ├── css/custom.css       自定义样式（照片墙、信息表等）
│   └── images/              全站图片（photos/ 为履历照片）
├── scripts/root-path.js     子路径适配（自动补 /XiaokangBlog/ 前缀）
├── tools/optimize-one.js    图片压缩
└── .github/workflows/pages.yml  GitHub Actions 自动发布
```

## 本地开发

```bash
npm install          # 首次安装依赖
npm run server       # 本地预览 http://localhost:4000
npm run build        # 生成静态文件到 public/
```

## 写文章

```bash
npx hexo new post "文章标题"     # 生成 source/_posts/文章标题.md
npx hexo new draft "草稿标题"    # 草稿，写完用 npx hexo publish 发布
```

文章头部字段：

```yaml
---
title: 文章标题
date: 2026-10-26 15:00:00
description: 摘要（首页卡片和 SEO 用）
cover: /images/img1.jpg
categories: [建站]
tags: [Hexo, 前端]
---
```

正文里用 `<!-- more -->` 标记摘要截断位置。

## 图片

- 图片统一放在 `source/images/`，引用时写根路径：`/images/photos/sports-01.jpg`
- 新增照片后压缩一下：`node tools/optimize-one.js source/images/photos/xxx.jpg > tmp && mv tmp source/images/photos/xxx.jpg`
- 照片墙上加图片：编辑 `source/experience/index.md`，在对应分区里加一行 `<img src="/images/photos/xxx.jpg" alt="说明" loading="lazy">`

## 部署（GitHub Pages）

当前方案：**推送源码 → GitHub Actions 自动构建 → 发布到 Pages**。

1. 把本项目推到仓库 `zhkb06/XiaokangBlog`（main 分支）
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
3. 之后每次 `git push` 都会自动构建发布，约 1–2 分钟生效
4. 查看构建日志：仓库 **Actions** 页签

> 首次推送后若 Actions 报错 "Pages is not enabled"，就是第 2 步还没做。

## 备选部署方式（本地构建后手动发布）

如果更习惯本地发布：

1. `_config.yml` 里配置：
   ```yaml
   deploy:
     type: git
     repo: https://github.com/zhkb06/XiaokangBlog.git
     branch: gh-pages
   ```
2. 安装发布插件：`npm install hexo-deployer-git`
3. 执行 `npm run clean && npm run build && npm run deploy`

## 与原静态站的关系

上一版是手写 HTML 的静态站，位于同级目录 `XiaokangBlog/`（含 Git 历史与完整照片原图），保留作为备份与素材来源，不再更新。本目录是新的主线。

## 常见修改点

| 想改什么 | 改哪里 |
| --- | --- |
| 站点标题/副标题/网址 | `_config.yml` |
| 导航菜单 | `_config.butterfly.yml` → `menu` |
| 主题配色 | `_config.butterfly.yml` → `theme_color` |
| 头像、封面图 | `_config.butterfly.yml` → `avatar` / `cover` |
| 页脚联系信息 | `_config.butterfly.yml` → `footer.custom_text` |
| 照片墙样式 | `source/css/custom.css` |
| 关于我 / 大学履历 | `source/about/`、`source/experience/` |

## 注意

- 站点部署在**子路径** `/XiaokangBlog/` 下，`_config.yml` 的 `url` 与 `root` 必须和仓库名一致
- Markdown 里照常写根路径图片 `/images/xxx.jpg` 即可，`scripts/root-path.js` 会在渲染后自动补上 `root` 前缀
- 以后若改用 `<用户名>.github.io` 仓库或绑定自定义域名，只需把 `root` 改成 `/`，脚本会自动跳过
- `node_modules/`、`public/` 已在 `.gitignore` 中，不要提交
- 主题通过 npm 安装（`hexo-theme-butterfly`），不需要放在 `themes/` 目录
- 页脚含手机号，仓库为公开仓库时该信息会一并公开
