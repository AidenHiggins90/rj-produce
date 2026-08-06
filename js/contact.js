/* Quote form: posts to /api/quote and reports the outcome. Split out of
   contact.html so the CSP can be script-src 'self' with no unsafe-inline. */
(function () {
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("quoteStatus");
  var CALL = ' Please call <a href="tel:+19567814000">(956) 781-4000</a>.';

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var btn = form.querySelector('button[type="submit"]');
    var v = function (id) { return document.getElementById(id).value.trim(); };

    btn.disabled = true;
    btn.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: v("q-name"), company: v("q-company"), email: v("q-email"),
        phone: v("q-phone"), type: v("q-type"), volume: v("q-volume"),
        products: v("q-products"), message: v("q-message"), website: v("q-website")
      })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || "Request failed");
        return data;
      });
    }).then(function (data) {
      status.className = "form-status ok";
      status.innerHTML = "Request received" +
        (data.desk ? " — routed to <strong>" + data.desk + "</strong>" : "") +
        ". " + (data.confirmation === "sent"
          ? "A confirmation is on its way to " + v("q-email") + ", and someone"
          : "Someone") +
        " will reply within one business day.";
      btn.textContent = "Request sent ✓";
      form.reset();
      setTimeout(function () {
        btn.disabled = false; btn.textContent = "Submit request";
        status.textContent = ""; status.className = "form-status";
      }, 10000);
    }).catch(function (err) {
      console.error(err);
      status.className = "form-status err";
      status.innerHTML = "We couldn't send that just now." + CALL;
      btn.disabled = false;
      btn.textContent = "Submit request";
    });
  });
})();
