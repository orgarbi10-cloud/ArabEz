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

  // "זהה את הפועל" משתמש בסט קבוע של 547 פעלים מאומתים (data/verb-practice-set.js,
  // נגזר מגיליון "פתרונות" באקסל), מחולק ל-55 תרגולים של 10 שאלות כל אחד (התרגול
  // האחרון קצר יותר - 7 שאלות) ללא כפילויות (לא גנרציה אקראית).
  const DRILL_SIZE = 10;
  const TOTAL_DRILLS = Math.ceil(VERB_PRACTICE_SET.length / DRILL_SIZE);
  const rootsByArabic = new Map(VERB_ROOTS.map((r) => [r.root, r]));

  // הסדר הגולמי בגיליון "פתרונות" לא מפוזר: לדוגמה שורות 501-550 (היו תרגולים
  // 51-55) הן כולן בניין 1 בלבד. DRILL_ORDER הוא פיזור קבוע ומחושב-מראש של
  // האינדקסים 0-549 (בתוך VERB_PRACTICE_SET, כפי שהיה אז) ל-55 קבוצות של 10,
  // כך שבכל תרגול יש מגוון שורשים/בניינים/זמנים (נבנה ב-Python: shuffle עם seed
  // קבוע, ואז הצבה חמדנית (greedy) שממזערת חזרות של אותו שורש/בניין/זמן בתוך כל
  // תרגול - התוצאה: לכל תרגול לכל היותר 2 פריטים מאותו שורש ו-3 מאותו בניין).
  // לאחר מכן הוסרו 3 פריטי ציווי-בניין-7 (לבקשת המשתמש - ציווי לא הגיוני בבניין
  // סביל), והמערך הבא מוצג לאחר הסרתם + מיפוי מחדש של האינדקסים ל-0-546 (ללא
  // שינוי סדר שאר הפריטים, רק סגירת הפערים - ראו שחזור ב-git history אם צריך
  // לחשב מחדש). הסדר הזה קבוע (embedded כאן, לא מחושב מחדש בדפדפן) - כך שגם
  // תוכן התרגול וגם סדר השאלות בתוכו נשארים זהים בכל כניסה לאותו תרגול. לא
  // נוגעים ב-data/verb-practice-set.js עצמו (קובץ מחושב אוטומטית מהאקסל).
  const DRILL_ORDER = [
    470, 122, 385, 409, 69, 125, 378, 371, 544, 246, 239, 271, 256, 114, 476, 79, 451, 506, 151, 363,
    452, 80, 12, 316, 30, 156, 13, 524, 145, 520, 300, 418, 22, 543, 230, 315, 471, 58, 257, 160,
    373, 126, 218, 182, 158, 86, 401, 44, 167, 538, 17, 149, 116, 219, 269, 77, 180, 322, 16, 494,
    352, 404, 366, 376, 5, 496, 536, 270, 35, 320, 208, 26, 131, 347, 199, 533, 242, 187, 408, 92,
    311, 258, 124, 529, 229, 29, 375, 74, 275, 405, 272, 189, 141, 205, 423, 424, 186, 510, 159, 100,
    48, 514, 46, 161, 217, 283, 458, 135, 197, 61, 296, 193, 523, 294, 85, 209, 60, 403, 305, 307,
    200, 368, 15, 188, 443, 195, 290, 354, 428, 502, 132, 244, 55, 431, 81, 238, 499, 227, 224, 492,
    429, 462, 248, 245, 267, 532, 356, 18, 240, 358, 360, 221, 516, 299, 25, 177, 20, 325, 478, 427,
    388, 341, 222, 184, 250, 519, 176, 399, 419, 140, 372, 484, 340, 304, 343, 413, 36, 501, 417, 247,
    191, 505, 350, 33, 164, 129, 288, 345, 421, 357, 260, 336, 166, 367, 348, 389, 362, 540, 93, 119,
    136, 495, 397, 349, 379, 454, 528, 8, 490, 441, 87, 42, 88, 276, 152, 223, 104, 121, 512, 54,
    255, 252, 444, 142, 118, 202, 493, 319, 146, 513, 500, 113, 416, 455, 400, 6, 394, 138, 291, 262,
    459, 57, 438, 90, 171, 407, 23, 107, 273, 466, 537, 148, 430, 2, 261, 231, 75, 440, 1, 94,
    115, 323, 97, 4, 49, 308, 328, 425, 535, 263, 165, 128, 241, 216, 482, 284, 237, 117, 515, 139,
    198, 235, 398, 392, 173, 498, 436, 179, 469, 285, 518, 153, 383, 387, 488, 317, 268, 447, 338, 14,
    329, 28, 103, 10, 503, 40, 487, 486, 491, 411, 133, 174, 56, 422, 51, 243, 254, 457, 279, 497,
    196, 396, 306, 374, 225, 545, 109, 163, 335, 339, 154, 150, 204, 527, 210, 473, 364, 277, 32, 402,
    76, 183, 546, 106, 67, 369, 434, 310, 220, 251, 426, 437, 52, 190, 539, 168, 19, 110, 504, 365,
    259, 448, 420, 0, 99, 72, 355, 73, 169, 102, 228, 185, 530, 331, 96, 475, 302, 474, 464, 24,
    351, 39, 332, 522, 381, 11, 120, 480, 377, 212, 27, 526, 233, 95, 37, 477, 91, 287, 439, 390,
    292, 481, 511, 65, 483, 41, 211, 226, 324, 127, 203, 134, 7, 59, 393, 508, 297, 391, 71, 143,
    467, 82, 472, 111, 435, 84, 414, 485, 207, 3, 178, 38, 201, 468, 78, 461, 101, 359, 463, 66,
    312, 386, 157, 521, 214, 249, 344, 45, 43, 446, 286, 123, 68, 337, 465, 525, 144, 105, 274, 280,
    542, 361, 380, 321, 298, 130, 147, 517, 382, 282, 9, 34, 327, 456, 31, 384, 70, 62, 181, 21,
    108, 509, 155, 83, 265, 370, 206, 433, 278, 170, 281, 318, 303, 172, 412, 194, 531, 309, 330, 460,
    334, 395, 507, 215, 453, 333, 314, 326, 47, 313, 534, 266, 342, 236, 346, 64, 253, 301, 234, 175,
    289, 162, 415, 449, 137, 406, 450, 432, 353, 192, 489, 63, 410, 479, 50, 264, 98, 541, 232, 53,
    213, 112, 295, 89, 293, 445, 442,
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
        `${VERB_PRACTICE_SET.length} פעלים מאומתים, מחולקים ל-${TOTAL_DRILLS} תרגולים של עד ${DRILL_SIZE} שאלות כל אחד, ללא כפילויות.`,
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
          el("p", {}, ["המערכת מציגה צורה מנוטה, ואתם מזהים שורש, בניין, זמן וגוף. 547 פעלים מאומתים, מחולקים לתרגולים של עד 10 שאלות כל אחד."]),
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
