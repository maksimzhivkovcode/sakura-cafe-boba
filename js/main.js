'use strict';

/**
 * Sakura Café & Boba — main entry
 */

(function init() {
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (typeof bootstrapMenuI18n === 'function') {
    bootstrapMenuI18n();
  }

  initMenuTabs();
  initLanguageSwitch();
  initHeaderNav();
})();

function initHeaderNav() {
  const header = document.querySelector('[data-header]');

  if (!header) {
    return;
  }

  const toggle = header.querySelector('.header__toggle');
  const panel = header.querySelector('#header-menu');
  const navLinks = panel ? panel.querySelectorAll('.header__link') : [];
  const DESKTOP_MQ = window.matchMedia('(min-width: 768px)');

  if (!toggle || !panel) {
    return;
  }

  const LABEL_OPEN = { fi: 'Avaa valikko', en: 'Open menu' };
  const LABEL_CLOSE = { fi: 'Sulje valikko', en: 'Close menu' };

  function currentLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'fi';
  }

  function setToggleLabel(open) {
    const lang = currentLang();
    const text = open ? LABEL_CLOSE[lang] : LABEL_OPEN[lang];
    toggle.setAttribute('aria-label', text);
  }

  function setOpen(open) {
    header.classList.toggle('header--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (DESKTOP_MQ.matches) {
      panel.hidden = false;
      return;
    }

    panel.hidden = !open;
    setToggleLabel(open);
  }

  function close() {
    setOpen(false);
  }

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('header--open');
    setOpen(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!DESKTOP_MQ.matches) {
        close();
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('header--open')) {
      close();
      toggle.focus();
    }
  });

  function syncViewport() {
    if (DESKTOP_MQ.matches) {
      header.classList.remove('header--open');
      toggle.setAttribute('aria-expanded', 'false');
      panel.hidden = false;
      setToggleLabel(false);
    } else {
      panel.hidden = !header.classList.contains('header--open');
      setToggleLabel(header.classList.contains('header--open'));
    }
  }

  if (typeof DESKTOP_MQ.addEventListener === 'function') {
    DESKTOP_MQ.addEventListener('change', syncViewport);
  } else {
    DESKTOP_MQ.addListener(syncViewport);
  }

  setToggleLabel(false);
  syncViewport();
}

function initLanguageSwitch() {
  const switcher = document.querySelector('[data-lang-switch]');

  if (!switcher) {
    return;
  }

  const STORAGE_KEY = 'sakura-lang';
  const buttons = switcher.querySelectorAll('[data-lang]');
  const translatable = document.querySelectorAll('[data-fi][data-en]');

  function setLanguage(lang) {
    const activeLang = lang === 'en' ? 'en' : 'fi';

    document.documentElement.lang = activeLang;

    translatable.forEach((element) => {
      const text = element.getAttribute(`data-${activeLang}`);

      if (text) {
        element.textContent = text;
      }
    });

    const tablist = document.querySelector('[data-menu-tablist]');

    if (tablist) {
      const label = tablist.getAttribute(`data-${activeLang}-label`);

      if (label) {
        tablist.setAttribute('aria-label', label);
      }
    }

    buttons.forEach((button) => {
      const isActive = button.getAttribute('data-lang') === activeLang;
      button.classList.toggle('lang-switch__btn--active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, activeLang);
    } catch {
      /* ignore storage errors */
    }

    document.dispatchEvent(
      new CustomEvent('sakura:langchange', { detail: { lang: activeLang } })
    );
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.getAttribute('data-lang'));
    });
  });

  let initialLang = 'fi';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === 'fi' || saved === 'en') {
      initialLang = saved;
    }
  } catch {
    /* ignore storage errors */
  }

  if (initialLang !== 'fi') {
    setLanguage(initialLang);
  } else {
    const tablist = document.querySelector('[data-menu-tablist]');
    const label = tablist && tablist.getAttribute('data-fi-label');
    if (tablist && label) {
      tablist.setAttribute('aria-label', label);
    }
  }

  document.addEventListener('sakura:langchange', (event) => {
    const lang = event.detail && event.detail.lang === 'en' ? 'en' : 'fi';
    const header = document.querySelector('[data-header]');
    const toggle = header && header.querySelector('.header__toggle');

    if (!toggle) {
      return;
    }

    const open = header.classList.contains('header--open');
    const LABEL_OPEN = { fi: 'Avaa valikko', en: 'Open menu' };
    const LABEL_CLOSE = { fi: 'Sulje valikko', en: 'Close menu' };
    toggle.setAttribute('aria-label', open ? LABEL_CLOSE[lang] : LABEL_OPEN[lang]);
  });
}

function initMenuTabs() {
  const tablist = document.querySelector('[data-menu-tablist]');

  if (!tablist) {
    return;
  }

  const tabs = tablist.querySelectorAll('[data-menu-tab]');
  const panels = document.querySelectorAll('[data-menu-panel]');

  function activateTab(tab) {
    const target = tab.getAttribute('data-menu-tab');

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('menu__tab--active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
      item.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const match = panel.getAttribute('data-menu-panel') === target;
      panel.classList.toggle('menu__panel--hidden', !match);
      panel.hidden = !match;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      const index = Array.from(tabs).indexOf(tab);
      let nextIndex = index;

      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      event.preventDefault();
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });
}
