var posts=["/posts/e140.html","/posts/136a.html","/posts/8105.html","/posts/340b.html","/posts/b228.html","/posts/40fd.html","/posts/4eb4.html","/posts/dfb3.html","/posts/d335.html","/posts/a76e.html","/posts/39a9.html","/posts/2594.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };