# Designsystem-opdatering — spec

**Dato:** 2026-05-24
**Forfatter:** Caroline Kristiansen (m. Claude som UX-strateg)
**Status:** Udkast til godkendelse
**Relateret til:** `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md` (oprindelig design-spec)

---

## 1. Kontekst & scope

`design-system.html` er den side, censor vil bruge til at vurdere komponentbiblioteket
og dokumentationen ved 2. semester-eksamen i Multimediedesign (maj 2026). Det er også
den side, en fremtidig udvikler ville bruge for at forstå hvilke klasser der findes,
inden de bygger nyt.

Som det er i dag (2026-05-24) viser siden 10 sektioner med ca. 69 klasser.
Live-koden er endt et helt andet sted:

| Måling | Tal |
|---|---|
| Unikke CSS-klasser brugt i live HTML (alle 21 sider) | 284 |
| Klasser dokumenteret i `design-system.html` | 69 |
| Klasser i koden, **ikke** i designsystemet | 228 (≈ 80 %) |
| Komponent-blokke i `css/styles.css` (sektion 05–25) | 21 |
| Komponenter i original spec (kapitel 6) | 20 |
| Faktiske komponentfamilier i CSS i dag | ~40+ |

Sider med uddokumenterede komponenter:
- **Landing** (`index.html`) — moed-filter, behandlinger-filter, filter-chip, info-card,
  reviews-rating, review-card (Caroline-renderet via JS), reviews-grid, pris-card,
  pris-grid, forsikring-card, forsikring-logos, cta-band, video-block, find-grid,
  section--white, section--cta-ring, section--find, section--video-hero, btn--outline,
  btn--dark, btn--phone-accent, hero__rating.
- **Behandlinger-sider** (`behandlinger/*.html`) — symptom-checks, symptom-check,
  step-list, step-list--horizontal, quote-card, cross-link-card, section--cta-bund,
  accordion (i live-brug, ikke i DS), product-info-card, product-info-grid.
- **Om Nicolai** (`om-nikolai.html`) — approach-grid, approach-card, visit-grid,
  visit-card, timeline-scroll, timeline-event, review-card--google,
  section--video-hero, section--hero-om, om-hero__photo, om-hero__text, om-hero__ctas,
  tilgang-row, tilgang-photo, tilgang-text-col.
- **Booking-flow** (`booking/trin-1.html` – `trin-5.html`) — flow-header,
  flow-bottom-nav, flow-main, flow-page, flow-card, flow-card__actions,
  flow-card__phone-vejledning, min-tilgang-card, consult-toggle, consult-toggle__option,
  consult-toggle--inline, consult-toggle__pill, akut-row, consult-row, calendar,
  calendar__grid, calendar__nav, calendar__times, time-slots, time-slot, form-card,
  cpr-info-box, field__info-trigger, modal, modal__backdrop, modal__card, modal__close,
  switch, switch__track, switch__thumb, symptom-grid, symptom-grid__option, symptom-sub,
  symptom-sub__title, symptom-sub__options, info-card (på trin-2), summary-card,
  summary-row, booking-summary, btn--mitid.
- **Klient-flow** (`klient/*.html`) — flow-card--login, login__*.

Det er en stor drift, men selve CSS-koden er sund: BEM-mønster, tokens propagerer,
ingen duplikering ved spot-check. **Problemet er kun dokumentation.**

---

## 1.5 Figma alignment-check (Dennis' designmanual)

Efter første draft af denne spec sammenlignede vi mod Dennis' originale Figma-fil
("Prototype-og-Designmanual", node 1:3). Resultat:

### Tokens: 100 % match
Alle 13 Figma Variables (`bg/dark`, `accent/default`, `radius/btn`, `space/*`,
`text/*`, `star`, osv.) findes i `css/styles.css:35-86` med matchende værdier
(forskellig casing). CSS har dog 14+ tokens udover Figma:
- `--bg-photo`, `--white` (utility-værdier)
- `--space-4`, `--space-48`, `--space-64` (udvidet skala)
- `--section-py`, `--section-py-tight` (semantiske aliaser)
- `--max-width`, `--content-width`, `--mobile-width`, `--nav-height` (layout)
- **4 WCAG-fixede varianter** (`--accent-text-on-light`, `--star-on-light`,
  `--border-light`, `--border-dark`) — bevidste afvigelser fra Figma's tokens
  der ikke ramte AA-kontrast.

**Naming-konflikt:** Dennis kalder borders `border/light` / `border/dark`. CSS
har omdøbt dem til `--border-light-figma` / `--border-dark-figma` for at frigøre
hovednavnet til WCAG-fixede versioner. Skal forklares i designsystemet.

### Komponenter: Dennis har 11 sektioner + 11 floating component-grupper
Dennis' "🎨 Design System – Board" har sektioner 01-11:
| # | Sektion | I nuværende `design-system.html`? |
|---|---|---|
| 01 | Buttons | ✓ |
| 02 | Navigation Desktop | ✓ (live header) |
| 03 | Cards / Treatment | ✓ |
| 04 | Forms / Input (4 states) | ✓ |
| 05 | Floating / FAB | ✓ |
| 06 | Badge | ✓ |
| 07 | Testimonial | ✓ |
| 08 | Pris Row | ✓ |
| 09 | Footer Column | ✓ |
| 10 | Step | ✓ |
| **11** | **Navigation Mobile** | **✗ MANGLER — fixes i denne update** |

README.md siger "11 sektioner" — det matcher Dennis' intent men ikke nuværende
fil-tilstand. Section 11 (Navigation Mobile) skal eksplicit tilføjes.

Plus Dennis' "floating components" (uden for hoved-board):
- Stepper (5 Steps + 4 Steps Mobile + Mobile-variant)
- Konsultation Toggle (desktop + mobile)
- Date Cell (desktop + mobile + **EK-variant 88×43**)
- Time Slot Group (desktop + mobile + **EK-variant 156×19**)
- Symptom Section (6 varianter desktop + 6 mobile)
- Toggle / Switch (desktop + mobile)
- Accordion + FAQ Accordion (desktop + mobile)
- Navigation Desktop dropdown-open states (Behandlinger, Praktisk)
- Navigation Mobile menu-open state
- **EK Akut Toggle 44×24** (mindre end booking-switch)

**Vigtig observation:** Dennis differentierer EK-varianter med mindre dimensioner,
men live-koden bruger **samme CSS-klasser** som booking (`.switch`, `.calendar`,
`.date-cell`, `.time-slot`) — kun container/parent giver de mindre størrelser.
Dvs. der er ikke separate `.ek-switch`/`.ek-date-cell` i koden. Det skal
designsystemet være tydelig omkring.

### Hvor CSS/live-kode går ud over Dennis (= "kode-tilføjelser")
Disse findes IKKE i Dennis' Figma — de er bygget direkte i kode:
- **Section-system:** `.section--white`, `.section--cta-bund`, `.section--cta-ring`,
  `.section--find`, `.section--video-hero`, `.section--hero-landing`,
  `.section--hero-om`, `.section--accent`
- **Yderligere cards:** approach-card, quote-card, cross-link-card,
  min-tilgang-card, visit-card, product-info-card, pris-card, forsikring-card,
  summary-card, review-card (Caroline's render-output), review-card--google
- **Content-blocks:** video-block, map-block, cta-band
- **Forms-additions:** filter-chip (Caroline/Louise landing), form-card komposition,
  field__info-trigger, cpr-info-box, modal
- **Flow-mønstre:** flow-header, flow-bottom-nav, flow-card, summary-card
- **Login-pattern:** flow-card--login + alle `.login__*`-klasser
- **Reviews-widget:** reviews-rating, reviews-grid, reviews-loading, reviews-error
  (Caroline JS render, 2026-05-22)
- **Button-varianter ud over Dennis:** btn--outline, btn--dark, btn--phone,
  btn--phone-accent, btn--mitid

### Alignment-beslutninger truffet efter Figma-tjek
| # | Beslutning |
|---|---|
| A1 | **Kapitel A (Foundations) beholdes** — visualiser alle tokens som swatches selv om Dennis ikke har det. Multimediedesigner-eksamen kræver synlig token-dokumentation. |
| B1 | **Kapitel B (Sektion-system) beholdes** — cream/hvid-rytmen er en kerne-designbeslutning. |
| C3 | **Caroline/kode-tilføjelser inkluderes med eksplicit "kode-tilføjelse"-mærkat** — synliggør hvad der er bygget udover Dennis' originale Figma. Mest pædagogisk for censor + viser refleksion. |
| D1 | **Section 11 (Navigation Mobile) tilføjes eksplicit** — fixer README-løgnen. |
| D2 | **Navigation dropdown-open states tilføjes** — kompakt, som ekstra states i C2. |
| D3 | **Ny E6: EK-flow varianter** — forklarer at EK bruger samme klasser men i mindre containere. |
| D4 | **4-trin mobile stepper + Konsultations Cards Mobile-variant droppes** — auto-responsive i koden, ikke separate komponenter. |

---

## 2. Beslutninger (Grill Me-protokol)

| # | Spørgsmål | Svar |
|---|---|---|
| 1 | Skal vi refactore CSS (konsolidere drift) først? | **Nej.** Vi er 4 dage fra aflevering. Risiko for regressions er for stor. Refactor sker efter aflevering. |
| 2 | Skal `design-system.html` blive i én side? | **Ja.** Én side er nemmere for censor at navigere. Vi bruger sektioner med ankerlinks i toppen. |
| 3 | Skal vi vise tokens som tabel eller med live swatches? | **Live swatches.** Demonstrerer at tokens faktisk propagerer + er mere visuelt for en multimedie-eksamen. |
| 4 | Hvor detaljeret skal flow-mønstre dokumenteres? | **Vise canonical instance + referere til live-side.** Vi gentager ikke hele 5-trin booking-flow i designsystemet — vi viser fx én flow-header + linker til `booking/trin-1.html`. |
| 5 | Skal Louises JS-state-classes med? | **Ja, kort sektion.** De er live i koden og en censor kan se dem i CSS. |
| 6 | Skal `field__info-trigger` + `cpr-info-box` være egne komponenter eller "Forms"? | **Forms.** De optræder kun i form-card context (booking trin-4). |
| 7 | Skal login-flowet være egen kapitel? | **Nej.** Login-pattern dokumenteres som ét eksempel i Flow-mønstre. `login__*`-klasserne er side-specifikke variations. |
| 8 | Skal kort/map-block, video-block og cta-band være i Sektion-skabeloner eller Komponenter? | **Komponenter.** De er content-blocks der kan placeres i forskellige sektioner, ikke selv en sektion-type. |

---

## 3. Mål & ikke-mål

### Mål
- Designsystemet skal afspejle hvad der **faktisk er bygget** — ingen opdigtning,
  ingen "future state".
- En censor skal kunne læse `design-system.html` igennem og dække ≥ 90 % af det de
  ser på de øvrige 20 sider.
- Tokens (farver, typografi, spacing, radius, shadow, layout) skal være synlige —
  ikke gemt i `:root`.
- WCAG 2.2 AA-bevidste afvigelser fra Figma skal være eksplicit dokumenteret.
- Sektion-bg-rytmen (cream / hvid alternering) skal være tydeliggjort.

### Ikke-mål (out of scope)
- ❌ Ingen ændringer i `css/styles.css` (selv ikke at flytte regler).
- ❌ Ingen ændringer i `js/main.js` (Louises eller Carolines).
- ❌ Ingen ændringer i de 20 live-HTML-sider.
- ❌ Ingen nye komponenter, tokens, eller varianter — kun dokumentation af det der er.
- ❌ Ingen Figma-genimport eller redesign.
- ❌ Ingen Lighthouse-optimering ud over hvad designsystem-siden selv bruger.

---

## 4. Ny struktur — `design-system.html` v2

Siden organiseres i **7 kapitler (A-G) med ca. 35 sub-sektioner** (efter
Figma-alignment-tjek). Hvert kapitel introduceres med en kort tekst der
forklarer hvad kapitlet dækker. Inden første kapitel ligger en TOC (table of
contents) med ankerlinks så censor og udvikler kan springe rundt.

**Source-mærkater i sektioner:**
- 🟢 **[Dennis]** — komponent findes i Dennis' Figma designmanual som canonical
- 🟡 **[Dennis + udvidet]** — Dennis har en variant, kode har flere
- 🔵 **[Kode-tilføjelse]** — ikke i Dennis' Figma, kun bygget i kode
  (markeres specifikt hvis det er Caroline/Louise's addition)

```
00 — TOC (ny)
KAPITEL A — Foundations  🔵 [Kode-tilføjelse — Dennis har Variables, ikke swatches]
  A1. Farver (tokens + WCAG-noter)
  A2. Typografi (Sen + Mulish + 9 Figma type-tokens)
  A3. Spacing + layout
  A4. Radius + shadow

KAPITEL B — Sektion-system  🔵 [Kode-tilføjelse]
  B1. Sektion-baggrunde (.section--light / --white / --dark / --accent)
  B2. Hero-sektioner (.section--hero / --hero-landing / --hero-om / --video-hero)
  B3. CTA-sektioner (.section--cta-ring / --cta-bund)
  B4. Find vej (.section--find)

KAPITEL C — Komponenter
  C1. Buttons  🟡 [Dennis + udvidet — 4 ekstra varianter i kode]
  C2. Navigation  🟡 [Dennis section 02 + 11 + 3 open-states]
       - Desktop nav (live)
       - Mobile nav (390 bred) — Dennis section 11
       - Dropdown-open states: Behandlinger, Praktisk
       - Mobile menu-open state
  C3. Cards  🟡 [Dennis: Treatment + Testimonial; kode tilføjer 11 cards]
  C4. Badge  🟢 [Dennis section 06]
  C5. Pris  🟡 [Dennis pris-row + kode pris-grid/--card/--col/--list/--cta]
  C6. Step + Stepper + Timeline  🟡 [Dennis step + 5-trin stepper; kode tilføjer step-list/--horizontal + timeline]
  C7. Content-blocks
       - accordion 🟢 [Dennis floating]
       - video-block, map-block, cta-band 🔵 [Kode-tilføjelse]
  C8. Reviews-widget  🔵 [Caroline JS, 2026-05-22]
  C9. FAB  🟢 [Dennis section 05]

KAPITEL D — Forms
  D1. Field-states  🟢 [Dennis section 04 — 4 states]
  D2. Checkbox + Radio  🟡 [Checkbox i kode; radio fra Symptom Section Dennis floating]
  D3. Switch  🟢 [Dennis Toggle/Switch floating]
  D4. Symptom-grid + symptom-sub  🟢 [Dennis Symptom Section, 6 varianter]
  D5. Filter-chip  🔵 [Caroline/Louise landing-tilføjelse]
  D6. Form-card composition  🔵 [Kode-tilføjelse — booking trin-4]
  D7. Modal/popover  🔵 [Kode-tilføjelse — booking trin-4 CPR-info]

KAPITEL E — Flow-mønstre
  E1. Flow-header + flow-bottom-nav  🔵 [Kode-tilføjelse — i prototype-frames, ikke DS-board]
  E2. Flow-card  🟡 [Dennis Konsultation Toggle + Switch; kode tilføjer flow-card-skellet]
  E3. Calendar + time-slots  🟢 [Dennis Date Cell + Time Slot Group]
  E4. Summary-card  🔵 [Kode-tilføjelse — booking trin-5]
  E5. Login-pattern  🔵 [Kode-tilføjelse — klient/login.html]
  E6. EK-flow varianter (NY)  🟢 [Dennis EK Week Cell, EK Time Slot Cell, EK Akut Toggle]
       - Forklarer at EK bruger samme CSS-klasser men i mindre container

KAPITEL F — JS state-klasser & data-hooks  🔵 [Kode-tilføjelse]
  F1. State-klasser (kun det der faktisk toggles i js/main.js)
  F2. Data-hooks-konvention (data-js-* prefix)

KAPITEL G — Konventioner  🔵 [Kode-tilføjelse]
  G1. BEM-naming
  G2. Accessibility patterns
  G3. WCAG-bevidste afvigelser (samlet liste — Dennis' tokens vs. vores fixes)
```

> **Note:** Kapitel B–E erstatter de gamle sektioner 01-10. Kapitel A og F+G
> er nye. Kapitel B–E genbruger og udvider 01-11's indhold (incl. den manglende
> section 11). Source-mærkater gør det tydeligt for censor hvad der er originalt
> Dennis-arbejde vs. byggeteam-tilføjelser.

---

## 5. Per-kapitel content-spec

### KAPITEL A — Foundations

#### A1. Farver
Vis **swatch + tokennavn + hex + brug** for hver token. Tokens kopieres verbatim
fra `css/styles.css:35-66`:

| Token | Værdi | Brug |
|---|---|---|
| `--bg-dark` | `#17212E` | Mørk surface (hero, footer, CTA-ring) |
| `--bg-light` | `#F8F4EE` | Cream surface (body default + .section--light) |
| `--bg-photo` | `#1C0C06` | Foto-overlay (hero-rygmassage på rygsmerter) |
| `--white` | `#FFFFFF` | .section--white + cards på cream |
| `--accent` | `#E06820` | **KUN** til knap-fyld + active states |
| `--accent-hover` | `#B84E10` | Knap-hover + tekst-links/eyebrow på lys bg |
| `--text-primary` | `#F4EEE8` | Tekst på mørk bg |
| `--text-secondary` | `#8A9EAD` | Sekundær tekst på mørk bg |
| `--text-dark` | `#1C2630` | Primær tekst på cream/hvid |
| `--text-on-accent` | `#1C2630` | Tekst på `--accent`-fyld |
| `--border-light-figma` | `#E2D8CC` | **Kun dekorativ** på lys bg |
| `--border-dark-figma` | `#2A3A4A` | **Kun dekorativ** på mørk bg |
| `--star` | `#E8960E` | **KUN** på mørk bg |

**WCAG-fixed varianter (bevidste afvigelser fra Figma — dokumenteret til censor):**

| Token | Værdi | Kontrast | Hvorfor |
|---|---|---|---|
| `--accent-text-on-light` | `var(--accent-hover)` = `#B84E10` | 5.08:1 | Tekst/eyebrow på lys bg — Figma's `--accent` rammer kun 3.2:1 |
| `--star-on-light` | `#C77B0A` | 4.5:1 | Stjerne på lys bg — Figma's `--star` rammer kun 2.6:1 |
| `--border-light` | `#C5B8A8` | 3:1 | UI-borders på lys bg (form-felter, filter-chip) |
| `--border-dark` | `#5A6E80` | 3:1 | UI-borders på mørk bg |

Vis hver token som en farveswatch (40×40 firkant med token-navn under).
Markér WCAG-fixed varianter visuelt (fx med en lille tekstetiket "WCAG 2.2 AA").

#### A2. Typografi
Vis **fonts + skala** fra `css/styles.css` sektion 02 (linje 225+):
- **Headings:** Sen 400/700/800
- **Body:** Mulish 400/500/700

Vis live H1, H2, H3, H4, brødtekst, `.caption`, `.eyebrow`. Vis hver med
font-family, weight, size, line-height som tekst under prøven.

#### A3. Spacing + layout
Vis **spacing-skala** (8-baseret) som visuelle blokke:
- `--space-4` (4px) → `--space-64` (64px)

Vis **section-spacing-tokens:**
- `--section-py` (= var(--space-64))
- `--section-py-tight` (= var(--space-48))

Vis **layout-tokens** som tabel:
- `--max-width: 1440px`
- `--content-width: 1200px`
- `--mobile-width: 390px`
- `--nav-height: 86px`

#### A4. Radius + shadow
- `--radius-card: 8px` (med firkantet eksempel)
- `--radius-btn: 50px` (med pill-eksempel)
- `--shadow-card: 0 6px 16px rgba(28, 38, 48, 0.14)` (med live shadow-prøve)

---

### KAPITEL B — Sektion-system

#### B1. Sektion-baggrunde
Forklar i ét afsnit at body er cream som default, og at `.section--white` /
`.section--dark` / `.section--accent` modifiers veksler bg pr. sektion. Sektion-bg-
rytmen på landing er Figma-bestemt (mød + behandlinger = hvide; resten = cream).

Vis 4 prøver i fuld bredde (med container indeni):
- `.section.section--light` (cream — body-default)
- `.section.section--white` (hvid)
- `.section.section--dark` (mørk)
- `.section.section--accent` (orange — `css/styles.css:220`)

#### B2. Hero-sektioner
Vis 3 prøver (forkortet, 200px høje):
- `.section--hero-landing` (`index.html` linje 80+ — foto-overlay + hvid tekst)
- `.section--hero-om` (`om-nikolai.html` linje 80+ — 2-col med foto)
- `.section--video-hero` (`om-nikolai.html:119` — video-block centreret)

#### B3. CTA-sektioner
Vis 2 prøver:
- `.section--cta-ring` (`index.html:627` — mørk bg, orange phone-pill)
- `.section--cta-bund` (`behandlinger/rygsmerter.html:219` — cream/accent, primary CTA)

#### B4. Find vej
Vis prøve af `.section--find` (`index.html:656` — kort venstre, info-kolonne højre).

---

### KAPITEL C — Komponenter

Hver komponent vises som **lille preview + kort beskrivelse + canonical markup**
(brug `<code>`-blok så censor kan se class-strukturen).

#### C1. Buttons (7 varianter)
Alle defineret i `css/styles.css` sektion 05 (linje 319+):

| Klasse | Brug | Linje |
|---|---|---|
| `.btn.btn--primary` | Primær CTA på alle sider | 319+ |
| `.btn.btn--secondary` | Sekundær CTA på lys bg | 319+ |
| `.btn.btn--secondary.btn--on-dark` | Sekundær på mørk bg (header) | 319+ |
| `.btn.btn--ghost` | "Modtag SMS engangskode" (login) | 319+ |
| `.btn.btn--outline` | "Se alle priser →", "Få rutevejledning →" | 392 |
| `.btn.btn--dark` | "Tjek din forsikringsdækning →" | 404 |
| `.btn.btn--phone-accent` | CTA-ring telefonnummer | 425 |
| `.btn.btn--mitid` | MitID-login (klient/login.html) | 441 |

Vis alle 8 med default-state. Lad eksisterende `data-state="hover"`-mønster blive.

#### C2. Navigation  🟡 [Dennis section 02 + 11 + 3 open-states]

Dennis dokumenterer navigation i to hoved-sektioner + tre open-states. Vi viser dem alle.

**C2.1 — Desktop nav (1440 bred)** — Dennis section 02
"Se denne sides header for live-eksempel" + canonical class-liste:
- `.nav` (root) → `.nav__inner.container` → `.nav__logo` + `.nav__links` + `.nav__ctas` + `.nav__burger`
- `.nav__item.nav__item--dropdown` → `.nav__link` (button) + `.nav__chevron` + `.nav__dropdown`
- Logo: `<picture>` med mobile/desktop source-swap

**C2.2 — Mobile nav (390 bred)** — Dennis section 11 (NY — manglede i v1)
Vis canonical markup (kopieret fra `design-system.html:69-94` der allerede har det):
```html
<div id="mobile-nav" class="nav__mobile" hidden>
  <button class="nav__close" aria-label="Luk menu">✕</button>
  <nav aria-label="Mobilmenu">
    <ul>…</ul>
  </nav>
  <a href="booking/trin-1.html" class="btn btn--primary">Book første tid</a>
</div>
```
Forklar: `hidden`-attribut er default; togles af Louises JS når `.nav__burger`
klikkes.

**C2.3 — 3 open-states** — Dennis dokumenterer disse som separate symboler
Vis kompakt 3-row layout med screenshot/illustration + tilstand:
1. **Desktop / Behandlinger dropdown open** — `<button class="nav__link" aria-expanded="true">` → `.nav__dropdown` synlig
2. **Desktop / Praktisk dropdown open** — samme pattern, anden trigger
3. **Mobile / Menu open** — `.nav__mobile[hidden=""]` fjernet + `.nav__burger[aria-expanded="true"]`

**C2.4 — Tilgængelighed + JS-fallback (kort note)**
- Burger-menuen på <768px har **CSS-only `:focus-within`-fallback** i mobile media
  query — menuen virker selv uden JS. `!important` bruges bevidst som Chromium-workaround
  (`[hidden]` overstyres af author-CSS). **Ikke fjernet.**
- Louises JS toggler `hidden`-attribut + `aria-expanded` (ikke klasser) på alle
  3 togglere (`.nav__burger`, `.nav__link[aria-controls]`, `.nav__mobile-toggle`).

#### C3. Cards (13 varianter) 🟡 [Dennis: 2 cards; kode tilføjer 11]
**Show one preview per card type med canonical markup.** Klassificér efter formål
og marker source:

**Indhold-cards:**
- 🟢 `.card.card--treatment` — Dennis section 03 (forside Behandlinger horisontal-scroll)
- 🟢 `.card.card--testimonial` — Dennis section 07 (gammel canonical, stadig i CSS)
- 🔵 `.approach-card` — kode-tilføjelse, om-nikolai 3-col grid (`om-nikolai.html:137`)
- 🔵 `.quote-card` — kode-tilføjelse (`behandlinger/rygsmerter.html:162`)
- 🔵 `.cross-link-card` — kode-tilføjelse (`behandlinger/rygsmerter.html:212`)
- 🔵 `.min-tilgang-card` — kode-tilføjelse (`booking/trin-1.html:137`)
- 🔵 `.visit-card` — kode-tilføjelse (`om-nikolai.html:161`)
- 🔵 `.product-info-card` — kode-tilføjelse (`behandlinger/fod.html:189`)

**Review-cards (2 varianter):**
- 🔵 `.review-card` — Caroline JS (`initReviewsWidget()` i `js/main.js:156`)
- 🔵 `.review-card--google` — kode-tilføjelse, statisk (`om-nikolai.html:304`)

**Pris/forsikring/summary-cards:**
- 🔵 `.pris-card` — kode-tilføjelse (`index.html:553`)
- 🔵 `.forsikring-card` — kode-tilføjelse (`index.html:571`)
- 🔵 `.summary-card` — kode-tilføjelse (`booking/trin-5.html:131`)

#### C4. Badge + status-pills 🟢 [Dennis section 06]
Behold eksisterende prøve (`.badge.badge--outline`, `.badge.badge--filled`).
Tilføj 🔵 `.consult-toggle__pill` (`booking/trin-3.html:152`) som related pattern
(kode-tilføjelse — kompakt pill der bruges i `.consult-toggle--inline`).

#### C5. Pris 🟡 [Dennis pris-row + kode pris-grid/--card/--col/--list]
Vis 4 patterns:
- 🟢 `.pris-rows` med `.pris-row` × 4 — Dennis section 08 (`behandlinger/rygsmerter.html:174`)
- 🔵 `.pris-grid` med `.pris-col` + `.pris-list` + `.pris-card` — kode-tilføjelse (`index.html:550`)
- 🔵 `.pris-note` — kode-tilføjelse (small print)
- 🔵 `.pris-cta` — kode-tilføjelse (button under listen)

#### C6. Step + step-list + stepper + timeline 🟡 [Dennis step + 5-trin stepper; kode tilføjer step-list/timeline]
Saml alle "fremgangs"-mønstre i én sektion:
- 🟢 `.step` — Dennis section 10 (eksisterer i DS — behold)
- 🟢 `.stepper` med `.stepper__step--active` / `--done` — Dennis Stepper 5 Steps floating
  (alle 6 active-states fra Dennis: Active=1 .. Active=5 + Active=Complete)
- 🔵 `.step-list` (vertikal default) — kode-tilføjelse
- 🔵 `.step-list.step-list--horizontal` — kode-tilføjelse (`behandlinger/rygsmerter.html:126`)
- 🔵 `.visit-grid` med nummererede `.visit-card` — kode-tilføjelse (`om-nikolai.html:160`)
- 🔵 `.timeline-scroll` med `.timeline-event` — kode-tilføjelse (om-nikolai karriere, `om-nikolai.html:191`)

#### C7. Content-blocks
- 🔵 `.video-block` med `.video-block__play` — kode-tilføjelse (`om-nikolai.html:123` + `index.html:226`)
- 🔵 `.map-block` — kode-tilføjelse (CSS sektion 18, brug i find-section)
- 🔵 `.cta-band` — kode-tilføjelse (`index.html:628` i `.section--cta-ring`)
- 🟢 `.accordion` med `.accordion__item` + `.accordion__head` + `.accordion__body`
  — Dennis Accordion + FAQ Accordion floating (Closed/Open states).
  Bruger native `<details>/<summary>` (`behandlinger/rygsmerter.html:187`).

#### C8. Reviews-widget 🔵 [Caroline JS — kode-tilføjelse 2026-05-22]
**Ny sektion.** Forklar i ét afsnit:
- Renderes dynamisk fra `data/reviews.json` af `initReviewsWidget()`
  (`js/main.js:97+`)
- `aria-busy="true"` + `aria-live="polite"` på containeren
- 3 mulige tilstande:

Vis canonical markup for hver:
```html
<!-- Loading -->
<p class="reviews-loading">Henter anmeldelser…</p>

<!-- Error -->
<div class="reviews-grid has-error">
  <p class="reviews-error" role="alert">Kunne ikke indlæse anmeldelser …</p>
</div>

<!-- Success: 1 review-card pr. anmeldelse -->
<figure class="review-card">
  <div class="review-card__stars" aria-label="5 ud af 5 stjerner">…</div>
  <blockquote><p>"…"</p></blockquote>
  <figcaption>
    <span class="review-card__name">Mette K.</span>
    <span class="review-card__source">Google · maj 2026</span>
  </figcaption>
</figure>
```

Plus `.reviews-header` + `.reviews-rating` (med `.stars` + `.rating-meta`)
preview. **Note: kører kun via Live Server — fetch fejler på `file://`.**

#### C9. FAB 🟢 [Dennis section 05]
Behold nuværende formulering. Tilføj: "FAB er `position: fixed` + bg `--accent` —
kun synlig <768px." Dennis viser Default + Hover state (56×56).

---

### KAPITEL D — Forms

#### D1. Field-states 🟢 [Dennis section 04]
Behold de 4 stater (default / focus / filled / error). Vis `.field--error` med
`<p class="field__error" role="alert">` og `aria-describedby` på input.

#### D2. Checkbox + Radio 🟡 [Dennis har radio via Symptom Section; checkbox er kode-tilføjelse]
- Behold checkbox-prøven (🔵 kode-tilføjelse — ikke i Dennis' DS-board).
- Tilføj radio-prøve: `.symptom-grid__option` viser radio som card-like option
  (`booking/trin-2.html:139`) — 🟢 Dennis Symptom Section.

#### D3. Switch 🟢 [Dennis Toggle/Switch floating]
Ny prøve af `.switch` (`booking/trin-3.html:142`):
```html
<label class="switch" aria-label="Slå akuttid til/fra">
  <input type="checkbox" name="akut">
  <span class="switch__track" aria-hidden="true">
    <span class="switch__thumb"></span>
  </span>
</label>
```
Dennis viser State=Off + State=On. Note: `.switch__label` (`klient/kalender.html:129`)
er en parent-flex-positionering, ingen separat CSS-styling.

#### D4. Symptom-grid + symptom-sub 🟢 [Dennis Symptom Section floating]
Vis preview af 6-option grid (`booking/trin-2.html:137`) + det skjulte sub-grid
der vises når "Fod-problematikker" vælges (`.symptom-sub.is-aktiv` toggle —
`js/main.js:279`, Louise). Dennis dokumenterer 6 valgte-states (hovedpine,
skulder, knae, ryg, fod, massage) — de er alle samme komponent, kun aria-checked
forskellig.

#### D5. Filter-chip 🔵 [Caroline/Louise landing-tilføjelse — ikke i Dennis]
Vis preview af `.behandlinger-filter` med 6 `.filter-chip` (`index.html:283`).
Forklar: radio-inputs er `.sr-only`, `<span>` er det visuelle "chip"
(`css/styles.css:791+`). Louises JS toggler `.info-card` body på change-event.

#### D6. Form-card composition 🔵 [Kode-tilføjelse — booking trin-4]
Vis canonical markup af `.form-card` med:
- 4 `.field` (navn/email/phone/cpr)
- `.field__info-trigger` (CPR-info-knap)
- `.cpr-info-box` (callout under cpr-feltet)
- 2 `.checkbox` (sygesikring + GDPR)

Reference: `booking/trin-4.html:138-201`. Dennis dokumenterer kun individuelle
field-states (section 04), ikke deres komposition i form-card.

#### D7. Modal/popover 🔵 [Kode-tilføjelse — ikke i Dennis' Figma]
Brug live markup fra `booking/trin-4.html:204`:
```html
<div id="cpr-modal" class="modal" role="dialog" aria-modal="true" hidden>
  <div class="modal__backdrop" data-close></div>
  <div class="modal__card">
    <button type="button" class="modal__close" data-close aria-label="Luk">✕</button>
    <h2>Hvad bruges CPR-nummer til?</h2>
    …
  </div>
</div>
```

Note: Louises JS toggler `hidden`-attribut + `aria-expanded` på trigger.

---

### KAPITEL E — Flow-mønstre

Forklarende intro: "Booking-flow (5 trin) og EK-flow (klient-login + kalender)
deler samme layout-skelet. Her er de fælles komponenter — for fuldt kontekst, se
live-flowet i `booking/trin-1.html` til `trin-5.html` eller `klient/`. Dennis'
Figma differentierer booking- og EK-varianter med mindre dimensioner — men
live-koden bruger samme CSS-klasser i begge flows, kun container giver de
mindre størrelser (se E6)."

#### E1. Flow-header + flow-bottom-nav 🔵 [Kode-tilføjelse — ikke i Dennis' DS]
Vis preview af `.flow-header` (back-knap + titel + close-knap — `booking/trin-1.html:99`).
Forklar at `.flow-bottom-nav` er trin-navigation der dukker op <768px
(`css/styles.css:2945`). Dennis' Figma viser flow-headeren som en del af
prototype-frames, men ikke som DS-komponent.

#### E2. Flow-card 🟡 [Dennis Konsultation Toggle + Switch; kode tilføjer flow-card-skellet]
Forklar at `.flow-card` (🔵 kode-tilføjelse) er containeren der indeholder alt
i et booking-trin. Vis preview af 3 inner-komponenter:
- 🟢 `.consult-toggle` (radio cards — `booking/trin-1.html:149`) — Dennis
  Konsultation Toggle floating, Selected=60min + Selected=30min
- 🟢 `.consult-toggle.consult-toggle--inline` med `.consult-toggle__pill`
  (`trin-3.html:150`) — pill-variant
- 🔵 `.akut-row` + `.consult-row` (`trin-3.html:137`) — kode-tilføjelse

#### E3. Calendar + time-slots 🟢 [Dennis Date Cell + Time Slot Group floating]
Vis preview af `.calendar` med `.calendar__nav` + `.calendar__grid`
(table-baseret — `booking/trin-3.html:163`) + `.calendar__times` med `.time-slots`
ul med `.time-slot` / `.time-slot--selected` buttons.

Dennis dokumenterer alle 3 date-cell-states (Default / Selected / Unavailable)
og 6 time-slot-selected-states (None + t0900/t1000/t1300/t1430/t1600). Live-koden
implementerer Default + Selected; Unavailable togles via `disabled` + `aria-disabled`
attributter (`klient/kalender.html:169`).

#### E4. Summary-card 🔵 [Kode-tilføjelse — booking trin-5]
Vis canonical markup (`booking/trin-5.html:131`):
```html
<section class="summary-card">
  <h2 class="summary-card__title">Opsummering</h2>
  <hr class="summary-card__divider">
  <div class="summary-row">
    <p class="summary-row__label">Behandling</p>
    <p class="summary-row__value">60 min konsultation</p>
  </div>
  …
  <img src="…" alt="Kort" class="summary-card__map">
</section>
```

#### E5. Login-pattern 🔵 [Kode-tilføjelse — klient/login.html]
Vis kort intro + class-liste (uden full markup-preview):
- `.flow-card.flow-card--login` (klient/login.html)
- `.login__title`, `.login__subhead`, `.login__form`, `.login__email-btn`,
  `.login__sms-btn`, `.login__divider-or`, `.login__signup`, `.login__signup-link`,
  `.login__forgot`, `.login__rule`
- `.btn.btn--mitid` (MitID-knap)

Forklar at det er en side-specifik variant af `.flow-card`. Dennis' Figma har
ikke login-pattern; det er tilføjet til EK-flowet. Link til `klient/login.html`
for live.

#### E6. EK-flow varianter 🟢 [Dennis EK Week Cell + EK Time Slot Cell + EK Akut Toggle]
**Ny sektion** der adresserer Dennis' EK-varianter.

Dennis' Figma har 3 EK-specifikke floating-komponenter:
| Dennis-komponent | Dimensioner | Live CSS-klasse |
|---|---|---|
| EK Week Cell | 88×43 | `.date-cell` (samme som booking) |
| EK Time Slot Cell | 156×19 | `.time-slot` (samme som booking) |
| EK Akut Toggle | 44×24 | `.switch` (samme som booking) |

**Vigtig oplysning til censor:** Live-koden implementerer ikke separate
`.ek-date-cell`, `.ek-time-slot` eller `.ek-switch`-klasser. EK-flowet
(`klient/kalender.html`) genbruger booking-flowets klasser — de mindre
dimensioner Dennis viser i Figma kommer fra parent container's bredde +
flex-shrink. Det er en bevidst forenkling der reducerer CSS-duplikering.

Referencer:
- `klient/kalender.html:126-131` — `.switch` brugt i EK-context
- `klient/kalender.html:144-170` — `.calendar` + `.date-cell` brugt i EK-context

---

### KAPITEL F — JS state-klasser & data-hooks

Forklarende intro: "Sektion 25 i `css/styles.css` indeholder state-classes som
toggles af `js/main.js`. State-classes er kontrakten mellem HTML/CSS og JS."

#### F1. State-klasser
Tabel viser de state-klasser der **rent faktisk** togles af `js/main.js` i dag
(`grep "classList\." js/main.js`) — plus de selected-modifiers der findes som
statisk markup i live-koden:

| Klasse | Hvem toggler / sætter | Hvor brugt | Live-kilde |
|---|---|---|---|
| `.is-aktiv` | Louise, `initSymptomGrid` | `.symptom-sub.is-aktiv` (vises ved fod-valg) | `js/main.js:279, 287` + `css/styles.css:1893` |
| `.has-error` | Caroline, `initReviewsWidget` | `.reviews-grid.has-error` (error-state border) | `js/main.js:131` + `css/styles.css:3688` |
| `.reviews-loading` | Statisk i HTML, fjernes af JS ved render | Placeholder før fetch | `index.html:389` + `css/styles.css:3678` |
| `.reviews-error` | Caroline (template-render) | Vises ved failed fetch | `js/main.js:135` + `css/styles.css:3679` |
| `.time-slot--selected` | Statisk i live-HTML (Louises kalender-JS er ikke bygget endnu) | Valgt tid i kalender | `booking/trin-3.html:234` |
| `.date-cell--selected` | Statisk i live-HTML (samme) | Valgt dato i kalender | `css/styles.css:1763` |

> **Note om JS-HANDOFF.md:** Det dokument nævner `body.has-open-menu`,
> `body.has-open-modal` og `.is-active` som **anbefalede** state-klasser Louise
> kunne tilføje. Pr. 2026-05-24 er ingen af dem implementeret i `js/main.js` eller
> `css/styles.css`, så de er bevidst udeladt af tabellen ovenfor — designsystemet
> dokumenterer kun det der er, ikke det der er planlagt.

#### F2. Data-hooks-konvention
Forklar at alle JS-hooks bruger `data-js-*`-prefix (aldrig klasser). Eksempler:
- `data-js-reviews`, `data-js-reviews-more` (Caroline)
- `data-js-modal-trigger`, `data-js-akut-toggle`, `data-js-time`, `data-js-symptom`,
  `data-js-info-card`, `data-js-cal-prev` (Louise)

---

### KAPITEL G — Konventioner

#### G1. BEM-naming
Forklar mønsteret i 3 punkter:
- `.block` (root)
- `.block__element` (child)
- `.block--modifier` (variant)

Eksempel: `.card.card--treatment > .card__image + .card__body > .card__title`.

#### G2. Accessibility patterns
Liste over patterns brugt konsekvent:
- `:focus-visible` outline (3px `--accent`, 2px offset)
- `.sr-only` til skjult tekst for screen reader
- `<fieldset>/<legend class="sr-only">` til grupperede inputs
- `<details>/<summary>` til CSS-only accordions
- `aria-expanded` toggles på dropdown-knapper
- `aria-live="polite"` på dynamisk indhold (reviews-grid, booking-summary)
- `role="alert"` på fejlbeskeder
- Touch-targets ≥ 44×44 CSS px

#### G3. WCAG-bevidste afvigelser (samlet)
Tabel med 4 rækker (kopier fra A1 — gentag for at fremhæve):
- `--accent` (Figma) vs `--accent-text-on-light` (vores) → 3.2:1 → 5.08:1
- `--star` (Figma) vs `--star-on-light` (vores) → 2.6:1 → 4.5:1
- `--border-light-figma` (Figma) vs `--border-light` (vores) → < 3:1 → 3:1
- `--border-dark-figma` (Figma) vs `--border-dark` (vores) → < 3:1 → 3:1

Plus 1 paragraf-forklaring: "Figma's farvepalet er optimeret til æstetik, ikke til
WCAG 2.2 AA. Hvor Figma's tokens fejler AA på interaktive elementer (tekst-links,
borders, stjerner på lys bg), er der defineret WCAG-fixed varianter. Dette er
dokumenteret over for censor."

---

## 6. README delta

`README.md:57` siger pt.: *"Se `design-system.html` for live komponentbibliotek (11 sektioner)."*

Det er **forkert i to retninger**:
- Dennis' Figma har 11 sektioner (01-11), men nuværende `design-system.html` har kun 10 (mangler section 11 Navigation Mobile).
- Efter opdatering har vi 7 kapitler (A-G) med ca. 35 sub-sektioner, ikke 11.

Ret til:
*"Se `design-system.html` for live komponentbibliotek (5 kapitler:
Foundations, Sektion-system, Komponenter, Forms, Flow-mønstre, plus JS
state-classes og konventioner). Komponenter er kildemærket: 🟢 Dennis' Figma,
🟡 Dennis + udvidet i kode, 🔵 kode-tilføjelse udover Figma."*

`README.md:42` i fil-tree-listen er korrekt — ingen ændring.

---

## 7. Implementation-strategi (foreslået til writing-plans-fasen)

Build i 5 commits, én pr. kapitel + en for README. Hvert commit verificeres via
`preview_start` + visuel inspektion af `design-system.html` på desktop (1440) +
mobil (390) + iPad (768).

**Foreslået commit-rækkefølge:**
1. `chore(ds): tilføj TOC + Kapitel A — Foundations (tokens, typografi, spacing, radius, shadow) + Figma-alignment-noter`
2. `feat(ds): tilføj Kapitel B — Sektion-system (.section--* + hero + CTA + find)`
3. `feat(ds): udvid Kapitel C — Komponenter med source-mærkater (🟢/🟡/🔵), inkl. Navigation Mobile (Dennis section 11) + 3 dropdown-open states, alle 13 cards, reviews-widget`
4. `feat(ds): udvid Kapitel D — Forms (field, checkbox, radio, switch, symptom-grid, filter-chip, form-card, modal) med source-mærkater`
5. `feat(ds): tilføj Kapitel E + F + G — flow-mønstre (inkl. ny E6 EK-flow varianter), JS state-klasser, konventioner; fix README sektion-count`

Per-commit invariant:
- ✅ `css/styles.css` er ikke ændret (diff: 0 linjer)
- ✅ `js/main.js` er ikke ændret (diff: 0 linjer)
- ✅ Live-sider er ikke ændrede
- ✅ Alle klasser brugt i design-system.html eksisterer i `css/styles.css`
- ✅ Live Server starter uden console-fejl
- ✅ Lighthouse accessibility ≥ 95 på selve design-system-siden

---

## 8. Verifikations-strategi

### Per-commit
- **Visuel:** Åbn `design-system.html` i Chromium → scroll igennem → ingen layout-brud.
- **Mobil:** Resize til 390px → ingen horizontal scroll (`doc.scrollWidth - innerWidth === 0`).
- **Tastatur:** Tab gennem siden → fokus-ring synlig på alle interaktive elementer.
- **Console:** Ingen errors eller warnings.

### Final acceptance (efter commit #5)
- **Klasse-coverage-tjek:** Kør samme diff som i sektion 1 (klasser brugt
  i live HTML vs. klasser brugt i design-system.html). **Mål: ≤ 20 klasser i
  live-koden er udokumenterede** (vs. nuværende 228). De resterende ≤ 20 er
  acceptable som "side-specifikke micro-varianter" (fx `find-divider`, `pris-note`).
- **Censor-test:** Læs `design-system.html` igennem som om du er censor. Kan du
  forklare hvert design-element du ser på de 20 andre sider? Mål: ja.
- **Lighthouse:** Accessibility ≥ 95 på design-system.html.
- **axe DevTools:** 0 AA-violations.

---

## 9. Risici & mitigationer

| Risiko | Sandsynlighed | Mitigation |
|---|---|---|
| Designsystem-siden vokser så meget at den selv bliver svær at læse | Medium | TOC i toppen + ankerlinks pr. sektion. Begræns canonical markup-snippets til ~15 linjer hver. |
| Jeg kommer til at opfinde en klasse | Lav | Self-review-checkliste (sektion 11) + grep-verifikation før commit. |
| Et live-eksempel i DS bliver outdated når Louise tilføjer state-klasser | Medium | Kapitel F refererer til `css/styles.css` sektion 25 ved navn, ikke via copy. Når Louise tilføjer en ny state-class, opdaterer hun samme tabel. |
| Designsystem-siden indlæser `js/main.js` og initReviewsWidget kører på siden | Lav | Vi viser kun `<figure class="review-card">` som statisk markup. Sletter eller skjuler `data-js-reviews`-hook på designsystem-eksemplet så Carolines JS ikke prøver at fetch'e. |
| Render-tid på mobilen bliver træg pga. mange tokens | Lav | Tokens er CSS custom properties — ingen perf-impact. Swatches er små `<div>` med inline-style. |

---

## 10. Out of scope (eksplicit)

Disse er bevidst IKKE en del af denne opdatering:
- ❌ Refactor af `css/styles.css` (fx flytte `.section--*`-modifiers samlet)
- ❌ Konsolidering af `.reviews-*` vs `.review-card` naming
- ❌ Sletning af `.card--testimonial` (gammel, ikke længere i live-brug)
- ❌ Tilføjelse af nye komponenter eller varianter
- ❌ Ændring af tokens i `:root`
- ❌ Figma-resync
- ❌ Performance-optimering af de 20 live-sider
- ❌ Backlog-features fra `memory/backlog_pensum_boosters.md`
- ❌ Ændring af `JS-HANDOFF.md` (stadig gyldigt for Louise)

Alt ovenstående kan tages efter aflevering hvis tid tillader det.

---

## 11. Self-review-checkliste (bruges af mig før commit)

Før hvert commit kører jeg gennem listen:
- [ ] Alle klasser nævnt i den nye sektion eksisterer i `css/styles.css`
      (verificeret via `grep -n "^\.<klasse>" css/styles.css`)
- [ ] Alle markup-eksempler er kopieret fra ægte live-side
      (verificeret ved at lave en `grep` mod den side jeg refererer til)
- [ ] Ingen "TBD", "TODO", `…` i selve markup-prøver (kun i tekst hvor det er
      bevidst forkortning)
- [ ] Ingen indre kontradiktioner med kapitel A's tokens
- [ ] Sektion-bg-rytmen (cream/hvid) er respekteret i selve DS-sidens layout
- [ ] `js/main.js` og `css/styles.css` er uændrede
- [ ] Lighthouse a11y ≥ 95 på DS-siden

---

## 12. Næste skridt

1. **Caroline reviewer denne spec** — siger ja/nej til hver kapitel-grupering
   og hver beslutning i sektion 2.
2. **Commit spec til git** (efter approval).
3. **Invoke `superpowers:writing-plans`** for at lave detaljeret build-plan
   (commit-for-commit med checkboxes).
4. **Eksekvér plan via `/gsd:quick`** kapitel for kapitel.
5. **Final verification** mod sektion 8's acceptance-kriterier.
6. **Commit + push før 28. maj** (4 dage til aflevering).

---

*Spec sluttet 2026-05-24. Klar til review.*
