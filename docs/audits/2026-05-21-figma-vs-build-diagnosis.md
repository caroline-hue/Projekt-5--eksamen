# Figma Hi-Fi vs. Build — Komplet Afvigelses-rapport & Fix-plan

| Felt | Værdi |
|---|---|
| Dato | 2026-05-21 |
| Repo | `/Users/carolinekristiansen/Documents/Projekt-5--eksamen` |
| Worktree | `.claude/worktrees/thirsty-ramanujan-caa39e` |
| Branch | `claude/thirsty-ramanujan-caa39e` |
| Figma | https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual |
| Status | Build færdig, men 7 kritiske afvigelser fra Figma — kræver refactor |

---

## 🔑 Hovedårsag til afvigelserne

Byggeren tolkede spec-tekstens "section--hero som mørk baggrund" og lagde `--bg-dark` som nav-baggrund uden at validere mod Figma. Resultatet: **nav-baren, hero-sektioner og CTA-bandet er invertede farveroller** mod Figma's faktiske design.

**Tokens er korrekte.** Det er kun *placeringen* af tokens på sider der er fejl — så fix er primært CSS-ændringer (nav-rules, hero-rules, CTA-band-rules), ikke nye komponenter.

---

## 📋 Læs først: Det færdige build-state

```
/  (worktree-rod)
├── 25 HTML-filer  (index, om-nikolai, design-system, 6 behandlinger, 5 booking, 5 klient, 6 stubs)
├── css/styles.css  (1454 linjer, 23 sektioner)
├── js/main.js  (360 linjer, 19 TODO-blokke — studerendes opgave)
├── images/  (15 SVG-placeholders)
├── README.md
└── docs/superpowers/  (spec + plan)
```

22 commits eksisterer. Build er funktionelt komplet men visuelt **inverteret** fra Figma.

---

## 🚨 7 kritiske afvigelser (prioriteret)

### #1 Nav-baren: LIGHT i Figma, DARK i build

**Hvor påvirket:** ALLE 25 HTML-sider (delt chrome)

**Figma:**
- Background: `--bg-light` (#F8F4EE) — cream/off-white
- Logo: **orange ikon** (stiliseret figur) + "Grocott Fysioterapi & Sundhedshus" tekst
- Nav-links: `--text-dark` (#1C2630) på lys baggrund
- "Jeg er allerede klient" knap: lys pill med subtil bg (`#E8DDD0`-agtig) eller outlined med mørk border
- "Book første tid" knap: orange filled pill ✅ (matcher build)

**Build:**
- Background: `--bg-dark` (#17212E) ❌
- Logo: kun tekst, intet ikon ❌
- Nav-links: `--text-primary` (#F4EEE8) ❌
- "Jeg er allerede klient": `.btn--on-dark` modifier ❌

**Fix:**
```css
/* css/styles.css sektion 06. Navigation — overskriv: */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--bg-light);        /* WAS: var(--bg-dark) */
  height: var(--nav-height);
  color: var(--text-dark);            /* WAS: var(--text-primary) */
  border-bottom: 1px solid var(--border-light-figma);
}
.nav__logo {
  color: var(--text-dark);            /* WAS: var(--accent) */
  /* Logo-ikon kommer fra <img>/SVG, ikke fra font */
}
.nav__link {
  color: var(--text-dark);            /* WAS: var(--text-primary) */
}
.nav__link[aria-current="page"] {
  color: var(--accent-text-on-light); /* WAS: var(--accent) */
}
/* Burger på lys nav: */
.nav__burger span { background: var(--text-dark); }
```

**HTML-fix i nav-block (alle 25 filer):**
1. Tilføj orange logo-ikon SVG før logo-teksten
2. Fjern `.btn--on-dark` fra "Jeg er allerede klient" knap (den skal nu være `.btn--secondary` på lys bg)

```html
<a href="/" class="nav__logo" aria-label="Grocott Fysioterapi forside">
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="#E06820">
    <!-- Simpel orange figur-silhouet — placeholder indtil rigtig logo-SVG -->
    <circle cx="16" cy="9" r="4"/>
    <path d="M16 14c-4 0-7 3-7 7v6h14v-6c0-4-3-7-7-7z"/>
  </svg>
  <span class="nav__logo-text">Grocott Fysioterapi &amp; Sundhedshus</span>
</a>
```

```html
<!-- Change in all 25 files: -->
<a href="klient/login.html" class="btn btn--secondary">Jeg er allerede klient</a>
<!-- (drop btn--on-dark modifier) -->
```

---

### #2 Hero på `index.html`: forkert layout og farve

**Hvor påvirket:** `index.html` (kun forsiden — andre sider har deres egen hero-variant)

**Figma:**
- Background: `--bg-light` (LYS)
- Layout: **2-kolonne 50/50** — tekst venstre, foto-card højre
- Foto: rounded corners (`border-radius: var(--radius-card)`), fylder højre kolonne
- H1: dark tekst (`--text-dark`) på lys bg
- Eyebrow: ER IKKE en eyebrow — i Figma står logo-blokken øverst med ikon+tekst
- 2 CTAs: "Book første tid" (orange) + "Jeg er allerede klient" (outlined på lys)
- Rating "★ 4,9 på Google" som lille tekst under knapperne (ikke pill-badge)

**Build:**
- `.section--hero` har `--bg-photo` + linear-gradient overlay ❌
- Foto er background-image ❌
- Tekst-eyebrow "GROCOTT FYSIOTERAPI & SUNDHEDSHUS" ❌
- H1 hvid på mørk ❌
- Rating er pill-badge ❌

**Fix HTML (`index.html` section 1):**
```html
<section class="section section--hero-landing" aria-labelledby="hero-title">
  <div class="container grid grid--2col">
    <div class="hero__content">
      <h1 id="hero-title">Smerter, der holder dig fra det, du holder af?</h1>
      <p class="hero__lead">Jeg specialiserer mig i rygsmerter, nakkesmerter og skuldergener — og smerter du måske har levet med i årevis. Du får en grundig undersøgelse og en behandlingsplan til netop dig og dine behov.</p>
      <div class="hero__ctas">
        <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
        <a href="klient/login.html" class="btn btn--secondary">Jeg er allerede klient</a>
      </div>
      <p class="hero__rating">
        <span aria-hidden="true">⭐ 4,9 på Google</span>
        <span class="sr-only">4,9 ud af 5 stjerner</span>
      </p>
    </div>
    <div class="hero__image">
      <img src="images/hero-bg.svg" alt="Nicolai behandler en klient i klinikken">
    </div>
  </div>
</section>
```

**Fix CSS (erstat `.section--hero` blokken i sektion 18):**
```css
.section--hero-landing {
  background: var(--bg-light);
  color: var(--text-dark);
  padding-block: var(--space-64);
}
.section--hero-landing h1 { font-size: 48px; }  /* Figma er 42 men hero kan være større */
.section--hero-landing .hero__lead { max-width: 480px; }
.hero__ctas {
  display: flex; flex-wrap: wrap; gap: var(--space-16);
  margin-block: var(--space-24);
}
.hero__rating {
  display: flex; align-items: center; gap: var(--space-8);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 700;
}
.hero__image img {
  width: 100%;
  border-radius: var(--radius-card);
  object-fit: cover;
  aspect-ratio: 4 / 5;
}
```

---

### #3 "Usikker? Bare ring" CTA-band: orange → mørk med orange pill

**Hvor påvirket:** `index.html`, `om-nikolai.html`, alle 6 behandlinger (8 sider total)

**Figma:**
- Background: `--bg-dark` (#17212E)
- H2: hvid centreret tekst "Usikker? Bare ring."
- Subtitle: "Jeg svarer ofte selv på telefonen – også uden for åbningstid. Ring og spørg hvad som helst." (i `--text-secondary`)
- Phone-knap: **orange pill** med phone-ikon + "+45 60 86 67 70" (centreret)

**Build:**
- `.section--accent` — solid orange band ❌
- H2 mørk på orange ❌
- Phone-knap mørk pill ❌
- Subtitle text er anderledes ❌

**Fix HTML (alle 8 sider med denne sektion):**
```html
<section class="section section--cta-ring" aria-labelledby="ring-title">
  <div class="container cta-band">
    <h2 id="ring-title">Usikker? Bare ring.</h2>
    <p>Jeg svarer ofte selv på telefonen — også uden for åbningstid. Ring og spørg hvad som helst.</p>
    <a href="tel:+4560866770" class="btn btn--phone-accent" aria-label="Ring til Nicolai på +45 60 86 67 70">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"/>
      </svg>
      +45 60 86 67 70
    </a>
  </div>
</section>
```

**Fix CSS (erstat `.section--accent` med ny variant + ny knap-variant):**
```css
/* I sektion 01. Reset + base, erstat: */
.section--cta-ring {
  background: var(--bg-dark);
  color: var(--text-primary);
  text-align: center;
}

/* I sektion 05. Buttons, tilføj: */
.btn--phone-accent {
  background: var(--accent);
  color: var(--text-on-accent);
  font-size: 18px;
  padding: 16px 40px;
}
.btn--phone-accent:hover {
  background: var(--accent-hover);
  color: var(--white);
  text-decoration: none;
}

/* Behold .btn--phone (mørk pill) som backup — den bruges andre steder */

/* Fjern .section--accent fra HTML på alle 8 sider — erstat med .section--cta-ring */
```

---

### #4 Ekstra sektion på `index.html` — "Fra første besøg til færre smerter"

**Hvor påvirket:** `index.html` (kun)

**Figma:** Sektionen findes ikke på landing page. Den hører hjemme på behandlings-undersider hvor den giver mening (3-step pattern for et specifikt symptom).

**Fix:** Slet sektion 3 i `index.html`:
```html
<!-- DELETE this entire section: -->
<section class="section section--light" aria-labelledby="forloeb-title">
  <div class="container">
    <h2 id="forloeb-title">Fra første besøg til færre smerter</h2>
    <ol class="step-list step-list--horizontal">
      <!-- 3 steps -->
    </ol>
  </div>
</section>
```

---

### #5 Section 2 ("Mød din fysioterapeut") layout

**Hvor påvirket:** `index.html`

**Figma:**
- LIGHT bg
- 2-kolonne layout
- LEFT: dark video-card med play-knap
- RIGHT: tekst om Nicolai + "Min tilgang" card med foto + tekst + 3 punkter

**Build:**
- Layout matcher ca. — video-block left, content right ✅
- Men 3 punkter er rendret som `step-list` med orange tal-cirkler ❌ — i Figma er det 3 KORT med orange ikoner + titel + subtekst, ikke en step-pattern

**Fix HTML (erstat indholdet i højre kolonne):**
```html
<div class="moed-content">
  <h2 id="moed-title">Mød din fysioterapeut i Langeskov</h2>
  <p>Jeg hedder Nicolai Grocott. Jeg har specialiseret mig i kroniske smerter og idrætsfysioterapi.</p>
  
  <div class="grid grid--3col moed-cards">
    <div class="moed-card">
      <div class="moed-card__icon" aria-hidden="true">🎯</div>
      <h3>Tid til dig</h3>
      <p>Fuld konsultation, ikke samlebåndsbehandling.</p>
    </div>
    <div class="moed-card">
      <div class="moed-card__icon" aria-hidden="true">🔍</div>
      <h3>Behandlingsplan</h3>
      <p>Målrettet behandling med løbende justeringer.</p>
    </div>
    <div class="moed-card">
      <div class="moed-card__icon" aria-hidden="true">💪</div>
      <h3>Opfølgning</h3>
      <p>Du forlader ikke klinikken uden en plan for næste skridt.</p>
    </div>
  </div>
</div>
```

Tilføj CSS:
```css
.moed-cards { gap: var(--space-16); }
.moed-card {
  padding: var(--space-16);
  background: var(--white);
  border-radius: var(--radius-card);
  border: 1px solid var(--border-light-figma);
}
.moed-card__icon {
  font-size: 24px;
  color: var(--accent);
  margin-block-end: var(--space-8);
}
```

---

### #6 Behandlings-side "Kender du det her?" sektion

**Hvor påvirket:** Alle 6 behandlinger (rygsmerter, skulder-nakke, kæbe-hoved, knæ-hofter, fod, massage)

**Figma:**
- LIGHT bg
- Sektion-titel: **"Kender du det her?"** (IKKE "Hvad er rygsmerter?")
- Symptom-liste: vist som **checkbox-style indikatorer** (✓ med orange ramme) — IKKE bullet-list med `disc`
- 2-kolonne layout: liste venstre, billede højre (matcher)

**Build:**
- Sektion-titel "Hvad er rygsmerter?" ❌
- `.symptom-list` med `list-style: disc` ❌

**Fix HTML (i alle 6 behandlings-sider):**
```html
<h2 id="hvad-title">Kender du det her?</h2>
<ul class="symptom-checklist">
  <li>Smerter i lænden ved bestemte bevægelser</li>
  <li>Udstråling til ben eller hofte</li>
  <!-- osv. -->
</ul>
```

**Fix CSS:**
```css
.symptom-checklist { list-style: none; padding: 0; }
.symptom-checklist li {
  display: flex; align-items: flex-start; gap: var(--space-8);
  padding: var(--space-8) 0;
  border-bottom: 1px solid var(--border-light-figma);
}
.symptom-checklist li::before {
  content: "✓";
  flex-shrink: 0;
  width: 24px; height: 24px;
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800;
  font-size: 14px;
}
```

---

### #7 Booking/Klient flow-pages: nav-styling smitter af

**Hvor påvirket:** Alle 5 booking + 5 klient flow-sider (10 sider total)

**Figma:**
- Nav er LIGHT (samme som landing)
- Flow-card er hvid på `--bg-light` baggrund — matches build ✅
- Stepper, knapper, forms — matcher build ✅

**Build:**
- Nav er DARK ❌ (samme problem som #1)

**Fix:** Inkluderet i #1's globale nav-fix. Ingen ekstra ændringer her udover at verificere visuelt efter nav-fix.

---

## 🟡 Andre afvigelser (ikke kritiske men værd at fixe)

### A. Om Nicolai "Det jeg behandler" sektion

Figma har en chip/pill-sky med klikbare emneknapper (Rygsmerter, Skulder, Knæ, Fod osv.).
Build mangler denne sektion helt.

**Fix:** Tilføj sektion under "Mine kurser" i `om-nikolai.html`:
```html
<section class="section section--light" aria-labelledby="behandler-title">
  <div class="container">
    <h2 id="behandler-title">Det jeg behandler</h2>
    <ul class="chip-cloud">
      <li><a href="behandlinger/rygsmerter.html">Rygsmerter</a></li>
      <li><a href="behandlinger/skulder-nakke.html">Skulder og nakke</a></li>
      <li><a href="behandlinger/kaebe-hoved.html">Kæbeleds-dysfunktion</a></li>
      <li><a href="behandlinger/knae-hofter.html">Knæ og hofter</a></li>
      <li><a href="behandlinger/fod.html">Fod-problematikker</a></li>
      <li><a href="behandlinger/massage.html">Sportsmassage</a></li>
    </ul>
  </div>
</section>
```

```css
.chip-cloud { display: flex; flex-wrap: wrap; gap: var(--space-8); }
.chip-cloud a {
  display: inline-block;
  padding: 10px 20px;
  background: var(--white);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-btn);
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
}
.chip-cloud a:hover { border-color: var(--accent); color: var(--accent-text-on-light); }
```

### B. Eyebrow-tekst på sider med dark hero

Mine eyebrow-tekster ("GROCOTT FYSIOTERAPI & SUNDHEDSHUS" osv.) eksisterer ikke i Figma på landing page. På behandlings-sider er det "BEHANDLING" som vi bevarer.

**Fix:** Fjern eyebrow fra `index.html` hero. Behold på behandlinger.

### C. Section heading-decorations

Figma har subtle stjerne (★) eller orange decoration ved nogle H2'er. Tilføj evt. til design-system:
```css
.section h2.section-heading::before {
  content: "★ ";
  color: var(--accent);
  font-size: 0.8em;
}
```

### D. Footer-styling

Footer er DARK i Figma OG i build ✅ — match.

### E. Print-stylesheet mangler

Ikke kritisk for eksamen, men `@media print { ... }` ville være nice-to-have.

---

## 📐 Side-by-side checkliste

| Side | Nav | Hero | Sektioner | "Usikker? Bare ring" | Footer |
|---|---|---|---|---|---|
| `index.html` | ❌ DARK | ❌ DARK fullbleed | ❌ 1 ekstra sektion | ❌ Solid orange | ✅ DARK |
| `om-nikolai.html` | ❌ DARK | ❌ DARK | ⚠ Mangler chip-cloud | ❌ Solid orange | ✅ DARK |
| `design-system.html` | ❌ DARK | ✅ LIGHT (matches) | — | (ingen) | ✅ DARK |
| `behandlinger/rygsmerter.html` | ❌ DARK | ❌ DARK | ❌ "Hvad er X" → "Kender du det her" + checklist | ❌ Solid orange | ✅ DARK |
| `behandlinger/skulder-nakke.html` | ❌ DARK | ❌ DARK | ❌ Samme som rygsmerter | ❌ Solid orange | ✅ DARK |
| `behandlinger/kaebe-hoved.html` | ❌ DARK | ❌ DARK | ❌ Samme | ❌ Solid orange | ✅ DARK |
| `behandlinger/knae-hofter.html` | ❌ DARK | ❌ DARK | ❌ Samme | ❌ Solid orange | ✅ DARK |
| `behandlinger/fod.html` | ❌ DARK | ❌ DARK | ❌ Samme | ❌ Solid orange | ✅ DARK |
| `behandlinger/massage.html` | ❌ DARK | ❌ DARK | ❌ Samme | ❌ Solid orange | ✅ DARK |
| `booking/trin-1.html` | ❌ DARK | (flow-card) | ✅ Layout matches | (ingen) | ✅ DARK |
| `booking/trin-2.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `booking/trin-3.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `booking/trin-4.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `booking/trin-5.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `klient/login.html` | ❌ DARK | (flow-card narrow) | ✅ Matches | (ingen) | ✅ DARK |
| `klient/vaelg.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `klient/kalender.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `klient/bekraeft.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| `klient/booket.html` | ❌ DARK | (flow-card) | ✅ Matches | (ingen) | ✅ DARK |
| 6× `stubs/*.html` | ❌ DARK | ❌ DARK section--dark | (kun hero) | (ingen) | ✅ DARK |

---

## 🛠️ Fix-rækkefølge (anbefalet)

### Fase A — Globale CSS-fixes (1-2 timer)

Filer der ændres: kun `css/styles.css`

1. **Nav-color fix** (#1): Skift `.nav` til `--bg-light`, opdater `.nav__link`, `.nav__logo`, `.nav__burger span`
2. **CTA-band fix** (#3): Tilføj `.section--cta-ring` og `.btn--phone-accent`; behold `.section--accent` hvis brugt andre steder
3. **Symptom-checklist** (#6): Tilføj `.symptom-checklist` CSS-blok

**Commit:** `fix(css): align global colors with Figma — nav LIGHT, CTA-band DARK`

### Fase B — Landing page restruktur (1 time)

Filer der ændres: kun `index.html`

1. **Hero restruktur** (#2): Replace section 1 med 2-kolonne layout
2. **Slet "Fra første besøg"** (#4)
3. **Mød Nicolai cards** (#5): Erstat step-list med moed-cards

**Tilføj CSS:**
- `.section--hero-landing`, `.hero__image`, `.hero__rating`
- `.moed-cards`, `.moed-card`

**Commit:** `fix(html): rebuild landing hero, remove extra section, restyle Mød Nicolai`

### Fase C — Logo (15 min × 1 commit, 25 filer)

1. Lav `images/logo.svg` med orange figur-ikon + tekst
2. Replace `.nav__logo` HTML i alle 25 filer med `<img>` + `<span>` struktur

**Commit:** `feat: add Grocott orange figure logo to all pages`

### Fase D — Behandlinger-symptoms (30 min, 6 filer)

1. Replace "Hvad er X?" → "Kender du det her?" i alle 6 behandlings-sider
2. Replace `<ul class="symptom-list">` → `<ul class="symptom-checklist">`

**Commit:** `fix(html): update behandlinger symptom section to checklist style`

### Fase E — CTA-band HTML-update (30 min, 8 filer)

1. Replace `.section--accent` med `.section--cta-ring` i 8 filer
2. Update subtitle-tekst til Figma-version
3. Replace `.btn--phone` med `.btn--phone-accent` i CTA-bandet

**Commit:** `fix(html): update "Usikker? Bare ring" sections to dark+orange-pill pattern`

### Fase F — Om Nicolai chip-cloud (15 min)

1. Tilføj "Det jeg behandler" sektion + CSS

**Commit:** `feat(om-nikolai): add chip-cloud "Det jeg behandler"`

### Fase G — Verifikation (30 min)

1. Åbn alle 25 sider i browser ved 1440px
2. Side-by-side mod Figma screenshots (også på 768px og 390px)
3. Kør Lighthouse + axe på 5 udvalgte sider
4. Commit screenshots i `docs/audits/`

**Total estimat:** 4-5 timer arbejde

---

## 🎯 Definition of "Figma parity"

Efter alle fixes skal disse acceptance-tests passere:

- [ ] Nav-baren er LIGHT på alle 25 sider med orange logo + dark tekst
- [ ] `index.html` hero er 2-kolonne med foto-card til højre, lys baggrund, mørk H1
- [ ] `index.html` har KUN 6 indholds-sektioner (ikke 7) — "Fra første besøg" er fjernet
- [ ] "Usikker? Bare ring" sektion: DARK baggrund, hvid centreret H2, orange pill-knap centreret
- [ ] Behandlings-sider har "Kender du det her?" + checklist (ikke disc-bullets)
- [ ] Logo med orange figur-ikon vises i nav-baren
- [ ] Om Nicolai har chip-cloud "Det jeg behandler"
- [ ] WCAG 2.2 AA passes (Lighthouse ≥ 95 på alle sider)
- [ ] Responsive ved 1440/768/390/320 px uden horisontal scroll

---

## 📚 Referencer

| Dokument | Sti |
|---|---|
| Design spec | `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md` |
| Implementation plan | `docs/superpowers/plans/2026-05-20-grocott-fysioterapi-build.md` |
| Denne diagnostik | `docs/audits/2026-05-21-figma-vs-build-diagnosis.md` |
| Figma fil | https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual |
| Figma desktop hi-fi | `?node-id=1-4` |
| Figma mobile hi-fi | `?node-id=1-5` |
| Figma design system | `?node-id=1-3` |

### Figma node-IDs for direkte adgang

| Side | Node ID |
|---|---|
| Landing Page – Desktop | `26:2` |
| Om Nicolai – Desktop | `266:498` |
| Behandling / Rygsmerter | `419:584` |
| Behandling / Skulder | `453:2` |
| Behandling / Kæbe | `468:2` |
| Behandling / Knæ | `473:2` |
| Behandling / Fod | `477:2` |
| Behandling / Massage | `487:2` |
| Booking trin 1 | `113:153` |
| Booking trin 2 | `116:153` |
| Booking trin 3 | `118:201` |
| Booking trin 4 | `119:248` |
| Booking trin 5 | `120:329` |
| Klient login (EK 00) | `727:1196` |
| Klient vaelg (EK 01) | `727:1237` |
| Klient kalender (EK 02) | `731:1222` |
| Klient bekræft (EK 03) | `731:1335` |
| Klient booket (EK 04) | `735:1248` |
| Design System | `10:2` |

---

## 🧠 Til ny chat: Kontekst-overdragelse

**Når du starter en ny session, kopiér dette ind som første prompt:**

```
Jeg arbejder på Grocott Fysioterapi-projektet (vanilla HTML/CSS/JS statisk site, eksamensaflevering UCL Multimediedesigner 2. semester).

Repo: /Users/carolinekristiansen/Documents/Projekt-5--eksamen
Worktree: .claude/worktrees/thirsty-ramanujan-caa39e
Branch: claude/thirsty-ramanujan-caa39e
Figma sandhed: https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual

Forrige session byggede 25 HTML-sider + 1454 linjer CSS, men der er 7 kritiske afvigelser fra Figma. Læs:

  docs/audits/2026-05-21-figma-vs-build-diagnosis.md

Den indeholder fuld diagnostik + fix-plan i 7 faser (A-G). Start med Fase A (globale CSS-fixes til nav + CTA-band). Verificer hver fase mod Figma-screenshots ved 1440px før commit.

Husk: Figma er sandhed, ikke spec-teksten. Brug Figma MCP til at hente screenshots/design context før hver fase.
```

---

*Diagnose færdig 2026-05-21. Næste skridt: vælg om du vil fixe selv eller delegere til ny session.*
