
(function () {
  var section = document.querySelector('.hero-signage');
  if (!section) return;
  var bgImg = getComputedStyle(section).backgroundImage;
  var slides = section.querySelectorAll('.hero-slide');
  var imgs = [
    bgImg,
    'url("/sites/ebersole/1a5e03a094f2fbba.jpg")',
    'url("/sites/ebersole/2e03ec4bc77d14dc.jpg")'
  ];
  slides.forEach(function (s, i) { s.style.backgroundImage = imgs[i]; });
  section.style.backgroundImage = 'none';

  var dotsWrap = document.createElement('div');
  dotsWrap.className = 'hero-dots';
  var current = 0;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); clearInterval(timer); timer = setInterval(next, 5000); });
    dotsWrap.appendChild(dot);
  });
  section.appendChild(dotsWrap);

  function goTo(n) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  function next() { goTo((current + 1) % slides.length); }
  var timer = setInterval(next, 5000);
})();
