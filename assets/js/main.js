(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Theme toggle ----------
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ---------- Placeholder when a video file is missing ----------
  document.querySelectorAll("[data-fallback]").forEach(function (frame) {
    var video = frame.querySelector("video");
    var sources = frame.querySelectorAll("source");
    if (!video || !sources.length) return;
    var markMissing = function () { frame.classList.add("is-missing"); };
    sources[sources.length - 1].addEventListener("error", markMissing);
    video.addEventListener("error", markMissing);
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) markMissing();
  });

  // ---------- Play videos only while they are on screen ----------
  var autoVideos = document.querySelectorAll("video[data-autoplay]");
  function tryPlay(v) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) tryPlay(e.target);
        else e.target.pause();
      });
    }, { threshold: 0.35 });
    autoVideos.forEach(function (v) { io.observe(v); });
  }

  // ---------- MarvisNav run picker ----------
  var navFrame = document.getElementById("nav-frame");
  var navVideo = document.getElementById("nav-video");
  var navMeta = document.getElementById("nav-meta");
  var chips = document.querySelectorAll(".chip[data-src]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      if (chip.getAttribute("aria-pressed") === "true") return;
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      navFrame.style.aspectRatio = chip.dataset.ratio;
      navVideo.poster = chip.dataset.poster;
      navVideo.querySelector("source").src = chip.dataset.src;
      navVideo.load();
      tryPlay(navVideo);
      if (navMeta) navMeta.textContent = chip.dataset.meta;
    });
  });

  // ---------- Footer year ----------
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
