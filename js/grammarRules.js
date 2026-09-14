// עמוד חוקי השפה - עיון בבניינים (סעיף 4 במפרט).
// מציג את 9 הבניינים הנתמכים (I-VIII, X; בניין IX לא נכלל בשלב זה) עם תבנית
// הבסיס המלאה על ف-ع-ل, טבלת נטייה מלאה לכל הגופים, ודוגמה נוספת עם שורש
// אמיתי מתוך 40 השורשים.

(function (global) {
  "use strict";
  const { el } = App;

  // שורש הדוגמה "ف-ع-ل" (= "לעשות") המשמש בסיס לכל תבניות הבניינים בטבלה 3.2
  const FA_AIN_LAM = { root: "فعل", r1: "ف", r2: "ع", r3: "ل", hebrew: "לעשות (שורש לדוגמה)" };

  // שורש אמיתי לדוגמה נוספת - שונה בכל בניין (כדי להדגים כל תבנית עם דוגמה
  // אותנטית ומוכרת במקום לחזור על אותה מילה "כתב" בכל הבניינים). כל שורש
  // נבחר כך שהצורה שהמנוע מייצר ממנו (VerbEngine, ללא טיפול מיוחד בשורשים
  // "חלולים"/עם אות גרונית) אכן תואמת את המילה האמיתית והמוכרת בבניין הזה.
  const EXAMPLE_ROOTS_BY_BINYAN = {
    I: { root: "كتب", r1: "ك", r2: "ت", r3: "ب", hebrew: "כתב" },
    II: { root: "دمر", r1: "د", r2: "م", r3: "ر", hebrew: "הרס, החריב" },
    III: { root: "سفر", r1: "س", r2: "ف", r3: "ر", hebrew: "נסע" },
    IV: { root: "رسل", r1: "ر", r2: "س", r3: "ل", hebrew: "שלח" },
    V: { root: "كلم", r1: "ك", r2: "ل", r3: "م", hebrew: "דיבר, שוחח" },
    VI: { root: "عون", r1: "ع", r2: "و", r3: "ن", hebrew: "שיתף פעולה" },
    VII: { root: "كسر", r1: "ك", r2: "س", r3: "ر", hebrew: "נשבר" },
    VIII: { root: "جمع", r1: "ج", r2: "م", r3: "ع", hebrew: "נפגש, התכנס" },
    X: { root: "قبل", r1: "ق", r2: "ب", r3: "ل", hebrew: "קיבל את פני-, אירח" },
  };

  const TENSE_LABELS = { past: "עבר", present: "הווה/עתיד", imperative: "ציווי", masdar: "מצדר" };

  // רשימת נושאי העיון בעמוד "חוקי השפה". מבנה הניתן להרחבה בקלות עם נושאי
  // דקדוק נוספים בעתיד.
  const GRAMMAR_TOPICS = [
    {
      id: "binyanim",
      icon: "🧩",
      title: "הבניינים",
      description: "9 הבניינים הנלמדים בשלב זה (1–8, 10): תבנית בסיס מלאה וטבלת נטייה לכל גוף.",
    },
    {
      id: "sifa-sila",
      icon: "🔗",
      title: "משפט צלה/משפט צפה",
      description: "שני סוגי משפטי תיאור: משפט המחובר לשם מיודע דרך כינוי זיקה, ומשפט שמתאר שם לא מיודע בלי כינוי זיקה.",
    },
    {
      id: "irab",
      icon: "🎯",
      title: "הניקוד הסופי",
      description: "טבלת סיכום: איך משתנה הניקוד באות האחרונה של שם עצם (רפע/נצב/ג'ר) לפי תפקידו במשפט, יידוע, ריבוי שלם זכר וזוגי.",
    },
    {
      id: "tafdil",
      icon: "⚖️",
      title: "ערך היתרון/ערך ההפלגה",
      description: "שתי דרכי השוואה: 'יותר מ-' (ערך היתרון), ו'הכי/ה-...ביותר' (ערך ההפלגה) - שלוש תבניות אפשריות.",
    },
  ];

  // --- תוכן הנושא "משפט צלה/משפט צפה" ------------------------------------
  const SIFA_SILA_INTRO = {
    title: "הרעיון המשותף: משפט שמתאר שם עצם",
    text:
      'בשני המקרים בא אחרי שם עצם ("השם הזוקק") משפט נוסף שמתאר או משלים אותו. ההבדל נקבע לפי יידוע השם: אם הוא מיודע - המשפט מחובר אליו דרך כינוי זיקה שמתאים לו במין ובמספר, וזהו "משפט צלה". אם הוא לא מיודע (נכ\'רה) - המשפט מתאר אותו ישירות, בלי שום כינוי זיקה, וזהו "משפט צפה".',
  };

  const SIFA_SILA_FAMILIES = [
    {
      id: "sila",
      badge: "שם מיודע + כינוי זיקה",
      nameHe: "משפט צלה",
      arabic: "الجُمْلَة الصِّلَة",
      summary: 'משפט שבא אחרי שם עצם מיודע ("השם הזוקק"), ומחובר אליו באמצעות כינוי זיקה המתאים לו במין ובמספר.',
      points: [
        "השם הזוקק (המתואר) הוא תמיד מיודע - עם 'ال' הידיעה, שם פרטי או כינוי גוף",
        "כינוי הזיקה בא מיד אחרי השם הזוקק ומתאים לו במין ובמספר (ראו טבלה)",
        "אחרי כינוי הזיקה בא משפט הזיקה עצמו (الجملة الصلة) - הוא זה שמתאר את השם הזוקק",
      ],
      pronounTable: [
        { antecedent: "זכר (יחיד)", pronoun: "الَّذِي" },
        { antecedent: "נקבה (יחידה)", pronoun: "الَّتِي" },
        { antecedent: "רבים (בני אדם)", pronoun: "الَّذِينَ" },
        { antecedent: "רבות (בנות אדם)", pronoun: "اللَّوَاتِي" },
      ],
      example: {
        arabic: "قَرَأْتُ الكِتَابَ الَّذِي كَتَبَهُ كَاتِبٌ مَشْهُورٌ",
        he: `"קראתי את הספר שכתב אותו סופר מפורסם"`,
      },
    },
    {
      id: "sifa",
      badge: "שם לא מיודע, בלי כינוי זיקה",
      nameHe: "משפט צפה",
      arabic: "الجُمْلَة الصِّفَة",
      summary: "משפט שבא אחרי שם עצם לא מיודע (נכ'רה), ומתפקד בעצמו כתואר שלו - בלי שום כינוי זיקה שמפריד ביניהם.",
      points: [
        "השם הזוקק (המתואר) הוא תמיד לא מיודע - נכ'רה, בלי 'ال' הידיעה",
        "אין כינוי זיקה בין השם למשפט - המשפט מחובר אליו ישירות",
        "זיהוי מהיר: פועל ולפניו שם עצם לא מיודע ⇽ זהו משפט צפה, והשם הלא מיודע הוא השם הזוקק",
      ],
      example: {
        arabic: "قَرَأْتُ كِتَابًا كَتَبَهُ كَاتِبٌ مَشْهُورٌ",
        he: `"קראתי ספר שכתב אותו סופר מפורסם"`,
      },
    },
  ];

  // --- תוכן הנושא "הניקוד הסופי" (إعراب) -----------------------------------
  const IRAB_INTRO = {
    title: "מה זה ניקוד סופי?",
    text:
      'שמות עצם רבים בערבית משנים את הניקוד באות האחרונה שלהם לפי תפקידם התחבירי במשפט - נושא, מושא ישיר, או סומך/מושא עקיף. זהו "הניקוד הסופי". הטבלה שלהלן מסכמת את שלושת מצבי היחסה ואיך הם באים לידי ביטוי בשם רגיל (מיודע/לא מיודע), בריבוי שלם זכר ובזוגי - כולל הצורה המקוצרת (בלי ن) כשהשם סומך או מחובר לכינוי שייכות.',
  };

  const IRAB_COLUMNS = [
    { key: "caseNum", label: "מס' יחסה" },
    { key: "caseName", label: "שם יחסה" },
    { key: "role", label: "תפקיד תחבירי" },
    { key: "definite", label: "ש. עצם מיודע" },
    { key: "indefinite", label: "ש. עצם לא מיודע" },
    { key: "soundMascPlural", label: 'רש"ז' },
    { key: "soundMascPluralConstruct", label: 'רש"ז נסמך/עם כינוי שייכות' },
    { key: "dual", label: "זוגי" },
    { key: "dualConstruct", label: "זוגי נסמך/עם כינוי שייכות" },
  ];

  const IRAB_ROWS = [
    {
      caseNum: "1", caseName: "רפע", caseArabic: "رفع", role: "נושא / נושא שימני",
      definite: "ـُ", indefinite: "ـٌ",
      soundMascPlural: "ـُونَ", soundMascPluralConstruct: "ـُو",
      dual: "ـَانِ", dualConstruct: "ـَا",
    },
    {
      caseNum: "2", caseName: "נצב", caseArabic: "نصب", role: "מושא ישיר",
      definite: "ـَ", indefinite: "ـًا / ةً",
      soundMascPlural: "ـِينَ", soundMascPluralConstruct: "ـِي",
      dual: "ـَيْنِ", dualConstruct: "ـَيْ",
    },
    {
      caseNum: "3", caseName: "ג'ר", caseArabic: "جر", role: "סומך / מושא עקיף",
      definite: "ـِ", indefinite: "ـٍ",
      soundMascPlural: "ـِينَ", soundMascPluralConstruct: "ـِي",
      dual: "ـَيْنِ", dualConstruct: "ـَيْ",
    },
  ];

  const IRAB_EXAMPLES = [
    { arabic: "الطَّالِبُ مُجْتَهِدٌ", he: '"התלמיד חרוץ" - נושא, רפע', role: "רפע" },
    { arabic: "رَأَيْتُ الطَّالِبَ", he: '"ראיתי את התלמיד" - מושא ישיר, נצב', role: "נצב" },
    { arabic: "سَلَّمْتُ عَلَى الطَّالِبِ", he: '"בירכתי לשלום את התלמיד" - מושא עקיף (אחרי מילת יחס), ג\'ר', role: "ג'ר" },
  ];

  // --- תוכן הנושא "ערך היתרון/ערך ההפלגה" ---------------------------------
  const TAFDIL_INTRO = {
    title: "הרעיון המשותף: أَفْعَل - תבנית ההשוואה",
    text:
      'שתי הצורות בנויות מאותה תבנית - أَفْعَل (ולעיתים أَفَلّ או أَفْعَى, בהתאם לסוג השורש) - ומשמשות להשוואה. ערך היתרון משווה בין שניים ("יותר X מ-Y"), וערך ההפלגה מבליט אחד מתוך קבוצה ("הכי X" / "ה-X ביותר"). ההבדל הוא במה שבא אחרי أَفْعَل: מילת היחס مِنْ, שם בסמיכות, או שם תואר מלא שמתאים במין ובמספר.',
  };

  const TAFDIL_FAMILIES = [
    {
      id: "yitaron",
      badge: "יותר מ- (+ مِنْ)",
      nameHe: "ערך היתרון",
      summary: "משווה בין שני דברים ואומר שאחד עולה על השני בתכונה מסוימת - במשמעות 'יותר X מ-Y'.",
      points: [
        "התבנית: أَفْعَل / أَفَلّ / أَفْعَى (בהתאם לסוג השורש) + مِنْ",
        "הצורה קבועה ולא משתנה לפי מין או מספר - אותה מילה בדיוק משמשת לזכר, נקבה, יחיד ורבים",
      ],
      example: {
        arabic: "أَلْمَدْرَسَة أَقْرَب مِنَ الْبَيْت",
        he: `"בית הספר קרוב יותר מהבית"`,
      },
    },
    {
      id: "haflaga",
      badge: "הכי.../ה-...ביותר",
      nameHe: "ערך ההפלגה",
      summary: "מבליט דבר אחד כקיצוני ביותר מתוך קבוצה - 'הכי X' / 'ה-X ביותר'. יש 3 תבניות אפשריות:",
      haflagaTable: [
        { num: "1", pattern: "أفعل + שם מיודע ברבים", link: "סמיכות", example: "أَكْبَر الأَوْلَاد", he: "הכי גדול מבין הילדים" },
        { num: "2", pattern: "أفعل + שם לא מיודע ביחיד", link: "סמיכות", example: "أَكْبَر وَلَد", he: "הילד הכי גדול" },
        { num: "3", pattern: "שם עצם מיודע + أفعل מיודע", link: "שם + שם תואר", example: "الوَلَد الأَكْبَر", he: "הילד הכי גדול (הבן הבכור)" },
      ],
      note:
        "לתשומת לב: במבנה 3 ערך ההפלגה מיודע (עם 'ال') ומתפקד כשם תואר רגיל - ולכן הוא חייב להתאים במלואו לשם שהוא מתאר: במין, במספר וביידוע. בנקבה יש לרוב תבנית ייחודית בשקל فُعْلَى (לא +ة!): أَكْبَر (ז') ← كُبْرَى (נ'), أَفْضَل (ז') ← فُضْلَى (נ'), أَصْغَر (ז') ← صُغْرَى (נ').",
    },
  ];

  function registerRoutes(route) {
    route("grammar", renderGrammarHub);
    route("grammar/binyanim", renderGrammarList);
    route("grammar/sifa-sila", renderSifaSila);
    route("grammar/irab", renderIrab);
    route("grammar/tafdil", renderTafdil);
    route("grammar/:id", renderGrammarDetail);
  }

  function renderTafdil() {
    return el("div", { class: "view view--tafdil" }, [
      pageHeader("ערך היתרון / ערך ההפלגה", "שתי דרכי השוואה בערבית, בנויות על אותה תבנית أَفْعَل.", "#/grammar"),
      el("div", { class: "origin-box" }, [el("h2", {}, [TAFDIL_INTRO.title]), el("p", {}, [TAFDIL_INTRO.text])]),
      el("div", { class: "stream-grid" }, TAFDIL_FAMILIES.map(tafdilCard)),
    ]);
  }

  function tafdilCard(f) {
    return el("div", { class: "stream-card stream-card--grammar stream-card--" + f.id }, [
      el("div", { class: "stream-card__percent" }, [f.badge]),
      el("div", { class: "stream-card__name stream-card__name--underlined" }, [el("h3", {}, [f.nameHe])]),
      el("p", { class: "stream-card__summary" }, [f.summary]),
      f.points
        ? el(
            "ul",
            { class: "stream-card__points" },
            f.points.map((p) => el("li", {}, [p]))
          )
        : null,
      f.haflagaTable ? haflagaTable(f.haflagaTable) : null,
      f.note ? el("p", { class: "hint-text" }, [f.note]) : null,
      f.example
        ? el("div", { class: "pillar-quote pillar-quote--grammar" }, [
            el("div", { class: "pillar-quote__arabic", lang: "ar" }, [f.example.arabic]),
            el("div", { class: "pillar-quote__he" }, [f.example.he]),
          ])
        : null,
    ]);
  }

  function haflagaTable(rows) {
    return el("div", { class: "table-scroll" }, [
      el("table", { class: "forms-table forms-table--paradigm" }, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["מס'"]), el("th", {}, ["מבנה"]), el("th", {}, ["קשר בין המילים"]), el("th", {}, ["דוגמה"])])]),
        el(
          "tbody",
          {},
          rows.map((r) =>
            el("tr", {}, [
              el("td", {}, [r.num]),
              el("td", {}, [r.pattern]),
              el("td", {}, [r.link]),
              el("td", {}, [el("div", { class: "ar", lang: "ar" }, [r.example]), el("div", { class: "translit" }, [r.he])]),
            ])
          )
        ),
      ]),
    ]);
  }

  function renderIrab() {
    return el("div", { class: "view view--irab" }, [
      pageHeader("הניקוד הסופי", "טבלת סיכום ליחסות רפע/נצב/ג'ר בשם עצם, לפי תפקיד תחבירי, יידוע, ריבוי שלם זכר וזוגי.", "#/grammar"),
      el("div", { class: "origin-box" }, [el("h2", {}, [IRAB_INTRO.title]), el("p", {}, [IRAB_INTRO.text])]),
      irabTable(),
      el("h2", {}, ["דוגמה: אותו שם, שלוש יחסות"]),
      el(
        "div",
        { class: "stream-grid" },
        IRAB_EXAMPLES.map((ex) =>
          el("div", { class: "pillar-quote pillar-quote--grammar" }, [
            el("div", { class: "pillar-quote__arabic", lang: "ar" }, [ex.arabic]),
            el("div", { class: "pillar-quote__he" }, [ex.he]),
          ])
        )
      ),
    ]);
  }

  function irabTable() {
    return el("div", { class: "table-scroll" }, [
      el("table", { class: "forms-table forms-table--grid" }, [
        el("thead", {}, [el("tr", {}, IRAB_COLUMNS.map((c) => el("th", {}, [c.label])))]),
        el(
          "tbody",
          {},
          IRAB_ROWS.map((r) =>
            el("tr", {}, [
              el("td", {}, [r.caseNum]),
              el("td", {}, [`${r.caseName} (${r.caseArabic})`]),
              el("td", {}, [r.role]),
              el("td", { class: "ar", lang: "ar" }, [r.definite]),
              el("td", { class: "ar", lang: "ar" }, [r.indefinite]),
              el("td", { class: "ar", lang: "ar" }, [r.soundMascPlural]),
              el("td", { class: "ar", lang: "ar" }, [r.soundMascPluralConstruct]),
              el("td", { class: "ar", lang: "ar" }, [r.dual]),
              el("td", { class: "ar", lang: "ar" }, [r.dualConstruct]),
            ])
          )
        ),
      ]),
    ]);
  }

  function renderSifaSila() {
    return el("div", { class: "view view--sifa-sila" }, [
      pageHeader("משפט צלה / משפט צפה", "שני סוגי משפטי תיאור בערבית - כל אחד מותנה ביידוע השם שהוא מתאר.", "#/grammar"),
      el("div", { class: "origin-box" }, [el("h2", {}, [SIFA_SILA_INTRO.title]), el("p", {}, [SIFA_SILA_INTRO.text])]),
      el("div", { class: "stream-grid" }, SIFA_SILA_FAMILIES.map(sifaSilaCard)),
    ]);
  }

  function sifaSilaCard(f) {
    return el("div", { class: "stream-card stream-card--grammar stream-card--" + f.id }, [
      el("div", { class: "stream-card__percent" }, [f.badge]),
      el("div", { class: "stream-card__name" }, [el("h3", {}, [f.nameHe])]),
      el("div", { class: "stream-card__arabic", lang: "ar" }, [f.arabic]),
      el("p", { class: "stream-card__summary" }, [f.summary]),
      el(
        "ul",
        { class: "stream-card__points" },
        f.points.map((p) => el("li", {}, [p]))
      ),
      f.pronounTable ? pronounTable(f.pronounTable) : null,
      el("div", { class: "pillar-quote pillar-quote--grammar" }, [
        el("div", { class: "pillar-quote__arabic", lang: "ar" }, [f.example.arabic]),
        el("div", { class: "pillar-quote__he" }, [f.example.he]),
      ]),
    ]);
  }

  function pronounTable(rows) {
    return el("div", { class: "table-scroll" }, [
      el("table", { class: "forms-table forms-table--paradigm" }, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["השם הזוקק"]), el("th", {}, ["כינוי הזיקה"])])]),
        el(
          "tbody",
          {},
          rows.map((r) => el("tr", {}, [el("td", {}, [r.antecedent]), el("td", { class: "ar", lang: "ar" }, [r.pronoun])]))
        ),
      ]),
    ]);
  }

  function renderGrammarHub() {
    return el("div", { class: "view view--grammar-hub" }, [
      pageHeader("חוקי השפה", "עיון בחוקי הדקדוק של הערבית הספרותית. אזור זה יתרחב בהמשך עם נושאים נוספים."),
      el(
        "div",
        { class: "home-cards" },
        GRAMMAR_TOPICS.map((t) =>
          el("a", { class: "home-card", href: `#/grammar/${t.id}` }, [
            el("div", { class: "home-card__icon", "aria-hidden": "true" }, [t.icon]),
            el("h2", { class: "home-card__title" }, [t.title]),
            el("p", { class: "home-card__desc" }, [t.description]),
          ])
        )
      ),
    ]);
  }

  function renderGrammarList() {
    return el("div", { class: "view view--grammar" }, [
      pageHeader("הבניינים", "9 הבניינים הנלמדים בשלב זה (1–8, 10). לחצו על בניין לצפייה בתבנית המלאה.", "#/grammar"),
      el(
        "div",
        { class: "binyan-grid" },
        VerbEngine.BINYANIM.map((b) =>
          el("a", { class: "binyan-card", href: `#/grammar/${b.id}` }, [
            binyanIcon(b.digit),
            el("h3", {}, [b.name]),
            el("p", {}, [b.meaning]),
          ])
        )
      ),
    ]);
  }

  function binyanIcon(digit) {
    return el("div", { class: "binyan-icon", "aria-hidden": "true" }, [el("span", {}, [digit])]);
  }

  function renderGrammarDetail(params) {
    const b = VerbEngine.BINYANIM.find((x) => x.id === params.id);
    if (!b) return el("div", { class: "view" }, [el("h1", {}, ["בניין לא נמצא"]), el("a", { href: "#/grammar/binyanim" }, ["חזרה"])]);

    const container = el("div", { class: "view view--binyan-detail" });
    container.appendChild(pageHeader(`${b.name} — ${b.meaning}`, "", "#/grammar/binyanim"));
    container.appendChild(
      el("div", { class: "binyan-detail__hero" }, [binyanIcon(b.digit), el("p", { class: "binyan-detail__meaning" }, [b.meaning])])
    );

    container.appendChild(el("h2", {}, ["תבנית הבסיס (על השורש ف-ع-ل)"]));
    container.appendChild(baseFormsTable(b, FA_AIN_LAM));

    container.appendChild(el("h2", {}, ["טבלת נטייה מלאה לכל הגופים (ف-ع-ل)"]));
    container.appendChild(fullParadigm(b, FA_AIN_LAM));

    const exampleRoot = EXAMPLE_ROOTS_BY_BINYAN[b.id] || EXAMPLE_ROOTS_BY_BINYAN.I;
    container.appendChild(el("h2", {}, ["דוגמה עם שורש אמיתי: " + exampleRoot.root + " (" + exampleRoot.hebrew + ")"]));
    container.appendChild(baseFormsTable(b, exampleRoot));

    container.appendChild(
      el("p", { class: "hint-text" }, [
        "לתשומת לב: לא כל שילוב שורש+בניין הוא בהכרח מילה קיימת ונפוצה בערבית. זהו כלי לתרגול התבנית הדקדוקית, לא מילון מאומת.",
      ])
    );

    return container;
  }

  function baseFormsTable(binyan, root) {
    const past = VerbEngine.conjugatePast(root, binyan.id, "huwa");
    const present = VerbEngine.conjugatePresent(root, binyan.id, "huwa");
    const imperative = VerbEngine.conjugateImperative(root, binyan.id, "anta");
    const masdar = VerbEngine.conjugateMasdar(root, binyan.id);

    return el("table", { class: "forms-table" }, [
      el("thead", {}, [el("tr", {}, [el("th", {}, ["זמן"]), el("th", {}, ["ערבית"])])]),
      el("tbody", {}, [
        formRow("עבר (هو)", past),
        formRow("הווה/עתיד (هو)", present),
        formRow("ציווי (أنتَ)", imperative),
        masdar
          ? formRow("מצדר", masdar)
          : el("tr", {}, [
              el("td", { colspan: "2", class: "hint-text" }, [
                el("strong", {}, ["מצדר: "]),
                "משתנה לפי פועל — לא ניתן לגנרציה אוטומטית (ראו אזהרה במפרט)",
              ]),
            ]),
      ]),
    ]);
  }

  function formRow(label, form) {
    return el("tr", {}, [el("td", {}, [label]), el("td", { class: "ar", lang: "ar" }, [form.ar])]);
  }

  function fullParadigm(binyan, root) {
    const wrap = el("div", { class: "paradigm-wrap" });

    wrap.appendChild(el("h3", {}, ["עבר"]));
    wrap.appendChild(personTable(VerbEngine.PAST_PERSONS, (p) => VerbEngine.conjugatePast(root, binyan.id, p.id)));

    wrap.appendChild(el("h3", {}, ["הווה/עתיד"]));
    wrap.appendChild(personTable(VerbEngine.PRESENT_PERSONS, (p) => VerbEngine.conjugatePresent(root, binyan.id, p.id)));

    wrap.appendChild(el("h3", {}, ["ציווי"]));
    wrap.appendChild(personTable(VerbEngine.IMPERATIVE_PERSONS, (p) => VerbEngine.conjugateImperative(root, binyan.id, p.id)));

    return wrap;
  }

  function personTable(persons, formFn) {
    return el("div", { class: "table-scroll" }, [
      el("table", { class: "forms-table forms-table--paradigm" }, [
        el("thead", {}, [el("tr", {}, [el("th", {}, ["גוף"]), el("th", {}, ["ערבית"])])]),
        el(
          "tbody",
          {},
          persons.map((p) => {
            const form = formFn(p);
            return el("tr", {}, [el("td", {}, [p.label]), el("td", { class: "ar", lang: "ar" }, [form.ar])]);
          })
        ),
      ]),
    ]);
  }

  function pageHeader(title, subtitle, backHref) {
    return el("div", { class: "page-header" }, [
      backHref ? el("a", { class: "back-link", href: backHref }, ["→ חזרה"]) : null,
      el("h1", {}, [title]),
      subtitle ? el("p", { class: "page-header__subtitle" }, [subtitle]) : null,
    ]);
  }

  global.GrammarRules = { registerRoutes };
})(window);
