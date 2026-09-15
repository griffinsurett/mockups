// Menu toggle
(function initMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose  = document.querySelector(".menu-close");
  const navEl      = document.getElementById("top-nav");
  if (!menuToggle || !navEl) return;
  const navLinks = Array.from(navEl.querySelectorAll("a"));

  const setMenuState = (open) => {
    navEl.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open);
  };
  menuToggle.addEventListener("click", () => setMenuState(!navEl.classList.contains("open")));
  if (menuClose) menuClose.addEventListener("click", () => setMenuState(false));
  navEl.addEventListener("click", (e) => { if (e.target === navEl) setMenuState(false); });
  navLinks.forEach((l) => l.addEventListener("click", () => setMenuState(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenuState(false); });
})();

// Scroll compact
(function initScrollCompact() {
  const siteHeader = document.querySelector(".site-header");
  if (!siteHeader) return;
  const ENTER = 120;
  const EXIT = 40;
  let compact = false;
  let ticking = false;
  const getScrollY = () =>
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const update = () => {
    const scrollY = getScrollY();
    if (!compact && scrollY > ENTER) {
      compact = true;
      siteHeader.setAttribute("data-compact", "true");
    } else if (compact && scrollY < EXIT) {
      compact = false;
      siteHeader.removeAttribute("data-compact");
    }
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true });
  update();
})();

// Homepage background carousel
(function initHeroCarousel() {
  const carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
  const dots = Array.from(carousel.querySelectorAll(".hero-dot"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeIndex));
    dots.forEach((dot, i) => {
      const active = i === activeIndex;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!reducedMotion) timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };

  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    showSlide(index);
    start();
  }));
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  start();
})();
