# Behandling-side replikering — kanonisk template fra rygsmerter

**Mission:** Bring `behandlinger/{skulder-nakke,kaebe-hoved,knae-hofter,fod,massage}.html` til samme layout som `behandlinger/rygsmerter.html` efter Round A–F polish. Kun **tekst** og **billed-paths** varieres per side. **Layout-strukturen + CSS er kanonisk og må IKKE ændres** uden eksplicit godkendelse.

**Kanonisk reference:** `behandlinger/rygsmerter.html` på commit `7901d65` (eller senere).

**6 commits der definerer kanoniseringen** (læs commit-beskeder for kontekst):
- `938d6a6` Round-A: slet dark hero, foto-aspect, bg-rytme
- `955fb46` Round-B: symptomer/tilgang/cross-link/CTA per Figma
- `9a9826c` Round-C: tilgang+CTA-band tilbage til blå
- `93c1545` Round-D: stretch + hero foto større
- `ca1fe08` Round-E: H2 + quote samlet i venstre col
- `7901d65` Round-F: hero aspect 4/3 + tilgang H2 top-aligner

---

## ⚠️ Hårde bindinger (læs FØR du rør noget)

| Binding | Hvor | Hvorfor |
|---|---|---|
| Layout-strukturen er låst | HTML-sektioner i nøjagtig rækkefølge | Layout er Figma-matched og approved |
| CSS-classes er låste | `.symptom-checks`, `.quote-card`, `.tilgang-row`, `.cross-link-card`, `.cta-bund` etc. | Findes allerede + bruges på andre sider |
| Sektion-bg-rytme | cream/cream/WHITE/cream/WHITE/cream/WHITE/cream/dark/cream | Caroline approved efter visuel review |
| `aria-labelledby` IDs er låste | `hvad-title`, `symptomer-title`, `forloeb-title`, `testimonials-title`, `tilgang-title`, `pris-title`, `faq-title`, `andre-title`, `ring-title`, `find-title` | Scoped CSS i `styles.css` (især `section[aria-labelledby="hvad-title"] .grid--2col`) targeter disse IDs — ændringer = brudt layout |
| Hero-foto aspect 4/3 + asymmetrisk grid 1fr 1.25fr | Automatisk via scoped CSS | Caroline valgte "mindre aflangt" |
| Tilgang quote-card er **mørk navy** (`.quote-card` uden modifier) | `.quote-card.quote-card--light` modifier eksisterer men bruges IKKE | Caroline reverterede til blå i Round-C |

**Ikke-rør liste:**
- `css/styles.css` — alle nuværende rygsmerter-relaterede regler (search for "rygsmerter" eller "hvad-title" i comments)
- `js/main.js`, `data/reviews.json` — Carolines territorium
- `index.html`, `om-nikolai.html` — andre approved sider
- Footer + nav i hver behandling-side — standard, urørt

---

## 📋 Sektion-rækkefølge (i nøjagtig denne orden)

```
1. <section class="section" aria-labelledby="hvad-title">           cream   Hero-intro (h2 + p + img)
2. <section class="section" aria-labelledby="symptomer-title">      cream   Kender du det her? (6 ✓-cards)
3. <section class="section section--white" aria-labelledby="forloeb-title">    WHITE   Fra første besøg (3 steps)
4. <section class="section" aria-labelledby="testimonials-title">   cream   Rigtige klienter (3 reviews)
5. <section class="section section--white" aria-labelledby="tilgang-title">    WHITE   Min tilgang (h2 + quote + foto)
6. <section class="section" aria-labelledby="pris-title">           cream   Hvad koster (pris-rows)
7. <section class="section section--white" aria-labelledby="faq-title">        WHITE   Spørgsmål (accordion)
8. <section class="section" aria-labelledby="andre-title">          cream   Hænger sammen med (cross-link)
9. <section class="section section--cta-bund" aria-labelledby="ring-title">   DARK    Klar til at booke (centreret CTA)
10. <section class="section section--find" aria-labelledby="find-title">       cream+map  Find vej (urørt template)
```

Footer kommer EFTER `</main>` — urørt template.

---

## 🛠 Arbejdsprocedure per side

### Trin 0 — Worktree + branch (anbefalet)
```bash
cd /Users/carolinekristiansen/Documents/Projekt-5--eksamen
git checkout -b feat/behandling-{skulder|kaebe|knae|fod|massage}
```

### Trin 1 — Kopier rygsmerter som baseline
```bash
cp behandlinger/rygsmerter.html behandlinger/{TARGET}.html
```
Hvor `{TARGET}` = `skulder-nakke`, `kaebe-hoved`, `knae-hofter`, `fod`, eller `massage`.

> **OBS:** `skulder-nakke.html` eksisterer allerede (færdig i tidligere session) men matcher IKKE den kanoniske rygsmerter-template. Beslut FØR kopiering: bevar gamle skulder-nakke som arkiv (`git mv skulder-nakke.html skulder-nakke.html.bak`), eller overskriv direkte. Anbefaling: overskriv + verificer at intet er tabt.

### Trin 2 — Udskift indhold (kun tekst + img-paths)

Gå nedad i HTML'en og udskift **kun** følgende per sektion:

#### Sektion 1 — `aria-labelledby="hvad-title"`
- `<title>` tag i `<head>` (search 'Rygsmerter' → erstat)
- `<h2 id="hvad-title">Hvad er rygsmerter?</h2>` → **`Hvad er {behandling}?`**
- Paragraf-tekst (1 sætning der introducerer behandlingen)
- `<img src="../images/hero-rygmassage.jpg" alt="Foto: behandling af rygpatient på briks">` → ny img-path + alt

#### Sektion 2 — `aria-labelledby="symptomer-title"`
H2 forbliver **"Kender du det her?"**. Udskift 6 `<li class="symptom-check">`-labels:
```html
<li class="symptom-check"><span class="symptom-check__icon" aria-hidden="true">✓</span><span class="symptom-check__label">{SYMPTOM}</span></li>
```

#### Sektion 3 — `aria-labelledby="forloeb-title"`
- H2: `Fra første besøg til færre rygsmerter` → **`Fra første besøg til færre {smerte-type}`**
- 3 steps i `<ol class="step-list step-list--horizontal">` — ofte ens på tværs af behandlinger, men kan tilpasses

#### Sektion 4 — `aria-labelledby="testimonials-title"`
H2 forbliver **"Rigtige klienter. Rigtige resultater."**. 3 `<figure class="review-card">`-blokke — tilpas quotes og navne efter behandling (eller behold generiske).

#### Sektion 5 — `aria-labelledby="tilgang-title"`
- H2: `Min tilgang til rygbehandling` → **`Min tilgang til {behandling}`**
- `<blockquote class="quote-card">` quote-tekst — citat fra Nicolai om hans tilgang til DENNE specifikke behandling
- `<img class="tilgang-photo">` — ny img-path + alt

#### Sektion 6 — `aria-labelledby="pris-title"`
- H2: `Hvad koster behandling af rygsmerter?` → **`Hvad koster behandling af {smerte-type}?`**
- Pris-rows: typisk **uændret** (samme priser på tværs af behandlinger)

#### Sektion 7 — `aria-labelledby="faq-title"`
- H2: `Spørgsmål om behandling af rygsmerter` → **`Spørgsmål om behandling af {smerte-type}`**
- 4 `<details class="accordion__item">` — FAQ specifik per behandling

#### Sektion 8 — `aria-labelledby="andre-title"`
- H2 forbliver **"Hænger smerterne sammen med noget andet?"**
- Cross-link-card target: rygsmerter linker til `skulder-nakke.html` — find passende relateret behandling per side (se tabel nedenfor)

#### Sektion 9 — `aria-labelledby="ring-title"` (CTA-bund)
**UÆNDRET** — copy: "Klar til at booke en tid?" + "Book din første tid — jeg anbefaler 60 minutter, så vi har god tid til at lære hinanden at kende." + Book-knap.

#### Sektion 10 — `aria-labelledby="find-title"` (Find vej)
**UÆNDRET** — adresse, kort, åbningstider.

---

## 📊 Per-side content-matrix (foreslag — verificér med Figma før commit)

### skulder-nakke.html

| Slot | Indhold |
|---|---|
| `<title>` | `Skulder og nakke · Grocott Fysioterapi` |
| Sek 1 H2 | `Hvad er skulder- og nakkesmerter?` |
| Sek 1 paragraf | `Spændinger, frossen skulder, museskader og nedsat bevægelighed kan have mange årsager. Læs videre om symptomer, et typisk forløb, og hvordan jeg arbejder med årsagen.` |
| Sek 1 img | `../images/behandling-skulder-nakke.jpg` (verificér filnavn) |
| Sek 2 — 6 symptomer | Frossen skulder · Spændingshovedpine fra nakken · Smerter ved museklik / tastatur · Nedsat bevægelighed i nakken · Smerter ved at løfte armen · Knaster og ømme punkter |
| Sek 3 H2 | `Fra første besøg til færre skulder-nakke-smerter` |
| Sek 5 H2 | `Min tilgang til skulder- og nakkebehandling` |
| Sek 5 quote | `"Skulder og nakke hænger næsten altid sammen — og ofte med kæben. Jeg løsner det fastlåste og styrker det svage, så du kan dreje hovedet uden ubehag igen."` |
| Sek 5 img | `../images/tilgang-skulder.jpg` (verificér) |
| Sek 6 H2 | `Hvad koster behandling af skulder- og nakkesmerter?` |
| Sek 8 cross-link | → `kaebe-hoved.html` "Kæbe og hovedpine" |

### kaebe-hoved.html

| Slot | Indhold |
|---|---|
| `<title>` | `Kæbe og hovedpine · Grocott Fysioterapi` |
| Sek 1 H2 | `Hvad er kæbe- og hovedpinebesvær?` |
| Sek 1 paragraf | `Kæbeled-dysfunktion, spændingshovedpine og migræne-relaterede smerter. Kæben og nakken hænger ofte sammen — jeg arbejder med begge dele samtidigt.` |
| Sek 1 img | `../images/behandling-kaebe-hoved.jpg` (verificér) |
| Sek 2 — 6 symptomer | Kæbeled-låsning · Smerte ved at tygge · Tilbagevendende spændingshovedpine · Migræne-lignende anfald · Tænderskæren om natten · Ondt foran øret |
| Sek 3 H2 | `Fra første besøg til færre hovedpine-anfald` |
| Sek 5 H2 | `Min tilgang til kæbe- og hovedpinebehandling` |
| Sek 5 quote | `"Smerten føles ofte ét sted, men kommer et andet. Jeg arbejder helhedsorienteret med kæbe, nakke og kraniets bevægelighed samtidigt."` |
| Sek 5 img | `../images/tilgang-kaebe.jpg` (verificér) |
| Sek 6 H2 | `Hvad koster behandling af kæbe- og hovedpinebesvær?` |
| Sek 8 cross-link | → `skulder-nakke.html` "Skulder og nakke" |

### knae-hofter.html

| Slot | Indhold |
|---|---|
| `<title>` | `Knæ og hofter · Grocott Fysioterapi` |
| Sek 1 H2 | `Hvad er knæ- og hoftesmerter?` |
| Sek 1 paragraf | `Slidgigt, løbeskader, brusk-problemer og smerter ved trapper eller lange ture. Jeg ser på hele bevægekæden, ikke kun leddet der gør ondt.` |
| Sek 1 img | `../images/behandling-knae-hofter.jpg` (verificér) |
| Sek 2 — 6 symptomer | Smerte ved at gå op/ned ad trapper · Stivhed efter længere stillesidning · Knasende lyde i knæet · Smerter efter løb · Hævelse efter belastning · Følelse af ustabilitet |
| Sek 3 H2 | `Fra første besøg til færre knæ- og hoftesmerter` |
| Sek 5 H2 | `Min tilgang til knæ- og hoftebehandling` |
| Sek 5 quote | `"Knæet er sjældent skurken alene — vi kigger på fødder, hofter og ryg samtidigt, så du får langtidsholdbar smertefrihed."` |
| Sek 5 img | `../images/tilgang-knae.jpg` (verificér) |
| Sek 6 H2 | `Hvad koster behandling af knæ- og hoftesmerter?` |
| Sek 8 cross-link | → `rygsmerter.html` "Rygsmerter" |

### fod.html

| Slot | Indhold |
|---|---|
| `<title>` | `Fod-problematikker · Grocott Fysioterapi` |
| Sek 1 H2 | `Hvad er fodsmerter?` |
| Sek 1 paragraf | `Plantar fasciitis, hælspore, achillessene-problemer og fodsmerter ved gang. Indlægssåler kan være en del af løsningen — men sjældent hele svaret.` |
| Sek 1 img | `../images/behandling-fod.jpg` (verificér) |
| Sek 2 — 6 symptomer | Stikkende smerte under hælen om morgenen · Smerte i achillessenen efter løb · Brændende fornemmelse i forfoden · Smerter ved længere stående · Hård hud eller knyster · Følelsesløshed/snurren |
| Sek 3 H2 | `Fra første besøg til færre fodsmerter` |
| Sek 5 H2 | `Min tilgang til fodbehandling` |
| Sek 5 quote | `"Fødderne bærer alt. Når de gør ondt, viser det sig opefter — i knæ, hofter, ryg. Jeg behandler årsagen, ikke kun fodsymptomet."` |
| Sek 5 img | `../images/tilgang-fod.jpg` (verificér) |
| Sek 6 H2 | `Hvad koster behandling af fodsmerter?` |
| Sek 8 cross-link | → `knae-hofter.html` "Knæ og hofter" |

### massage.html

| Slot | Indhold |
|---|---|
| `<title>` | `Massage · Grocott Fysioterapi` |
| Sek 1 H2 | `Hvad er fysioterapeutisk massage?` |
| Sek 1 paragraf | `Afspændende og dybdegående behandling der løsner muskelspændinger, forbedrer blodgennemstrømning og giver dig en pause fra hverdagens stress. Bruges som tilskud til andre forløb eller alene.` |
| Sek 1 img | `../images/behandling-massage.jpg` (verificér) |
| Sek 2 — 6 symptomer | Generelt højt stress-niveau · Muskelspændinger i nakke/skuldre · Søvnproblemer · Begrænset bevægelighed · Restitution efter sport · Tilbagevendende muskelknuder |
| Sek 3 H2 | `Fra første besøg til mere afspændt krop` |
| Sek 5 H2 | `Min tilgang til massage` |
| Sek 5 quote | `"Massage er ikke en luksus — det er en del af god rehabilitering. Jeg tilpasser tryk og teknik efter hvad din krop har brug for den dag."` |
| Sek 5 img | `../images/tilgang-massage.jpg` (verificér) |
| Sek 6 H2 | `Hvad koster en massage?` |
| Sek 8 cross-link | → `skulder-nakke.html` "Skulder og nakke" |

---

## 🖼️ Billed-krav

| Billed-rolle | Aspect-ratio (auto-cropped af CSS) | Min anbefalet natural-størrelse |
|---|---|---|
| Sek 1 hero | 4/3 (cropped fra natural via `object-fit: cover`) | 1200×900 eller bedre |
| Sek 5 tilgang | 624/380 (cropped) | 1200×900 eller bedre |

Verificér billed-filer findes i `images/`. Hvis manglende: brug `hero-rygmassage.jpg` + `tilgang-ryg.jpg` som fallback indtil ægte billeder uploades.

**Object-position tuning** (per side): hvis Nicolai croppes forkert i hero, override per-side via inline `style="object-position: center 30%"` på `<img>` — eller tilføj scoped CSS i en kommenteret blok i bunden af `styles.css`. Brug `center 50%` som default (matcher rygsmerter).

---

## 🔬 Verificering — gennemfør PER side før commit

### Desktop 1440
```js
// I preview console / preview_eval:
({
  overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  sections: Array.from(document.querySelectorAll('main section')).map(s => ({
    id: s.getAttribute('aria-labelledby'),
    bg: getComputedStyle(s).backgroundColor
  })),
  heroPhoto_aspect: getComputedStyle(document.querySelector('section[aria-labelledby="hvad-title"] img')).aspectRatio,
  tilgangH2_top: Math.round(document.querySelector('#tilgang-title').getBoundingClientRect().top),
  tilgangPhoto_top: Math.round(document.querySelector('.tilgang-photo').getBoundingClientRect().top)
})
```

**Forventede resultater:**
- `overflowX: 0`
- Bg-rytme (i orden): cream/cream/WHITE/cream/WHITE/cream/WHITE/cream/dark/cream
- `heroPhoto_aspect: "4 / 3"`
- `tilgangH2_top === tilgangPhoto_top` (delta 0px)

### Mobil 375
- `overflowX: 0`
- Grid-kolonner stacker til 1-kol (default behavior)
- Symptom-checks går fra 3-col → 1-col (auto via media query)

### Visuel check
- Hero: hele Nicolai (face + torso + hænder/handling) synlig
- Symptom-checks: 6 cards i 3×2 grid (desktop), orange ✓-cirkler
- Forløb: 3 numbered steps (orange cirkler 1/2/3)
- Tilgang: dark navy quote-card til venstre med H2 ovenover (top-aligned med foto), foto til højre
- Pris: 4 rows fylder fuld container-bredde
- FAQ: orange chevron-pile (28px)
- CTA-bund: dark navy bg, centreret content, orange Book-knap
- Footer: dark, 4-col med brand/Navigation/Kontakt/Information

---

## 🚫 Almindelige fejl der skal undgås

1. **Ikke ændr `aria-labelledby` IDs** — scoped CSS targeter dem
2. **Ikke fjern `class="section section--white"`** fra forløb/tilgang/faq (bryder bg-rytme)
3. **Ikke tilføj `quote-card--light` modifier** — Caroline reverterede den (Round-C)
4. **Ikke ændr container-bredder** — `.container` default 1200, scoped overrides håndteres centralt
5. **Ikke skift `section--cta-bund` til `section--cta-ring`** — det er den nye Klar-til-at-booke (ikke den gamle Usikker?-bare-ring)
6. **`.pris-rows` skal IKKE have inline `style="max-width:..."`** — fjernet i Round-C for alignment
7. **`.grid--2col.tilgang-row` skal have `align-items: start`** — IKKE center eller stretch (Caroline ville have H2 top-aligned)
8. **Hero-foto skal IKKE være 624/380 aspect** — det er 4/3 efter Round-F
9. **Sletp IKKE dark hero-section** — den er allerede slettet i Round-A. Top-section ER nu "Hvad er X?"

---

## 📦 Commit-stil per side

```bash
git add behandlinger/{SIDE}.html
git commit -m "feat(behandlinger/{SIDE}): replikér kanonisk rygsmerter-layout

Bring til samme layout som rygsmerter.html (commit 7901d65):
- Sek 1 hero, sek 2 symptomer, sek 3 forløb, sek 4 reviews,
  sek 5 tilgang, sek 6 pris, sek 7 faq, sek 8 cross-link,
  sek 9 CTA-bund, sek 10 find vej
- Bg-rytme cream/cream/WHITE/cream/WHITE/cream/WHITE/cream/dark/cream
- Hero-foto aspect 4/3, tilgang H2 top-aligner med foto

Verificeret 1440 + 375 mobile, overflowX=0."
```

---

## 🆘 Hvis du støder på et problem

1. **Læs commit-historikken for rygsmerter:**
   ```bash
   git log --oneline behandlinger/rygsmerter.html
   ```
2. **Sammenlign med kanonisk template:**
   ```bash
   diff behandlinger/rygsmerter.html behandlinger/{SIDE}.html
   ```
   Skal kun vise TEKST + IMG-PATH ændringer. Hvis du ser CSS-class diffs eller section-struktur-diffs — du har fejlet en kopiering.

3. **Hvis Figma viser noget der ikke matcher kanonisk template:**
   Kanonisk template VINDER. Spørg Caroline før du ændrer struktur.

---

## ✅ Færdigt når...

- [ ] 5 behandling-sider opdateret (`skulder-nakke`, `kaebe-hoved`, `knae-hofter`, `fod`, `massage`)
- [ ] Hver side har 6 commits-værdig kvalitet (matcher rygsmerter)
- [ ] Hver side verificeret på 1440 + 375 viewport, `overflowX === 0`
- [ ] Cross-link-card peger til en logisk relateret behandling
- [ ] Alle hero + tilgang billeder er reelle filer (ikke 404)
- [ ] Page-title i `<head>` matcher behandling-navnet
