// בדיקות QA למנוע נטיית הפועל (סעיף 3.5 במפרט).
// בדיקות console.assert פשוטות, ללא framework, על שורש הבדיקה כ-ת-ב
// בבניינים I, II, IV, VII, X - חובה שיעברו כולן לפני שהתכונה נחשבת גמורה.

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

    const KATABA = { root: "كتب", r1: "ك", r2: "ت", r3: "ب", translit: "כתב" };

    // ------------------------------------------------------------------
    // בניין I (فَعَلَ / يَفْعَلُ / اِفْعَلْ) - מצدر לא ניתן לגנרציה
    // ------------------------------------------------------------------
    check("I past huwa (ar)", VerbEngine.conjugatePast(KATABA, "I", "huwa").ar, "كَتَبَ");
    check("I past huwa (he)", VerbEngine.conjugatePast(KATABA, "I", "huwa").he, "כתב");
    check("I past ana (ar)", VerbEngine.conjugatePast(KATABA, "I", "ana").ar, "كَتَبْتُ");
    check("I present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "I", "huwa").ar, "يَكْتَبُ");
    check("I present anti (ar)", VerbEngine.conjugatePresent(KATABA, "I", "anti").ar, "تَكْتَبِينَ");
    check("I imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "I", "anta").ar, "اِكْتَبْ");
    check("I masdar is null", VerbEngine.conjugateMasdar(KATABA, "I"), null);

    // ------------------------------------------------------------------
    // בניין II (فَعَّلَ / يُفَعِّلُ / فَعِّلْ / تَفْعِيل) - דוגמת המפרט המדויקת
    // ------------------------------------------------------------------
    check("II past huwa (ar)", VerbEngine.conjugatePast(KATABA, "II", "huwa").ar, "كَتَّبَ");
    check("II present huwa (ar)", VerbEngine.conjugatePresent(KATABA, "II", "huwa").ar, "يُكَتِّبُ");
    check("II imperative anta (ar)", VerbEngine.conjugateImperative(KATABA, "II", "anta").ar, "كَتِّبْ");
    check("II masdar (ar)", VerbEngine.conjugateMasdar(KATABA, "II").ar, "تَكْتِيب");
    check("II past huwa (he)", VerbEngine.conjugatePast(KATABA, "II", "huwa").he, "כתתב");
    check("II masdar (he)", VerbEngine.conjugateMasdar(KATABA, "II").he, "תכתיב");

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
    // מנצוב/מג'זום (הווה/עתיד) - בניין I על שורש כ-ת-ב
    // ------------------------------------------------------------------
    check("mansub huwa (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huwa", "mansub").ar, "يَكْتَبَ");
    check("majzum huwa (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huwa", "majzum").ar, "يَكْتَبْ");
    check("mansub/majzum anti (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "anti", "mansub").ar, "تَكْتَبِي");
    check("mansub/majzum antum (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "antum", "majzum").ar, "تَكْتَبُوا");
    check("mansub/majzum huma_m (ar)", VerbEngine.conjugatePresentMood(KATABA, "I", "huma_m", "mansub").ar, "يَكْتَبَا");
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
