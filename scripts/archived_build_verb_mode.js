// ארכיון: מצב "בנו את הפועל" בתרגול פעלים.
// הוסר מהאתר (js/verbDrills.js) לבקשת המשתמש ב-2026-07-17, כדי שתרגול פעלים
// יציג רק את "זהה את הפועל". קובץ זה אינו נטען ע"י index.html ואינו רץ
// כחלק מהאתר - הוא גיבוי מלא ומדויק (העתק-הדבק) של כל מה שהוסר, לשחזור עתידי.
//
// איך לשחזר:
// 1. ב-registerRoutes בתוך js/verbDrills.js, להוסיף בחזרה:
//      route("verbs/build/:length", runBuildQuiz);
// 2. ב-renderVerbsHome, להחזיר את המשתנה `let length = 10;` ואת כרטיס
//    "בנו את הפועל" (mode-card) בתוך מערך ה-mode-cards, לפני/אחרי כרטיס
//    "זהה את הפועל" - ראה למטה "כרטיס הבית לשחזור".
// 3. להחזיר את הפונקציות lengthPicker, generateQuestion, ו-runBuildQuiz
//    (בשלמותן, בדיוק כפי שמופיעות כאן) לתוך js/verbDrills.js.
// 4. להחזיר את `pickOne` ו-`navigate` לפירוק ה-destructure מ-App בתחילת
//    הקובץ (הם הוסרו כי הפכו לבלתי-מנוצלים): `const { el, navigate, shuffle,
//    sample, pickOne, recordQuizResult, showToast } = App;`
// 5. לא נדרש שום שינוי ב-CSS (css/style.css) וב-index.html - כל המחלקות
//    (.mode-card--build, .mode-card--action, .length-picker, .radio-pill,
//    .build-input, .verb-build-prompt, .form-group__options) נשארו בקובץ ה-CSS
//    ללא שינוי בזמן ההסרה, בדיוק כדי שהשחזור הזה יהיה חסר-חיכוך.

// --- כרטיס הבית לשחזור (בתוך renderVerbsHome, בתוך ה-div.mode-cards) ---
/*
        el("div", { class: "mode-card mode-card--action mode-card--build" }, [
          el("div", { class: "mode-card__icon", "aria-hidden": "true" }, ["✍️"]),
          el("h3", {}, ["בנו את הפועל"]),
          el("p", {}, ["המערכת נותנת שורש, בניין, זמן וגוף, ואתם מקלידים את הצורה הנכונה בתעתיק."]),
          lengthPicker((n) => (length = n)),
          el("button", { class: "btn btn--gold", onClick: () => navigate(`#/verbs/build/${length}`) }, ["התחילו"]),
        ]),
*/

function lengthPicker(onChange) {
  const name = "len-" + Math.random().toString(36).slice(2);
  const wrap = el("div", { class: "form-group__options length-picker" });
  [10, 15, 20].forEach((n, idx) => {
    const id = name + "-" + n;
    const input = el("input", { type: "radio", name, value: String(n), id });
    if (idx === 0) input.checked = true;
    input.addEventListener("change", () => onChange(n));
    wrap.appendChild(el("label", { class: "radio-pill", for: id }, [input, el("span", {}, [String(n)])]));
  });
  return wrap;
}

// -------------------------------------------------------------
// בניית שאלה רנדומלית (שימשה את "בנו את הפועל" בלבד)
// -------------------------------------------------------------
function generateQuestion() {
  const tense = pickOne(TENSES);
  const binyanPool = tense === "masdar" ? VerbEngine.BINYANIM.filter((b) => b.id !== "I") : VerbEngine.BINYANIM;
  const binyan = pickOne(binyanPool);
  const root = pickOne(VERB_ROOTS);
  let personId = null;
  if (tense !== "masdar") {
    const personPool = tense === "imperative" ? VerbEngine.IMPERATIVE_PERSONS : VerbEngine.PAST_PERSONS;
    personId = pickOne(personPool).id;
  }
  const form = VerbEngine.generateForm(root, binyan.id, tense, personId);
  return { tense, binyan, root, personId, form };
}

// -------------------------------------------------------------
// מצב 2: בנה את הפועל
// -------------------------------------------------------------
function runBuildQuiz(params) {
  const length = Number(params.length) || 10;
  const questions = Array.from({ length }, generateQuestion);
  let qPos = 0;
  const answers = [];
  const container = el("div", { class: "view view--verb-quiz" });
  render();
  return container;

  function render() {
    container.innerHTML = "";
    if (qPos >= questions.length) return showResults();
    const q = questions[qPos];
    container.appendChild(pageHeader("בנו את הפועל", `שאלה ${qPos + 1} מתוך ${questions.length}`, "#/verbs"));
    container.appendChild(progressBar(Math.round((qPos / questions.length) * 100)));

    container.appendChild(
      el("div", { class: "verb-build-prompt" }, [
        el("div", { class: "result-row" }, [el("span", { class: "result-row__label" }, ["שורש: "]), `${q.root.root} (${q.root.translit}) — ${q.root.hebrew}`]),
        el("div", { class: "result-row" }, [el("span", { class: "result-row__label" }, ["בניין: "]), q.binyan.name]),
        el("div", { class: "result-row" }, [el("span", { class: "result-row__label" }, ["זמן: "]), TENSE_LABELS[q.tense]]),
        q.tense !== "masdar"
          ? el("div", { class: "result-row" }, [el("span", { class: "result-row__label" }, ["גוף: "]), personLabel(q.tense, q.personId)])
          : null,
      ])
    );

    const input = el("input", { type: "text", class: "build-input", placeholder: "הקלידו את הצורה בתעתיק (אותיות עבריות)...", "aria-label": "הקלידו את התשובה בתעתיק עברי" });
    container.appendChild(input);

    let checked = false;
    const actionBtn = el("button", { class: "btn btn--primary btn--lg" }, ["בדקו תשובה"]);
    actionBtn.addEventListener("click", () => {
      if (!checked) {
        const correctHe = q.form.he.trim();
        const givenTrimmed = input.value.trim();
        const ok = givenTrimmed.length > 0 && givenTrimmed.normalize("NFC") === correctHe.normalize("NFC");

        answers.push({ q, given: givenTrimmed });
        checked = true;
        input.disabled = true;
        actionBtn.textContent = qPos === questions.length - 1 ? "סיום" : "שאלה הבאה";

        const wrongDetail = el("div", { class: "check-feedback__answer" }, [
          "התשובה הנכונה: " + correctHe + " ",
          el("span", { class: "verb-result__form", lang: "ar" }, [q.form.ar]),
        ]);
        container.insertBefore(checkFeedback(ok, wrongDetail), actionBtn);
      } else {
        qPos++;
        render();
      }
    });
    container.appendChild(actionBtn);
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") actionBtn.click();
    });
  }

  function showResults() {
    const graded = answers.map((a) => {
      const correctHe = a.q.form.he.trim();
      const givenNorm = a.given.normalize("NFC").trim();
      const ok = givenNorm.length > 0 && givenNorm === correctHe.normalize("NFC");
      return { ...a, ok, correctHe };
    });
    const score = graded.filter((g) => g.ok).length;
    recordQuizResult({ type: "verb-build", length: graded.length, score, pct: Math.round((score / graded.length) * 100) });

    container.innerHTML = "";
    container.appendChild(pageHeader("תוצאות: בנו את הפועל", "", "#/verbs"));
    container.appendChild(el("div", { class: "quiz-results__score" }, [el("bdi", { dir: "ltr" }, [`${score} / ${graded.length}`])]));
    container.appendChild(
      el(
        "ol",
        { class: "quiz-results__list" },
        graded.map((g) =>
          el("li", { class: "quiz-results__item " + (g.ok ? "is-correct" : "is-wrong") }, [
            el("div", { class: "result-row" }, [
              el("span", { class: "result-row__label" }, ["שורש/בניין/זמן/גוף: "]),
              `${g.q.root.root} · ${g.q.binyan.name} · ${TENSE_LABELS[g.q.tense]}` + (g.q.tense !== "masdar" ? " · " + personLabel(g.q.tense, g.q.personId) : ""),
            ]),
            el("div", { class: "result-row" }, [el("span", { class: "result-row__label" }, ["תשובתכם: "]), g.given || "(לא הוקלד)"]),
            el("div", { class: "result-row" }, [
              el("span", { class: "result-row__label" }, ["התשובה הנכונה: "]),
              `${g.correctHe}   `,
              el("span", { class: "verb-result__form", lang: "ar" }, [g.q.form.ar]),
            ]),
          ])
        )
      )
    );
    container.appendChild(
      el("div", { class: "actions" }, [
        el("a", { class: "btn btn--primary", href: `#/verbs/build/${length}` }, ["בוחן חדש"]),
        el("a", { class: "btn", href: "#/verbs" }, ["חזרה לתרגול פעלים"]),
      ])
    );
  }
}
