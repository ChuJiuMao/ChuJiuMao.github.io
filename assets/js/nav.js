/* ===== Lightweight nav-only script for article pages ===== */
/* (Article pages have their own inline JS for theme/settings/TOC) */

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
