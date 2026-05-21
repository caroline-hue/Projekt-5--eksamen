# Klient-flow (EK) iteration — playbook for Grocott Fysioterapi

Brug denne playbook når du skal iterere klient-flowet (eksisterende klient, "EK") mod Figma.
Skrevet 2026-05-21 efter booking-flow trin 1-5 blev færdig (sidste commit `1e06687`).

**Figma-fil:** https://www.figma.com/design/eURlHeZIgqEZqVaCfyyXEp/Prototype-og-Designmanual
**Filkey:** `eURlHeZIgqEZqVaCfyyXEp`

EK-flowet parallelliserer booking-flowet men er for eksisterende klienter — der starter med MitID-login og hopper symptom-trinnet over (eller henter symptom fra journal).

---

## Hvornår skal jeg åbne den

Når du siger:
- "Iterér klient/login.html mod Figma. Følg klient-flow-playbook'en."
- "Lav klient-flow færdig"
- "Gå i gang med EK trin login"

Claude kører alle 7 trin sekventielt. Skip ikke trin.

---

## ⚠️ KRITISK: Samme JS-grænse som booking-flow

Klient-flowet er **Louises hovedterritorium** (spec sektion 13 — EK-FLOW).
Hun wire'r al funktionalitet: MitID-mock, pre-fyldte felter fra journal, kalender-state, summary, .ics-download.

**Du må:**
- ✅ Lave HTML-struktur + tekst + klasser
- ✅ Bruge `aria-*` attributter (`aria-current`, `aria-expanded`, `aria-invalid`)
- ✅ Tilføje `data-js-*` hooks som Louise wire'r imod
- ✅ Tilføje semantik (`<form>`, `<fieldset>`, `<label>`, `<input required>`)
- ✅ Tilføje `hidden` attribut på initial-skjult indhold
- ✅ Bruge CSS-only `:has()` selectors hvor det kan erstatte JS (se trin-2 symptom-sub som template)

**Du må IKKE:**
- ❌ Røre `js/main.js`
- ❌ Tilføje `.is-*` eller `.has-*` klasser (sektion 25 = Louises)
- ❌ Skrive nogen JavaScript
- ❌ Implementere MitID-mock eller form-state

Hvis tvivl: lav strukturen så **CSS giver et synligt, statisk billede af alle trin**.

---

## Trin 0 — Læs bindinger først (5 min)

Læs i denne rækkefølge:

1. `docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md` **sektion 13** — Louises EK-flow plan
2. `docs/workflows/booking-flow-iteration.md` — samme mønster som EK-flow, brug som template
3. `JS-HANDOFF.md` (rod) — fil-ejerskab, gotchas
4. Memory: `feedback_js_louise_boundaries.md`, `feedback_no_javascript.md`, `feedback_wcag_constraints.md`
5. Memory: `components_established.md` + `components_new_2026-05-21-booking.md` — alle eksisterende klasser inkl. nye booking-flow patterns

---

## Trin 1 — Find Figma-noder for trinnet

Slå op i memory `reference_klient_node_ids.md` (skrevet 2026-05-21):

**OBS:** Figma URL bruger `node-id=727-1196` (dash). MCP-kald bruger `nodeId=727:1196` (colon).

### Desktop (canvas 1:4 — 🖥️ Desktop Hi-fi)

| Side | Node ID (MCP) | Bemærkning |
|---|---|---|
| `klient/login.html` | `727:1196` | EK 00 — MitID-login (ingen stepper) |
| `klient/vaelg.html` | `727:1237` | EK 01 — Vælg behandling (genbrug symptom-grid fra booking trin-2) |
| `klient/kalender.html` | `731:1222` | EK 02 — Kalender (genbrug fra booking trin-3) |
| `klient/bekraeft.html` | `731:1335` | EK 03 — Pre-fyldte felter fra journal |
| `klient/booket.html` | `735:1248` | EK 04 — Bekræftelse (genbrug summary-card fra booking trin-5) |

### Mobile (canvas 1:5 — 📱 Mobile Hi-fi)

Mobile node IDs **ikke katalogiseret endnu**. Find dem ved at:

```
mcp__figma__get_metadata fileKey=eURlHeZIgqEZqVaCfyyXEp nodeId=1:5
```

Søg efter "EK Mobil" eller "Klient Mobil" frames og noter de 5 node-IDs i `memory/reference_klient_node_ids.md`.

---

## Trin 2 — Hent screenshots + design context

For hvert trin (samme pattern som booking-flow):

```
mcp__figma__get_screenshot      fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<desktop-id>  maxDimension=1600
mcp__figma__get_screenshot      fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<mobile-id>   maxDimension=1400
mcp__figma__get_design_context  fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<desktop-id>  excludeScreenshot=true
mcp__figma__get_design_context  fileKey=eURlHeZIgqEZqVaCfyyXEp  nodeId=<mobile-id>   excludeScreenshot=true
```

Identificér per trin:
- **Stepper-state** (EK har sandsynligvis 5 steps: Login/Vælg/Tid/Bekræft/Booket)
- **Sektion-bg** (cream/hvid/dark) — EK bruger `.flow-page` layout
- **Interaktive elementer**
- **Submit-CTA placering**

---

## Trin 3 — Verificér eksisterende komponenter er på plads

EK-flow bør **næsten 100% genbruge booking-flow komponenter**. Tjek dem:

```bash
grep -nE "^\.flow-page|^\.flow-card|^\.flow-header|^\.flow-bottom-nav|^\.stepper|^\.symptom-grid|^\.calendar|^\.date-cell|^\.time-slot|^\.form-card|^\.summary-card|^\.akut-row|^\.consult-row" css/styles.css
```

**Etablerede klasser (genbrug, lav ikke nye):**

| Trin | Etableret klasse (samme som booking) |
|---|---|
| Alle 5 trin | `body.flow-page`, `.flow-card`, `.flow-main`, `.stepper*`, `.flow-header*`, `.flow-bottom-nav`, `.flow-card__actions--desktop` |
| Login | `.field*`, `.checkbox*` (måske ingen stepper for trin-0) |
| Vælg | `.symptom-grid*`, `.symptom-sub*` (samme som booking trin-2) |
| Kalender | `.calendar*`, `.date-cell*`, `.time-slot*`, `.booking-summary` (samme som booking trin-3) |
| Bekraeft | `.form-card`, `.field*`, `.cpr-info-box`, `.checkbox*` (samme som booking trin-4) |
| Booket | `.summary-card*`, `.summary-row*`, `.confirmation-title`, `.confirmation-message` (samme som booking trin-5) |

Hvis en klasse mangler: **stop og tjek først i memory og Figma component-instances** — alle nødvendige klasser blev bygget under booking-flow.

---

## Trin 4 — Match strukturen mod Figma

> ⚠️ **Verificér via `get_design_context` for hvert trin før du bygger.**
> EK kan have små afvigelser fra booking-flow (fx stepper-labels: "Login" i stedet for "Intro").

**Per-trin sektion-rækkefølge (provisorisk, baseret på spec sektion 13):**

### Login (`klient/login.html`)
1. Nav (delt)
2. Flow-header mobil: ← Log ind ✕
3. `.flow-card flow-card--narrow`:
   - H1 ("Log ind")
   - MitID-mock knap (primary)
   - Caption "Bruger demo-data — intet gemmes"
   - Subtle link "Ny klient? Book første tid →" til `booking/trin-1.html`
4. (Ingen phone-vejledning på login — hjælp er ikke forventet endnu)

### Vælg (`klient/vaelg.html`) — som booking trin-2 men med EK-stepper
1. Flow-header mobil: ← Vælg ✕
2. Stepper (Login ✓ done, Vælg active, Tid/Bekræft/Booket pending)
3. H1 ("Hvad skal vi behandle i dag?")
4. `.symptom-grid` (samme 6 kategorier som booking trin-2)
5. `.symptom-sub` (samme CSS-only :has-toggle for fod)
6. `.info-card` (samme behandling-info pattern)
7. `.flow-card__actions--desktop`: ← Forrige + Vælg dato og tid →
8. `.flow-card__phone-vejledning`
9. `.flow-bottom-nav` mobil

### Kalender (`klient/kalender.html`) — som booking trin-3
1. Flow-header mobil: ← Kalender ✕
2. Stepper (Login+Vælg done, Tid active)
3. H1 ("Vælg dato og tid")
4. `.akut-row` (samme som booking trin-3)
5. `.consult-row` (samme inline pill-toggle)
6. `.calendar` med fuld måneds-grid + tider
7. `.booking-summary` (2-linje)
8. `.flow-card__actions--desktop`
9. `.flow-card__phone-vejledning`
10. `.flow-bottom-nav` mobil

### Bekraeft (`klient/bekraeft.html`) — som booking trin-4 men felter pre-fyldte
1. Flow-header mobil: ← Bekræft ✕
2. Stepper (Login+Vælg+Tid done, Bekræft active)
3. H1 ("Bekræft dine oplysninger")
4. Body: "Vi har hentet dine oplysninger fra journalen. Tjek venligst at de er korrekte."
5. `.form-card` med pre-fyldte felter (`value="..."` attribut):
   - Navn (readonly?)
   - Email
   - Telefon
   - Symptom-bekræftelse
   - Note-felt (åben for ny tekst)
   - GDPR checkbox (pre-checked false — kræver aktiv accept)
6. `.flow-card__actions--desktop`: ← Forrige + Bekræft booking →
7. `.flow-card__phone-vejledning`
8. `.flow-bottom-nav` mobil

### Booket (`klient/booket.html`) — som booking trin-5
1. Flow-header mobil centred: "Bekræft" (no back/close)
2. Stepper (alle done ✓)
3. H1 ("Din tid er booket ✓") — accent-text-on-light farve
4. Body intro
5. `.summary-card` (samme som booking trin-5)
6. `.confirmation-message` ("Vi glæder os til at se dig! 🙂")
7. Action-row inline: ← Tilbage til forsiden + 📅 Tilføj til kalender

---

## Trin 5 — Tilføj kun nye CSS-klasser hvis nødvendigt

**EK-flow bør ikke kræve nye klasser** — alt er på plads fra booking-flow.

Undtagelser kan være:
- `.mitid-button` (hvis MitID-mock kræver special-styling) → placér i sektion 17
- `.field--readonly` modifier (hvis pre-fyldte felter skal vises som låst)
- `.flow-card--narrow` (allerede etableret — brug til login)

Hvis du SKAL tilføje en klasse:
- Placér i `css/styles.css` sektion 17 (Booking-specific) — IKKE sektion 25
- WCAG-fixede tokens på lys bg:
  - Tekst-accent: `var(--accent-text-on-light)`
  - Border: `var(--border-light)` (UI-borders 3:1) eller `var(--border-light-figma)` (dekorativ)

---

## Trin 6 — Rewrite HTML

**Vigtigste principper (lært fra booking-flow):**

1. **Behold delt chrome** — nav, footer, skip-link, FAB rør du ikke
2. **`body class="flow-page"`** er allerede sat på alle 5 EK-sider — behold den
3. **Mobile flow-header** bruger:
   - Trin login + vælg + kalender + bekraeft: full pattern med back + title + close
   - Trin booket: `.flow-header--centered` (kun title, ingen back/close)
4. **Stepper EK-labels:**
   ```html
   <li class="stepper__step stepper__step--done">
     <span class="stepper__circle" aria-hidden="true">✓</span>
     <span class="stepper__label">Login</span>
   </li>
   <!-- aktiv ved at have klassen --active + aria-current="step" -->
   ```
5. **Symptom-sub CSS-only toggle:** Husk at FJERNE `hidden` attribut hvis du vil have CSS `:has()` til at vise/skjule. Hold `data-js-sub-for="fod"` hook intakt.
6. **CTA-pattern:** Forrige + Næste på desktop (`.flow-card__actions--desktop`), sticky bottom-nav på mobil (`.flow-bottom-nav`).
7. **Phone-vejledning** på alle trins UNDTAGEN booket (matcher booking-flow pattern).
8. **Initial-skjult indhold:** brug `hidden` attribut (men ikke på CSS-only-toggled elementer).
9. **Pre-fyldte felter på bekraeft:** brug `value="..."` på inputs, men IKKE `readonly` (brugeren skal kunne korrigere). Tilføj caption "Hentet fra journal" hvis Figma viser det.

---

## Trin 7 — Verificér i preview

Samme pattern som booking-flow:

```
preview_start name=grocott
preview_resize width=1440 height=900    # Desktop
preview_eval expression="window.location.href = window.location.origin + '/klient/login.html'"
preview_screenshot
preview_resize width=390 height=844     # Mobil
preview_screenshot
```

### Verifikationsliste per trin

- [ ] **Horizontal overflow:** `document.documentElement.scrollWidth - window.innerWidth === 0` på både 1440 + 390
- [ ] **Flow-page bg:** body har `bg-light` (cream)
- [ ] **Flow-card bg:** hvidt
- [ ] **Stepper viser korrekt EK-state** (done/active/upcoming per trin)
- [ ] **H1 på hvert trin matcher Figma**
- [ ] **CTA-pattern:** Forrige+Næste på desktop, sticky bottom-nav på mobil
- [ ] **Form-felter har `label`, `required`, `autocomplete`, `aria-describedby`** (på bekraeft)
- [ ] **`data-js-*` hooks** placerede til Louises wiring
- [ ] **WCAG-tokens** brugt korrekt (`var(--accent-text-on-light)` på links, H1 booket)
- [ ] **Mobile:** stepper-labels skjult under 768px, 2-kol symptom-grid (ikke 1-kol)
- [ ] **Touch-target ≥ 44×44** (date-cell, time-slot, checkbox, info-trigger)
- [ ] **Tab-rækkefølge logisk** (test med Tab-tasten)

### Preview-server gotchas (lært af booking-flow)

- Tjek serveren kører fra DIN worktree: `lsof -p <pid> | grep cwd`
- Hvis 8765/8766/8767 er optaget af andre worktrees: opdatér `.claude/launch.json` til næste ledige port (men commit IKKE port-ændringen)
- CSS-cache: force-reload via `window.location.reload()` efter CSS-changes

---

## Almindelige fejl (undgå)

| Fejl | Hvorfor | Fix |
|---|---|---|
| Lave ny `.summary-card`-variant | Allerede etableret i booking trin-5 | Genbrug direkte; tilpas tekst-værdier |
| Glemme EK-stepper-labels | Booking-stepper bruger "Intro/Symptomer/Tid/Oplysninger/Bekræft", EK bruger "Login/Vælg/Tid/Bekræft/Booket" | Læs Figma-screenshot for hvert trin |
| Skrive JS i `js/main.js` | Louises filer | Brug `data-js-*` hooks; lad Louise wire |
| Bruge `.is-active` / `.has-error` | Sektion 25 = Louises | Brug `aria-current` / `aria-invalid` |
| `display:none` i HTML inline-style | Bryder Louises toggle-logik | Brug `hidden` attribut |
| Ignorere Figma's stepper-state | Brydes konsistens på tværs af trin | Match `--active/--done` mod Figma's visuelle state |
| Glemme `aria-current="step"` på active | A11y-fejl | Tilføj på active stepper-li |
| Tilføje `class="sr-only"` på legend uden `:not(.sr-only)` exception | 564px horizontal overflow | Allerede fixed i `.consult-toggle > legend:not(.sr-only)` — undgå nye legends med sr-only på fieldsets med eksisterende legend-rules |
| Bevare phone-vejledning på booket | Matcher ikke Figma trin-5 | Fjern phone-vejledning på final-success-trin |

---

## Anbefalet rækkefølge

1. **Login** — simpel side, godt onboarding for EK-mønstret
2. **Booket** — bekræftelses-side er statisk (ingen form), god at få ud af vejen
3. **Bekraeft** — form-fokus med pre-fyldte felter
4. **Vælg** — symptom-grid genbrug
5. **Kalender** — mest kompleks (allerede gennemarbejdet i booking trin-3)

Eller gå sekventielt: login → vælg → kalender → bekraeft → booket (samme rækkefølge som booking-flow).

Efter alle 5 trin er færdige: **gennemgå hele EK-flowet i preview** med Tab-keyboard navigation for at sikre logisk fokus-rækkefølge.

---

## TL;DR — Quick-start til ny session

```
1. Læs docs/workflows/klient-flow-iteration.md (denne fil)
2. Læs spec sektion 13 (Louises EK-plan) for det trin du arbejder på
3. Slå Figma node-ID op i memory reference_klient_node_ids.md
   (mobil-IDs skal måske findes først via get_metadata på canvas 1:5)
4. Hent screenshot + get_design_context for desktop + mobil
5. Tjek etablerede klasser i css/styles.css sektion 17 + 19
   (alle nødvendige klasser er på plads fra booking-flow)
6. Skriv HTML med form-semantik + data-js-* hooks + aria-attributter
7. Lad ALT der kræver JS være "synligt statisk" — Louise wire'r dynamikken
8. Verificér i preview ved 1440 + 390 med tab-keyboard test
9. Tjek horizontal overflow: doc.scrollWidth - innerWidth === 0
10. Commit på branch — flag eksplicit hvilke data-js-* hooks Louise skal kende til
11. Spørg Caroline efter hvert trin før du fortsætter
```
