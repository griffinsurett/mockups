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

// Shared footer social links
(function initFooterSocials() {
  const footerBrandColumn = document.querySelector(".footer-brand")?.parentElement;
  if (!footerBrandColumn || footerBrandColumn.querySelector(".footer-socials")) return;

  const socials = document.createElement("div");
  socials.className = "footer-socials";
  socials.setAttribute("aria-label", "Social media");
  socials.innerHTML = `
    <a class="footer-social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
    </a>
    <a class="footer-social-link" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 2c.28 2.4 1.62 3.83 4 4v3.2a8.1 8.1 0 0 1-4-1.18v6.08a6.1 6.1 0 1 1-5.28-6.05v3.25a2.94 2.94 0 1 0 2.08 2.8V2h3.2Z"/></svg>
    </a>
    <a class="footer-social-link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-9h3l.45-3.5H13.5V7.27c0-1.01.28-1.7 1.74-1.7H17.1V2.44A25 25 0 0 0 14.4 2C11.73 2 9.9 3.63 9.9 6.62V9.5H7V13h2.9v9h3.6Z"/></svg>
    </a>`;
  footerBrandColumn.appendChild(socials);

  const reviewLink = document.createElement("a");
  reviewLink.className = "footer-google-review";
  reviewLink.href = "https://www.google.com/search?q=Reactive+Restoration+Services+Howell+NJ+reviews";
  reviewLink.target = "_blank";
  reviewLink.rel = "noopener noreferrer";
  reviewLink.innerHTML = `
    <svg class="google-review-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
    <span>Leave Us a Review</span>`;
  footerBrandColumn.appendChild(reviewLink);
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
