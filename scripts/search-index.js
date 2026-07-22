const { stripHTML } = require("hexo-util");

function normalizeContent(value) {
  return stripHTML(String(value || ""))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(path) {
  const cleanPath = String(path || "")
    .replace(/index\.html$/, "")
    .replace(/^\/+/, "");
  return `${hexo.config.root}${cleanPath}`;
}

hexo.extend.generator.register(
  "search-index",
  function generateSearchIndex(locals) {
    const posts = locals.posts.toArray();
    const pages = locals.pages
      .toArray()
      .filter(
        (page) =>
          page.noindex !== true &&
          page.layout !== "search" &&
          page.layout !== "404" &&
          page.layout !== "index" &&
          page.layout !== "product",
      );
    const products = locals.pages
      .toArray()
      .filter((page) => page.layout === "product" && page.published !== false);

    const records = [...products, ...posts, ...pages].map((item) => ({
      title: item.title || "",
      url: normalizeUrl(item.path),
      type:
        item.layout === "product"
          ? "茶品"
          : item.layout === "post"
            ? "文章"
            : "栏目",
      description: item.description || item.summary || "",
      content: normalizeContent(item.content).slice(0, 1200),
    }));

    return {
      path: "search-index.json",
      data: JSON.stringify(records),
    };
  },
);
