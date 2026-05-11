const pages = [
  { key: "home",     label: "Home",     href: "index.html" },
  { key: "services", label: "Services", href: "services.html" },
  { key: "projects", label: "Case Studies", href: "#" },
  { key: "about-us", label: "About Us", href: "about-us.html" },
  { key: "contact",  label: "Contact",  href: "contact.html" },
  { key: "faq",      label: "FAQ",      href: "faq.html" },
];

const currentPage = document.body.dataset.page || "";

const topNav = pages
  .map((p) => `<a class="${p.key === currentPage ? "active" : ""}" href="${p.href}">${p.label}</a>`)
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
        <div class="drawer-links">${topNav}</div>
      </div>
    </nav>
    <div class="header-actions">
      <a class="btn btn-primary header-schedule-btn" href="contact.html#emergency">Schedule Service</a>
      <div class="emergency-call-block">
        <span class="emergency-call-label">24/7 Emergency Service</span>
        <a class="emergency-call-number" href="tel:+17325108149">&#128222; (732) 510-8149</a>
      </div>
    </div>
  </div>
  <a class="mobile-call-bar" href="tel:+17325108149">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8a15.15 15.15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C9.61 22 2 14.39 2 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.58a1 1 0 0 1-.25 1.02L6.6 10.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Call Now &mdash; (732) 510-8149
  </a>
</header>`;

const faqBar = `
<section style="background:#f5f8fc;border-top:1px solid #d7e2ee;padding:48px 20px;">
  <div style="max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;">
    <div>
      <span style="display:inline-flex;margin-bottom:9px;font-family:'Sora','Segoe UI',sans-serif;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;color:#5b99c0;">Quick Answers</span>
      <h2 style="font-family:'Sora','Segoe UI',sans-serif;font-size:clamp(1.4rem,2vw,2rem);line-height:1.16;letter-spacing:-0.01em;color:#08172e;margin:0 0 6px;">Common Questions</h2>
      <p style="color:#4b5f75;font-size:0.95rem;margin:0 0 0;">Everything you need to know before reaching out.</p>
      <a href="faq.html" style="display:inline-flex;align-items:center;gap:6px;margin-top:20px;font-family:'Sora','Segoe UI',sans-serif;font-size:0.84rem;font-weight:700;color:#5b99c0;text-decoration:none;">View all FAQs <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">What should I do immediately after property damage?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Prioritize safety first — evacuate if needed, shut off water or gas sources if safe to do so, and call for emergency restoration help as quickly as possible. Early response limits the scope of damage.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">Do you work with insurance companies?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Yes. We work alongside your insurance adjuster and provide documentation to support the claims process. Contact your insurer promptly after any loss event.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">Are you available 24/7 for emergencies?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Yes. We operate around the clock for emergency dispatch. Damage doesn't follow business hours, and early mitigation is critical to limiting loss.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">Do you serve both homes and businesses?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Yes. We support residential homeowners, property managers, and commercial clients across Middlesex, Monmouth, Somerset, and Union counties.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">How long does restoration take?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Timelines vary by damage type and extent. Emergency mitigation typically takes days; full restoration and reconstruction can take weeks. We provide project-specific timelines after the initial assessment.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">Can water damage lead to mold?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Yes. Mold can begin developing within 24–48 hours of unchecked moisture. Proper extraction, structural drying, and humidity monitoring are the most effective way to prevent secondary mold growth.</p>
      </details>
      <details style="border:1px solid #d7e2ee;border-radius:12px;background:#fff;padding:12px 14px;">
        <summary style="cursor:pointer;font-family:'Sora','Segoe UI',sans-serif;font-size:0.97rem;color:#0f2743;font-weight:600;list-style:none;">Do you provide written estimates?</summary>
        <p style="margin:8px 0 0;color:#4b5f75;font-size:0.92rem;">Yes. For non-emergency projects, we provide scope documentation and estimates before committing to full work. Emergency mitigation may begin before a full estimate to limit damage progression.</p>
      </details>
    </div>
  </div>
</section>`;

const footer = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="assets/site-logo-dark-bg.png" alt="Action Restoration Services logo" />
        <p>Restoration Company / Contractor focused on fast mitigation, full-service restoration, and pre-loss condition recovery.</p>
      </div>
      <div>
        <div class="footer-title">Pages</div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="services.html">All Services</a>
          <a href="about-us.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="faq.html">FAQ</a>
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
          <span>Phone: (732) 510-8149</span>
        </div>
      </div>
    </div>
    <div class="footer-meta" style="text-align:center;">© ${new Date().getFullYear()} Action Restoration Services.</div>
  </div>
</footer>`;

const headerTarget = document.getElementById("site-header");
const footerTarget  = document.getElementById("site-footer");
if (headerTarget) headerTarget.innerHTML = header;
if (footerTarget)  footerTarget.innerHTML  = footer;

const menuToggle = document.querySelector(".menu-toggle");
const menuClose  = document.querySelector(".menu-close");
const navEl      = document.getElementById("top-nav");
const navLinks   = navEl ? Array.from(navEl.querySelectorAll("a")) : [];

if (menuToggle && navEl) {
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
}

(function initScrollCompact() {
  const siteHeader = document.querySelector(".site-header");
  if (!siteHeader) return;
  let ticking = false;
  const update = () => {
    siteHeader.classList.toggle("is-compact", window.scrollY > 44);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
})();
