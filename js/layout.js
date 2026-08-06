/* ============================================================
   RJ Produce — shared header + footer, injected on every page.
   Same header/footer language as the GrubMarket design system:
   six top-level sections, each opening a panel of sub-links with a
   line of subtext, so a buyer can see what's inside before clicking.
   ============================================================ */
(function () {
  // Tells the stylesheet it is safe to hide reveal elements — see html.js .reveal
  document.documentElement.classList.add("js");

  var GM_W = "assets/icons/gm-logo-white.svg";
  var GM_B = "assets/icons/gm-logo-black.svg";

  var LINKS = [
    { t: "About", href: "about.html", sub: [
      { t: "Our Story",       d: "Founded in Pharr in 2004, part of GrubMarket since 2021.", href: "about.html#our-story" },
      { t: "Our Team",        d: "The people who run your account, sourcing, QA, and freight.", href: "team.html" },
      { t: "Why RJ Produce",  d: "Two decades of grower relationships and an unbroken calendar.", href: "about.html#why" },
      { t: "Sustainability",  d: "Buying to the season, direct from the farm, with fewer hand-offs.", href: "sourcing.html#sustainability" }
    ]},
    { t: "Capabilities", href: "services.html", sub: [
      { t: "Wholesale Distribution", d: "High-volume supply for retail, foodservice, and distributors.", href: "services.html#wholesale" },
      { t: "Cross-Border Sourcing",  d: "Mexican growers cleared through our Pharr border hub.", href: "services.html#cross-border" },
      { t: "Private Label & Branded",d: "Retail-ready packs built to each chain's specification.", href: "services.html#private-label" },
      { t: "How It Works",           d: "Source, inspect and pack, ship — the process end to end.", href: "services.html#how-it-works" }
    ]},
    { t: "Products", href: "products.html", sub: [
      { t: "Citrus & Tropical", d: "Persian limes, Ataulfo and red mangoes.", href: "products.html?filter=citrus-tropical" },
      { t: "Vegetables",        d: "Broccoli crowns, cauliflower, celery, carrots.", href: "products.html?filter=vegetables" },
      { t: "Chiles & Herbs",    d: "Chile and bell peppers, cilantro, tomatillos.", href: "products.html?filter=chiles-herbs" },
      { t: "Our Labels",        d: "Broccoli ships as RJ Produce, TIGER and MONKEY.", href: "products.html#brands" }
    ]},
    { t: "Network", href: "sourcing.html", sub: [
      { t: "U.S. & Mexico Sourcing", d: "Direct relationships across both growing countries.", href: "sourcing.html#sourcing" },
      { t: "Service Area",           d: "Where we ship, from Texas to national retail chains.", href: "sourcing.html#service-area" },
      { t: "Facilities",            d: "Pharr, Texas plus Veracruz and Tijuana in Mexico.", href: "sourcing.html#facilities" },
      { t: "Sustainability",         d: "Working with each region's natural growing calendar.", href: "sourcing.html#sustainability" }
    ]},
    { t: "Food Safety", href: "food-safety.html", sub: [
      { t: "The Program",      d: "Third-party audit, FSMA records, traceability, cold chain.", href: "food-safety.html#program" },
      { t: "Inspection",       d: "Every load checked against your written spec before it ships.", href: "food-safety.html#inspection" },
      { t: "Traceability",     d: "From your pallet back to the grower's block in one step.", href: "food-safety.html#traceability" },
      { t: "Recall Procedure", d: "What happens, in what order, and who calls whom.", href: "food-safety.html#recall" }
    ]},
    { t: "Purchasing", href: "purchasing.html", sub: [
      { t: "What You Get",   d: "Direct pricing, a named account manager, standing delivery.", href: "purchasing.html#benefits" },
      { t: "The Process",    d: "Quote, account setup, online ordering, recurring delivery.", href: "purchasing.html#process" },
      { t: "Account Types",  d: "Retailers, foodservice operators, and downstream distributors.", href: "purchasing.html#accounts" },
      { t: "Request a Quote",d: "Pricing and availability, usually within one business day.", href: "contact.html" }
    ]}
  ];

  var CHEV = '<span class="chev" aria-hidden="true"></span>';

  var brand =
    '<a class="brand" href="index.html" aria-label="RJ Produce home">' +
      '<img class="brand-logo" src="assets/icons/rj-logo.png" alt="RJ Produce" width="160" height="50" />' +
      '</a>' +
    '<a class="gm-lockup" href="https://www.grubmarket.com" target="_blank" rel="noopener" ' +
      'aria-label="A GrubMarket company"><img src="' + GM_B + '" alt="GrubMarket" /></a>';

  var navLinks = LINKS.map(function (l, i) {
    var panel = l.sub.map(function (s) {
      return '<a class="m-link" href="' + s.href + '">' +
               '<span class="m-t">' + s.t + '</span>' +
               '<span class="m-d">' + s.d + '</span></a>';
    }).join("");
    return '<div class="nav-item">' +
            '<a class="nav-link" href="' + l.href + '" aria-haspopup="true" aria-expanded="false" ' +
             'aria-controls="navpanel-' + i + '">' + l.t + CHEV + '</a>' +
            '<div class="nav-panel" id="navpanel-' + i + '"><div class="nav-panel-inner">' + panel + '</div></div>' +
           '</div>';
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
      LINKS.map(function (l) {
        return '<div class="mp-section"><a class="mp-top" href="' + l.href + '">' + l.t + '</a>' +
          l.sub.map(function (s) {
            return '<a class="mp-sub" href="' + s.href + '">' + s.t + '</a>';
          }).join("") + '</div>';
      }).join("") +
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
      '<div><h5>Products</h5><a href="products.html?filter=citrus-tropical">Citrus &amp; Tropical</a><a href="products.html?filter=vegetables">Vegetables</a><a href="products.html?filter=chiles-herbs">Chiles &amp; Herbs</a><a href="products.html#brands">Our Labels</a></div>' +
      '<div><h5>Buyers</h5><a href="purchasing.html">How to Buy</a><a href="sourcing.html#service-area">Service Area</a><a href="sourcing.html#facilities">Facilities</a><a href="contact.html">Request a Quote</a></div>' +
    '</div>' +
    '<div class="bottom"><span>© 2026 RJ Produce, Inc. All rights reserved.</span>' +
      '<span>9005 Travis Drive, Pharr, TX 78577 &nbsp;·&nbsp; <a href="tel:+19567814000">(956) 781-4000</a></span>' +
      '<span><a href="privacy.html">Privacy</a> &nbsp;·&nbsp; <a href="terms.html">Terms</a></span></div>' +
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

  /* ---- desktop dropdowns ----
     Hover opens; CSS handles the visual state so it works without JS. This
     layer keeps aria-expanded honest, closes on Escape, and lets the keyboard
     open a panel with ArrowDown (Enter still follows the section link). */
  var closeTimer;
  var items = [].slice.call(document.querySelectorAll(".nav-item"));

  function setOpen(item, open) {
    item.classList.toggle("open", open);
    item.querySelector(".nav-link").setAttribute("aria-expanded", open ? "true" : "false");
  }
  function closeAll(except) {
    items.forEach(function (i) { if (i !== except) setOpen(i, false); });
  }

  // A touch device has no hover, so the panel would never open and the chevron
  // would promise a menu that doesn't exist. There, the first tap opens it and
  // the second follows the link.
  var coarse = window.matchMedia("(hover: none)").matches ||
               window.matchMedia("(pointer: coarse)").matches;

  items.forEach(function (item) {
    var link = item.querySelector(".nav-link");
    if (coarse) {
      link.addEventListener("click", function (e) {
        if (!item.classList.contains("open")) {
          e.preventDefault();
          closeAll(item);
          setOpen(item, true);
        }
      });
    }
    item.addEventListener("mouseenter", function () { clearTimeout(closeTimer); closeAll(item); setOpen(item, true); });
    item.addEventListener("mouseleave", function () {
      closeTimer = setTimeout(function () { setOpen(item, false); }, 140);
    });
    link.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        closeAll(item);
        setOpen(item, true);
        var first = item.querySelector(".m-link");
        if (first) first.focus();
      }
    });
    item.addEventListener("focusin", function () { closeAll(item); setOpen(item, true); });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(item, false);
    });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
  // tapping anywhere else dismisses an open panel on touch
  document.addEventListener("click", function (e) { if (!e.target.closest(".nav-item")) closeAll(); });

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
  function revealAll() { revealables.forEach(function (el) { el.classList.add("in"); }); }
  if (!("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
    // Failsafe: some contexts (a backgrounded tab, throttled observers) never
    // deliver an entry. Show everything after a beat rather than risk a blank page.
    setTimeout(revealAll, 2500);
  }

  /* count-up on stat bands, matching the GrubMarket proof section */
  var nums = [].slice.call(document.querySelectorAll(".proof .pstat .n, .stats .stat .n"));
  if (nums.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Parse only — the authored number stays on screen. Zeroing it here meant a
    // stat could sit at 0 forever if the animation never ran (a backgrounded tab
    // gets no requestAnimationFrame, so the counter would start and never tick).
    nums.forEach(function (el) {
      var m = el.textContent.trim().match(/^([^0-9]*)([0-9.,]+)(.*)$/);
      if (!m) { el.dataset.skip = "1"; return; }
      el.dataset.prefix = m[1];
      el.dataset.suffix = m[3];
      el.dataset.value = m[2].replace(/,/g, "");
      el.dataset.comma = m[2].indexOf(",") > -1 ? "1" : "0";
    });

    function render(el, v) {
      var dec = el.dataset.value.indexOf(".") > -1 ? el.dataset.value.split(".")[1].length : 0;
      var s = dec ? v.toFixed(dec) : String(Math.round(v));
      if (el.dataset.comma === "1") s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      el.textContent = el.dataset.prefix + s + el.dataset.suffix;
    }

    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var el = e.target;
        if (!e.isIntersecting || el.dataset.done || el.dataset.skip) return;
        el.dataset.done = "1";
        var target = parseFloat(el.dataset.value);
        // nothing to animate into if frames aren't coming — leave the real number
        if (document.hidden) return;
        var start = null;
        render(el, 0);
        (function step(ts) {
          if (document.hidden) { render(el, target); return; }   // tab left mid-count
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1300, 1);
          render(el, target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: .5 });
    nums.forEach(function (el) { if (!el.dataset.skip) nio.observe(el); });
  }
})();
