/* Shared nav for every page: renders one identical, page-based mega-menu into
   each .mm, injects the mobile hamburger, and drives the desktop dropdowns with
   a hover-intent delay so a panel stays reachable while you move to it.
   Dropdowns list page titles only (no descriptions). Logo = Home. */
(function () {
  var menu = [
    { label: "About AIC", href: "team.html", links: [
      ["About AIC", "team.html"],
      ["Partners & Ecosystem", "partners.html"],
      ["FAQ", "faq.html"]
    ]},
    { label: "Divisions", href: "divisions.html", links: [
      ["Divisions Overview", "divisions.html"],
      ["Innovation Lab", "applied-research.html"],
      ["Incubation", "incubation.html"],
      ["Compute Lab", "data-centre.html"]
    ]},
    { label: "AI Adoption", href: "ai-readiness.html", links: [
      ["AI Readiness Review", "ai-readiness.html"],
      ["For SMEs & Employers", "for-smes.html"],
      ["Workforce Academy", "ai-workforce-sme-adoption.html"],
      ["Training Catalogue", "training.html"]
    ]},
    { label: "ALEBEX AI", href: "alebex-ai.html", links: [] },
    { label: "Resources", href: "canada-ai-strategy.html", links: [
      ["Canada's AI Strategy & Funding", "canada-ai-strategy.html"],
      ["Case Studies & Results", "results.html"],
      ["Innovation Nights", "innovation-night.html"],
      ["News & Insights", "news.html"]
    ]},
    { label: "Contact", href: "contact.html", links: [] }
  ];

  function esc(s) { return s.replace(/&/g, "&amp;"); }
  function normalizePath(path) {
    return (path || "").split("#")[0].split("?")[0].replace(/^.*\//, "") || "index.html";
  }

  // pages in a subfolder (e.g. /events/) need links prefixed with ../
  var PRE = /\/events\//.test(window.location.pathname) ? "../" : "";
  function url(h) { return /^https?:\/\//.test(h) ? h : PRE + h; }

  function renderMenus() {
    var current = normalizePath(window.location.pathname);
    document.querySelectorAll(".mm").forEach(function (wrap) {
      wrap.innerHTML = menu.map(function (group) {
        var solo = !group.links || !group.links.length;
        var active = group.href === current ||
          (!solo && group.links.some(function (link) { return normalizePath(link[1]) === current; }));
        var topClass = "mm__top" + (solo ? " mm__top--solo" : "") + (active ? " is-active" : "");
        if (solo) {
          return '<div class="mm__item"><a class="' + topClass + '" href="' + url(group.href) + '">' + esc(group.label) + "</a></div>";
        }
        var links = group.links.map(function (link) {
          var external = /^https?:\/\//.test(link[1]);
          return '<a href="' + url(link[1]) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + esc(link[0]) + "</a>";
        }).join("");
        return '<div class="mm__item">' +
          '<a class="' + topClass + '" href="' + url(group.href) + '">' + esc(group.label) + "</a>" +
          '<div class="mm__panel">' + links + "</div>" +
        "</div>";
      }).join("");
    });
  }

  function setup(header, linksSelector) {
    var links = header.querySelector(linksSelector);
    if (!links || header.querySelector(".navmenu-toggle")) return;
    var btn = document.createElement("button");
    btn.className = "navmenu-toggle";
    btn.setAttribute("aria-label", "Toggle menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";
    header.appendChild(btn);
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      var top = e.target.closest(".mm__top");
      if (top && !top.classList.contains("mm__top--solo") && window.matchMedia("(max-width: 1100px)").matches) {
        var item = top.closest(".mm__item");
        var panel = item && item.querySelector(".mm__panel");
        if (panel) { e.preventDefault(); item.classList.toggle("is-mobile-open"); return; }
      }
      if (e.target.closest("a")) {
        header.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* a11y: a keyboard "skip to content" link injected once on every page */
  function injectSkipLink() {
    if (document.querySelector(".skip-link")) return;
    var main = document.querySelector("main");
    if (main && !main.id) main.id = "main";
    var target = main ? main.id : "top";
    var a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#" + target;
    a.textContent = "Skip to content";
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* detail-page entrance reveals (homepage runs its own observer in scroll.js) */
  function initReveal() {
    if (!document.querySelector("header.pnav")) return;            // detail pages only
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    var sel = "main .psection > .overline, main .psection > h1, main .psection > h2," +
      " main .psection > .plead, main .pcard, main .feedpost, main .tcard, main .isopanel," +
      " main .pnote, main .upcoming, main .visit__inner, main .buildTrack, main .pcta > *";
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!els.length) return;
    document.documentElement.classList.add("js-anim");
    els.forEach(function (el) { el.classList.add("reveal-up"); });
    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = Math.min(i * 55, 220); i++;
        e.target.style.transitionDelay = d + "ms";
        e.target.classList.add("in");
        io.unobserve(e.target);
        // restore the element's native transitions (hover, etc.) after it settles
        window.setTimeout(function () {
          e.target.classList.remove("reveal-up", "in");
          e.target.style.transitionDelay = "";
        }, 700 + d);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
  injectSkipLink();
  renderMenus();
  document.querySelectorAll("header.nav").forEach(function (h) { setup(h, ".nav__links"); });
  document.querySelectorAll("header.pnav").forEach(function (h) { setup(h, ".pnav__tabs"); });
  initReveal();

  /* desktop hover-intent: open on enter, close on a delay so the gap between
     the title and panel never drops the menu */
  var DESKTOP = window.matchMedia("(min-width: 1101px)");
  document.querySelectorAll(".mm__item").forEach(function (item) {
    if (!item.querySelector(".mm__panel")) return;   // solo links: nothing to open
    var timer;
    function open() {
      if (!DESKTOP.matches) return;
      window.clearTimeout(timer);
      document.querySelectorAll(".mm__item.is-open").forEach(function (o) { if (o !== item) o.classList.remove("is-open"); });
      item.classList.add("is-open");
    }
    function scheduleClose() {
      if (!DESKTOP.matches) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { item.classList.remove("is-open"); }, 280);
    }
    item.addEventListener("pointerenter", open);
    item.addEventListener("pointerleave", scheduleClose);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", function () {
      if (!item.contains(document.activeElement)) item.classList.remove("is-open");
    });
  });
  document.querySelectorAll("header.nav, header.pnav").forEach(function (h) {
    h.addEventListener("pointerleave", function () {
      h.querySelectorAll(".mm__item.is-open").forEach(function (o) { o.classList.remove("is-open"); });
    });
  });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
