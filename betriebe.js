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
    farbe: "#8c3a2b",             // gedeckte Farben wirken hochwertig, grelle billig
    googleLink: "https://www.google.com/search?q=muster+installationen",
    meldeSchluessel: "",          // leer = Testbetrieb, es wird nichts verschickt
  },

  // --- Echte Kunden -------------------------------------------------------
  // So wird ein echter Betrieb scharf geschaltet:
  //   1. Beim Block unten die zwei Schrägstriche am Zeilenanfang wegnehmen.
  //   2. Kürzel links (das "r") frei wählen – kurz halten, es steht im Link.
  //   3. name / chef / gewerk / farbe eintragen.
  //   4. googleLink: die Bewertungs-Adresse aus dem Google-Unternehmensprofil.
  //      ⚠ Ohne fertiges Google-Profil gibt es diese Adresse nicht. Dann zuerst
  //        das Profil anlegen – vorher hat das Bewertungs-System kein Ziel.
  //   5. meldeSchluessel: der kostenlose Schlüssel von web3forms.com.
  //      ⚠ Solange der leer ist, kommt eine Beschwerde bei NIEMANDEM an.
  //
  // r: {
  //   name: "Roinas Installationen",
  //   chef: "Harald",
  //   gewerk: "installateur",
  //   farbe: "#1c5d99",
  //   googleLink: "HIER die Bewertungs-Adresse aus dem Google-Profil",
  //   meldeSchluessel: "HIER den Schluessel von web3forms.com",
  // },

};

/* Gewerk-Wörter: damit die Nachricht nach der jeweiligen Baustelle klingt. */
const GEWERKE = {
  installateur: { arbeit: "die Installationsarbeiten", ding: "Bad / Heizung" },
  dachdecker:   { arbeit: "die Dacharbeiten",   ding: "Dach" },
  elektriker:   { arbeit: "die Elektroarbeiten", ding: "Elektroinstallation" },
  fliesenleger: { arbeit: "die Fliesenarbeiten", ding: "Fliesen" },
  maler:        { arbeit: "die Malerarbeiten",  ding: "Anstrich" },
};

if (typeof module !== "undefined") module.exports = { BETRIEBE, GEWERKE };
