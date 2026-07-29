// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx (גיליון 'פתרונות') על ידי
// scripts/convert_xlsx_to_js.py. אל תערוך ידנית - ערוך את קובץ המקור והרץ
// מחדש את הסקריפט. כל פריט מכיל רק {root, binyanId, tense, personId}; הצורה
// המנוטה (ar/he) נגזרת מחדש ע"י VerbEngine.generateForm בזמן ריצה.

const VERB_PRACTICE_SET = [
  {
    "root": "ذهب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "درس",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "حمل",
    "binyanId": "V",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "فهم",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "صعد",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "قطع",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "كتب",
    "binyanId": "X",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "ضرب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "نظر",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "ضرب",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "جمع",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "لعب",
    "binyanId": "VI",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "عمل",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "دخل",
    "binyanId": "V",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "شرب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "حمل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "رجع",
    "binyanId": "II",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "صعد",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "قطع",
    "binyanId": "IV",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "نزل",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "سمع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "رجع",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "رجع",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "لعب",
    "binyanId": "III",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "فشل",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "غلق",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "لبس",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "رسم",
    "binyanId": "II",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "دفع",
    "binyanId": "III",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "ضرب",
    "binyanId": "VII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "ضحك",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "حمل",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "عرف",
    "binyanId": "V",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "فهم",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "رقص",
    "binyanId": "III",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "درس",
    "binyanId": "VII",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "قطع",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "جلس",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "فشل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "عرف",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "حكم",
    "binyanId": "VI",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "قطع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "كتب",
    "binyanId": "IV",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "رسم",
    "binyanId": "VIII",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "قطع",
    "binyanId": "X",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "ضرب",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "حفظ",
    "binyanId": "II",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "عمل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "كسر",
    "binyanId": "VII",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "حكم",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "ضحك",
    "binyanId": "III",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "عرف",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "غلق",
    "binyanId": "VII",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "حمل",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "نجح",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "قفز",
    "binyanId": "II",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "درس",
    "binyanId": "II",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "دخل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "طلب",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "لبس",
    "binyanId": "IV",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "فهم",
    "binyanId": "V",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "نظر",
    "binyanId": "III",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "عمل",
    "binyanId": "X",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "غلق",
    "binyanId": "II",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "فتح",
    "binyanId": "III",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "قطع",
    "binyanId": "VII",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "جلس",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "عرف",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "نزل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "رجع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "ذهب",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "خرج",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "نظر",
    "binyanId": "II",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "غسل",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "رجع",
    "binyanId": "X",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "شرب",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "نجح",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "غسل",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "ضحك",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "حفظ",
    "binyanId": "X",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "زرع",
    "binyanId": "X",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "صعد",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "خرج",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "زرع",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "دفع",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "حفظ",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "طلب",
    "binyanId": "V",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "حكم",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "كسر",
    "binyanId": "II",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "جمع",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "جمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "درس",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "عمل",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "نزل",
    "binyanId": "II",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "جمع",
    "binyanId": "IV",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "حكم",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "فهم",
    "binyanId": "II",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "فهم",
    "binyanId": "X",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "كتب",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "حمل",
    "binyanId": "II",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "غسل",
    "binyanId": "II",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "فتح",
    "binyanId": "VIII",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "ضرب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "فتح",
    "binyanId": "II",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "قطع",
    "binyanId": "III",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "قطع",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "سمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "قطع",
    "binyanId": "IV",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "سمع",
    "binyanId": "V",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "فتح",
    "binyanId": "X",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "خرج",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "خرج",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "ركب",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "كتب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "حكم",
    "binyanId": "III",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "فتح",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "نزل",
    "binyanId": "III",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "حكم",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "رجع",
    "binyanId": "III",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "درس",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "فتح",
    "binyanId": "VII",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "غلق",
    "binyanId": "X",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "حكم",
    "binyanId": "X",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "نظر",
    "binyanId": "III",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "عمل",
    "binyanId": "III",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "ضرب",
    "binyanId": "II",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "لبس",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "كسر",
    "binyanId": "V",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "شرب",
    "binyanId": "V",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "قطع",
    "binyanId": "V",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "حفظ",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "عمل",
    "binyanId": "III",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "ركب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "ذهب",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "حمل",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "جمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "جمع",
    "binyanId": "X",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "عمل",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "خرج",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "زرع",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "سبح",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "دفع",
    "binyanId": "VII",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "نظر",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "ركب",
    "binyanId": "V",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "نزل",
    "binyanId": "III",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "طبخ",
    "binyanId": "II",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "فشل",
    "binyanId": "II",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "صعد",
    "binyanId": "II",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "طلب",
    "binyanId": "III",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "غسل",
    "binyanId": "VII",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "سمع",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "غلق",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "IV",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "رجع",
    "binyanId": "II",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "قطع",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "عرف",
    "binyanId": "V",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "قطع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "درس",
    "binyanId": "VII",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "سمع",
    "binyanId": "II",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "عمل",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "X",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "فهم",
    "binyanId": "II",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "زرع",
    "binyanId": "VII",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "دخل",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "قطع",
    "binyanId": "II",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "رجع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "جلس",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "عمل",
    "binyanId": "III",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "قطع",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "ذهب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "رجع",
    "binyanId": "III",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "جلس",
    "binyanId": "IV",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "قطع",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "درس",
    "binyanId": "II",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "زرع",
    "binyanId": "X",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "ركب",
    "binyanId": "VI",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "ضحك",
    "binyanId": "IV",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "جمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "دخل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "ضرب",
    "binyanId": "II",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "قطع",
    "binyanId": "III",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "فتح",
    "binyanId": "III",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "ركب",
    "binyanId": "II",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "نظر",
    "binyanId": "II",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "لعب",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "سبح",
    "binyanId": "II",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "صعد",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "درس",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "ركب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "عرف",
    "binyanId": "II",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "رسم",
    "binyanId": "VIII",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "كتب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "ركب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "درس",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "نجح",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "قفز",
    "binyanId": "II",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "رجع",
    "binyanId": "X",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "رجع",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "فشل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "نظر",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "حمل",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "فتح",
    "binyanId": "VII",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "زرع",
    "binyanId": "X",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "درس",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "عرف",
    "binyanId": "II",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "شرب",
    "binyanId": "V",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "قطع",
    "binyanId": "V",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "فتح",
    "binyanId": "VII",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "غلق",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "سمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "طلب",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "V",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "كسر",
    "binyanId": "V",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حمل",
    "binyanId": "II",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "قطع",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "نظر",
    "binyanId": "II",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "حكم",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "نظر",
    "binyanId": "III",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "غلق",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "رجع",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "غلق",
    "binyanId": "II",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "فتح",
    "binyanId": "III",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "كسر",
    "binyanId": "VII",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "حمل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "جلس",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "جمع",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "ركب",
    "binyanId": "V",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "قطع",
    "binyanId": "V",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "خرج",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "ضحك",
    "binyanId": "III",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "نجح",
    "binyanId": "II",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "طلب",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "سمع",
    "binyanId": "II",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "نظر",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "عمل",
    "binyanId": "III",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "قطع",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "ضرب",
    "binyanId": "II",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "III",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "رقص",
    "binyanId": "III",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "خرج",
    "binyanId": "IV",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "خرج",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "رجع",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "ضرب",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "خرج",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "خرج",
    "binyanId": "V",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "عرف",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "حمل",
    "binyanId": "V",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "زرع",
    "binyanId": "III",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "شرب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "حكم",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "غسل",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "V",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "حفظ",
    "binyanId": "II",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "دفع",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "masdar",
    "personId": null
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "قطع",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "فشل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "كتب",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "نظر",
    "binyanId": "VI",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "حمل",
    "binyanId": "II",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "صعد",
    "binyanId": "II",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "حمل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "ضحك",
    "binyanId": "II",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "رجع",
    "binyanId": "X",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "كسر",
    "binyanId": "II",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "ذهب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "عرف",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "قطع",
    "binyanId": "VII",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "صعد",
    "binyanId": "II",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "دخل",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "فشل",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "عمل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "عرف",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "حمل",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "V",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "درس",
    "binyanId": "VII",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "غسل",
    "binyanId": "VII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "ضرب",
    "binyanId": "II",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "غلق",
    "binyanId": "VII",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "عمل",
    "binyanId": "VI",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "عرف",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "فتح",
    "binyanId": "X",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "كسر",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "عرف",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "فشل",
    "binyanId": "II",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "حكم",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "نزل",
    "binyanId": "III",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "عمل",
    "binyanId": "IV",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "فتح",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "صعد",
    "binyanId": "V",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "شرب",
    "binyanId": "IV",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "نزل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "درس",
    "binyanId": "III",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "طلب",
    "binyanId": "III",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "غلق",
    "binyanId": "VII",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "عمل",
    "binyanId": "X",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "زرع",
    "binyanId": "VII",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "فشل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "حكم",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "طلب",
    "binyanId": "III",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "نظر",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "جلس",
    "binyanId": "VI",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "دخل",
    "binyanId": "V",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "حمل",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "فهم",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "سمع",
    "binyanId": "V",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "لعب",
    "binyanId": "VI",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "جمع",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "رسم",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "نزل",
    "binyanId": "III",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "دفع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "صعد",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "حكم",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "كتب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "شرب",
    "binyanId": "V",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "فتح",
    "binyanId": "VII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "كسر",
    "binyanId": "VII",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "جمع",
    "binyanId": "V",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "حفظ",
    "binyanId": "V",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "شرب",
    "binyanId": "IV",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "عمل",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "زرع",
    "binyanId": "X",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "لبس",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "فهم",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "درس",
    "binyanId": "VII",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "فتح",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "نظر",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "خرج",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "عرف",
    "binyanId": "V",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "غسل",
    "binyanId": "VII",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "زرع",
    "binyanId": "III",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "شرب",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "غسل",
    "binyanId": "II",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "حكم",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "دفع",
    "binyanId": "VI",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "نزل",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "فشل",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "فتح",
    "binyanId": "III",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "حكم",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "رجع",
    "binyanId": "X",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "رقص",
    "binyanId": "III",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "نزل",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "قطع",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "حكم",
    "binyanId": "V",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "غسل",
    "binyanId": "II",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "خرج",
    "binyanId": "II",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "حفظ",
    "binyanId": "II",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "غسل",
    "binyanId": "VIII",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "نظر",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "عرف",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "رجع",
    "binyanId": "II",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "غسل",
    "binyanId": "VII",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "رجع",
    "binyanId": "III",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "رقص",
    "binyanId": "II",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "فتح",
    "binyanId": "II",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "كسر",
    "binyanId": "VII",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "غلق",
    "binyanId": "II",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "نزل",
    "binyanId": "III",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "ضحك",
    "binyanId": "III",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "طلب",
    "binyanId": "V",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "لبس",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "دفع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "حفظ",
    "binyanId": "II",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "جلس",
    "binyanId": "III",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "لبس",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "سمع",
    "binyanId": "VI",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "كسر",
    "binyanId": "VII",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "درس",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "نظر",
    "binyanId": "VI",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "حكم",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "فتح",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "غسل",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "فهم",
    "binyanId": "VI",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "رجع",
    "binyanId": "VI",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "ضرب",
    "binyanId": "VI",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "III",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "رسم",
    "binyanId": "II",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "ركب",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "شرب",
    "binyanId": "V",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "لعب",
    "binyanId": "VI",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "ضحك",
    "binyanId": "IV",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "ذهب",
    "binyanId": "IV",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "خرج",
    "binyanId": "V",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "عمل",
    "binyanId": "IV",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "فهم",
    "binyanId": "V",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "حفظ",
    "binyanId": "V",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "دخل",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "دفع",
    "binyanId": "VII",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "نجح",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "حفظ",
    "binyanId": "V",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "لبس",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "قطع",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "غسل",
    "binyanId": "VIII",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "طبخ",
    "binyanId": "II",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "ضحك",
    "binyanId": "III",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "خدم",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "زرع",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "ضحك",
    "binyanId": "II",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "عمل",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "كتب",
    "binyanId": "II",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "نظر",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "II",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "جمع",
    "binyanId": "V",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "ضرب",
    "binyanId": "III",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "حفظ",
    "binyanId": "VIII",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "عرف",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "غلق",
    "binyanId": "VII",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "IV",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "قفز",
    "binyanId": "II",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "فشل",
    "binyanId": "II",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "كتب",
    "binyanId": "X",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "غلق",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "ركب",
    "binyanId": "VI",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "حفظ",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "كتب",
    "binyanId": "VI",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "جمع",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "ركب",
    "binyanId": "II",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "فهم",
    "binyanId": "II",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "حمل",
    "binyanId": "VI",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "فهم",
    "binyanId": "X",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "كتب",
    "binyanId": "X",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "X",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "كتب",
    "binyanId": "III",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "كتب",
    "binyanId": "I",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "فهم",
    "binyanId": "I",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "سمع",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "شرب",
    "binyanId": "I",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "ذهب",
    "binyanId": "I",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "رجع",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "خرج",
    "binyanId": "I",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "دخل",
    "binyanId": "I",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "جلس",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "نظر",
    "binyanId": "I",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "عمل",
    "binyanId": "I",
    "tense": "present",
    "personId": "huma_f"
  },
  {
    "root": "لعب",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "درس",
    "binyanId": "I",
    "tense": "past",
    "personId": "hunna"
  },
  {
    "root": "فتح",
    "binyanId": "I",
    "tense": "present",
    "personId": "ana"
  },
  {
    "root": "غلق",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "طلب",
    "binyanId": "I",
    "tense": "past",
    "personId": "anti"
  },
  {
    "root": "عرف",
    "binyanId": "I",
    "tense": "present",
    "personId": "huwa"
  },
  {
    "root": "حفظ",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "كسر",
    "binyanId": "I",
    "tense": "past",
    "personId": "nahnu"
  },
  {
    "root": "غسل",
    "binyanId": "I",
    "tense": "present",
    "personId": "antuma"
  },
  {
    "root": "لبس",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "ركب",
    "binyanId": "I",
    "tense": "past",
    "personId": "antunna"
  },
  {
    "root": "نزل",
    "binyanId": "I",
    "tense": "present",
    "personId": "huma_m"
  },
  {
    "root": "صعد",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "خدم",
    "binyanId": "I",
    "tense": "past",
    "personId": "hum"
  },
  {
    "root": "رسم",
    "binyanId": "I",
    "tense": "present",
    "personId": "hunna"
  },
  {
    "root": "طبخ",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "زرع",
    "binyanId": "I",
    "tense": "past",
    "personId": "anta"
  },
  {
    "root": "حمل",
    "binyanId": "I",
    "tense": "present",
    "personId": "anti"
  },
  {
    "root": "دفع",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "جمع",
    "binyanId": "I",
    "tense": "past",
    "personId": "hiya"
  },
  {
    "root": "قطع",
    "binyanId": "I",
    "tense": "present",
    "personId": "nahnu"
  },
  {
    "root": "ضرب",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "حكم",
    "binyanId": "I",
    "tense": "past",
    "personId": "antum"
  },
  {
    "root": "نجح",
    "binyanId": "I",
    "tense": "present",
    "personId": "antunna"
  },
  {
    "root": "فشل",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anta"
  },
  {
    "root": "رقص",
    "binyanId": "I",
    "tense": "past",
    "personId": "huma_f"
  },
  {
    "root": "ضحك",
    "binyanId": "I",
    "tense": "present",
    "personId": "hum"
  },
  {
    "root": "قفز",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antum"
  },
  {
    "root": "سبح",
    "binyanId": "I",
    "tense": "past",
    "personId": "ana"
  },
  {
    "root": "كتب",
    "binyanId": "I",
    "tense": "present",
    "personId": "anta"
  },
  {
    "root": "فهم",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "anti"
  },
  {
    "root": "سمع",
    "binyanId": "I",
    "tense": "past",
    "personId": "huwa"
  },
  {
    "root": "شرب",
    "binyanId": "I",
    "tense": "present",
    "personId": "hiya"
  },
  {
    "root": "ذهب",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antunna"
  },
  {
    "root": "رجع",
    "binyanId": "I",
    "tense": "past",
    "personId": "antuma"
  },
  {
    "root": "خرج",
    "binyanId": "I",
    "tense": "present",
    "personId": "antum"
  },
  {
    "root": "دخل",
    "binyanId": "I",
    "tense": "imperative",
    "personId": "antuma"
  },
  {
    "root": "جلس",
    "binyanId": "I",
    "tense": "past",
    "personId": "huma_m"
  },
  {
    "root": "نظر",
    "binyanId": "I",
    "tense": "present",
    "personId": "huma_f"
  }
];
