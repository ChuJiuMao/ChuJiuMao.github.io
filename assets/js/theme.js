/* ===== Theme Toggle (shared across all pages) ===== */
(function() {
  const root = document.documentElement;
  const KEY = 'hexi-blog-prefs';

  function save(prefs) { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch(e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; } }

  const prefs = load();

  // ---- Theme toggle ----
  const themeBtn = document.getElementById('themeToggle');
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    prefs.theme = theme;
    save(prefs);

    // Update toggle button icon visibility
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'day'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      applyTheme(root.getAttribute('data-theme') === 'day' ? 'night' : 'day');
    });
  }

  // Apply saved theme, respect system preference as default
  if (prefs.theme) {
    applyTheme(prefs.theme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('night');
  } else {
    applyTheme('day');
  }
})();

// ---- Article page: settings panel ----
(function() {
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const openBtn = document.getElementById('settingsToggle');
  const closeBtn = document.getElementById('settingsClose');
  if (!panel || !openBtn) return;

  const KEY = 'hexi-blog-prefs';
  function save(prefs) { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch(e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; } }
  const prefs = load();

  function openPanel() { panel.classList.add('open'); overlay.classList.add('open'); }
  function closePanel() { panel.classList.remove('open'); overlay.classList.remove('open'); }
  openBtn.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  if (overlay) overlay.addEventListener('click', closePanel);

  // Scroll to top
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    topBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Range binding
  function bindRange(id, cssVar, unit, formatter) {
    const input = document.getElementById(id);
    const valEl = document.getElementById(id + 'Val');
    if (!input || !valEl) return;
    if (prefs[id] !== undefined) input.value = prefs[id];
    function apply() {
      const v = input.value;
      document.documentElement.style.setProperty(cssVar, v + unit);
      valEl.textContent = (formatter ? formatter(v) : v) + unit;
      prefs[id] = v; save(prefs);
    }
    input.addEventListener('input', apply);
    apply();
  }

  bindRange('fontSize', '--font-size', 'px');
  bindRange('lineHeight', '--line-height', '', v => Number(v).toFixed(2));
  bindRange('paraSpacing', '--para-spacing', 'em', v => Number(v).toFixed(1));
  bindRange('contentWidth', '--content-width', 'px');
  bindRange('tocWidth', '--toc-width', 'px');

  // Select binding
  function bindSelect(id, cssVar) {
    const input = document.getElementById(id);
    if (!input) return;
    if (prefs[id]) input.value = prefs[id];
    function apply() {
      document.documentElement.style.setProperty(cssVar, input.value);
      prefs[id] = input.value; save(prefs);
    }
    input.addEventListener('change', apply);
    apply();
  }

  bindSelect('headingFont', '--heading-font');
  bindSelect('bodyFont', '--body-font');

  // Toggle binding
  function bindToggle(id, onChange) {
    const input = document.getElementById(id);
    if (!input) return;
    if (typeof prefs[id] === 'boolean') input.checked = prefs[id];
    function apply() { onChange(input.checked); prefs[id] = input.checked; save(prefs); }
    input.addEventListener('change', apply);
    apply();
  }

  bindToggle('indentToggle', checked => { document.documentElement.style.setProperty('--indent', checked ? '2em' : '0em'); });
  bindToggle('justifyToggle', checked => { document.documentElement.style.setProperty('--text-align', checked ? 'justify' : 'left'); });
  bindToggle('boundaryToggle', checked => { document.documentElement.style.setProperty('--boundary', checked ? 'var(--hl-med)' : 'transparent'); });
  bindToggle('tocToggle', checked => { document.getElementById('pageWrapper')?.classList.toggle('no-toc', !checked); });

  // Color picker binding
  function applyColors(theme) {
    const root = document.documentElement;
    if (theme === 'day') {
      root.style.setProperty('--theme-color', prefs.dayThemeColor || '#286983');
      root.style.setProperty('--text-color', prefs.dayTextColor || '#575279');
      root.style.setProperty('--bg-color', prefs.dayBgColor || '#faf4ed');
      root.style.setProperty('--surface', lighten(prefs.dayBgColor || '#faf4ed', 5));
      root.style.setProperty('--hl-low', lighten(prefs.dayBgColor || '#faf4ed', -3));
      root.style.setProperty('--hl-med', lighten(prefs.dayBgColor || '#faf4ed', -10));
    } else {
      root.style.setProperty('--theme-color', prefs.nightThemeColor || '#9ccfd8');
      root.style.setProperty('--text-color', prefs.nightTextColor || '#e0def4');
      root.style.setProperty('--bg-color', prefs.nightBgColor || '#191724');
      root.style.setProperty('--surface', lighten(prefs.nightBgColor || '#191724', 4));
      root.style.setProperty('--hl-low', lighten(prefs.nightBgColor || '#191724', 6));
      root.style.setProperty('--hl-med', lighten(prefs.nightBgColor || '#191724', 14));
    }
  }

  function lighten(hex, amt) {
    const r = Math.min(255, Math.max(0, parseInt(hex.slice(1,3), 16) + amt));
    const g = Math.min(255, Math.max(0, parseInt(hex.slice(3,5), 16) + amt));
    const b = Math.min(255, Math.max(0, parseInt(hex.slice(5,7), 16) + amt));
    return '#' + [r,g,b].map(c => c.toString(16).padStart(2,'0')).join('');
  }

  function bindColor(id) {
    const input = document.getElementById(id);
    const valEl = document.getElementById(id + 'Val');
    if (!input || !valEl) return;
    if (prefs[id]) { input.value = prefs[id]; }
    function apply() {
      valEl.textContent = input.value;
      prefs[id] = input.value; save(prefs);
      applyColors(document.documentElement.getAttribute('data-theme'));
    }
    input.addEventListener('input', apply);
  }

  bindColor('dayThemeColor');
  bindColor('dayTextColor');
  bindColor('dayBgColor');
  bindColor('nightThemeColor');
  bindColor('nightTextColor');
  bindColor('nightBgColor');
})();

// ---- Article page: TOC scroll-spy ----
(function() {
  const sections = document.querySelectorAll('.paper-body section[id]');
  const tocLinks = document.querySelectorAll('.toc-sidebar nav a');
  if (!sections.length || !tocLinks.length) return;

  function updateToc() {
    const scrollY = window.scrollY + 120;
    let active = sections[0];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollY) active = sections[i];
    }
    tocLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + active.id);
    });
  }
  window.addEventListener('scroll', updateToc, { passive: true });
  updateToc();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', this.getAttribute('href'));
      }
    });
  });
})();

// ---- Mobile nav toggle ----
(function() {
  const menuBtn = document.getElementById('navMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
})();

// ---- Article page: TOC mobile drawer ----
(function() {
  const sidebar = document.getElementById('tocSidebar');
  const btn = document.getElementById('tocToggleBtn');
  const overlay = document.getElementById('tocOverlay');
  if (!sidebar || !btn) return;

  function close() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }
  btn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  });
  if (overlay) overlay.addEventListener('click', close);
  sidebar.addEventListener('click', function(e) {
    if (e.target.closest('a')) close();
  });
})();
