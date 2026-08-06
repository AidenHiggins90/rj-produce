/* Renders the line card and brand labels from js/catalog.js. Split out of
   products.html so the CSP can be script-src 'self' with no unsafe-inline. */
(function () {
  var data = window.RJ_CATALOG;
  if (!data) return;
  var grid = document.getElementById("lineCard");
  var filters = document.getElementById("filters");

  function img(slug) {
    return "image-set(url('assets/img/" + slug + ".webp') type('image/webp'), " +
           "url('assets/img/" + slug + ".jpg') type('image/jpeg'))";
  }

  /* ---- filter buttons, built from the categories in the data ---- */
  var cats = [{ id: "all", label: "Everything" }].concat(data.categories);
  filters.innerHTML = cats.map(function (c) {
    return '<button class="fbtn" data-filter="' + c.id + '" aria-pressed="' +
           (c.id === "all") + '">' + c.label + '</button>';
  }).join("");

  /* ---- line card ---- */
  var typical = data.packTypical !== false;
  grid.innerHTML = data.items.map(function (it) {
    var meta = [];
    if (it.pack) meta.push((typical ? "Typical pack: " : "") + it.pack);
    else meta.push("Pack sizes on request");
    if (it.origin) meta.push(it.origin);
    return '<article class="lc-item" data-cat="' + it.cat + '">' +
             '<span class="lc-img" style="background-image:' + img(it.img) + '" role="img" aria-label="' + it.name + '"></span>' +
             '<div class="lc-body">' +
               '<h3>' + it.name + '</h3>' +
               '<p>' + it.note + '</p>' +
               (it.brands ? '<p class="lc-brands">' + it.brands.map(function (b) {
                  return '<span>' + b + '</span>'; }).join("") + '</p>' : "") +
               '<p class="lc-meta">' + meta.join(" · ") + '</p>' +
             '</div>' +
           '</article>';
  }).join("");

  var btns = [].slice.call(filters.querySelectorAll(".fbtn"));
  var items = [].slice.call(grid.querySelectorAll(".lc-item"));

  function apply(f) {
    items.forEach(function (i) { i.hidden = f !== "all" && i.dataset.cat !== f; });
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === f)); });
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.filter);
      var url = b.dataset.filter === "all"
        ? location.pathname
        : location.pathname + "?filter=" + b.dataset.filter;
      history.replaceState(null, "", url + location.hash);
    });
  });
  function fromUrl() {
    var f = new URLSearchParams(location.search).get("filter");
    apply(f && btns.some(function (b) { return b.dataset.filter === f; }) ? f : "all");
  }
  fromUrl();
  window.addEventListener("popstate", fromUrl);

  /* ---- brand labels ---- */
  document.getElementById("brandGrid").innerHTML = data.brands.map(function (b) {
    return '<div class="brand-card reveal">' +
             '<span class="brand-label" style="background-image:' + img(b.img) + '" role="img" aria-label="' + b.name + ' label"></span>' +
             '<h3>' + b.name + '</h3><p>' + b.note + '</p>' +
           '</div>';
  }).join("");
})();
