# Billeder

Dette projekt bruger SVG-placeholders som standard. Når du har rigtige fotos
klar, skal du:

1. Eksportere i de størrelser der står herunder (mindst @2x for retina)
2. Lægge `.webp` (primært) eller `.jpg` (fallback) i denne mappe med samme
   navn som SVG'en
3. Ændre `src=""` attributten i de relevante HTML-filer (eller skifte til
   `<picture>` med WebP + JPG kilder)

---

## 🛍️ Shopping-liste — 18 unikke billeder

Sorteret efter prioritet (top = mest synligt).

### 1. Nicolai-portrætter (4 shots)

| # | Filnavn | Slot | Aspect | Eksportstørrelse @2x | Crop-vejledning |
|---|---|---|---|---|---|
| 1 | `hero-photo.jpg` | `index.html` hero | 570:500 (≈1.14:1) | **1140×1000 px** | Nicolai i klinikken, behandler eller står ved briks |
| 2 | `nikolai-hero.jpg` | `om-nikolai.html` hero | 700:800 (0.875:1) | **1400×1600 px** | Portræt-orientering, gerne neutral baggrund |
| 3 | `video-thumbnail-landing.jpg` | Landing "Mød fysioterapeut" | 5:4 (1.25:1) | **1200×960 px** | Cover-frame fra introvideo |
| 4 | `video-thumbnail-om.jpg` | `om-nikolai.html` video-hero | 16:9 (1.78:1) | **1920×1080 px** | Samme video, men widescreen-crop |

### 2. Behandlingssituationer (7 shots)

| # | Filnavn | Slot | Aspect | Eksportstørrelse @2x | Crop-vejledning |
|---|---|---|---|---|---|
| 5 | `nikolai-tilgang.jpg` | "Min tilgang" på alle 6 behandlinger + `klient/login.html` | 1:1 | **1200×1200 px** | Universal — Nicolai i behandlingssituation |
| 6 | `rygsmerter-hero.jpg` | `behandlinger/rygsmerter.html` | 2:1 (panorama) | **1160×580 px** | Behandling af ryg på briks |
| 7 | `skulder-hero.jpg` | `behandlinger/skulder-nakke.html` | 2:1 | **1160×580 px** | Skulder/nakke-behandling |
| 8 | `kaebe-hero.jpg` | `behandlinger/kaebe-hoved.html` | 2:1 | **1160×580 px** | Kæbe-/hovedpine-behandling |
| 9 | `knae-hero.jpg` | `behandlinger/knae-hofter.html` | 2:1 | **1160×580 px** | Knæ-/hofte-behandling |
| 10 | `fod-hero.jpg` | `behandlinger/fod.html` | 2:1 | **1160×580 px** | Fod-behandling |
| 11 | `massage-hero.jpg` | `behandlinger/massage.html` | 2:1 | **1160×580 px** | Sportsmassage |

### 3. Behandlings-kort på landing (6 thumbnails)

CSS: `aspect-ratio: 320 / 200` (8:5 landscape). Vises i scroll-row på `index.html`.

| # | Filnavn | Aspect | Eksportstørrelse @2x | Indhold |
|---|---|---|---|---|
| 12 | `card-rygsmerter.jpg` | 8:5 | **640×400 px** | Ryg-tema (kan være en detalje af #6) |
| 13 | `card-skulder.jpg` | 8:5 | **640×400 px** | Skulder-tema |
| 14 | `card-hoved.jpg` | 8:5 | **640×400 px** | Kæbe/hoved-tema |
| 15 | `card-knae.jpg` | 8:5 | **640×400 px** | Knæ-tema |
| 16 | `card-fod.jpg` ⚠️ MANGLER pt. | 8:5 | **640×400 px** | Fod-tema (genbruger card-rygsmerter pt.) |
| 17 | `card-massage.jpg` ⚠️ MANGLER pt. | 8:5 | **640×400 px** | Massage-tema (genbruger card-skulder pt.) |

### 4. Kort (1 statisk billede eller embed)

| # | Filnavn | Slot | Aspect | Eksportstørrelse @2x | Note |
|---|---|---|---|---|---|
| 18 | `map-placeholder.jpg` | Landing + flere sider | 3:2 desktop / 342:200 mobil | **1200×800 px** | Google Maps screenshot ELLER erstattes af iframe-embed via JS senere |

---

## 🏷️ Logoer (PNG — eksisterer allerede)

| Filnavn | Slot | Faktisk størrelse | Eksportstørrelse @2x |
|---|---|---|---|
| `logo-desktop.png` | Nav desktop (56px) + Footer (48px) + Hero landing (90px) | varierende | Ideelt SVG. Hvis PNG: 360×ø |
| `logo-mobile.png` | Nav <768px (40px) | 40px høj | 160×ø |
| `logo.svg` | Pt. ikke i brug | — | — |

**Anbefaling:** Lav en SVG-version af logoet. Så slipper du for at vedligeholde flere PNG-eksports — én SVG renderer skarpt på alle størrelser inkl. retina.

---

## 📐 Format-anbefaling

- **WebP** primært (30-40% mindre end JPG, supportet i alle moderne browsere)
- **JPG fallback** via `<picture>`-element hvis du vil understøtte ældre browsere
- **Komprimering:** sigt mod 80-150 KB pr. hero-billede efter komprimering — brug [Squoosh.app](https://squoosh.app) (gratis browser-tool)
- **Alt-tekst:** behold de eksisterende alt-tekster i HTML — de er allerede skrevet til screen readers og er en del af WCAG-compliance

---

## 🔄 Sådan skifter du SVG ud med rigtigt foto

### Simpel udskiftning (ét format)
1. Læg `hero-photo.jpg` (eller `.webp`) i `/images/`
2. Find HTML-linje: `<img src="images/hero-photo.svg" alt="...">`
3. Skift til: `<img src="images/hero-photo.jpg" alt="...">`
4. Behold `alt`-teksten

### Med WebP + JPG fallback (anbefalet for hero-billeder)
```html
<picture>
  <source srcset="images/hero-photo.webp" type="image/webp">
  <img src="images/hero-photo.jpg" alt="Nicolai Grocott behandler en klient i klinikken i Langeskov">
</picture>
```

### Med responsive sizes (avanceret — bedre performance på mobil)
```html
<picture>
  <source media="(max-width: 767px)" srcset="images/hero-photo-mobile.webp" type="image/webp">
  <source srcset="images/hero-photo.webp" type="image/webp">
  <img src="images/hero-photo.jpg" alt="...">
</picture>
```

---

## ⚠️ Vigtigt før upload

1. **Tjek aspect-ratio** mod tabellen ovenfor — hvis dit foto ikke matcher, vil CSS croppe det med `object-fit: cover` (kan miste vigtige dele)
2. **Behold filnavnet** — alt HTML peger på de eksisterende navne. Hvis du ændrer navn, skal HTML også opdateres
3. **Mindst @2x** — alle størrelser ovenfor er ALLEREDE @2x for retina. Eksportér gerne @3x hvis kilden tillader (1.5× tabellens tal)
4. **GDPR:** Hvis billedet viser en genkendelig klient, skal du have skriftlig samtykke fra personen før upload

---

*Sidst opdateret: 2026-05-21 — i takt med spec sektion 7 og CSS landing-iteration.*
