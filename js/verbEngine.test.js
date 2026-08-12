// בדיקות QA למנוע נטיית הפועל (סעיף 3.5 במפרט).
// בדיקות console.assert פשוטות, ללא framework, על שורש הבדיקה כ-ת-ב
// בבניינים I, II, IV, VII, X, ובניין I גם על فهم (i/a) ו-جلس (a/i) כדי
// לכסות את שלושת דפוסי התנועה הלקסיקליים האפשריים - חובה שיעברו כולן
// לפני שהתכונה נחשבת גמורה.

(function (global) {
  "use strict";

  function runVerbEngineTests() {
    const results = { pass: 0, fail: 0, failures: [] };

    function check(name, actual, expected) {
      const ok = actual === expected;
      console.assert(ok, `[verbEngine QA] ${name}: קיבלנו "${actual}" ציפינו "${expected}"`);
      if (ok) {
        results.pass++;
      } else {
        results.fail++;
        results.failures.push({ name, actual, expected });
      }
    }

    // كتب: פעל יסודי בדפוס a/u (עבר a, הווה u) - ראה VERB_ROOTS
    const KATABA = { root: "كتب", r1: "ك", r2: "ت", r3: "ب", translit: "כתב", pastVowel: "a", presentVowel: "u" };

    // ------------------------------------------------------------------
    // בניין I (فَعَلَ / يَفْعُلُ / اُفْعُلْ) - מצدر לא ניתן לגנרציה.
    // תנועת ר2 היא לקסיקלית לכל שורש (ראה root.pastVowel/presentVowel) -
    // עבור كتب הדפוס הוא a/u, ולכן ההווה/ציווי משתמשים ב-ضمة (u) לא ב-فتحة.
    // ------------------------------------------------------------------
    check("I past huwa (ar)", VerbEngine.conjugatePast(KATABA, "I", "huwa").ar, "كَتَبَ");
    check("I past huwa (he)", VerbEngine.conjugatePast(KATABA, "I", "huwa").he, "כתב");
    check("I past ana (ar)", VerbEngine.conjugatePast(KATABA, "I", "ana").ar, "كَتَبْتُ");
    check("I present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "I", "huwa").ar, "يَكْتُبُ");
    check("I present anti (ar)", VerbEngine.conjugatePresent(KATABA, "I", "anti").ar, "تَكْتُبِينَ");
    check("I imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "I", "anta").ar, "اُكْتُبْ");
    check("I masdar is null", VerbEngine.conjugateMasdar(KATABA, "I"), null);

    // ------------------------------------------------------------------
    // בניין I - שני דפוסי תנועה נוספים, לכיסוי שלושת הדפוסים האפשריים:
    // فهم (i/a) و-جلس (a/i). מוודא שהתנועה נגזרת מהשורש ולא מקובעת בקוד.
    // ------------------------------------------------------------------
    const FAHIMA = { root: "فهم", r1: "ف", r2: "ه", r3: "م", translit: "פהמ", pastVowel: "i", presentVowel: "a" };
    check("I (فهم i/a) past huwa (ar)", VerbEngine.conjugatePast(FAHIMA, "I", "huwa").ar, "فَهِمَ");
    check("I (فهم i/a) present huwa (ar)", VerbEngine.conjugatePresent(FAHIMA, "I", "huwa").ar, "يَفْهَمُ");
    check("I (فهم i/a) imperative anta (ar)", VerbEngine.conjugateImperative(FAHIMA, "I", "anta").ar, "اِفْهَمْ");

    const JALASA = { root: "جلس", r1: "ج", r2: "ل", r3: "س", translit: "ג׳לס", pastVowel: "a", presentVowel: "i" };
    check("I (جلس a/i) past huwa (ar)", VerbEngine.conjugatePast(JALASA, "I", "huwa").ar, "جَلَسَ");
    check("I (جلس a/i) present huwa (ar)", VerbEngine.conjugatePresent(JALASA, "I", "huwa").ar, "يَجْلِسُ");
    check("I (جلس a/i) imperative anta (ar)", VerbEngine.conjugateImperative(JALASA, "I", "anta").ar, "اِجْلِسْ");

    // תאימות לאחור: שורש בלי pastVowel/presentVowel חייב עדיין להתנהג בדיוק
    // כמו קודם (ברירת מחדל a/a) - כדי שלא ליפול על נתונים ישנים/חסרים.
    const LEGACY_ROOT = { root: "فعل", r1: "ف", r2: "ع", r3: "ل", translit: "פעל" };
    check("I legacy root (no vowel fields) past huwa (ar)", VerbEngine.conjugatePast(LEGACY_ROOT, "I", "huwa").ar, "فَعَلَ");
    check("I legacy root (no vowel fields) present huwa (ar)", VerbEngine.conjugatePresent(LEGACY_ROOT, "I", "huwa").ar, "يَفْعَلُ");
    check("I legacy root (no vowel fields) imperative anta (ar)", VerbEngine.conjugateImperative(LEGACY_ROOT, "I", "anta").ar, "اِفْعَلْ");

    // ------------------------------------------------------------------
    // בניין II (فَعَّلَ / يُفَعِّلُ / فَعِّلْ / تَفْعِيل) - דוגמת המפרט המדויקת
    // ------------------------------------------------------------------
    check("II past huwa (ar)", VerbEngine.conjugatePast(KATABA, "II", "huwa").ar, "كَتَّبَ");
    check("II present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "II", "huwa").ar, "يُكَتِّبُ");
    check("II imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "II", "anta").ar, "كَتِّبْ");
    check("II masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "II").ar, "تَكْتِيب");
    check("II past huwa (he)", VerbEngine.conjugatePast(KATABA, "II", "huwa").he, "כתב");
    check("II masdar (he)", VerbEngine.conjugateMasdar(KATABA, "II").he, "תכתיב");

    // ------------------------------------------------------------------
    // בניין V (تَفَعَّلَ / يَتَفَعَّلُ / تَفَعَّلْ / تَفَعُّل) - בניגוד לבניין II,
    // תנועת ר2 בהווה/ציווי זהה לזו שבעבר (فتحة, לא كسرة) - ראו הערה ב-BINYANIM.
    // ------------------------------------------------------------------
    check("V past huwa (ar)", VerbEngine.conjugatePast(KATABA, "V", "huwa").ar, "تَكَتَّبَ");
    check("V present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "V", "huwa").ar, "يَتَكَتَّبُ");
    check("V imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "V", "anta").ar, "تَكَتَّبْ");
    check("V masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "V").ar, "تَكَتُّب");

    // ------------------------------------------------------------------
    // בניין VI (تَفَاعَلَ / يَتَفَاعَلُ / تَفَاعَلْ / تَفَاعُل) - בניגוד לבניין III,
    // תנועת ר2 בהווה/ציווי זהה לזו שבעבר (فتحة, לא كسرة) - ראו הערה ב-BINYANIM.
    // ------------------------------------------------------------------
    check("VI past huwa (ar)", VerbEngine.conjugatePast(KATABA, "VI", "huwa").ar, "تَكَاتَبَ");
    check("VI present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "VI", "huwa").ar, "يَتَكَاتَبُ");
    check("VI imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "VI", "anta").ar, "تَكَاتَبْ");
    check("VI masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "VI").ar, "تَكَاتُب");

    // ------------------------------------------------------------------
    // בניין IV (أَفْعَلَ / يُفْعِلُ / أَفْعِلْ / إِفْعَال)
    // ------------------------------------------------------------------
    check("IV past huwa (ar)", VerbEngine.conjugatePast(KATABA, "IV", "huwa").ar, "أَكْتَبَ");
    check("IV present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "IV", "huwa").ar, "يُكْتِبُ");
    check("IV imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "IV", "anta").ar, "أَكْتِبْ");
    check("IV masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "IV").ar, "إِكْتَاب");

    // ------------------------------------------------------------------
    // בניין VII (اِنْفَعَلَ / يَنْفَعِلُ / اِنْفَعِلْ / اِنْفِعَال)
    // ------------------------------------------------------------------
    check("VII past huwa (ar)", VerbEngine.conjugatePast(KATABA, "VII", "huwa").ar, "اِنْكَتَبَ");
    check("VII present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "VII", "huwa").ar, "يَنْكَتِبُ");
    check("VII imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "VII", "anta").ar, "اِنْكَتِبْ");
    check("VII masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "VII").ar, "اِنْكِتَاب");

    // ------------------------------------------------------------------
    // בניין X (اِسْتَفْعَلَ / يَسْتَفْعِلُ / اِسْتَفْعِلْ / اِسْتِفْعَال)
    // ------------------------------------------------------------------
    check("X past huwa (ar)", VerbEngine.conjugatePast(KATABA, "X", "huwa").ar, "اِسْتَكْتَبَ");
    check("X present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "X", "huwa").ar, "يَسْتَكْتِبُ");
    check("X imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "X", "anta").ar, "اِسْتَكْتِبْ");
    check("X masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "X").ar, "اِسْتِكْتَاب");

    // ------------------------------------------------------------------
    // מנצוב/מג'זום (הווה/עתיד) - בניין I על שורש כ-ת-ב (a/u, ר2 בהווה = ضمة)
    // ------------------------------------------------------------------
    check("mansub huwa (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huwa", "mansub").ar, "يَكْتُبَ");
    check("majzum huwa (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huwa", "majzum").ar, "يَكْتُبْ");
    check("mansub/majzum anti (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "anti", "mansub").ar, "تَكْتُبِي");
    check("mansub/majzum antum (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "antum", "majzum").ar, "تَكْتُبُوا");
    check("mansub/majzum huma_m (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huma_m", "mansub").ar, "يَكْتُبَا");
    check(
      "antunna unchanged across moods (ar)",
      VerbEngine.conjugatePresentMood(KATABA, "I", "antunna", "majzum").ar,
      VerbEngine.conjugatePresent(KATABA, "I", "antunna").ar
    );

    // ------------------------------------------------------------------
    // בדיקת שפיות: כל 40 השורשים מייצרים צורה בכל בניין/זמן ללא חריגה
    // ------------------------------------------------------------------
    let sanityErrors = 0;
    if (global.VERB_ROOTS) {
      global.VERB_ROOTS.forEach((root) => {
        VerbEngine.BINYANIM.forEach((b) => {
          try {
            const full = VerbEngine.conjugateFull(root, b.id);
            const allForms = [
              ...Object.values(full.past),
              ...Object.values(full.present),
              ...Object.values(full.imperative),
            ];
            allForms.forEach((f) => {
              if (!f.ar || !f.he) throw new Error("צורה ריקה");
            });
          } catch (e) {
            sanityErrors++;
            console.assert(false, `[verbEngine QA] שגיאה עבור שורש ${root.root} בניין ${b.id}: ${e.message}`);
          }
        });
      });
    }
    check("40 שורשים * 9 בניינים ללא שגיאות", sanityErrors, 0);

    console.log(
      `[verbEngine QA] ${results.pass} בדיקות עברו, ${results.fail} נכשלו` +
        (results.fail ? " -- " + JSON.stringify(results.failures) : "")
    );
    return results;
  }

  global.runVerbEngineTests = runVerbEngineTests;
})(typeof window !== "undefined" ? window : globalThis);
