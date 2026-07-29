// סקריפט חד-פעמי (לא חלק מהאתר): מריץ את VerbEngine הקיים על רשימת צירופי
// שורש+בניין שאומתו במחקר (verified_combos.json באותה תיקייה) ומייצר את כל
// שורות הנטייה (עבר/הווה/ציווי/מצדר לכל הגופים) עבור כל צירוף.
// פלט: scripts/verified_conjugations_rows.json - טבלת שורות שממנה בונים את
// הגיליון השלישי באקסל ואת data/verified-conjugations.js.
//
// שימוש: node scripts/generate_verified_conjugations.js

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");

// טוען את js/verbEngine.js (הקובץ מצרף את עצמו ל-globalThis כש-window לא קיים)
require(path.join(ROOT_DIR, "js", "verbEngine.js"));
const VerbEngine = global.VerbEngine;
if (!VerbEngine) throw new Error("VerbEngine לא נטען");

// טוען את VERB_ROOTS מתוך data/verb-roots.js (מבנה JS תואם JSON)
const verbRootsSrc = fs.readFileSync(path.join(ROOT_DIR, "data", "verb-roots.js"), "utf8");
const start = verbRootsSrc.indexOf("[");
const end = verbRootsSrc.lastIndexOf("]");
const VERB_ROOTS = JSON.parse(verbRootsSrc.slice(start, end + 1));
const rootsByArabic = new Map(VERB_ROOTS.map((r) => [r.root, r]));

// רשימת הצירופים המאומתים (שורש+בניין+משמעות) - ממולאת לאחר שלב המחקר
const verifiedCombosPath = path.join(__dirname, "verified_combos.json");
const VERIFIED_COMBOS = JSON.parse(fs.readFileSync(verifiedCombosPath, "utf8"));

const TENSE_LABELS = { past: "עבר", present: "הווה/עתיד", imperative: "ציווי", masdar: "מצדר" };

function personHebrewLabel(label) {
  const m = label.match(/\(([^)]+)\)/);
  return m ? m[1] : label;
}

const rows = [];

for (const combo of VERIFIED_COMBOS) {
  const rootEntry = rootsByArabic.get(combo.root);
  if (!rootEntry) {
    console.warn("שורש לא נמצא ב-VERB_ROOTS, מדלג:", combo.root);
    continue;
  }
  const binyan = VerbEngine.getBinyan(combo.binyan);
  if (!binyan) {
    console.warn("בניין לא מוכר, מדלג:", combo.binyan, combo.root);
    continue;
  }

  const full = VerbEngine.conjugateFull(rootEntry, combo.binyan);

  VerbEngine.PAST_PERSONS.forEach((p) => {
    const form = full.past[p.id];
    rows.push({
      root: combo.root,
      binyan: binyan.digit,
      meaning: combo.meaning,
      tense: TENSE_LABELS.past,
      person: personHebrewLabel(p.label),
      arabic: form.ar,
      translit: form.he,
    });
  });

  VerbEngine.PRESENT_PERSONS.forEach((p) => {
    const form = full.present[p.id];
    rows.push({
      root: combo.root,
      binyan: binyan.digit,
      meaning: combo.meaning,
      tense: TENSE_LABELS.present,
      person: personHebrewLabel(p.label),
      arabic: form.ar,
      translit: form.he,
    });
  });

  VerbEngine.IMPERATIVE_PERSONS.forEach((p) => {
    const form = full.imperative[p.id];
    rows.push({
      root: combo.root,
      binyan: binyan.digit,
      meaning: combo.meaning,
      tense: TENSE_LABELS.imperative,
      person: personHebrewLabel(p.label),
      arabic: form.ar,
      translit: form.he,
    });
  });

  if (full.masdar) {
    rows.push({
      root: combo.root,
      binyan: binyan.digit,
      meaning: combo.meaning,
      tense: TENSE_LABELS.masdar,
      person: "–",
      arabic: full.masdar.ar,
      translit: full.masdar.he,
    });
  }
}

fs.writeFileSync(
  path.join(__dirname, "verified_conjugations_rows.json"),
  JSON.stringify(rows, null, 2),
  "utf8"
);

console.log(`נוצרו ${rows.length} שורות עבור ${VERIFIED_COMBOS.length} צירופים מאומתים.`);
