# 凤凰单枞站点维护与发布指南

## 1. 项目基线

- 本地目录：`C:\Users\Anderson\Desktop\凤凰单枞博客`
- GitHub：`https://github.com/zhuyzPro/ZhuyzPro.github.io.git`
- 正式域名：`https://zhuyz.cloud/`
- 分支：`main`
- 技术：Hexo 8、自定义 EJS 主题、GitHub Actions、GitHub Pages

项目已经初始化，不再执行“新建仓库”“改用默认 github.io 域名”或“重新创建 Hexo 项目”等流程。

## 2. 功能边界

站点只承担：

- 凤凰单枞品牌与茶品展示
- 香型、产地、工艺和冲泡科普
- 茶知识文章
- 微信、邮箱等人工咨询引流

站点不实现：

- 在线支付、下单和结算
- 购物车、价格、库存和销量
- 会员、积分、订单和物流
- 访客资料数据库

## 3. 页面结构

| 路径          | 用途         |
| ------------- | ------------ |
| `/`           | 品牌首页     |
| `/products/`  | 茶品图鉴     |
| `/aromas/`    | 香型百科     |
| `/origins/`   | 产地与工艺   |
| `/brewing/`   | 冲泡指南     |
| `/knowledge/` | 茶知识文章   |
| `/contact/`   | 联系咨询     |
| `/search/`    | 静态站内搜索 |

## 4. 内容维护

### 新增文章

在 `source/_posts/` 新建 Markdown 文件，至少填写：

```yaml
---
title: 文章标题
slug: english-slug
date: 2026-07-22 12:00:00
updated: 2026-07-22 12:00:00
categories:
  - 茶知识
description: 用于列表和 SEO 的简短说明。
cover:
  src: /images/example.png
  alt: 图片内容说明
---
```

### 新增茶品

复制 `source/products/` 下已有批次目录，并更新：

- `product_id`
- 香型与品种数据引用
- 产地与公开片区
- 工艺和焙火
- 品鉴记录
- 冲泡参数
- 图片与资料依据

茶品页不得添加价格、购买按钮或库存状态。

### 更新联系方式

编辑 `source/_data/contact.yml`。只有确认有效的信息才应公开，避免保留演示电话、假微信号或无效二维码。

## 5. 本地验证

```bash
npm ci
npm run build
npm run dev
```

检查：

- 首页和全部栏目可以访问
- 移动导航可展开和收起
- 搜索页能返回茶品与文章
- 茶品页咨询编号正确
- `public/CNAME` 内容为 `zhuyz.cloud`
- `public/sitemap.xml` 和 `public/robots.txt` 已生成
- 页面没有横向滚动、图片缺失或控制台错误

## 6. GitHub Pages 发布

1. 提交源码到 `main`。
2. 推送到 `origin`。
3. 在仓库 `Settings -> Pages` 中选择 `GitHub Actions`。
4. 在 Pages 自定义域名中填写 `zhuyz.cloud`。
5. 等待部署工作流完成并检查 HTTPS。

部署工作流位于 `.github/workflows/deploy.yml`，发布目录固定为 `public/`。

## 7. 域名检查

站点源码已经包含 `source/CNAME`。DNS 记录需要在域名服务商处指向 GitHub Pages；DNS 和 GitHub Pages 的具体状态不由本地代码控制。

上线后至少检查：

```text
https://zhuyz.cloud/
https://zhuyz.cloud/products/
https://zhuyz.cloud/search/
https://zhuyz.cloud/sitemap.xml
https://zhuyz.cloud/robots.txt
```
