// ניווט כללי / SPA router פשוט + אחסון התקדמות ב-localStorage.
// זהו הליבה המשותפת שעליה נשענים js/vocabulary.js, js/verbDrills.js
// ו-js/grammarRules.js.

(function (global) {
  "use strict";

  const STORAGE_KEY = "arabez_progress_v1";

  // -----------------------------------------------------------------
  // אחסון התקדמות
  // -----------------------------------------------------------------
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { words: {}, quizHistory: [] };
      const parsed = JSON.parse(raw);
      return {
        words: parsed.words || {},
        quizHistory: parsed.quizHistory || [],
      };
    } catch (e) {
      console.warn("שגיאה בטעינת התקדמות מ-localStorage:", e);
      return { words: {}, quizHistory: [] };
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("שגיאה בשמירת התקדמות ל-localStorage:", e);
    }
  }

  let progressCache = loadProgress();

  function setWordStatus(globalIndex, status) {
    progressCache.words[globalIndex] = status;
    saveProgress(progressCache);
  }

  function getWordStatus(globalIndex) {
    return progressCache.words[globalIndex] || null;
  }

  function chapterIndices(chapterNum) {
    const indices = [];
    VOCABULARY.forEach((w, i) => {
      if (w.chapter === chapterNum) indices.push(i);
    });
    return indices;
  }

  function chapterProgressPercent(chapterNum) {
    const indices = chapterIndices(chapterNum);
    if (!indices.length) return 0;
    const known = indices.filter((i) => getWordStatus(i) === "known").length;
    return Math.round((known / indices.length) * 100);
  }

  function partIndices(chapterNum, partNum) {
    const indices = [];
    VOCABULARY.forEach((w, i) => {
      if (w.chapter === chapterNum && w.part === partNum) indices.push(i);
    });
    return indices;
  }

  function partProgressPercent(chapterNum, partNum) {
    const indices = partIndices(chapterNum, partNum);
    if (!indices.length) return 0;
    const known = indices.filter((i) => getWordStatus(i) === "known").length;
    return Math.round((known / indices.length) * 100);
  }

  function recordQuizResult(entry) {
    progressCache.quizHistory.unshift(Object.assign({ date: new Date().toISOString() }, entry));
    progressCache.quizHistory = progressCache.quizHistory.slice(0, 30);
    saveProgress(progressCache);
  }

  function recentQuizHistory(limit) {
    return progressCache.quizHistory.slice(0, limit || 5);
  }

  // -----------------------------------------------------------------
  // עזרי UI משותפים
  // -----------------------------------------------------------------
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        if (key === "class") node.className = attrs[key];
        else if (key === "html") node.innerHTML = attrs[key];
        else if (key.startsWith("on") && typeof attrs[key] === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else if (key === "dataset") {
          Object.keys(attrs[key]).forEach((dk) => (node.dataset[dk] = attrs[key][dk]));
        } else {
          node.setAttribute(key, attrs[key]);
        }
      });
    }
    (children || []).forEach((child) => {
      if (child == null) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("toast--visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("toast--visible"), 2200);
  }

  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sample(array, n) {
    return shuffle(array).slice(0, n);
  }

  function pickOne(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // מסיר ניקוד ערבי (U+064B-U+0652) לצורך השוואות/חיפוש חסיני-ניקוד.
  const ARABIC_DIACRITICS_RE = /[ً-ْ]/g;
  function stripDiacritics(s) {
    return typeof s === "string" ? s.replace(ARABIC_DIACRITICS_RE, "") : s;
  }

  // -----------------------------------------------------------------
  // המרת עברית -> ערבית (קיצור מקלדת Ctrl+G, למי שאין לו מקלדת ערבית)
  // -----------------------------------------------------------------
  // הכיוון ההפוך למיפוי AR_TO_HE שבמנוע הפעלים (js/verbEngine.js) ולתעתיק
  // אוצר המילים - "מה שכבר מובנה", כדבריו של המשתמש. שילובי גרש (ת׳/ג׳/ח׳/
  // ד׳/צ׳/ט׳/ע׳ - וגם אפוסטרוף רגיל ' כתחליף נוח, כי לא בכל מקלדת יש גרש
  // עברי אמיתי) נבדקים לפני אותיות בודדות, ואותיות סופיות (ך/ם/ן/ף/ץ)
  // מנורמלות לצורתן הרגילה קודם.
  //
  // שתי דו-משמעויות אמיתיות בכיוון ההפוך (לפי אישור המשתמש):
  //   א -> תמיד ا (לא أ/إ/آ/ٱ/ء - הגרסה הפשוטה והשכיחה ביותר)
  //   ה -> תמיד ه (לא ة/תא מרבוטה, גם בסוף מילה - בלי ניחוש חכם לפי הקשר)
  // גם ג' בלי גרש (טעות הקלדה סבירה) מטופל כמו ג׳, כי אין לו מיפוי "רגיל"
  // משלו במוסכמה הקיימת (ج הופך תמיד לג׳, אף פעם לא לג בלי גרש).
  const HEBREW_FINAL_TO_REGULAR = { "ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ" };
  const HEBREW_GERESH_TO_ARABIC = { "ת": "ث", "ג": "ج", "ח": "خ", "ד": "ذ", "צ": "ض", "ט": "ظ", "ע": "غ" };
  const HEBREW_TO_ARABIC = {
    "א": "ا", "ב": "ب", "ג": "ج", "ד": "د", "ה": "ه", "ו": "و",
    "ז": "ز", "ח": "ح", "ט": "ط", "י": "ي", "כ": "ك", "ל": "ل", "מ": "م", "נ": "ن",
    "ס": "س", "ע": "ع", "פ": "ف", "צ": "ص", "ק": "ق", "ר": "ر", "ש": "ش", "ת": "ت",
  };

  function hebrewToArabic(text) {
    if (typeof text !== "string") return text;
    const normalized = text.replace(/[ךםןףץ]/g, (c) => HEBREW_FINAL_TO_REGULAR[c]);
    let result = "";
    for (let i = 0; i < normalized.length; i++) {
      const ch = normalized[i];
      const next = normalized[i + 1];
      if ((next === "׳" || next === "'") && HEBREW_GERESH_TO_ARABIC[ch]) {
        result += HEBREW_GERESH_TO_ARABIC[ch];
        i++; // דילוג על סימן הגרש/האפוסטרוף שכבר טופל
      } else if (HEBREW_TO_ARABIC[ch]) {
        result += HEBREW_TO_ARABIC[ch];
      } else {
        result += ch; // לא אות עברית (רווח/פיסוק/ספרה/ערבית קיימת) - עובר כמו שהוא
      }
    }
    return result;
  }

  // מפעיל את הקיצור Ctrl+G על כל שדה טקסט/textarea באתר: ממיר את כל תוכן
  // השדה הממוקד מעברית לערבית במקום. שים לב: Ctrl ולא Cmd, גם במאק - כדי לא
  // להתנגש עם קיצורים קיימים של הדפדפן.
  function initHebrewToArabicShortcut() {
    document.addEventListener("keydown", (e) => {
      if (!e.ctrlKey || e.key.toLowerCase() !== "g") return;
      const target = document.activeElement;
      const isTextField = target instanceof HTMLElement && (target.tagName === "TEXTAREA" || (target.tagName === "INPUT" && (target.type === "text" || target.type === "search")));
      if (!isTextField) {
        showToast("קיצור Ctrl+G ממיר עברית לערבית - לחצו קודם בתוך שדה טקסט");
        return;
      }
      e.preventDefault();
      const converted = hebrewToArabic(target.value);
      if (converted === target.value) return;
      target.value = converted;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      const pos = converted.length;
      target.setSelectionRange(pos, pos);
    });
  }

  // -----------------------------------------------------------------
  // ניתוב (Router) מבוסס hash
  // -----------------------------------------------------------------
  const routes = [];

  function route(pattern, handler) {
    routes.push({ segments: pattern.split("/").filter(Boolean), handler });
  }

  function matchRoute(pathSegments) {
    for (const r of routes) {
      if (r.segments.length !== pathSegments.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < r.segments.length; i++) {
        const seg = r.segments[i];
        if (seg.startsWith(":")) {
          params[seg.slice(1)] = decodeURIComponent(pathSegments[i]);
        } else if (seg !== pathSegments[i]) {
          ok = false;
          break;
        }
      }
      if (ok) return { handler: r.handler, params };
    }
    return null;
  }

  function currentPathSegments() {
    const hash = global.location.hash || "#/";
    return hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  }

  function renderRoute() {
    const app = document.getElementById("app");
    const segments = currentPathSegments();
    const match = matchRoute(segments);
    updateActiveNav(segments[0] || "");
    document.body.classList.remove("nav-open");
    if (!match) {
      app.innerHTML = "";
      app.appendChild(
        el("div", { class: "view view--notfound" }, [
          el("h1", {}, ["הדף לא נמצא"]),
          el("p", {}, [el("a", { href: "#/" }, ["חזרה לדף הבית"])]),
        ])
      );
      return;
    }
    app.innerHTML = "";
    try {
      const view = match.handler(match.params) || el("div", {}, ["טוען..."]);
      app.appendChild(view);
    } catch (e) {
      console.error("שגיאה בטעינת המסך:", e);
      app.appendChild(
        el("div", { class: "view" }, [
          el("h1", {}, ["אירעה שגיאה"]),
          el("p", {}, [String(e.message || e)]),
        ])
      );
    }
    app.focus();
    global.scrollTo(0, 0);
  }

  function updateActiveNav(section) {
    document.querySelectorAll(".main-nav a").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.nav === section);
    });
  }

  function navigate(path) {
    global.location.hash = path;
  }

  // -----------------------------------------------------------------
  // אתחול
  // -----------------------------------------------------------------
  function init() {
    // מסך הבית
    route("", renderHome);

    // אוצר מילים
    Vocabulary.registerRoutes(route);
    // תרגול פעלים
    VerbDrills.registerRoutes(route);
    // חוקי השפה
    GrammarRules.registerRoutes(route);
    // אסלאם
    Islam.registerRoutes(route);

    global.addEventListener("hashchange", renderRoute);
    renderRoute();

    // קיצור Ctrl+G: המרת עברית לערבית בכל שדה טקסט באתר (למי שאין לו מקלדת ערבית)
    initHebrewToArabicShortcut();

    const navToggle = document.getElementById("navToggle");
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // בדיקות QA למנוע הבניינים - רצות ברקע בכל טעינה, מדווחות לקונסולה בלבד
    if (typeof runVerbEngineTests === "function") {
      const results = runVerbEngineTests();
      if (results.fail > 0) {
        console.error(`שימו לב: ${results.fail} בדיקות QA של מנוע הבניינים נכשלו!`);
      }
    }
  }

  function renderHome() {
    const totalKnown = VOCABULARY.filter((_, i) => getWordStatus(i) === "known").length;
    const overallPct = Math.round((totalKnown / VOCABULARY.length) * 100);

    return el("div", { class: "view view--home" }, [
      el("section", { class: "hero" }, [
        el("div", { class: "hero__pattern", "aria-hidden": "true" }),
        el("div", { class: "hero__content" }, [
          el("h1", { class: "hero__title" }, [
            el("span", { class: "hero__title-ar", lang: "ar" }, ["أهلاً وسهلاً"]),
            el("span", { class: "hero__title-he" }, ["ברוכים הבאים ל-ArabEz!"]),
          ]),
          el("p", { class: "hero__subtitle" }, [
            "כאן תוכלו ללמוד ערבית ספרותית ותרבות.",
          ]),
        ]),
      ]),

      el("section", { class: "home-cards" }, [
        homeCard("#/vocab", "📖", "אוצר מילים", `כרטיסיות, בוחנים וחיפוש על ${VOCABULARY.length} מילים ב-${VOCAB_CHAPTERS.length} פרקים.`, `${overallPct}% נלמדו`),
        homeCard("#/verbs", "🔤", "תרגול פעלים", "זהה או בנה צורות פועל בכל הבניינים, על סמך מנוע כללים מדויק."),
        homeCard("#/grammar", "📚", "חוקי השפה", "עמוד עיון: כל בניין עם תבנית מלאה וטבלת נטייה לכל הגופים."),
        homeCard("#/search", "🔎", "חיפוש חופשי", "חפשו מילה לפי עברית, ערבית או תעתיק."),
      ]),
    ]);
  }

  function homeCard(href, icon, title, desc, badge) {
    return el("a", { class: "home-card", href }, [
      el("div", { class: "home-card__icon", "aria-hidden": "true" }, [icon]),
      el("h2", { class: "home-card__title" }, [title]),
      el("p", { class: "home-card__desc" }, [desc]),
      badge ? el("span", { class: "home-card__badge" }, [badge]) : null,
    ]);
  }

  global.App = {
    el,
    route,
    navigate,
    showToast,
    shuffle,
    sample,
    pickOne,
    getWordStatus,
    setWordStatus,
    chapterIndices,
    chapterProgressPercent,
    partIndices,
    partProgressPercent,
    recordQuizResult,
    recentQuizHistory,
    stripDiacritics,
    hebrewToArabic,
  };

  document.addEventListener("DOMContentLoaded", init);
})(window);
