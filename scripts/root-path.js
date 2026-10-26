/**
 * 子路径适配：给根绝对路径自动补上站点 root 前缀
 *
 * 背景：仓库名为 XiaokangBlog 时，站点部署在 https://zhkb06.github.io/XiaokangBlog/，
 * 而 Markdown 里手写的 <img src="/images/xxx.jpg"> 是根路径，会指向域名根目录导致 404。
 *
 * 本脚本在 HTML 渲染完成后，把 src="/xxx"、href="/xxx" 这类根绝对路径补上 root 前缀。
 * 主题自身生成的链接已含前缀，会自动跳过，不会重复添加。
 * 当 root 为 / 时（例如换成用户主页仓库），脚本不做任何处理。
 */
'use strict';

hexo.extend.filter.register('after_render:html', function (str) {
  var root = hexo.config.root || '/';
  if (root === '/') return str;

  var marker = root.replace(/^\//, ''); // 例如 XiaokangBlog/

  return str.replace(/(\s(?:src|href)=")\/(?!\/)/g, function (match, prefix, offset, whole) {
    var rest = whole.slice(offset + prefix.length + 1);
    // 已经带了 root 前缀就跳过，避免出现 /XiaokangBlog/XiaokangBlog/
    if (rest.indexOf(marker) === 0) return match;
    return prefix + root;
  });
});
