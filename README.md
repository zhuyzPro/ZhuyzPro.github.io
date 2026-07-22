# 凤凰单枞茶叶展示站

基于 Hexo 8 的静态品牌站，围绕凤凰单枞茶品、香型、凤凰山产地、采制工艺、冲泡方法和茶知识文章组织内容。

- 正式域名：`https://zhuyz.cloud/`
- GitHub 仓库：`https://github.com/zhuyzPro/ZhuyzPro.github.io.git`
- 部署方式：GitHub Actions + GitHub Pages
- 功能边界：只做品牌展示、内容科普与人工咨询引流，不提供在线支付、下单、购物车、会员、库存或订单功能

## 本地开发

```bash
npm ci
npm run dev
```

本地预览地址：

```text
http://localhost:4000/
```

生产构建：

```bash
npm run build
```

构建产物输出到 `public/`，同时生成：

- `search-index.json`：静态站内搜索索引
- `sitemap.xml`：站点地图
- `robots.txt`：搜索引擎抓取规则
- `CNAME`：GitHub Pages 自定义域名

## 目录

```text
source/                    页面、文章、茶品内容与图片
source/_data/              香型、产地、工艺、冲泡和联系方式数据
themes/phoenix-dancong/    自定义 Hexo 主题
scripts/                   Hexo helper、搜索索引和站点文件生成器
.github/workflows/         GitHub Pages 部署工作流
```

## 内容入口

- `source/products/`：茶品批次页
- `source/_posts/`：茶知识文章
- `source/_data/aromas.yml`：香型资料
- `source/_data/origins.yml`：行政产地
- `source/_data/sites.yml`：公开片区
- `source/_data/process.yml`：采制工艺
- `source/_data/brewing.yml`：冲泡参数
- `source/_data/contact.yml`：联系方式

## 发布

推送 `main` 分支后，`.github/workflows/deploy.yml` 会执行 `npm ci`、`npm run build` 并将 `public/` 部署到 GitHub Pages。

GitHub 仓库的 Pages 设置需要使用 `GitHub Actions`。自定义域名固定为 `zhuyz.cloud`，不要改回默认 `github.io` 作为正式访问地址。

## 上线前确认

- 确认 `hello@zhuyz.cloud` 已可正常收信。
- 在 `source/_data/contact.yml` 中补充真实微信号和二维码。
- 用真实茶品图片和可公开批次资料替换演示内容。
- 检查域名 DNS、Pages 自定义域名和 HTTPS 状态。
