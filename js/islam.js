// פיצ'ר אסלאם - עמוד עיון תרבותי-דתי כרקע ללימוד הערבית.
// נקודת התחלה: חמשת עמודי האסלאם. מבנה הנתונים (data/islam.js) בנוי כרשימת
// "נושאים" (ISLAM_TOPICS) כדי שיהיה קל להוסיף כרטיסי נושא נוספים בעתיד
// בלי לגעת בלוגיקת הרינדור כאן.

(function (global) {
  "use strict";
  const { el } = App;

  function registerRoutes(route) {
    route("islam", renderIslamHub);
    route("islam/:id", renderIslamTopic);
  }

  function renderIslamHub() {
    return el("div", { class: "view view--islam" }, [
      pageHeader(
        "אסלאם",
        "עיון בעקרונות ובמנהגים מרכזיים באסלאם, כרקע תרבותי-דתי ללימוד השפה הערבית. אזור זה יתרחב בהמשך."
      ),
      el(
        "div",
        { class: "home-cards" },
        ISLAM_TOPICS.map((t) =>
          el("a", { class: "home-card", href: `#/islam/${t.id}` }, [
            el("div", { class: "home-card__icon", "aria-hidden": "true" }, [t.icon]),
            el("h2", { class: "home-card__title" }, [t.title]),
            el("p", { class: "home-card__desc" }, [t.description]),
          ])
        )
      ),
    ]);
  }

  function renderIslamTopic(params) {
    if (params.id === "five-pillars") return renderFivePillars();
    if (params.id === "sunni-shia") return renderSunniShia();
    return el("div", { class: "view" }, [el("h1", {}, ["הנושא לא נמצא"]), el("a", { href: "#/islam" }, ["חזרה"])]);
  }

  function renderFivePillars() {
    const pillars = FIVE_PILLARS.slice().sort((a, b) => a.order - b.order);
    return el("div", { class: "view view--five-pillars" }, [
      pageHeader("חמשת עמודי האסלאם", "חמש החובות הדתיות הבסיסיות שעל כל מוסלמי ומוסלמית לקיים.", "#/islam"),
      el("div", { class: "pillar-grid" }, pillars.map(pillarCard)),
    ]);
  }

  function pillarCard(p) {
    const children = [
      el("div", { class: "pillar-card__order" }, [String(p.order)]),
      el("div", { class: "pillar-card__icon", "aria-hidden": "true" }, [p.icon]),
      el("div", { class: "pillar-card__name" }, [el("h3", {}, [p.nameHeFull])]),
      el("div", { class: "pillar-card__arabic", lang: "ar" }, [p.arabic]),
      el("div", { class: "pillar-card__translit" }, [p.translit]),
      el("p", { class: "pillar-card__summary" }, [p.summary]),
    ];
    if (p.quote) {
      children.push(
        el("div", { class: "pillar-quote" }, [
          el("div", { class: "pillar-quote__arabic", lang: "ar" }, [p.quote.arabic]),
          el("div", { class: "pillar-quote__translit" }, [p.quote.translit]),
          el("div", { class: "pillar-quote__he" }, [p.quote.he]),
        ])
      );
    }
    return el("div", { class: "pillar-card" }, children);
  }

  function renderSunniShia() {
    return el("div", { class: "view view--sunni-shia" }, [
      pageHeader("סונה ושיעה", "שני הזרמים המרכזיים באסלאם: מקור הפילוג, עקרונות מרכזיים והבדלים בין הזרמים.", "#/islam"),
      el("div", { class: "origin-box" }, [
        el("h2", {}, [SUNNI_SHIA_ORIGIN.title]),
        el("p", {}, [SUNNI_SHIA_ORIGIN.text]),
      ]),
      el("div", { class: "stream-grid" }, SUNNI_SHIA.map(streamCard)),
    ]);
  }

  function streamCard(s) {
    return el("div", { class: "stream-card stream-card--" + s.id }, [
      el("div", { class: "stream-card__percent" }, [s.percent]),
      el("div", { class: "stream-card__name" }, [el("h3", {}, [s.nameHe]), el("div", { class: "stream-card__subtitle" }, [s.nameHeFull])]),
      el("div", { class: "stream-card__arabic", lang: "ar" }, [s.arabic]),
      el("div", { class: "stream-card__translit" }, [s.translit]),
      el("p", { class: "stream-card__meaning" }, [s.meaning]),
      el("p", { class: "stream-card__summary" }, [s.summary]),
      el(
        "ul",
        { class: "stream-card__points" },
        s.points.map((p) => el("li", {}, [p]))
      ),
      el("div", { class: "stream-card__tags" }, [
        el("div", { class: "stream-card__tags-label" }, [s.tagsLabel]),
        el(
          "div",
          { class: "stream-card__tags-list" },
          s.tags.map((t) => el("span", { class: "stream-tag" }, [t]))
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

  global.Islam = { registerRoutes };
})(window);
