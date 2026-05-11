const pages = [
  { key: "home",             label: "Home",             href: "index.html" },
  { key: "services",         label: "Services",          href: "services.html" },
  { key: "water-damage",     label: "Water Damage",      href: "water-damage.html" },
  { key: "fire-damage",      label: "Fire Damage",       href: "fire-damage.html" },
  { key: "mold-remediation", label: "Mold Remediation",  href: "mold-remediation.html" },
  { key: "about-us",         label: "About Us",          href: "about-us.html" },
  { key: "contact",          label: "Contact",           href: "contact.html" },
];

const currentPage = document.body.dataset.page || "";

/* Desktop nav link base classes */
const LINK_BASE   = "px-[10px] py-2 rounded-full text-[0.84rem] font-semibold text-slate-ar-700 transition-[background-color,color] duration-200 ease-out whitespace-nowrap hover:text-navy-950 hover:bg-slate-ar-100";
const LINK_ACTIVE = "text-navy-950 bg-slate-ar-100";

/* Mobile drawer link base classes */
const DRAWER_LINK_BASE   = "rounded-[12px] border border-[rgba(255,255,255,0.1)] px-3 py-[11px] text-[rgba(255,255,255,0.92)] text-base font-semibold transition-[background-color,border-color] duration-200 hover:bg-[rgba(255,255,255,0.16)] hover:border-[rgba(255,255,255,0.22)]";
const DRAWER_LINK_ACTIVE = "bg-[rgba(255,255,255,0.16)] border-[rgba(255,255,255,0.22)]";

const topNav = pages
  .map((page) => {
    const active = page.key === currentPage ? LINK_ACTIVE : "";
    return `<a class="${LINK_BASE} ${active}" href="${page.href}">${page.label}</a>`;
  })
  .join("");

const drawerLinks = pages
  .map((page) => {
    const active = page.key === currentPage ? DRAWER_LINK_ACTIVE : "";
    return `<a class="${DRAWER_LINK_BASE} ${active}" href="${page.href}">${page.label}</a>`;
  })
  .join("");

const header = `
<header class="bg-white shadow-[0_2px_12px_rgba(8,23,46,0.10)]">
  <div class="min-h-[74px] px-[22px] grid items-center gap-[18px] bg-white max-[1160px]:flex max-[1160px]:flex-wrap max-[1160px]:justify-start max-[1160px]:row-gap-[10px]"
    style="grid-template-columns: auto 1fr auto;">

    <!-- Brand -->
    <a class="flex items-center gap-[10px] text-white min-w-0" href="index.html" aria-label="Action Restoration Services home page">
      <img class="w-[104px] h-[104px] object-contain shrink-0 max-sm:w-11 max-sm:h-11" src="assets/site-logo.png" alt="Action Restoration Services logo" />
    </a>

    <!-- Menu toggle (mobile) -->
    <button class="hidden max-[1160px]:inline-flex ml-auto border border-slate-ar-300 rounded-lg px-[11px] py-[7px] text-navy-950 bg-transparent text-[1.1rem] cursor-pointer"
      type="button" aria-expanded="false" aria-controls="top-nav">&#9776;</button>

    <!-- Primary nav -->
    <nav id="top-nav" class="top-nav flex flex-nowrap items-center justify-center gap-0.5 min-w-0 max-[1160px]:hidden" aria-label="Primary">
      <div class="drawer-panel contents max-[1160px]:contents">
        <div class="drawer-head hidden max-[1160px]:flex items-center justify-between text-white font-sora text-[1.02rem] font-bold mb-4">
          <span>Navigation</span>
          <button class="menu-close inline-flex border border-[rgba(255,255,255,0.28)] rounded-lg px-[10px] py-1.5 text-white bg-[rgba(255,255,255,0.06)] cursor-pointer text-[0.86rem]"
            type="button" aria-label="Close menu">Close</button>
        </div>
        <div class="drawer-links flex items-center justify-center gap-0.5 min-w-0 max-[1160px]:flex-col max-[1160px]:items-stretch max-[1160px]:gap-2 max-[1160px]:overflow-y-auto max-[1160px]:pr-1">
          ${drawerLinks}
        </div>
      </div>
    </nav>

    <!-- Header actions -->
    <div class="flex items-center gap-[14px] shrink-0">
      <a class="rounded-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 font-sora text-[0.84rem] font-bold tracking-[0.01em] cursor-pointer transition-all duration-200 hover:-translate-y-px active:translate-y-0 bg-orange-ar-500 text-white shadow-[0_10px_18px_rgba(217,91,23,0.28)] hover:bg-orange-ar-600"
        href="contact.html#emergency">Schedule Service</a>
      <div class="flex flex-col items-end leading-[1.2] border-l border-slate-ar-200 pl-[14px] max-[1280px]:hidden">
        <span class="text-[0.72rem] font-semibold text-slate-ar-500 uppercase tracking-[0.06em] whitespace-nowrap">24/7 Emergency Service</span>
        <a class="font-sora text-[1.08rem] font-bold text-navy-950 whitespace-nowrap transition-colors duration-[0.18s] ease-out hover:text-orange-ar-600"
          href="tel:+17325550199">&#128222; (732) 555-0199</a>
      </div>
    </div>

  </div>
</header>
`;

const footer = `
<footer class="mt-5 bg-navy-950 text-[rgba(255,255,255,0.9)] border-t border-[rgba(255,255,255,0.08)]">
  <div class="px-5 py-8">
    <div class="grid gap-[18px] max-[1160px]:grid-cols-2 max-sm:grid-cols-1" style="grid-template-columns:1.3fr 1fr 1fr 1fr 1fr;">

      <div>
        <img class="w-[200px] h-[200px] object-contain mb-[10px]" src="assets/site-logo-dark-bg.png" alt="Action Restoration Services logo" />
        <p>Restoration Company / Contractor focused on fast mitigation, full-service restoration, and pre-loss condition recovery.</p>
        <p class="mt-[10px] text-[rgba(255,255,255,0.75)]">Serving homeowners, property managers, and businesses across East Brunswick and surrounding communities.</p>
      </div>

      <div>
        <div class="mb-[10px] text-[0.95rem] font-sora text-white">Pages</div>
        <div class="flex flex-col gap-2 text-[0.94rem]">
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="index.html">Home</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="services.html">All Services</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="about-us.html">About Us</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="contact.html">Contact</a>
        </div>
      </div>

      <div>
        <div class="mb-[10px] text-[0.95rem] font-sora text-white">Core Services</div>
        <div class="flex flex-col gap-2 text-[0.94rem]">
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="water-damage.html">Water Damage Restoration</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="fire-damage.html">Fire and Smoke Recovery</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="mold-remediation.html">Mold Remediation</a>
        </div>
      </div>

      <div>
        <div class="mb-[10px] text-[0.95rem] font-sora text-white">Legal</div>
        <div class="flex flex-col gap-2 text-[0.94rem]">
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="cookie-policy.html">Cookie Policy</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="privacy-policy.html">Privacy Policy</a>
          <a class="text-[rgba(255,255,255,0.82)] hover:text-white transition-colors duration-200" href="terms-of-service.html">Terms of Service</a>
        </div>
      </div>

      <div>
        <div class="mb-[10px] text-[0.95rem] font-sora text-white">Business Details</div>
        <div class="flex flex-col gap-2 text-[0.94rem] text-[rgba(255,255,255,0.82)]">
          <span>646 NJ-18 Suite 215, East Brunswick, NJ 08816</span>
          <span>Phone: Not publicly confirmed</span>
          <span>Email: Not publicly confirmed</span>
          <span>Rating: Not publicly confirmed</span>
          <span>Review Count: Not publicly confirmed</span>
        </div>
      </div>

    </div>
    <div class="mt-4 pt-[14px] border-t border-[rgba(255,255,255,0.14)] text-[0.83rem] text-[rgba(255,255,255,0.64)]">
      &copy; ${new Date().getFullYear()} Action Restoration Services. Emergency restoration content for planning and lead generation purposes.
    </div>
  </div>
</footer>
`;

const headerTarget = document.getElementById("site-header");
const footerTarget = document.getElementById("site-footer");

if (headerTarget) headerTarget.innerHTML = header;
if (footerTarget) footerTarget.innerHTML = footer;

const menuToggle = document.querySelector(".menu-toggle") || document.querySelector("[aria-controls='top-nav']");
const menuClose  = document.querySelector(".menu-close");
const navEl      = document.getElementById("top-nav");
const navLinks   = navEl ? Array.from(navEl.querySelectorAll("a")) : [];

if (menuToggle && navEl) {
  const setMenuState = (next) => {
    navEl.classList.toggle("open", next);
    menuToggle.setAttribute("aria-expanded", String(next));
    document.body.classList.toggle("menu-open", next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  menuToggle.addEventListener("click", () => setMenuState(!navEl.classList.contains("open")));

  if (menuClose) menuClose.addEventListener("click", () => setMenuState(false));

  navEl.addEventListener("click", (event) => {
    if (event.target === navEl) setMenuState(false);
  });

  navLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
}
