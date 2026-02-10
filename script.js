/*
  script.js — Vanilla JS for:
    - Language toggle (English / Malayalam) using `data-en` / `data-ml`
    - Dark mode toggle with `localStorage` persistence
    - Accordion open/close logic for services page
    - Simple scroll reveal using IntersectionObserver

  Beginner notes:
    - To add bilingual content, include both `data-en` and `data-ml` on elements.
    - The language system will replace the element's textContent with the selected language.
    - Theme is stored in localStorage under 'site-theme'. Use 'dark' or 'light'.
*/

(function () {
  const LS_LANG = 'site-lang';
  const LS_THEME = 'site-theme';

  /* -----------------------------
     Utility: set current year in footer
     ----------------------------- */
  function setYear() {
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    const el2 = document.getElementById('year-2');
    if (el) el.textContent = y;
    if (el2) el2.textContent = y;
  }

  /* -----------------------------
     Language toggle system

     - Elements that need translation should have both `data-en` and `data-ml` attributes.
     - Call `applyLanguage('en'|'ml')` to switch site text.
     - The script saves selection to localStorage so it persists across pages.
     ----------------------------- */
  function applyLanguage(lang) {
    // Replace any element that has data-en (covers headings, paragraphs, buttons, list items)
    document.querySelectorAll('[data-en]').forEach(el => {
      const en = el.getAttribute('data-en');
      const ml = el.getAttribute('data-ml');
      if (lang === 'ml' && ml !== null) el.textContent = ml;
      else if (en !== null) el.textContent = en;
    });

    // Update language toggle button label(s)
    document.querySelectorAll('#lang-toggle, #lang-toggle-2').forEach(btn => {
      if (btn) btn.textContent = (lang === 'ml') ? 'ML' : 'EN';
    });

    // persist
    localStorage.setItem(LS_LANG, lang);
  }

  /* -----------------------------
     Theme handling: dark / light

     - Sets `html[data-theme]` to 'dark' or 'light'.
     - Stores preference in localStorage.
     - Button text updates to reflect next action.
     ----------------------------- */
  // Inline SVGs used for theme toggle buttons (keeps visuals consistent and avoids emoji)
  const MOON_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  const SUN_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.85l1.79 1.79L6.76 4.84zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.04-17.04l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17 13h3v-2h-3v2zM6.76 19.16l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>';

  function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.setAttribute('data-theme', 'light');
    document.querySelectorAll('#theme-toggle, #theme-toggle-2').forEach(btn => {
      if (!btn) return;
      // Use innerHTML to place the SVG; keep aria-pressed in markup if needed
      btn.innerHTML = (theme === 'dark') ? SUN_SVG : MOON_SVG;
    });
    localStorage.setItem(LS_THEME, theme);
  }

  /* -----------------------------
     Scroll reveal using IntersectionObserver
     - Adds `.visible` when element enters viewport
     ----------------------------- */
  function setupObserver() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
  }

  /* -----------------------------
     Accordion logic (services page)

     - Each accordion item should use this structure:
         <article class="accordion-item">
           <button class="accordion-header" aria-expanded="false">...</button>
           <div class="accordion-panel">...</div>
         </article>

     - The script toggles the `.open` class and `aria-expanded`.
     - Only toggles the clicked item (does not auto-close others) — easy to change if desired.
     ----------------------------- */
  function setupAccordion() {
    document.querySelectorAll('.accordion').forEach(container => {
      container.querySelectorAll('.accordion-item').forEach(item => {
        const btn = item.querySelector('.accordion-header');
        const panel = item.querySelector('.accordion-panel');
        if (!btn || !panel) return;

        // Click toggles open state
        btn.addEventListener('click', () => {
          const isOpen = item.classList.toggle('open');
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

          // Smooth max-height animation: set to scrollHeight when open, otherwise reset
          if (isOpen) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          } else {
            panel.style.maxHeight = null;
          }
        });
      });
    });
  }

  /* -----------------------------
     Small responsive nav toggle
     ----------------------------- */
  function setupNavToggle() {
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* -----------------------------
     Initialization on DOMContentLoaded
  ----------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setupObserver();
    setupNavToggle();
    setupAccordion();

    // initial language (default: English)
    const savedLang = localStorage.getItem(LS_LANG) || 'en';
    applyLanguage(savedLang);

    // initial theme: default to DARK mode
    const savedTheme = localStorage.getItem(LS_THEME) || 'dark';
    applyTheme(savedTheme);

    // language buttons
    document.querySelectorAll('#lang-toggle, #lang-toggle-2').forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const newLang = (localStorage.getItem(LS_LANG) === 'ml') ? 'en' : 'ml';
        applyLanguage(newLang);
      });
    });

    // theme buttons
    document.querySelectorAll('#theme-toggle, #theme-toggle-2').forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });

})();

