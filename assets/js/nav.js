/* ===== Lightweight nav-only fallback ===== */
/* Current pages use theme.js, which already handles mobile navigation. */

(function() {
  // Mobile nav toggle
  var menuBtn = document.getElementById('navMenuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
})();
