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
  let ticking = false;
  const getScrollY = () =>
    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const update = () => {
    if (getScrollY() > 44) {
      siteHeader.setAttribute("data-compact", "true");
    } else {
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
