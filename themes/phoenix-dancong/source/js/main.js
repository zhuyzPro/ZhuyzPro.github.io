(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");

  toggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("phoenix-dancong-theme", next);
    } catch (error) {}
  });

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navToggle.setAttribute(
      "aria-label",
      expanded ? "展开主导航" : "收起主导航",
    );
    header?.classList.toggle("is-nav-open", !expanded);
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.setAttribute("aria-expanded", "false");
      header?.classList.remove("is-nav-open");
    });
  });
})();
