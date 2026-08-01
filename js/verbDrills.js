// תרגילי ניתוח פועל (סעיף 3.4 במפרט), מוזנים מ-VerbEngine (js/verbEngine.js).
// "זהה את הפועל" - המערכת מציגה צורה מנוטה, המשתמש מזהה שורש/בניין/זמן/גוף.
// אחרי מענה על שאלה לוחצים "בדקו תשובה" ומקבלים משוב מיידי (נכון/שגוי +
// הצורה הנכונה), ורק אז עוברים ל"שאלה הבאה"; בסיום - מסך תוצאות מלא.
//
// מצב נוסף, "בנו את הפועל", הוסר מהאתר ב-2026-07-17 לבקשת המשתמש. גיבוי מלא
// ("photograph" מדויק של הקוד שהוסר + הוראות שחזור) שמור ב-
// scripts/archived_build_verb_mode.js (קובץ לא נטען, לא רץ כחלק מהאתר).

(function (global) {
  "use strict";
  const { el, shuffle, sample, recordQuizResult, showToast } = App;

  const TENSES = ["past", "present", "imperative", "masdar"];
  const TENSE_LABELS = { past: "עבר", present: "הווה/עתיד", imperative: "ציווי", masdar: "מצדר" };

  // "זהה את הפועל" משתמש בסט קבוע של 550 פעלים מאומתים (data/verb-practice-set.js,
  // נגזר מגיליון "פתרונות" באקסל), מחולק ל-55 תרגולים של 10 שאלות כל אחד ללא
  // כפילויות (לא גנרציה אקראית).
  const DRILL_SIZE = 10;
  const TOTAL_DRILLS = Math.ceil(VERB_PRACTICE_SET.length / DRILL_SIZE);
  const rootsByArabic = new Map(VERB_ROOTS.map((r) => [r.root, r]));

  // הסדר הגולמי בגיליון "פתרונות" לא מפוזר: לדוגמה שורות 501-550 (היו תרגולים
  // 51-55) הן כולן בניין 1 בלבד. DRILL_ORDER הוא פיזור קבוע ומחושב-מראש של
  // האינדקסים 0-549 (בתוך VERB_PRACTICE_SET) ל-55 קבוצות של 10, כך שבכל תרגול
  // יש מגוון שורשים/בניינים/זמנים (נבנה ב-Python: shuffle עם seed קבוע, ואז
  // הצבה חמדנית (greedy) שממזערת חזרות של אותו שורש/בניין/זמן בתוך כל תרגול -
  // התוצאה: לכל תרגול לכל היותר 2 פריטים מאותו שורש ו-3 מאותו בניין). הסדר
  // הזה קבוע (embedded כאן, לא מחושב מחדש בדפדפן) - כך שגם תוכן התרגול וגם
  // סדר השאלות בתוכו נשארים זהים בכל כניסה לאותו תרגול. לא נוגעים
  // ב-data/verb-practice-set.js עצמו (קובץ מחושב אוטומטית מהאקסל).
  const DRILL_ORDER = [
    473, 125, 388, 412, 71, 128, 381, 374, 547, 249, 242, 274, 259, 117, 479, 82, 454, 509, 154, 366,
    455, 83, 12, 319, 30, 159, 13, 527, 148, 523, 303, 421, 22, 546, 233, 318, 474, 59, 260, 163,
    376, 129, 221, 185, 161, 89, 404, 45, 170, 541, 17, 152, 119, 222, 272, 80, 183, 325, 16, 497,
    355, 407, 369, 379, 5, 499, 539, 273, 35, 323, 211, 26, 134, 350, 202, 536, 245, 190, 411, 95,
    314, 261, 127, 532, 232, 29, 378, 76, 278, 408, 275, 192, 144, 208, 426, 427, 189, 513, 162, 103,
    49, 517, 47, 164, 220, 286, 461, 138, 200, 63, 299, 196, 526, 297, 88, 212, 61, 406, 308, 310,
    203, 371, 15, 191, 446, 198, 293, 357, 431, 505, 135, 247, 56, 434, 84, 241, 502, 230, 227, 495,
    432, 465, 251, 248, 270, 535, 359, 18, 243, 361, 363, 224, 519, 302, 25, 180, 20, 328, 481, 430,
    391, 344, 225, 187, 253, 522, 179, 402, 422, 143, 375, 487, 343, 307, 346, 416, 36, 504, 420, 250,
    194, 508, 353, 33, 167, 132, 291, 348, 424, 360, 263, 339, 169, 370, 351, 392, 365, 543, 96, 122,
    139, 498, 400, 352, 382, 457, 531, 8, 493, 444, 90, 43, 91, 279, 155, 226, 107, 124, 515, 55,
    258, 255, 447, 145, 121, 205, 496, 322, 149, 516, 503, 116, 419, 458, 403, 6, 397, 141, 294, 265,
    462, 58, 441, 93, 174, 410, 23, 110, 276, 469, 540, 151, 433, 2, 264, 234, 78, 443, 1, 97,
    118, 326, 100, 4, 50, 311, 331, 428, 538, 266, 168, 131, 244, 219, 485, 287, 240, 120, 518, 142,
    201, 238, 401, 395, 176, 501, 439, 182, 472, 288, 521, 156, 386, 390, 491, 320, 271, 450, 341, 14,
    332, 28, 106, 10, 506, 40, 490, 489, 494, 414, 136, 177, 57, 425, 52, 246, 257, 460, 282, 500,
    199, 399, 62, 309, 377, 228, 548, 112, 166, 338, 342, 157, 153, 207, 530, 213, 476, 367, 280, 32,
    405, 79, 186, 549, 109, 69, 372, 437, 313, 223, 254, 429, 440, 53, 77, 193, 542, 171, 19, 113,
    507, 368, 262, 451, 423, 0, 102, 74, 358, 75, 172, 105, 231, 188, 533, 334, 99, 478, 305, 477,
    467, 24, 354, 39, 335, 525, 384, 11, 123, 483, 380, 215, 27, 529, 236, 98, 37, 480, 94, 290,
    442, 393, 295, 484, 514, 67, 486, 42, 214, 229, 327, 130, 206, 137, 7, 60, 396, 511, 300, 394,
    73, 146, 470, 85, 475, 114, 438, 87, 417, 488, 210, 3, 181, 38, 204, 471, 81, 464, 104, 362,
    466, 68, 315, 389, 160, 524, 217, 252, 347, 46, 44, 449, 289, 126, 70, 340, 468, 528, 147, 41,
    108, 277, 283, 545, 364, 383, 324, 301, 133, 150, 520, 385, 285, 9, 34, 330, 459, 31, 387, 72,
    64, 184, 21, 111, 512, 158, 86, 268, 373, 209, 436, 281, 173, 284, 321, 306, 175, 415, 197, 534,
    312, 333, 463, 337, 398, 510, 218, 456, 336, 317, 329, 48, 316, 537, 269, 345, 239, 349, 66, 256,
    304, 237, 178, 292, 165, 418, 452, 140, 409, 453, 435, 356, 195, 492, 65, 413, 482, 51, 267, 101,
    544, 235, 54, 216, 115, 298, 92, 296, 448, 445,
  ];
  const PRACTICE_SET = DRILL_ORDER.map((i) => VERB_PRACTICE_SET[i]);

  function drillItems(drillNum) {
    const start = (drillNum - 1) * DRILL_SIZE;
    return PRACTICE_SET.slice(start, start + DRILL_SIZE);
  }

  function questionFromItem(item) {
    const root = rootsByArabic.get(item.root);
    const binyan = VerbEngine.getBinyan(item.binyanId);
    const form = VerbEngine.generateForm(root, item.binyanId, item.tense, item.personId);
    return { tense: item.tense, binyan, root, personId: item.personId, form };
  }

  function registerRoutes(route) {
    route("verbs", renderVerbsHome);
    route("verbs/identify", renderIdentifyDrillHub);
    route("verbs/identify/:drillNum", runIdentifyQuiz);
  }

  function renderIdentifyDrillHub() {
    const drills = Array.from({ length: TOTAL_DRILLS }, (_, i) => i + 1);
    return el("div", { class: "view view--identify-hub" }, [
      pageHeader(
        "זהה את הפועל — בחרו תרגול",
        `${VERB_PRACTICE_SET.length} פעלים מאומתים, מחולקים ל-${TOTAL_DRILLS} תרגולים של ${DRILL_SIZE} שאלות כל אחד, ללא כפילויות.`,
        "#/verbs"
      ),
      el(
        "div",
        { class: "home-cards" },
        drills.map((n) =>
          el("a", { class: "home-card home-card--drill", href: `#/verbs/identify/${n}` }, [
            el("h2", { class: "home-card__title" }, [`תרגול ${n}`]),
          ])
        )
      ),
    ]);
  }

  function renderVerbsHome() {
    const container = el("div", { class: "view view--verbs-home" }, [
      pageHeader("תרגול פעלים", "תרגול תבניתי-דקדוקי על סמך מנוע נטייה דטרמיניסטי. לא כל צורה שנוצרת היא בהכרח מילה נפוצה/אמיתית — זהו כלי לתרגול חוקי הבניינים."),
      el("div", { class: "mode-cards" }, [
        el("a", { class: "mode-card mode-card--identify", href: "#/verbs/identify" }, [
          el("div", { class: "mode-card__icon", "aria-hidden": "true" }, ["🔍"]),
          el("h3", {}, ["זהה את הפועל"]),
          el("p", {}, ["המערכת מציגה צורה מנוטה, ואתם מזהים שורש, בניין, זמן וגוף. 550 פעלים מאומתים, מחולקים לתרגולים של 10 שאלות כל אחד."]),
        ]),
      ]),
    ]);
    return container;
  }

  function personLabel(tense, personId) {
    if (!personId) return "—";
    const pool = tense === "imperative" ? VerbEngine.IMPERATIVE_PERSONS : VerbEngine.PAST_PERSONS;
    const p = pool.find((x) => x.id === personId);
    return p ? p.label : personId;
  }

  // -------------------------------------------------------------
  // מצב 1: זהה את הפועל
  // -------------------------------------------------------------
  function runIdentifyQuiz(params) {
    const drillNum = Number(params.drillNum) || 1;
    // סדר קבוע (לא shuffle) - כל כניסה לאותו תרגול נותנת בדיוק את אותו סדר
    // שאלות, כדי שאפשר יהיה לחזור ולתרגל את אותו תרגול ולהשוות ביצועים.
    const questions = drillItems(drillNum).map(questionFromItem);
    let qPos = 0;
    const answers = [];
    const container = el("div", { class: "view view--verb-quiz" });
    render();
    return container;

    function render() {
      container.innerHTML = "";
      if (qPos >= questions.length) return showResults();
      const q = questions[qPos];
      container.appendChild(pageHeader(`זהה את הפועל — תרגול ${drillNum}`, `שאלה ${qPos + 1} מתוך ${questions.length}`, "#/verbs/identify"));
      container.appendChild(progressBar(Math.round((qPos / questions.length) * 100)));

      container.appendChild(
        el("div", { class: "verb-prompt" }, [
          el("div", { class: "verb-prompt__arabic", lang: "ar" }, [q.form.ar]),
          el("div", { class: "verb-prompt__translit" }, [q.form.he]),
        ])
      );

      const state = { root: null, binyan: null, tense: null, person: null };
      const form = el("div", { class: "identify-form" });

      const rootGroup = choiceGroup("מה השורש?", rootOptions(q.root), (root) => (state.root = root), (r) => `${r.root} (${r.translit}) — ${r.hebrew}`, (r) => r.root);
      const binyanGroup = choiceGroup("מה הבניין?", binyanOptions(q), (b) => (state.binyan = b), (b) => b.name, (b) => b.id);
      const tenseGroup = choiceGroup("מה הזמן?", tenseOptions(), (t) => (state.tense = t), (t) => TENSE_LABELS[t], (t) => t);
      form.appendChild(rootGroup.el);
      form.appendChild(binyanGroup.el);
      form.appendChild(tenseGroup.el);

      let personGroup = null;
      if (q.tense !== "masdar") {
        personGroup = choiceGroup("מה הגוף?", personOptions(q), (p) => (state.person = p), (p) => p.label, (p) => p.id);
        form.appendChild(personGroup.el);
      } else {
        form.appendChild(el("p", { class: "hint-text" }, ["מצדר הוא שם עצם ואינו נוטה לפי גוף."]));
      }

      container.appendChild(form);

      let checked = false;
      const actionBtn = el("button", { class: "btn btn--primary btn--lg" }, ["בדקו תשובה"]);
      actionBtn.addEventListener("click", () => {
        if (!checked) {
          if (!state.root || !state.binyan || !state.tense || (q.tense !== "masdar" && !state.person)) {
            showToast("אנא ענו על כל השדות לפני הבדיקה");
            return;
          }
          const rootOk = state.root.root === q.root.root;
          const binyanOk = state.binyan.id === q.binyan.id;
          const tenseOk = state.tense === q.tense;
          const personOk = q.tense === "masdar" || (state.person && state.person.id === q.personId);
          const allOk = rootOk && binyanOk && tenseOk && personOk;

          rootGroup.freeze(q.root.root);
          binyanGroup.freeze(q.binyan.id);
          tenseGroup.freeze(q.tense);
          if (personGroup) personGroup.freeze(q.personId);

          answers.push({ q, given: { ...state } });
          checked = true;
          actionBtn.textContent = qPos === questions.length - 1 ? "סיום" : "שאלה הבאה";
          container.insertBefore(checkFeedback(allOk), actionBtn);
        } else {
          qPos++;
          render();
        }
      });
      container.appendChild(actionBtn);
    }

    function showResults() {
      const graded = answers.map((a) => {
        const rootOk = a.given.root.root === a.q.root.root;
        const binyanOk = a.given.binyan.id === a.q.binyan.id;
        const tenseOk = a.given.tense === a.q.tense;
        const personOk = a.q.tense === "masdar" || (a.given.person && a.given.person.id === a.q.personId);
        return { ...a, rootOk, binyanOk, tenseOk, personOk, allOk: rootOk && binyanOk && tenseOk && personOk };
      });
      const score = graded.filter((g) => g.allOk).length;
      recordQuizResult({ type: "verb-identify", length: graded.length, score, pct: Math.round((score / graded.length) * 100) });

      container.innerHTML = "";
      container.appendChild(pageHeader(`תוצאות: זהה את הפועל — תרגול ${drillNum}`, "", "#/verbs/identify"));
      container.appendChild(el("div", { class: "quiz-results__score" }, [el("bdi", { dir: "ltr" }, [`${score} / ${graded.length}`])]));
      container.appendChild(
        el(
          "ol",
          { class: "quiz-results__list" },
          graded.map((g) =>
            el("li", { class: "quiz-results__item " + (g.allOk ? "is-correct" : "is-wrong") }, [
              el("div", { class: "verb-result__form", lang: "ar" }, [g.q.form.ar, el("span", {}, [" (" + g.q.form.he + ")"])]),
              resultRow("שורש", `${g.given.root.root} (${g.given.root.translit})`, `${g.q.root.root} (${g.q.root.translit})`, g.rootOk),
              resultRow("בניין", g.given.binyan.name, g.q.binyan.name, g.binyanOk),
              resultRow("זמן", TENSE_LABELS[g.given.tense], TENSE_LABELS[g.q.tense], g.tenseOk),
              g.q.tense !== "masdar" ? resultRow("גוף", g.given.person.label, personLabel(g.q.tense, g.q.personId), g.personOk) : null,
            ])
          )
        )
      );
      container.appendChild(
        el("div", { class: "actions" }, [
          el("a", { class: "btn btn--primary", href: `#/verbs/identify/${drillNum}` }, ["בוחן חדש"]),
          el("a", { class: "btn", href: "#/verbs/identify" }, ["תרגול אחר"]),
          el("a", { class: "btn", href: "#/verbs" }, ["חזרה לתרגול פעלים"]),
        ])
      );
    }
  }

  function resultRow(label, given, correct, ok) {
    return el("div", { class: "result-row " + (ok ? "is-correct" : "is-wrong") }, [
      el("span", { class: "result-row__label" }, [label + ": "]),
      el("span", { class: "result-row__given" }, [given]),
      !ok ? el("span", { class: "result-row__correct" }, [" (נכון: " + correct + ")"]) : el("span", { class: "result-row__mark" }, [" ✓"]),
    ]);
  }

  // מחזיר { el, freeze(correctKey) } - freeze מנטרל את כל הכפתורים ומסמן
  // ירוק/אדום לפי נכונות, לשימוש בבדיקה המיידית אחרי מענה.
  function choiceGroup(question, options, onSelect, labelFn, keyFn) {
    const wrap = el("div", { class: "choice-group" }, [el("h4", {}, [question])]);
    const optsWrap = el("div", { class: "choice-group__options" });
    let selectedBtn = null;
    const entries = [];
    options.forEach((opt) => {
      const btn = el("button", { type: "button", class: "choice-btn" }, [labelFn(opt)]);
      btn.addEventListener("click", () => {
        if (selectedBtn) selectedBtn.classList.remove("is-selected");
        btn.classList.add("is-selected");
        selectedBtn = btn;
        onSelect(opt);
      });
      optsWrap.appendChild(btn);
      entries.push({ btn, opt });
    });
    wrap.appendChild(optsWrap);

    function freeze(correctKey) {
      entries.forEach(({ btn, opt }) => {
        btn.disabled = true;
        if (keyFn(opt) === correctKey) btn.classList.add("is-correct");
        else if (btn === selectedBtn) btn.classList.add("is-wrong");
      });
    }

    return { el: wrap, freeze };
  }

  function checkFeedback(ok, wrongDetailNode) {
    return el("div", { class: "check-feedback " + (ok ? "is-correct" : "is-wrong") }, [
      el("div", { class: "check-feedback__title" }, [ok ? "✓ תשובה נכונה!" : "✗ תשובה שגויה"]),
      !ok && wrongDetailNode ? wrongDetailNode : null,
    ]);
  }

  function rootOptions(correctRoot) {
    const distractors = sample(
      VERB_ROOTS.filter((r) => r.root !== correctRoot.root),
      3
    );
    return shuffle([correctRoot, ...distractors]);
  }

  function binyanOptions(q) {
    const pool = q.tense === "masdar" ? VerbEngine.BINYANIM.filter((b) => b.id !== "I") : VerbEngine.BINYANIM;
    const distractors = sample(
      pool.filter((b) => b.id !== q.binyan.id),
      3
    );
    return shuffle([q.binyan, ...distractors]);
  }

  function tenseOptions() {
    return shuffle(TENSES.slice());
  }

  function personOptions(q) {
    const pool = q.tense === "imperative" ? VerbEngine.IMPERATIVE_PERSONS : VerbEngine.PAST_PERSONS;
    const correct = pool.find((p) => p.id === q.personId);
    const distractors = sample(
      pool.filter((p) => p.id !== q.personId),
      3
    );
    return shuffle([correct, ...distractors]);
  }

  // -------------------------------------------------------------
  function progressBar(pct) {
    return el("div", { class: "progress-bar", role: "progressbar", "aria-valuenow": String(pct) }, [
      el("div", { class: "progress-bar__fill", style: `width:${pct}%` }, []),
      el("span", { class: "progress-bar__label" }, [`${pct}%`]),
    ]);
  }

  function pageHeader(title, subtitle, backHref) {
    return el("div", { class: "page-header" }, [
      backHref ? el("a", { class: "back-link", href: backHref }, ["→ חזרה"]) : null,
      el("h1", {}, [title]),
      subtitle ? el("p", { class: "page-header__subtitle" }, [subtitle]) : null,
    ]);
  }

  global.VerbDrills = { registerRoutes };
})(window);
