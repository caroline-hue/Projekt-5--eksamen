# Grocott Fysioterapi & Sundhedshus — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bygge komplet statisk hjemmeside (19 sider + 6 stubs) der matcher Figma hi-fi mockup, opfylder WCAG 2.2 AA, og efterlader `js/main.js` som tom skeleton med TODO-blokke som studerende selv udfylder til eksamen.

**Architecture:** Lag-baseret build (Approach C fra spec):
1. Project setup
2. HTML skeletons (alle 25 sider, ingen styling)
3. CSS foundation (tokens, reset, typografi, layout-helpers)
4. Komponenter (20 stk fra designsystem)
5. Side-specifik styling
6. SVG-billeder + responsive + WCAG-polish
7. JS-skeleton + README + audits

**Tech Stack:** HTML5, CSS3 (custom properties, Flexbox, Grid), vanilla JavaScript (kun skeleton), Google Fonts (Sen + Mulish), SVG-placeholders. Ingen frameworks, ingen build-tools.

**Reference dokumenter:**
- Design spec: `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md`
- Figma: https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual

---

## Phase 0: Project setup

### Task 0.1: Opret mappestruktur

**Files:**
- Create: `behandlinger/`, `booking/`, `klient/`, `stubs/`, `css/`, `js/`, `images/`

- [ ] **Step 1: Kør mkdir for alle mapper**

```bash
mkdir -p behandlinger booking klient stubs css js images
```

- [ ] **Step 2: Verificér struktur**

```bash
ls -la
```

Expected: 7 nye tomme mapper + eksisterende `LICENSE`, `docs/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: create project directory structure"
```

---

### Task 0.2: Initial `.gitignore` og `images/README.md`

**Files:**
- Create: `.gitignore`
- Create: `images/README.md`

- [ ] **Step 1: Opret `.gitignore`**

```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp

# Build (intet build-step, men for fremtidssikring)
node_modules/
dist/
.cache/

# Audit-outputs (kun screenshots committes)
docs/audits/*.json
```

- [ ] **Step 2: Opret `images/README.md`**

```markdown
# Billeder

Dette projekt bruger SVG-placeholders som standard. Når du har rigtige fotos
klar, kan du:

1. Lægge `.jpg`/`.webp` filer i denne mappe med samme navn som SVG'en
2. Ændre `src=""` attributten i de relevante HTML-filer

## Liste over placeholders

| Filnavn | Dimensioner | Bruges på | Beskrivelse |
|---|---|---|---|
| `hero-bg.svg` | 1440×720 | `index.html` | Mørkt foto: behandlingssituation |
| `nikolai-hero.svg` | 700×800 | `om-nikolai.html` | Portræt af Nicolai |
| `nikolai-tilgang.svg` | 172×172 | Flere sider | "Min tilgang"-thumbnail |
| `rygsmerter-hero.svg` | 1440×720 | `behandlinger/rygsmerter.html` | Ryg-behandling |
| `skulder-hero.svg` | 1440×720 | `behandlinger/skulder-nakke.html` | Skulder-behandling |
| `kaebe-hero.svg` | 1440×720 | `behandlinger/kaebe-hoved.html` | Kæbe-behandling |
| `knae-hero.svg` | 1440×720 | `behandlinger/knae-hofter.html` | Knæ-behandling |
| `fod-hero.svg` | 1440×720 | `behandlinger/fod.html` | Fod-behandling |
| `massage-hero.svg` | 1440×720 | `behandlinger/massage.html` | Massage |
| `card-rygsmerter.svg` | 320×180 | `index.html` behandlings-card | Thumbnail |
| `card-skulder.svg` | 320×180 | `index.html` | Thumbnail |
| `card-hoved.svg` | 320×180 | `index.html` | Thumbnail |
| `card-knae.svg` | 320×180 | `index.html` | Thumbnail |
| `video-thumbnail.svg` | 1280×720 | `om-nikolai.html` | Video-cover med ▶ play |
| `map-placeholder.svg` | 720×400 | Flere sider | Statisk kort Langeskov Centret |

## Sådan skifter du SVG ud med rigtigt foto

1. Læg `hero-bg.jpg` (eller `.webp`) i `/images/`
2. Find HTML-linje: `<img src="images/hero-bg.svg" alt="...">`
3. Skift til: `<img src="images/hero-bg.jpg" alt="...">`
4. Behold `alt`-teksten — den er allerede skrevet til screen readers.
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore images/README.md
git commit -m "chore: add .gitignore and images README"
```

---

## Phase 1: HTML skeletons (Lag 1)

**Mål:** Alle 25 HTML-filer eksisterer med semantisk struktur, korrekt heading-hierarki og fungerende links. Ingen styling endnu — siderne er funktionelt rå men WCAG-validable for struktur.

### Task 1.1: Canonical HTML template

**Files:**
- Create: `index.html` (vi bruger den som template-reference for de andre)

- [ ] **Step 1: Opret `index.html` med fuld struktur**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Grocott Fysioterapi & Sundhedshus i Langeskov — autoriseret fysioterapeut Nicolai Grocott. Smerter, der holder dig fra det, du holder af? Book første tid online.">
  <title>Grocott Fysioterapi & Sundhedshus · Langeskov</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&family=Mulish:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">Spring til indhold</a>

  <header class="nav" role="banner">
    <div class="nav__inner container">
      <a href="/" class="nav__logo" aria-label="Grocott Fysioterapi forside">
        <span class="nav__logo-text">Grocott Fysioterapi & Sundhedshus</span>
      </a>
      <nav class="nav__links" aria-label="Hovedmenu">
        <ul>
          <li class="nav__item nav__item--dropdown">
            <button class="nav__link" aria-expanded="false" aria-controls="dd-behandlinger">
              Behandlinger <span class="nav__chevron" aria-hidden="true">▾</span>
            </button>
            <div id="dd-behandlinger" class="nav__dropdown" hidden>
              <ul>
                <li><a href="behandlinger/rygsmerter.html">Rygsmerter</a></li>
                <li><a href="behandlinger/skulder-nakke.html">Skulder og nakke</a></li>
                <li><a href="behandlinger/kaebe-hoved.html">Kæbe og hoved</a></li>
                <li><a href="behandlinger/knae-hofter.html">Knæ og hofter</a></li>
                <li><a href="behandlinger/fod.html">Fod-problematikker</a></li>
                <li><a href="behandlinger/massage.html">Massage</a></li>
              </ul>
            </div>
          </li>
          <li><a href="stubs/holdtraening.html" class="nav__link">Holdtræning</a></li>
          <li><a href="om-nikolai.html" class="nav__link">Om Nicolai</a></li>
          <li><a href="stubs/erhvervsaftaler.html" class="nav__link">Erhvervsaftaler</a></li>
          <li class="nav__item nav__item--dropdown">
            <button class="nav__link" aria-expanded="false" aria-controls="dd-praktisk">
              Praktisk <span class="nav__chevron" aria-hidden="true">▾</span>
            </button>
            <div id="dd-praktisk" class="nav__dropdown" hidden>
              <ul>
                <li><a href="stubs/priser.html">Priser</a></li>
                <li><a href="stubs/praktisk-information.html">Praktisk information</a></li>
                <li><a href="stubs/privatlivspolitik.html">Privatlivspolitik</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div class="nav__ctas">
        <a href="klient/login.html" class="btn btn--secondary btn--on-dark">Jeg er allerede klient</a>
        <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
      </div>
      <button class="nav__burger" aria-expanded="false" aria-controls="mobile-nav" aria-label="Åbn menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div id="mobile-nav" class="nav__mobile" hidden>
      <button class="nav__close" aria-label="Luk menu">✕</button>
      <nav aria-label="Mobilmenu">
        <ul>
          <li><a href="om-nikolai.html">Om Nicolai</a></li>
          <li>
            <button class="nav__mobile-toggle" aria-expanded="false">Behandlinger ▾</button>
            <ul>
              <li><a href="behandlinger/rygsmerter.html">Rygsmerter</a></li>
              <li><a href="behandlinger/skulder-nakke.html">Skulder og nakke</a></li>
              <li><a href="behandlinger/kaebe-hoved.html">Kæbe og hoved</a></li>
              <li><a href="behandlinger/knae-hofter.html">Knæ og hofter</a></li>
              <li><a href="behandlinger/fod.html">Fod-problematikker</a></li>
              <li><a href="behandlinger/massage.html">Massage</a></li>
            </ul>
          </li>
          <li><a href="stubs/holdtraening.html">Holdtræning</a></li>
          <li><a href="stubs/erhvervsaftaler.html">Erhvervsaftaler</a></li>
          <li><a href="stubs/priser.html">Priser</a></li>
          <li><a href="stubs/praktisk-information.html">Praktisk information</a></li>
          <li><a href="stubs/privatlivspolitik.html">Privatlivspolitik</a></li>
          <li><a href="klient/login.html">Jeg er allerede klient</a></li>
        </ul>
      </nav>
      <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
    </div>
  </header>

  <main id="main">

    <!-- Section 1: Hero -->
    <section class="section section--hero" aria-labelledby="hero-title">
      <div class="container">
        <p class="eyebrow">GROCOTT FYSIOTERAPI &amp; SUNDHEDSHUS</p>
        <h1 id="hero-title">Smerter, der holder dig fra det, du holder af?</h1>
        <p class="hero__lead">Jeg specialiserer mig i rygsmerter, nakkesmerter og skuldergener — og smerter du måske har levet med i årevis. Du får en grundig undersøgelse og en behandlingsplan til netop dig og dine behov.</p>
        <div class="hero__ctas">
          <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
          <a href="klient/login.html" class="btn btn--secondary btn--on-dark">Jeg er allerede klient</a>
        </div>
        <div class="hero__rating" aria-label="4,9 ud af 5 stjerner, 26 eller flere anmeldelser">
          <span aria-hidden="true">⭐ 4,9 · 26+ anmeldelser</span>
        </div>
      </div>
    </section>

    <!-- Section 2: Mød din fysioterapeut -->
    <section class="section" aria-labelledby="moed-title">
      <div class="container grid grid--2col">
        <div class="video-block">
          <img src="images/video-thumbnail.svg" alt="Video: Nicolai fortæller om sin tilgang">
          <button class="video-block__play" aria-label="Afspil video">▶</button>
        </div>
        <div>
          <h2 id="moed-title">Mød din fysioterapeut i Langeskov</h2>
          <p>Jeg hedder Nicolai Grocott. Jeg har specialiseret mig i kroniske smerter og idrætsfysioterapi.</p>
          <ul class="step-list">
            <li class="step"><span class="step__number">1</span><strong>Første besøg</strong> — Jeg lytter til dine symptomer og laver en plan.</li>
            <li class="step"><span class="step__number">2</span><strong>Behandlingsplan</strong> — Målrettet behandling med løbende justeringer.</li>
            <li class="step"><span class="step__number">3</span><strong>Opfølgning</strong> — Du forlader ikke klinikken uden en plan for næste skridt.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Section 3: Fra første besøg -->
    <section class="section section--light" aria-labelledby="forloeb-title">
      <div class="container">
        <h2 id="forloeb-title">Fra første besøg til færre smerter</h2>
        <ol class="step-list step-list--horizontal">
          <li class="step"><span class="step__number">1</span><h3>Første besøg</h3><p>Nicolai lytter til dine symptomer og laver en plan.</p></li>
          <li class="step"><span class="step__number">2</span><h3>Behandlingsforløb</h3><p>Målrettet behandling med løbende justeringer.</p></li>
          <li class="step"><span class="step__number">3</span><h3>Opfølgning</h3><p>Du forlader ikke klinikken uden en plan for næste skridt.</p></li>
        </ol>
      </div>
    </section>

    <!-- Section 4: Testimonials -->
    <section class="section" aria-labelledby="testimonials-title">
      <div class="container">
        <h2 id="testimonials-title">Rigtige klienter. Rigtige resultater.</h2>
        <div class="grid grid--3col">
          <figure class="card card--testimonial">
            <div class="card__stars" aria-label="5 ud af 5 stjerner"><span aria-hidden="true">★★★★★</span></div>
            <blockquote><p>"Nicolai forstod mit problem på 5 minutter. Efter 3 behandlinger var smerterne væk."</p></blockquote>
            <figcaption><strong>Mette K.</strong><span class="caption">Google-anmeldelse</span></figcaption>
          </figure>
          <figure class="card card--testimonial">
            <div class="card__stars" aria-label="5 ud af 5 stjerner"><span aria-hidden="true">★★★★★</span></div>
            <blockquote><p>"Endelig en fysioterapeut der ikke bare giver mig en standardøvelse."</p></blockquote>
            <figcaption><strong>Jens B.</strong><span class="caption">Google-anmeldelse</span></figcaption>
          </figure>
          <figure class="card card--testimonial">
            <div class="card__stars" aria-label="5 ud af 5 stjerner"><span aria-hidden="true">★★★★★</span></div>
            <blockquote><p>"Den bedste fysioterapeut jeg har været hos i 20 år."</p></blockquote>
            <figcaption><strong>Anne L.</strong><span class="caption">Google-anmeldelse</span></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Section 5: Behandlinger -->
    <section class="section section--light" aria-labelledby="behandlinger-title">
      <div class="container">
        <h2 id="behandlinger-title">Behandlinger</h2>
        <p>Vælg det område der passer på dine symptomer.</p>
        <div class="grid grid--4col">
          <article class="card card--treatment">
            <img src="images/card-rygsmerter.svg" alt="" class="card__image">
            <div class="card__body">
              <span class="badge badge--outline">Behandling</span>
              <h3 class="card__title">Rygsmerter</h3>
              <p>Jeg finder årsagen — ikke bare symptomet.</p>
              <p class="caption">Fra 400 kr.</p>
              <a href="behandlinger/rygsmerter.html" class="card__link">Læs mere <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="card card--treatment">
            <img src="images/card-skulder.svg" alt="" class="card__image">
            <div class="card__body">
              <span class="badge badge--outline">Behandling</span>
              <h3 class="card__title">Skulder &amp; nakke</h3>
              <p>Spændinger og bevægelses-restriktioner adresseres målrettet.</p>
              <p class="caption">Fra 400 kr.</p>
              <a href="behandlinger/skulder-nakke.html" class="card__link">Læs mere <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="card card--treatment">
            <img src="images/card-hoved.svg" alt="" class="card__image">
            <div class="card__body">
              <span class="badge badge--outline">Behandling</span>
              <h3 class="card__title">Hovedpine &amp; kæbeplager</h3>
              <p>Behandling af spændingshovedpine og kæbeleds-dysfunktion.</p>
              <p class="caption">Fra 400 kr.</p>
              <a href="behandlinger/kaebe-hoved.html" class="card__link">Læs mere <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="card card--treatment">
            <img src="images/card-knae.svg" alt="" class="card__image">
            <div class="card__body">
              <span class="badge badge--outline">Behandling</span>
              <h3 class="card__title">Knæ &amp; hofter</h3>
              <p>Skader, slidgigt og post-operativ genoptræning.</p>
              <p class="caption">Fra 400 kr.</p>
              <a href="behandlinger/knae-hofter.html" class="card__link">Læs mere <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 6: Pris & forsikring -->
    <section class="section" aria-labelledby="pris-title">
      <div class="container grid grid--2col">
        <div>
          <h2 id="pris-title">Pris &amp; forsikring</h2>
          <div class="pris-rows">
            <div class="pris-row"><span>15 min</span><span>225 kr.</span></div>
            <div class="pris-row"><span>30 min</span><span>400 kr.</span></div>
            <div class="pris-row"><span>45 min</span><span>500 kr.</span></div>
            <div class="pris-row"><span>60 min</span><span>650 kr.</span></div>
            <div class="pris-row"><span>90 min</span><span>850 kr.</span></div>
            <div class="pris-row"><span>120 min</span><span>1.100 kr.</span></div>
            <div class="pris-row"><span>Akuttillæg</span><span>+300 kr.</span></div>
          </div>
        </div>
        <div>
          <h3>Du betaler måske ikke selv</h3>
          <p>Sygesikring Danmark refunderer typisk 30-40% af din behandling, og mange erhvervsforsikringer dækker også.</p>
          <a href="#" class="btn btn--secondary">Tjek din forsikringsdækning →</a>
        </div>
      </div>
    </section>

    <!-- Section 7: CTA-band -->
    <section class="section section--accent" aria-labelledby="ring-title">
      <div class="container cta-band">
        <h2 id="ring-title">Usikker? Bare ring.</h2>
        <p>Ring og spørg hvad som helst. Nicolai tager telefonen.</p>
        <a href="tel:+4560866770" class="btn btn--phone" aria-label="Ring til Nicolai på +45 60 86 67 70">+45 60 86 67 70</a>
      </div>
    </section>

    <!-- Section 8: Find os -->
    <section class="section section--light" aria-labelledby="find-title">
      <div class="container grid grid--2col">
        <div class="map-block">
          <img src="images/map-placeholder.svg" alt="Kort: Langeskov Centret 1, 5550 Langeskov">
        </div>
        <div>
          <h2 id="find-title">Find os i klinikken</h2>
          <address>
            Langeskov Centret 1, butik 3<br>
            5550 Langeskov<br>
            <a href="tel:+4560866770">+45 60 86 67 70</a><br>
            <a href="mailto:kontakt@grocott.dk">kontakt@grocott.dk</a>
          </address>
          <h3>Åbningstider</h3>
          <ul class="hours">
            <li><span>Man–Fre</span><span>08:00–20:00</span></li>
            <li><span>Lørdag</span><span>09:00–14:00</span></li>
            <li><span>Søndag</span><span>Lukket</span></li>
          </ul>
          <a href="#" class="btn btn--secondary">Se på Google Maps →</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer" role="contentinfo">
    <div class="container footer__grid">
      <div class="footer__col">
        <h2 class="footer__heading">Navigation</h2>
        <ul>
          <li><a href="/">Forside</a></li>
          <li><a href="om-nikolai.html">Om Nicolai</a></li>
          <li><a href="stubs/holdtraening.html">Holdtræning</a></li>
          <li><a href="stubs/erhvervsaftaler.html">Erhvervsaftaler</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2 class="footer__heading">Kontakt</h2>
        <address>
          Langeskov Centret 1, butik 3<br>5550 Langeskov<br>
          <a href="tel:+4560866770">+45 60 86 67 70</a><br>
          <a href="mailto:kontakt@grocott.dk">kontakt@grocott.dk</a>
        </address>
      </div>
      <div class="footer__col">
        <h2 class="footer__heading">Information</h2>
        <ul>
          <li><a href="stubs/priser.html">Priser</a></li>
          <li><a href="stubs/praktisk-information.html">Praktisk info</a></li>
          <li><a href="stubs/privatlivspolitik.html">Privatlivspolitik</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2 class="footer__heading">Åbningstider</h2>
        <ul class="hours">
          <li><span>Man–Fre</span><span>08:00–20:00</span></li>
          <li><span>Lørdag</span><span>09:00–14:00</span></li>
          <li><span>Søndag</span><span>Lukket</span></li>
        </ul>
      </div>
    </div>
    <div class="container footer__bar">
      <p>© 2026 Grocott Fysioterapi &amp; Sundhedshus · CVR XX XX XX XX</p>
    </div>
  </footer>

  <a href="tel:+4560866770" class="fab" aria-label="Ring til Nicolai">
    <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"/>
    </svg>
  </a>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat(html): add index.html with full semantic skeleton"
```

---

### Task 1.2: `om-nikolai.html`

**Files:**
- Create: `om-nikolai.html`

**Konvention:** Genbrug `<head>`, skip-link, `<header class="nav">`, `<footer>` og FAB **identisk** fra `index.html`. Kun `<main>`-indhold er side-specifikt. Husk `aria-current="page"` på "Om Nicolai" nav-link.

- [ ] **Step 1: Opret filen med samme head/nav/footer som index.html**

Kopiér `<head>` (men opdater `<title>` til `Om Nicolai · Grocott Fysioterapi` og `description` til "Mød Nicolai Grocott, autoriseret fysioterapeut i Langeskov. Læs om hans tilgang til behandling og baggrund."). Kopiér nav + footer + FAB uændret (men tilføj `aria-current="page"` på `<a href="om-nikolai.html">` i navigationen).

- [ ] **Step 2: Skriv `<main>` med 9 sektioner**

```html
<main id="main">

  <!-- Hero (2-col: portræt + tekst) -->
  <section class="section section--hero section--dark" aria-labelledby="om-hero-title">
    <div class="container grid grid--2col">
      <img src="images/nikolai-hero.svg" alt="Portræt af Nicolai Grocott, autoriseret fysioterapeut">
      <div>
        <p class="eyebrow">OM NICOLAI</p>
        <h1 id="om-hero-title">Nicolai Grocott</h1>
        <p class="hero__subtitle">Autoriseret fysioterapeut · Langeskov</p>
        <p>Med 10+ års erfaring og specialer i kroniske smerter og idrætsfysioterapi hjælper jeg dig med at komme tilbage til det, du holder af.</p>
        <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
      </div>
    </div>
  </section>

  <!-- Video — FØRSTE efter hero (manuel fix) -->
  <section class="section section--dark" aria-labelledby="video-title">
    <div class="container">
      <h2 id="video-title">Hør mig fortælle</h2>
      <div class="video-block video-block--centered">
        <img src="images/video-thumbnail.svg" alt="Video: Nicolai fortæller om sin behandlingstilgang">
        <button class="video-block__play" aria-label="Afspil video">▶</button>
      </div>
    </div>
  </section>

  <!-- Min tilgang -->
  <section class="section section--light" aria-labelledby="tilgang-title">
    <div class="container">
      <h2 id="tilgang-title">Min tilgang til behandling</h2>
      <div class="grid grid--3col">
        <div class="step"><span class="step__number">1</span><h3>Tid til dig</h3><p>Fuld konsultation, ikke samlebåndsbehandling.</p></div>
        <div class="step"><span class="step__number">2</span><h3>Årsag, ikke symptom</h3><p>Vi finder årsagen, ikke bare behandler smerten.</p></div>
        <div class="step"><span class="step__number">3</span><h3>Smertefri på den lange bane</h3><p>Mål er varig bedring, ikke kortvarig lindring.</p></div>
      </div>
    </div>
  </section>

  <!-- Sådan foregår et forløb -->
  <section class="section" aria-labelledby="forloeb-title">
    <div class="container">
      <h2 id="forloeb-title">Sådan foregår et forløb hos mig</h2>
      <ol class="step-list step-list--horizontal">
        <li class="step"><span class="step__number">1</span><h3>Undersøgelse</h3><p>Grundig anamnese og funktionel undersøgelse.</p></li>
        <li class="step"><span class="step__number">2</span><h3>Diagnose &amp; plan</h3><p>Vi lægger en plan sammen.</p></li>
        <li class="step"><span class="step__number">3</span><h3>Behandling</h3><p>Manuelle teknikker, øvelser, gradueret belastning.</p></li>
        <li class="step"><span class="step__number">4</span><h3>Selvhjælp</h3><p>Du forlader klinikken med konkrete værktøjer.</p></li>
      </ol>
    </div>
  </section>

  <!-- Min baggrund -->
  <section class="section section--light" aria-labelledby="baggrund-title">
    <div class="container grid grid--2col">
      <div>
        <h2 id="baggrund-title">Min baggrund</h2>
        <h3>Uddannelse</h3>
        <ul class="dot-list">
          <li><strong>2016</strong> · Fysioterapeut, UC Syddanmark</li>
          <li><strong>2018</strong> · Idrætsfysioterapeut-certificering</li>
        </ul>
      </div>
      <div>
        <h3>Kurser &amp; certifikater</h3>
        <ul class="dot-list">
          <li>McKenzie metode niveau A &amp; B</li>
          <li>Dry needling / akupunktur</li>
          <li>Kinetic Control bevægekontrol-system</li>
          <li>Akut idrætsskade-håndtering</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Testimonials — genbrug fra index -->
  <section class="section" aria-labelledby="testimonials-title">
    <div class="container">
      <h2 id="testimonials-title">Rigtige klienter. Rigtige resultater.</h2>
      <div class="grid grid--3col">
        <!-- 3 testimonial-cards identisk med index.html section 4 -->
      </div>
    </div>
  </section>

  <!-- Usikker? Bare ring — genbrug -->
  <section class="section section--accent" aria-labelledby="ring-title">
    <div class="container cta-band">
      <h2 id="ring-title">Usikker? Bare ring.</h2>
      <p>Ring og spørg hvad som helst. Nicolai tager telefonen.</p>
      <a href="tel:+4560866770" class="btn btn--phone">+45 60 86 67 70</a>
    </div>
  </section>

  <!-- Find os — genbrug -->
  <section class="section section--light" aria-labelledby="find-title">
    <!-- Identisk med index.html section 8 -->
  </section>

</main>
```

Note: marker "genbrug-sektioner" med `<!-- IDENTISK MED index.html SECTION X -->` og kopier den fulde HTML — ikke placeholders. Engineer skal kunne læse filen uden at hoppe mellem tasks.

- [ ] **Step 3: Commit**

```bash
git add om-nikolai.html
git commit -m "feat(html): add om-nikolai.html skeleton"
```

---

### Task 1.3: `design-system.html`

**Files:**
- Create: `design-system.html`

- [ ] **Step 1: Opret med samme head/nav/footer pattern**

Title: `Designsystem · Grocott Fysioterapi`. Description: "Komponentbibliotek og design tokens for Grocott Fysioterapi sitet."

- [ ] **Step 2: `<main>` med 11 komponentsektioner**

```html
<main id="main">
  <section class="section section--light">
    <div class="container">
      <h1>Grocott Fysioterapi — Designsystem</h1>
      <p class="hero__lead">Komponentbibliotek bygget med CSS custom properties. Alle komponenter henter farve, typografi og spacing fra tokens i <code>:root</code>, så ændringer i tokens automatisk propagerer.</p>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-buttons">
    <div class="container">
      <h2 id="ds-buttons">01 — Buttons</h2>
      <div class="ds-row">
        <h3>Button / Primary</h3>
        <div class="ds-preview">
          <button class="btn btn--primary">Default</button>
          <button class="btn btn--primary" data-state="hover">Hover</button>
        </div>
      </div>
      <div class="ds-row">
        <h3>Button / Secondary (lys surface)</h3>
        <div class="ds-preview">
          <button class="btn btn--secondary">Default</button>
          <button class="btn btn--secondary" data-state="hover">Hover</button>
        </div>
      </div>
      <div class="ds-row ds-row--dark">
        <h3>Button / Secondary (mørk surface)</h3>
        <div class="ds-preview">
          <button class="btn btn--secondary btn--on-dark">Default</button>
          <button class="btn btn--secondary btn--on-dark" data-state="hover">Hover</button>
        </div>
      </div>
      <div class="ds-row">
        <h3>Button / Ghost accent</h3>
        <div class="ds-preview">
          <button class="btn btn--ghost">Modtag engangskode på SMS</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-nav">
    <div class="container">
      <h2 id="ds-nav">02 — Navigation</h2>
      <p>Desktop nav (1440 bred) + Mobile nav (390 bred) er implementeret i <code>&lt;header class="nav"&gt;</code> på alle sider. Se denne sides nav for live-eksempel.</p>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-cards">
    <div class="container">
      <h2 id="ds-cards">03 — Cards</h2>
      <div class="ds-row">
        <h3>Card / Treatment (320 bred)</h3>
        <div class="ds-preview">
          <article class="card card--treatment" style="max-width:320px">
            <img src="images/card-rygsmerter.svg" alt="" class="card__image">
            <div class="card__body">
              <span class="badge badge--outline">Behandling</span>
              <h4 class="card__title">Rygsmerter</h4>
              <p>Jeg finder årsagen — ikke bare symptomet.</p>
              <p class="caption">Fra 400 kr.</p>
              <a href="#" class="card__link">Læs mere <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </div>
      <div class="ds-row">
        <h3>Card / Testimonial (420 bred)</h3>
        <div class="ds-preview">
          <figure class="card card--testimonial" style="max-width:420px">
            <div class="card__stars" aria-label="5 ud af 5 stjerner"><span aria-hidden="true">★★★★★</span></div>
            <blockquote><p>"Nicolai forstod mit problem på 5 minutter."</p></blockquote>
            <figcaption><strong>Mette K.</strong><span class="caption">Google-anmeldelse</span></figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-forms">
    <div class="container">
      <h2 id="ds-forms">04 — Forms</h2>
      <div class="ds-row">
        <h3>Input / Text Field — 4 states</h3>
        <div class="ds-preview ds-preview--stacked">
          <div class="field"><label>Default</label><input type="text" placeholder="Placeholder"></div>
          <div class="field"><label>Focus</label><input type="text" data-state="focus" placeholder="Skriv her..."></div>
          <div class="field"><label>Filled</label><input type="text" value="Caroline Amundsen"></div>
          <div class="field field--error"><label>Error</label><input type="email" value="caroline@" aria-invalid="true" aria-describedby="ds-err"><p id="ds-err" class="field__error" role="alert">Indtast en gyldig e-mail med @</p></div>
        </div>
      </div>
      <div class="ds-row">
        <h3>Checkbox</h3>
        <div class="ds-preview ds-preview--stacked">
          <label class="checkbox"><input type="checkbox"><span class="checkbox__mark"></span><span>Jeg er medlem af sygesikring Danmark</span></label>
          <label class="checkbox"><input type="checkbox" checked><span class="checkbox__mark"></span><span>Jeg accepterer privatlivspolitikken *</span></label>
        </div>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-fab">
    <div class="container">
      <h2 id="ds-fab">05 — FAB / Phone (Mobile 56×56)</h2>
      <p>FAB-knappen vises kun på mobile breakpoint (&lt;768px) i nederste højre hjørne — den er aktiv på denne side, scroll til mobil-view for at se.</p>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-badge">
    <div class="container">
      <h2 id="ds-badge">06 — Badge</h2>
      <div class="ds-preview">
        <span class="badge badge--outline">Outline (kategori)</span>
        <span class="badge badge--filled">★ Anbefalet</span>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-pris">
    <div class="container">
      <h2 id="ds-pris">07 — Pris Row</h2>
      <div class="ds-preview ds-preview--stacked" style="max-width:560px">
        <div class="pris-row"><span>30 min konsultation</span><span>400 kr.</span></div>
        <div class="pris-row"><span>60 min konsultation</span><span>650 kr.</span></div>
      </div>
    </div>
  </section>

  <section class="section ds-section ds-section--dark" aria-labelledby="ds-footer-col">
    <div class="container">
      <h2 id="ds-footer-col">08 — Footer Column (220 bred, mørk surface)</h2>
      <div class="ds-preview">
        <div class="footer__col" style="max-width:220px">
          <h3 class="footer__heading">Kontakt</h3>
          <address>Langeskov Centret 1<br>5550 Langeskov<br>+45 60 86 67 70</address>
        </div>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-step">
    <div class="container">
      <h2 id="ds-step">09 — Step (timeline-element)</h2>
      <div class="ds-preview" style="max-width:180px">
        <div class="step"><span class="step__number">1</span><h3>Første besøg</h3><p>Nicolai lytter til dine symptomer.</p></div>
      </div>
    </div>
  </section>

  <section class="section ds-section" aria-labelledby="ds-stepper">
    <div class="container">
      <h2 id="ds-stepper">10 — Stepper</h2>
      <h3>Booking-flow (5 trin)</h3>
      <ol class="stepper" aria-label="Booking trin demo">
        <li class="stepper__step stepper__step--done"><span class="stepper__circle" aria-hidden="true">✓</span><span class="stepper__label">Intro</span></li>
        <li class="stepper__step stepper__step--done"><span class="stepper__circle" aria-hidden="true">✓</span><span class="stepper__label">Symptom</span></li>
        <li class="stepper__step stepper__step--active" aria-current="step"><span class="stepper__circle" aria-hidden="true">3</span><span class="stepper__label">Tid</span></li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">4</span><span class="stepper__label">Oplysninger</span></li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">5</span><span class="stepper__label">Bekræft</span></li>
      </ol>
    </div>
  </section>

</main>
```

Genbrug index.html's `<header>`, `<footer>` og FAB. Tilføj `aria-current="page"` på relevant nav-link hvis nav-pattern definerer det (alternativt: ingen, da designsystem ikke er i hovednav).

- [ ] **Step 3: Commit**

```bash
git add design-system.html
git commit -m "feat(html): add design-system.html with all 11 component sections"
```

---

### Task 1.4: `behandlinger/rygsmerter.html` — canonical for 6 sider

**Files:**
- Create: `behandlinger/rygsmerter.html`

**Vigtigt:** Relative paths skifter — fra `behandlinger/` er CSS `../css/styles.css`, JS `../js/main.js`, billeder `../images/...`, root-link `../index.html` eller `/`.

- [ ] **Step 1: Opret med justerede paths**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Behandling af rygsmerter hos Grocott Fysioterapi i Langeskov. Jeg finder årsagen — ikke bare symptomet. Book første tid online.">
  <title>Rygsmerter · Grocott Fysioterapi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&family=Mulish:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">Spring til indhold</a>

  <!-- NAV: kopiér fra index.html men juster ALLE href til at gå tilbage:
       - href="/" → href="../index.html"
       - href="behandlinger/rygsmerter.html" → href="rygsmerter.html"  (samme mappe)
       - href="om-nikolai.html" → href="../om-nikolai.html"
       - href="stubs/holdtraening.html" → href="../stubs/holdtraening.html"
       - href="booking/trin-1.html" → href="../booking/trin-1.html"
       - href="klient/login.html" → href="../klient/login.html"
       Tilføj aria-current="page" på rygsmerter-link i behandlinger-dropdown.
  -->

  <main id="main">

    <section class="section section--hero section--dark" aria-labelledby="hero-title">
      <div class="container">
        <p class="eyebrow">BEHANDLING</p>
        <h1 id="hero-title">Rygsmerter? Jeg finder årsagen – og laver en plan der holder.</h1>
        <p class="hero__lead">Smerter i lænd, brystryg eller udstråling til ben? Vi starter altid med en grundig undersøgelse for at finde det der faktisk forårsager smerten.</p>
        <a href="../booking/trin-1.html" class="btn btn--primary">Book tid</a>
      </div>
    </section>

    <section class="section" aria-labelledby="hvad-title">
      <div class="container grid grid--2col">
        <div>
          <h2 id="hvad-title">Hvad er rygsmerter?</h2>
          <p>Rygsmerter kan have mange årsager — fra muskulære spændinger til diskusprolaps. Typiske symptomer:</p>
          <ul class="symptom-list">
            <li>Smerter i lænden ved bestemte bevægelser</li>
            <li>Udstråling til ben eller hofte</li>
            <li>Morgenstivhed der letter ved bevægelse</li>
            <li>Nedsat bevægelighed og rotation</li>
            <li>Smerter ved længere tids siddende arbejde</li>
            <li>Hovedpine udløst af nakke-spændinger</li>
          </ul>
        </div>
        <img src="../images/rygsmerter-hero.svg" alt="Foto: behandling af rygpatient på briks">
      </div>
    </section>

    <section class="section section--light" aria-labelledby="forloeb-title">
      <div class="container">
        <h2 id="forloeb-title">Fra første besøg til færre rygsmerter</h2>
        <ol class="step-list step-list--horizontal">
          <li class="step"><span class="step__number">1</span><h3>Undersøgelse og diagnose</h3><p>Funktionel test og bevægelsesanalyse.</p></li>
          <li class="step"><span class="step__number">2</span><h3>Målrettet behandling</h3><p>Manuelle teknikker, dry needling, gradueret belastning.</p></li>
          <li class="step"><span class="step__number">3</span><h3>Øvelser og selvhjælp</h3><p>Hjemmeprogram du faktisk kan følge.</p></li>
        </ol>
      </div>
    </section>

    <section class="section" aria-labelledby="testimonials-title">
      <div class="container">
        <h2 id="testimonials-title">Rigtige klienter. Rigtige resultater.</h2>
        <!-- 3 testimonial-cards — kopiér fra index.html section 4 -->
      </div>
    </section>

    <section class="section section--dark" aria-labelledby="tilgang-title">
      <div class="container grid grid--2col">
        <div>
          <h2 id="tilgang-title">Min tilgang til behandling af rygsmerter</h2>
          <p>Jeg ser rygsmerter som et symptom — ikke en diagnose. Min opgave er at finde årsagen, så vi kan ramme den specifikt fremfor blot at lindre.</p>
          <a href="../booking/trin-1.html" class="btn btn--primary">Book tid</a>
        </div>
        <img src="../images/nikolai-tilgang.svg" alt="Nicolai i behandlingssituation">
      </div>
    </section>

    <section class="section" aria-labelledby="pris-title">
      <div class="container">
        <h2 id="pris-title">Hvad koster behandling af rygsmerter?</h2>
        <div class="pris-rows" style="max-width:560px">
          <div class="pris-row"><span>30 min</span><span>400 kr.</span></div>
          <div class="pris-row"><span>45 min</span><span>500 kr.</span></div>
          <div class="pris-row"><span>60 min (anbefalet ved første besøg)</span><span>650 kr.</span></div>
          <div class="pris-row"><span>Akuttillæg</span><span>+300 kr.</span></div>
        </div>
        <p>Sygesikring Danmark og mange erhvervsforsikringer dækker typisk 30-40% af behandlingen.</p>
      </div>
    </section>

    <section class="section section--light" aria-labelledby="faq-title">
      <div class="container">
        <h2 id="faq-title">Spørgsmål om behandling af rygsmerter</h2>
        <div class="accordion">
          <details class="accordion__item">
            <summary class="accordion__head"><span>Hvornår skal jeg søge hjælp?</span><span class="accordion__icon" aria-hidden="true">+</span></summary>
            <div class="accordion__body"><p>Hvis smerterne har varet mere end 2-3 uger, eller hvis du har udstråling til ben — så er det tid til en undersøgelse.</p></div>
          </details>
          <details class="accordion__item">
            <summary class="accordion__head"><span>Skal jeg vælge 30 eller 60 min ved første besøg?</span><span class="accordion__icon" aria-hidden="true">+</span></summary>
            <div class="accordion__body"><p>60 min anbefales — det giver tid til både undersøgelse og første behandling. 30 min er kun nok hvis du allerede har en diagnose.</p></div>
          </details>
          <details class="accordion__item">
            <summary class="accordion__head"><span>Kan jeg blive helt smertefri?</span><span class="accordion__icon" aria-hidden="true">+</span></summary>
            <div class="accordion__body"><p>Det afhænger af årsagen — men ja, mange klienter når et niveau hvor rygsmerter ikke længere begrænser hverdagen.</p></div>
          </details>
          <details class="accordion__item">
            <summary class="accordion__head"><span>Hvor mange behandlinger skal jeg bruge?</span><span class="accordion__icon" aria-hidden="true">+</span></summary>
            <div class="accordion__body"><p>Typisk 3-6 behandlinger. Vi lægger en plan efter første besøg.</p></div>
          </details>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="andre-title">
      <div class="container">
        <h2 id="andre-title">Hvilke andre smerter behandler vi?</h2>
        <div class="grid grid--5col cross-links">
          <a href="skulder-nakke.html" class="cross-link">Skulder &amp; nakke</a>
          <a href="kaebe-hoved.html" class="cross-link">Kæbe &amp; hoved</a>
          <a href="knae-hofter.html" class="cross-link">Knæ &amp; hofter</a>
          <a href="fod.html" class="cross-link">Fod-problematikker</a>
          <a href="massage.html" class="cross-link">Massage</a>
        </div>
      </div>
    </section>

    <!-- Usikker? + Find os — genbrug fra index.html (juster paths) -->

  </main>

  <!-- Footer + FAB — genbrug fra index.html (juster paths) -->
  <script src="../js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add behandlinger/rygsmerter.html
git commit -m "feat(html): add behandlinger/rygsmerter.html canonical template"
```

---

### Task 1.5: 5 øvrige behandlinger fra canonical template

**Files:**
- Create: `behandlinger/skulder-nakke.html`, `kaebe-hoved.html`, `knae-hofter.html`, `fod.html`, `massage.html`

**Variation table** — kun disse felter ændres per side. Resten er identisk med `rygsmerter.html`.

| Fil | `<title>` | H1 | Hero billede | Symptom-liste (sektion 2) | FAQ-overskrift | FAQ-items |
|---|---|---|---|---|---|---|
| `skulder-nakke.html` | `Skulder og nakke · Grocott Fysioterapi` | "Skulder- og nakkesmerter? Jeg løser dem ved roden." | `../images/skulder-hero.svg` | Smerter i nakke, Spændingshovedpine, Nedsat rotation, Udstråling til arm, Stivhed efter søvn, Tinitus relateret | "Spørgsmål om skulder- og nakkebehandling" | Tilpas til skulder/nakke |
| `kaebe-hoved.html` | `Kæbe og hoved · Grocott Fysioterapi` | "Kæbeleds-spændinger og hovedpine? Det starter ofte i nakken." | `../images/kaebe-hero.svg` | Klikken i kæbeled, Smerter ved tygning, Spændingshovedpine, Bruxisme/tænderskæren, Migræne-lignende anfald, Øresmerter uden infektion | "Spørgsmål om kæbe- og hovedpinebehandling" | Tilpas |
| `knae-hofter.html` | `Knæ og hofter · Grocott Fysioterapi` | "Knæ- og hoftesmerter? Vi finder skadens kilde." | `../images/knae-hero.svg` | Smerter ved gang/løb, Hævelse efter aktivitet, Klikken eller ustabilitet, Slidgigt-symptomer, Post-operativ genoptræning, Smerter ved trapper | "Spørgsmål om knæ- og hoftebehandling" | Tilpas |
| `fod.html` | `Fod-problematikker · Grocott Fysioterapi` | "Fodsmerter? Indlægssåler eller massage — vi finder den rigtige løsning." | `../images/fod-hero.svg` | Smerter ved første skridt om morgenen, Hælspore-symptomer, Plantar fasciitis, Smerter ved længere tids gang, Tunge ben efter arbejde, Tab af gangkomfort | "Spørgsmål om fodbehandling" | Tilpas |
| `massage.html` | `Massage · Grocott Fysioterapi` | "Sportsmassage og dyb vævsbehandling — som tilskud til træning eller forløb." | `../images/massage-hero.svg` | Muskulær spændinghovedpine, Træningsrelateret stivhed, Restitution efter konkurrence, Cellulær affaldsstof-clearance, Forebyggelse af skader, Generel velvære | "Spørgsmål om massage" | Tilpas |

**Special — `fod.html`:** Sektion 8 ("Hvilke andre smerter behandler vi?") erstattes med:

```html
<section class="section section--light" aria-labelledby="undervalg-title">
  <div class="container">
    <h2 id="undervalg-title">Undervalg ved fod-problematikker</h2>
    <div class="grid grid--3col">
      <article class="card card--treatment">
        <div class="card__body"><h3>Indlægssåler</h3><p>Specialfremstillede såler efter trykmåling og gangmønster.</p><p class="caption">Fra 1.500 kr.</p></div>
      </article>
      <article class="card card--treatment">
        <div class="card__body"><h3>Spenco sandaler</h3><p>Sandaler med optimal støtte for daglig brug.</p><p class="caption">Fra 800 kr.</p></div>
      </article>
      <article class="card card--treatment">
        <div class="card__body"><h3>Generel fysioterapi</h3><p>Manuel behandling og øvelser.</p><p class="caption">Fra 400 kr.</p></div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 1: Kopier `rygsmerter.html` 5 gange**

```bash
cp behandlinger/rygsmerter.html behandlinger/skulder-nakke.html
cp behandlinger/rygsmerter.html behandlinger/kaebe-hoved.html
cp behandlinger/rygsmerter.html behandlinger/knae-hofter.html
cp behandlinger/rygsmerter.html behandlinger/fod.html
cp behandlinger/rygsmerter.html behandlinger/massage.html
```

- [ ] **Step 2-6: For hver fil — opdater fra variation table**

Brug Edit-tool til at finde/erstatte:
- `<title>Rygsmerter ...</title>` → side-specifik
- `<meta name="description" ...>` → side-specifik
- H1 i hero → side-specifik
- `<img src="../images/rygsmerter-hero.svg" ...>` → side-specifik
- 6 symptom-listepunkter → side-specifikke
- "Spørgsmål om behandling af rygsmerter" → side-specifik FAQ-overskrift
- 4 FAQ-item-tekster → tilpas til side-emne
- "Hvad koster behandling af rygsmerter?" → "Hvad koster [behandling]?"
- `aria-current="page"` flyttes til den rigtige link i behandlinger-dropdown
- Sektion 8 cross-links: fjern selv-link, behold de 5 andre

For `fod.html`: erstat sektion 8 helt med undervalg-grid fra ovenfor.

- [ ] **Step 7: Commit**

```bash
git add behandlinger/
git commit -m "feat(html): add 5 remaining behandlinger pages from rygsmerter template"
```

---

### Task 1.6: Booking-flow `booking/trin-1.html` til `trin-5.html`

**Files:**
- Create: 5 filer i `booking/`

**Fælles for alle 5:** flow-page layout med modal-card centreret. Genbrug `<head>` (samme paths som behandlinger/ — `../css/styles.css`). Nav skal pege til `../...` paths.

**Trin 1 — `booking/trin-1.html` — canonical for flow-layout:**

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Trin 1 af 5 — Vælg konsultationslængde til dit første besøg hos Grocott Fysioterapi.">
  <title>Trin 1: Introduktion · Book tid · Grocott Fysioterapi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&family=Mulish:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body class="flow-page">
  <a href="#main" class="skip-link">Spring til indhold</a>

  <!-- Nav (genbrug index.html med relative path-justering, ../) -->

  <main id="main" class="flow-main">
    <div class="flow-card">

      <ol class="stepper" aria-label="Booking trin">
        <li class="stepper__step stepper__step--active" aria-current="step">
          <span class="stepper__circle" aria-hidden="true">1</span>
          <span class="stepper__label">Introduktion</span>
        </li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">2</span><span class="stepper__label">Symptomer</span></li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">3</span><span class="stepper__label">Kalender</span></li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">4</span><span class="stepper__label">Oplysninger</span></li>
        <li class="stepper__step"><span class="stepper__circle" aria-hidden="true">5</span><span class="stepper__label">Bekræft</span></li>
      </ol>

      <h1>Din første gang hos Grocott Fysioterapi</h1>
      <p>Jeg ved godt, at det kan føles usikkert at prøve en ny behandler. Lad os starte med det vigtigste — at finde ud af hvor lang tid du skal have ved første besøg.</p>

      <div class="min-tilgang-card">
        <img src="../images/nikolai-tilgang.svg" alt="Nicolai Grocott i klinikken">
        <div>
          <h2>Min tilgang</h2>
          <p>Jeg tager mig tid til at lytte, undersøge grundigt og lægge en plan vi følger sammen.</p>
        </div>
      </div>

      <fieldset class="consult-toggle" role="radiogroup" aria-labelledby="consult-legend">
        <legend id="consult-legend"><h2>Vælg konsultationslængde</h2></legend>
        <p class="field__help">Nicolai anbefaler 60 min til første besøg — du får undersøgelse og behandling i samme session. Vælg 30 min kun hvis du har én fokuseret problemstilling.</p>

        <label class="consult-toggle__option">
          <input type="radio" name="length" value="30">
          <span class="consult-toggle__card">
            <strong>30 minutter</strong>
            <span>Kortere konsultation. Passende ved fokuseret problemstilling.</span>
            <span class="pris">400 kr.</span>
          </span>
        </label>

        <label class="consult-toggle__option consult-toggle__option--recommended">
          <input type="radio" name="length" value="60" checked>
          <span class="consult-toggle__card">
            <span class="badge badge--filled">★ Anbefalet</span>
            <strong>60 minutter</strong>
            <span>Inkl. undersøgelse og behandlingsplan. Anbefales til alle nye patienter.</span>
            <span class="pris">650 kr.</span>
          </span>
        </label>
      </fieldset>

      <div class="flow-card__actions">
        <a href="../index.html" class="btn btn--secondary">← Tilbage</a>
        <a href="trin-2.html" class="btn btn--primary">Vælg dine symptomer →</a>
      </div>

      <aside class="flow-card__phone-fallback">
        <p>Er du i tvivl og har brug for vejledning?</p>
        <a href="tel:+4560866770" class="btn btn--phone">📞 Ring til mig: +45 60 86 67 70</a>
      </aside>
    </div>
  </main>

  <!-- Footer + FAB — genbrug -->
  <script src="../js/main.js" defer></script>
</body>
</html>
```

**Trin 2-5:** Samme overall struktur. Vis kun det side-specifikke `<main>`-indhold nedenfor — head/nav/footer/FAB er identisk.

**Trin 2 — Symptomvalg:**

```html
<!-- Stepper: 1 done, 2 active, 3-5 pending -->
<h1>Hvad vil du behandles for?</h1>
<p>Vælg den kategori der passer bedst til dine symptomer.</p>

<fieldset class="symptom-grid" aria-labelledby="symptom-legend">
  <legend id="symptom-legend" class="sr-only">Symptom-kategorier</legend>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="hovedpine"><span>Hovedpine og kæbe</span></label>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="skulder-nakke"><span>Skulder og nakke</span></label>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="knae-hofter"><span>Knæ og hofter</span></label>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="rygsmerter"><span>Rygsmerter</span></label>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="fod"><span>Fod-problematikker</span></label>
  <label class="symptom-grid__option"><input type="radio" name="symptom" value="massage"><span>Massage</span></label>
</fieldset>

<fieldset class="symptom-sub" hidden data-show-when="fod" aria-labelledby="sub-legend">
  <legend id="sub-legend">Specifik fod-problematik</legend>
  <label class="symptom-grid__option"><input type="radio" name="subCategory" value="indlaegssaaler"><span>↳ Indlægssåler</span></label>
  <label class="symptom-grid__option"><input type="radio" name="subCategory" value="sandaler"><span>↳ Spenco sandaler</span></label>
  <label class="symptom-grid__option"><input type="radio" name="subCategory" value="generelt"><span>↳ Generelt</span></label>
</fieldset>

<div class="info-card" hidden data-info-for>
  <h3 data-info-title></h3>
  <p data-info-desc></p>
  <a href="#" data-info-link>Læs mere om denne behandling →</a>
</div>

<div class="flow-card__actions">
  <a href="trin-1.html" class="btn btn--secondary">← Tilbage</a>
  <a href="trin-3.html" class="btn btn--primary">Vælg dato og tid →</a>
</div>
```

**Trin 3 — Kalender:**

```html
<!-- Stepper: 1-2 done, 3 active, 4-5 pending -->
<h1>Vælg dato og tid</h1>

<label class="switch">
  <input type="checkbox" name="akut">
  <span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>
  <span class="switch__label">Jeg har brug for en akuttid <span class="caption">(+300 kr.)</span></span>
</label>

<fieldset class="consult-toggle consult-toggle--inline" role="radiogroup" aria-labelledby="length-legend">
  <legend id="length-legend" class="sr-only">Konsultationslængde</legend>
  <label class="consult-toggle__pill"><input type="radio" name="length" value="60" checked><span>60 minutter ★</span></label>
  <label class="consult-toggle__pill"><input type="radio" name="length" value="30"><span>30 minutter</span></label>
</fieldset>

<section class="calendar" aria-labelledby="calendar-title">
  <header class="calendar__nav">
    <button type="button" aria-label="Forrige måned">‹</button>
    <h2 id="calendar-title">Maj 2026</h2>
    <button type="button" aria-label="Næste måned">›</button>
  </header>
  <table class="calendar__grid" role="grid" aria-labelledby="calendar-title">
    <thead><tr><th scope="col">Man</th><th scope="col">Tir</th><th scope="col">Ons</th><th scope="col">Tor</th><th scope="col">Fre</th><th scope="col">Lør</th><th scope="col">Søn</th></tr></thead>
    <tbody>
      <!-- JS-renderet i Phase 6. For nu: hardkod én række til struktur-test -->
      <tr>
        <td><button type="button" class="date-cell">4</button></td>
        <td><button type="button" class="date-cell date-cell--selected" aria-pressed="true">5</button></td>
        <td><button type="button" class="date-cell">6</button></td>
        <td><button type="button" class="date-cell">7</button></td>
        <td><button type="button" class="date-cell">8</button></td>
        <td><button type="button" class="date-cell" disabled aria-disabled="true">9</button></td>
        <td><button type="button" class="date-cell" disabled aria-disabled="true">10</button></td>
      </tr>
    </tbody>
  </table>
</section>

<h3>Ledige tider — tirsdag 5. maj 2026</h3>
<ul class="time-slots">
  <li><button type="button" class="time-slot">09:00</button></li>
  <li><button type="button" class="time-slot time-slot--selected" aria-pressed="true">10:00</button></li>
  <li><button type="button" class="time-slot">13:00</button></li>
  <li><button type="button" class="time-slot">14:30</button></li>
  <li><button type="button" class="time-slot">16:00</button></li>
</ul>

<div class="booking-summary" aria-live="polite">
  <strong>Tir 5. maj · 10:00 · 60 min · 650 kr.</strong>
</div>

<div class="flow-card__actions">
  <a href="trin-2.html" class="btn btn--secondary">← Tilbage</a>
  <a href="trin-4.html" class="btn btn--primary">Udfyld dine oplysninger →</a>
</div>
```

**Trin 4 — Oplysninger:**

```html
<!-- Stepper: 1-3 done, 4 active, 5 pending -->
<h1>Dine oplysninger</h1>
<p>Udfyld dine kontaktoplysninger for at gennemføre bookingen.</p>

<form novalidate>
  <div class="field">
    <label for="navn">Fulde navn *</label>
    <input id="navn" name="navn" type="text" required autocomplete="name" placeholder="Fornavn Efternavn">
  </div>

  <div class="field">
    <label for="email">E-mail *</label>
    <input id="email" name="email" type="email" required autocomplete="email" placeholder="navn@eksempel.dk">
  </div>

  <div class="field">
    <label for="phone">Telefonnummer *</label>
    <input id="phone" name="phone" type="tel" required autocomplete="tel" placeholder="+45 XX XX XX XX">
  </div>

  <div class="field">
    <label for="cpr">CPR-nummer *</label>
    <input id="cpr" name="cpr" type="password" required pattern="\d{6}-?\d{4}" autocomplete="off" placeholder="XXXXXX-XXXX" aria-describedby="cpr-help">
    <button type="button" class="field__info-trigger" aria-controls="cpr-modal" aria-expanded="false" id="cpr-help">
      ℹ Hvad bruges CPR-nummer til? Læs om vores opbevaring
    </button>
    <p class="field__help"><strong>⚠ Demo:</strong> Feltet er maskeret (type=password). I dette prototypeflow gemmes intet.</p>
  </div>

  <div class="field">
    <label for="notes">Kommentar (valgfri)</label>
    <textarea id="notes" name="notes" rows="3" placeholder="Beskriv evt. dit problem kort"></textarea>
  </div>

  <label class="checkbox">
    <input type="checkbox" name="sygesikring">
    <span class="checkbox__mark"></span>
    <span>Jeg er medlem af sygesikring Danmark</span>
  </label>

  <label class="checkbox">
    <input type="checkbox" name="gdpr" required>
    <span class="checkbox__mark"></span>
    <span>Jeg accepterer privatlivspolitikken *</span>
  </label>

  <div class="flow-card__actions">
    <a href="trin-3.html" class="btn btn--secondary">← Tilbage</a>
    <button type="submit" class="btn btn--primary">Bekræft booking →</button>
  </div>
</form>

<!-- CPR Info Modal -->
<div id="cpr-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="cpr-modal-title" hidden>
  <div class="modal__backdrop" data-close></div>
  <div class="modal__card">
    <button type="button" class="modal__close" data-close aria-label="Luk">✕</button>
    <h2 id="cpr-modal-title">Hvad bruges CPR-nummer til?</h2>
    <ul>
      <li>Journalpligt jævnfør autorisationsloven § 22</li>
      <li>Sikker journalføring krypteret efter standard</li>
      <li>Deles ikke med tredjepart</li>
    </ul>
    <p><strong>⚠ Demo:</strong> I dette prototypeflow gemmes intet. CPR-feltet er maskeret (type=password).</p>
    <a href="../stubs/privatlivspolitik.html">Læs privatlivspolitik →</a>
  </div>
</div>
```

**Trin 5 — Bekræft:**

```html
<!-- Stepper: 1-5 done (alle ✓) -->
<h1 class="confirmation-title">Din tid er bestilt ✓</h1>
<p>Du vil modtage en bekræftelse på e-mail inden for få minutter.</p>

<dl class="confirmation-summary">
  <dt>Behandling</dt><dd>60 min konsultation</dd>
  <dt>Dato og tid</dt><dd>Tirsdag 5. maj 2026 kl. 10:00</dd>
  <dt>Behandler</dt><dd>Nicolai Grocott</dd>
  <dt>Adresse</dt><dd>Langeskov Centret 1, butik 3, 5550 Langeskov</dd>
  <dt>Pris</dt><dd>650 kr.</dd>
</dl>

<div class="map-block">
  <img src="../images/map-placeholder.svg" alt="Kort: Langeskov Centret 1, 5550 Langeskov">
</div>

<div class="flow-card__actions">
  <button type="button" class="btn btn--primary">📅 Tilføj til kalender</button>
  <a href="../index.html" class="btn btn--secondary">← Tilbage til forsiden</a>
</div>
```

- [ ] **Step 1-5: Opret hver fil med ovenstående indhold**

For hver fil: kopier head + nav + footer + FAB pattern fra index.html (med `../` path-justering), tilføj side-specifikt `<main>`.

- [ ] **Step 6: Commit**

```bash
git add booking/
git commit -m "feat(html): add booking flow trin 1-5 skeletons"
```

---

### Task 1.7: EK-flow `klient/{login,vaelg,kalender,bekraeft,booket}.html`

**Files:**
- Create: 5 filer i `klient/`

**Fælles:** Samme path-pattern som booking/ (`../css/styles.css` osv.). Stepper-labels: `Login | Vælg | Tid | Bekræft | Booket`. `login.html` har INGEN stepper.

**`login.html`:**

```html
<!-- Head: title "Log ind · Grocott Fysioterapi", description om EK login -->
<!-- Nav -->
<body class="flow-page">
<main id="main" class="flow-main">
  <div class="flow-card flow-card--narrow">
    <p class="eyebrow">GROCOTT FYSIOTERAPI</p>
    <h1>Velkommen tilbage</h1>
    <p>Log ind for at booke din næste tid.</p>

    <button type="button" class="btn btn--mitid">
      <span class="mitid-logo" aria-hidden="true">MitID</span> Log ind med MitID
    </button>

    <div class="divider"><span>eller</span></div>

    <form novalidate>
      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" name="email" type="email" required autocomplete="email" placeholder="navn@eksempel.dk">
      </div>
      <div class="field">
        <label for="password">Adgangskode</label>
        <input id="password" name="password" type="password" required autocomplete="current-password" placeholder="••••••••">
      </div>
      <button type="submit" class="btn btn--ghost">Log ind med e-mail</button>
      <a href="#" class="link-subtle">Glemt adgangskode?</a>
    </form>

    <div class="divider"><span>eller</span></div>

    <button type="button" class="btn btn--ghost">Modtag engangskode på SMS</button>

    <p class="link-row">Første gang hos Grocott? <a href="../booking/trin-1.html">Book som ny patient →</a></p>
  </div>
</main>
```

**`vaelg.html` — symptom-grid identisk med booking trin 2, men stepper viser EK-labels (Login ✓, Vælg active, Tid/Bekræft/Booket pending). Action-knap → `kalender.html`.**

**`kalender.html` — identisk med booking trin 3 men EK-stepper og action-knap → `bekraeft.html`.**

**`bekraeft.html` — viser pre-fyldte felter (label + statisk værdi + redigér-link):**

```html
<!-- Stepper: Login ✓, Vælg ✓, Tid ✓, Bekræft active, Booket pending -->
<h1>Bekræft din booking</h1>
<p>Vi har hentet dine oplysninger fra din journal. Tjek at de stadig er korrekte.</p>

<dl class="confirmation-summary">
  <dt>Navn</dt><dd>Caroline Amundsen <a href="#" class="link-subtle">Redigér</a></dd>
  <dt>E-mail</dt><dd>caroline@eksempel.dk <a href="#" class="link-subtle">Redigér</a></dd>
  <dt>Telefon</dt><dd>+45 12 34 56 78 <a href="#" class="link-subtle">Redigér</a></dd>
  <dt>Behandling</dt><dd>60 min konsultation</dd>
  <dt>Dato og tid</dt><dd>Tirsdag 5. maj 2026 kl. 10:00</dd>
</dl>

<div class="info-callout">
  <p><strong>📋 Sikkerhed:</strong> Dit CPR-nummer er allerede i din journal og bekræftes ikke på ny.</p>
</div>

<label class="checkbox">
  <input type="checkbox" name="gdpr" required>
  <span class="checkbox__mark"></span>
  <span>Jeg bekræfter at oplysningerne er korrekte *</span>
</label>

<div class="flow-card__actions">
  <a href="kalender.html" class="btn btn--secondary">← Tilbage</a>
  <button type="submit" class="btn btn--primary">Bekræft booking →</button>
</div>
```

**`booket.html` — identisk struktur med booking trin 5 men "Din tid er booket" og EK-stepper alle ✓.**

- [ ] **Step 1-5: Opret hver fil**

- [ ] **Step 6: Commit**

```bash
git add klient/
git commit -m "feat(html): add EK-flow klient pages (login/vaelg/kalender/bekraeft/booket)"
```

---

### Task 1.8: Stub-sider — `stubs/` × 6

**Files:**
- Create: `stubs/erhvervsaftaler.html`, `kontakt.html`, `priser.html`, `praktisk-information.html`, `holdtraening.html`, `privatlivspolitik.html`

- [ ] **Step 1: Lav canonical stub**

Opret `stubs/erhvervsaftaler.html`:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Erhvervsaftaler hos Grocott Fysioterapi — kommer snart.">
  <title>Erhvervsaftaler · Grocott Fysioterapi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&family=Mulish:wght@400;500;700&display=swap">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a href="#main" class="skip-link">Spring til indhold</a>

  <!-- Nav genbrug fra index.html (med ../ paths) -->

  <main id="main">
    <section class="section section--hero section--dark">
      <div class="container">
        <p class="eyebrow">UNDER UDVIKLING</p>
        <h1>Erhvervsaftaler</h1>
        <p class="hero__lead">Denne side er under udvikling. For spørgsmål om erhvervsaftaler, ring til mig direkte.</p>
        <a href="tel:+4560866770" class="btn btn--primary">📞 Ring: +45 60 86 67 70</a>
        <a href="../index.html" class="btn btn--secondary btn--on-dark">← Tilbage til forsiden</a>
      </div>
    </section>
  </main>

  <!-- Footer + FAB -->
  <script src="../js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2-6: Kopier til de 5 andre, opdater kun H1 + `<title>` + `<meta description>`**

| Fil | H1 | Title |
|---|---|---|
| `kontakt.html` | Kontakt | `Kontakt · Grocott Fysioterapi` |
| `priser.html` | Priser | `Priser · Grocott Fysioterapi` |
| `praktisk-information.html` | Praktisk information | `Praktisk information · Grocott Fysioterapi` |
| `holdtraening.html` | Holdtræning | `Holdtræning · Grocott Fysioterapi` |
| `privatlivspolitik.html` | Privatlivspolitik | `Privatlivspolitik · Grocott Fysioterapi` |

- [ ] **Step 7: Commit**

```bash
git add stubs/
git commit -m "feat(html): add 6 stub pages for out-of-MVP routes"
```

---

### Task 1.9: Verifikation — alle 25 sider eksisterer og linker

- [ ] **Step 1: Verificér filer**

```bash
find . -name "*.html" -not -path "./.git/*" | sort
```

Expected output (25 filer):
```
./behandlinger/fod.html
./behandlinger/kaebe-hoved.html
./behandlinger/knae-hofter.html
./behandlinger/massage.html
./behandlinger/rygsmerter.html
./behandlinger/skulder-nakke.html
./booking/trin-1.html
./booking/trin-2.html
./booking/trin-3.html
./booking/trin-4.html
./booking/trin-5.html
./design-system.html
./index.html
./klient/bekraeft.html
./klient/booket.html
./klient/kalender.html
./klient/login.html
./klient/vaelg.html
./om-nikolai.html
./stubs/erhvervsaftaler.html
./stubs/holdtraening.html
./stubs/kontakt.html
./stubs/praktisk-information.html
./stubs/priser.html
./stubs/privatlivspolitik.html
```

- [ ] **Step 2: Stikprøve på relative paths**

```bash
grep -r 'href="/' --include="*.html" | head -5
grep -r 'src="images/' behandlinger/ booking/ klient/ stubs/ | head -5
```

Expected: ingen `href="/"` i undermapper (skal være `../index.html`). Ingen `src="images/...` i undermapper (skal være `../images/...`).

- [ ] **Step 3: Åbn `index.html` i browser**

```bash
open index.html
```

Expected: siden vises (uden CSS — bare semantisk markup), alle nav-links virker.

---

## Phase 2: CSS foundation (Lag 2)

**Mål:** `css/styles.css` har tokens, reset, typografi, layout-helpers og utilities. Efter denne fase ser siderne typografisk korrekte ud, men komponenter er ustylede.

### Task 2.1: Tokens, reset, base

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Skriv tokens + reset i `css/styles.css`**

```css
/* ====================================================================
   Grocott Fysioterapi & Sundhedshus — Stylesheet
   Caroline Amundsen · UCL Multimediedesigner · 2026
   
   Indhold:
   00. Custom properties (design tokens)
   01. Reset + base
   02. Typografi
   03. Layout helpers (.container, .grid, .stack)
   04. Skip link
   05. Buttons
   06. Navigation (desktop + mobile)
   07. Footer
   08. Cards (treatment, testimonial)
   09. Form fields + checkbox + radio
   10. Stepper
   11. Accordion (details/summary)
   12. Modal / Popover
   13. FAB
   14. Badge
   15. Pris row
   16. Step (timeline element)
   17. Booking-specific (consult-toggle, switch, calendar, symptom-grid)
   18. Sections (hero, CTA-band, map-block, video-block)
   19. Pages (index, om-nikolai, behandlinger, booking, klient, stubs)
   20. Design-system showcase styles
   21. Utilities (.sr-only, .text-medium osv.)
   22. Media queries (<768px)
   ==================================================================== */

/* ====================================================================
   00. Custom properties (design tokens)
   Kilde: Figma 🎨 Design System (node 10:2)
   ==================================================================== */
:root {
  /* Colors (Figma variables) */
  --bg-dark:        #17212E;
  --bg-light:       #F8F4EE;
  --bg-photo:       #1C0C06;
  --white:          #FFFFFF;

  --accent:         #E06820;
  --accent-hover:   #B84E10;

  --text-primary:   #F4EEE8;
  --text-secondary: #8A9EAD;
  --text-dark:      #1C2630;
  --text-on-accent: #1C2630;

  --border-light-figma: #E2D8CC;
  --border-dark-figma:  #2A3A4A;

  --star:           #E8960E;

  /* WCAG 2.2 AA-fixed varianter */
  --accent-text-on-light: var(--accent-hover);
  --star-on-light:        #C77B0A;
  --border-light:         #C5B8A8;
  --border-dark:          #5A6E80;

  /* Shadow (Figma shadow/md) */
  --shadow-card: 0 6px 16px rgba(28, 38, 48, 0.14);

  /* Radius */
  --radius-card: 8px;
  --radius-btn:  50px;

  /* Spacing */
  --space-4:  4px;
  --space-8:  8px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;

  /* Layout */
  --max-width:     1440px;
  --content-width: 1200px;
  --mobile-width:  390px;
  --nav-height:    64px;
}

/* ====================================================================
   01. Reset + base
   ==================================================================== */
*, *::before, *::after { box-sizing: border-box; }

* { margin: 0; }

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  background: var(--bg-light);
  color: var(--text-dark);
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, svg, video {
  display: block;
  max-width: 100%;
  height: auto;
}

button, input, textarea, select {
  font: inherit;
  color: inherit;
}

button { cursor: pointer; background: none; border: none; }

a { color: var(--accent-hover); text-decoration: none; }
a:hover, a:focus-visible { text-decoration: underline; }

ul, ol { padding: 0; list-style: none; }

/* Focus ring — synlig på alt interaktivt */
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* WCAG 2.4.11 — sticky nav obscurer ikke focus */
:focus-visible {
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

/* Sektioner accepterer dyb baggrundsfarve */
.section--dark  { background: var(--bg-dark);  color: var(--text-primary); }
.section--light { background: var(--bg-light); color: var(--text-dark); }
.section--accent{ background: var(--accent);   color: var(--text-on-accent); }

.section { padding: var(--space-64) 0; }
@media (max-width: 767.98px) { .section { padding: var(--space-48) 0; } }
```

- [ ] **Step 2: Verificér ved at åbne `index.html`**

```bash
open index.html
```

Expected: side har lys baggrund, mørk tekst, ingen border eller decorations endnu.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add tokens, reset and base styles"
```

---

### Task 2.2: Typografi

**Files:**
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Tilføj typografi-blok**

```css
/* ====================================================================
   02. Typografi (Figma: Sen + Mulish)
   ==================================================================== */
body {
  font-family: 'Mulish', system-ui, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.8;
}

h1, h2, h3 {
  font-family: 'Sen', system-ui, sans-serif;
  line-height: 1.4;
  margin-block-end: var(--space-16);
}

h1 { font-weight: 800; font-size: 42px; }
h2 { font-weight: 700; font-size: 34px; }
h3 { font-weight: 700; font-size: 24px; }

p { margin-block-end: var(--space-16); }
p:last-child { margin-block-end: 0; }

.eyebrow {
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-block-end: var(--space-16);
}

.caption { font-size: 13px; line-height: 1.8; }
.caption-bold { font-size: 13px; line-height: 1.8; font-weight: 700; }
.text-medium { font-weight: 500; }
.text-bold   { font-weight: 700; }

.hero__lead { font-size: 20px; line-height: 1.7; }
.hero__subtitle { color: var(--text-secondary); font-size: 18px; margin-block-end: var(--space-24); }
```

- [ ] **Step 2: Tjek browser igen**

Expected: H1/H2/H3 nu med Sen-font, body med Mulish.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add typography scale with Sen + Mulish"
```

---

### Task 2.3: Layout helpers, skip-link, utilities

**Files:**
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Layout + utilities**

```css
/* ====================================================================
   03. Layout helpers
   ==================================================================== */
.container {
  max-width: var(--content-width);
  margin-inline: auto;
  padding-inline: var(--space-24);
}

.grid { display: grid; gap: var(--space-32); }
.grid--2col { grid-template-columns: 1fr 1fr; align-items: start; }
.grid--3col { grid-template-columns: repeat(3, 1fr); }
.grid--4col { grid-template-columns: repeat(4, 1fr); }
.grid--5col { grid-template-columns: repeat(5, 1fr); }

.stack { display: flex; flex-direction: column; gap: var(--space-16); }

/* ====================================================================
   04. Skip link
   ==================================================================== */
.skip-link {
  position: absolute;
  top: 0; left: 0;
  background: var(--accent);
  color: var(--text-on-accent);
  padding: var(--space-8) var(--space-16);
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform 0.2s;
  z-index: 1000;
  font-weight: 700;
}
.skip-link:focus { transform: translateY(0); }

/* ====================================================================
   21. Utilities
   ==================================================================== */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

[hidden] { display: none !important; }
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add layout helpers, skip-link and utilities"
```

---

## Phase 3: Components (Lag 3)

**Mål:** Alle 20 komponenter har CSS. `design-system.html` kan åbnes og viser hver komponent korrekt.

### Task 3.1: Buttons

**Files:**
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Skriv button-blok**

```css
/* ====================================================================
   05. Buttons
   ==================================================================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  padding: 14px 32px;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
  border-radius: var(--radius-btn);
  border: 1.5px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  min-height: 48px; /* WCAG 2.5.8 touch target */
  white-space: nowrap;
}

.btn:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Primary — orange fyld, mørk tekst */
.btn--primary {
  background: var(--accent);
  color: var(--text-on-accent);
}
.btn--primary:hover {
  background: var(--accent-hover);
  color: var(--white);
  text-decoration: none;
}

/* Secondary — outline, lys surface */
.btn--secondary {
  background: transparent;
  color: var(--text-dark);
  border-color: var(--border-light);
}
.btn--secondary:hover {
  border-color: var(--accent);
  color: var(--accent-text-on-light);
  text-decoration: none;
}

/* Secondary på mørk surface (hero) */
.btn--secondary.btn--on-dark {
  color: var(--text-primary);
  border-color: var(--border-light-figma);
}
.btn--secondary.btn--on-dark:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Ghost accent — orange outline + orange tekst */
.btn--ghost {
  background: transparent;
  color: var(--accent-text-on-light);
  border-color: var(--accent);
}
.btn--ghost:hover {
  background: var(--accent);
  color: var(--text-on-accent);
  text-decoration: none;
}

/* Phone CTA — mørk pill brugt i orange CTA-band */
.btn--phone {
  background: var(--bg-dark);
  color: var(--text-primary);
}
.btn--phone:hover {
  background: var(--text-dark);
}

/* MitID — sort */
.btn--mitid {
  background: #000;
  color: #fff;
  width: 100%;
}
.btn--mitid:hover { background: #222; }
.mitid-logo {
  background: #fff;
  color: #000;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 800;
}
```

- [ ] **Step 2: Åbn `design-system.html` → tjek sektion 01 Buttons**

Expected: alle 4 button-varianter vises korrekt.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add button component (primary, secondary, ghost, phone, mitid)"
```

---

### Task 3.2: Navigation (desktop + mobile)

**Files:**
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Navigation CSS**

```css
/* ====================================================================
   06. Navigation
   ==================================================================== */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-dark);
  height: var(--nav-height);
  color: var(--text-primary);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: var(--space-24);
}

.nav__logo {
  color: var(--accent);
  font-family: 'Sen', sans-serif;
  font-weight: 800;
  font-size: 18px;
  text-decoration: none;
}
.nav__logo:hover { text-decoration: none; color: var(--accent); }

.nav__links ul {
  display: flex;
  align-items: center;
  gap: var(--space-24);
  margin: 0;
}

.nav__link {
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: 'Mulish', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: var(--space-8) var(--space-16);
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.nav__link:hover { color: var(--accent); text-decoration: none; }

.nav__link[aria-current="page"] {
  color: var(--accent);
  font-weight: 700;
}

.nav__item--dropdown { position: relative; }

.nav__chevron { font-size: 12px; }

.nav__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: var(--white);
  color: var(--text-dark);
  min-width: 240px;
  padding: var(--space-8) 0;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border-light-figma);
}
.nav__dropdown ul { display: flex; flex-direction: column; gap: 0; }
.nav__dropdown a {
  display: block;
  padding: var(--space-8) var(--space-16);
  color: var(--text-dark);
  text-decoration: none;
}
.nav__dropdown a:hover { background: var(--bg-light); color: var(--accent-text-on-light); text-decoration: none; }

.nav__ctas {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}
.nav__ctas .btn { padding: 8px 20px; min-height: 40px; font-size: 14px; }

.nav__burger { display: none; }

/* Mobil-overlay */
.nav__mobile {
  position: fixed;
  inset: 0;
  background: var(--white);
  color: var(--text-dark);
  z-index: 200;
  padding: var(--space-48) var(--space-24);
  display: flex;
  flex-direction: column;
  gap: var(--space-24);
  overflow-y: auto;
}
.nav__close {
  position: absolute;
  top: var(--space-16);
  right: var(--space-16);
  font-size: 24px;
  width: 44px;
  height: 44px;
}
.nav__mobile nav ul { display: flex; flex-direction: column; gap: var(--space-16); }
.nav__mobile a, .nav__mobile-toggle {
  display: block;
  font-size: 24px;
  font-family: 'Sen', sans-serif;
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
  padding: var(--space-8) 0;
}
.nav__mobile-toggle {
  background: none;
  border: none;
  text-align: left;
  width: 100%;
}
.nav__mobile-toggle[aria-expanded="true"] + ul { display: block; }
.nav__mobile-toggle[aria-expanded="false"] + ul { display: none; }
.nav__mobile-toggle + ul {
  padding-left: var(--space-24);
  font-size: 18px;
}
.nav__mobile-toggle + ul a { font-size: 18px; }
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add navigation desktop + mobile overlay"
```

---

### Task 3.3: Footer

**Files:**
- Modify: `css/styles.css` (append)

- [ ] **Step 1: Footer CSS**

```css
/* ====================================================================
   07. Footer
   ==================================================================== */
.footer {
  background: var(--bg-dark);
  color: var(--text-primary);
  padding: var(--space-64) 0 var(--space-24);
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-32);
  margin-block-end: var(--space-48);
}

.footer__heading {
  font-family: 'Sen', sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  margin-block-end: var(--space-16);
}

.footer__col ul { display: flex; flex-direction: column; gap: var(--space-8); }
.footer__col a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
}
.footer__col a:hover { color: var(--accent); }

.footer__col address {
  font-style: normal;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.footer .hours {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer .hours li {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 14px;
}

.footer__bar {
  border-top: 1px solid var(--border-dark);
  padding-block-start: var(--space-24);
}
.footer__bar p {
  color: var(--text-secondary);
  font-size: 13px;
  margin: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add footer component with 4-col grid"
```

---

### Task 3.4: Cards (treatment + testimonial)

- [ ] **Step 1: Card CSS**

```css
/* ====================================================================
   08. Cards
   ==================================================================== */
.card {
  background: var(--white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.card--treatment .card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card--treatment .card__body { padding: var(--space-24); }
.card--treatment .card__title { margin-block: var(--space-8); }
.card--treatment .card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--accent-text-on-light);
  font-weight: 700;
  margin-block-start: var(--space-16);
}
.card--treatment .card__link:hover { gap: 8px; transition: gap 0.2s; text-decoration: underline; }

.card--testimonial {
  padding: var(--space-24);
  background: var(--bg-light);
}
.card--testimonial .card__stars {
  color: var(--star-on-light);
  font-size: 18px;
  margin-block-end: var(--space-8);
}
.card--testimonial blockquote {
  font-style: italic;
  margin-block-end: var(--space-16);
}
.card--testimonial figcaption {
  display: flex;
  flex-direction: column;
}
.card--testimonial figcaption strong { font-weight: 700; }
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add treatment + testimonial cards"
```

---

### Task 3.5: Form fields, checkbox, radio

- [ ] **Step 1: Form CSS**

```css
/* ====================================================================
   09. Form fields + checkbox + radio
   ==================================================================== */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-block-end: var(--space-24);
}

.field__label, .field label {
  font-weight: 700;
  font-size: 14px;
}

.field__input, .field input, .field textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background: var(--white);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-card);
  min-height: 48px;
  transition: border-color 0.2s;
}

.field input:focus, .field textarea:focus {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-color: var(--accent);
}

.field input:not(:placeholder-shown):not(:focus) {
  border-color: var(--text-dark);
}

.field__help {
  color: var(--text-secondary);
  font-size: 14px;
}

.field--error input,
.field--error textarea {
  border-color: #B00020;
}
.field__error {
  color: #B00020;
  font-size: 14px;
  font-weight: 700;
}

.field__info-trigger {
  text-align: left;
  color: var(--accent-text-on-light);
  text-decoration: underline;
  font-size: 14px;
  padding: 4px 0;
}

/* Checkbox */
.checkbox {
  display: flex;
  align-items: flex-start;
  gap: var(--space-8);
  cursor: pointer;
  margin-block-end: var(--space-16);
  font-size: 16px;
}
.checkbox input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.checkbox__mark {
  width: 24px; height: 24px;
  flex-shrink: 0;
  border: 1.5px solid var(--border-light);
  border-radius: 4px;
  background: var(--white);
  position: relative;
  transition: background 0.2s, border-color 0.2s;
}
.checkbox input:focus-visible + .checkbox__mark {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
.checkbox input:checked + .checkbox__mark {
  background: var(--accent);
  border-color: var(--accent);
}
.checkbox input:checked + .checkbox__mark::after {
  content: "✓";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-accent);
  font-weight: 800;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add form fields, checkbox, error state"
```

---

### Task 3.6: Stepper

- [ ] **Step 1: Stepper CSS**

```css
/* ====================================================================
   10. Stepper
   ==================================================================== */
.stepper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-block-end: var(--space-32);
  list-style: none;
  padding: 0;
  position: relative;
}

.stepper__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  flex: 1;
  position: relative;
  text-align: center;
}

/* Forbinder-linje */
.stepper__step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 14px; /* halv højde af circle */
  left: calc(50% + 14px);
  width: calc(100% - 28px);
  height: 2px;
  background: var(--border-light-figma);
}

.stepper__circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  background: var(--white);
  border: 1.5px solid var(--border-light);
  color: var(--text-secondary);
}

.stepper__step--done .stepper__circle {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}
.stepper__step--done::after { background: var(--accent); }

.stepper__step--active .stepper__circle {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}

.stepper__label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
}
.stepper__step--active .stepper__label,
.stepper__step--done .stepper__label {
  color: var(--text-dark);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add stepper component"
```

---

### Task 3.7: Accordion (details/summary)

- [ ] **Step 1: Accordion CSS**

```css
/* ====================================================================
   11. Accordion
   ==================================================================== */
.accordion__item {
  border-bottom: 1px solid var(--border-light);
  padding: var(--space-16) 0;
}

.accordion__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Sen', sans-serif;
  font-weight: 700;
  font-size: 18px;
  list-style: none;
}
.accordion__head::-webkit-details-marker { display: none; }

.accordion__icon {
  font-size: 24px;
  color: var(--accent);
  transition: transform 0.2s;
}

.accordion__item[open] .accordion__icon { transform: rotate(45deg); }

.accordion__body { padding-block-start: var(--space-16); color: var(--text-dark); }

.accordion__item:focus-within {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add accordion using details/summary (no JS required)"
```

---

### Task 3.8: Modal / Popover

- [ ] **Step 1: Modal CSS**

```css
/* ====================================================================
   12. Modal / Popover
   ==================================================================== */
.modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-24);
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(28, 38, 48, 0.6);
  cursor: pointer;
}

.modal__card {
  position: relative;
  background: var(--white);
  border-radius: var(--radius-card);
  padding: var(--space-32);
  max-width: 560px;
  width: 100%;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.24);
  z-index: 1;
}

.modal__close {
  position: absolute;
  top: var(--space-16);
  right: var(--space-16);
  width: 44px;
  height: 44px;
  font-size: 20px;
  color: var(--text-secondary);
}
.modal__close:hover { color: var(--text-dark); }

.modal__card h2 { margin-block-end: var(--space-16); }
.modal__card ul {
  list-style: disc;
  padding-left: var(--space-24);
  margin-block-end: var(--space-16);
}
.modal__card li { margin-block-end: var(--space-8); }
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add modal/popover with backdrop"
```

---

### Task 3.9: FAB, Badge, Pris Row, Step

- [ ] **Step 1: 4 mindre komponenter**

```css
/* ====================================================================
   13. FAB
   ==================================================================== */
.fab {
  position: fixed;
  bottom: var(--space-24);
  right: var(--space-24);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--text-on-accent);
  display: none; /* kun mobil */
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  z-index: 90;
}
.fab:hover { background: var(--accent-hover); color: var(--white); }

/* ====================================================================
   14. Badge
   ==================================================================== */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: var(--radius-btn);
  font-size: 13px;
  font-weight: 700;
  font-family: 'Mulish', sans-serif;
}
.badge--outline {
  background: transparent;
  color: var(--accent-text-on-light);
  border: 1.5px solid var(--accent);
}
.badge--filled {
  background: var(--accent);
  color: var(--text-on-accent);
}

/* ====================================================================
   15. Pris row
   ==================================================================== */
.pris-rows { display: flex; flex-direction: column; }
.pris-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-16) 0;
  border-bottom: 1px solid var(--border-light);
}
.pris-row:last-child { border-bottom: none; }
.pris-row span:last-child { font-weight: 700; }

/* ====================================================================
   16. Step (timeline element)
   ==================================================================== */
.step-list { display: flex; flex-direction: column; gap: var(--space-24); list-style: none; padding: 0; }
.step-list--horizontal { flex-direction: row; gap: var(--space-32); }

.step {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  flex: 1;
}
.step__number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--text-on-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sen', sans-serif;
  font-weight: 800;
  font-size: 20px;
}

.dot-list { list-style: none; padding: 0; }
.dot-list li {
  padding-left: var(--space-24);
  position: relative;
  margin-block-end: var(--space-8);
}
.dot-list li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 12px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add FAB, badge, pris-row, step components"
```

---

### Task 3.10: Booking-specifikke komponenter

- [ ] **Step 1: Consult-toggle + switch + calendar + symptom-grid**

```css
/* ====================================================================
   17. Booking-specific
   ==================================================================== */

/* Consult-toggle (radio cards) */
.consult-toggle {
  display: flex;
  gap: var(--space-16);
  border: none;
  padding: 0;
  margin-block-end: var(--space-24);
}
.consult-toggle > legend { width: 100%; margin-block-end: var(--space-16); }
.consult-toggle__option { flex: 1; cursor: pointer; }
.consult-toggle__option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.consult-toggle__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-24);
  background: var(--white);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-card);
  height: 100%;
  transition: border-color 0.2s, background 0.2s;
}
.consult-toggle__option input:checked + .consult-toggle__card {
  border-color: var(--accent);
  background: #FFF8F0;
}
.consult-toggle__option input:focus-visible + .consult-toggle__card {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
.consult-toggle__option--recommended .consult-toggle__card { border-color: var(--accent); }
.consult-toggle__card .pris { font-weight: 700; font-size: 20px; margin-block-start: auto; }

/* Inline (pill) variant til trin 3 */
.consult-toggle--inline { gap: var(--space-8); }
.consult-toggle__pill { display: inline-block; }
.consult-toggle__pill input { position: absolute; opacity: 0; pointer-events: none; }
.consult-toggle__pill span {
  display: inline-flex;
  padding: 8px 20px;
  border-radius: var(--radius-btn);
  border: 1.5px solid var(--border-light);
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  background: var(--white);
}
.consult-toggle__pill input:checked + span {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}

/* Switch (akut toggle) */
.switch {
  display: flex;
  align-items: center;
  gap: var(--space-16);
  cursor: pointer;
  margin-block-end: var(--space-24);
}
.switch input { position: absolute; opacity: 0; pointer-events: none; }
.switch__track {
  width: 44px;
  height: 24px;
  background: var(--border-light);
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}
.switch__thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 20px; height: 20px;
  background: var(--white);
  border-radius: 50%;
  transition: transform 0.2s;
}
.switch input:checked + .switch__track { background: var(--accent); }
.switch input:checked + .switch__track .switch__thumb { transform: translateX(20px); }
.switch input:focus-visible + .switch__track {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Calendar */
.calendar { margin-block-end: var(--space-24); }
.calendar__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: var(--space-16);
}
.calendar__nav button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 20px;
}
.calendar__nav button:hover { background: var(--bg-light); }
.calendar__nav h2 { margin: 0; font-size: 20px; }

.calendar__grid {
  width: 100%;
  border-collapse: collapse;
}
.calendar__grid th {
  padding: var(--space-8);
  font-weight: 700;
  color: var(--text-secondary);
  font-size: 13px;
  text-align: center;
}
.calendar__grid td { padding: 2px; text-align: center; }

.date-cell {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-weight: 500;
}
.date-cell:hover:not(:disabled) { background: var(--bg-light); }
.date-cell--selected,
.date-cell[aria-pressed="true"] {
  background: var(--accent);
  color: var(--text-on-accent);
  font-weight: 700;
}
.date-cell:disabled,
.date-cell[aria-disabled="true"] {
  color: var(--text-secondary);
  opacity: 0.4;
  cursor: not-allowed;
}

/* Time slots */
.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin-block-end: var(--space-16);
}
.time-slot {
  padding: 10px 20px;
  border-radius: var(--radius-btn);
  border: 1.5px solid var(--border-light);
  font-weight: 700;
  background: var(--white);
  min-height: 44px;
  min-width: 44px;
}
.time-slot:hover { border-color: var(--accent); }
.time-slot--selected,
.time-slot[aria-pressed="true"] {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}

.booking-summary {
  padding: var(--space-16);
  background: var(--bg-light);
  border-radius: var(--radius-card);
  margin-block-end: var(--space-24);
}

/* Symptom grid */
.symptom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-16);
  border: none;
  padding: 0;
  margin-block-end: var(--space-24);
}
.symptom-grid__option { cursor: pointer; }
.symptom-grid__option input { position: absolute; opacity: 0; pointer-events: none; }
.symptom-grid__option span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-24) var(--space-16);
  background: var(--white);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-card);
  text-align: center;
  font-weight: 700;
  min-height: 80px;
  transition: border-color 0.2s, background 0.2s;
}
.symptom-grid__option input:checked + span {
  border-color: var(--accent);
  background: #FFF8F0;
}
.symptom-grid__option input:focus-visible + span {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
.symptom-sub {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-block-start: var(--space-16);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-card);
  padding: var(--space-16);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add booking-specific components (consult-toggle, switch, calendar, symptom-grid)"
```

---

### Task 3.11: Design-system showcase styles

- [ ] **Step 1: DS-specifik styling**

```css
/* ====================================================================
   20. Design-system showcase
   ==================================================================== */
.ds-section { border-bottom: 1px solid var(--border-light); }
.ds-section--dark { background: var(--bg-dark); color: var(--text-primary); }
.ds-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  margin-block-end: var(--space-32);
}
.ds-row h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ds-preview {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-24);
  align-items: center;
  padding: var(--space-24);
  background: var(--bg-light);
  border-radius: var(--radius-card);
}
.ds-preview--stacked { flex-direction: column; align-items: stretch; }
.ds-section--dark .ds-preview { background: var(--text-dark); }
.ds-row--dark .ds-preview { background: var(--bg-dark); }
```

- [ ] **Step 2: Åbn `design-system.html` — verificér alle sektioner viser komponenter korrekt**

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add design-system showcase layout"
```

---

## Phase 4: Page-specific styling (Lag 4)

**Mål:** Hver side-familie får dedikeret CSS-blok så sektioner ser ud som Figma.

### Task 4.1: Sections (hero, CTA-band, map-block, video-block)

- [ ] **Step 1: Generelle sektion-styles**

```css
/* ====================================================================
   18. Sections (hero, CTA-band, map-block, video-block, cross-links)
   ==================================================================== */

/* Hero section — bruger photo bg når .section--hero på .section--dark */
.section--hero {
  background-color: var(--bg-photo);
  background-image: linear-gradient(rgba(28, 12, 6, 0.6), rgba(28, 12, 6, 0.6));
  background-size: cover;
  background-position: center;
  padding-block: var(--space-64);
}
.section--hero h1 { max-width: 720px; }
.section--hero .hero__lead { max-width: 600px; }
.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-16);
  margin-block: var(--space-24);
}
.hero__rating {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8) var(--space-16);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-btn);
  color: var(--text-primary);
  font-weight: 700;
}

/* CTA-band */
.cta-band {
  text-align: center;
  padding-block: var(--space-32);
}
.cta-band h2 { margin-block-end: var(--space-8); color: var(--text-on-accent); }
.cta-band p { margin-block-end: var(--space-24); }

/* Map-block */
.map-block img {
  width: 100%;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

/* Video-block */
.video-block {
  position: relative;
  background: var(--bg-dark);
  border-radius: var(--radius-card);
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.video-block img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
.video-block__play {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--text-on-accent);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-block__play:hover { background: var(--accent-hover); color: var(--white); }
.video-block--centered { max-width: 800px; margin-inline: auto; }

/* Cross-links (behandlinger andre-grid) */
.cross-links { gap: var(--space-16); }
.cross-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-24);
  background: var(--white);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-card);
  font-weight: 700;
  text-align: center;
  color: var(--text-dark);
  min-height: 80px;
}
.cross-link:hover {
  border-color: var(--accent);
  color: var(--accent-text-on-light);
  text-decoration: none;
}

/* Symptom list (behandlinger) */
.symptom-list { padding-left: var(--space-24); list-style: disc; }
.symptom-list li { margin-block-end: var(--space-8); }

/* Hours (footer + find os) */
.hours { display: flex; flex-direction: column; gap: 4px; }
.hours li { display: flex; justify-content: space-between; }
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add section styles (hero, CTA-band, map-block, video-block)"
```

---

### Task 4.2: Booking-flow layout (.flow-page, .flow-card)

- [ ] **Step 1: Flow-layout CSS**

```css
/* ====================================================================
   19. Pages — Booking + EK flow layout
   ==================================================================== */
.flow-page { background: var(--bg-light); min-height: 100vh; }

.flow-main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--space-48) var(--space-24);
}

.flow-card {
  background: var(--white);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  padding: var(--space-48) var(--space-48) var(--space-32);
  max-width: 800px;
  width: 100%;
}

.flow-card--narrow { max-width: 560px; }

.flow-card h1 { margin-block-end: var(--space-16); }

.flow-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-16);
  margin-block-start: var(--space-32);
  padding-block-start: var(--space-24);
  border-top: 1px solid var(--border-light);
}
.flow-card__actions .btn { flex-shrink: 0; }

.flow-card__phone-fallback {
  margin-block-start: var(--space-32);
  padding-block-start: var(--space-24);
  border-top: 1px solid var(--border-light);
  text-align: center;
}
.flow-card__phone-fallback p {
  color: var(--text-secondary);
  margin-block-end: var(--space-8);
}

/* Min tilgang-card (trin 1) */
.min-tilgang-card {
  display: flex;
  gap: var(--space-16);
  padding: var(--space-16);
  background: var(--bg-light);
  border-radius: var(--radius-card);
  margin-block-end: var(--space-32);
}
.min-tilgang-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  flex-shrink: 0;
  object-fit: cover;
}

/* Confirmation summary (trin 5 + bekraeft) */
.confirmation-title {
  color: var(--accent);
}

.confirmation-summary {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-8) var(--space-16);
  padding: var(--space-24);
  background: var(--bg-light);
  border-radius: var(--radius-card);
  margin-block-end: var(--space-24);
}
.confirmation-summary dt { font-weight: 700; color: var(--text-secondary); }
.confirmation-summary dd { font-weight: 500; }

/* Info callout (klient/bekraeft) */
.info-callout {
  padding: var(--space-16);
  background: #FFF8F0;
  border-left: 4px solid var(--accent);
  border-radius: 4px;
  margin-block-end: var(--space-24);
}

/* Divider med "eller" (login) */
.divider {
  display: flex;
  align-items: center;
  gap: var(--space-16);
  margin-block: var(--space-24);
  color: var(--text-secondary);
  font-size: 14px;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-light);
}

.link-subtle {
  color: var(--text-secondary);
  text-decoration: underline;
  font-size: 14px;
}
.link-row { text-align: center; margin-block-start: var(--space-24); }
```

- [ ] **Step 2: Åbn `booking/trin-1.html` og `klient/login.html` i browser**

Expected: modal-card centreret med korrekt padding, stepper synlig øverst, phone-fallback nederst.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add booking + EK flow layout"
```

---

## Phase 5: SVG placeholders + responsive + polish

### Task 5.1: Generér 15 SVG-placeholders

**Files:**
- Create: 15 `.svg` filer i `images/`

- [ ] **Step 1: Skriv et Python-script til at generere placeholders**

```bash
python3 <<'PY'
images = [
  ("hero-bg.svg",          1440, 720, "#1C0C06", "#E06820", "Foto: behandlingssituation"),
  ("nikolai-hero.svg",     700, 800,  "#17212E", "#F4EEE8", "Portrait: Nicolai Grocott"),
  ("nikolai-tilgang.svg",  172, 172,  "#F8F4EE", "#1C2630", "Foto: Nicolai"),
  ("rygsmerter-hero.svg",  1440, 720, "#1C0C06", "#E06820", "Foto: rygbehandling"),
  ("skulder-hero.svg",     1440, 720, "#1C0C06", "#E06820", "Foto: skulderbehandling"),
  ("kaebe-hero.svg",       1440, 720, "#1C0C06", "#E06820", "Foto: kæbebehandling"),
  ("knae-hero.svg",        1440, 720, "#1C0C06", "#E06820", "Foto: knæbehandling"),
  ("fod-hero.svg",         1440, 720, "#1C0C06", "#E06820", "Foto: fodbehandling"),
  ("massage-hero.svg",     1440, 720, "#1C0C06", "#E06820", "Foto: massage"),
  ("card-rygsmerter.svg",  320, 180,  "#17212E", "#E06820", "Card: rygsmerter"),
  ("card-skulder.svg",     320, 180,  "#17212E", "#E06820", "Card: skulder"),
  ("card-hoved.svg",       320, 180,  "#17212E", "#E06820", "Card: hoved"),
  ("card-knae.svg",        320, 180,  "#17212E", "#E06820", "Card: knæ"),
  ("video-thumbnail.svg",  1280, 720, "#17212E", "#F4EEE8", "Video: Nicolai fortæller"),
  ("map-placeholder.svg",  720, 400,  "#F8F4EE", "#1C2630", "Kort: Langeskov Centret"),
]
for fname, w, h, bg, fg, label in images:
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{label}">
  <rect width="{w}" height="{h}" fill="{bg}"/>
  <text x="50%" y="50%" font-family="Mulish, sans-serif" font-size="{max(16, h//20)}" font-weight="700" fill="{fg}" text-anchor="middle" dominant-baseline="middle">{label}</text>
  <text x="50%" y="{h - h//12}" font-family="Mulish, sans-serif" font-size="{max(12, h//40)}" fill="{fg}" text-anchor="middle" opacity="0.5">{w}×{h} placeholder</text>
</svg>
'''
    with open(f"images/{fname}", "w") as f:
        f.write(svg)
    print(f"✓ images/{fname}")
PY
```

- [ ] **Step 2: Verificér**

```bash
ls -la images/*.svg | wc -l
```

Expected: 15

- [ ] **Step 3: Åbn `index.html` og scroll gennem siden — alle billeder skal vise placeholder-tekst**

- [ ] **Step 4: Commit**

```bash
git add images/*.svg
git commit -m "feat(images): generate 15 SVG placeholders for all image slots"
```

---

### Task 5.2: Mobile media queries

- [ ] **Step 1: Skriv mobile breakpoint-styles**

```css
/* ====================================================================
   22. Media queries
   ==================================================================== */
@media (max-width: 1023.98px) {
  /* Tablet: 4-col → 2-col */
  .grid--4col { grid-template-columns: repeat(2, 1fr); }
  .grid--5col { grid-template-columns: repeat(3, 1fr); }
  .footer__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767.98px) {
  /* Mobil typografi */
  h1 { font-size: 30px; line-height: 1.3; }
  h2 { font-size: 26px; }
  h3 { font-size: 20px; line-height: 1.4; }
  body { font-size: 16px; line-height: 1.6; }
  .hero__lead { font-size: 18px; }

  /* Nav: hamburger overtager */
  .nav__links, .nav__ctas { display: none; }
  .nav__burger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 44px;
    height: 44px;
    padding: 8px;
  }
  .nav__burger span {
    display: block;
    height: 2px;
    background: var(--text-primary);
    transition: transform 0.2s;
  }

  /* Sektion-padding mindre */
  .section { padding: var(--space-48) 0; }
  .container { padding-inline: var(--space-16); }

  /* Alle grids stack til 1 kolonne */
  .grid--2col, .grid--3col, .grid--4col, .grid--5col {
    grid-template-columns: 1fr;
  }
  .footer__grid { grid-template-columns: 1fr; gap: var(--space-32); }

  /* Stepper labels skjules på mobil */
  .stepper__label { display: none; }

  /* Booking flow-card padding reduceret */
  .flow-card { padding: var(--space-24); }
  .flow-main { padding: var(--space-16); }

  /* Symptom grid: 2 kolonner på mobil */
  .symptom-grid { grid-template-columns: repeat(2, 1fr); }
  .symptom-sub { grid-template-columns: repeat(2, 1fr); }

  /* Consult-toggle stacker */
  .consult-toggle { flex-direction: column; }

  /* FAB synlig på mobil */
  .fab { display: flex; }

  /* Flow-actions stacker */
  .flow-card__actions { flex-direction: column-reverse; gap: var(--space-16); }
  .flow-card__actions .btn { width: 100%; }
}

@media (max-width: 479.98px) {
  /* Lille mobil */
  .symptom-grid { grid-template-columns: 1fr; }
  .calendar__grid th { font-size: 11px; padding: 4px; }
  .date-cell { width: 36px; height: 36px; font-size: 14px; }
}
```

- [ ] **Step 2: Test responsivt i Chrome DevTools — 1440, 768, 390, 320 px**

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style(css): add responsive media queries for tablet + mobile"
```

---

### Task 5.3: WCAG audit pr. side + fix-loop

- [ ] **Step 1: Kør Lighthouse Accessibility på hver side**

For hver af de 19 hovedsider:

```bash
# Eksempel — gentag for hver fil
open index.html
# DevTools → Lighthouse → Accessibility only → Generate report
```

For hver side: gem JSON eller screenshot i `docs/audits/lighthouse/<page>.png`. Target ≥ 95.

- [ ] **Step 2: Kør axe DevTools på 5 stikprøve-sider**

- `index.html`, `om-nikolai.html`, `behandlinger/rygsmerter.html`, `booking/trin-3.html`, `booking/trin-4.html`

For hver: gem screenshot i `docs/audits/axe/`.

- [ ] **Step 3: Fix-loop**

For hver fejl rapporteret af Lighthouse eller axe:
1. Identificér fejl-kategori (kontrast, manglende label, heading-hop, missing alt, ARIA-misbrug)
2. Fix i HTML eller CSS
3. Re-run audit
4. Commit fix

- [ ] **Step 4: Manuel keyboard-test pr. side**

For hver side: Tab fra start. Verificér at:
- Skip-link er første fokus
- Alle interaktive elementer kan nås
- Esc lukker dropdowns/modaler (når JS er implementeret — for nu kun struktur-check)
- Focus-ring er synlig overalt

- [ ] **Step 5: Commit audit-resultater**

```bash
git add docs/audits/
git commit -m "test(a11y): add Lighthouse + axe audit screenshots"
```

---

## Phase 6: JS skeleton + dokumentation

### Task 6.1: `js/main.js` med 13 TODO-blokke

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Skriv komplet skeleton**

```javascript
/* ============================================================
   Grocott Fysioterapi & Sundhedshus — Interaktivitet
   Caroline Amundsen · UCL Multimediedesigner · 2026
   
   STATUS: Tom skeleton. Hver TODO-blok skal implementeres
   som del af eksamensaflevering.
   ============================================================ */


/* ============================================================
   01. UTILS — fælles hjælpefunktioner
   ============================================================ */

/**
 * Kør callback når DOM er klar.
 * Brug: ready(() => { ... din kode ... })
 */
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

/** Shortcut til querySelectorAll som array */
function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/** Shortcut til querySelector */
function $(selector, scope = document) {
  return scope.querySelector(selector);
}


/* ============================================================
   02. NAVIGATION — dropdown + burger menu
   ============================================================ */
/*
 * Dropdowns:
 *   .nav__item--dropdown > .nav__link (button med aria-expanded)
 *   + .nav__dropdown (hidden indtil åbnet)
 *
 * KRAV:
 *  - Klik (eller hover på desktop) → toggle aria-expanded + hidden
 *  - Esc lukker
 *  - Klik udenfor lukker
 *  - Mørk overlay på siden bag (body.has-open-dropdown)
 *  - Touch-friendly: klik virker på alle devices, hover er bonus
 *
 * SELECTORER:
 *   $$('.nav__item--dropdown > .nav__link')
 *   $$('.nav__dropdown')
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function navDropdown() { ... }


/*
 * Burger menu (mobil):
 *   .nav__burger (button med aria-expanded + aria-controls)
 *   #mobile-nav (hidden indtil åbnet)
 *
 * KRAV:
 *  - Klik → toggle aria-expanded + hidden på #mobile-nav
 *  - body får class .has-open-menu (overflow:hidden i CSS)
 *  - Esc lukker + returnerer fokus til burger
 *  - Klik på .nav__close eller på et nav-link → lukker
 *  - Fokus-fælde: Tab cykler kun inden for #mobile-nav når åben
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function mobileBurger() { ... }


/* ============================================================
   03. ACCORDION (optional enhancement)
   ============================================================ */
/*
 * <details>/<summary> virker out-of-the-box. Optional enhancement:
 * sørg for kun ÉT accordion-item er åbent ad gangen.
 *
 * SELECTORER:
 *   $$('.accordion .accordion__item')
 *
 * IMPLEMENTÉR HER (valgfrit):
 */
// TODO: function accordionOnlyOne() { ... }


/* ============================================================
   04. BOOKING — STATE (sessionStorage helpers)
   ============================================================ */
/*
 * Schema (key: 'grocott-booking'):
 * {
 *   consultationLength: '30' | '60',
 *   symptom: 'rygsmerter' | 'skulder-nakke' | 'kaebe-hoved' |
 *            'knae-hofter' | 'fod' | 'massage',
 *   subCategory: 'indlaegssaaler' | 'sandaler' | 'generelt' | null,
 *   acute: boolean,
 *   date: 'YYYY-MM-DD',
 *   time: 'HH:mm',
 *   name: string,
 *   email: string,
 *   phone: string,
 *   notes: string,
 *   sygesikring: boolean,
 *   gdpr: boolean
 * }
 */
const BOOKING_KEY = 'grocott-booking';

// TODO: function getBookingState() — return {} hvis intet er gemt
// TODO: function updateBookingState(partial) — merge ind i state
// TODO: function clearBookingState() — kald ved succes


/* ============================================================
   05. STEPPER — auto-detect current page
   ============================================================ */
/*
 * Sti-detection: hvilken stepper-step er active?
 *
 * window.location.pathname indeholder fx:
 *   /booking/trin-3.html → step 3 er active, 1-2 done
 *   /klient/kalender.html → step 3 (Tid) active, Login+Vælg done
 *
 * KRAV:
 *  - Find aktivt step ud fra URL
 *  - Markér tidligere steps med class stepper__step--done + ✓ ikon
 *  - Aktivt step beholder stepper__step--active
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function renderStepper() { ... }


/* ============================================================
   06. BOOKING TRIN 1 + 3 — consult-toggle persist
   ============================================================ */
/*
 * Native radio-knapper håndterer state, men vi skal persiste valget
 * til sessionStorage så trin 3+5 kan læse værdien.
 *
 * SELECTORER:
 *   $$('input[name="length"]')  (begge varianter: kort + pill)
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function consultToggle() { ... }


/* ============================================================
   07. BOOKING TRIN 2 — symptom-grid + conditional sub
   ============================================================ */
/*
 * Når 'fod' vælges: vis .symptom-sub.
 * Når andet vælges: hide.
 * Vis også .info-card med tekst om valgt behandling.
 *
 * SELECTORER:
 *   $$('input[name="symptom"]')
 *   $('.symptom-sub')
 *   $('.info-card')
 *
 * INFO-DATA (mock — kan ligge inline i denne funktion):
 *   const INFO = {
 *     rygsmerter: { title: 'Rygsmerter', desc: 'Jeg finder årsagen...', link: '../behandlinger/rygsmerter.html' },
 *     ...
 *   };
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function symptomGrid() { ... }


/* ============================================================
   08. BOOKING TRIN 3 — kalender render + dato/tid
   ============================================================ */
/*
 * SVÆRESTE OPGAVE. Detaljeret plan:
 *
 * 1) Render kalender for valgt måned (start: Maj 2026)
 *    - Find første dag i månedens uge (man = 0 ... søn = 6)
 *    - Generer 42 celler (6 uger × 7 dage)
 *    - Disable: weekend (lør/søn) + fortid + dato udenfor måned
 *
 * 2) Klik på dato → marker selected (aria-pressed), unmark andre
 *    - Persist til sessionStorage som ISO YYYY-MM-DD
 *    - Update "Ledige tider"-overskrift
 *    - Update time-slots-listen
 *
 * 3) Klik på time-slot → marker, persist
 *
 * 4) Akut-switch (checkbox) → persist, vis +300 kr. tekst
 *
 * 5) Opsummerings-bar (aria-live="polite") opdateres ved hver ændring
 *    Format: "Tir 5. maj · 10:00 · 60 min · 650 kr."
 *
 * MOCK-DATA (hardkod inde i funktion):
 *   const SLOTS_BY_DATE = {
 *     '2026-05-05': ['09:00', '10:00', '13:00', '14:30', '16:00'],
 *     '2026-05-06': ['09:00', '11:00', '15:00'],
 *     // ...
 *   };
 *
 * SELECTORER:
 *   $('.calendar__grid tbody')   ← render datoer her
 *   $('.calendar__nav h2')        ← månedsnavn
 *   $('.calendar__nav button')[0/1] ← prev/næste
 *   $$('.date-cell')
 *   $('.time-slots')              ← render slots her
 *   $$('.time-slot')
 *   $('.switch input[name="akut"]')
 *   $('.booking-summary')
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function renderCalendar(year, month) { ... }
// TODO: function selectDate(isoString) { ... }
// TODO: function selectTime(timeString) { ... }
// TODO: function updateBookingSummary() { ... }


/* ============================================================
   09. BOOKING TRIN 4 — form validation (ud over native)
   ============================================================ */
/*
 * Native HTML5-validering kører automatisk pga. required/type/pattern.
 * Extra-krav (skriv selv):
 *  - Bedre fejlmeddelelser end browserens default (vis under feltet)
 *  - aria-invalid="true" + role="alert" på fejl
 *  - CPR-validering: 6 cifre + valgfri streg + 4 cifre
 *  - Phone: dansk format (+45 XX XX XX XX eller 8 cifre)
 *  - Ved submit: e.preventDefault(), valider, persist alt til sessionStorage,
 *    navigér til trin-5.html
 *
 * SELECTORER:
 *   $('form')
 *   $$('.field input, .field textarea')
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function formValidation() { ... }


/* ============================================================
   10. MODAL — CPR Info popover
   ============================================================ */
/*
 * KRAV:
 *  - Klik på .field__info-trigger → vis modal (#cpr-modal)
 *  - Modal får fokus (focus til .modal__close)
 *  - Tab cykler inden for modal (fokus-fælde)
 *  - Esc lukker
 *  - Klik på .modal__backdrop eller [data-close] lukker
 *  - Fokus returneres til trigger-knappen ved luk
 *  - Trigger får aria-expanded toggled
 *
 * SELECTORER:
 *   $('.field__info-trigger')
 *   $('#cpr-modal')
 *   $('.modal__close', $('#cpr-modal'))
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function cprModal() { ... }


/* ============================================================
   11. BOOKING TRIN 5 — render confirmation fra sessionStorage
   ============================================================ */
/*
 * Læs hele state, render fyldte værdier i confirmation-summary.
 * Hvis state er tom (bruger gik direkte til trin-5.html), vis fejl
 * eller redirect til trin-1.html.
 *
 * SELECTORER:
 *   $('.confirmation-summary dd')
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function renderConfirmation() { ... }


/* ============================================================
   12. .ics CALENDAR FILE — "Tilføj til kalender"-knap
   ============================================================ */
/*
 * Generer en .ics-fil med booking-detaljer og trigger download.
 *
 * .ics format:
 * BEGIN:VCALENDAR
 * VERSION:2.0
 * PRODID:-//Grocott//Booking//DA
 * BEGIN:VEVENT
 * UID:<unique-id>@grocott.dk
 * DTSTAMP:20260520T100000Z
 * DTSTART:20260505T080000Z   (UTC, fra valgt dato+tid)
 * DTEND:20260505T090000Z
 * SUMMARY:Fysioterapi hos Grocott
 * LOCATION:Langeskov Centret 1\\, butik 3\\, 5550 Langeskov
 * DESCRIPTION:60 min konsultation hos Nicolai Grocott
 * END:VEVENT
 * END:VCALENDAR
 *
 * Trigger download:
 *   const blob = new Blob([icsString], { type: 'text/calendar' });
 *   const link = document.createElement('a');
 *   link.href = URL.createObjectURL(blob);
 *   link.download = 'grocott-booking.ics';
 *   link.click();
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function addToCalendar() { ... }


/* ============================================================
   13. EK-FLOW — mock login + pre-fyldte felter
   ============================================================ */
/*
 * Mock-bruger (hardkod):
 *   const MOCK_USER = {
 *     name: 'Caroline Amundsen',
 *     email: 'caroline@eksempel.dk',
 *     phone: '+45 12 34 56 78'
 *   };
 *
 * Login.html: ved klik på MitID-knap eller submit på e-mail-form
 *   → set sessionStorage 'grocott-user' = MOCK_USER
 *   → redirect til vaelg.html
 *
 * Bekraeft.html: læs 'grocott-user' og fyld confirmation-summary
 *
 * IMPLEMENTÉR HER:
 */
// TODO: function mockEKLogin() { ... }


/* ============================================================
   START — kør de relevante funktioner ved DOM klar
   ============================================================ */
ready(() => {
  // Naviger fungerer på alle sider
  // navDropdown();
  // mobileBurger();

  // Stepper auto-detect på flow-pages
  // if (document.body.classList.contains('flow-page')) renderStepper();

  // Side-specifik:
  // const path = window.location.pathname;
  // if (path.endsWith('trin-1.html'))       consultToggle();
  // if (path.endsWith('trin-2.html'))       symptomGrid();
  // if (path.endsWith('trin-3.html'))     { renderCalendar(2026, 4); consultToggle(); }
  // if (path.endsWith('trin-4.html'))     { formValidation(); cprModal(); }
  // if (path.endsWith('trin-5.html'))       renderConfirmation();
  // if (path.includes('/klient/'))          mockEKLogin();
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat(js): add main.js skeleton with 13 TODO blocks for student"
```

---

### Task 6.2: `README.md` projektbeskrivelse

**Files:**
- Create: `README.md`

- [ ] **Step 1: Skriv README**

```markdown
# Grocott Fysioterapi & Sundhedshus

Statisk hjemmeside for fysioterapeut-klinik i Langeskov.
Eksamensaflevering, UCL Multimediedesigner 2. semester, maj 2026.

**Studerende:** Caroline Amundsen

---

## Tech stack

- HTML5 (semantisk markup)
- CSS3 (custom properties, Flexbox, Grid)
- Vanilla JavaScript (skeleton — implementeres til eksamen)
- Google Fonts: Sen + Mulish
- SVG-placeholders

Ingen frameworks, ingen build tools, ingen npm-pakker.

---

## Sådan kører du sitet

### Lokalt
Åbn `index.html` direkte i din browser. Alt fungerer via `file://`.

### Deploy
- **Netlify:** drag-and-drop hele mappen til netlify.com/drop
- **GitHub Pages:** push til `main`, aktivér Pages, peg på root
- **Statisk server:** `python3 -m http.server 8000` fra repo-roden

---

## Filstruktur

```
/
├── index.html                  Forside
├── om-nikolai.html
├── design-system.html          Komponentbibliotek
├── behandlinger/               6 behandlings-sider
├── booking/                    5 trin booking-flow
├── klient/                     5 trin eksisterende-klient-flow
├── stubs/                      6 udskudte sider (under udvikling)
├── css/styles.css              Al styling
├── js/main.js                  JS-skeleton — implementér 13 TODO-blokke
├── images/                     SVG-placeholders
└── docs/                       Spec, plan, audits
```

---

## Designsystem

Se `design-system.html` for live komponentbibliotek (11 sektioner).

Tokens defineret i `css/styles.css` under `:root`:
- Farver (Figma vars + WCAG-fixede varianter)
- Typografi-skala (Sen 42/34/24, Mulish 18/13)
- Spacing (4/8/16/24/32/48/64)
- Radius (button 50px, card 8px)
- Shadow (Figma shadow/md)

---

## Accessibility statement

Sitet er bygget til at opfylde **WCAG 2.2 AA**.

**Dokumenterede afvigelser fra Figma (for at opfylde WCAG):**

| Token | Figma | Build | Begrundelse |
|---|---|---|---|
| `border-light` (UI) | #E2D8CC | #C5B8A8 | WCAG 1.4.11 (3:1) |
| `star` på lys bg | #E8960E | #C77B0A | WCAG 1.4.3 (4.5:1) |
| `accent` tekst på lys bg | bruges direkte | erstattes med `accent-hover` (#B84E10) | WCAG 1.4.3 |
| H1 størrelse | spec'en sagde 48px | 42px (Figma er sandhed) | Figma variable |
| CPR-felt | plain text | `type="password"` | Sundhedsdata-maskering |

Audit-resultater i `docs/audits/`.

---

## JS implementering (eksamen)

`js/main.js` er en tom skeleton med 13 TODO-blokke. For hver:
- Hver blok har DOM-selectorer, krav-beskrivelse og mock-data hvor relevant
- SessionStorage-schema er dokumenteret
- Estimeret arbejdsmængde: 11-14 timer

---

## Hosting og GDPR

CPR-feltet på booking trin 4 er `type="password"` (maskeret) og **sender ingen
data nogen steder** — dette er en demo-prototype. Ved produktion kræves:
- HTTPS
- Databehandleraftale med klinikken
- Krypteret journal-system
- Audit log

---

## Dokumentation

- **Design spec:** `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-05-20-grocott-fysioterapi-build.md`
- **Audit screenshots:** `docs/audits/`

---

## Licens

MIT — se `LICENSE`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with deploy guide, a11y statement, JS handoff"
```

---

### Task 6.3: Final verification

- [ ] **Step 1: Verificér Definition of Done**

```bash
echo "── HTML-filer ──"
find . -name "*.html" -not -path "./.git/*" -not -path "./node_modules/*" | wc -l
# Expected: 25

echo "── SVG-billeder ──"
ls images/*.svg | wc -l
# Expected: 15

echo "── CSS ──"
wc -l css/styles.css
# Expected: ~800-1200

echo "── JS skeleton ──"
grep -c "TODO" js/main.js
# Expected: ≥ 13

echo "── README ──"
test -f README.md && echo "✓ README.md exists"

echo "── Audits ──"
ls docs/audits/ 2>/dev/null
```

- [ ] **Step 2: Sidste smoke-test**

Åbn følgende sider og verificér visuelt at intet er brækket:
- `index.html`
- `om-nikolai.html`
- `design-system.html`
- `behandlinger/rygsmerter.html`
- `booking/trin-1.html`, `trin-3.html`, `trin-4.html`
- `klient/login.html`, `bekraeft.html`
- `stubs/erhvervsaftaler.html`

Test på 3 viewports: 1440, 768, 390 px.

- [ ] **Step 3: Final commit**

```bash
git add -A
git status
git commit -m "chore: final verification of MVP build" --allow-empty
git log --oneline
```

---

## Self-review checklist

**1. Spec coverage:**
- ✅ §3 Fil-arkitektur → Phase 0-1 (alle 25 filer)
- ✅ §4 Tokens → Task 2.1
- ✅ §5 Typografi → Task 2.2
- ✅ §6 20 komponenter → Phase 3
- ✅ §7 Side-anatomi → Phase 1 (skeletons) + Phase 4 (styling)
- ✅ §8 JS-skeleton → Task 6.1
- ✅ §9 WCAG-tjekliste → Task 5.3 + dokumenteres i README
- ✅ §10 Verifikation → Task 5.3 + Task 6.3

**2. Placeholder scan:** Ingen "TBD"/"TODO" i CSS/HTML — `// TODO` kun i `js/main.js` hvor det er TILSIGTET (studerendes opgave).

**3. Type consistency:**
- CSS-klassenavne identiske gennem alle tasks (`.btn--primary`, `.card--treatment`, `.flow-card` osv.)
- HTML-attributter konsistente (`aria-expanded`, `aria-current="page"`, `aria-pressed`)
- sessionStorage key konsistent (`grocott-booking`)
- sessionStorage schema-felter konsistente på tværs af trin

---

*Plan slut. Total: 6 phases, ~30 tasks, ~120 steps.*
