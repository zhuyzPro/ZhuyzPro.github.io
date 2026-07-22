document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("[data-search-form]");
  const input = document.querySelector("[data-search-input]");
  const meta = document.querySelector("[data-search-meta]");
  const results = document.querySelector("[data-search-results]");
  if (!form || !input || !meta || !results) return;

  let index = [];
  try {
    const response = await fetch("/search-index.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    index = await response.json();
  } catch {
    meta.textContent = "搜索索引暂时不可用，请稍后重试。";
    input.disabled = true;
    return;
  }

  function scoreRecord(record, query) {
    const title = String(record.title || "").toLowerCase();
    const description = String(record.description || "").toLowerCase();
    const content = String(record.content || "").toLowerCase();
    let score = 0;

    if (title === query) score += 80;
    if (title.includes(query)) score += 40;
    if (description.includes(query)) score += 18;
    if (content.includes(query)) score += 8;

    const terms = query.split(/\s+/).filter(Boolean);
    terms.forEach((term) => {
      if (title.includes(term)) score += 12;
      if (description.includes(term)) score += 5;
      if (content.includes(term)) score += 2;
    });

    return score;
  }

  function render(query) {
    const normalized = query.trim().toLowerCase();
    results.replaceChildren();

    if (!normalized) {
      meta.textContent = "输入关键词开始搜索。";
      return;
    }

    const matches = index
      .map((record) => ({
        ...record,
        score: scoreRecord(record, normalized),
      }))
      .filter((record) => record.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 12);

    meta.textContent = matches.length
      ? `找到 ${matches.length} 条相关内容`
      : "没有找到相关内容，可以尝试更短的关键词。";

    matches.forEach((record) => {
      const article = document.createElement("article");
      const tag = document.createElement("p");
      const title = document.createElement("h2");
      const link = document.createElement("a");
      const description = document.createElement("p");

      tag.className = "tag";
      tag.textContent = record.type;
      link.href = record.url;
      link.textContent = record.title;
      title.appendChild(link);
      description.textContent = record.description || "查看完整内容";
      article.append(tag, title, description);
      results.appendChild(article);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value;
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("q", query.trim());
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url);
    render(query);
  });

  const initialQuery =
    new URL(window.location.href).searchParams.get("q") || "";
  input.value = initialQuery;
  render(initialQuery);
});
