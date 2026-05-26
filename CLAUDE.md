# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static, hand-authored personal blog (despite the directory name `hexo`, no Hexo or any other generator is used). Pages are plain HTML files served directly; there is no build step, no package.json, no JS bundler. Content is primarily long-form Chinese translations of academic papers and books, with MathJax for equations.

## Development workflow

- Preview locally: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000/`. There is no build command and nothing to install.
- No tests, no linter, no CI configured.
- Check changes by opening pages in a browser at the three required breakpoints: 1100px (TOC sidebar collapses to drawer), 640px, and 380px. Mobile responsiveness is the main thing that breaks — see "Mobile-layout invariant" below.

## Architecture

### Page types and their job

- `index.html`, `archives.html`, `categories.html`, `about.html` — top-level navigation pages. They share `assets/css/global.css` for navigation, footer, archive/category/about layouts, and load `assets/js/theme.js` at the bottom. The post list on `index.html` is hardcoded; adding a post means editing `index.html`, `archives.html`, and `categories.html` by hand.
- `posts/article/*.html` — individual articles/books. All posts (including books) currently live under `posts/article/` regardless of category. Each post is created by copying `posts/_template.html` and filling it in; it links to `../assets/css/global.css` + `../assets/css/article.css` + `../assets/js/theme.js`. Article HTML can be very large (1–2 MB for translated papers with embedded data).
- `posts/_template.html` — the canonical article skeleton. Always start new articles from this file. It contains a header comment warning against inline layout CSS (see invariant below); do not delete that comment.

### Styling

- `assets/css/global.css` — color tokens (Rosé Pine Dawn for day, Rosé Pine for night), typography vars, nav bar, breadcrumb, footer, post-nav, and top-level page layouts. Theme switching is driven by `[data-theme="day|night"]` on `<html>`.
- `assets/css/home.css` — index page only.
- `assets/css/article.css` — all article-page layout: `.page-wrapper` (uses `padding-left + position: fixed` for the TOC, deliberately not CSS Grid), `.toc-sidebar`, `.paper-main`, settings panel, FAB group, responsive breakpoints at 1100/640/380px.

### JS

- `assets/js/theme.js` — single shared script for every page. Handles theme toggle, settings panel (font/spacing/width/colors with localStorage persistence under key `hexo-blog-prefs`), TOC scroll-spy + smooth-scroll, mobile nav drawer, mobile TOC drawer. Pages without a settings panel or TOC just no-op the relevant blocks (each is wrapped in an IIFE that early-returns if its DOM nodes are missing).
- `assets/js/nav.js` — minimal mobile-nav-only fallback; not currently used by any page because `theme.js` already handles mobile navigation.

### Other

- `figures/` — shared image assets referenced from articles via `../figures/figN.jpg`.
- `_dev/SOP-学术文章处理流程.md` — the operating manual for content production. **Read this before producing or modifying article content.** It covers PDF→HTML extraction, MathJax/LaTeX reconstruction, figure cropping with PyMuPDF + PIL, cross-reference anchor naming, Chinese academic translation rules, parallel-translation workflow for long books, and the full set of known pitfalls.
- `.gitignore` excludes `_dev/`, `*.pdf`, `*.epub`, `__pycache__/`. Don't commit source PDFs or generated PDFs/EPUBs.

## Mobile-layout invariant (load-bearing)

**Never put layout CSS inside an article's `<style>` block.** Specifically: `.page-wrapper`, `.paper-main`, `.toc-sidebar`, `.paper-body`, or any grid/flex/responsive rules belong only in `assets/css/article.css`. Inline `<style>` rules outrank the external stylesheet's `@media` queries even without their own `@media`, so on mobile you get the catastrophic "one Chinese character per line" failure mode where the body collapses to ~50px and the TOC drawer stops working.

What's allowed inside an article's `<style>`: small presentational quirks specific to that article only — `.eq-number`, `.color-field`, `.data-box`, etc. The warning comment in `_template.html` exists for this reason; keep it.

## Anchor naming for cross-references

Articles use a strict scheme so SOP-style auto-linking is reliable:
- Figures: `id="fig-N"` / `href="#fig-N"`
- Equations: `id="eq-N"` / `href="#eq-N"`
- Tables: `id="tbl-N"` / `href="#tbl-N"`
- Methods: `id="methods"`, sub-sections `id="method-{name}"`
- References: `id="ref-N"` / `href="#ref-N"`, range citations like `[42-45]` get expanded into individual links.

Avoid producing nested `<a>` tags during regex-based replacement — the SOP describes the order to apply replacements in.

## Adding a post

1. Copy `posts/_template.html` to `posts/article/<slug>.html`. Fill in title, authors, meta, body, references; respect the anchor scheme above.
2. Add a card to `index.html` (`<article class="post-item" data-category="Article|Book">`).
3. Add an entry to `archives.html` under the right year, and to `categories.html` under the right category.
4. If the new post needs a category not already in `index.html`'s tab list, also add a `.category-tab` button there.

## Translation work (long articles, books)

Use `model="haiku"` agents in parallel for chapter-level translation, but expect mixed-language paragraphs to leak through — the SOP §8.3 documents the post-pass that scans for residual English content words and fixes them in row-range-isolated batches so parallel agents don't fight over the same file. Don't translate references; do translate `\text{}` content inside MathJax. Keep proper nouns (people, companies, products) in English.
