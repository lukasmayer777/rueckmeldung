/* ---------------------------------------------------------------------------
   Selbsttest für die App.

   Starten:  node pruefen.js     (im Ordner "app")

   Prüft: Skripte fehlerfrei, Nummernumwandlung stimmt, und vor allem —
   dass in KEINEM Nachrichtentext das Wort "Bewertung" oder "Google" steht.
   Das ist die Regel, an der die ganze rechtliche Lösung hängt.
--------------------------------------------------------------------------- */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ordner = __dirname;
let fehler = 0;

function ok(text) { console.log("OK     " + text); }
function schlecht(text) { fehler++; console.log("FEHLER " + text); }

/* --- 1) Laufen die Skripte überhaupt? ----------------------------------- */

for (const datei of ["betriebe.js", "index.html", "k.html"]) {
  const inhalt = fs.readFileSync(path.join(ordner, datei), "utf8");
  const bloecke = datei.endsWith(".js")
    ? [inhalt]
    : [...inhalt.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
        .map((m) => m[1]);

  bloecke.forEach((code, i) => {
    try {
      new vm.Script(code, { filename: `${datei}#${i + 1}` });
      ok(`${datei} Block ${i + 1} ist fehlerfrei`);
    } catch (e) {
      schlecht(`${datei} Block ${i + 1}: ${e.message}`);
    }
  });
}

/* --- 2) Werden Handynummern richtig umgewandelt? ------------------------- */

function nummerInternational(n) {
  let s = (n || "").replace(/[^\d+]/g, "");
  if (s.indexOf("+") === 0) return s.slice(1);
  if (s.indexOf("00") === 0) return s.slice(2);
  if (s.indexOf("0") === 0) return "43" + s.slice(1);
  return s;
}

for (const [ein, soll] of [
  ["0664 1234567", "436641234567"],
  ["+43 664 1234567", "436641234567"],
  ["0043 664 1234567", "436641234567"],
  ["0664/123 45 67", "436641234567"],
]) {
  const ist = nummerInternational(ein);
  ist === soll ? ok(`Nummer "${ein}" wird zu ${ist}`)
               : schlecht(`Nummer "${ein}" wird zu ${ist}, erwartet ${soll}`);
}

/* --- 3) DIE WICHTIGSTE PRÜFUNG ------------------------------------------ */
/* Die echten Textbausteine aus index.html holen und auf verbotene
   Wörter prüfen. Nicht nachbauen — sonst prüft man am Ende sich selbst.  */

const quelle = fs.readFileSync(path.join(ordner, "index.html"), "utf8");
const funktion = quelle.match(/function nachricht\(e\)[\s\S]*?\n  \}/);

if (!funktion) {
  schlecht("Die Funktion nachricht() wurde in index.html nicht gefunden");
} else {
  const bausteine = [...funktion[0].matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  const zusammen = bausteine.join(" ").toLowerCase();
  const verboten = ["bewert", "google", "stern", "rezension"];
  const gefunden = verboten.filter((w) => zusammen.includes(w));

  if (gefunden.length) {
    schlecht(`Verbotenes Wort im Nachrichtentext: ${gefunden.join(", ")}`);
    console.log("       -> Damit wird die Nachricht zu Werbung. Wort entfernen!");
  } else {
    ok('Kein "Bewertung"/"Google"/"Stern" in den Nachrichtentexten');
  }

  console.log("\n--- Diese Textbausteine stecken in den Nachrichten ---");
  bausteine.filter((b) => b.trim().length > 3).forEach((b) => console.log("  " + b));
}

/* --- 4) Musterbetrieb vorhanden? ---------------------------------------- */

const { BETRIEBE, GEWERKE } = vm.runInContext(
  fs.readFileSync(path.join(ordner, "betriebe.js"), "utf8") +
    "\n;({ BETRIEBE: BETRIEBE, GEWERKE: GEWERKE });",
  vm.createContext({})
);

Object.keys(BETRIEBE).length
  ? ok(`${Object.keys(BETRIEBE).length} Betrieb(e) eingetragen: ` +
       Object.values(BETRIEBE).map((b) => b.name).join(", "))
  : schlecht("In betriebe.js steht kein einziger Betrieb");

for (const [k, b] of Object.entries(BETRIEBE)) {
  if (!GEWERKE[b.gewerk]) schlecht(`Betrieb "${k}": Gewerk "${b.gewerk}" ist unbekannt`);
  if (!b.googleLink) schlecht(`Betrieb "${k}": kein googleLink eingetragen`);
}

console.log(fehler === 0 ? "\nALLES GRUEN" : `\n${fehler} FEHLER`);
process.exit(fehler === 0 ? 0 : 1);
