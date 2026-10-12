
(function(){
  function initCarousel(root){
    var track = root.querySelector('.t-track');
    var slides = root.querySelectorAll('.t-slide');
    var dots = root.querySelectorAll('.t-dot');
    var prev = root.querySelector('.t-prev');
    var next = root.querySelector('.t-next');
    if(!track || !slides.length) return;
    var i = 0, n = slides.length;
    function go(target){
      i = ((target % n) + n) % n;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      dots.forEach(function(d, idx){ d.classList.toggle('active', idx === i); });
    }
    prev && prev.addEventListener('click', function(){ go(i - 1); });
    next && next.addEventListener('click', function(){ go(i + 1); });
    dots.forEach(function(d, idx){
      d.addEventListener('click', function(){ go(idx); });
    });
    // Basic touch / drag support
    var startX = null, dx = 0;
    track.addEventListener('touchstart', function(e){
      startX = e.touches[0].clientX; dx = 0;
    }, {passive:true});
    track.addEventListener('touchmove', function(e){
      if(startX === null) return;
      dx = e.touches[0].clientX - startX;
    }, {passive:true});
    track.addEventListener('touchend', function(){
      if(startX === null) return;
      if(Math.abs(dx) > 40){ go(i + (dx < 0 ? 1 : -1)); }
      startX = null; dx = 0;
    });
  }
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function(){
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });
})();
