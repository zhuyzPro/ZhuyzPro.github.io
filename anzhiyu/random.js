var posts=["2026/07/16/project-notes-template/","2026/07/16/site-initialized/","2026/07/16/writing-template/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };