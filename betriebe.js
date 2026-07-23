/* ---------------------------------------------------------------------------
   BETRIEBE
   Hier steht pro Kunde ein Eintrag. Das Kürzel (links) ist absichtlich kurz,
   weil es im Link steht, den der Endkunde per SMS bekommt.
   Kurzer Link = wirkt nicht wie Spam.

   Neuen Kunden anlegen: Block kopieren, Kürzel ändern, Werte eintragen.
--------------------------------------------------------------------------- */

const BETRIEBE = {

  // --- Musterbetrieb für die Vorführung -----------------------------------
  m: {
    name: "Muster Installationen",
    chef: "Hans",
    gewerk: "installateur",       // installateur | dachdecker | elektriker | fliesenleger | maler
    farbe: "#1c5d99",
    googleLink: "https://www.google.com/search?q=muster+installationen",
    meldeSchluessel: "",          // leer = Testbetrieb, es wird nichts verschickt
  },

  // --- Echte Kunden -------------------------------------------------------
  // h: {
  //   name: "Huber Installationen",
  //   chef: "Hans",
  //   gewerk: "installateur",
  //   farbe: "#1c5d99",
  //   googleLink: "https://g.page/r/XXXXXXXX/review",
  //   meldeSchluessel: "",
  // },

};

/* Gewerk-Wörter: damit die Nachricht nach der jeweiligen Baustelle klingt. */
const GEWERKE = {
  installateur: { arbeit: "die Arbeiten",       ding: "Bad / Heizung" },
  dachdecker:   { arbeit: "die Dacharbeiten",   ding: "Dach" },
  elektriker:   { arbeit: "die Elektroarbeiten", ding: "Elektroinstallation" },
  fliesenleger: { arbeit: "die Fliesenarbeiten", ding: "Fliesen" },
  maler:        { arbeit: "die Malerarbeiten",  ding: "Anstrich" },
};

if (typeof module !== "undefined") module.exports = { BETRIEBE, GEWERKE };
