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

  // --- Zweiter Musterbetrieb: Termin-Branche (Vorfuehrung Zahnarzt & Co.) --
  z: {
    name: "Ordination Dr. Muster",
    chef: "Frau Dr. Muster",
    gewerk: "zahnarzt",
    farbe: "#2f5d54",             // gedecktes Gruen - ruhig, passt zur Ordination
    googleLink: "https://www.google.com/search?q=ordination+dr+muster",
    meldeSchluessel: "",
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
/* Je Branche drei Angaben:
     satz   - der ganze Satz auf der Kundenseite ("Was war heute?")
     ding   - Stichwort fuer die Liste
     ort    - "hin"  = wir fahren zum Kunden   (Handwerk)
              "her"  = der Kunde kommt zu uns  (Ordination, Salon, Werkstatt)
   Der Ort entscheidet ueber den Satz in der SMS: "dass wir bei Ihnen arbeiten
   durften" passt beim Installateur, beim Zahnarzt waere er falsch herum. */
const GEWERKE = {
  /* --- Handwerk: wir fahren hin ----------------------------------------- */
  installateur: { satz: "Wir haben die Installationsarbeiten bei Ihnen abgeschlossen.", ding: "Bad / Heizung",        ort: "hin", arbeit: "die Installationsarbeiten" },
  dachdecker:   { satz: "Wir haben die Dacharbeiten bei Ihnen abgeschlossen.",          ding: "Dach",                 ort: "hin", arbeit: "die Dacharbeiten" },
  elektriker:   { satz: "Wir haben die Elektroarbeiten bei Ihnen abgeschlossen.",       ding: "Elektroinstallation",  ort: "hin", arbeit: "die Elektroarbeiten" },
  fliesenleger: { satz: "Wir haben die Fliesenarbeiten bei Ihnen abgeschlossen.",       ding: "Fliesen",              ort: "hin", arbeit: "die Fliesenarbeiten" },
  maler:        { satz: "Wir haben die Malerarbeiten bei Ihnen abgeschlossen.",         ding: "Anstrich",             ort: "hin", arbeit: "die Malerarbeiten" },

  /* --- Termin-Branchen: der Kunde kommt her ----------------------------- */
  zahnarzt:     { satz: "Sie waren heute bei uns in der Ordination.",                   ding: "Behandlung",           ort: "her", arbeit: "Ihre Behandlung" },
  physio:       { satz: "Sie waren heute bei uns zur Behandlung.",                      ding: "Therapie",             ort: "her", arbeit: "Ihre Behandlung" },
  kosmetik:     { satz: "Sie waren heute bei uns im Studio.",                           ding: "Behandlung",           ort: "her", arbeit: "Ihre Behandlung" },
  friseur:      { satz: "Sie waren heute bei uns im Salon.",                            ding: "Termin",               ort: "her", arbeit: "Ihren Termin" },
  werkstatt:    { satz: "Ihr Auto ist bei uns fertig geworden.",                        ding: "Auto",                 ort: "her", arbeit: "die Arbeiten an Ihrem Auto" },
  autohaus:     { satz: "Sie waren heute bei uns im Autohaus.",                         ding: "Fahrzeug",             ort: "her", arbeit: "Ihren Besuch" },
  tierarzt:     { satz: "Sie waren heute mit Ihrem Tier bei uns.",                      ding: "Behandlung",           ort: "her", arbeit: "die Behandlung" },
  fahrschule:   { satz: "Sie hatten heute eine Fahrstunde bei uns.",                    ding: "Fahrstunde",           ort: "her", arbeit: "Ihre Fahrstunde" },
};

/* Wer schreibt? Steht der Name des Chefs schon im Firmennamen
   ("Frau Dr. Muster" / "Ordination Dr. Muster"), waere "Frau Dr. Muster von
   Ordination Dr. Muster" doppelt gemoppelt - dann nur der Chef. */
function ABSENDER(b) {
  var teile = String(b.chef || "").split(/\s+/).filter(Boolean);
  var kern = teile.length ? teile[teile.length - 1] : "";
  if (kern && String(b.name || "").indexOf(kern) !== -1) return b.chef;
  return b.chef + " von " + b.name;
}

if (typeof module !== "undefined") module.exports = { BETRIEBE, GEWERKE, ABSENDER };
