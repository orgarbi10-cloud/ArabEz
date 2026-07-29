// מנוע נטיית הפועל — בניינים I, II, III, IV, V, VI, VII, VIII, X
//
// מימוש דטרמיניסטי מבוסס-כללים בלבד (ללא ניחוש/AI) על סמך הטבלאות המדויקות
// בסעיף 3 של המפרט. לכל שורש ולכל בניין יש תבנית בסיס קבועה (עבר/הווה/ציווי/
// מצדר), ומתוכה נבנים כל שאר הגופים לפי טבלת סיומות אוניברסלית זהה לכל
// הבניינים (ראה PAST_PERSONS / PRESENT_PERSONS / IMPERATIVE_PERSONS למטה).
//
// בניין IX (צבעים/מומים) אינו נכלל בשלב זה, כמצוין במפרט.

(function (global) {
  "use strict";

  // ---------------------------------------------------------------------
  // סימני ניקוד ערביים
  // ---------------------------------------------------------------------
  const FATHA = "َ"; // َ
  const DAMMA = "ُ"; // ُ
  const KASRA = "ِ"; // ِ
  const SUKUN = "ْ"; // ْ
  const SHADDA = "ّ"; // ّ
  const ALIF = "ا"; // ا
  const WAW = "و"; // و
  const YA = "ي"; // ي
  const TA_MARBUTA = "ة"; // ة
  const HAMZA_QATA = "أ"; // أ  (המזת קטע, בבניין IV)
  const HAMZA_KASRA = "إ"; // إ (המזת קטע עם i, במצדרי IV/VII/VIII/X)
  const HAMZA_WASL = ALIF; // המזת וצל נכתבת כאלף רגילה + ניקוד קסרה להמחשה

  // ממיר סימון תנועה לקסיקלי ('a'/'i'/'u', כפי שמופיע ב-VERB_ROOTS) לניקוד
  // בפועל. משמש רק בבניין I, שבו תנועת ר2 בעבר ובהווה היא מידע לקסיקלי
  // לכל שורש (לא ניתנת לגזירה מכלל - ראו הערה ב-BINYANIM למטה).
  const VOWEL_MARKS = { a: FATHA, i: KASRA, u: DAMMA };

  // ---------------------------------------------------------------------
  // מיפוי עיצורים ערבית -> תעתיק עברי (מאומת מול כל 40 השורשים בקובץ הנתונים)
  // ---------------------------------------------------------------------
  const AR_TO_HE = {
    "ب": "ב", "ت": "ת", "ث": "ת'", "ج": "ג'", "ح": "ח", "خ": "ח'",
    "د": "ד", "ذ": "ד'", "ر": "ר", "ز": "ז", "س": "ס", "ش": "ש",
    "ص": "צ", "ض": "ד", "ط": "ט", "ظ": "ז'", "ع": "ע", "غ": "ע'",
    "ف": "פ", "ق": "ק", "ك": "כ", "ل": "ל", "م": "מ", "ن": "נ",
    "ه": "ה", "و": "ו", "ي": "י", "ا": "א", "ء": "א",
    "أ": "א", "إ": "א", "آ": "א", "ة": "ה",
  };

  function heLetter(arLetter) {
    return AR_TO_HE[arLetter] || arLetter;
  }

  function heDouble(s) {
    return s + s;
  }

  // מנרמל ל-NFC: לסימני ניקוד ערביים יש combining class שונה (שדה=33,
  // תנועות=30), כך שאותה מילה יכולה להיכתב עם הסימנים באותו בסיס בסדר שונה
  // (למשל תנועה-ואז-שדה, או שדה-ואז-תנועה) ועדיין להיראות/להישמע זהה.
  // נרמול מבטיח שהשוואת מחרוזות מדויקת (למשל במצב "בנה את הפועל") לא תיכשל
  // בגלל הבדל טכני כזה בלבד.
  function norm(s) {
    return s == null ? s : s.normalize("NFC");
  }

  function normPair(pair) {
    return { ar: norm(pair.ar), he: pair.he };
  }

  // ---------------------------------------------------------------------
  // 9 הבניינים (I-VIII, X). כל בניין מגדיר, כפונקציה של אותיות השורש
  // (r1, r2, r3 בערבית, ו-h1, h2, h3 בתעתיק העברי המקביל):
  //   pastBase       - הגזע לפני ר3 בזמן עבר (ערבית + תעתיק)
  //   presentVowel   - תנועת התחילית של גוף בהווה/עתיד: 'a' | 'u'
  //   presentBase    - הגזע לפני ר3 בהווה/עתיד ובציווי (ערבית + תעתיק)
  //   imperativeHamza- תחילית ההמזה בציווי, אם יש (ערבית + תעתיק)
  //   masdar         - תבנית המצדר המלאה (ערבית + תעתיק), או null אם משתנה
  //
  // בבניין I בלבד, pastBase/presentBase/imperativeHamza מקבלים גם root
  // (הפרמטר החמישי/הראשון בהתאמה) ומשתמשים בתנועת ר2 הלקסיקלית שלו
  // (root.pastVowel / root.presentVowel, כל אחד 'a'|'i'|'u' - ראו
  // VERB_ROOTS) במקום פתחة קבועה: זו תכונה שאינה ניתנת לגזירה מכלל דקדוקי
  // (למשל كتب=a/u אבל فهم=i/a) ומקורה במילון, לא בקוד. imperativeHamza הוא
  // פונקציה של root כדי ליישם את כלל ההרמוניה (تنועת u -> המזה בדمة, אחרת
  // המזה בקسرة). שאר הבניינים (II-X) מתעלמים מהפרמטר הנוסף ואינם מושפעים.
  // חסר root.pastVowel/presentVowel -> ברירת מחדל 'a' (תואם להתנהגות הישנה).
  // ---------------------------------------------------------------------
  const BINYANIM = [
    {
      id: "I",
      digit: "1",
      name: "בניין 1",
      meaning: "פעולת יסוד",
      pastBase: (r1, r2, h1, h2, root) => ({ ar: r1 + FATHA + r2 + VOWEL_MARKS[(root && root.pastVowel) || "a"], he: h1 + h2 }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2, root) => ({ ar: r1 + SUKUN + r2 + VOWEL_MARKS[(root && root.presentVowel) || "a"], he: h1 + h2 }),
      imperativeHamza: (root) =>
        (root && root.presentVowel) === "u" ? { ar: HAMZA_WASL + DAMMA, he: "א" } : { ar: HAMZA_WASL + KASRA, he: "א" },
      masdar: null, // תבנית משתנה לפי פועל - אין לנחש, ראה אזהרה במפרט
    },
    {
      id: "II",
      digit: "2",
      name: "בניין 2",
      meaning: "גרימה / הכבדה / תדירות",
      pastBase: (r1, r2, h1, h2) => ({ ar: r1 + FATHA + r2 + SHADDA + FATHA, he: h1 + heDouble(h2) }),
      presentVowel: "u",
      presentBase: (r1, r2, h1, h2) => ({ ar: r1 + FATHA + r2 + SHADDA + KASRA, he: h1 + heDouble(h2) }),
      imperativeHamza: null,
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: "ت" + FATHA + r1 + SUKUN + r2 + KASRA + YA + r3,
        he: "ת" + h1 + h2 + "י" + h3,
      }),
    },
    {
      id: "III",
      digit: "3",
      name: "בניין 3",
      meaning: "פעולה הדדית / ניסיון לעשות",
      pastBase: (r1, r2, h1, h2) => ({ ar: r1 + FATHA + ALIF + r2 + FATHA, he: h1 + "א" + h2 }),
      presentVowel: "u",
      presentBase: (r1, r2, h1, h2) => ({ ar: r1 + FATHA + ALIF + r2 + KASRA, he: h1 + "א" + h2 }),
      imperativeHamza: null,
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: "م" + DAMMA + r1 + FATHA + ALIF + r2 + FATHA + r3 + FATHA + TA_MARBUTA,
        he: "מ" + h1 + "א" + h2 + h3 + "ה",
      }),
    },
    {
      id: "IV",
      digit: "4",
      name: "בניין 4",
      meaning: "גרימה / הפיכה למשהו",
      pastBase: (r1, r2, h1, h2) => ({ ar: HAMZA_QATA + FATHA + r1 + SUKUN + r2 + FATHA, he: "א" + h1 + h2 }),
      presentVowel: "u",
      presentBase: (r1, r2, h1, h2) => ({ ar: r1 + SUKUN + r2 + KASRA, he: h1 + h2 }),
      imperativeHamza: { ar: HAMZA_QATA + FATHA, he: "א" },
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: HAMZA_KASRA + KASRA + r1 + SUKUN + r2 + FATHA + ALIF + r3,
        he: "א" + h1 + h2 + "א" + h3,
      }),
    },
    {
      id: "V",
      digit: "5",
      name: "בניין 5",
      meaning: "רפלקסיבי של בניין 2",
      pastBase: (r1, r2, h1, h2) => ({
        ar: "ت" + FATHA + r1 + FATHA + r2 + SHADDA + FATHA,
        he: "ת" + h1 + heDouble(h2),
      }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2) => ({
        ar: "ت" + FATHA + r1 + FATHA + r2 + SHADDA + KASRA,
        he: "ת" + h1 + heDouble(h2),
      }),
      imperativeHamza: null,
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: "ت" + FATHA + r1 + FATHA + r2 + SHADDA + DAMMA + r3,
        he: "ת" + h1 + heDouble(h2) + h3,
      }),
    },
    {
      id: "VI",
      digit: "6",
      name: "בניין 6",
      meaning: "פעולה הדדית בין כמה",
      pastBase: (r1, r2, h1, h2) => ({
        ar: "ت" + FATHA + r1 + FATHA + ALIF + r2 + FATHA,
        he: "ת" + h1 + "א" + h2,
      }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2) => ({
        ar: "ت" + FATHA + r1 + FATHA + ALIF + r2 + KASRA,
        he: "ת" + h1 + "א" + h2,
      }),
      imperativeHamza: null,
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: "ت" + FATHA + r1 + FATHA + ALIF + r2 + DAMMA + r3,
        he: "ת" + h1 + "א" + h2 + h3,
      }),
    },
    {
      id: "VII",
      digit: "7",
      name: "בניין 7",
      meaning: "סביל / רפלקסיבי",
      pastBase: (r1, r2, h1, h2) => ({
        ar: HAMZA_WASL + KASRA + "ن" + SUKUN + r1 + FATHA + r2 + FATHA,
        he: "אנ" + h1 + h2,
      }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2) => ({ ar: "ن" + SUKUN + r1 + FATHA + r2 + KASRA, he: "נ" + h1 + h2 }),
      imperativeHamza: { ar: HAMZA_WASL + KASRA, he: "א" },
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: HAMZA_WASL + KASRA + "ن" + SUKUN + r1 + KASRA + r2 + FATHA + ALIF + r3,
        he: "אנ" + h1 + h2 + "א" + h3,
      }),
    },
    {
      id: "VIII",
      digit: "8",
      name: "בניין 8",
      meaning: "רפלקסיבי (דומה ל-7)",
      pastBase: (r1, r2, h1, h2) => ({
        ar: HAMZA_WASL + KASRA + r1 + SUKUN + "ت" + FATHA + r2 + FATHA,
        he: "א" + h1 + "ת" + h2,
      }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2) => ({ ar: r1 + SUKUN + "ت" + FATHA + r2 + KASRA, he: h1 + "ת" + h2 }),
      imperativeHamza: { ar: HAMZA_WASL + KASRA, he: "א" },
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: HAMZA_WASL + KASRA + r1 + SUKUN + "ت" + KASRA + r2 + FATHA + ALIF + r3,
        he: "א" + h1 + "ת" + h2 + "א" + h3,
      }),
    },
    {
      id: "X",
      digit: "10",
      name: "בניין 10",
      meaning: "בקשה / חתירה למשהו / ראיית-משהו-כ...",
      pastBase: (r1, r2, h1, h2) => ({
        ar: HAMZA_WASL + KASRA + "س" + SUKUN + "ت" + FATHA + r1 + SUKUN + r2 + FATHA,
        he: "אסת" + h1 + h2,
      }),
      presentVowel: "a",
      presentBase: (r1, r2, h1, h2) => ({
        ar: "س" + SUKUN + "ت" + FATHA + r1 + SUKUN + r2 + KASRA,
        he: "סת" + h1 + h2,
      }),
      imperativeHamza: { ar: HAMZA_WASL + KASRA, he: "א" },
      masdar: (r1, r2, r3, h1, h2, h3) => ({
        ar: HAMZA_WASL + KASRA + "س" + SUKUN + "ت" + KASRA + r1 + SUKUN + r2 + FATHA + ALIF + r3,
        he: "אסת" + h1 + h2 + "א" + h3,
      }),
    },
  ];

  // ---------------------------------------------------------------------
  // טבלת גופים אוניברסלית — עבר (13 גופים)
  // r3Vowel: התנועה שמקבל ר3 לפני הסיומת; suffix: הסיומת עצמה (ערבית+תעתיק)
  // ---------------------------------------------------------------------
  const PAST_PERSONS = [
    { id: "ana", label: "أنا (אני)", r3Vowel: SUKUN, suffix: { ar: "ت" + DAMMA, he: "ת" } },
    { id: "anta", label: "أنتَ (אתה)", r3Vowel: SUKUN, suffix: { ar: "ت" + FATHA, he: "ת" } },
    { id: "anti", label: "أنتِ (את)", r3Vowel: SUKUN, suffix: { ar: "ت" + KASRA, he: "ת" } },
    { id: "huwa", label: "هو (הוא)", r3Vowel: FATHA, suffix: { ar: "", he: "" } },
    { id: "hiya", label: "هي (היא)", r3Vowel: FATHA, suffix: { ar: "ت" + SUKUN, he: "ת" } },
    { id: "nahnu", label: "نحن (אנחנו)", r3Vowel: SUKUN, suffix: { ar: "ن" + FATHA + ALIF, he: "נא" } },
    { id: "antuma", label: "أنتما (אתם/ן השניים)", r3Vowel: SUKUN, suffix: { ar: "ت" + DAMMA + "م" + FATHA + ALIF, he: "תמא" } },
    { id: "antum", label: "أنتم (אתם)", r3Vowel: SUKUN, suffix: { ar: "ت" + DAMMA + "م" + SUKUN, he: "תמ" } },
    { id: "antunna", label: "أنتن (אתן)", r3Vowel: SUKUN, suffix: { ar: "ت" + DAMMA + "ن" + SHADDA + FATHA, he: "תנן" } },
    { id: "huma_m", label: "هما ז' (הם השניים)", r3Vowel: FATHA, suffix: { ar: ALIF, he: "א" } },
    { id: "huma_f", label: "هما נ' (הן השתיים)", r3Vowel: FATHA, suffix: { ar: "ت" + FATHA + ALIF, he: "תא" } },
    { id: "hum", label: "هم (הם)", r3Vowel: DAMMA, suffix: { ar: WAW + ALIF, he: "וא" } },
    { id: "hunna", label: "هن (הן)", r3Vowel: SUKUN, suffix: { ar: "ن" + FATHA, he: "ן" } },
  ];

  // ---------------------------------------------------------------------
  // טבלת גופים אוניברסלית — הווה/עתיד (13 גופים)
  // prefix: עיצור+תנועת תחילית הגוף (התנועה עצמה תלוית-בניין, ר' presentVowel)
  // suffix: תנועת ר3 + כל אות נוספת אחרי ר3
  // ---------------------------------------------------------------------
  const PRESENT_PERSONS = [
    { id: "ana", label: "أنا (אני)", prefix: "أ", prefixHe: "א", suffix: (v) => ({ ar: v, he: "" }) },
    { id: "anta", label: "أنتَ (אתה)", prefix: "ت", prefixHe: "ת", suffix: (v) => ({ ar: v, he: "" }) },
    {
      id: "anti", label: "أنتِ (את)", prefix: "ت", prefixHe: "ת",
      suffix: () => ({ ar: KASRA + YA + "ن" + FATHA, he: "ין" }),
    },
    { id: "huwa", label: "هو (הוא)", prefix: "ي", prefixHe: "י", suffix: (v) => ({ ar: v, he: "" }) },
    { id: "hiya", label: "هي (היא)", prefix: "ت", prefixHe: "ת", suffix: (v) => ({ ar: v, he: "" }) },
    { id: "nahnu", label: "نحن (אנחנו)", prefix: "ن", prefixHe: "נ", suffix: (v) => ({ ar: v, he: "" }) },
    {
      id: "antuma", label: "أنتما (אתם/ן השניים)", prefix: "ت", prefixHe: "ת",
      suffix: () => ({ ar: FATHA + ALIF + "ن" + KASRA, he: "אן" }),
    },
    {
      id: "antum", label: "أنتم (אתם)", prefix: "ت", prefixHe: "ת",
      suffix: () => ({ ar: DAMMA + WAW + "ن" + FATHA, he: "ון" }),
    },
    {
      id: "antunna", label: "أنتن (אתן)", prefix: "ت", prefixHe: "ת",
      suffix: () => ({ ar: SUKUN + "ن" + FATHA, he: "ן" }),
    },
    {
      id: "huma_m", label: "هما ז' (הם השניים)", prefix: "ي", prefixHe: "י",
      suffix: () => ({ ar: FATHA + ALIF + "ن" + KASRA, he: "אן" }),
    },
    {
      id: "huma_f", label: "هما נ' (הן השתיים)", prefix: "ت", prefixHe: "ת",
      suffix: () => ({ ar: FATHA + ALIF + "ن" + KASRA, he: "אן" }),
    },
    {
      id: "hum", label: "هم (הם)", prefix: "ي", prefixHe: "י",
      suffix: () => ({ ar: DAMMA + WAW + "ن" + FATHA, he: "ון" }),
    },
    {
      id: "hunna", label: "هن (הן)", prefix: "ي", prefixHe: "י",
      suffix: () => ({ ar: SUKUN + "ن" + FATHA, he: "ן" }),
    },
  ];

  // ---------------------------------------------------------------------
  // טבלת גופים אוניברסלית — ציווי (5 גופים בלבד, נוכח)
  // ---------------------------------------------------------------------
  const IMPERATIVE_PERSONS = [
    { id: "anta", label: "أنتَ (אתה)", suffix: { ar: SUKUN, he: "" } },
    { id: "anti", label: "أنتِ (את)", suffix: { ar: KASRA + YA, he: "י" } },
    { id: "antuma", label: "أنتما (אתם/ן השניים)", suffix: { ar: FATHA + ALIF, he: "א" } },
    { id: "antum", label: "أنتم (אתם)", suffix: { ar: DAMMA + WAW + ALIF, he: "וא" } },
    { id: "antunna", label: "أنتن (אתן)", suffix: { ar: SUKUN + "ن" + FATHA, he: "ן" } },
  ];

  function getBinyan(id) {
    const b = BINYANIM.find((x) => x.id === id);
    if (!b) throw new Error("בניין לא מוכר: " + id);
    return b;
  }

  function rootParts(root) {
    // root: אובייקט מתוך VERB_ROOTS { r1, r2, r3, translit }
    const h1 = heLetter(root.r1);
    const h2 = heLetter(root.r2);
    const h3 = heLetter(root.r3);
    return { r1: root.r1, r2: root.r2, r3: root.r3, h1, h2, h3 };
  }

  // בונה צורת עבר לגוף נתון
  function conjugatePast(root, binyanId, personId) {
    const b = getBinyan(binyanId);
    const { r1, r2, r3, h1, h2, h3 } = rootParts(root);
    const base = b.pastBase(r1, r2, h1, h2, root);
    const person = PAST_PERSONS.find((p) => p.id === personId);
    if (!person) throw new Error("גוף לא מוכר: " + personId);
    return normPair({
      ar: base.ar + r3 + person.r3Vowel + person.suffix.ar,
      he: base.he + h3 + person.suffix.he,
    });
  }

  // בונה צורת הווה/עתיד לגוף נתון
  function conjugatePresent(root, binyanId, personId) {
    const b = getBinyan(binyanId);
    const { r1, r2, r3, h1, h2, h3 } = rootParts(root);
    const base = b.presentBase(r1, r2, h1, h2, root);
    const vowelMark = b.presentVowel === "u" ? DAMMA : FATHA;
    const person = PRESENT_PERSONS.find((p) => p.id === personId);
    if (!person) throw new Error("גוף לא מוכר: " + personId);
    // בגוף "אני/אתה/הוא/היא/אנחנו" הסיומת היא פשוט תנועת ר3, שהיא תמיד ضمة (DAMMA)
    // בהווה/עתיד הבסיסי בכל הבניינים (טבלה 3.3); שאר הגופים מתעלמים מהפרמטר
    // ומחזירים סיומת קבועה משלהם.
    const sfx = person.suffix(DAMMA);
    return normPair({
      ar: person.prefix + vowelMark + base.ar + r3 + sfx.ar,
      he: person.prefixHe + base.he + h3 + sfx.he,
    });
  }

  // ---------------------------------------------------------------------
  // מנצוב/מג'זום - שני "מצבים" (moods) נוספים של ההווה/עתיד, המופעלים
  // ע"י מילות ניצוב/ג'זם. הכלל האוניברסלי (זהה בכל הבניינים, נגזר מאותה
  // תבנית presentBase של ההווה הרגיל):
  //  - חמשת הגופים "הרגילים" (أنا/أنتَ/هو/هي/نحن): רק תנועת הסיומת
  //    משתנה - מונצב = פתחة (ـَ), מג'זום = סוкون (ـْ). בתעתיק העיצורי
  //    אין הבדל, כי תנועות קצרות אינן מסומנות ממילא.
  //  - "חמשת האפעאל" (أنتِ/أنتما/أنتم/هما ז'/هما נ'/هم - 6 גופים,
  //    5 תבניות ייחודיות): מונצב ומג'זום זהים - מפילים את ה-ن הסופית.
  //  - أنتن/هن: אינם משתנים כלל בין המצבים (תמיד ـْنَ).
  // ---------------------------------------------------------------------
  const MOOD_UNCHANGED_PERSONS = ["antunna", "hunna"];
  const FIVE_VERBS_MOOD_SUFFIX = {
    anti: { ar: KASRA + YA, he: "י" },
    antuma: { ar: FATHA + ALIF, he: "א" },
    huma_m: { ar: FATHA + ALIF, he: "א" },
    huma_f: { ar: FATHA + ALIF, he: "א" },
    antum: { ar: DAMMA + WAW + ALIF, he: "ו" },
    hum: { ar: DAMMA + WAW + ALIF, he: "ו" },
  };

  // בונה צורת הווה/עתיד במצב מנצוב או מג'זום. mood: 'mansub' | 'majzum'
  function conjugatePresentMood(root, binyanId, personId, mood) {
    if (MOOD_UNCHANGED_PERSONS.includes(personId)) {
      return conjugatePresent(root, binyanId, personId);
    }
    const b = getBinyan(binyanId);
    const { r1, r2, r3, h1, h2, h3 } = rootParts(root);
    const base = b.presentBase(r1, r2, h1, h2, root);
    const vowelMark = b.presentVowel === "u" ? DAMMA : FATHA;
    const person = PRESENT_PERSONS.find((p) => p.id === personId);
    if (!person) throw new Error("גוף לא מוכר: " + personId);

    const fiveVerbsSuffix = FIVE_VERBS_MOOD_SUFFIX[personId];
    const sfx = fiveVerbsSuffix ? fiveVerbsSuffix : person.suffix(mood === "mansub" ? FATHA : SUKUN);
    return normPair({
      ar: person.prefix + vowelMark + base.ar + r3 + sfx.ar,
      he: person.prefixHe + base.he + h3 + sfx.he,
    });
  }

  // בונה צורת ציווי לגוף נתון (5 גופים בלבד)
  function conjugateImperative(root, binyanId, personId) {
    const b = getBinyan(binyanId);
    const { r1, r2, r3, h1, h2, h3 } = rootParts(root);
    const base = b.presentBase(r1, r2, h1, h2, root); // אותו גזע כמו בהווה
    const person = IMPERATIVE_PERSONS.find((p) => p.id === personId);
    if (!person) throw new Error("גוף לא מוכר: " + personId);
    // imperativeHamza בבניין I הוא פונקציה של root (כלל ההרמוניה); בשאר
    // הבניינים זהו אובייקט קבוע או null, כפי שהיה עד כה.
    const hamza = typeof b.imperativeHamza === "function" ? b.imperativeHamza(root) : b.imperativeHamza;
    const hamzaAr = hamza ? hamza.ar : "";
    const hamzaHe = hamza ? hamza.he : "";
    return normPair({
      ar: hamzaAr + base.ar + r3 + person.suffix.ar,
      he: hamzaHe + base.he + h3 + person.suffix.he,
    });
  }

  // בונה מצדר (ללא נטיית גוף); מחזיר null אם לא ניתן לגנרציה (בניין I)
  function conjugateMasdar(root, binyanId) {
    const b = getBinyan(binyanId);
    if (!b.masdar) return null;
    const { r1, r2, r3, h1, h2, h3 } = rootParts(root);
    return normPair(b.masdar(r1, r2, r3, h1, h2, h3));
  }

  // בונה את הפרדיגמה המלאה (כל הזמנים, כל הגופים) לשורש+בניין נתונים
  function conjugateFull(root, binyanId) {
    const b = getBinyan(binyanId);
    const past = {};
    const present = {};
    const imperative = {};
    PAST_PERSONS.forEach((p) => (past[p.id] = conjugatePast(root, binyanId, p.id)));
    PRESENT_PERSONS.forEach((p) => (present[p.id] = conjugatePresent(root, binyanId, p.id)));
    IMPERATIVE_PERSONS.forEach((p) => (imperative[p.id] = conjugateImperative(root, binyanId, p.id)));
    return {
      binyan: b,
      root,
      past,
      present,
      imperative,
      masdar: conjugateMasdar(root, binyanId),
    };
  }

  // API אחיד ליצירת צורה בודדת: tense אחד מתוך 'past'|'present'|'imperative'|'masdar'
  function generateForm(root, binyanId, tense, personId) {
    switch (tense) {
      case "past":
        return conjugatePast(root, binyanId, personId);
      case "present":
        return conjugatePresent(root, binyanId, personId);
      case "imperative":
        return conjugateImperative(root, binyanId, personId);
      case "masdar":
        return conjugateMasdar(root, binyanId);
      default:
        throw new Error("זמן לא מוכר: " + tense);
    }
  }

  const VerbEngine = {
    BINYANIM,
    PAST_PERSONS,
    PRESENT_PERSONS,
    IMPERATIVE_PERSONS,
    AR_TO_HE,
    heLetter,
    getBinyan,
    conjugatePast,
    conjugatePresent,
    conjugatePresentMood,
    conjugateImperative,
    conjugateMasdar,
    conjugateFull,
    generateForm,
  };

  global.VerbEngine = VerbEngine;
})(typeof window !== "undefined" ? window : globalThis);
