# Om Nicolai-side iteration — playbook for Grocott Fysioterapi

Brug denne playbook når du skal iterere `om-nikolai.html` mod Figma.
Skrevet 2026-05-22 efter klient/login.html blev færdig (commit `7e5ccfa`).
Følger samme mønster som `klient-flow-iteration.md` og `booking-flow-iteration.md`.

**Figma-fil:** https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual
**Filkey:** `eURlHeZIgqEZqVaCfyyXEp`

Om-nikolai er en **single-page section-based content-side** (ikke et flow). Den iteres
**sektion for sektion** mod Figma — ikke side for side som booking/EK.

---

## Hvornår skal jeg åbne den

Når du siger:
- "Iterér om-nikolai.html mod Figma. Følg om-nikolai-playbook'en."
- "Lav om-nikolai færdig"
- "Gå i gang med om-nikolai sektion X" (hvor X = hero / video / tilgang / besoeg / baggrund / kurser / testimonials / behandler / cta-ring / find)

Claude kører alle 7 trin sekventielt for hver sektion. Skip ikke trin.

---

## ⚠️ KRITISK: Samme JS-grænse som booking-flow + EK-flow

Om-nikolai indeholder potentielt **dynamiske elementer Louise ejer**:
- Video-play (sektion 8.5 i spec — `initVideoPlayer()`)
- Reviews-widget (hvis Trustpilot-embed eller carousel)
- Map-embed (Google Maps eller statisk billede med fallback)

**Du må:**
- ✅ Lave HTML-struktur + tekst + klasser
- ✅ Bruge `aria-*` attributter (`aria-labelledby`, `aria-expanded`)
- ✅ Tilføje `data-js-*` hooks som Louise wire'r imod
- ✅ Tilføje semantik (`<article>`, `<section>`, `<figure>`)
- ✅ Bruge CSS-only patterns (`<details>/<summary>` for FAQ, `:target` for tabs)
- ✅ Statisk thumbnail på video med caption "Video kommer her"

**Du må IKKE:**
- ❌ Røre `js/main.js`
- ❌ Tilføje `.is-*` eller `.has-*` klasser (sektion 25 = Louises)
- ❌ Skrive nogen JavaScript
- ❌ Implementere video-player, carousel-logic, eller map-API-kald

Hvis tvivl: lav strukturen så **CSS giver et synligt, statisk billede af hele siden**.

---

## Trin 0 — Læs bindinger først (5 min)

Læs i denne rækkefølge:

1. `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md` **sektion 7.2** (om-nikolai anatomi)
2. Spec **sektion 8.4.3** (Mød din fysioterapeut — initVideoPlayer pattern, bruges også her)
3. `JS-HANDOFF.md` (rod) — fil-ejerskab, gotchas
4. Memory: `feedback_js_louise_boundaries.md`, `feedback_no_javascript.md`, `feedback_wcag_constraints.md`
5. Memory: `feedback_section_bg_rhythm.md` — sektion-bg veksler cream/hvid, om-nikolai er IKKE 100% cream
6. Memory: `components_established.md` + `components_new_2026-05-21-*.md` — alle eksisterende klasser

---

## Trin 1 — Find Figma-noder

### Hele siden (overblik)

| View | Node ID (MCP) | Frame-navn |
|---|---|---|
| Desktop | `266:498` | Om Nicolai – Desktop |
| Mobile | `294:402` | Om Nicolai – Mobile |

**OBS:** Figma URL bruger `node-id=266-498` (dash). MCP-kald bruger `nodeId=266:498` (colon).

### Per sektion

Når du arbejder på en sektion, find dens nested node-ID:

```
mcp__figma__get_metadata fileKey=eURlHeZIgqEZqVaCfyyXEp nodeId=266:498
```

…og søg i resultat efter sektion-navnet (fx "Section / Om Nicolai", "Section / Min tilgang", etc.).
**Noter dem i `memory/reference_om_nikolai_node_ids.md`** når du finder dem, så næste session
ikke skal lede igen.

### Eksisterende sektioner i `om-nikolai.html`

| # | Sektion (HTML aria-labelledby) | H1/H2 tekst |
|---|---|---|
| 1 | `om-hero-title` | Nicolai Grocott |
| 2 | `video-title` | Hør mig fortælle |
| 3 | `tilgang-title` | Min tilgang til behandling |
| 4 | `visit-title` | Dit første besøg hos mig |
| 5 | `baggrund-title` | Min baggrund |
| 6 | `kurser-title` | Mine kurser og videreuddannelse |
| 7 | `testimonials-title` | Rigtige klienter. Rigtige resultater. |
| 8 | `behandler-title` | Det jeg behandler |
| 9 | `ring-title` | Usikker? Bare ring. |
| 10 | `find-title` | Find vej til klinikken |

Hvis Figma viser en sektion HTML ikke har endnu (eller omvendt) — flag det og spørg Caroline.

---

## Trin 2 — Hent screenshots + design context

For hver sektion:

```
mcp__figma__get_screenshot      fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<desktop-section-id>  maxDimension=1600
mcp__figma__get_screenshot      fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<mobile-section-id>   maxDimension=1400
mcp__figma__get_design_context  fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<desktop-section-id>  excludeScreenshot=true
mcp__figma__get_design_context  fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<mobile-section-id>   excludeScreenshot=true
```

Identificér per sektion:
- **Sektion-bg** (cream/hvid/dark) — om-nikolai veksler!
- **Layout-pattern** (1-col, 2-col grid, photo-text split, asymmetrisk)
- **Interaktive elementer** (video-play, accordion, ring-CTA)
- **Genbrug-muligheder** (eksisterende `.approach-card`, `.section--cta-ring`, etc.)

---

## Trin 3 — Verificér eksisterende komponenter er på plads

Om-nikolai bør **genbruge eksisterende komponenter** så meget som muligt:

```bash
grep -nE "^\.section|^\.approach-card|^\.timeline-step|^\.testimonial-card|^\.cta-ring|^\.find-vej|^\.video-hero|^\.section--hero-om" css/styles.css
```

**Etablerede klasser at lede efter:**
- `.section--hero-om` (hero-section med navn + tagline)
- `.section--video-hero` eller `.video-block` (video-pattern fra landing 8.4.3)
- `.approach-card` (3-col card grid til "Min tilgang")
- `.testimonial-card` eller `.testimonials__grid`
- `.section--cta-ring` (cream/dark CTA-band — eksisterer fra landing 8.4.7)
- `.find-vej` eller `.section--find` (kort + adresse)
- `.timeline-step` (til "Dit første besøg" trin-progression)
- `.section--light` (white-bg modifier)

Hvis en klasse mangler: tjek først `memory/components_*.md` + Figma component-instances —
mange klasser blev bygget under booking/EK-flowet og kan genbruges.

---

## Trin 4 — Match strukturen mod Figma

> ⚠️ **Verificér via `get_design_context` for hver sektion før du bygger.**

**Per-sektion sektion-rækkefølge (provisorisk, baseret på spec 7.2 + nuværende HTML):**

### Hero (`om-hero-title`)
- Stort billede af Nicolai (left eller right)
- Eyebrow "AUTORISERET FYSIOTERAPEUT" i WCAG-orange
- H1 "Nicolai Grocott"
- Tagline/intro-paragraf
- Primary CTA "Book første tid" + Secondary "Jeg er allerede klient"

### Video (`video-title`)
- H2 "Hør mig fortælle"
- Video-placeholder med play-overlay (statisk thumbnail + `data-js-video-trigger`)
- Caption under video

### Min tilgang (`tilgang-title`)
- H2 + intro
- 3 `.approach-card` i grid (titel + ikon/billede + body)
- Mobile: stacker 1-kol

### Dit første besøg (`visit-title`)
- H2 + intro
- 3-5 trin numererede med titel + beskrivelse (`<ol>` med custom counter)
- Mobile: stacker

### Min baggrund (`baggrund-title`)
- 2-col split: tekst + billede (eller timeline)
- Personlig beretning

### Kurser (`kurser-title`)
- Liste af videreuddannelser med år (`<ul>` eller `<dl>`)
- Måske med kategorisering (fx "Manuel terapi", "Træning")

### Testimonials (`testimonials-title`)
- Grid af klient-anmeldelser (genbrug fra landing hvis muligt)
- Stjerne-rating med `var(--star-on-light)` (#C77B0A) på lys bg

### Det jeg behandler (`behandler-title`)
- Grid af behandling-kategorier med links til `behandlinger/*.html`
- Genbrug pattern fra landing 8.4.5

### Usikker? Ring (`ring-title`)
- `.section--cta-ring` band (genbrug fra landing)
- Stor tel-knap med `--accent-text-on-light` farve

### Find vej (`find-title`)
- 2-col: kort-billede + adresse/kontakt
- Statisk billede med `data-js-map-trigger` til Louise

---

## Trin 5 — Tilføj kun nye CSS-klasser hvis nødvendigt

Om-nikolai bør sjældent kræve nye klasser. Hvis du SKAL tilføje:

- Placér i `css/styles.css` sektion **18 (Sections)** eller en ny "om-nikolai-specific" subsection
- Brug eksisterende design-tokens (`--space-*`, `--text-*`, `--accent-text-on-light`)
- WCAG-fixede tokens på lys bg:
  - Tekst-accent: `var(--accent-text-on-light)` (#B84E10)
  - Stjerner: `var(--star-on-light)` (#C77B0A)
  - Border: `var(--border-light)` (UI) eller `var(--border-light-figma)` (dekorativ)
- Dokumentér nye klasser i `memory/components_new_<dato>-om-nikolai.md`

---

## Trin 6 — Rewrite HTML (sektion for sektion)

**Vigtigste principper:**

1. **Behold delt chrome** — nav, footer, skip-link, FAB rør du ikke
2. **Body får IKKE `flow-page` klassen** — det er kun til booking/EK
3. **Sektion-bg-rytme er Figma-bestemt** — ikke alle sektioner er cream.
   Tjek hver sektion separat i Figma og brug `.section--light` (hvid) eller bare `.section` (cream).
4. **Semantik:** Hver sektion bruger `<section aria-labelledby="...-title">` med en H2 inde
5. **Hero bruger H1** — alle andre sektioner H2 (kun ÉN H1 per side)
6. **Video-pattern (sektion 8.4.3):**
   ```html
   <figure class="video-hero" data-js-video-trigger>
     <img src="..." alt="Thumbnail af Nicolai" class="video-hero__thumbnail">
     <button class="video-hero__play" aria-label="Afspil video">▶</button>
     <figcaption>Caption tekst</figcaption>
   </figure>
   ```
   Louise wire'r modal eller inline replace; CSS viser statisk placeholder.
7. **Behold eksisterende `id`-attributter** — Louise har sandsynligvis hooks der peger på dem
8. **CTAs på siden bør pege til:**
   - `booking/trin-1.html` (Book første tid)
   - `klient/login.html` (Jeg er allerede klient)
   - `tel:+4560866770` (Ring)
9. **Initial-skjult indhold:** brug `hidden` attribut (men ikke på CSS-only-toggled)
10. **Touch-targets:** alle interaktive elementer ≥ 44×44 (især video-play, card-links)

---

## Trin 7 — Verificér i preview

```
preview_start name=grocott
preview_resize width=1440 height=900    # Desktop
preview_eval expression="window.location.href = window.location.origin + '/om-nikolai.html'"
preview_screenshot
preview_resize width=390 height=844     # Mobil
preview_screenshot
```

### Verifikationsliste per sektion

- [ ] **Horizontal overflow:** `document.documentElement.scrollWidth - window.innerWidth === 0` på både 1440 + 390
- [ ] **Sektion-bg matcher Figma** (cream/hvid alternation respekteret)
- [ ] **H1 er kun på hero** — alle andre sektioner H2
- [ ] **Eyebrow bruger `var(--accent-text-on-light)`** ikke raw `--accent`
- [ ] **CTAs har korrekte hrefs** (book / login / tel)
- [ ] **Video har statisk thumbnail + play-overlay** (ingen embed-load uden klik)
- [ ] **Mobile:** 2-col grids stacker til 1-kol hvor Figma viser det
- [ ] **Touch-target ≥ 44×44** (alle knapper, video-play, card-links)
- [ ] **Tab-rækkefølge logisk** (skip-link → nav → hero CTAs → sektioner i orden → footer)
- [ ] **WCAG-tokens** brugt korrekt (accent på links, star på lys bg)

### Preview-server gotchas

- Tjek serveren kører fra DIN worktree: `lsof -p <pid> | grep cwd`
- Hvis 8765/8766/8767 er optaget af andre worktrees: opdatér `.claude/launch.json` til
  næste ledige port (men commit IKKE port-ændringen)
- CSS-cache: force-reload via `window.location.reload()` efter CSS-changes

---

## Almindelige fejl (undgå)

| Fejl | Hvorfor | Fix |
|---|---|---|
| Tilføje `flow-page`-klasse på body | Det er kun til booking/EK | Behold body uden class eller med side-specifik class |
| Multiple H1 på siden | A11y-fejl | Kun hero-sektion = H1, resten H2 |
| Video-embed loader uden klik | Performance + GDPR (tracking) | Statisk thumbnail + play-knap der trigger Louises JS |
| Cream på alle sektioner | Figma alternerer cream/hvid | Følg `feedback_section_bg_rhythm.md` |
| Stjerner i raw `--star` på lys bg | WCAG-fail (3.x:1) | Brug `var(--star-on-light)` (#C77B0A — 4.5:1) |
| Skrive JS i `js/main.js` | Louises filer | Brug `data-js-*` hooks; lad Louise wire |
| Bruge `.is-active` / `.has-error` | Sektion 25 = Louises | Brug `aria-current` / `aria-invalid` / `aria-expanded` |
| Tilføje 100% nye komponenter | Brydes design-system konsistens | Genbrug fra landing + booking/EK først |
| Skjule sektioner med inline `display:none` | Bryder Louises toggle-logik | Brug `hidden` attribut |
| Glemme `aria-labelledby` på `<section>` | A11y-fejl | Match H2's `id` |

---

## Anbefalet rækkefølge

1. **Hero** — etablerer ton + brand-feel for hele siden
2. **Video** — kritisk pattern (Louises hovedhook)
3. **Min tilgang** — 3-card grid, god opvarmning
4. **Dit første besøg** — timeline-pattern, mellem-kompleksitet
5. **Min baggrund** — 2-col split, simpel
6. **Kurser** — liste, hurtig
7. **Testimonials** — genbrug fra landing
8. **Det jeg behandler** — genbrug fra landing
9. **Usikker? Ring** — genbrug fra landing
10. **Find vej** — sidste sektion, map-pattern

Efter alle sektioner er færdige: **gennemgå hele siden i preview** med Tab-keyboard navigation
for at sikre logisk fokus-rækkefølge fra top til bund.

---

## TL;DR — Quick-start til ny session

```
1. Læs docs/workflows/om-nikolai-iteration.md (denne fil)
2. Læs spec sektion 7.2 + 8.4.3 (om-nikolai anatomi + video-pattern)
3. Hent screenshot + get_design_context for sektionen du arbejder på
   - Desktop frame: 266:498, mobile: 294:402
   - Find sub-sektion node-ID via get_metadata
4. Tjek etablerede klasser i css/styles.css sektion 8, 18 + utility
5. Skriv HTML med semantik + data-js-* hooks + aria-attributter
6. Lad ALT der kræver JS være "synligt statisk" — Louise wire'r dynamikken
7. Verificér i preview ved 1440 + 390 med tab-keyboard test
8. Tjek horizontal overflow: doc.scrollWidth - innerWidth === 0
9. Commit på branch — flag eksplicit hvilke data-js-* hooks Louise skal kende til
10. Spørg Caroline efter hver sektion før du fortsætter
```
