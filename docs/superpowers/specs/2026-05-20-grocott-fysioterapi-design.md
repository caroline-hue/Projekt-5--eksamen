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

`js/main.js` leveres med 13 navngivne TODO-blokke. Hver indeholder:
- DOM-selectorer (klar til `document.querySelector()`)
- A11y-krav (`aria-*`, fokus, tastatur)
- sessionStorage-skema hvor relevant
- Mock-data hvor backend ellers ville være
- Pseudo-kode i kommentarer

**De 13 TODO-blokke:**
1. `navDropdown()` — Behandlinger + Praktisk dropdown
2. `mobileBurger()` — Toggle full-screen overlay
3. `accordionOnlyOne()` (optional)
4. `getBookingState()` / `updateBookingState()` — sessionStorage helpers
5. `renderStepper()` — auto-detect current page
6. `consultToggle()` — trin 1+3
7. `symptomGrid()` — trin 2 + conditional sub-grid
8. `renderCalendar()` — trin 3 (kompleksitet: høj)
9. `formValidation()` — trin 4 ud over native
10. `cprModal()` — open/close + focus-trap + ESC
11. `renderConfirmation()` — trin 5
12. `addToCalendar()` — .ics generation
13. `mockEKLogin()` — pre-fyldte felter

**SessionStorage schema (key: `grocott-booking`):**
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

Estimeret JS-arbejde for studerende: ~11-14 timer.

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
