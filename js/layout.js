/* ============================================================
   RJ Produce — shared header + footer, injected on every page.
   Same header/footer language as the GrubMarket design system,
   with a flat 6-item nav (no mega panels — RJ has one product line).
   ============================================================ */
(function () {
  var GM_W = "assets/icons/gm-logo-white.svg";
  var GM_B = "assets/icons/gm-logo-black.svg";

  var LINKS = [
    { t: "About",        href: "about.html" },
    { t: "Capabilities", href: "services.html" },
    { t: "Products",     href: "products.html" },
    { t: "Network",      href: "sourcing.html" },
    { t: "Food Safety",  href: "food-safety.html" },
    { t: "Purchasing",   href: "purchasing.html" }
  ];

  var brand =
    '<a class="brand" href="index.html" aria-label="RJ Produce home">' +
      '<span><span class="wordmark"><span class="rj">RJ</span> Produce</span>' +
      '<span class="sub">Grower &amp; Shipper · Since 2004</span></span></a>' +
    '<a class="gm-lockup" href="https://www.grubmarket.com" target="_blank" rel="noopener">' +
      'A <img src="' + GM_B + '" alt="GrubMarket" /> company</a>';

  var navLinks = LINKS.map(function (l) {
    return '<a class="nav-link" href="' + l.href + '">' + l.t + '</a>';
  }).join("");

  var header =
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<header class="site-header" id="siteHeader"><div class="wrap">' +
      brand +
      '<nav class="nav" id="nav" aria-label="Primary">' + navLinks +
        '<a class="btn solid sm nav-cta" href="contact.html">Request a Quote</a>' +
      '</nav>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">' +
        '<span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="mobile-panel" id="mobilePanel">' +
      LINKS.map(function (l) { return '<a href="' + l.href + '">' + l.t + '</a>'; }).join("") +
      '<a class="btn solid" href="contact.html">Request a Quote</a>' +
    '</div>';

  var footer =
    '<footer class="footer"><div class="wrap"><div class="cols">' +
      '<div><span class="wordmark"><span class="rj">RJ</span> Produce</span>' +
        '<p class="blurb">The supply chain behind fresh produce — sourcing direct from growers across the U.S. and Mexico from Pharr, Texas since 2004.</p>' +
        '<a class="gm-lockup" href="https://www.grubmarket.com" target="_blank" rel="noopener">' +
          'A <img src="' + GM_W + '" alt="GrubMarket" /> company</a></div>' +
      '<div><h5>Company</h5><a href="about.html">Our Story</a><a href="team.html">Our Team</a><a href="about.html#why">Why RJ Produce</a><a href="sourcing.html#sustainability">Sustainability</a><a href="contact.html">Contact</a></div>' +
      '<div><h5>Capabilities</h5><a href="services.html#wholesale">Wholesale Distribution</a><a href="services.html#cross-border">Cross-Border Sourcing</a><a href="services.html#private-label">Private Label</a><a href="food-safety.html">Food Safety</a></div>' +
      '<div><h5>Products</h5><a href="products.html?filter=vegetables">Vegetables</a><a href="products.html?filter=fruits">Fruits</a><a href="products.html?filter=specialty">Specialty</a><a href="products.html#seasonality">Seasonal Availability</a></div>' +
      '<div><h5>Buyers</h5><a href="purchasing.html">How to Buy</a><a href="sourcing.html#service-area">Service Area</a><a href="sourcing.html#hub">Our Hub</a><a href="contact.html">Request a Quote</a></div>' +
    '</div>' +
    '<div class="bottom"><span>© 2026 RJ Produce, Inc. All rights reserved.</span>' +
      '<span>9005 Travis Drive, Pharr, TX 78577 &nbsp;·&nbsp; <a href="tel:+19567814000">(956) 781-4000</a></span></div>' +
    '</div></footer>';

  var hMount = document.getElementById("site-header-mount");
  var fMount = document.getElementById("site-footer-mount");
  if (hMount) hMount.outerHTML = header;
  if (fMount) fMount.outerHTML = footer;

  /* current-page highlight */
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-link, #mobilePanel a, .footer a").forEach(function (a) {
    var page = (a.getAttribute("href") || "").split("#")[0].split("?")[0].toLowerCase();
    if (page && page === here) a.classList.add("is-active");
  });

  /* mobile panel */
  var hamburger = document.getElementById("hamburger");
  var panel = document.getElementById("mobilePanel");
  var headerEl = document.getElementById("siteHeader");
  if (hamburger && panel) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = panel.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { panel.classList.remove("open"); hamburger.setAttribute("aria-expanded", "false"); }
    });
  }

  /* header shadow on scroll */
  function onScroll() { headerEl.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* reveal-on-scroll — elements stay visible if JS or IO is unavailable */
  var revealables = [].slice.call(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* count-up on stat bands, matching the GrubMarket proof section */
  var nums = [].slice.call(document.querySelectorAll(".proof .pstat .n, .stats .stat .n"));
  if (nums.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nums.forEach(function (el) {
      var m = el.textContent.trim().match(/^([^0-9]*)([0-9.,]+)(.*)$/);
      if (!m) { el.dataset.skip = "1"; return; }
      el.dataset.prefix = m[1];
      el.dataset.suffix = m[3];
      el.dataset.value = m[2].replace(/,/g, "");
      el.dataset.comma = m[2].indexOf(",") > -1 ? "1" : "0";
      el.textContent = m[1] + "0" + m[3];
    });
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target;
        if (!e.isIntersecting || el.dataset.done || el.dataset.skip) return;
        el.dataset.done = "1";
        var target = parseFloat(el.dataset.value), start = null;
        var dec = el.dataset.value.indexOf(".") > -1 ? el.dataset.value.split(".")[1].length : 0;
        (function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1300, 1);
          var v = target * (1 - Math.pow(1 - p, 3));
          var s = dec ? v.toFixed(dec) : String(Math.round(v));
          if (el.dataset.comma === "1") s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          el.textContent = el.dataset.prefix + s + el.dataset.suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: .5 });
    nums.forEach(function (el) { if (!el.dataset.skip) nio.observe(el); });
  }
})();
