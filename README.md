# VEYRA Landing Page

> **Freeze-dried fruit snacks for people who train, work, and care about what goes into their body.**  
> Pre-launch landing page · Kuwait · Bilingual (EN / AR)

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/veyra/deploys)

---

## Overview

VEYRA is a direct-to-consumer freeze-dried fruit brand launching in Kuwait. This repository contains the complete pre-launch landing page — a single-page React application built with Vite, Framer Motion, and Tailwind CSS v4.

The page is designed to collect early-access signups (WhatsApp + email), drive waitlist conversions, and communicate the VEYRA brand before the product launches.

---

## Features

| Feature | Details |
|---|---|
| **Bilingual** | Full English / Arabic support with automatic RTL layout switching |
| **Auto language detection** | Detects browser language and timezone (Gulf timezones → Arabic) |
| **Countdown timer** | 48-hour looping timer with `localStorage` persistence across tabs and refreshes |
| **Popup waitlist** | Auto-opens after 5 seconds with phone number capture |
| **WhatsApp signup** | Name + country-coded phone number form submitted to Google Apps Script |
| **Email waitlist** | Validated email form with the same backend |
| **Confetti on success** | `canvas-confetti` fires on every successful form submission |
| **Scroll animations** | Framer Motion entrance animations triggered by `IntersectionObserver` |
| **Mouse parallax** | Hero product image tracks mouse movement via `requestAnimationFrame` |
| **Video autoplay** | Section videos play/pause based on viewport visibility |
| **Scroll progress bar** | Fixed gold gradient bar at the top driven by a CSS custom property |
| **SEO ready** | Full Open Graph, Twitter card, canonical, and meta description |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) + [Vite 8](https://vite.dev) |
| Styling | Vanilla CSS-in-JS + [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| Confetti | [canvas-confetti](https://www.kirilv.com/canvas-confetti/) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [Cairo](https://fonts.google.com/specimen/Cairo) (Google Fonts) |
| Backend | [Google Apps Script](https://script.google.com) (no-cors POST) |
| Hosting | [Netlify](https://netlify.com) |

---

## Project Structure

```
veyra-landing/
├── public/
│   ├── assets/               # All images, videos, logos
│   │   ├── veyra_logo.jpg
│   │   ├── product.png
│   │   ├── product-red.png
│   │   ├── product-green.png
│   │   ├── product-yellow.png
│   │   ├── product-orange.png
│   │   ├── product-dark.png
│   │   ├── use-gym.jpeg
│   │   ├── use-desk.jpeg
│   │   ├── use-go.jpeg
│   │   ├── problem-sugar.mp4
│   │   ├── problem-crash.mp4
│   │   ├── problem-messy.mp4
│   │   ├── transform-process.mp4
│   │   ├── whatsapp.png
│   │   └── og-image.jpg      # Social sharing preview (1200×630)
│   ├── _redirects            # Netlify SPA fallback
│   └── favicon.svg
│
├── src/
│   ├── constants/
│   │   └── translations.js   # All text, API URL, timer config, country codes
│   │
│   ├── context/
│   │   └── LangContext.jsx   # Language state, auto-detect, RTL side-effects
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.js      # IntersectionObserver → isVisible boolean
│   │   ├── useCountdownTimer.js    # 3-phase timer with localStorage
│   │   └── useFormValidation.js    # Pure validation functions
│   │
│   ├── utils/
│   │   └── api.js            # submitEmail() + submitPhone() fetch wrappers
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── LaunchTimer.jsx
│   │   ├── shared/
│   │   │   ├── SuccessDialog.jsx
│   │   │   ├── ErrorDialog.jsx
│   │   │   ├── CountrySelector.jsx
│   │   │   └── Confetti.jsx
│   │   ├── modals/
│   │   │   ├── WhatsAppModal.jsx
│   │   │   └── WaitlistModal.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── SnackProducts.jsx
│   │       ├── SnackProblem.jsx
│   │       ├── UseCases.jsx
│   │       ├── Transform.jsx
│   │       ├── EarlyAccess.jsx
│   │       └── Footer.jsx
│   │
│   ├── App.jsx               # Root wiring — all state and handlers live here
│   ├── index.css             # Global styles, CSS variables, keyframes
│   └── main.jsx
│
├── index.html                # SEO meta tags, OG, Twitter card
├── netlify.toml              # Build config + security headers + cache rules
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Deploying to Netlify

### Option A — Drag and drop (quickest)

1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist/` folder onto the deploy zone

### Option B — Git-connected (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket
2. In Netlify: **Add new site → Import an existing project**
3. Select your repo
4. Netlify auto-detects the build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

Every push to `main` will trigger an automatic redeploy.

### After deploying

Update these two lines in `index.html` with your actual Netlify URL:

```html
<meta property="og:url" content="https://YOUR-SITE.netlify.app" />
<link rel="canonical"   href="https://YOUR-SITE.netlify.app" />
```

Also replace the badge ID at the top of this README with your Netlify badge ID (found in **Site settings → General → Status badges**).

---

## Configuration

All site-wide constants live in [`src/constants/translations.js`](src/constants/translations.js):

| Constant | Purpose |
|---|---|
| `API_URL` | Google Apps Script endpoint for form submissions |
| `TIMER_DURATION` | Countdown length (default: 48 hours) |
| `RESET_DELAY` | Pause between timer cycles (default: 15 minutes) |
| `POPUP_DELAY` | How long before the waitlist popup appears (default: 5 seconds) |
| `COUNTRIES` | Country codes shown in the phone selector |
| `PHONE_RULES` | Per-country digit length validation rules |
| `translations` | All UI strings in English and Arabic |

---

## Language & RTL

The app auto-detects language on mount using this priority order:

1. `navigator.languages[0]` / `navigator.language` — if it starts with `"ar"`, use Arabic
2. `Intl.DateTimeFormat().resolvedOptions().timeZone` — Gulf timezones → Arabic
3. Default: English

When Arabic is active:
- `document.documentElement.dir = "rtl"`
- `document.documentElement.lang = "ar"`
- `document.body.classList.add("rtl")` → switches to Cairo font
- All flex layouts and grid areas reverse automatically

The language toggle in the navbar triggers a 200ms fade-out → switch → fade-in transition.

---

## Form Submissions

Both the WhatsApp modal and the email form POST to a Google Apps Script web app endpoint (`API_URL`). The request uses `mode: "no-cors"`, which means:

- The browser sends the data but cannot read the response body
- A successful POST looks the same as a server error to the client
- This is expected and intentional — the success state is shown optimistically after the `fetch` resolves

To update the endpoint, change `API_URL` in `src/constants/translations.js`.

---

## Performance Notes

- All section videos use `IntersectionObserver` to play/pause — they never load or run off-screen
- Product images use `loading="lazy"`
- The scroll parallax uses `requestAnimationFrame` and cancels the pending frame on `mouseLeave` and unmount
- Vite hashes all asset filenames at build time — `netlify.toml` sets `Cache-Control: immutable` (1 year) on `/assets/*`
- `index.html` is set to `no-cache` so new deploys are always picked up

---

## License

Private — all rights reserved. VEYRA brand assets are not licensed for reuse.
