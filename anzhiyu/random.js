var posts=["2026/07/11/blog-setup/","2026/07/11/project-roadmap/","2026/07/11/github-pages-domain/","2026/07/11/theme-notes/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };