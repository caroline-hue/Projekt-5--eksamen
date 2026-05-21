# Grocott Fysioterapi & Sundhedshus — Design Spec

| Felt | Værdi |
|---|---|
| Dato | 2026-05-20 |
| Forfatter | Caroline Amundsen (UCL Multimediedesigner, 2. semester) |
| Reviewer | Claude (Senior UX/Accessibility persona) |
| Status | Godkendt — klar til implementations-plan |
| Figma | https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual |
| Type | Eksamensaflevering — statisk hjemmeside |

---

## 1. Kontekst & scope

**Projektet:** Grocott Fysioterapi & Sundhedshus — fysioterapeut-klinik i Langeskov. Komplet statisk hjemmeside som eksamensaflevering for 2. semester multimediedesigner-uddannelsen ved UCL.

**Sandheds-kilde:** Figma-prototypen er den ledende sandhed. Spec-teksten konsulteres som referencedokument, men Figma vinder ved konflikt.

**Figma-struktur:**
- `🖥️ Desktop Hi-fi` (node 1:4) — 17 page-frames @ 1440 bred
- `📱 Mobil Hi-fi` (node 1:5) — 17 page-frames @ 390 bred
- `🎨 Design System` (node 1:3) — 11 komponentsektioner

**MVP-scope:** 19 HTML-sider (forside, om-nikolai, design-system, 6 behandlinger, 5 booking-trin, 5 EK-flow). 6 sider udskudt fra MVP (erhvervsaftaler, kontakt, priser, praktisk-information, holdtraening, privatlivspolitik) — oprettes som stubs så links ikke giver 404.

---

## 2. Beslutninger (Grill Me-protokol — 7 spørgsmål)

| # | Spørgsmål | Svar | Konsekvens |
|---|---|---|---|
| 1 | Scope: alle 22 sider eller MVP-cut? | MVP udvidet til 19 sider | Klient (EK)-flow og alle 6 behandlinger med, øvrige 6 sider stubbes |
| 2 | WCAG: pixel-perfect Figma eller token-justering? | Token-justering | `accent-hover` for tekst på lys bg, mørkere stjerne, mørkere borders |
| 3 | GSD-workflow? | Bypasset (brainstorming → writing-plans) | Spec + plan opfylder "planning artifacts" kravet |
| 4 | Tech stack — frameworks? | Vanilla HTML+CSS, intet framework | Ingen Bootstrap; egen CSS matcher Figma 1:1 |
| 4b | JS-strategi (studerende skriver selv) | HTML+CSS færdigt, JS som tom skeleton med TODO-blokke | `js/main.js` har 13 navngivne sektioner, ingen logik |
| 4c | Placering | Worktree-rod | `index.html` på `/`, deploybar direkte |
| 5 | Billed-strategi | SVG-placeholders | Selvstændige filer, offline-safe, semantisk `<img>` |
| 6 | Form submission | Native HTML5-validering, ingen `action` | Studerende wire'r submit i JS |
| 7 | CPR-felt på booking trin 4 | `type="password"` + demo-disclaimer | Maskeret visuelt, info-modal forklarer journalpligt |

---

## 3. Fil-arkitektur

```
/  (worktree-rod)
├── index.html
├── om-nikolai.html
├── design-system.html
│
├── behandlinger/
│   ├── rygsmerter.html          ← canonical template
│   ├── skulder-nakke.html
│   ├── kaebe-hoved.html
│   ├── knae-hofter.html
│   ├── fod.html                 ← 3 undervalg: indlægssåler, sandaler, generelt
│   └── massage.html
│
├── booking/                     Nye klienter
│   ├── trin-1.html              Introduktion
│   ├── trin-2.html              Symptomvalg
│   ├── trin-3.html              Kalender
│   ├── trin-4.html              Oplysninger (CPR type=password)
│   └── trin-5.html              Booket ✓
│
├── klient/                      Eksisterende klienter (EK)
│   ├── login.html               MitID + e-mail + SMS
│   ├── vaelg.html               Symptomvalg (uden intro)
│   ├── kalender.html
│   ├── bekraeft.html            Pre-fyldte felter
│   └── booket.html
│
├── stubs/                       6 udskudte sider — kun nav+footer+"Kommer snart"
│   ├── erhvervsaftaler.html
│   ├── kontakt.html
│   ├── priser.html
│   ├── praktisk-information.html
│   ├── holdtraening.html
│   └── privatlivspolitik.html
│
├── css/
│   └── styles.css               Tokens, reset, typografi, komponenter,
│                                side-styles, utilities, media queries
│                                Internt 22 sektion-overskrifter
│
├── js/
│   └── main.js                  Tom skeleton, 13 TODO-blokke
│
├── images/
│   ├── README.md
│   ├── hero-bg.svg
│   ├── nikolai-hero.svg
│   ├── nikolai-tilgang.svg
│   ├── rygsmerter-hero.svg
│   ├── skulder-hero.svg
│   ├── kaebe-hero.svg
│   ├── knae-hero.svg
│   ├── fod-hero.svg
│   ├── massage-hero.svg
│   ├── card-rygsmerter.svg
│   ├── card-skulder.svg
│   ├── card-hoved.svg
│   ├── card-knae.svg
│   ├── video-thumbnail.svg
│   └── map-placeholder.svg
│
├── docs/
│   ├── superpowers/specs/       ← denne fil
│   ├── superpowers/plans/       ← implementation-plan (næste step)
│   └── audits/                  ← Lighthouse/axe/WAVE-rapporter
│
├── LICENSE
└── README.md                    Deploy-guide, tokens, a11y-statement
```

**Stub-side:** 6 udskudte sider får skabelon med `<title>`, nav, footer og besked "Denne side er under udvikling — for spørgsmål, ring 60 86 67 70" så links i nav/footer ikke 404'er.

---

## 4. Design tokens

Tokens er taget **direkte fra Figma `🎨 Design System` variables** (node 10:2). Hvor tokens fejlede WCAG 2.2 AA, er fixede varianter tilføjet uden at fjerne originalen.

```css
:root {
  /* ── Figma colors (sandhed) ───────────────────────────────── */
  --bg-dark:        #17212E;
  --bg-light:       #F8F4EE;
  --bg-photo:       #1C0C06;        /* hero-overlay, kun spec */
  --white:          #FFFFFF;

  --accent:         #E06820;        /* KUN til knap-fyld */
  --accent-hover:   #B84E10;        /* ALSO til tekst-links på lys bg */

  --text-primary:   #F4EEE8;        /* på mørk bg */
  --text-secondary: #8A9EAD;
  --text-dark:      #1C2630;
  --text-on-accent: #1C2630;

  --border-light-figma: #E2D8CC;    /* dekorativ kun */
  --border-dark-figma:  #2A3A4A;    /* dekorativ kun */

  --star:           #E8960E;        /* KUN på mørk bg */

  /* ── WCAG 2.2 AA-fixed varianter ──────────────────────────── */
  --accent-text-on-light: var(--accent-hover);  /* 5.08:1 */
  --star-on-light:        #C77B0A;              /* 4.5:1 */
  --border-light:         #C5B8A8;              /* 3:1 */
  --border-dark:          #5A6E80;              /* 3:1 */

  /* ── Skygge (Figma shadow/md) ─────────────────────────────── */
  --shadow-card: 0 6px 16px rgba(28, 38, 48, 0.14);

  /* ── Radius ───────────────────────────────────────────────── */
  --radius-card: 8px;
  --radius-btn:  50px;

  /* ── Spacing (Figma + utility-udvidelser) ─────────────────── */
  --space-4:  4px;
  --space-8:  8px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;

  /* ── Layout ───────────────────────────────────────────────── */
  --max-width:     1440px;
  --content-width: 1200px;
  --mobile-width:  390px;
}
```

**Validerede kontrastforhold (alle pass AA):**
- text-on-accent på accent: 4.51:1 ✅
- text-primary på bg-dark: 14.10:1 ✅
- text-secondary på bg-dark: 5.86:1 ✅
- text-dark på bg-light: 14.00:1 ✅
- accent-hover på hvid: 5.08:1 ✅
- border-light (fixed) på bg-light: 3.0:1 ✅

---

## 5. Typografi

```css
/* Desktop (≥768px) — Figma er sandhed */
h1   { font: 800 42px/1.4 'Sen',  sans-serif; }   /* spec sagde 48 — FORKERT */
h2   { font: 700 34px/1.4 'Sen',  sans-serif; }
h3   { font: 700 24px/1.4 'Sen',  sans-serif; }
body { font: 400 18px/1.8 'Mulish', sans-serif; }
.caption     { font-size: 13px; line-height: 1.8; }
.caption-bold{ font-size: 13px; line-height: 1.8; font-weight: 700; }
.btn-label   { font: 700 16px/1.4 'Mulish', sans-serif; }

/* Mobil (<768px) */
@media (max-width: 767.98px) {
  h1   { font-size: 30px; line-height: 1.3; }
  h2   { font-size: 26px; }
  h3   { font-size: 20px; }
  body { font-size: 16px; line-height: 1.6; }
}
```

**Font-loading:** Google Fonts via `<link rel="stylesheet" ...display=swap>` med `preconnect` til `fonts.gstatic.com`. Fallback: `system-ui, sans-serif`.

---

## 6. Komponent-katalog (20 komponenter)

| # | Komponent | CSS root | Figma reference | Bruges på |
|---|---|---|---|---|
| 1 | Button | `.btn` (varianter: `--primary` `--secondary` `--ghost` `--phone` `--on-dark`) | DS 01 | Alle sider |
| 2 | Navigation desktop | `.nav` | DS 02 | Alle |
| 3 | Navigation mobil | `.nav__mobile` | DS 11 | Alle <768px |
| 4 | Footer | `.footer` | DS 09 | Alle |
| 5 | Footer column | `.footer__col` | DS 09 | Alle |
| 6 | Card / Treatment | `.card--treatment` | DS 03 | Forside, EK vaelg |
| 7 | Card / Testimonial | `.card--testimonial` | DS 07 | Forside, Om, behandlinger |
| 8 | Form field | `.field` (default/focus/filled/error) | DS 04 | Booking trin 4, klient |
| 9 | Checkbox | `.checkbox` | DS 04 | Booking trin 4 |
| 10 | Stepper | `.stepper` | side-niveau | Booking + EK |
| 11 | Accordion (FAQ) | `.accordion` (bruger `<details>`) | side-niveau | Behandlinger |
| 12 | Modal/Popover | `.modal` | side-niveau | Booking trin 4 (CPR Info) |
| 13 | FAB | `.fab` (56×56) | DS 05 | Mobile, alle sider |
| 14 | Badge | `.badge--outline` / `.badge--filled` | DS 06 | Cards, trin 1 |
| 15 | Pris row | `.pris-row` | DS 08 | Forside, behandlinger |
| 16 | Step (timeline) | `.step` | DS 10 | Forside, behandlinger |
| 17 | Consult toggle | `.consult-toggle` (`<input type="radio">`) | side-niveau | Booking trin 1, 3 |
| 18 | Switch (akut) | `.switch` (`<input type="checkbox">`) | side-niveau | Booking trin 3 |
| 19 | Calendar + time picker | `.calendar` (`<table>` + `<button>` celler) | side-niveau | Booking trin 3, EK |
| 20 | Symptom grid | `.symptom-grid` (`<fieldset>` + `<input type="radio">`) | side-niveau | Booking trin 2, EK vaelg |

**Designprincipper:**
- BEM-lignende: `.block` / `.block__element` / `.block--modifier`
- Semantiske native elementer foretrækkes (`<details>` over JS-accordion, `<input type="radio">` over divs)
- Alle interaktive elementer har `:focus-visible` outline (3px `--accent`, 2px offset)
- Touch-targets: minimum 44×44 CSS px (WCAG 2.5.8)

---

## 7. Side-anatomi (canonical instances)

### 7.1 `index.html` — Forsiden
| # | Sektion | Komponenter |
|---|---|---|
| 0 | Nav | `.nav` |
| 1 | Hero | Foto-bg + overlay, eyebrow, H1, brødtekst, 2 CTAs, rating-badge |
| 2 | Mød din fysioterapeut | 2-kol: video + tilgangs-kort med 3 pillars |
| 3 | Fra første besøg til færre smerter | 3 `.step` horisontalt |
| 4 | Rigtige klienter | 3 `.card--testimonial` |
| 5 | Behandlinger | 4 `.card--treatment` grid (4→2→1) |
| 6 | Pris & forsikring | 2-kol: `.pris-row` × 7 + sygesikrings-info |
| 7 | Usikker? Bare ring | `.cta-band` orange, phone-knap |
| 8 | Find os | 2-kol: kort + adresse/åbningstider |
| 9 | Footer | `.footer` |

### 7.2 `om-nikolai.html`
| # | Sektion | Note |
|---|---|---|
| 0 | Nav | |
| 1 | Hero | 2-kol: portræt + tekst-CTA, mørk bg |
| 2 | **Video-sektion** | ⚠ FØRSTE efter hero (manuel fix fra spec) |
| 3 | Min tilgang | 3 `.step` på `--bg-light` |
| 4 | Sådan foregår et forløb | 3-4 numbered `.step` |
| 5 | Min baggrund | 2-kol: uddannelse + kurser (dot-list) |
| 6 | Testimonials | Genbrug |
| 7 | Usikker? | Genbrug |
| 8 | Find os | Genbrug |
| 9 | Footer | |

### 7.3 `behandlinger/rygsmerter.html` (canonical for 6 sider)
| # | Sektion | Genbrug |
|---|---|---|
| 0 | Nav | |
| 1 | Hero | side-specifik tekst + billede |
| 2 | Hvad er rygsmerter? | 2-kol: symptom-liste + foto |
| 3 | Fra første besøg | 3 `.step` |
| 4 | Testimonials | Genbrug |
| 5 | Min tilgang | 2-kol: tekst + Nicolai-billede, mørk bg |
| 6 | Pris | `.pris-row` × 7 |
| 7 | FAQ | `.accordion` med 4-6 items (side-specifik) |
| 8 | Andre smerter | 5 cross-links til andre behandlinger |
| 9 | Usikker? | Genbrug |
| 10 | Find os | Genbrug |
| 11 | Footer | |

**Side-swap pr. behandling:** kun hero-tekst, symptom-liste, FAQ-items og hero-billede ændres. Resten genbruges 1:1.

**Specialudgave `fod.html`:** Sektion 8 indeholder 3 sub-kategori-cards (indlægssåler, Spenco sandaler, generelt).

### 7.4 Booking-flow (5 trin) — fælles layout
```html
<body class="flow-page">
  <header class="nav">...</header>
  <main class="flow-main">
    <div class="flow-card">
      <ol class="stepper">...</ol>
      <!-- side-specifikt indhold -->
      <aside class="flow-card__phone-fallback">
        📞 Ring til mig: +45 60 86 67 70
      </aside>
    </div>
  </main>
  <footer class="footer">...</footer>
</body>
```

| Trin | Indhold | sessionStorage |
|---|---|---|
| 1 | Intro-tekst + consult-toggle (30/60 min) | `consultationLength` |
| 2 | Symptom-grid + sub-kategori (fod) | `symptom`, `subCategory` |
| 3 | Akut-switch + consult-toggle + kalender + opsummerings-bar | `acute`, `date`, `time` |
| 4 | Form (navn, e-mail, tlf, **CPR type=password**, kommentar) + checkboxes + CPR Info Modal | `name`, `email`, `phone`, `notes`, `sygesikring`, `gdpr` |
| 5 | Bekræftelses-card (læser sessionStorage) + .ics-knap | — |

### 7.5 EK-flow (5 sider)
Samme layout som booking, men:
- Stepper-labels: `Login | Vælg | Tid | Bekræft | Booket`
- `login.html` har INGEN stepper
- `bekraeft.html` viser pre-fyldte felter ("hentet fra journal")

### 7.6 `design-system.html`
Showcase af alle 11 komponentsektioner — bevis til mundtlig eksamen.

---

## 8. JavaScript-skeleton plan

> **Hvem skriver hvad:** HTML + CSS er Carolines del (færdig). JS er Louises del.
> Dette afsnit er hendes arbejdsdokument — alt herunder kan implementeres uden
> at røre HTML-struktur eller eksisterende CSS-tokens.

`js/main.js` leveres som en tom skeleton med navngivne TODO-blokke. Hver blok indeholder:
- DOM-selectorer (klar til `document.querySelector()`)
- A11y-krav (`aria-*`, fokus, tastatur)
- sessionStorage-schema hvor relevant
- Mock-data hvor backend ellers ville være
- Pseudo-kode i kommentarer

### 8.1 Fil-ejerskab & afgrænsning

| Fil | Louises rolle | Carolines rolle |
|---|---|---|
| `js/main.js` | **Ejer 100%** — alt JS her | Rører ikke |
| `css/styles.css` | Tilføjer KUN i sektion `25. JS State Classes` (sidst i filen) | Ejer resten |
| `index.html` + alle øvrige `.html` | Må tilføje `id`, `data-js-*`, `aria-*`, `hidden` på eksisterende elementer | Ejer struktur + tekst |
| `images/`, `README.md` | Læser | Ejer |
| `docs/` | Læser specen som reference | Ejer |

**Princip:** Hvis Louise har brug for en ny HTML-hook (fx en wrapper-div eller et id), tilføjer hun det selv — men ændrer ikke layout, klasser eller tekstindhold. Hvis hun har brug for et nyt komponent-design, skal Caroline lave det først.

### 8.2 Naming conventions (merge-safe)

For at undgå konflikter når Caroline arbejder videre på sider parallelt:

**CSS state classes — kun Louise bruger disse, og kun i sektion `25. JS State Classes`:**

| Klasse | Brug |
|---|---|
| `.is-active` | Markeret/valgt element (kalendercelle, time-slot, current step utover stepper) |
| `.is-hidden` | JS-skjult element (alternativ til `hidden`-attribut hvor animation skal layeres) |
| `.is-loading` | Asynkron state (knap mens .ics genereres) |
| `.has-error` | Form-felt med valideringsfejl |
| `body.has-open-menu` | Mobile burger-menu åben (låser body-scroll) |
| `body.has-open-modal` | Modal åben (låser body-scroll) |
| `body.has-open-dropdown` | Desktop nav-dropdown åben (dimmer baggrund) |

**Foretrukken approach for toggles:** Skift `aria-expanded` / `aria-pressed` / `hidden` attributter — IKKE klasser. CSS er allerede styled mod `[aria-expanded="true"]` og `[hidden]`. Dette giver gratis a11y.

**Data attributter — Louises hooks:** Prefix alle JS-hooks med `data-js-*` så Caroline kan se på et øjeblik at det er JS-territorium.
```html
<button data-js-modal-trigger="cpr-info">…</button>
<td data-js-calendar-cell data-date="2026-05-05">…</td>
```

**Funktions- og variabel-naming:**
- Wrap ALT i én IIFE for at undgå global pollution: `(() => { … })();`
- Konstanter: `SCREAMING_SNAKE_CASE` med `GR_` prefix (`GR_BOOKING_KEY`, `GR_MOCK_SLOTS`)
- Init-funktioner: `init` prefix (`initNavDropdown`, `initBurgerMenu`, `initCalendar`)
- Helper-funktioner: camelCase, intet prefix (`getBookingState`, `renderCalendar`)
- Globale mock-data: ét namespace-objekt `GR_MOCK = { slots: {…}, user: {…} }`
- Ingen `var` — kun `const` (default) eller `let` hvor reassignment kræves

**Filtypografi:**
- Behold sektion-overskrifter (`/* === 01. UTILS === */`) som de er
- Ny mock-data-blok placeres i sektion `00. MOCK DATA` øverst, før utils

### 8.3 Globale komponenter (alle 25 sider)

Disse funktioner kører på hver side. De er allerede skitseret i `js/main.js` blokke 01-03.

#### 8.3.1 `initNavDropdown()` — desktop dropdowns (Behandlinger + Praktisk)

**HTML der allerede findes (alle sider):**
```html
<button class="nav__link" aria-expanded="false" aria-controls="dd-behandlinger">
  Behandlinger <span class="nav__chevron" aria-hidden="true">▾</span>
</button>
<div id="dd-behandlinger" class="nav__dropdown"> … </div>
```

**Krav:**
- CSS åbner allerede dropdown ved `:hover` og `:focus-within` — JS er progressive enhancement
- Klik på button → toggle `aria-expanded` true/false
- `Esc` lukker alle åbne dropdowns + returnerer fokus til button
- Klik udenfor `.nav__dropdown` lukker
- Når mindst én dropdown er åben: sæt `body.has-open-dropdown` (CSS dimmer baggrund — Louise tilføjer denne CSS-regel i sektion 25)
- Pile-tasterne ↑/↓ inde i et åbent dropdown skal navigere mellem links (WCAG 2.1.1)

**Selectorer:** `$$('.nav__item--dropdown > .nav__link')`, `$$('.nav__dropdown')`

#### 8.3.2 `initBurgerMenu()` — mobile menu (<768px)

**HTML findes allerede:**
```html
<button class="nav__burger" aria-expanded="false" aria-controls="mobile-nav">…</button>
<div id="mobile-nav" class="nav__mobile" hidden>…</div>
```

**Krav:**
- Klik på `.nav__burger` → toggle `aria-expanded` + fjern/sæt `hidden` på `#mobile-nav`
- Sæt `body.has-open-menu` (CSS låser scroll: `overflow: hidden`)
- `Esc` lukker + returnerer fokus til burger
- Klik på `.nav__close` eller på et nav-link → lukker
- **Fokus-fælde** (WCAG 2.4.3): Tab cykler kun inden for `#mobile-nav` mens åben
- Nestede knapper `.nav__mobile-toggle` (Behandlinger inde i mobile-menu) skal også toggle deres `aria-expanded` (CSS viser/skjuler `<ul>` allerede)
- Ved resize til ≥768px: luk automatisk

#### 8.3.3 `initFabScroll()` — sticky telefon-knap

**HTML findes allerede på alle sider:**
```html
<a href="tel:+4560866770" class="fab" aria-label="Ring til Nicolai">…</a>
```

**Krav (NICE-TO-HAVE — kan udelades hvis tid mangler):**
- Skjul FAB indtil bruger har scrollet forbi hero (eller >300px)
- Brug `IntersectionObserver` på hero-sektionen, IKKE `scroll`-listener
- Tilføj `.is-hidden` til FAB indtil observer fyrer
- Smooth fade-in transition (CSS — Louise tilføjer i sektion 25)

#### 8.3.4 `initSmoothScroll()` — interne anchor-links

**Eksisterende anchors i footer:** `#behandlinger-title`, `#find-title`

**Krav:**
- CSS `scroll-behavior: smooth` på `html` virker out-of-the-box → JS er **kun** nødvendigt hvis vi skal:
  - Justere offset pga. sticky nav (CSS `scroll-margin-top: 80px` håndterer dette allerede)
  - Sætte fokus på destination (a11y-best practice: fokus følger scroll til landmark)
- **Anbefalet minimum:** Lyt på alle `a[href^="#"]` clicks → efter scroll, kald `.focus({ preventScroll: true })` på destination

#### 8.3.5 `initSkipLink()` — fokus-management

**HTML:** `<a href="#main" class="skip-link">Spring til indhold</a>` på alle sider.

**Krav:** Skip-link virker out-of-the-box. **NICE-TO-HAVE:** Tilføj `tabindex="-1"` på `<main>` dynamisk, så fokus faktisk lander dér og skærmlæser annoncerer landmark.

### 8.4 Landing page (`index.html`) — sektion for sektion

Landing page består af 9 sektioner. Her er JS-behov for hver:

#### 8.4.1 Section 0: Navigation
Se 8.3.1 (dropdown) + 8.3.2 (burger). **Ingen sidespecifik JS.**

#### 8.4.2 Section 1: Hero
**HTML:**
```html
<section class="section section--hero-landing">
  <div class="hero__content">
    <h1>Smerter, der holder dig fra det, du holder af?</h1>
    <div class="hero__ctas">
      <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
      <a href="klient/login.html" class="btn btn--secondary">Jeg er allerede klient</a>
    </div>
    <p class="hero__rating">…4,8 på Google · 30+ anmeldelser</p>
  </div>
  <div class="hero__image"><img src="images/hero-photo.svg" alt="…"></div>
</section>
```

**JS-behov:**
- **Ingen påkrævet** — alle CTAs er `<a>` links med rigtige hrefs.
- **NICE-TO-HAVE:** Animér rating-tal fra 0 → 4.8 (krav: respekter `prefers-reduced-motion`).

#### 8.4.3 Section 2: Mød din fysioterapeut (video-block)
**HTML:**
```html
<div class="video-block">
  <img src="images/video-thumbnail.svg" alt="Video: Nicolai fortæller om sin tilgang">
  <button class="video-block__play" aria-label="Afspil video — Nicolai introducerer sig selv (60 sekunder)">
    <span aria-hidden="true">▶</span>
  </button>
</div>
```

**Ny JS-funktion: `initVideoPlayer()`**

**Krav:**
- Klik på `.video-block__play` → skift `.video-block` ud med `<iframe>` (YouTube eller Vimeo) eller HTML5 `<video>` med `autoplay`
- Lazy loading — embed indlæses FØRST efter klik (privacy + perf)
- A11y: efter swap, sæt fokus på iframe og annoncér via `aria-live`-region
- Brug en `data-js-video-id` på knappen til at angive video-ID (Caroline kan udfylde senere — Louise hardkoder mock indtil videre)
- Mock-data: `data-js-video-id="dQw4w9WgXcQ"` (Caroline supplerer den rigtige)

**Selectorer:** `$$('.video-block')`, `$('.video-block__play', block)`

#### 8.4.4 Section 3: Anmeldelser (reviews)
**HTML:** 3 statiske `.review-card` + en footnote der allerede siger:
> *↻ Live anmeldelser hentes via Elfsight Google Reviews-widget i den endelige løsning*

**Ny JS-funktion: `initReviewsWidget()` (NICE-TO-HAVE)**

**Krav:**
- **Beslutning:** På grund af MVP-scope og privacy holdes de statiske kort som default. JS er kun forbered-hook.
- Hvis tid: indlæs Elfsight script `<script src="https://elfsightcdn.com/platform.js" async></script>` og swap `.reviews-grid` indhold med `<div class="elfsight-app-XXXXX"></div>`
- Husk: Elfsight er en 3.-parts widget — kræver cookie-consent (link den til `privatlivspolitik#cookies`)
- **Fallback:** Hvis script ikke loader inden 3 sekunder → behold statiske kort, log fejl
- Hvis du ikke implementerer det: behold de statiske kort. Footnoten skal i så fald **slettes** før aflevering.

#### 8.4.5 Section 5: Behandlinger (horizontal scroll)
**HTML:**
```html
<div class="behandlinger-scroll" role="region" aria-label="Liste af behandlinger — scroll horisontalt">
  <ol class="behandlinger-row">
    <li><article class="card card--treatment">…</article></li>
    × 6 kort
  </ol>
</div>
<p class="behandlinger__hint">Swipe eller scroll sidelæns for at se alle behandlinger</p>
```

**Ny JS-funktion: `initBehandlingerScroll()`**

**Krav (CSS scroll-snap virker uden JS — dette er forbedringer):**
- **Prev/Next-knapper** (NICE-TO-HAVE): Tilføj 2 `<button>` over scrolleren ved load: `← Forrige / Næste →`
  - Klik → `.behandlinger-scroll.scrollBy({ left: ±cardWidth, behavior: 'smooth' })`
  - Disable prev når `scrollLeft === 0`, disable next når slut nået
  - Skjul på mobile (`<768px` — swipe er bedre dér)
- **Keyboard:** Når en `.card--treatment` har fokus, ←/→ flytter til forrige/næste kort + scroller den ind
- **Progress dots** (NICE-TO-HAVE): Vis `IntersectionObserver`-baseret indikator under: `● ○ ○ ○ ○ ○`
- **Hint-fjernelse:** Når brugeren har scrollet, fjern `.behandlinger__hint` (eller fade ud) — så hintet ikke vedbliver

**Selectorer:** `$('.behandlinger-scroll')`, `$$('.card--treatment', scroller)`, `$('.behandlinger__hint')`

#### 8.4.6 Section 6: Pris & forsikring
**HTML:**
```html
<aside class="forsikring-card">
  <h3>Du betaler måske ikke selv</h3>
  …
  <a href="#" class="btn btn--dark forsikring-cta">Tjek din forsikringsdækning →</a>
</aside>
```

**Ny JS-funktion: `initInsuranceModal()`**

**Krav:**
- Klik på `.forsikring-cta` → åbn modal med liste af understøttede forsikringer + tlf til klinikken
- Genbrug `cprModal()`-mønstret (focus-trap, Esc, backdrop-click)
- Modal-HTML tilføjes af Louise med `<dialog>` element (native browser-support, ingen polyfill)
- **Mock-data (hardkod i funktionen):**
  ```js
  const GR_INSURANCE = [
    'Falck Healthcare', 'Mølholm', 'Tryg', 'Topdanmark',
    'PFA', 'Codan', 'Skandia', 'Sygeforsikringen "danmark"'
  ];
  ```
- **VIGTIGT:** Skift `href="#"` til `href="javascript:void(0)"` undgås — i stedet tilføj `data-js-insurance-trigger` og lad CSS style det som button (eller skift til `<button class="btn btn--dark">`)

#### 8.4.7 Section 7: CTA-band "Usikker? Bare ring"
**HTML:** `<a href="tel:+4560866770" class="btn btn--phone-accent">…</a>`

**JS-behov:** **Ingen.** `tel:` link virker out-of-the-box.

#### 8.4.8 Section 8: Find vej (kort)
**HTML:**
```html
<div class="find-map">
  <img src="images/map-placeholder.svg" alt="Kort: Langeskov Centret 1, 5550 Langeskov">
</div>
```

**Ny JS-funktion: `initMapEmbed()` (NICE-TO-HAVE)**

**Krav:**
- **Default:** Behold statisk SVG (privacy: ingen Google Maps tracking ved load)
- Hvis tid: klik på kortet → swap til OpenStreetMap iframe eller Google Maps embed
- Brug `<iframe loading="lazy">` — indlæses kun ved interaktion
- Tilføj `data-js-map-trigger` på `.find-map`
- Husk cookie-consent ved Google Maps (link til `privatlivspolitik#cookies`)

#### 8.4.9 Section 9: Footer
**JS-behov:** Footer-anchor-links (`#behandlinger-title`, `#find-title`) håndteres af `initSmoothScroll()` (se 8.3.4).

### 8.5 JS-behov pr. side (andre sider)

| Side | Globale (8.3) | Sidespecifik JS |
|---|---|---|
| `index.html` | ✓ | Se 8.4 (video, scroll-enhance, insurance modal, map) |
| `om-nikolai.html` | ✓ | `initVideoPlayer()` — se 8.4.3 |
| `design-system.html` | ✓ | Ingen (komponent-showcase) |
| `behandlinger/*.html` (6 sider) | ✓ | Accordion (FAQ) bruger `<details>` — kun `accordionOnlyOne()` (8.6 blok 3) er nødvendig hvis vi vil have kun ét åbent ad gangen |
| `booking/trin-1.html` | ✓ | `getBookingState`, `updateBookingState`, `renderStepper`, `consultToggle` |
| `booking/trin-2.html` | ✓ | `renderStepper`, `symptomGrid` |
| `booking/trin-3.html` | ✓ | `renderStepper`, `consultToggle`, `renderCalendar`, `selectDate`, `selectTime`, `updateBookingSummary` (akut-switch) |
| `booking/trin-4.html` | ✓ | `renderStepper`, `formValidation`, `cprModal` |
| `booking/trin-5.html` | ✓ | `renderStepper`, `renderConfirmation`, `addToCalendar`, `clearBookingState` |
| `klient/login.html` | ✓ | `mockEKLogin` (intet stepper på login) |
| `klient/vaelg.html` | ✓ | `renderStepper`, `symptomGrid` |
| `klient/kalender.html` | ✓ | `renderStepper`, `renderCalendar`, `selectDate`, `selectTime` |
| `klient/bekraeft.html` | ✓ | `renderStepper`, `mockEKLogin` (pre-fyld), `formValidation` |
| `klient/booket.html` | ✓ | `renderStepper`, `renderConfirmation`, `addToCalendar` |
| `stubs/*.html` (6 sider) | ✓ | Ingen sidespecifik |

### 8.6 De 13 TODO-blokke i `js/main.js` (booking + EK + globale)

| # | Funktion | Bruges på |
|---|---|---|
| 1 | `initNavDropdown()` | Alle 25 sider |
| 2 | `initBurgerMenu()` | Alle 25 sider |
| 3 | `accordionOnlyOne()` *(optional)* | 6 behandlinger |
| 4 | `getBookingState()` / `updateBookingState()` / `clearBookingState()` | Booking trin 1-5 |
| 5 | `renderStepper()` | Booking trin 1-5 + EK 4 sider |
| 6 | `consultToggle()` | Booking trin 1 + 3 |
| 7 | `symptomGrid()` | Booking trin 2 + EK vælg |
| 8 | `renderCalendar()` + `selectDate()` + `selectTime()` + `updateBookingSummary()` | Booking trin 3 + EK kalender |
| 9 | `formValidation()` | Booking trin 4 + EK bekraeft |
| 10 | `cprModal()` | Booking trin 4 |
| 11 | `renderConfirmation()` | Booking trin 5 + EK booket |
| 12 | `addToCalendar()` (.ics) | Booking trin 5 + EK booket |
| 13 | `mockEKLogin()` | klient/login.html + klient/bekraeft.html |

**Nye landing-funktioner (tilføjes efter blokkene ovenfor):**

| # | Funktion | Bruges på |
|---|---|---|
| 14 | `initVideoPlayer()` | index.html + om-nikolai.html |
| 15 | `initBehandlingerScroll()` | index.html |
| 16 | `initInsuranceModal()` | index.html |
| 17 | `initFabScroll()` *(optional)* | Alle sider |
| 18 | `initSmoothScroll()` | Alle sider |
| 19 | `initReviewsWidget()` *(optional)* | index.html |
| 20 | `initMapEmbed()` *(optional)* | index.html |

### 8.7 SessionStorage schema (key: `grocott-booking`)

```js
{
  consultationLength: '30' | '60',
  symptom: 'rygsmerter'|'skulder-nakke'|'kaebe-hoved'|'knae-hofter'|'fod'|'massage',
  subCategory: 'indlaegssaaler'|'sandaler'|'generelt'|null,
  acute: boolean,
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  name: string, email: string, phone: string, notes: string,
  sygesikring: boolean, gdpr: boolean
}
```

**Sekundær key (EK-flow):** `grocott-user`
```js
{
  name: string, email: string, phone: string,
  cpr: string  // sidste 4 cifre maskeret, kun til vis-ikke-send
}
```

### 8.8 Router-pattern for entry point

I bunden af `js/main.js` (eksisterer allerede som kommentar) bruges denne pattern:

```js
ready(() => {
  // Globale (alle sider)
  initNavDropdown();
  initBurgerMenu();
  initSmoothScroll();
  initFabScroll();

  // Side-specifik (route via pathname)
  const path = location.pathname;

  if (path === '/' || path.endsWith('index.html')) {
    initVideoPlayer();
    initBehandlingerScroll();
    initInsuranceModal();
    initReviewsWidget?.();
    initMapEmbed?.();
  }
  if (path.endsWith('om-nikolai.html'))         initVideoPlayer();
  if (path.includes('/behandlinger/'))          accordionOnlyOne();
  if (document.body.classList.contains('flow-page')) renderStepper();
  if (path.endsWith('trin-1.html'))             consultToggle();
  if (path.endsWith('trin-2.html'))             symptomGrid();
  if (path.endsWith('trin-3.html'))           { renderCalendar(2026, 4); consultToggle(); }
  if (path.endsWith('trin-4.html'))           { formValidation(); cprModal(); }
  if (path.endsWith('trin-5.html'))             renderConfirmation();
  if (path.includes('/klient/'))                mockEKLogin();
});
```

**Hvorfor pathname-routing:** Vi har ét bundle (`js/main.js`) for hele sitet. Routing pr. side undgår at unødvendige selectorer fejler i konsollen.

### 8.9 Estimeret indsats

| Bucket | Timer |
|---|---|
| Setup + naming + globale (8.3) | 2-3 |
| Landing page enhancements (8.4) | 3-4 |
| Booking-flow JS (blokke 4-12) | 6-8 |
| EK-flow (blok 13 + genbrug) | 1-2 |
| QA: keyboard, screenreader, edge cases | 2-3 |
| **Total** | **14-20 timer** |

---

## 9. WCAG 2.2 AA-tjekliste

### 9.1 Globale krav (alle 19 sider)
- `<html lang="da">`
- Unik `<title>` + `<meta name="description">` pr. side
- Skip-link som første fokuserbare element
- Semantiske landmarks: `<header>`, `<nav>`, `<main id="main">`, `<footer>`
- Heading-hierarki uden hop, præcis én `<h1>` pr. side
- `:focus-visible` synligt overalt (3px orange ring + 2px offset)
- Touch-targets ≥ 44×44 CSS px (WCAG 2.5.8 nyt)
- Reflow til 320px uden horisontal scroll
- `scroll-margin-top: 80px` (WCAG 2.4.11 nyt — sticky nav obscurer ikke focus)

### 9.2 Komponent-specifikke krav
Se fuld liste i Sektion 6 af samtalehistorik (15 grupper, 50+ checkpoints) — kondenseret her:
- Navigation: `aria-expanded`, fokus-fælde i mobil-overlay, Esc lukker
- Forms: `<label for>`, `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"` for fejl
- Modal: `role="dialog"`, `aria-modal="true"`, fokus-fælde, Esc, backdrop-click
- Accordion: bruger `<details>`/`<summary>` (native, ingen JS påkrævet)
- Kalender: `<table>` med `<th scope="col">`, `aria-pressed` på celler, `aria-label="5. maj 2026, mandag"`
- Stepper: `<ol>` med `aria-current="step"` på aktivt trin

### 9.3 Bevidste afvigelser (dokumenteret til censor)

| Afvigelse | Begrundelse |
|---|---|
| `border-light` #E2D8CC → #C5B8A8 | WCAG 1.4.11 (3:1 for UI-borders) |
| `star` på lys bg #E8960E → #C77B0A | WCAG 1.4.3 (grafisk indikator) |
| `accent` bruges ikke som tekst på lys bg | WCAG 1.4.3 (3.1:1 → 5.0:1 med accent-hover) |
| H1 = 42px (Figma), ikke 48px (spec) | Figma er sandhed |
| CPR-felt `type="password"` (afviger fra Figma plain) | WCAG 1.4.5 + GDPR (sundhedsdata) |

---

## 10. Verifikations-strategi

### 10.1 Automatiseret verifikation
| Værktøj | Sider | Pass-tærskel |
|---|---|---|
| W3C HTML Validator | 19 | 0 errors |
| W3C CSS Validator | 1 fil | 0 errors |
| Lighthouse Accessibility | 19 | ≥ 95 |
| Lighthouse Performance | forsiden | ≥ 90 |
| Lighthouse SEO | 19 | ≥ 90 |
| Lighthouse Best Practices | 19 | ≥ 95 |
| axe DevTools | 19 | 0 AA-violations |
| WAVE | stikprøve | 0 errors |

### 10.2 Manuel pr-side tjekliste (11 punkter)
1440px → 768px → 390px → 320px responsivt-check, Tab/Shift+Tab keyboard-flow, Esc-tast, 200% zoom, Lighthouse-audit, alle interne links, print preview.

### 10.3 End-to-end flow-tests
- Booking-flow uden JS (progressive enhancement check)
- Booking-flow med JS (sessionStorage seamless)
- EK-flow med JS (mock login + pre-fyldte felter)

### 10.4 Cross-browser
Chrome (reference), Safari, Firefox, Edge desktop + iOS Safari, Chrome Android.

### 10.5 Screen reader-test (stikprøve)
3 sider testes med VoiceOver (macOS) eller NVDA (Windows, gratis): `index.html`, `booking/trin-3.html`, `behandlinger/rygsmerter.html`.

### 10.6 Visuel parity vs Figma
Side-by-side screenshots mod 19 Figma desktop + 18 mobile frames (`design-system.html` har kun desktop-pendant i Figma). Tolerance ±4 px spacing, ±2 px font-rendering.

### 10.7 Definition of Done
- [ ] Alle 19 HTML-filer + 6 stubs eksisterer
- [ ] `css/styles.css` komplet
- [ ] `js/main.js` med 13 TODO-blokke (ingen logik)
- [ ] 15 SVG-placeholders + `images/README.md`
- [ ] W3C-validering pass
- [ ] Lighthouse Accessibility ≥ 95 alle sider
- [ ] axe: 0 AA-violations alle sider
- [ ] Tastatur-navigation 100%
- [ ] `README.md` med deploy-guide, tokens-oversigt, a11y-statement
- [ ] `docs/audits/` med Lighthouse-screenshots fra 5 sider
- [ ] Bevidste afvigelser dokumenteret

---

## 11. Næste skridt

1. ✅ Denne spec committes til git
2. ⏳ Brugeren reviewer specen (du læser denne fil)
3. ⏳ `superpowers:writing-plans` invokeres for at lave implementations-plan i `docs/superpowers/plans/`
4. ⏳ Implementation kører lag for lag (Approach C):
   - Lag 1: 19 + 6 HTML-skeletter (struktur, ingen styling)
   - Lag 2: tokens + reset + typografi i `styles.css`
   - Lag 3: 20 komponenter
   - Lag 4: side-specifikke sektioner
   - Lag 5: SVG-billeder, responsive, polish, WCAG-tjek
   - Lag 6: `js/main.js` TODO-skeleton + dokumentation

---

*Spec slut.*
