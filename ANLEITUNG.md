# Rückmeldungs-System – Anleitung

Zwei Seiten, mehr nicht. Kein Server, keine Datenbank, keine laufenden Kosten.

| Datei | Wer sieht das |
|---|---|
| `index.html` | **Du** (bzw. der Handwerker) – Liste eintragen und Nachrichten senden |
| `k.html` | **Der Endkunde** – die Seite mit den zwei Daumen |
| `betriebe.js` | Die Betriebsdaten – hier trägst du neue Kunden ein |
| `stil.css` | Das Aussehen |
| `pruefen.cjs` | Selbsttest – siehe unten |

---

## So läuft es

1. **Baustelle fertig** → auf `index.html` Vorname und Handynummer eintippen, „Fertig" drücken.
2. Der Eintrag erscheint unter **Jetzt senden**. Daneben zwei Knöpfe: **SMS** und **WhatsApp**.
3. Du drückst einen davon → dein normales Nachrichtenfenster geht auf, **Text und Empfänger
   sind schon ausgefüllt**. Du drückst nur noch senden.
4. Der Kunde bekommt einen kurzen Link. Er tippt drauf und sieht zwei große Flächen:
   **Ja, alles bestens** und **Es gab ein Problem**.
5. **Daumen hoch** → Dank, darunter der Knopf zu Google.
   **Daumen runter** → Textfeld, geht direkt an den Betrieb – und danach **derselbe Knopf
   zu Google**, in derselben Farbe und wortgleich.

   ⚠ **Das ist Absicht und darf nicht geändert werden.** Google verbietet seit April 2026,
   dass ein Betrieb nur die zufriedenen Kunden zur Bewertung schickt und die unzufriedenen
   abfangt. Wer das macht, riskiert die Löschung aller Bewertungen und im Wiederholungsfall
   des ganzen Profils. Der Betrieb erfährt den Ärger trotzdem zuerst und kann ihn
   geradebiegen – aussortiert wird aber niemand.
6. Nach **4 Tagen** ohne Reaktion taucht der Eintrag unter **Erinnerung fällig** auf.
   Eine einzige Erinnerung – danach nicht mehr.

---

## Die eine Regel

> **In keiner Nachricht steht jemals „Bewertung" oder „Google".**

Deshalb sind die Texte im Programm fest verbaut und für Kunden nicht änderbar. Sobald eines
dieser Wörter in einer SMS steht, ist es Werbung – und dann bräuchte es die vorherige
Zustimmung des Empfängers. Der Bewertungswunsch steht ausschließlich auf der Seite, die der
Kunde **selbst geöffnet** hat.

Wenn dich ein Kunde bittet, den Text zu ändern: höflich nein sagen und erklären warum.

**Selbsttest:** Im Ordner `app` das schwarze Eingabefenster öffnen und `node pruefen.cjs`
eingeben. Es prüft, ob alles fehlerfrei läuft, ob Handynummern richtig umgewandelt werden
und – am wichtigsten – ob sich ein verbotenes Wort in einen Nachrichtentext geschlichen hat.
Nach jeder Textänderung einmal laufen lassen.

---

## Neuen Betrieb anlegen

In `betriebe.js` den Musterblock kopieren und ausfüllen:

```js
h: {
  name: "Huber Installationen",
  chef: "Hans",
  gewerk: "installateur",
  farbe: "#8c3a2b",   // gedeckt waehlen, grelle Farben wirken billig
  googleLink: "https://g.page/r/XXXXXXXX/review",
  meldeSchluessel: "",
},
```

- **Kürzel** (`h:`) kurz halten – es steht im Link, den der Kunde bekommt.
  Kurzer Link = sieht nicht nach Spam aus.
- **googleLink**: Im Google-Unternehmensprofil unter „Rezensionen" → „Mehr Rezensionen
  erhalten" gibt es einen fertigen Link. Der gehört hier rein.
- **farbe**: die Hausfarbe des Betriebs, damit die Kundenseite nach ihm aussieht.
- **meldeSchluessel**: siehe unten. Leer lassen heißt: es wird nichts verschickt (Testbetrieb).

---

## Damit die Rückmeldung beim Betrieb ankommt

Wenn ein Kunde **Daumen runter** drückt und schreibt, was nicht passt, muss das jemand
erfahren. Das läuft über einen kostenlosen Dienst namens Web3Forms – denselben, den auch das
Rückruf-Formular auf Kundenwebsites benutzt.

1. Auf `web3forms.com` die E-Mail-Adresse des Betriebs eintragen (kostenlos, kein Konto nötig)
2. Der Schlüssel kommt per Mail
3. In `betriebe.js` bei `meldeSchluessel` eintragen

Ab dann bekommt der Betrieb jede Rückmeldung per Mail – auch die positiven, damit er weiß,
wer zufrieden war.

---

## Damit es am Handy des Kunden funktioniert

Die Seite `k.html` muss **im Internet erreichbar** sein. Solange sie nur auf deinem Laptop
liegt, kann das Handy deines Kunden sie nicht öffnen.

Kostenlos möglich bei Cloudflare Pages, Netlify oder Vercel – alle drei haben ein Gratis-Angebot
ohne Zeitlimit und ohne Kreditkarte.

Danach in den **Einstellungen** unten auf `index.html` die Adresse der Kundenseite eintragen
(z. B. `https://deinname.pages.dev/k.html`) und „Adresse merken" drücken.

---

## Zum Vorführen beim Interessenten

1. `index.html` am Handy öffnen
2. **Seinen** Vornamen und **seine** Handynummer eintippen
3. „Fertig" → „SMS" oder „WhatsApp" → senden
4. Sein Handy vibriert. Er tippt selbst auf den Daumen und sieht, was passiert.

Das Vorführgerät ist das echte Produkt – es gibt keinen Unterschied zwischen Demo und Einsatz.

---

## Was das Programm bewusst **nicht** kann

- **Keine Terminplanung**, keine Mitarbeiter, kein Kalender. Es ist eine Tagesliste.
  Ein halb gepflegtes Planungsprogramm ist wertlos, eine halb gepflegte Liste funktioniert.
- **Keine automatische Abenderinnerung** aufs Handy. Das braucht später einen laufenden Dienst –
  dafür gibt es im Hauptprojekt bereits die Automatik über Twilio (Aufpreis-Stufe).
- **Die Einträge liegen nur in dem Browser, in dem du sie eingetippt hast.** Wechselst du vom
  Handy auf den Laptop, sind es getrennte Listen. Für den Anfang reicht das; sobald ein Kunde
  wirklich zahlt, kommt das auf einen gemeinsamen Speicher.
