/* Lightweight gallery lightbox: click a .gallery img to open full-screen,
   navigate with arrows / keyboard / swipe, close with × / backdrop / Esc. */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll(".gallery img"));
  if (!imgs.length) return;

  var i = 0;
  var ov = document.createElement("div");
  ov.className = "lightbox";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-label", "Photo viewer");
  ov.innerHTML =
    '<button class="lightbox__close" aria-label="Close">×</button>' +
    '<button class="lightbox__nav lightbox__prev" aria-label="Previous photo">‹</button>' +
    '<img class="lightbox__img" alt="" />' +
    '<button class="lightbox__nav lightbox__next" aria-label="Next photo">›</button>' +
    '<span class="lightbox__count"></span>';
  document.body.appendChild(ov);

  var imgEl = ov.querySelector(".lightbox__img");
  var countEl = ov.querySelector(".lightbox__count");

  function show(n) {
    i = (n + imgs.length) % imgs.length;
    imgEl.src = imgs[i].currentSrc || imgs[i].src;
    imgEl.alt = imgs[i].alt || "";
    countEl.textContent = (i + 1) + " / " + imgs.length;
  }
  function open(n) { show(n); ov.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function close() { ov.classList.remove("is-open"); document.body.style.overflow = ""; }

  imgs.forEach(function (im, idx) { im.addEventListener("click", function () { open(idx); }); });
  ov.querySelector(".lightbox__close").addEventListener("click", close);
  ov.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(i - 1); });
  ov.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(i + 1); });
  ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
  document.addEventListener("keydown", function (e) {
    if (!ov.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(i - 1);
    else if (e.key === "ArrowRight") show(i + 1);
  });

  // touch swipe
  var sx = 0;
  ov.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  ov.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  });
})();
