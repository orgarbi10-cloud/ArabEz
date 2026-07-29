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

  // שורות 501-550 בגיליון (תרגולים 51-55) הן כולן בניין 1 בלבד (התוספת
  // האחרונה לגיליון). כדי שאף אחד מ-51-55 לא יהיה "בניין 1 בלבד" מחליפים כאן
  // את הכמות המינימלית האפשרית - פריט אחד מכל תרגול כזה מוחלף עם פריט אחד
  // מתרגול מוקדם (5 זוגות = 10 פריטים מוזזים בסה"כ, שאר 540 הפריטים ללא שינוי).
  // לא נוגעים ב-data/verb-practice-set.js עצמו (קובץ מחושב אוטומטית מהאקסל) -
  // הערבוב נעשה כאן, בעותק מקומי, כדי שיישאר יציב גם אם הקובץ ייווצר מחדש.
  const DRILL_MIX_SWAPS = [
    [0, 500], // תרגול 1 <-> תרגול 51
    [10, 510], // תרגול 2 <-> תרגול 52
    [20, 520], // תרגול 3 <-> תרגול 53
    [30, 530], // תרגול 4 <-> תרגול 54
    [40, 540], // תרגול 5 <-> תרגול 55
  ];
  const PRACTICE_SET = VERB_PRACTICE_SET.slice();
  DRILL_MIX_SWAPS.forEach(([i, j]) => {
    const tmp = PRACTICE_SET[i];
    PRACTICE_SET[i] = PRACTICE_SET[j];
    PRACTICE_SET[j] = tmp;
  });

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
    const questions = shuffle(drillItems(drillNum).map(questionFromItem));
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
