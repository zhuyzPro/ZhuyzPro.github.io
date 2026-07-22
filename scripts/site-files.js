function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIsoDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

hexo.extend.generator.register(
  "site-files",
  function generateSiteFiles(locals) {
    const baseUrl = String(hexo.config.url || "").replace(/\/+$/, "");
    const entries = [
      {
        path: "",
        updated: new Date(),
      },
      ...locals.posts.toArray(),
      ...locals.pages
        .toArray()
        .filter(
          (page) =>
            page.noindex !== true &&
            page.layout !== "404" &&
            page.layout !== "index",
        ),
    ];

    const seen = new Set();
    const urls = entries
      .filter((entry) => entry.published !== false)
      .map((entry) => {
        const path = String(entry.path || "")
          .replace(/index\.html$/, "")
          .replace(/^\/+/, "");
        const location = path ? `${baseUrl}/${path}` : `${baseUrl}/`;
        if (seen.has(location)) return "";
        seen.add(location);

        const lastmod = toIsoDate(entry.updated || entry.date);
        return [
          "  <url>",
          `    <loc>${escapeXml(location)}</loc>`,
          lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
          "  </url>",
        ]
          .filter(Boolean)
          .join("\n");
      })
      .filter(Boolean)
      .join("\n");

    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urls,
      "</urlset>",
    ].join("\n");

    const robots = [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${baseUrl}/sitemap.xml`,
      "",
    ].join("\n");

    return [
      { path: "sitemap.xml", data: sitemap },
      { path: "robots.txt", data: robots },
    ];
  },
);
