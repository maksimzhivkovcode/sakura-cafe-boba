# AGENTS.md — Sakura Café & Boba

## Tech stack

- **HTML5** — semantic markup, accessible structure
- **CSS3** — Flexbox, Grid, CSS custom properties (variables)
- **JavaScript** — Vanilla ES6+ (`'use strict'`)
- **No external frameworks** — no React, Vue, Tailwind, jQuery, or CSS/JS libraries unless explicitly requested

## Approach

- **Mobile-first** responsive layout
- **Breakpoints:** 480px, 768px, 1024px
- **Performance:** lean assets, minimal dependencies

## CSS methodology

- **BEM** naming: `Block__element--modifier`
- Example: `hero__title`, `menu-preview__card--featured`

## Localization & content

- **Language:** Finnish (`lang="fi"` on `<html>`)
- **Currency:** Euro (€)
- **Audience:** local customers in Vantaa, Finland

## Project structure

```
/
├── index.html
├── info.md
├── AGENTS.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── icons/
```

## Conventions

- Comments in code: English
- User-facing copy: Finnish
- Match existing patterns before adding new abstractions
- Keep diffs minimal and production-ready
