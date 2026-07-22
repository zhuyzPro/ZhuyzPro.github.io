document.addEventListener("DOMContentLoaded", () => {
  const output = document.querySelector("[data-contact-topic]");
  const data = document.querySelector("#consultation-topic-data");
  if (!output || !data) return;

  let allowedTopics = new Set(["general"]);
  try {
    const parsed = JSON.parse(data.textContent || "[]");
    if (Array.isArray(parsed)) allowedTopics = new Set(parsed);
  } catch {
    // 保留 general 降级值，不展示未验证参数。
  }

  const raw = new URL(window.location.href).searchParams.get("topic") || "";
  const validFormat = /^[a-zA-Z0-9-]{1,64}$/.test(raw);
  const topic = validFormat && allowedTopics.has(raw) ? raw : "general";
  output.textContent = `咨询编号：${topic}`;

  const email = document.querySelector("[data-contact-email]");
  if (email) {
    const address = email.dataset.email || "";
    const subject = encodeURIComponent(`凤凰单枞咨询 ${topic}`);
    email.href = `mailto:${address}?subject=${subject}`;
  }

  const copyButton = document.querySelector("[data-copy-topic]");
  const copyStatus = document.querySelector("[data-copy-topic-status]");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(topic);
      if (copyStatus) copyStatus.textContent = "咨询编号已复制";
    } catch {
      if (copyStatus) copyStatus.textContent = `复制失败，请手动复制：${topic}`;
    }
  });
});
