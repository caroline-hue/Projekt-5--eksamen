# JS-handoff til Louise

Hej Louise — det her dokument er din 1-page guide til at komme i gang med JavaScript-delen
af Grocott-projektet. **Læs spec'en for detaljer, men start her.**

---

## 📚 Læs først (i denne rækkefølge)

1. **Dette dokument** (5 min — workflow + gotchas)
2. **`docs/superpowers/specs/2026-05-20-grocott-fysioterapi-design.md` sektion 8** (15 min — den fulde JS-plan)
3. **`js/main.js`** (10 min — skeletonet med 20 TODO-blokke)

Spec'ens sektion 8 har en sektion-for-sektion gennemgang af landing page + alle bookingtrin med selectorer, mock-data, og pseudokode klar til implementering.

---

## 🌿 Branching workflow

```bash
# Hent koden
git clone <repo-url>
cd Projekt-5--eksamen

# Lav din feature-branch fra main
git checkout -b feature/js-main
git push -u origin feature/js-main

# Arbejd, commit, push. Når du er færdig med en logisk del:
git add js/main.js css/styles.css        # KUN disse to filer (se ejerskab nedenfor)
git commit -m "feat(js): implement <funktion>"
git push

# Når du er klar til review: åbn PR mod main på GitHub
```

**Rebase rytme:** Pull `main` ind i din branch 1-2 gange om ugen så vi ikke divergere:
```bash
git checkout feature/js-main
git fetch origin
git rebase origin/main
```

---

## 📁 Fil-ejerskab (kritisk for merge-safety)

| Fil | Du ejer | Caroline ejer |
|---|---|---|
| `js/main.js` | ✅ 100% | — |
| `css/styles.css` sektion **25. JS State Classes** (bunden) | ✅ tilføj dine `.is-*`/`.has-*` regler her | — |
| `css/styles.css` sektion 1-24 | Læs | ✅ 100% |
| Alle `.html`-filer | Tilføj `id`, `data-js-*`, `aria-*`, `hidden` | ✅ Struktur + tekst + klasser |
| `images/`, `README.md`, `docs/` | Læs | ✅ |

**Hvis du har brug for nyt UI** (modal-skeleton, ekstra knap osv.): ping Caroline først så hun bygger HTML+CSS, og du wire'r JS efter. Modsat rækkefølge bryder hendes design-system.

---

## 🏷️ Naming conventions (uddrag — fuld liste i spec sektion 8.2)

**State classes** — kun dig, kun i sektion 25:
- `.is-active` (valgt kalender-celle, time-slot)
- `.is-hidden` (JS-skjult element)
- `.is-loading`, `.has-error`
- `body.has-open-menu`, `body.has-open-modal`, `body.has-open-dropdown`

**Foretrukket toggle-pattern:** Skift `aria-expanded` / `aria-pressed` / `hidden`-attributter — IKKE klasser. CSS er allerede styled mod `[aria-expanded="true"]` og `[hidden]`. Dette giver gratis a11y + matcher det mønster der allerede er etableret.

**Data hooks** — alt JS-territorium skal prefixes:
```html
<button data-js-modal-trigger="cpr-info">…</button>
<td data-js-calendar-cell data-date="2026-05-05">…</td>
```

**Function-namespace** — wrap alt i én IIFE:
```js
(() => {
  const GR_BOOKING_KEY = 'grocott-booking';
  const GR_MOCK = { slots: {…}, user: {…} };

  function initNavDropdown() { … }
  function initBurgerMenu() { … }
  // … alle øvrige funktioner

  ready(() => { /* router */ });
})();
```

---

## ⚠️ Kritiske gotchas (fra parallel mobile-arbejde)

Disse er allerede løst i CSS for at give et fungerende mobile-nav uden JS. **Din JS skal komplementere — ikke overskrive.**

### 1. Burger-menuen virker allerede via `:focus-within` (CSS-only fallback)

I `css/styles.css` `@media (max-width: 767.98px)`:
```css
.nav:focus-within .nav__mobile,
.nav:focus-within .nav__mobile[hidden] {
  display: flex !important;
}
```

- **Hvorfor `!important`:** Chromium's implicitte `display: none` på `[hidden]` vinder over author CSS uden `!important`. Bevidst Chromium-workaround. **Fjern ikke.**
- **Hvad din JS skal gøre:** Toggle `hidden`-attributten + `aria-expanded` på `.nav__burger` per spec sektion 8.3.2. Fokus-pattern fungerer som fallback når JS fejler/loader.
- **Resultat:** Du behøver ikke gøre `display: none`/`block` manuelt — bare toggle `hidden` og lad CSS håndtere resten.

### 2. `.nav__mobile-toggle[aria-expanded]` er overstyret på mobil

På mobil tvinges submenu (Behandlinger ▾) altid synlig:
```css
.nav__mobile-toggle[aria-expanded="false"] + ul,
.nav__mobile-toggle[aria-expanded="true"]  + ul {
  display: block;
}
```

- **Hvad det betyder:** Uden JS forbliver alle submenu-items synlige i panelet.
- **Hvis du vil have nested-collapse:** Fjern denne override i sektion 25 — så toggler `aria-expanded` igen synlighed normalt.

### 3. Sektion-bg-rytme på landing er Figma-bestemt

Mød + landing-Behandlinger sektioner er **hvide** (ikke cream). Hvis din JS skifter scroll-position eller injicerer indhold, må du **ikke ændre baggrundsfarver**. Detaljer i `memory/feedback_section_bg_rhythm.md`.

---

## 🧪 Test før hver commit

- **Browser:** Åbn `index.html` (eller den relevante side) og test funktionalitet
- **Keyboard:** Tab gennem hele siden, Esc lukker modals
- **Lighthouse Accessibility:** ≥ 95 (Chrome DevTools → Lighthouse)
- **axe DevTools:** 0 AA-violations
- **Touch-targets:** Mindst 44×44 CSS px (vigtigt for mobile UX)
- **Console:** Ingen errors eller warnings

---

## 📞 Spørgsmål?

- Spec-detaljer mangler eller virker forkerte → skriv til Caroline
- HTML-struktur behøver ændring → Caroline laver det først
- Du vil bruge et nyt CSS-state-class-navn der ikke findes → tilføj det i sektion 25 + dokumentér i din commit
- Du er i tvivl om en a11y-detalje → spørg, vi finder svar sammen

**Lykke til!** 🎉

---

*Sidst opdateret: 2026-05-21 efter mobile-iteration. Læs også spec sektion 8 for fuld kontekst.*
