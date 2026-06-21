/* Inteople — site interactions (vanilla, no deps) */
(function () {
  "use strict";

  /* Sticky header */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Animated counters */
  var counters = document.querySelectorAll("[data-count]");
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600, start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Inject config-driven links (single source of truth: config.js) ---- */
  var cfg = window.INTEOPLE || {};
  var contactEmail = (cfg.contact && cfg.contact.email) || "hello@inteople.com";
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link"); // e.g. "social.linkedin", "contact.email"
    var val = key.split(".").reduce(function (o, k) {
      return o && o[k];
    }, cfg);
    if (!val) return;
    if (el.tagName === "A") {
      el.setAttribute("href", key === "contact.email" ? "mailto:" + val : val);
    } else {
      el.textContent = val;
    }
  });

  /* Contact form — submits to Netlify Forms via AJAX, mailto fallback */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var setStatus = function (cls, msg) {
      if (!status) return;
      status.className = "form-status " + cls;
      status.textContent = msg;
    };
    var mailtoFallback = function (data) {
      var body = encodeURIComponent(
        "Name: " + (data.name || "") + "\nEmail: " + (data.email || "") +
        "\nCompany: " + (data.company || "") + "\nInterest: " + (data.interest || "") +
        "\n\n" + (data.message || "")
      );
      window.location.href = "mailto:" + contactEmail + "?subject=" +
        encodeURIComponent("Project inquiry — " + (data.name || "Website")) + "&body=" + body;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var data = Object.fromEntries(fd.entries());
      var btn = form.querySelector("[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      // Netlify Forms expects url-encoded body posted to the site root.
      var encoded = new URLSearchParams(fd).toString();
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded,
      }).then(function (res) {
        if (!res.ok) throw new Error("Bad status " + res.status);
        setStatus("ok", "Thanks " + (data.name || "") + "! We'll get back to you within one business day.");
        form.reset();
      }).catch(function () {
        // Network/local-preview failure — never lose the inquiry.
        setStatus("err", "We couldn't submit the form just now — opening your email app so you can reach us at " + contactEmail + ".");
        mailtoFallback(data);
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Send message"; }
      });
    });
  }
})();
