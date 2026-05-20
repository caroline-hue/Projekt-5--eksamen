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
