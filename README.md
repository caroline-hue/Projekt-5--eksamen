# Grocott Fysioterapi & Sundhedshus

Statisk hjemmeside for fysioterapeut-klinik i Langeskov.
Eksamensaflevering, UCL Multimediedesigner 2. semester, maj 2026.

**Studerende:** Caroline Amundsen og Louise Langergaard

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

| Token                    | Figma              | Build                                  | Begrundelse            |
| ------------------------ | ------------------ | -------------------------------------- | ---------------------- |
| `border-light` (UI)      | #E2D8CC            | #C5B8A8                                | WCAG 1.4.11 (3:1)      |
| `star` på lys bg         | #E8960E            | #C77B0A                                | WCAG 1.4.3 (4.5:1)     |
| `accent` tekst på lys bg | bruges direkte     | erstattes med `accent-hover` (#B84E10) | WCAG 1.4.3             |
| H1 størrelse             | spec'en sagde 48px | 42px (Figma er sandhed)                | Figma variable         |
| CPR-felt                 | plain text         | `type="password"`                      | Sundhedsdata-maskering |

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
