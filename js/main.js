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
   03b. ANMELDELSER — dynamisk render fra data/reviews.json
   Demonstrerer: async/await, fetch, try/catch, Array.filter/sort/slice/forEach,
   destructuring, template literals, Date, createElement, ARIA, classList
   ============================================================ */
async function initReviewsWidget() {
  const grid = document.getElementById('reviews-grid');
  const moreBtn = document.querySelector('[data-js-reviews-more]');
  if (!grid) return; // virker kun på landing — early return på andre sider

  const MAX_VISIBLE = 3;
  let allReviews = [];
  let visibleCount = MAX_VISIBLE;

  try {
    const response = await fetch('data/reviews.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Filtrér til 4+ stjerner, sortér nyeste først
    allReviews = data.reviews
      .filter(review => review.rating >= 4)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    renderReviews(grid, allReviews.slice(0, visibleCount));
    grid.setAttribute('aria-busy', 'false');

    // "Indlæs flere"-knap — kun hvis der er flere end MAX_VISIBLE
    if (moreBtn && allReviews.length > MAX_VISIBLE) {
      moreBtn.hidden = false;
      moreBtn.addEventListener('click', () => {
        visibleCount += MAX_VISIBLE;
        renderReviews(grid, allReviews.slice(0, visibleCount));
        if (visibleCount >= allReviews.length) {
          moreBtn.hidden = true;
        }
      });
    }
  } catch (error) {
    console.error('Kunne ikke indlæse anmeldelser:', error);
    grid.innerHTML = '';
    grid.classList.add('has-error');
    grid.setAttribute('aria-busy', 'false');
    grid.insertAdjacentHTML(
      'beforeend',
      `<p class="reviews-error" role="alert">Kunne ikke indlæse anmeldelser lige nu. <a href="https://www.google.com/maps">Se dem på Google</a></p>`
    );
  }
}

function renderReviews(container, reviews) {
  container.innerHTML = '';
  reviews.forEach(review => {
    const card = createReviewCard(review);
    container.appendChild(card);
  });
}

function createReviewCard({ name, source, rating, quote, date }) {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const dateFormatted = new Date(date).toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long'
  });

  const figure = document.createElement('figure');
  figure.className = 'review-card';
  figure.dataset.reviewSource = source.toLowerCase();

  figure.innerHTML = `
    <div class="review-card__stars" aria-label="${rating} ud af 5 stjerner">
      <span aria-hidden="true">${stars}</span>
    </div>
    <blockquote><p>"${quote}"</p></blockquote>
    <figcaption>
      <span class="review-card__name">${name}</span>
      <span class="review-card__source">${source} · ${dateFormatted}</span>
    </figcaption>
  `;

  return figure;
}

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
let sidstValgt = null; 
function symptomGrid() {
  const inputs = $$('input[name="symptom"]');
  inputs.forEach(input => input.addEventListener('click', handleSymptom));
}
function handleSymptom(e) {
  const valgt = e.target.value;
  sidstValgt = valgt;
  // updateBookingState({ symptom: valgt });   // venter på TODO på linje 114

  const INFO = {
    rygsmerter: 'Diskusprolaps, lændesmerter, kronisk ryg og udstråling ned i benene. Jeg finder årsagen — ikke kun hvor det gør ondt — og laver en plan der får dig tilbage til hverdagen.',
    'skulder-nakke': 'Spændinger, frossen skulder, museskader og nedsat bevægelighed. Vi løsner det fastlåste og styrker det svage, så du kan dreje hovedet uden ubehag igen.',
    'kaebe-hoved': 'Kæbeled-dysfunktion, spændingshovedpine og migræne-relaterede smerter. Kæben og nakken hænger ofte sammen — jeg arbejder med begge dele samtidigt.',
    'knae-hofter': 'Slidgigt, løbeskader, brusk-problemer og smerter ved trapper eller lange ture. Jeg ser på hele bevægekæden, ikke kun leddet der gør ondt.',
    fod: 'Plantar fasciitis, hælspore, achillessene-problemer og fodsmerter ved gang. Indlægssåler kan være en del af løsningen — men sjældent hele svaret.',
    massage: 'Afspændende og dybdegående behandling der løsner muskelspændinger, forbedrer blodgennemstrømning og giver dig en pause fra hverdagens stress. Bruges som tilskud til andre forløb eller alene.'
  };
  const card = $('.info-card');
  card.hidden = false;
  card.querySelector('[data-js-info-body]').textContent = INFO[valgt];
  const sub = $('.symptom-sub');
sub.classList.toggle('is-aktiv', valgt === 'fod'); 
}

function closeOnOutsideClick(e) {
  if (e.target.closest('.info-card') || e.target.closest('.filter-chip')) return;
  const card = $('.info-card');
  if (card) card.hidden = true;
  const sub = $('.symptom-sub');
  if (sub) sub.classList.remove('is-aktiv');
  $$('input[name="symptom"]').forEach(input => input.checked = false);
}

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
    initReviewsWidget();
  // navDropdown();
  // mobileBurger();

  // Stepper auto-detect på flow-pages
  // if (document.body.classList.contains('flow-page')) renderStepper();

  // Side-specifik:
  const path = window.location.pathname;
  // if (path.endsWith('trin-1.html'))       consultToggle();
  if (path === '/' || path.endsWith('index.html'))   symptomGrid();
  // if (path.endsWith('trin-3.html'))     { renderCalendar(2026, 4); consultToggle(); }
  // if (path.endsWith('trin-4.html'))     { formValidation(); cprModal(); }
  // if (path.endsWith('trin-5.html'))       renderConfirmation();
  // if (path.includes('/klient/'))         mockEKLogin();

document.addEventListener('click', closeOnOutsideClick);
});
