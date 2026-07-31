// פיצ'ר אוצר מילים: רשימת פרקים, כרטיסיות לימוד, תרגול/בוחן וחיפוש חופשי.
// כל הנתונים מגיעים מ-data/vocabulary.js (VOCAB_CHAPTERS, VOCABULARY).

(function (global) {
  "use strict";
  const { el, navigate, showToast, shuffle, sample, pickOne, getWordStatus, setWordStatus, chapterIndices, chapterProgressPercent, recordQuizResult, stripDiacritics } = App;

  // w.arabic הוא ללא ניקוד (להשוואות בוחן/חיפוש בלבד) - לתצוגה תמיד מציגים
  // את arabicVoc כשקיים (מנוקד), ונופלים חזרה ל-arabic אם לא.
  function displayArabic(w) {
    return w.arabicVoc || w.arabic;
  }

  // "מילה (תעתיק)" - התעתיק מוצג רק כשקיים (translit הוא null כרגע לכל 1,130
  // המילים החדשות).
  function arabicLabel(w) {
    return w.translit ? `${displayArabic(w)} (${w.translit})` : displayArabic(w);
  }

  // תגיות פרטים דקדוקיים אופציונליים (ריבוי/עתיד/מין/מושא/מענה) - כל שדה
  // מוצג רק כשקיים במקור.
  function detailBadges(w) {
    const badges = [];
    const arSpan = (text) => el("span", { lang: "ar", class: "detail-badge__ar" }, [text]);
    if (w.gender) badges.push(el("span", { class: "badge" }, [`מין: ${w.gender}`]));
    if (w.plural) badges.push(el("span", { class: "badge" }, ["ריבוי: ", arSpan(w.plural)]));
    if (w.verbPresent) badges.push(el("span", { class: "badge" }, ["עתיד: ", arSpan(w.verbPresent)]));
    if (w.transitive) badges.push(el("span", { class: "badge" }, ["דורש מושא"]));
    if (w.response) badges.push(el("span", { class: "badge" }, ["מענה: ", arSpan(w.response)]));
    return badges;
  }

  function detailBadgesRow(w) {
    const badges = detailBadges(w);
    return badges.length ? el("div", { class: "detail-badges" }, badges) : null;
  }

  function chapterTitleOf(num) {
    const c = VOCAB_CHAPTERS.find((c) => c.num === num);
    return c ? c.title : `#${num}`;
  }

  function registerRoutes(route) {
    route("vocab", renderChapterList);
    route("vocab/:num", renderChapterHub);
    route("vocab/:num/flashcards", renderFlashcards);
    route("vocab/:num/quiz", renderQuizSetup);
    route("vocab/:num/quiz/:direction/:length", renderQuizRun);
    route("search", renderSearch);
  }

  // -------------------------------------------------------------
  // רשימת פרקים
  // -------------------------------------------------------------
  function renderChapterList() {
    const grid = el("div", { class: "chapter-grid" }, VOCAB_CHAPTERS.map(chapterCard));
    return el("div", { class: "view view--vocab" }, [
      pageHeader("אוצר מילים", "בחרו חלק להתחלת הלימוד."),
      grid,
    ]);
  }

  function chapterCard(chapter) {
    const count = chapterIndices(chapter.num).length;
    const pct = chapterProgressPercent(chapter.num);
    return el("a", { class: "chapter-card", href: `#/vocab/${chapter.num}` }, [
      el("h3", { class: "chapter-card__title" }, [chapter.title]),
      el("div", { class: "chapter-card__meta" }, [`${count} מילים`]),
      progressBar(pct),
    ]);
  }

  function progressBar(pct) {
    return el("div", { class: "progress-bar", role: "progressbar", "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" }, [
      el("div", { class: "progress-bar__fill", style: `width:${pct}%` }, []),
      el("span", { class: "progress-bar__label" }, [`${pct}%`]),
    ]);
  }

  // -------------------------------------------------------------
  // עמוד פרק (בחירת מצב)
  // -------------------------------------------------------------
  function renderChapterHub(params) {
    const num = Number(params.num);
    const chapter = VOCAB_CHAPTERS.find((c) => c.num === num);
    if (!chapter) return notFound();
    const words = chapterIndices(num).map((i) => ({ i, w: VOCABULARY[i] }));
    const pct = chapterProgressPercent(num);

    return el("div", { class: "view view--chapter-hub" }, [
      pageHeader(chapter.title, `${words.length} מילים בחלק זה.`, "#/vocab"),
      progressBar(pct),
      el("div", { class: "mode-cards" }, [
        el("a", { class: "mode-card", href: `#/vocab/${num}/flashcards` }, [
          el("div", { class: "mode-card__icon", "aria-hidden": "true" }, ["🗂️"]),
          el("h3", {}, ["כרטיסיות לימוד"]),
          el("p", {}, ["הפכו כל כרטיס לחשיפת התרגום, וסמנו ידעתי/לא ידעתי."]),
        ]),
        el("a", { class: "mode-card", href: `#/vocab/${num}/quiz` }, [
          el("div", { class: "mode-card__icon", "aria-hidden": "true" }, ["📝"]),
          el("h3", {}, ["תרגול / בוחן"]),
          el("p", {}, ["שאלות ברירה מרובה ערבית↔עברית, עם ציון בסוף."]),
        ]),
      ]),
      el("table", { class: "word-table" }, [
        el("thead", {}, [
          el("tr", {}, [el("th", {}, ["ערבית"]), el("th", {}, ["תעתיק"]), el("th", {}, ["עברית"]), el("th", {}, ["סטטוס"])]),
        ]),
        el(
          "tbody",
          {},
          words.map(({ i, w }) =>
            el("tr", {}, [
              el("td", { class: "ar" }, [
                el("span", { lang: "ar" }, [displayArabic(w)]),
                detailBadgesRow(w),
              ]),
              el("td", { class: "translit" }, [w.translit || ""]),
              el("td", {}, [w.hebrew]),
              el("td", {}, [statusBadge(getWordStatus(i))]),
            ])
          )
        ),
      ]),
    ]);
  }

  function statusBadge(status) {
    if (status === "known") return el("span", { class: "badge badge--known" }, ["✓ ידוע"]);
    if (status === "unknown") return el("span", { class: "badge badge--unknown" }, ["בתהליך"]);
    return el("span", { class: "badge" }, ["טרם נלמד"]);
  }

  // -------------------------------------------------------------
  // כרטיסיות לימוד (Flashcards)
  // -------------------------------------------------------------
  function renderFlashcards(params) {
    const num = Number(params.num);
    const chapter = VOCAB_CHAPTERS.find((c) => c.num === num);
    if (!chapter) return notFound();
    const order = shuffle(chapterIndices(num));
    let pos = 0;
    let flipped = false;
    let knownCount = 0;

    const container = el("div", { class: "view view--flashcards" });
    render();

    // ניווט בין כרטיסיות בעזרת חצי המקלדת (ArrowLeft/ArrowRight), בכל פרקי
    // אוצר המילים. הניווט הוא עיון חופשי בלבד - אינו מסמן ידעתי/לא ידעתי.
    function onKeydown(e) {
      if (!container.isConnected) {
        document.removeEventListener("keydown", onKeydown);
        return;
      }
      if (pos >= order.length) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(pos + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(pos - 1);
      }
    }
    document.addEventListener("keydown", onKeydown);

    function goTo(newPos) {
      if (newPos < 0 || newPos >= order.length) return;
      pos = newPos;
      flipped = false;
      render();
    }

    return container;

    function render() {
      container.innerHTML = "";
      if (pos >= order.length) {
        container.appendChild(
          el("div", { class: "flash-done" }, [
            pageHeader(chapter.title, "", `#/vocab/${num}`),
            el("div", { class: "flash-done__box" }, [
              el("h2", {}, ["סיימתם את החלק! 🎉"]),
              el("p", {}, [`סימנתם "ידעתי" ב-${knownCount} מתוך ${order.length} מילים.`]),
              el("div", { class: "actions" }, [
                el("button", { class: "btn btn--primary", onClick: () => { order.splice(0, order.length, ...shuffle(chapterIndices(num))); pos = 0; knownCount = 0; render(); } }, ["לשחק שוב"]),
                el("a", { class: "btn", href: `#/vocab/${num}` }, ["חזרה לחלק"]),
              ]),
            ]),
          ])
        );
        return;
      }

      const idx = order[pos];
      const w = VOCABULARY[idx];
      const pct = Math.round((pos / order.length) * 100);

      container.appendChild(pageHeader(chapter.title, `כרטיס ${pos + 1} מתוך ${order.length}`, `#/vocab/${num}`));
      container.appendChild(progressBar(pct));

      const card = el("div", { class: "flashcard" + (flipped ? " is-flipped" : ""), tabindex: "0", role: "button", "aria-pressed": String(flipped), "aria-label": "לחצו כדי להפוך את הכרטיס" }, [
        el("div", { class: "flashcard__inner" }, [
          el("div", { class: "flashcard__face flashcard__face--front" }, [
            el("div", { class: "flashcard__arabic", lang: "ar" }, [displayArabic(w)]),
            w.translit ? el("div", { class: "flashcard__translit" }, [w.translit]) : null,
            el("div", { class: "flashcard__hint" }, ["לחצו להפיכה"]),
          ]),
          el("div", { class: "flashcard__face flashcard__face--back" }, [
            el("div", { class: "flashcard__hebrew" }, [w.hebrew]),
            detailBadgesRow(w),
          ]),
        ]),
      ]);
      function doFlip() {
        flipped = !flipped;
        card.classList.toggle("is-flipped", flipped);
        card.setAttribute("aria-pressed", String(flipped));
      }
      card.addEventListener("click", doFlip);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doFlip(); }
      });

      const prevBtn = el("button", {
        class: "card-nav-arrow card-nav-arrow--prev",
        "aria-label": "כרטיס קודם",
        title: "כרטיס קודם (מקש חץ שמאלה)",
        onClick: () => goTo(pos - 1),
      }, ["‹"]);
      const nextBtn = el("button", {
        class: "card-nav-arrow card-nav-arrow--next",
        "aria-label": "כרטיס הבא",
        title: "כרטיס הבא (מקש חץ ימינה)",
        onClick: () => goTo(pos + 1),
      }, ["›"]);
      prevBtn.disabled = pos === 0;
      nextBtn.disabled = pos === order.length - 1;

      container.appendChild(el("div", { class: "flashcard-row" }, [prevBtn, card, nextBtn]));

      const actions = el("div", { class: "actions actions--flashcard" }, [
        el("button", { class: "btn btn--danger", onClick: () => answer("unknown") }, ["✗ לא ידעתי"]),
        el("button", { class: "btn btn--success", onClick: () => answer("known") }, ["✓ ידעתי"]),
      ]);
      container.appendChild(actions);

      function answer(status) {
        setWordStatus(idx, status);
        if (status === "known") knownCount++;
        flipped = false;
        pos++;
        render();
      }
    }
  }

  // -------------------------------------------------------------
  // תרגול/בוחן
  // -------------------------------------------------------------
  function renderQuizSetup(params) {
    const num = Number(params.num);
    const chapter = VOCAB_CHAPTERS.find((c) => c.num === num);
    if (!chapter) return notFound();
    const words = chapterIndices(num);
    const maxLen = words.length;

    let direction = "mixed";
    let length = Math.min(10, maxLen);

    const container = el("div", { class: "view view--quiz-setup" }, [
      pageHeader(chapter.title, "הגדירו את הבוחן", `#/vocab/${num}`),
      el("div", { class: "quiz-setup-form" }, [
        formGroup("כיוון השאלות", [
          radioBtn("direction", "mixed", "מעורב", true),
          radioBtn("direction", "ar-he", "ערבית ← עברית"),
          radioBtn("direction", "he-ar", "עברית ← ערבית"),
        ]),
        formGroup("מספר שאלות", [10, 15, 20].filter((n) => n <= maxLen || n === 10).map((n, idx) => radioBtn("length", String(Math.min(n, maxLen)), String(Math.min(n, maxLen)), idx === 0)),
        ),
        el("button", {
          class: "btn btn--primary btn--lg",
          onClick: () => {
            const dir = container.querySelector('input[name="direction"]:checked').value;
            const len = container.querySelector('input[name="length"]:checked').value;
            navigate(`#/vocab/${num}/quiz/${dir}/${len}`);
          },
        }, ["התחילו את הבוחן"]),
      ]),
    ]);
    return container;
  }

  function formGroup(label, inputs) {
    return el("fieldset", { class: "form-group" }, [el("legend", {}, [label]), el("div", { class: "form-group__options" }, inputs)]);
  }

  function radioBtn(name, value, label, checked) {
    const id = `${name}-${value}`;
    const input = el("input", { type: "radio", name, value, id });
    if (checked) input.checked = true;
    const wrap = el("label", { class: "radio-pill", for: id }, [input, el("span", {}, [label])]);
    return wrap;
  }

  function renderQuizRun(params) {
    const num = Number(params.num);
    const chapter = VOCAB_CHAPTERS.find((c) => c.num === num);
    if (!chapter) return notFound();
    const wordIndices = chapterIndices(num);
    const length = Math.min(Number(params.length) || 10, wordIndices.length);
    const chosen = sample(wordIndices, length);

    const questions = chosen.map((idx) => {
      const dir = params.direction === "mixed" ? pickOne(["ar-he", "he-ar"]) : params.direction;
      const word = VOCABULARY[idx];
      const distractorPool = wordIndices.filter((i) => i !== idx);
      const distractors = sample(distractorPool, 3).map((i) => VOCABULARY[i]);
      const options = shuffle([word, ...distractors]);
      return { idx, word, dir, options };
    });

    let qPos = 0;
    const answers = [];
    const container = el("div", { class: "view view--quiz-run" });
    render();
    return container;

    function render() {
      container.innerHTML = "";
      if (qPos >= questions.length) {
        return showResults();
      }
      const q = questions[qPos];
      container.appendChild(pageHeader(chapter.title, `שאלה ${qPos + 1} מתוך ${questions.length}`, `#/vocab/${num}`));
      container.appendChild(progressBar(Math.round((qPos / questions.length) * 100)));

      const promptBox =
        q.dir === "ar-he"
          ? el("div", { class: "quiz-prompt" }, [
              el("div", { class: "quiz-prompt__arabic", lang: "ar" }, [displayArabic(q.word)]),
              q.word.translit ? el("div", { class: "quiz-prompt__translit" }, [q.word.translit]) : null,
            ])
          : el("div", { class: "quiz-prompt" }, [el("div", { class: "quiz-prompt__hebrew" }, [q.word.hebrew])]);

      container.appendChild(promptBox);

      const optionsWrap = el("div", { class: "quiz-options" });
      q.options.forEach((opt) => {
        const label = q.dir === "ar-he" ? opt.hebrew : arabicLabel(opt);
        const btn = el("button", { class: "quiz-option", lang: q.dir === "ar-he" ? "he" : "ar" }, [label]);
        btn.addEventListener("click", () => selectAnswer(q, opt, btn, optionsWrap));
        optionsWrap.appendChild(btn);
      });
      container.appendChild(optionsWrap);
    }

    function selectAnswer(q, opt, btn, optionsWrap) {
      if (optionsWrap.classList.contains("is-answered")) return;
      optionsWrap.classList.add("is-answered");
      const correct = opt.arabic === q.word.arabic && opt.hebrew === q.word.hebrew;
      Array.from(optionsWrap.children).forEach((child) => (child.disabled = true));
      btn.classList.add(correct ? "is-correct" : "is-wrong");
      if (!correct) {
        Array.from(optionsWrap.children).forEach((child, i) => {
          const o = q.options[i];
          const isCorrectOption = o.arabic === q.word.arabic && o.hebrew === q.word.hebrew;
          if (isCorrectOption) child.classList.add("is-correct");
        });
      }
      answers.push({ q, chosen: opt, correct });
      setTimeout(() => {
        qPos++;
        render();
      }, 700);
    }

    function showResults() {
      const score = answers.filter((a) => a.correct).length;
      const pct = Math.round((score / answers.length) * 100);
      recordQuizResult({ type: "vocab-quiz", chapter: num, length: answers.length, score, pct });
      container.appendChild(
        el("div", { class: "quiz-results" }, [
          pageHeader(chapter.title, "תוצאות הבוחן", `#/vocab/${num}`),
          el("div", { class: "quiz-results__score" }, [el("bdi", { dir: "ltr" }, [`${score} / ${answers.length}`]), el("span", {}, [`(${pct}%)`])]),
          el(
            "ol",
            { class: "quiz-results__list" },
            answers.map((a) =>
              el("li", { class: "quiz-results__item " + (a.correct ? "is-correct" : "is-wrong") }, [
                el("div", { class: "quiz-results__q", lang: a.q.dir === "ar-he" ? "ar" : "he" }, [
                  a.q.dir === "ar-he" ? arabicLabel(a.q.word) : a.q.word.hebrew,
                ]),
                el("div", { class: "quiz-results__given" }, ["תשובתכם: ", a.q.dir === "ar-he" ? a.chosen.hebrew : arabicLabel(a.chosen)]),
                !a.correct
                  ? el("div", { class: "quiz-results__correct" }, ["התשובה הנכונה: ", a.q.dir === "ar-he" ? a.q.word.hebrew : arabicLabel(a.q.word)])
                  : null,
              ])
            )
          ),
          el("div", { class: "actions" }, [
            el("a", { class: "btn btn--primary", href: `#/vocab/${num}/quiz` }, ["בוחן חדש"]),
            el("a", { class: "btn", href: `#/vocab/${num}` }, ["חזרה לחלק"]),
          ]),
        ])
      );
    }
  }

  // -------------------------------------------------------------
  // חיפוש חופשי
  // -------------------------------------------------------------
  function renderSearch() {
    const container = el("div", { class: "view view--search" });
    const input = el("input", { type: "search", class: "search-input", placeholder: "חפשו לפי עברית, ערבית או תעתיק...", "aria-label": "חיפוש מילים" });
    const resultsWrap = el("div", { class: "search-results" });

    container.appendChild(pageHeader("חיפוש חופשי", `חיפוש בכל ${VOCABULARY.length} מילות אוצר המילים.`));
    container.appendChild(input);
    container.appendChild(resultsWrap);

    input.addEventListener("input", () => renderResults(input.value.trim()));
    renderResults("");
    return container;

    function renderResults(query) {
      resultsWrap.innerHTML = "";
      if (!query) {
        resultsWrap.appendChild(el("p", { class: "search-hint" }, ["הקלידו כדי להתחיל לחפש..."]));
        return;
      }
      const q = query.toLowerCase();
      const strippedQuery = stripDiacritics(query);
      const matches = VOCABULARY.map((w, i) => ({ w, i })).filter(
        ({ w }) => w.hebrew.includes(query) || w.arabic.includes(strippedQuery) || (w.translit || "").toLowerCase().includes(q)
      );
      if (!matches.length) {
        resultsWrap.appendChild(el("p", { class: "search-hint" }, ["לא נמצאו תוצאות."]));
        return;
      }
      const table = el("table", { class: "word-table" }, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["ערבית"]), el("th", {}, ["תעתיק"]), el("th", {}, ["עברית"]), el("th", {}, ["חלק"])])]),
        el(
          "tbody",
          {},
          matches.slice(0, 100).map(({ w }) =>
            el("tr", {}, [
              el("td", { class: "ar" }, [
                el("span", { lang: "ar" }, [displayArabic(w)]),
                detailBadgesRow(w),
              ]),
              el("td", { class: "translit" }, [w.translit || ""]),
              el("td", {}, [w.hebrew]),
              el("td", {}, [el("a", { href: `#/vocab/${w.chapter}` }, [chapterTitleOf(w.chapter)])]),
            ])
          )
        ),
      ]);
      resultsWrap.appendChild(el("p", { class: "search-hint" }, [`${matches.length} תוצאות נמצאו${matches.length > 100 ? " (מוצגות 100 הראשונות)" : ""}`]));
      resultsWrap.appendChild(table);
    }
  }

  // -------------------------------------------------------------
  // עזרים משותפים
  // -------------------------------------------------------------
  function pageHeader(title, subtitle, backHref) {
    return el("div", { class: "page-header" }, [
      backHref ? el("a", { class: "back-link", href: backHref }, ["→ חזרה"]) : null,
      el("h1", {}, [title]),
      subtitle ? el("p", { class: "page-header__subtitle" }, [subtitle]) : null,
    ]);
  }

  function notFound() {
    return el("div", { class: "view" }, [el("h1", {}, ["החלק לא נמצא"]), el("a", { href: "#/vocab" }, ["חזרה לרשימת החלקים"])]);
  }

  global.Vocabulary = { registerRoutes };
})(window);
