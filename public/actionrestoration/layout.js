const pages = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "services", label: "Services", href: "services.html" },
  { key: "projects", label: "Projects", href: "#" },
  { key: "about-us", label: "About Us", href: "about-us.html" },
  { key: "contact", label: "Contact", href: "contact.html" }
];

const currentPage = document.body.dataset.page || "";

const topNav = pages
  .map((page) => {
    const active = page.key === currentPage ? "active" : "";
    return `<a class="${active}" href="${page.href}">${page.label}</a>`;
  })
  .join("");

const header = `
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="Action Restoration Services home page">
      <img class="brand-logo" src="assets/site-logo.png" alt="Action Restoration Services logo" />
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="top-nav">&#9776;</button>
    <nav id="top-nav" class="top-nav" aria-label="Primary">
      <div class="drawer-panel">
        <div class="drawer-head">
          <span>Navigation</span>
          <button class="menu-close" type="button" aria-label="Close menu">Close</button>
        </div>
        <div class="drawer-links">
          ${topNav}
        </div>
      </div>
    </nav>
    <div class="header-actions">
      <a class="btn btn-primary" href="contact.html#emergency">Schedule Service</a>
      <div class="emergency-call-block">
        <span class="emergency-call-label">24/7 Emergency Service</span>
        <a class="emergency-call-number" href="tel:+17325550199">&#128222; (732) 555-0199</a>
      </div>
    </div>
  </div>
</header>
`;

const footer = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="assets/site-logo-dark-bg.png" alt="Action Restoration Services logo" />
        <p>Restoration Company / Contractor focused on fast mitigation, full-service restoration, and pre-loss condition recovery.</p>
        <p style="margin-top:10px; color: rgba(255,255,255,0.75);">Serving homeowners, property managers, and businesses across East Brunswick and surrounding communities.</p>
      </div>
      <div>
        <div class="footer-title">Pages</div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="services.html">All Services</a>
          <a href="about-us.html">About Us</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Core Services</div>
        <div class="footer-links">
          <a href="water-damage.html">Water Damage Restoration</a>
          <a href="fire-damage.html">Fire and Smoke Recovery</a>
          <a href="mold-remediation.html">Mold Remediation</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Legal</div>
        <div class="footer-links">
          <a href="cookie-policy.html">Cookie Policy</a>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-service.html">Terms of Service</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Business Details</div>
        <div class="footer-links">
          <span>646 NJ-18 Suite 215, East Brunswick, NJ 08816</span>
          <span>Phone: Not publicly confirmed</span>
          <span>Email: Not publicly confirmed</span>
          <span>Rating: Not publicly confirmed</span>
          <span>Review Count: Not publicly confirmed</span>
        </div>
      </div>
    </div>
    <div class="footer-meta">© ${new Date().getFullYear()} Action Restoration Services. Emergency restoration content for planning and lead generation purposes.</div>
  </div>
</footer>
`;

const headerTarget = document.getElementById("site-header");
const footerTarget = document.getElementById("site-footer");

if (headerTarget) {
  headerTarget.innerHTML = header;
}

if (footerTarget) {
  footerTarget.innerHTML = footer;
}

const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const navEl = document.getElementById("top-nav");
const navLinks = navEl ? Array.from(navEl.querySelectorAll("a")) : [];

if (menuToggle && navEl) {
  const setMenuState = (next) => {
    navEl.classList.toggle("open", next);
    menuToggle.setAttribute("aria-expanded", String(next));
    document.body.classList.toggle("menu-open", next);
  };

  menuToggle.addEventListener("click", () => {
    const next = !navEl.classList.contains("open");
    setMenuState(next);
  });

  if (menuClose) {
    menuClose.addEventListener("click", () => setMenuState(false));
  }

  navEl.addEventListener("click", (event) => {
    if (event.target === navEl) {
      setMenuState(false);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
}
