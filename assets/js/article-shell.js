/* ===== Shared article shell renderer ===== */
(function() {
  const main = document.querySelector('main.paper-main');
  if (!main) return;

  if (!main.id) main.id = 'paperMain';

  const currentScript = document.currentScript || document.querySelector('script[src$="article-shell.js"]');
  const basePath = currentScript
    ? currentScript.getAttribute('src').replace(/assets\/js\/article-shell\.js$/, '')
    : '../../';

  const title = document.body.dataset.articleTitle ||
    main.querySelector('.paper-header h1')?.textContent.trim() ||
    document.title.replace(/\s*·\s*ChuJiuMao's Blog\s*$/, '');
  const category = document.body.dataset.articleCategory ||
    main.querySelector('.article-type')?.textContent.trim() ||
    'Article';

  document.title = `${title} · ChuJiuMao's Blog`;

  function html(strings, ...values) {
    const template = document.createElement('template');
    template.innerHTML = strings.reduce((acc, part, index) => acc + part + (values[index] || ''), '').trim();
    return template.content.firstElementChild;
  }

  function icon(name) {
    const icons = {
      sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
      settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
      top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>',
      toc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M4 12h10M4 18h16"/></svg>'
    };
    return icons[name];
  }

  function normalizeBookLabel(text) {
    const trimmed = text.trim();
    const part = trimmed.match(/^(第[一二三四五六七八九十]+部分)\s+(.+?)(?:\s+[A-Za-z].*)?$/);
    if (part) return `${part[1]}：${part[2]}`;
    if (/^第\s*\d+\s*章/.test(trimmed)) {
      return trimmed.replace(/\s+[A-Z][A-Za-z ,:'-]*$/, '');
    }
    return trimmed.replace(/\s+[A-Z][A-Za-z ,:'-]*$/, '');
  }

  function sectionHeading(section) {
    return Array.from(section.children).find(child => /^H[2-4]$/.test(child.tagName));
  }

  function appendLink(li, section, label) {
    const anchor = document.createElement('a');
    anchor.href = `#${section.id}`;
    anchor.innerHTML = label;
    li.appendChild(anchor);
  }

  function buildBookToc(body) {
    const root = document.createElement('ol');
    let currentPart = null;
    let currentChildren = null;
    let currentEndnotesChildren = null;

    body.querySelectorAll(':scope > section[id]').forEach(section => {
      if (section.dataset.tocSkip === 'true') return;
      const heading = sectionHeading(section);
      if (!heading) return;

      const label = normalizeBookLabel(heading.textContent);
      const li = document.createElement('li');
      appendLink(li, section, label);

      const childSections = section.querySelectorAll(':scope > section[id]');
      if (childSections.length) {
        const childOl = document.createElement('ol');
        childSections.forEach(child => {
          const ch = sectionHeading(child);
          if (!ch) return;
          const childLi = document.createElement('li');
          appendLink(childLi, child, normalizeBookLabel(ch.textContent));
          childOl.appendChild(childLi);
        });
        if (childOl.children.length) li.appendChild(childOl);
      }

      const isPart = /^第[一二三四五六七八九十]+部分/.test(label);
      const isChapter = /^第\s*\d+\s*章/.test(label);

      if (label === '尾注') {
        currentPart = null;
        currentChildren = null;
        const existingOl = li.querySelector(':scope > ol');
        currentEndnotesChildren = existingOl || document.createElement('ol');
        if (!existingOl) li.appendChild(currentEndnotesChildren);
        root.appendChild(li);
        return;
      }

      if (currentEndnotesChildren && isChapter) {
        currentEndnotesChildren.appendChild(li);
        return;
      }

      if (currentEndnotesChildren && !isChapter) {
        currentEndnotesChildren = null;
      }

      if (isPart) {
        currentPart = li;
        currentChildren = li.querySelector(':scope > ol') || document.createElement('ol');
        if (!li.querySelector(':scope > ol')) li.appendChild(currentChildren);
        root.appendChild(li);
      } else if (currentChildren && isChapter) {
        currentChildren.appendChild(li);
      } else {
        currentPart = null;
        currentChildren = null;
        root.appendChild(li);
      }
    });

    return root;
  }

  function buildArticleTocList(parent) {
    const list = document.createElement('ol');
    parent.querySelectorAll(':scope > section[id]').forEach(section => {
      if (section.dataset.tocSkip === 'true') return;
      const heading = sectionHeading(section);
      if (!heading) return;

      const li = document.createElement('li');
      appendLink(li, section, heading.innerHTML);

      const childList = buildArticleTocList(section);
      if (childList.children.length) li.appendChild(childList);

      list.appendChild(li);
    });
    return list;
  }

  function buildToc() {
    const body = main.querySelector('.paper-body');
    const list = category === 'Book' && body ? buildBookToc(body) : buildArticleTocList(body || main);
    const sidebar = html`
      <aside class="toc-sidebar" id="tocSidebar">
        <div class="toc-header">
          <h2>目录</h2>
        </div>
        <nav></nav>
      </aside>
    `;
    sidebar.querySelector('nav').appendChild(list);
    return sidebar;
  }

  function renderTopChrome() {
    document.body.prepend(html`
      <nav class="nav-bar">
        <div class="nav-inner">
          <a href="${basePath}index.html" class="logo"><span>C</span>huJiuMao</a>
          <div class="nav-links" id="navLinks">
            <a href="${basePath}index.html">首页</a>
            <a href="${basePath}archives.html">归档</a>
            <a href="${basePath}categories.html">分类</a>
            <a href="${basePath}about.html">关于</a>
            <a href="https://github.com/ChuJiuMao" target="_blank">GitHub</a>
          </div>
          <div class="nav-right">
            <button class="nav-menu-btn" id="navMenuBtn" aria-label="菜单">☰</button>
          </div>
        </div>
      </nav>
    `);

    document.querySelector('.nav-bar').after(html`
      <div class="breadcrumb">
        <a href="${basePath}index.html">首页</a>
        <span class="sep">›</span>
        <a href="${basePath}categories.html">${category}</a>
        <span class="sep">›</span>
        <span>${title}</span>
      </div>
    `);

    document.body.prepend(html`
      <div class="reader-tools" id="readerTools">
        <button class="reader-tools-toggle" type="button" aria-expanded="true" aria-label="展开阅读工具">☰</button>
        <div class="reader-tools-panel">
          <button class="fab" id="themeToggle" title="切换日间/夜间模式">${icon('sun')}</button>
          <button class="fab" id="settingsToggle" title="阅读设置">${icon('settings')}</button>
          <button class="fab" id="topBtn" title="回到顶部">${icon('top')}</button>
          <button class="fab fab-toc" id="tocToggleBtn" title="目录" aria-label="目录">${icon('toc')}</button>
        </div>
      </div>
    `);

    document.body.insertBefore(html`<div class="toc-overlay" id="tocOverlay"></div>`, main);
    document.body.insertBefore(html`<div class="settings-overlay" id="settingsOverlay"></div>`, main);
    document.body.classList.add('reader-tools-visible');

    // Collapsible toolbar on narrow screens
    const tools = document.getElementById('readerTools');
    const toggleBtn = tools?.querySelector('.reader-tools-toggle');
    if (tools && toggleBtn) {
      const mq = window.matchMedia('(max-width: 1100px)');
      function setCollapsed(c) {
        tools.classList.toggle('is-collapsed', c);
        toggleBtn.setAttribute('aria-expanded', String(!c));
      }
      function syncToolsMode() {
        if (mq.matches) {
          setCollapsed(true);
        } else {
          tools.classList.remove('is-collapsed');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      }
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!mq.matches) return;
        setCollapsed(!tools.classList.contains('is-collapsed'));
      });
      document.addEventListener('click', function(e) {
        if (!mq.matches) return;
        if (!tools.contains(e.target)) setCollapsed(true);
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mq.matches) setCollapsed(true);
      });
      mq.addEventListener('change', syncToolsMode);
      syncToolsMode();
    }
  }

  function renderLayout() {
    const wrapper = html`<div class="page-wrapper" id="pageWrapper"></div>`;
    main.before(wrapper);
    wrapper.appendChild(buildToc());
    wrapper.appendChild(main);
  }

  function renderSettingsPanel() {
    document.body.appendChild(html`
      <aside class="settings-panel" id="settingsPanel">
        <div class="panel-header">
          <h3>阅读设置</h3>
          <button class="close-btn" id="settingsClose" type="button">&times;</button>
        </div>
        <div class="section">
          <div class="section-title">字体 Typography</div>
          <div class="field">
            <label for="headingFont">标题字体</label>
            <select id="headingFont">
              <option value="'Inter','Noto Sans SC','PingFang SC',sans-serif">Inter / Sans CN</option>
              <option value="'Noto Serif SC','Source Serif 4','Songti SC',Georgia,serif">Serif CN</option>
              <option value="Georgia,'Source Serif 4',serif">Georgia</option>
              <option value="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif">黑体 Sans</option>
            </select>
          </div>
          <div class="field">
            <label for="bodyFont">正文字体</label>
            <select id="bodyFont">
              <option value="'Noto Serif SC','Source Serif 4','Songti SC',Georgia,serif">Serif CN</option>
              <option value="'Source Serif 4','Noto Serif SC',Georgia,serif">Source Serif</option>
              <option value="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif">Sans CN</option>
              <option value="Georgia,'Times New Roman',serif">Georgia</option>
            </select>
          </div>
          <div class="field">
            <label for="fontSize">字号</label>
            <input type="range" id="fontSize" min="14" max="22" step="1" value="17">
            <span class="val" id="fontSizeVal">17px</span>
          </div>
          <div class="field">
            <label for="lineHeight">行高</label>
            <input type="range" id="lineHeight" min="1.4" max="2.2" step="0.05" value="1.8">
            <span class="val" id="lineHeightVal">1.80</span>
          </div>
          <div class="field">
            <label for="paraSpacing">段距</label>
            <input type="range" id="paraSpacing" min="0.6" max="2.2" step="0.1" value="1.2">
            <span class="val" id="paraSpacingVal">1.2em</span>
          </div>
          <div class="field">
            <label for="indentToggle">首行缩进</label>
            <label class="switch"><input type="checkbox" id="indentToggle"><span class="slider"></span></label>
          </div>
          <div class="field">
            <label for="justifyToggle">两端对齐</label>
            <label class="switch"><input type="checkbox" id="justifyToggle"><span class="slider"></span></label>
          </div>
        </div>
        <div class="section">
          <div class="section-title">布局 Layout</div>
          <div class="field">
            <label for="contentWidth">正文宽度</label>
            <input type="range" id="contentWidth" min="600" max="1100" step="20" value="780">
            <span class="val" id="contentWidthVal">780px</span>
          </div>
          <div class="field">
            <label for="boundaryToggle">正文边界线</label>
            <label class="switch"><input type="checkbox" id="boundaryToggle"><span class="slider"></span></label>
          </div>
          <div class="field">
            <label for="tocToggle">显示目录</label>
            <label class="switch"><input type="checkbox" id="tocToggle" checked><span class="slider"></span></label>
          </div>
          <div class="field">
            <label for="tocWidth">目录宽度</label>
            <input type="range" id="tocWidth" min="180" max="360" step="10" value="240">
            <span class="val" id="tocWidthVal">240px</span>
          </div>
        </div>
        <div class="section">
          <div class="section-title">日间配色 Day Colors</div>
          <div class="field">
            <label for="dayThemeColor">主题色</label>
            <input type="color" id="dayThemeColor" value="#286983">
            <span class="val" id="dayThemeColorVal">#286983</span>
          </div>
          <div class="field">
            <label for="dayTextColor">文字色</label>
            <input type="color" id="dayTextColor" value="#575279">
            <span class="val" id="dayTextColorVal">#575279</span>
          </div>
          <div class="field">
            <label for="dayBgColor">背景色</label>
            <input type="color" id="dayBgColor" value="#faf4ed">
            <span class="val" id="dayBgColorVal">#faf4ed</span>
          </div>
        </div>
        <div class="section">
          <div class="section-title">夜间配色 Night Colors</div>
          <div class="field">
            <label for="nightThemeColor">主题色</label>
            <input type="color" id="nightThemeColor" value="#9ccfd8">
            <span class="val" id="nightThemeColorVal">#9ccfd8</span>
          </div>
          <div class="field">
            <label for="nightTextColor">文字色</label>
            <input type="color" id="nightTextColor" value="#e0def4">
            <span class="val" id="nightTextColorVal">#e0def4</span>
          </div>
          <div class="field">
            <label for="nightBgColor">背景色</label>
            <input type="color" id="nightBgColor" value="#191724">
            <span class="val" id="nightBgColorVal">#191724</span>
          </div>
        </div>
      </aside>
    `);
  }

  renderTopChrome();
  renderLayout();
  renderSettingsPanel();
})();
