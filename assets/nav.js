/* Shared mobile menu: injects a hamburger toggle into .nav and .pnav headers
   and toggles `.is-open` (CSS turns the link list into a dropdown < 920px). */
(function () {
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
      if (e.target.closest("a")) { header.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }
  document.querySelectorAll("header.nav").forEach(function (h) { setup(h, ".nav__links"); });
  document.querySelectorAll("header.pnav").forEach(function (h) { setup(h, ".pnav__tabs"); });
})();
