// סקריפט חד-פעמי (לא חלק מהאתר): בונה מדגם תרגול (150-200 פריטים) על בסיס
// צירופי שורש+בניין המאומתים ב-scripts/verified_combos.json, להזנת גיליונות
// 4 ("תרגול פעלים") ו-5 ("פתרונות") באקסל. מריץ את VerbEngine הקיים בלבד -
// אין ניחוש/המצאה של נטיות.
//
// שימוש: node scripts/generate_practice_set.js

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const TARGET_COUNT = 180; // בטווח המבוקש 150-200
const SEED = 42; // לשחזוריות

require(path.join(ROOT_DIR, "js", "verbEngine.js"));
const VerbEngine = global.VerbEngine;
if (!VerbEngine) throw new Error("VerbEngine לא נטען");

const verbRootsSrc = fs.readFileSync(path.join(ROOT_DIR, "data", "verb-roots.js"), "utf8");
const VERB_ROOTS = JSON.parse(verbRootsSrc.slice(verbRootsSrc.indexOf("["), verbRootsSrc.lastIndexOf("]") + 1));
const rootsByArabic = new Map(VERB_ROOTS.map((r) => [r.root, r]));

const VERIFIED_COMBOS = JSON.parse(fs.readFileSync(path.join(__dirname, "verified_combos.json"), "utf8"));

const TENSE_LABELS = { past: "עבר", present: "הווה/עתיד", imperative: "ציווי", masdar: "מצדר" };

function personHebrewLabel(label) {
  const m = label.match(/\(([^)]+)\)/);
  return m ? m[1] : label;
}

// מחולל אקראי עם seed קבוע, לשחזוריות בין הרצות
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// בונה את כל 32 הצורות האפשריות (13 עבר + 13 הווה + 5 ציווי + 1 מצדר) לכל צירוף
function allFormsForCombo(combo) {
  const rootEntry = rootsByArabic.get(combo.root);
  if (!rootEntry) {
    console.warn("שורש לא נמצא, מדלג:", combo.root);
    return [];
  }
  const binyan = VerbEngine.getBinyan(combo.binyan);
  const full = VerbEngine.conjugateFull(rootEntry, combo.binyan);
  const forms = [];

  VerbEngine.PAST_PERSONS.forEach((p) => {
    forms.push({
      arabic: full.past[p.id].ar,
      root: combo.root,
      binyanDigit: binyan.digit,
      tense: TENSE_LABELS.past,
      person: personHebrewLabel(p.label),
      meaning: combo.meaning,
    });
  });
  VerbEngine.PRESENT_PERSONS.forEach((p) => {
    forms.push({
      arabic: full.present[p.id].ar,
      root: combo.root,
      binyanDigit: binyan.digit,
      tense: TENSE_LABELS.present,
      person: personHebrewLabel(p.label),
      meaning: combo.meaning,
    });
  });
  VerbEngine.IMPERATIVE_PERSONS.forEach((p) => {
    forms.push({
      arabic: full.imperative[p.id].ar,
      root: combo.root,
      binyanDigit: binyan.digit,
      tense: TENSE_LABELS.imperative,
      person: personHebrewLabel(p.label),
      meaning: combo.meaning,
    });
  });
  if (full.masdar) {
    forms.push({
      arabic: full.masdar.ar,
      root: combo.root,
      binyanDigit: binyan.digit,
      tense: TENSE_LABELS.masdar,
      person: "–",
      meaning: combo.meaning,
    });
  }
  return forms;
}

// שלב 1: פריט אחד אקראי מכל צירוף (מבטיח כיסוי מלא של כל 144 הצירופים)
const perComboPool = VERIFIED_COMBOS.map(allFormsForCombo);
const guaranteed = perComboPool.map((forms) => {
  const picked = shuffle(forms)[0];
  const idx = forms.indexOf(picked);
  return { picked, remaining: forms.filter((_, i) => i !== idx) };
});

const selected = guaranteed.map((g) => g.picked);
let remainingPool = guaranteed.flatMap((g) => g.remaining);
remainingPool = shuffle(remainingPool);

while (selected.length < TARGET_COUNT && remainingPool.length > 0) {
  selected.push(remainingPool.pop());
}

const finalSet = shuffle(selected).slice(0, TARGET_COUNT);

fs.writeFileSync(
  path.join(__dirname, "practice_rows.json"),
  JSON.stringify(finalSet, null, 2),
  "utf8"
);

console.log(`נוצרו ${finalSet.length} פריטי תרגול (מתוך ${VERIFIED_COMBOS.length} צירופים מאומתים).`);
