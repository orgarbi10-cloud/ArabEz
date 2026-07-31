// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py
// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.
//
// מקור: מאגר המילים הרשמי של משרד החינוך (כיתות ז'-י"ב, הפיקוח על הוראת
// ערבית, מאי 2015). VOCAB_CHAPTERS מחולק ל-6 "פרקים" (א'-ו') לפי רמת קושי
// מצטברת - לא לפי נושא. כל פרק מחולק בתוכו ל-5 "חלקים" (parts, א'-ה')
// לפי רמת קושי יחסית + הקשר/משמעות, כדי לא להעמיס מאות מילים בבת אחת -
// בלי לערבב מילים בין פרקים. VOCABULARY word.chapter/word.part מצביעים
// לתוך VOCAB_CHAPTERS[].parts[]. arabic הוא הכתיב הרגיל (ללא ניקוד, לשימוש פנימי
// בהשוואות בבוחן ובחיפוש בלבד); arabicVoc הוא הניקוד המלא כפי שסופק במקור
// (לא ניקוד ידני שלנו הפעם). translit הוא תעתיק עברי מכני אות-באות (ללא
// סימון תנועות קצרות) לפי טבלת התאמה קבועה - ראו scripts/README/היסטוריית
// השיחה לפרטי המיפוי; יכול להיות null עבור שדות ללא ערך במקור.
// שדות אופציונליים כשקיימים במקור: plural (צורת ריבוי), verbPresent (צורת
// עתיד/הווה של פועל), gender (מין דקדוקי), transitive (הפועל דורש מושא),
// response (ברכת המענה הנהוגה, למילות ברכה/נימוס).

const VOCAB_CHAPTERS = [
  {
    "num": 1,
    "title": "פרק א'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  },
  {
    "num": 2,
    "title": "פרק ב'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  },
  {
    "num": 3,
    "title": "פרק ג'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  },
  {
    "num": 4,
    "title": "פרק ד'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  },
  {
    "num": 5,
    "title": "פרק ה'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  },
  {
    "num": 6,
    "title": "פרק ו'",
    "parts": [
      {
        "num": 1,
        "title": "חלק א'"
      },
      {
        "num": 2,
        "title": "חלק ב'"
      },
      {
        "num": 3,
        "title": "חלק ג'"
      },
      {
        "num": 4,
        "title": "חלק ד'"
      },
      {
        "num": 5,
        "title": "חלק ה'"
      }
    ]
  }
];

const VOCABULARY = [
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أب",
    "arabicVoc": "أَب",
    "hebrew": "אבא",
    "translit": "אב"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أبيض",
    "arabicVoc": "أَبْيَض",
    "hebrew": "לבן",
    "translit": "אביצ׳"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "إبن",
    "arabicVoc": "إِبْن",
    "hebrew": "בן",
    "translit": "אבנ",
    "plural": "أَبْنَاء"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أخ",
    "arabicVoc": "أَخ",
    "hebrew": "אח",
    "translit": "אח׳",
    "plural": "إخْوَة"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أخت",
    "arabicVoc": "أُخْت",
    "hebrew": "אחות",
    "translit": "אח׳ת",
    "plural": "أَخَوَات"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "أديب",
    "arabicVoc": "أَدِيب",
    "hebrew": "אדיב, מנומס",
    "translit": "אדיב"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أذن",
    "arabicVoc": "أُذُن",
    "hebrew": "אוזן",
    "translit": "אד׳נ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أستاذ",
    "arabicVoc": "أُسْتَاذ",
    "hebrew": "מורה",
    "translit": "אסתאד׳",
    "plural": "أَسَاتِذَة"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "إسرائيل",
    "arabicVoc": "إِسْرَائِيل",
    "hebrew": "ישראל",
    "translit": "אסראאיל"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "إسم",
    "arabicVoc": "إِسْم",
    "hebrew": "שם",
    "translit": "אסמ",
    "plural": "أَسْمَاء"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أكل",
    "arabicVoc": "أَكَلَ",
    "hebrew": "אכל",
    "translit": "אכל",
    "verbPresent": "يَأْكُلُ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ألأردن",
    "arabicVoc": "أَلْأُرْدُنّ",
    "hebrew": "ירדן",
    "translit": "אלארדנ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "ألقرآن",
    "arabicVoc": "أَلْقُرْآن",
    "hebrew": "הקוראן",
    "translit": "אלקראנ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "إلى",
    "arabicVoc": "إِلىَ",
    "hebrew": "ל-, אל",
    "translit": "אלא"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "إلى أين",
    "arabicVoc": "إَلىَ أَيْن",
    "hebrew": "לאן?",
    "translit": "אלא אינ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أم",
    "arabicVoc": "أُمّ",
    "hebrew": "אמא",
    "translit": "אמ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أمام",
    "arabicVoc": "أَمَامَ",
    "hebrew": "מול, לפני (מקום)",
    "translit": "אמאמ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أمس",
    "arabicVoc": "أِمْس",
    "hebrew": "אתמול",
    "translit": "אמס"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أنا",
    "arabicVoc": "أَنَا",
    "hebrew": "אני",
    "translit": "אנא"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أنت",
    "arabicVoc": "أَنْتَ",
    "hebrew": "אתה",
    "translit": "אנת"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أنت",
    "arabicVoc": "أَنْتِ",
    "hebrew": "את",
    "translit": "אנת"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أنتم",
    "arabicVoc": "أَنْتُمْ",
    "hebrew": "אתם",
    "translit": "אנתמ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أنتن",
    "arabicVoc": "أَنْتنّ",
    "hebrew": "אתן",
    "translit": "אנתנ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أنف",
    "arabicVoc": "أَنْف",
    "hebrew": "אף",
    "translit": "אנפ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أهل",
    "arabicVoc": "أَهْل",
    "hebrew": "משפחה, אנשי-, בני",
    "translit": "אהל"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أهلا",
    "arabicVoc": "أَهْلاً",
    "hebrew": "שלום, ברוך הבא",
    "translit": "אהלא"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أهلا وسهلا",
    "arabicVoc": "أَهْلًا وَسَهْلًا",
    "hebrew": "ברוך הבא",
    "translit": "אהלא וסהלא",
    "response": "أَهْلًا فِيك"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أو",
    "arabicVoc": "أَوْ",
    "hebrew": "או",
    "translit": "או"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "أورشليم القدس",
    "arabicVoc": "أُورشَلِيم الْقُدْس",
    "hebrew": "ירושלים",
    "translit": "אורשלימ אלקדס"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أول",
    "arabicVoc": "أَوَّل",
    "hebrew": "ראשון",
    "translit": "אול"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "أين",
    "arabicVoc": "أَيْنَ",
    "hebrew": "היכן? איפה?",
    "translit": "אינ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "ب",
    "arabicVoc": "بِ",
    "hebrew": "ב-, באמצעות",
    "translit": "ב"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "باب",
    "arabicVoc": "بَاب",
    "hebrew": "דלת, שער",
    "translit": "באב",
    "plural": "أَبْوَاب"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "باص",
    "arabicVoc": "بَاص",
    "hebrew": "אוטובוס",
    "translit": "באצ",
    "plural": "بَاصات"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بدوي",
    "arabicVoc": "بَدَوِيّ",
    "hebrew": "בדווי, בדואי",
    "translit": "בדוי",
    "plural": "بَدْو"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بريد",
    "arabicVoc": "بَرِيد",
    "hebrew": "דואר",
    "translit": "בריד"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بعد",
    "arabicVoc": "بَعْدَ",
    "hebrew": "אחרי (זמן)",
    "translit": "בעד"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "بلاد",
    "arabicVoc": "بِلاَد",
    "hebrew": "ארץ",
    "translit": "בלאד",
    "plural": "بُلْدَان",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بلد",
    "arabicVoc": "بَلَد",
    "hebrew": "עיר, ארץ",
    "translit": "בלד",
    "plural": "بِلاَد",
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بنت",
    "arabicVoc": "بِنْت",
    "hebrew": "בת, ילדה",
    "translit": "בנת",
    "plural": "بَنَات"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "بنك",
    "arabicVoc": "بَنْك",
    "hebrew": "בנק",
    "translit": "בנכ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "بيت",
    "arabicVoc": "بَيْت",
    "hebrew": "בית",
    "translit": "בית",
    "plural": "بُيُوت"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "بيروت",
    "arabicVoc": "بَيْرُوت",
    "hebrew": "בירות (בירת לבנון)",
    "translit": "בירות"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "بين",
    "arabicVoc": "بَين",
    "hebrew": "בין",
    "translit": "בינ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "تل أبيب",
    "arabicVoc": "تَلّ أَبِيب",
    "hebrew": "תל-אביב",
    "translit": "תל אביב"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "تلميذ",
    "arabicVoc": "تِلْمِيذ",
    "hebrew": "תלמיד",
    "translit": "תלמיד׳",
    "plural": "تَلاَمِيذ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "تلميذة",
    "arabicVoc": "تِلْمِيذَة",
    "hebrew": "תלמידה",
    "translit": "תלמיד׳ה",
    "plural": "تِلْمِيذَات"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "تمرين",
    "arabicVoc": "تمرِين",
    "hebrew": "תרגיל",
    "translit": "תמרינ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "توت",
    "arabicVoc": "تُوت",
    "hebrew": "תותים",
    "translit": "תות"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "ثوب",
    "arabicVoc": "ثَوْب",
    "hebrew": "בגד",
    "translit": "ת׳וב",
    "plural": "ثِيَاب"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "جبل",
    "arabicVoc": "جَبَل",
    "hebrew": "הר",
    "translit": "ג׳בל",
    "plural": "جِبَال"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "جديد",
    "arabicVoc": "جَدِيد",
    "hebrew": "חדש",
    "translit": "ג׳דיד",
    "plural": "جُدُد"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "جلس",
    "arabicVoc": "جَلَس",
    "hebrew": "ישב",
    "translit": "ג׳לס"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "جميل",
    "arabicVoc": "جَمِيل",
    "hebrew": "יפה",
    "translit": "ג׳מיל"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "حال",
    "arabicVoc": "حَال",
    "hebrew": "מצב",
    "translit": "חאל"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "حليب",
    "arabicVoc": "حَلِيب",
    "hebrew": "חלב",
    "translit": "חליב"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "حيفا",
    "arabicVoc": "حَيْفَا",
    "hebrew": "חיפה",
    "translit": "חיפא"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "دار",
    "arabicVoc": "دَار",
    "hebrew": "בית, דירה",
    "translit": "דאר",
    "plural": "دُور",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "درزي",
    "arabicVoc": "دُرْزِيّ",
    "hebrew": "דרוזי",
    "translit": "דרזי",
    "plural": "دُرُوز"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "درس",
    "arabicVoc": "دَرَسَ",
    "hebrew": "למד",
    "translit": "דרס",
    "verbPresent": "يَدْرُسُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "دفتر",
    "arabicVoc": "دَفْترَ",
    "hebrew": "מחברת",
    "translit": "דפתר",
    "plural": "دَفَاتِر"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "دكان",
    "arabicVoc": "دُكَّان",
    "hebrew": "חנות",
    "translit": "דכאנ",
    "plural": "دَكَاكِين",
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "دكتور",
    "arabicVoc": "دُكْتُور",
    "hebrew": "דוקטור, רופא",
    "translit": "דכתור"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "دمشق",
    "arabicVoc": "دِمَشْق",
    "hebrew": "דמשק",
    "translit": "דמשק"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "دور",
    "arabicVoc": "دَوْر",
    "hebrew": "תור, תפקיד",
    "translit": "דור"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "ذهب",
    "arabicVoc": "ذَهَبَ",
    "hebrew": "הלך",
    "translit": "ד׳הב",
    "verbPresent": "يَذْهَبُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "رأس",
    "arabicVoc": "رَأْس",
    "hebrew": "ראש",
    "translit": "ראס"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "رأى",
    "arabicVoc": "رَأَى",
    "hebrew": "ראה",
    "translit": "ראא"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "رجع",
    "arabicVoc": "رَجَعَ",
    "hebrew": "חזר",
    "translit": "רג׳ע",
    "verbPresent": "يَرْجِعُ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "رجل",
    "arabicVoc": "رِجْل",
    "hebrew": "רגל",
    "translit": "רג׳ל",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "رجل",
    "arabicVoc": "رَجُل",
    "hebrew": "גבר, איש",
    "translit": "רג׳ל",
    "plural": "رِجَال"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "رفيق",
    "arabicVoc": "رَفِيق",
    "hebrew": "חבר",
    "translit": "רפיק",
    "plural": "رِفَاق"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ركب",
    "arabicVoc": "رَكِبَ",
    "hebrew": "נסע ב",
    "translit": "רכב",
    "verbPresent": "يَرْكَبُ",
    "transitive": true
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "زار",
    "arabicVoc": "زَارَ",
    "hebrew": "ביקר ב",
    "translit": "זאר",
    "verbPresent": "يَزُور",
    "transitive": true
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "زيارة",
    "arabicVoc": "زِيَارَة",
    "hebrew": "ביקור",
    "translit": "זיארה"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "زيت",
    "arabicVoc": "زَيْت",
    "hebrew": "שמן",
    "translit": "זית"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "زيتون",
    "arabicVoc": "زَيْتُون",
    "hebrew": "זיתים",
    "translit": "זיתונ",
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "ساعة",
    "arabicVoc": "سَاعَة",
    "hebrew": "שעה, שעון",
    "translit": "סאעה",
    "plural": "سَاعَات"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "سأل",
    "arabicVoc": "سَأَلَ",
    "hebrew": "שאל",
    "translit": "סאל",
    "verbPresent": "يَسْأَلُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "سكن",
    "arabicVoc": "سَكَنَ",
    "hebrew": "גר, שכן",
    "translit": "סכנ",
    "verbPresent": "يَسْكُنُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "سلام",
    "arabicVoc": "سَلاَم",
    "hebrew": "שלום",
    "translit": "סלאמ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "سنة",
    "arabicVoc": "سَنَة",
    "hebrew": "שנה",
    "translit": "סנה",
    "plural": "سَنَوات"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "سوريا",
    "arabicVoc": "سُوريَا",
    "hebrew": "סוריה",
    "translit": "סוריא"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "شرب",
    "arabicVoc": "شَرِبَ",
    "hebrew": "שתה",
    "translit": "שרב",
    "verbPresent": "يَشْرَبُ"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "شمس",
    "arabicVoc": "شَمْس",
    "hebrew": "שמש",
    "translit": "שמס"
  },
  {
    "chapter": 1,
    "part": 1,
    "arabic": "شهر",
    "arabicVoc": "شَهْر",
    "hebrew": "חודש",
    "translit": "שהר",
    "plural": "شُهُور"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "صباح",
    "arabicVoc": "صَبَاح",
    "hebrew": "בוקר",
    "translit": "צבאח"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "صباح الخير",
    "arabicVoc": "صَبَاحُ الْخَيْر",
    "hebrew": "בוקר טוב",
    "translit": "צבאח אלח׳יר",
    "response": "صَبَاحُ النُّور"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "صغير",
    "arabicVoc": "صَغِير",
    "hebrew": "קטן",
    "translit": "צע׳יר",
    "plural": "صِغَار"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "صف",
    "arabicVoc": "صَفّ",
    "hebrew": "כיתה",
    "translit": "צפ",
    "plural": "صُفُوف"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ضيف",
    "arabicVoc": "ضَيْف",
    "hebrew": "אורח",
    "translit": "צ׳יפ",
    "plural": "ضُيُوف"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "ظهر",
    "arabicVoc": "ظُهْر",
    "hebrew": "צהריים",
    "translit": "ט׳הר"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "عاصمة",
    "arabicVoc": "عَاصِمَة",
    "hebrew": "עיר בירה",
    "translit": "עאצמה",
    "plural": "عَواصِم"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "عربي",
    "arabicVoc": "عَرَبيِّ",
    "hebrew": "ערבי",
    "translit": "ערבי",
    "plural": "عَرَب"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "على",
    "arabicVoc": "عَلَى",
    "hebrew": "על",
    "translit": "עלא"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "عمان",
    "arabicVoc": "عَمَّان",
    "hebrew": "רבת-עמון (בירת ירדן)",
    "translit": "עמאנ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "عمل",
    "arabicVoc": "عَمِلَ",
    "hebrew": "עבד, עשה",
    "translit": "עמל",
    "verbPresent": "يَعْمَلُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "عند",
    "arabicVoc": "عِنْدَ",
    "hebrew": "אצל",
    "translit": "ענד"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "عين",
    "arabicVoc": "عَينْ",
    "hebrew": "עין, מעיין",
    "translit": "עינ",
    "plural": "عُيُون",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "غرفة",
    "arabicVoc": "غُرْفَة",
    "hebrew": "חדר",
    "translit": "ע׳רפה",
    "plural": "غُرَف"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "ف",
    "arabicVoc": "فَ",
    "hebrew": "ו-, ואז",
    "translit": "פ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "فتح",
    "arabicVoc": "فَتَحَ",
    "hebrew": "פתח",
    "translit": "פתח",
    "verbPresent": "يَفْتَحُ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "في",
    "arabicVoc": "فِي",
    "hebrew": "ב-, בתוך",
    "translit": "פי"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "فم",
    "arabicVoc": "فَم",
    "hebrew": "פה",
    "translit": "פמ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "قال",
    "arabicVoc": "قَالَ",
    "hebrew": "אמר",
    "translit": "קאל",
    "verbPresent": "يَقُولُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "قبل",
    "arabicVoc": "قَبْلَ",
    "hebrew": "לפני (זמן)",
    "translit": "קבל"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "قرأ",
    "arabicVoc": "قَرَأَ",
    "hebrew": "קרא",
    "translit": "קרא",
    "verbPresent": "يَقْرَأُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "قريب من",
    "arabicVoc": "قَرِيبْ مِن",
    "hebrew": "קרוב ל",
    "translit": "קריב מנ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "قليل",
    "arabicVoc": "قَلِيل",
    "hebrew": "מעט, קצת",
    "translit": "קליל"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "قهوة",
    "arabicVoc": "قَهْوَة",
    "hebrew": "קפה",
    "translit": "קהוה"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كاتب",
    "arabicVoc": "كَاتِب",
    "hebrew": "סופר, פקיד",
    "translit": "כאתב",
    "plural": "كُتَّاب"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كان",
    "arabicVoc": "كَانَ",
    "hebrew": "היה",
    "translit": "כאנ",
    "verbPresent": "يَكُونُ"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "كبير",
    "arabicVoc": "كَبِير",
    "hebrew": "גדול",
    "translit": "כביר",
    "plural": "كِبَار"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "كتاب",
    "arabicVoc": "كِتَاب",
    "hebrew": "ספר",
    "translit": "כתאב",
    "plural": "كُتُب"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كتب",
    "arabicVoc": "كَتَبَ",
    "hebrew": "כתב",
    "translit": "כתב",
    "verbPresent": "يَكْتُبُ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كثير",
    "arabicVoc": "كَثِيرَ",
    "hebrew": "רב, הרבה",
    "translit": "כת׳יר",
    "plural": "كَثِيرُون"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كل",
    "arabicVoc": "كُلّ",
    "hebrew": "כל",
    "translit": "כל"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كلب",
    "arabicVoc": "كَلْب",
    "hebrew": "כלב",
    "translit": "כלב",
    "plural": "كِلاَب"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كيف",
    "arabicVoc": "كَيْفَ",
    "hebrew": "איך",
    "translit": "כיפ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "كيف حالك",
    "arabicVoc": "كَيْفَ حَالُكَ",
    "hebrew": "מה שלומך?",
    "translit": "כיפ חאלכ",
    "response": "مَبْسُوط / مَبْسُوطَة"
  },
  {
    "chapter": 1,
    "part": 4,
    "arabic": "ل",
    "arabicVoc": "لِ",
    "hebrew": "ל",
    "translit": "ל"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "لا",
    "arabicVoc": "لَا",
    "hebrew": "לא (גם מילת שלילה להווה עתיד)",
    "translit": "לא"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "لبس",
    "arabicVoc": "لَبِسَ",
    "hebrew": "לבש",
    "translit": "לבס",
    "verbPresent": "يَلْبَسُ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "لبنان",
    "arabicVoc": "لُبْنَان",
    "hebrew": "לבנון",
    "translit": "לבנאנ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "لغة",
    "arabicVoc": "لُغَة",
    "hebrew": "שפה",
    "translit": "לע׳ה",
    "plural": "لُغَات"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "لماذا",
    "arabicVoc": "لِمَاذَا",
    "hebrew": "למה? מדוע?",
    "translit": "למאד׳א"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "لوح",
    "arabicVoc": "لَوْح",
    "hebrew": "לוח",
    "translit": "לוח"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "ليل / ليلة",
    "arabicVoc": "لَيْل / لَيْلَة",
    "hebrew": "לילה",
    "translit": "ליל / לילה"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "ما",
    "arabicVoc": "مَا",
    "hebrew": "לא (לשלילת העבר)",
    "translit": "מא"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "ما",
    "arabicVoc": "مَا",
    "hebrew": "מה? (מילת שאלה לפני שם עצם)",
    "translit": "מא"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ماذا",
    "arabicVoc": "مَاذَا",
    "hebrew": "מה? (מילת שאלה לפני פועל)",
    "translit": "מאד׳א"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "مدرسة",
    "arabicVoc": "مَدْرَسَة",
    "hebrew": "בית-ספר",
    "translit": "מדרסה",
    "plural": "مَدارِس"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "مدير",
    "arabicVoc": "مُدِير",
    "hebrew": "מנהל",
    "translit": "מדיר",
    "plural": "مُدِيرُونَ / مُدَرَاء"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مدينة",
    "arabicVoc": "مَدِينَة",
    "hebrew": "עיר",
    "translit": "מדינה",
    "plural": "مُدُن"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مرحبا",
    "arabicVoc": "مَرْحَبًا",
    "hebrew": "שלום, ברוך הבא",
    "translit": "מרחבא",
    "response": "مَرْحَبْتَيْن"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "مطبخ",
    "arabicVoc": "مَطْبَخ",
    "hebrew": "מטבח",
    "translit": "מטבח׳"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مطر",
    "arabicVoc": "مَطَر",
    "hebrew": "גשם",
    "translit": "מטר"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مع",
    "arabicVoc": "مَعَ",
    "hebrew": "עם",
    "translit": "מע"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "معلم",
    "arabicVoc": "مُعَلِّمَ",
    "hebrew": "מורה",
    "translit": "מעלמ",
    "plural": "مُعَلِّمُون"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مكة",
    "arabicVoc": "مَكَّة",
    "hebrew": "מכה",
    "translit": "מכה"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "مكتب",
    "arabicVoc": "مَكْتَب",
    "hebrew": "משרד",
    "translit": "מכתב",
    "plural": "مَكَاتِب"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "مكتوب",
    "arabicVoc": "مَكْتوب",
    "hebrew": "מכתב",
    "translit": "מכתוב",
    "plural": "مَكَاتِيب"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "ملك",
    "arabicVoc": "مَلِك",
    "hebrew": "מלך",
    "translit": "מלכ",
    "plural": "مُلُوك"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "من",
    "arabicVoc": "مِنْ",
    "hebrew": "מ-, מן",
    "translit": "מנ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "من أين",
    "arabicVoc": "مِنَ أَيْنَ",
    "hebrew": "מהיכן?",
    "translit": "מנ אינ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "من",
    "arabicVoc": "مَنْ",
    "hebrew": "מי?",
    "translit": "מנ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "نحن",
    "arabicVoc": "نَحْنُ",
    "hebrew": "אנחנו",
    "translit": "נחנ"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "نزل",
    "arabicVoc": "نَزَلَ",
    "hebrew": "ירד",
    "translit": "נזל",
    "verbPresent": "يَنْزِلُ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "نعم",
    "arabicVoc": "نَعَمْ",
    "hebrew": "כן",
    "translit": "נעמ"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "نهر",
    "arabicVoc": "نَهْر",
    "hebrew": "נהר",
    "translit": "נהר"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "هذا",
    "arabicVoc": "هٰذَا",
    "hebrew": "זה, הזה",
    "translit": "הד׳א"
  },
  {
    "chapter": 1,
    "part": 2,
    "arabic": "هذه",
    "arabicVoc": "هٰذِهِ",
    "hebrew": "זאת, הזאת",
    "translit": "הד׳ה"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هل",
    "arabicVoc": "هَلْ",
    "hebrew": "האם?",
    "translit": "הל"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هم",
    "arabicVoc": "هُمْ",
    "hebrew": "הם",
    "translit": "המ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هن",
    "arabicVoc": "هُن",
    "hebrew": "הן",
    "translit": "הנ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هنا",
    "arabicVoc": "هُنَا",
    "hebrew": "כאן",
    "translit": "הנא"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هناك",
    "arabicVoc": "هُنَاكَ",
    "hebrew": "שם",
    "translit": "הנאכ"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "هو",
    "arabicVoc": "هُوَ",
    "hebrew": "הוא",
    "translit": "הו"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "هي",
    "arabicVoc": "هِيَ",
    "hebrew": "היא",
    "translit": "הי"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "و",
    "arabicVoc": "وَ",
    "hebrew": "ו",
    "translit": "ו"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ورد",
    "arabicVoc": "وَرْد",
    "hebrew": "פרחים, ורדים",
    "translit": "ורד"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "وزير",
    "arabicVoc": "وَزِير",
    "hebrew": "שר",
    "translit": "וזיר",
    "plural": "وُزَرَاء"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "وصل",
    "arabicVoc": "وَصَلَ",
    "hebrew": "הגיע, בא",
    "translit": "וצל"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "ولد",
    "arabicVoc": "وَلَد",
    "hebrew": "ילד",
    "translit": "ולד",
    "plural": "أَوْلاد"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "يا",
    "arabicVoc": "يَا",
    "hebrew": "הוי (מילת קריאה, פנייה)",
    "translit": "יא"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "يافا",
    "arabicVoc": "يَافَا",
    "hebrew": "יפו",
    "translit": "יאפא"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "يد",
    "arabicVoc": "يَد",
    "hebrew": "יד",
    "translit": "יד",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "part": 5,
    "arabic": "يهودي",
    "arabicVoc": "يَهُودِيّ",
    "hebrew": "יהודי",
    "translit": "יהודי",
    "plural": "يَهُود"
  },
  {
    "chapter": 1,
    "part": 3,
    "arabic": "يوم",
    "arabicVoc": "يَوْم",
    "hebrew": "יום",
    "translit": "יומ",
    "plural": "أَيَّام"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أخذ",
    "arabicVoc": "أَخَذَ",
    "hebrew": "לקח",
    "translit": "אח׳ד׳",
    "verbPresent": "يَأْخُذُ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أخير",
    "arabicVoc": "أَخِير",
    "hebrew": "אחרון",
    "translit": "אח׳יר"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أراد",
    "arabicVoc": "أَرَادَ",
    "hebrew": "רצה",
    "translit": "אראד",
    "verbPresent": "يُرِيدُ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أرض",
    "arabicVoc": "أَرْض",
    "hebrew": "אדמה, ארץ",
    "translit": "ארצ׳",
    "plural": "أَرَاضِي",
    "gender": "נקבה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "أركان ٱلإسلام",
    "arabicVoc": "أَرْكَان ٱلْإِسْلاَم",
    "hebrew": "עמודי האסלאם, מצוות היסוד של האסלאם",
    "translit": "ארכאנ אלאסלאמ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أريحا",
    "arabicVoc": "أَرِيحَا",
    "hebrew": "יריחו",
    "translit": "אריחא"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أسبوع",
    "arabicVoc": "أُسْبُوع",
    "hebrew": "שבוע",
    "translit": "אסבוע",
    "plural": "أَسَابِيع"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "ألإسلام",
    "arabicVoc": "أَلْإِسْلاَم",
    "hebrew": "אסלאם",
    "translit": "אלאסלאמ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألجليل",
    "arabicVoc": "أَلْجَلِيل",
    "hebrew": "הגליל",
    "translit": "אלג׳ליל"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألحج",
    "arabicVoc": "أَلْحَجّ",
    "hebrew": "העלייה לרגל (ממצוות היסוד באסלאם)",
    "translit": "אלחג׳"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألحمد لله",
    "arabicVoc": "أَلْحَمْدُ لِلّٰه",
    "hebrew": "השבח לאל, תודה לאל",
    "translit": "אלחמד ללה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألزكاة",
    "arabicVoc": "أَلزَّكَاة",
    "hebrew": "הצדקה (ממצוות היסוד באסלאם)",
    "translit": "אלזכאה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألشهادة",
    "arabicVoc": "أَلشَّهَادَة",
    "hebrew": "העדות (ממצוות היסוד באסלאם)",
    "translit": "אלשהאדה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألصلاة",
    "arabicVoc": "أَلصَّلاَة",
    "hebrew": "התפילה (ממצוות היסוד באסלאם)",
    "translit": "אלצלאה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألصوم",
    "arabicVoc": "أَلصَّوْم",
    "hebrew": "הצום (ממצוות היסוד באסלאם)",
    "translit": "אלצומ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألعراق",
    "arabicVoc": "أَلْعِرَاق",
    "hebrew": "עיראק",
    "translit": "אלעראק"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألقادم",
    "arabicVoc": "ألْقَادِم",
    "hebrew": "הבא",
    "translit": "אלקאדמ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألقاهرة",
    "arabicVoc": "أَلْقَاهِرَة",
    "hebrew": "קהיר",
    "translit": "אלקאהרה"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "ألكعبة",
    "arabicVoc": "أَلْكَعْبَة",
    "hebrew": "הכעבה (במכה)",
    "translit": "אלכעבה"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألكويت",
    "arabicVoc": "أَلْكُوَيْت",
    "hebrew": "כווית",
    "translit": "אלכוית"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "أالله",
    "arabicVoc": "أَالله",
    "hebrew": "אללה",
    "translit": "אאללה"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "ألماضي",
    "arabicVoc": "أَلْمَاضِي",
    "hebrew": "שעבר (יום, שבוע וכד')",
    "translit": "אלמאצ׳י"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ألمملكة ٱلعربية ٱلسعودية",
    "arabicVoc": "أَلْمَمْلَكة ٱلْعَرَبِيّة ٱلسُّعُودِيّة",
    "hebrew": "ערב הסעודית",
    "translit": "אלממלכה אלערביה אלסעודיה"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أليابان",
    "arabicVoc": "أَلْيَابَان",
    "hebrew": "יפן",
    "translit": "אליאבאנ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "أمر",
    "arabicVoc": "أَمَرَ",
    "hebrew": "ציווה",
    "translit": "אמר",
    "verbPresent": "يَأْمُرُ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "أمس ٱلأول",
    "arabicVoc": "أَمْسِ ٱلْأَوَّل",
    "hebrew": "שלשום",
    "translit": "אמס אלאול"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "أمير",
    "arabicVoc": "أَمِير",
    "hebrew": "נסיך",
    "translit": "אמיר"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أميركا",
    "arabicVoc": "أَمِيركَا",
    "hebrew": "אמריקה",
    "translit": "אמירכא"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "إنسان",
    "arabicVoc": "إِنْسَان",
    "hebrew": "בן-אדם, איש",
    "translit": "אנסאנ",
    "plural": "نَاس"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أوروبا",
    "arabicVoc": "أُورُوبَّا",
    "hebrew": "אירופה",
    "translit": "אורובא"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "أولى أول",
    "arabicVoc": "أُولى أَوَّل",
    "hebrew": "ראשונה (- ראשון)",
    "translit": "אולא אול"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "أي",
    "arabicVoc": "أَيّ",
    "hebrew": "איזה",
    "translit": "אי"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "إيران",
    "arabicVoc": "إِيرَان",
    "hebrew": "איראן",
    "translit": "איראנ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "أيضا",
    "arabicVoc": "أَيْضًا",
    "hebrew": "גם כן",
    "translit": "איצ׳א"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "باريس",
    "arabicVoc": "بَارِيس",
    "hebrew": "פריס",
    "translit": "באריס"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "بحر",
    "arabicVoc": "بَحْر",
    "hebrew": "ים",
    "translit": "בחר",
    "plural": "بحِار بحو ر"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بدأ",
    "arabicVoc": "بَدَأَ",
    "hebrew": "התחיל",
    "translit": "בדא",
    "verbPresent": "يَبْدَأُ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بريطانيا",
    "arabicVoc": "بَرِيطَانِيَا",
    "hebrew": "בריטניה",
    "translit": "בריטאניא"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بستان",
    "arabicVoc": "بُسْتَان",
    "hebrew": "גן",
    "translit": "בסתאנ",
    "plural": "بَسَاتِين"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بصل",
    "arabicVoc": "بَصَل",
    "hebrew": "בצל",
    "translit": "בצל"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بعد الظهر",
    "arabicVoc": "بَعْدَ الظُّهْر",
    "hebrew": "אחר הצהרים",
    "translit": "בעד אלט׳הר"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بعيد عن",
    "arabicVoc": "بَعِيدْ عَن",
    "hebrew": "רחוק מ",
    "translit": "בעיד ענ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بغداد",
    "arabicVoc": "بَغْدَاد",
    "hebrew": "בגדאד (בירת עיראק)",
    "translit": "בע׳דאד"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "بلدية",
    "arabicVoc": "بَلَدِيَّة",
    "hebrew": "עירייה",
    "translit": "בלדיה"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "بنى",
    "arabicVoc": "بَنَى",
    "hebrew": "בנה",
    "translit": "בנא",
    "verbPresent": "يَبْنِي"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "تحت",
    "arabicVoc": "تَحْتَ",
    "hebrew": "תחת, מתחת ל",
    "translit": "תחת"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "ترك",
    "arabicVoc": "تَرَكَ",
    "hebrew": "עזב, השאיר",
    "translit": "תרכ",
    "verbPresent": "يَتْرُكُ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "تعبان",
    "arabicVoc": "تَعْبَان",
    "hebrew": "עייף",
    "translit": "תעבאנ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "تلفزيون",
    "arabicVoc": "تِلِفِزْيُون",
    "hebrew": "טלוויזיה",
    "translit": "תלפזיונ",
    "plural": "تِلِفِزْيُونات"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "تلفون",
    "arabicVoc": "تِلِفُون",
    "hebrew": "טלפון",
    "translit": "תלפונ",
    "plural": "تِلِفُونات"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "تلك",
    "arabicVoc": "تِلْكَ",
    "hebrew": "ההיא",
    "translit": "תלכ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "ثم",
    "arabicVoc": "ثمّ",
    "hebrew": "אחר כך",
    "translit": "ת׳מ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "جار",
    "arabicVoc": "جَار",
    "hebrew": "שכן",
    "translit": "ג׳אר",
    "plural": "جِيرَان"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "جد",
    "arabicVoc": "جَدّ",
    "hebrew": "סב",
    "translit": "ג׳ד",
    "plural": "أَجْدَاد"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "جدة",
    "arabicVoc": "جَدَّة",
    "hebrew": "סבתא",
    "translit": "ג׳דה",
    "plural": "جَدَّات"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "جدا",
    "arabicVoc": "جِدًّا",
    "hebrew": "מאוד",
    "translit": "ג׳דא"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "جملة",
    "arabicVoc": "جُمْلة",
    "hebrew": "משפט",
    "translit": "ג׳מלה",
    "plural": "جُمَل"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "جنوب",
    "arabicVoc": "جَنُوب",
    "hebrew": "דרום",
    "translit": "ג׳נוב"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "جنوبي",
    "arabicVoc": "جَنُوبي",
    "hebrew": "דרומי",
    "translit": "ג׳נובי"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "جواب",
    "arabicVoc": "جَوَاب",
    "hebrew": "תשובה",
    "translit": "ג׳ואב",
    "plural": "أَجْوِبَة"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "حاسوب",
    "arabicVoc": "حَاسُوب",
    "hebrew": "מחשב",
    "translit": "חאסוב",
    "plural": "حَوَاسِيب"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "حفلة",
    "arabicVoc": "حَفْلَة",
    "hebrew": "מסיבה, חגיגה",
    "translit": "חפלה",
    "plural": "حَفَلاَت"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "حكاية",
    "arabicVoc": "حِكَايَة",
    "hebrew": "סיפור",
    "translit": "חכאיה",
    "plural": "حِكَايَات"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "حكومة",
    "arabicVoc": "حُكُومَة",
    "hebrew": "ממשלה",
    "translit": "חכומה",
    "plural": "حُكُومَات"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "خال",
    "arabicVoc": "خَال",
    "hebrew": "דוד (מצד האם)",
    "translit": "ח׳אל",
    "plural": "أَخْوَال"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "خرج",
    "arabicVoc": "خَرَجَ",
    "hebrew": "יצא",
    "translit": "ח׳רג׳",
    "verbPresent": "يَخْرُجُ"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "خلال",
    "arabicVoc": "خِلاَلَ",
    "hebrew": "במשך, תוך (זמן)",
    "translit": "ח׳לאל"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "دخل",
    "arabicVoc": "دَخَلَ",
    "hebrew": "נכנס",
    "translit": "דח׳ל",
    "verbPresent": "يَدْخُلُ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "درس",
    "arabicVoc": "دَرْس",
    "hebrew": "שיעור",
    "translit": "דרס",
    "plural": "دُرُوس"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "دمشق",
    "arabicVoc": "دِمَشْق",
    "hebrew": "דמשק (בירת סוריה)",
    "translit": "דמשק"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "دولة",
    "arabicVoc": "دَوْلَة",
    "hebrew": "מדינה",
    "translit": "דולה",
    "plural": "دُوَل"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "دين",
    "arabicVoc": "دِين",
    "hebrew": "דת",
    "translit": "דינ",
    "plural": "أَدْيَان"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "ההוא",
    "translit": "ד׳לכ"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "رئيس",
    "arabicVoc": "رَئِيس",
    "hebrew": "נשיא, ראש",
    "translit": "ראיס",
    "plural": "رُؤَسَاء"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "رئيس الحكومة",
    "arabicVoc": "رَئِيس الْحُكُومَة",
    "hebrew": "ראש הממשלה",
    "translit": "ראיס אלחכומה"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "رسالة",
    "arabicVoc": "رِسَالَة",
    "hebrew": "איגרת, מכתב",
    "translit": "רסאלה",
    "plural": "رَسَائِل"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "رمضان",
    "arabicVoc": "رَمَضَان",
    "hebrew": "רמצ'אן",
    "translit": "רמצ׳אנ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "زرع",
    "arabicVoc": "زَرَعَ",
    "hebrew": "זרע",
    "translit": "זרע",
    "verbPresent": "يُزْرَعَ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "زمان",
    "arabicVoc": "زَمَان",
    "hebrew": "זמן",
    "translit": "זמאנ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "سؤال",
    "arabicVoc": "سُؤَال",
    "hebrew": "שאלה",
    "translit": "סאאל",
    "plural": "أَسْئِلَة"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "سافر",
    "arabicVoc": "سَافَرَ",
    "hebrew": "נסע",
    "translit": "סאפר"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "سمع",
    "arabicVoc": "سَمَِع",
    "hebrew": "שמע",
    "translit": "סמע",
    "verbPresent": "يَسْمَعُ"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "سورة",
    "arabicVoc": "سُورَة",
    "hebrew": "סורה (פרק, פרשה בקוראן)",
    "translit": "סורה",
    "plural": "سُوَر"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "سوق",
    "arabicVoc": "سُوق",
    "hebrew": "זו\"נ – שוק",
    "translit": "סוק",
    "plural": "أَسْوَاق",
    "gender": "נקבה"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شارع",
    "arabicVoc": "شَارِع",
    "hebrew": "רחוב",
    "translit": "שארע",
    "plural": "شَوَارِع"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شباك",
    "arabicVoc": "شُبَّاك",
    "hebrew": "חלון",
    "translit": "שבאכ",
    "plural": "شَبَابِيك"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شتاء",
    "arabicVoc": "شِتَاء",
    "hebrew": "חורף",
    "translit": "שתאא"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شجرة",
    "arabicVoc": "شَجَرَة",
    "hebrew": "עץ",
    "translit": "שג׳רה",
    "plural": "أَشْجَار"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "شرق",
    "arabicVoc": "شَرْق",
    "hebrew": "מזרח",
    "translit": "שרק"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "شرقي",
    "arabicVoc": "شَرْقِيّ",
    "hebrew": "מזרחי",
    "translit": "שרקי"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شكرا على",
    "arabicVoc": "شُكْرًا عَلَى",
    "hebrew": "תודה על",
    "translit": "שכרא עלא",
    "response": "عَفْوًا"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "شمال",
    "arabicVoc": "شَمَال",
    "hebrew": "צפון, שמאל",
    "translit": "שמאל"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "شمالي",
    "arabicVoc": "شّمََالي",
    "hebrew": "צפוני, שמאלי",
    "translit": "שמאלי"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "شيخ",
    "arabicVoc": "شَيْخ",
    "hebrew": "שיח', זקן",
    "translit": "שיח׳"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "صيف",
    "arabicVoc": "صَيْف",
    "hebrew": "קיץ",
    "translit": "ציפ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "ضحك",
    "arabicVoc": "ضَحِكَ",
    "hebrew": "צחק",
    "translit": "צ׳חכ",
    "verbPresent": "يَضْحَكُ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "طاولة",
    "arabicVoc": "طَاوِلَة",
    "hebrew": "שולחן",
    "translit": "טאולה",
    "plural": "طَاوِلَات"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "طبيب",
    "arabicVoc": "طَبِيب",
    "hebrew": "רופא",
    "translit": "טביב",
    "plural": "أَطِبَّاء"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "طريق",
    "arabicVoc": "طَريق",
    "hebrew": "דרך, כביש",
    "translit": "טריק",
    "plural": "طُرُق"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "طلب",
    "arabicVoc": "طَلَبَ",
    "hebrew": "ביקש",
    "translit": "טלב",
    "verbPresent": "يَطْلُبُ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "طويل",
    "arabicVoc": "طَوِيل",
    "hebrew": "ארוך, גבוה",
    "translit": "טויל"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "طيب",
    "arabicVoc": "طَيِّب",
    "hebrew": "טוב",
    "translit": "טיב"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "عائلة",
    "arabicVoc": "عائِلَة",
    "hebrew": "משפחה",
    "translit": "עאאלה",
    "plural": "عائِلَات"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عرف",
    "arabicVoc": "عَرَفَ",
    "hebrew": "ידע, הכיר",
    "translit": "ערפ",
    "verbPresent": "يَعْرِفُ"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عسل",
    "arabicVoc": "عَسَل",
    "hebrew": "דבש",
    "translit": "עסל"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عطلة",
    "arabicVoc": "عُطْلَة",
    "hebrew": "חופשה",
    "translit": "עטלה",
    "plural": "عُطْلَات"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عكا",
    "arabicVoc": "عَكَّا",
    "hebrew": "עכו",
    "translit": "עכא"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عم",
    "arabicVoc": "عَمّ",
    "hebrew": "דוד (מצד האב)",
    "translit": "עמ",
    "plural": "أَعْمَام"
  },
  {
    "chapter": 2,
    "part": 3,
    "arabic": "عمل",
    "arabicVoc": "عَمَل",
    "hebrew": "עבודה",
    "translit": "עמל",
    "plural": "أَعْمَال"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "عن",
    "arabicVoc": "عَنْ",
    "hebrew": "על, אודות",
    "translit": "ענ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "عندما",
    "arabicVoc": "عِنْدَمَا",
    "hebrew": "כאשר",
    "translit": "ענדמא"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "عنوان",
    "arabicVoc": "عُنْوَان",
    "hebrew": "כתובת, כותרת",
    "translit": "ענואנ",
    "plural": "عَنَاوِين"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "عيد",
    "arabicVoc": "عِيد",
    "hebrew": "חג",
    "translit": "עיד",
    "plural": "أَعْيَاد"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "عيد الأضحى",
    "arabicVoc": "عِيدُ الْأَضْحَى",
    "hebrew": "חג הקרבן (באסלאם)",
    "translit": "עיד אלאצ׳חא"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "عيد الفطر",
    "arabicVoc": "عِيدُ الْفِطْر",
    "hebrew": "חג הפסקת הצום (באסלאם)",
    "translit": "עיד אלפטר"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "عيد ميلاد",
    "arabicVoc": "عِيد مِيلاَد",
    "hebrew": "יום הולדת",
    "translit": "עיד מילאד"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "غدا",
    "arabicVoc": "غَدًا",
    "hebrew": "מחר",
    "translit": "ע׳דא"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "غرب",
    "arabicVoc": "غَرْب",
    "hebrew": "מערב",
    "translit": "ע׳רב"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "غربي",
    "arabicVoc": "غَرْبيّ",
    "hebrew": "מערבי",
    "translit": "ע׳רבי"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "فرنسا",
    "arabicVoc": "فَرَنْسَا",
    "hebrew": "צרפת",
    "translit": "פרנסא"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "فلاح",
    "arabicVoc": "فَلاَّح",
    "hebrew": "איכר",
    "translit": "פלאח",
    "plural": "فَلاَّحُونَ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "فندق",
    "arabicVoc": "فُنْدُق",
    "hebrew": "בית מלון, פונדק",
    "translit": "פנדק",
    "plural": "فَنادِق"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "فهم",
    "arabicVoc": "فَهِمَ",
    "hebrew": "הבין",
    "translit": "פהמ",
    "verbPresent": "يَفْهَمُ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "فوق",
    "arabicVoc": "فَوْقَ",
    "hebrew": "על, מעל",
    "translit": "פוק"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "فيلم",
    "arabicVoc": "فِيلم",
    "hebrew": "סרט",
    "translit": "פילמ",
    "plural": "أَفْلام"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "قام",
    "arabicVoc": "قَامَ",
    "hebrew": "קם",
    "translit": "קאמ",
    "verbPresent": "يَقُومُ"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "قام ب",
    "arabicVoc": "قَامَ بِ",
    "hebrew": "עסק ב-, ערך",
    "translit": "קאמ ב",
    "verbPresent": "يَقُومُ بِ"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "قام بزيارة",
    "arabicVoc": "قَامَ بِزِيَارَة",
    "hebrew": "ערך ביקור)",
    "translit": "קאמ בזיארה"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "قد",
    "arabicVoc": "قَدْ",
    "hebrew": "כבר (מילית להדגשת העבר)",
    "translit": "קד"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "قدم",
    "arabicVoc": "قَدِمَ",
    "hebrew": "בא",
    "translit": "קדמ",
    "verbPresent": "يَقْدَمُ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "قديم",
    "arabicVoc": "قَدِيم",
    "hebrew": "ישן, עתיק, קדום",
    "translit": "קדימ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "قرية",
    "arabicVoc": "قَرْيَة",
    "hebrew": "כפר",
    "translit": "קריה",
    "plural": "قُرَى قُرًى"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "قصة",
    "arabicVoc": "قِصَّة",
    "hebrew": "סיפור",
    "translit": "קצה",
    "plural": "قِصَص"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "قصير",
    "arabicVoc": "قَصِير",
    "hebrew": "קצר, נמוך",
    "translit": "קציר"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "قلم",
    "arabicVoc": "قَلَم",
    "hebrew": "עט",
    "translit": "קלמ",
    "plural": "أَقْلام"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "كرسي",
    "arabicVoc": "كُرْسِيٍّ",
    "hebrew": "כיסא",
    "translit": "כרסי",
    "plural": "كَرَاسِي كَرَاس"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "كلام",
    "arabicVoc": "كَلام",
    "hebrew": "דיבור, דברים",
    "translit": "כלאמ",
    "gender": "זכר"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "لندن",
    "arabicVoc": "لَنْدَن",
    "hebrew": "לונדון",
    "translit": "לנדנ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مبروك على",
    "arabicVoc": "مَبْرُوك عَلَى",
    "hebrew": "מזל טוב, תתחדש",
    "translit": "מברוכ עלא",
    "response": "اللهُ يُبَارِكْ فِيكَ"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "متى",
    "arabicVoc": "مَتىَ",
    "hebrew": "מתי?",
    "translit": "מתא"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مركز",
    "arabicVoc": "مَرْكَز",
    "hebrew": "מרכז",
    "translit": "מרכז",
    "plural": "مَرَاكِز"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "مركزي",
    "arabicVoc": "مَرْكَزِيّ",
    "hebrew": "מרכזי",
    "translit": "מרכזי"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مريض",
    "arabicVoc": "مَرِيض",
    "hebrew": "חולה",
    "translit": "מריצ׳",
    "plural": "مَرْضَى"
  },
  {
    "chapter": 2,
    "part": 1,
    "arabic": "مساء",
    "arabicVoc": "مَسَاء",
    "hebrew": "ערב",
    "translit": "מסאא"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "مساء الخير",
    "arabicVoc": "مَسَاءُ الْخَير",
    "hebrew": "ערב טוב",
    "translit": "מסאא אלח׳יר",
    "response": "مَسَاءُ النُّور"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "مسجد",
    "arabicVoc": "مَسْجِد",
    "hebrew": "מסגד",
    "translit": "מסג׳ד",
    "plural": "مَسَاجِد"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "مسلم",
    "arabicVoc": "مُسْلِم",
    "hebrew": "מוסלמי",
    "translit": "מסלמ",
    "plural": "مُسْلِمُوَن"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "مسيحي",
    "arabicVoc": "مَسِيحِيَّ",
    "hebrew": "נוצרי",
    "translit": "מסיחי",
    "plural": "مَسِيحِيُّون"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مصر",
    "arabicVoc": "مِصْر",
    "hebrew": "מצרים",
    "translit": "מצר"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مكان",
    "arabicVoc": "مَكَان",
    "hebrew": "מקום",
    "translit": "מכאנ",
    "plural": "أَمَاكِن"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "مكتبة",
    "arabicVoc": "مَكْتَبَة",
    "hebrew": "ספרייה, מכתבה",
    "translit": "מכתבה",
    "plural": "مَكْتَبَات"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "ممتاز",
    "arabicVoc": "مُمْتَاز",
    "hebrew": "מצוין",
    "translit": "ממתאז"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "نبي",
    "arabicVoc": "نَبيِّ",
    "hebrew": "נביא",
    "translit": "נבי",
    "plural": "أنْبِيَاء"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "هؤلاء",
    "arabicVoc": "هٰؤُلاءِ",
    "hebrew": "אלה, האלה",
    "translit": "האלאא"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "والد",
    "arabicVoc": "وَالِد",
    "hebrew": "אב, הורה",
    "translit": "ואלד"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "والدة",
    "arabicVoc": "وَالِدَة",
    "hebrew": "אם",
    "translit": "ואלדה"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "وراء",
    "arabicVoc": "وَراءَ",
    "hebrew": "מאחורי (מקום)",
    "translit": "וראא"
  },
  {
    "chapter": 2,
    "part": 5,
    "arabic": "وظيفة",
    "arabicVoc": "وَظِيفَة",
    "hebrew": "מטלה, תפקיד, משרה",
    "translit": "וט׳יפה"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "وقف",
    "arabicVoc": "وَقَفَ",
    "hebrew": "עמד",
    "translit": "וקפ",
    "verbPresent": "يَقِفُ"
  },
  {
    "chapter": 2,
    "part": 2,
    "arabic": "يمين",
    "arabicVoc": "يَمِين",
    "hebrew": "ימין",
    "translit": "ימינ"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "يوم ٱلأحد",
    "arabicVoc": "يَوْم ٱلْأَحَد",
    "hebrew": "יום ראשון",
    "translit": "יומ אלאחד"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "يوم ٱلجمعة",
    "arabicVoc": "يَوْم ٱلْجُمْعَة",
    "hebrew": "יום שישי",
    "translit": "יומ אלג׳מעה"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "يوم ٱلخميس",
    "arabicVoc": "يَوْم ٱلْخَمِيس",
    "hebrew": "יום חמישי",
    "translit": "יומ אלח׳מיס"
  },
  {
    "chapter": 2,
    "part": 4,
    "arabic": "يوم ٱلسبت",
    "arabicVoc": "يَوْم ٱلسَّبْت",
    "hebrew": "יום שבת",
    "translit": "יומ אלסבת"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "إتفاق",
    "arabicVoc": "إِتِّفَاق",
    "hebrew": "הסכם",
    "translit": "אתפאק",
    "plural": "إِتِّفَاقات"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "إجتماع",
    "arabicVoc": "إجْتِمَاع",
    "hebrew": "פגישה, כינוס",
    "translit": "אג׳תמאע"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "إجتمعب مع",
    "arabicVoc": "إَجْتَمَعَبِ مَع",
    "hebrew": "נפגש עם",
    "translit": "אג׳תמעב מע"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "أحب",
    "arabicVoc": "أَحَبَّ",
    "hebrew": "אהב, רצה",
    "translit": "אחב",
    "verbPresent": "يُحِبُّ"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أحمر",
    "arabicVoc": "أَحْمَر",
    "hebrew": "אדום",
    "translit": "אחמר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أخضر",
    "arabicVoc": "أَخْضَر",
    "hebrew": "ירוק",
    "translit": "אח׳צ׳ר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أربع / ة",
    "arabicVoc": "أَرْبَع / ة",
    "hebrew": "ארבע/ה",
    "translit": "ארבע / ה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أزرق",
    "arabicVoc": "أَزْرَق",
    "hebrew": "כחול",
    "translit": "אזרק"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "إستغرق",
    "arabicVoc": "إِسْتَغْرَقَ",
    "hebrew": "נמשך, ארך",
    "translit": "אסתע׳רק"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إستراحة",
    "arabicVoc": "إِسْترَِاحَة",
    "hebrew": "הפסקה",
    "translit": "אסתראחה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "إستقبل",
    "arabicVoc": "إِسْتَقْبَلَ",
    "hebrew": "קיבל את פני",
    "translit": "אסתקבל"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إستمع إلى",
    "arabicVoc": "إِسْتَمَعََ إلى",
    "hebrew": "הקשיב ל...",
    "translit": "אסתמע אלא"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أسود",
    "arabicVoc": "أَسْوَد",
    "hebrew": "שחור",
    "translit": "אסוד"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "إشترك",
    "arabicVoc": "إِشْتَرَكَ",
    "hebrew": "השתתף",
    "translit": "אשתרכ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "أصغر",
    "arabicVoc": "أَصْغَر",
    "hebrew": "יותר קטן",
    "translit": "אצע׳ר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "أصفر",
    "arabicVoc": "أَصْفَر",
    "hebrew": "צהוב",
    "translit": "אצפר"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إفريقيا",
    "arabicVoc": "إِفْرِيقِيَا",
    "hebrew": "אפריקה",
    "translit": "אפריקיא"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "أكبر",
    "arabicVoc": "أَكْبرَ",
    "hebrew": "יותר גדול",
    "translit": "אכבר"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "ألأمم ٱلمتحدة",
    "arabicVoc": "ألْأُمَم ٱلْمُتَّحِدَة",
    "hebrew": "האו\"ם",
    "translit": "אלאממ אלמתחדה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألتي",
    "arabicVoc": "أَلَّتي",
    "hebrew": "אשר (היא)",
    "translit": "אלתי",
    "gender": "נקבה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "ألخليل",
    "arabicVoc": "أَلْخَلِيل",
    "hebrew": "חברון",
    "translit": "אלח׳ליל"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألذي",
    "arabicVoc": "أَلَّذِي",
    "hebrew": "אשר (הוא)",
    "translit": "אלד׳י"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألذين",
    "arabicVoc": "أَلَّذِينَ",
    "hebrew": "אשר (הם)",
    "translit": "אלד׳ינ"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألشرق ٱلأوسط",
    "arabicVoc": "أَلشَّرْق ٱلْأَوْسَط",
    "hebrew": "המזרח התיכון",
    "translit": "אלשרק אלאוסט"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألضفة ٱلغربية",
    "arabicVoc": "أَلضِّفَّة ٱلْغَرْبِيَّة",
    "hebrew": "הגדה המערבית",
    "translit": "אלצ׳פה אלע׳רביה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "أللواتي",
    "arabicVoc": "أَللّوَاتيِ",
    "hebrew": "אשר (הן)",
    "translit": "אללואתי"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "ألمانيا",
    "arabicVoc": "أَلْمَانياَ",
    "hebrew": "גרמניה",
    "translit": "אלמאניא"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "ألناصرة",
    "arabicVoc": "ألنَّاصِرَة",
    "hebrew": "נצרת",
    "translit": "אלנאצרה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ألولايات ٱلمتحدة",
    "arabicVoc": "أَلْوِلاَيات ٱلْمُتَّحِدَة",
    "hebrew": "ארה\"ב",
    "translit": "אלולאיאת אלמתחדה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "أما ف",
    "arabicVoc": "أَمَّا فَ",
    "hebrew": "באשר ל- הרי",
    "translit": "אמא פ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إمتحان",
    "arabicVoc": "إِمْتِحَان",
    "hebrew": "מבחן",
    "translit": "אמתחאנ",
    "plural": "إِمْتِحَانات"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "إمرأة",
    "arabicVoc": "إِمْرَأَة",
    "hebrew": "אישה",
    "translit": "אמראה",
    "plural": "نِسَاء"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إنتخب",
    "arabicVoc": "إَنْتَخَب",
    "hebrew": "בחר",
    "translit": "אנתח׳ב"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "إنتظر",
    "arabicVoc": "إَنْتَظَر",
    "hebrew": "חיכה",
    "translit": "אנתט׳ר"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "بٱلقرب من",
    "arabicVoc": "بِٱلْقُرْبْ مِن",
    "hebrew": "בקרבת",
    "translit": "באלקרב מנ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "بداية",
    "arabicVoc": "بِدَايَة",
    "hebrew": "התחלה",
    "translit": "בדאיה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "برنامج",
    "arabicVoc": "بَرْنَامَج",
    "hebrew": "תכנית",
    "translit": "ברנאמג׳",
    "plural": "بَرَامِج"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "بقي",
    "arabicVoc": "بَقِي",
    "hebrew": "נשאר",
    "translit": "בקי",
    "verbPresent": "يَبْقَى"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "بكى",
    "arabicVoc": "بَكَى",
    "hebrew": "בכה",
    "translit": "בכא",
    "verbPresent": "يَبْكِي"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تاجر",
    "arabicVoc": "تَاجِر",
    "hebrew": "סוחר",
    "translit": "תאג׳ר",
    "plural": "تُجَّار"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تأريخ",
    "arabicVoc": "تَأرِيخْ",
    "hebrew": "היסטוריה, תאריך",
    "translit": "תאריח׳"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تجارة",
    "arabicVoc": "تِجَارَة",
    "hebrew": "מסחר",
    "translit": "תג׳ארה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "تسع / ة",
    "arabicVoc": "تِسْع / ة",
    "hebrew": "תשע/ה",
    "translit": "תסע / ה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "تفضل / تفضلي",
    "arabicVoc": "تَفَضَّلْ / تَفَضَّلي",
    "hebrew": "בבקשה! התכבד/י!",
    "translit": "תפצ׳ל / תפצ׳לי"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ثلاث / ة",
    "arabicVoc": "ثَلاث / ة",
    "hebrew": "שלוש/ה",
    "translit": "ת׳לאת׳ / ה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ثمان",
    "arabicVoc": "ثَمَانٍ",
    "hebrew": "שמונה",
    "translit": "ת׳מאנ"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ثمانية",
    "arabicVoc": "ثَمَانِيَة",
    "hebrew": "שמונה",
    "translit": "ת׳מאניה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "جاء",
    "arabicVoc": "جَاءَ",
    "hebrew": "בא",
    "translit": "ג׳אא"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "جامعة",
    "arabicVoc": "جَامِعَة",
    "hebrew": "אוניברסיטה",
    "translit": "ג׳אמעה",
    "plural": "جَامِعَات"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "ألجامعة العربية",
    "arabicVoc": "أَلْجَامِعَة الْعَرَبِيَّة",
    "hebrew": "הליגה הערבית)",
    "translit": "אלג׳אמעה אלערביה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "جريدة",
    "arabicVoc": "جَرِيدَة",
    "hebrew": "עיתון",
    "translit": "ג׳רידה",
    "plural": "جَرَائِد"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "جلسة",
    "arabicVoc": "جَلْسَة",
    "hebrew": "ישיבה",
    "translit": "ג׳לסה",
    "plural": "جَلَسَات"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "حرب",
    "arabicVoc": "حَرْب",
    "hebrew": "מלחמה",
    "translit": "חרב",
    "plural": "حُرُوب"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "حزب",
    "arabicVoc": "حِزْب",
    "hebrew": "מפלגה",
    "translit": "חזב",
    "plural": "أَحْزَاب"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "حضر",
    "arabicVoc": "حَضَّرَ",
    "hebrew": "הכין",
    "translit": "חצ׳ר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "حمام",
    "arabicVoc": "حَمَّام",
    "hebrew": "אמבטיה, מקלחת",
    "translit": "חמאמ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "خارطة خريطة",
    "arabicVoc": "خَارِطَة خَرِيطَة",
    "hebrew": "מפה",
    "translit": "ח׳ארטה ח׳ריטה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "خبز",
    "arabicVoc": "خُبْز",
    "hebrew": "לחם",
    "translit": "ח׳בז"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "خليج",
    "arabicVoc": "خَلِيج",
    "hebrew": "מפרץ",
    "translit": "ח׳ליג׳"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "خمس / ة",
    "arabicVoc": "خَمْس / ة",
    "hebrew": "חמש/ה",
    "translit": "ח׳מס / ה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "ذكر",
    "arabicVoc": "ذَكَرَ",
    "hebrew": "זכר, ציין",
    "translit": "ד׳כר",
    "verbPresent": "يَذْكُرُ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "راكب",
    "arabicVoc": "رَاكِب",
    "hebrew": "נוסע",
    "translit": "ראכב",
    "plural": "رُكَّاب"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "رئيس البلدية",
    "arabicVoc": "رَئِيس الْبَلَدِيَّة",
    "hebrew": "ראש העיר",
    "translit": "ראיס אלבלדיה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "رئيسي",
    "arabicVoc": "رَئِيسِيّ",
    "hebrew": "ראשי, עיקרי",
    "translit": "ראיסי"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "رحلة",
    "arabicVoc": "رِحْلَة",
    "hebrew": "טיול",
    "translit": "רחלה",
    "plural": "رِحْلَات"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "رسمي",
    "arabicVoc": "رَسْمِيّ",
    "hebrew": "רשמי",
    "translit": "רסמי"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "زوج / ة",
    "arabicVoc": "زَوْج / ة",
    "hebrew": "בעל/ אשת, בן/בת-זוג",
    "translit": "זוג׳ / ה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "ساحة",
    "arabicVoc": "سَاحَة",
    "hebrew": "חצר",
    "translit": "סאחה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ساحل",
    "arabicVoc": "سَاحِل",
    "hebrew": "חוף",
    "translit": "סאחל",
    "plural": "سَوَاحِل"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "ساكن",
    "arabicVoc": "سَاكِن",
    "hebrew": "תושב",
    "translit": "סאכנ",
    "plural": "سُكّان"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "سبع / ة",
    "arabicVoc": "سَبْع / ة",
    "hebrew": "שבע/ה",
    "translit": "סבע / ה"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ست / ة",
    "arabicVoc": "سِتّ / ة",
    "hebrew": "שש/ה",
    "translit": "סת / ה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "سفير",
    "arabicVoc": "سَفِير",
    "hebrew": "שגריר",
    "translit": "ספיר",
    "plural": "سُفَرَاء"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "سيارة",
    "arabicVoc": "سَيارَة",
    "hebrew": "מכונית",
    "translit": "סיארה",
    "plural": "سَيارَات"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "سيد",
    "arabicVoc": "سَيِّد",
    "hebrew": "אדון, מר",
    "translit": "סיד",
    "plural": "سَادَة"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "سيدة",
    "arabicVoc": "سَيِّدَة",
    "hebrew": "גברת",
    "translit": "סידה",
    "plural": "سَيِّدَات"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "شاهد",
    "arabicVoc": "شَاهَدَ",
    "hebrew": "צפה ב-, ראה",
    "translit": "שאהד",
    "transitive": true
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "شاي",
    "arabicVoc": "شَاي",
    "hebrew": "תה",
    "translit": "שאי"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "شكر",
    "arabicVoc": "شَكَرَ",
    "hebrew": "הודה ל",
    "translit": "שכר",
    "verbPresent": "يَشْكُرُ",
    "transitive": true
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "صاحب",
    "arabicVoc": "صَاحِب",
    "hebrew": "חבר, בעל (רכוש)",
    "translit": "צאחב",
    "plural": "أَصْحَاب"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "صحيح",
    "arabicVoc": "صَحِيح",
    "hebrew": "נכון",
    "translit": "צחיח"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "صحيفة",
    "arabicVoc": "صَحِيفَة",
    "hebrew": "עיתון",
    "translit": "צחיפה",
    "plural": "صُحُف"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "صديق",
    "arabicVoc": "صَدِيق",
    "hebrew": "חבר, ידיד",
    "translit": "צדיק",
    "plural": "أَصْدِقَاء"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "صفحة",
    "arabicVoc": "صَفْحَة",
    "hebrew": "עמוד (בספר)",
    "translit": "צפחה",
    "plural": "صَفَحَات"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "صورة",
    "arabicVoc": "صُورَة",
    "hebrew": "תמונה, צורה",
    "translit": "צורה",
    "plural": "صُوَر"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "طائرة",
    "arabicVoc": "طَائِرَة",
    "hebrew": "מטוס",
    "translit": "טאארה",
    "plural": "طَائِرَات"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "طالب",
    "arabicVoc": "طَالِب",
    "hebrew": "סטודנט",
    "translit": "טאלב",
    "plural": "طُلاَّب"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "طبريا",
    "arabicVoc": "طَبرَِيَّا",
    "hebrew": "טבריה",
    "translit": "טבריא"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "طعام",
    "arabicVoc": "طَعَام",
    "hebrew": "אוכל, מזון",
    "translit": "טעאמ"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "عاد",
    "arabicVoc": "عَادَ",
    "hebrew": "חזר",
    "translit": "עאד",
    "verbPresent": "يَعُودُ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "عالم",
    "arabicVoc": "عَالمَ",
    "hebrew": "עולם",
    "translit": "עאלמ"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "عام",
    "arabicVoc": "عَام",
    "hebrew": "שנה",
    "translit": "עאמ",
    "plural": "أَعْوَام"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "عامل",
    "arabicVoc": "عَامِل",
    "hebrew": "פועל, עובד",
    "translit": "עאמל",
    "plural": "عُمَّال"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "عزيز",
    "arabicVoc": "عَزِيز",
    "hebrew": "יקר, אהוב",
    "translit": "עזיז"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "عشر",
    "arabicVoc": "عَشْر",
    "hebrew": "עשר",
    "translit": "עשר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "عشرة",
    "arabicVoc": "عَشَرَة",
    "hebrew": "עשרה",
    "translit": "עשרה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "عظيم",
    "arabicVoc": "عَظِيم",
    "hebrew": "גדול, עצום",
    "translit": "עט׳ימ"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "علم",
    "arabicVoc": "عَلَّمَ",
    "hebrew": "לימד",
    "translit": "עלמ"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "غادر",
    "arabicVoc": "غَادَرَ",
    "hebrew": "עזב",
    "translit": "ע׳אדר"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "غرب",
    "arabicVoc": "غَرْب",
    "hebrew": "מערב",
    "translit": "ע׳רב"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "غزة",
    "arabicVoc": "غَزَّة",
    "hebrew": "עזה",
    "translit": "ע׳זה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "غني",
    "arabicVoc": "غَنيِّ",
    "hebrew": "עשיר",
    "translit": "ע׳ני",
    "plural": "أَغْنِيَاء"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "فجأة",
    "arabicVoc": "فَجْأَةً",
    "hebrew": "פתאום",
    "translit": "פג׳אה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "فريق",
    "arabicVoc": "فَرِيق",
    "hebrew": "קבוצה",
    "translit": "פריק"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "فصل",
    "arabicVoc": "فَصْل",
    "hebrew": "עונה, פרק",
    "translit": "פצל",
    "plural": "فُصُول"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "فقير",
    "arabicVoc": "فَقِير",
    "hebrew": "עני",
    "translit": "פקיר",
    "plural": "فُقَرَاء"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "فكر في",
    "arabicVoc": "فَكَّرَ في",
    "hebrew": "הרהר ב-, חשב על",
    "translit": "פכר פי"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "فنجان",
    "arabicVoc": "فِنْجَان",
    "hebrew": "ספל",
    "translit": "פנג׳אנ",
    "plural": "فَنَاجِين"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "قدم",
    "arabicVoc": "قَدَّمَ",
    "hebrew": "הגיש",
    "translit": "קדמ"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "قراءة",
    "arabicVoc": "قِرَاءَة",
    "hebrew": "קריאה",
    "translit": "קראאה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "قطار",
    "arabicVoc": "قِطَار",
    "hebrew": "רכבת",
    "translit": "קטאר"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "قعد",
    "arabicVoc": "قَعَدَ",
    "hebrew": "ישב",
    "translit": "קעד",
    "verbPresent": "يَقْعُدُ"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "كرة",
    "arabicVoc": "كُرَة",
    "hebrew": "כדור",
    "translit": "כרה"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "كلمة",
    "arabicVoc": "كَلِمَة",
    "hebrew": "מילה",
    "translit": "כלמה",
    "plural": "كَلِمَات"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "لاعب",
    "arabicVoc": "لَاَعِب",
    "hebrew": "שחקן",
    "translit": "לאעב",
    "plural": "لاَعِبُون"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "لعب",
    "arabicVoc": "لَعِبَ",
    "hebrew": "שיחק",
    "translit": "לעב",
    "verbPresent": "يَلْعَبُ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "لقاء",
    "arabicVoc": "لِقَاء",
    "hebrew": "פגישה",
    "translit": "לקאא"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "إلى اللقاء",
    "arabicVoc": "إِلىَ اللِّقَاء",
    "hebrew": "להתראות",
    "translit": "אלא אללקאא"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "لما",
    "arabicVoc": "لَمَّا",
    "hebrew": "כאשר",
    "translit": "למא"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "لون",
    "arabicVoc": "لَوْن",
    "hebrew": "צבע",
    "translit": "לונ",
    "plural": "أَلْوَان"
  },
  {
    "chapter": 3,
    "part": 1,
    "arabic": "ماء",
    "arabicVoc": "مَاء",
    "hebrew": "מים",
    "translit": "מאא"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مأكولات",
    "arabicVoc": "مَأْكُولاَت",
    "hebrew": "מאכלים",
    "translit": "מאכולאת"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "مباراة",
    "arabicVoc": "مُبَارَاة",
    "hebrew": "תחרות",
    "translit": "מבאראה",
    "plural": "مُبَارَيَات"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "محادثات",
    "arabicVoc": "مُحَادَثَات",
    "hebrew": "שיחות",
    "translit": "מחאדת׳את"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "محطة",
    "arabicVoc": "مَحَطَّة",
    "hebrew": "תחנה",
    "translit": "מחטה",
    "plural": "مَحَطَّات"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مرة",
    "arabicVoc": "مَرَّة",
    "hebrew": "פעם",
    "translit": "מרה",
    "plural": "مَرَّات"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مشغول",
    "arabicVoc": "مَشْغُول",
    "hebrew": "עסוק, תפוס (מקום, קו...)",
    "translit": "משע׳ול"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مشكلة",
    "arabicVoc": "مُشْكِلَة",
    "hebrew": "בעיה",
    "translit": "משכלה",
    "plural": "مَشَاكِل"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مشهور",
    "arabicVoc": "مَشْهُور",
    "hebrew": "מפורסם",
    "translit": "משהור",
    "plural": "مَشْهُورُون"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "مطار",
    "arabicVoc": "مَطَار",
    "hebrew": "שדה תעופה",
    "translit": "מטאר",
    "plural": "مَطَارات"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "مطعم",
    "arabicVoc": "مَطْعَم",
    "hebrew": "מסעדה",
    "translit": "מטעמ",
    "plural": "مَطَاعِم"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "مطلوب",
    "arabicVoc": "مَطْلُوبَ",
    "hebrew": "מבוקש, דרוש",
    "translit": "מטלוב",
    "plural": "مَطْلُوبُون"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "معا",
    "arabicVoc": "مَعًا",
    "hebrew": "יחד",
    "translit": "מעא"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "مفهوم",
    "arabicVoc": "مَفْهُوم",
    "hebrew": "מובן",
    "translit": "מפהומ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "مقدس",
    "arabicVoc": "مُقَدَّس",
    "hebrew": "קדוש",
    "translit": "מקדס"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "ممثل",
    "arabicVoc": "مُمَثِّل",
    "hebrew": "נציג, שחקן (תיאטרון)",
    "translit": "ממת׳ל",
    "plural": "مُمَثِّلُون"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "ممنوع",
    "arabicVoc": "مَمْنُوع",
    "hebrew": "אסור",
    "translit": "ממנוע"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "منطقة",
    "arabicVoc": "مِنْطَقَة",
    "hebrew": "אזור",
    "translit": "מנטקה",
    "plural": "مَنَاطِق"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "منظمة",
    "arabicVoc": "مُنَظَّمَة",
    "hebrew": "ארגון",
    "translit": "מנט׳מה",
    "plural": "مُنَظَّمَات"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "مهندس",
    "arabicVoc": "مُهَنْدِسَ",
    "hebrew": "מהנדס",
    "translit": "מהנדס",
    "plural": "مُهَنْدِسُون"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "موضوع",
    "arabicVoc": "مَوْضُوع",
    "hebrew": "נושא",
    "translit": "מוצ׳וע",
    "plural": "مَوَاضِيع"
  },
  {
    "chapter": 3,
    "part": 3,
    "arabic": "نابلس",
    "arabicVoc": "نَابْلُس",
    "hebrew": "שכם",
    "translit": "נאבלס"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "نشر",
    "arabicVoc": "نَشَرَ",
    "hebrew": "פרסם",
    "translit": "נשר",
    "verbPresent": "يَنْشُرُ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "نصف",
    "arabicVoc": "نِصْف",
    "hebrew": "חצי",
    "translit": "נצפ"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "نظر إلى",
    "arabicVoc": "نَظَرَ إِلَى",
    "hebrew": "הביט, הסתכל",
    "translit": "נט׳ר אלא",
    "verbPresent": "يَنْظُرُ إِلَى"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "نظيف",
    "arabicVoc": "نَظِيف",
    "hebrew": "נקי",
    "translit": "נט׳יפ"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "ناية",
    "arabicVoc": "نَِاية",
    "hebrew": "סוף",
    "translit": "נאיה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "هاتف",
    "arabicVoc": "هَاتِف",
    "hebrew": "טלפון",
    "translit": "האתפ",
    "plural": "هَوَاتِف"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "هام",
    "arabicVoc": "هَامّ",
    "hebrew": "חשוב",
    "translit": "האמ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "هدية",
    "arabicVoc": "هَدِيَّة",
    "hebrew": "מתנה",
    "translit": "הדיה"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "هرم",
    "arabicVoc": "هَرَم",
    "hebrew": "פירמידה",
    "translit": "הרמ",
    "plural": "أَهْرَام"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "واحد",
    "arabicVoc": "وَاحِد",
    "hebrew": "אחד",
    "translit": "ואחד"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "واسع",
    "arabicVoc": "وَاسِع",
    "hebrew": "מרווח, רחב",
    "translit": "ואסע"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "واشنطن",
    "arabicVoc": "وَاشِنْطُن",
    "hebrew": "וושינגטון",
    "translit": "ואשנטנ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "وجد",
    "arabicVoc": "وَجَدَ",
    "hebrew": "מצא",
    "translit": "וג׳ד",
    "verbPresent": "يَجِدُ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير التربية",
    "arabicVoc": "وَزِير التَّرْبِيَة",
    "hebrew": "שר החינוך",
    "translit": "וזיר אלתרביה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير الثقافة",
    "arabicVoc": "وَزِير الثَّقَافَة",
    "hebrew": "שר התרבות",
    "translit": "וזיר אלת׳קאפה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير ٱلخارجية",
    "arabicVoc": "وَزِيرِ ٱلْخَارِجيَّة",
    "hebrew": "שר החוץ",
    "translit": "וזיר אלח׳ארג׳יה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير ٱلداخلية",
    "arabicVoc": "وَزِير ٱلدَّاخِلِيَّة",
    "hebrew": "שר הפנים",
    "translit": "וזיר אלדאח׳ליה"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير ٱلدفاع",
    "arabicVoc": "وَزِير ٱلدِّفَاع",
    "hebrew": "שר הביטחון",
    "translit": "וזיר אלדפאע"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وزير ٱلمالية",
    "arabicVoc": "وَزِير ٱلْمَالِيَّة",
    "hebrew": "שר האוצר",
    "translit": "וזיר אלמאליה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "وضع",
    "arabicVoc": "وَضَعَ",
    "hebrew": "שם, הניח",
    "translit": "וצ׳ע",
    "verbPresent": "يَضَعُ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وفد",
    "arabicVoc": "وَفْد",
    "hebrew": "משלחת",
    "translit": "ופד",
    "plural": "وُفُود"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "وقع",
    "arabicVoc": "وَقَعَ",
    "hebrew": "נפל, שכן (עיר, כפר), התרחש",
    "translit": "וקע",
    "verbPresent": "يَقَعُ"
  },
  {
    "chapter": 3,
    "part": 5,
    "arabic": "وقع على",
    "arabicVoc": "وَقَّعَ عَلَى",
    "hebrew": "חתם על",
    "translit": "וקע עלא"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "فصول السنة",
    "arabicVoc": "فُصُول السَّنَة",
    "hebrew": "עונות השנה",
    "translit": "פצול אלסנה"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "صيف",
    "arabicVoc": "صَيْف",
    "hebrew": "קיץ",
    "translit": "ציפ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "خريف",
    "arabicVoc": "خَرِيف",
    "hebrew": "סתיו",
    "translit": "ח׳ריפ"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "شتاء",
    "arabicVoc": "شِتَاء",
    "hebrew": "חורף",
    "translit": "שתאא"
  },
  {
    "chapter": 3,
    "part": 2,
    "arabic": "ربيع",
    "arabicVoc": "رَبِيع",
    "hebrew": "אביב",
    "translit": "רביע"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "كانون الثاني",
    "arabicVoc": "كَانُون الثَّانِي",
    "hebrew": "ינואר",
    "translit": "כאנונ אלת׳אני"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "شباط",
    "arabicVoc": "شُبَاط",
    "hebrew": "פברואר",
    "translit": "שבאט"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "آذار",
    "arabicVoc": "آذَار",
    "hebrew": "מרץ",
    "translit": "אד׳אר"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "نيسان",
    "arabicVoc": "نِيسَان",
    "hebrew": "אפריל",
    "translit": "ניסאנ"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "أيار",
    "arabicVoc": "أَيَّار",
    "hebrew": "מאי",
    "translit": "איאר"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "حزيران",
    "arabicVoc": "حَزِيرَان",
    "hebrew": "יוני",
    "translit": "חזיראנ"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تموز",
    "arabicVoc": "تَمُّوز",
    "hebrew": "יולי",
    "translit": "תמוז"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "آب",
    "arabicVoc": "آب",
    "hebrew": "אוגוסט",
    "translit": "אב"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "أيلول",
    "arabicVoc": "أَيْلُول",
    "hebrew": "ספטמבר",
    "translit": "אילול"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تشرين الأول",
    "arabicVoc": "تِشْرِين الْأَوَّل",
    "hebrew": "אוקטובר",
    "translit": "תשרינ אלאול"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "تشرين الثاني",
    "arabicVoc": "تِشْرِين الثَّانِي",
    "hebrew": "נובמבר",
    "translit": "תשרינ אלת׳אני"
  },
  {
    "chapter": 3,
    "part": 4,
    "arabic": "كانون الأول",
    "arabicVoc": "كَانُون الْأَوَّل",
    "hebrew": "דצמבר",
    "translit": "כאנונ אלאול"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أجاب",
    "arabicVoc": "أَجَابَ",
    "hebrew": "ענה",
    "translit": "אג׳אב",
    "verbPresent": "يُجُِيب"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أجرى",
    "arabicVoc": "أَجْرَى",
    "hebrew": "ניהל, ערך",
    "translit": "אג׳רא",
    "verbPresent": "يُجْرِي"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أديب",
    "arabicVoc": "أَدِيب",
    "hebrew": "סופר, אדיב",
    "translit": "אדיב"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أراد",
    "arabicVoc": "أَرَادَ",
    "hebrew": "רצה",
    "translit": "אראד",
    "verbPresent": "يُريدُ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أرسل",
    "arabicVoc": "أَرْسَلَ",
    "hebrew": "שלח",
    "translit": "ארסל"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "إستعمل",
    "arabicVoc": "إِسْتَعْمَلَ",
    "hebrew": "השתמש ב",
    "translit": "אסתעמל",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "إستقلال",
    "arabicVoc": "إِسْتِقْلال",
    "hebrew": "עצמאות",
    "translit": "אסתקלאל"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "إشترى",
    "arabicVoc": "إِشْتَرَى",
    "hebrew": "קנה",
    "translit": "אשתרא",
    "verbPresent": "يَشْترَِي"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "إصبع",
    "arabicVoc": "إِصْبَع",
    "hebrew": "אצבע",
    "translit": "אצבע",
    "plural": "أَصَابع",
    "gender": "נקבה"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أعطى",
    "arabicVoc": "أَعْطَى",
    "hebrew": "נתן את ל",
    "translit": "אעטא",
    "verbPresent": "يُعْطِي",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أعلن",
    "arabicVoc": "أَعْلَنَ",
    "hebrew": "הודיע",
    "translit": "אעלנ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "إفتتح",
    "arabicVoc": "إَفْتَتَح",
    "hebrew": "פתח",
    "translit": "אפתתח"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "إقترب من",
    "arabicVoc": "إْقْتَرَبَ مِن",
    "hebrew": "התקרב אל",
    "translit": "אקתרב מנ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أكثر من",
    "arabicVoc": "أَكْثَرْ مِن",
    "hebrew": "יותר מ",
    "translit": "אכת׳ר מנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "ألآن",
    "arabicVoc": "أَلْآنَ",
    "hebrew": "עכשיו",
    "translit": "אלאנ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "ألتوراة",
    "arabicVoc": "أَلتَّوْرَاة",
    "hebrew": "התורה",
    "translit": "אלתוראה"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "ألصوم / ألصيام",
    "arabicVoc": "أَلصَّوْم / أَلصِّيَام",
    "hebrew": "הצום",
    "translit": "אלצומ / אלציאמ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "ألمسيحية",
    "arabicVoc": "أَلْمَسِيحِيَّة",
    "hebrew": "הנצרות",
    "translit": "אלמסיחיה"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "إلى اللقاء",
    "arabicVoc": "إِلَى اللِّقَاء",
    "hebrew": "להתראות",
    "translit": "אלא אללקאא",
    "response": "مَعَ السَّلامَة"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أليهودية",
    "arabicVoc": "أَلْيَهُودِيَّة",
    "hebrew": "היהדות",
    "translit": "אליהודיה"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "إمتحن",
    "arabicVoc": "إِمْتَحَنَ",
    "hebrew": "בחן",
    "translit": "אמתחנ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أمر",
    "arabicVoc": "أَمْر",
    "hebrew": "עניין",
    "translit": "אמר",
    "plural": "أُمُور"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "أمر",
    "arabicVoc": "أَمْر",
    "hebrew": "צו, פקודה",
    "translit": "אמר",
    "plural": "أَوَامِر"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "أمير",
    "arabicVoc": "أَمِير",
    "hebrew": "נסיך, אמיר",
    "translit": "אמיר",
    "plural": "أُمَرَاء"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "إنتخابات",
    "arabicVoc": "إنْتِخَابَات",
    "hebrew": "בחירות",
    "translit": "אנתח׳אבאת"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "إنعقد",
    "arabicVoc": "إِنْعَقَدَ",
    "hebrew": "נערך",
    "translit": "אנעקד"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "إنقطع",
    "arabicVoc": "إِنْقَطَعَ",
    "hebrew": "ניתק, נפסק",
    "translit": "אנקטע"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أهل",
    "arabicVoc": "أَهْل",
    "hebrew": "בני משפחה, אנשי-, הורים",
    "translit": "אהל",
    "plural": "أَهَالي َأَهٍال"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "أول أولى",
    "arabicVoc": "أَوَّل أُولىَ",
    "hebrew": "ראשון, – ראשונה",
    "translit": "אול אולא"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "بحث في",
    "arabicVoc": "بحََث فِي",
    "hebrew": "דן ב",
    "translit": "בחת׳ פי",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "برلمان",
    "arabicVoc": "بَرْلَمَان",
    "hebrew": "פרלמנט",
    "translit": "ברלמאנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "بطيخ",
    "arabicVoc": "بِطِّيخ",
    "hebrew": "אבטיחים",
    "translit": "בטיח׳"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "بعد غد",
    "arabicVoc": "بَعْدَ غَد",
    "hebrew": "מחרתיים",
    "translit": "בעד ע׳ד"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "بنطلون",
    "arabicVoc": "بَنْطَلُون",
    "hebrew": "מכנסיים",
    "translit": "בנטלונ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "بنك",
    "arabicVoc": "بَنْك",
    "hebrew": "בנק",
    "translit": "בנכ",
    "plural": "بُنُوك"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "بنى",
    "arabicVoc": "بَنَى",
    "hebrew": "בנה",
    "translit": "בנא",
    "verbPresent": "يَبْنِي"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "تجول",
    "arabicVoc": "تَجََوَّل",
    "hebrew": "טייל, סייר",
    "translit": "תג׳ול"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "تحدث",
    "arabicVoc": "تَحََدَّث",
    "hebrew": "שוחח",
    "translit": "תחדת׳"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "تطور",
    "arabicVoc": "تَطَوَّرَ",
    "hebrew": "התפתח",
    "translit": "תטור"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "تعاون",
    "arabicVoc": "تَعَاوَنَ",
    "hebrew": "שיתף פעולה",
    "translit": "תעאונ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "تعايش",
    "arabicVoc": "تَعَايُش",
    "hebrew": "דו קיום",
    "translit": "תעאיש"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "تعلم",
    "arabicVoc": "تَعَلَّمَ",
    "hebrew": "למד",
    "translit": "תעלמ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "!تفضل",
    "arabicVoc": "!ْتَفَضَّل",
    "hebrew": "! (ציווי) - בבקשה! התכבד!",
    "translit": "!תפצ׳ל"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "تقدم",
    "arabicVoc": "تَقَدَّمَ",
    "hebrew": "התקדם",
    "translit": "תקדמ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "تكلم",
    "arabicVoc": "تَكَلَّمَ",
    "hebrew": "דיבר, שוחח",
    "translit": "תכלמ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "تلك",
    "arabicVoc": "تِلْكَ",
    "hebrew": "היא, ההיא",
    "translit": "תלכ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "تمرين",
    "arabicVoc": "تَمْرِين",
    "hebrew": "תרגיל",
    "translit": "תמרינ",
    "plural": "تَمَارِين"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "تناول",
    "arabicVoc": "تَنَاوَلَ",
    "hebrew": "טיפל ב-, עסק ב",
    "translit": "תנאול",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "تنظيم",
    "arabicVoc": "تَنْظِيم",
    "hebrew": "ארגון",
    "translit": "תנט׳ימ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "توجه",
    "arabicVoc": "تَوَجَّهَ",
    "hebrew": "פנה",
    "translit": "תוג׳ה"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "تين",
    "arabicVoc": "تِين",
    "hebrew": "תאנים",
    "translit": "תינ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "ثقافة",
    "arabicVoc": "ثَقَافَة",
    "hebrew": "תרבות",
    "translit": "ת׳קאפה"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "جائزة",
    "arabicVoc": "جَائِزَة",
    "hebrew": "פרס",
    "translit": "ג׳אאזה",
    "plural": "جَوَائِز"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "جانب",
    "arabicVoc": "جَانِب",
    "hebrew": "צד",
    "translit": "ג׳אנב"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "جبل",
    "arabicVoc": "جَبَل",
    "hebrew": "הר",
    "translit": "ג׳בל",
    "plural": "جِبَال"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "جسم",
    "arabicVoc": "جِسْم",
    "hebrew": "גוף",
    "translit": "ג׳סמ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "جميع",
    "arabicVoc": "جَمِيع",
    "hebrew": "כל",
    "translit": "ג׳מיע"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "جولة",
    "arabicVoc": "جَوْلَة",
    "hebrew": "סיור",
    "translit": "ג׳ולה"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "جيد",
    "arabicVoc": "جَيِّد",
    "hebrew": "טוב",
    "translit": "ג׳יד"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "حاج",
    "arabicVoc": "حَاجّ",
    "hebrew": "עולה-רגל",
    "translit": "חאג׳",
    "plural": "حُجَّاج"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "حال / حالة",
    "arabicVoc": "حَال / حَالَة",
    "hebrew": "מצב",
    "translit": "חאל / חאלה"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "حديث",
    "arabicVoc": "حَدِيث",
    "hebrew": "חדיש, מודרני, חדית' (מסורת מוסלמית)",
    "translit": "חדית׳"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "حذاء",
    "arabicVoc": "حِذَاء",
    "hebrew": "נעל",
    "translit": "חד׳אא",
    "plural": "أَحْذِيَة"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "حرف",
    "arabicVoc": "حَرْف",
    "hebrew": "אות",
    "translit": "חרפ",
    "plural": "حُرُوف"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "حضر",
    "arabicVoc": "حَضَرُ",
    "hebrew": "נכח ב",
    "translit": "חצ׳ר",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "حليب",
    "arabicVoc": "حَلِيب",
    "hebrew": "חלב",
    "translit": "חליב"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "حول",
    "arabicVoc": "حَوْلَ",
    "hebrew": "מסביב ל",
    "translit": "חול"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "خاص",
    "arabicVoc": "خَاصّ",
    "hebrew": "מיוחד, פרטי",
    "translit": "ח׳אצ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "خبر",
    "arabicVoc": "خَبرَ",
    "hebrew": "ידיעה, חדשה",
    "translit": "ח׳בר",
    "plural": "أَخْبَار"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "خير",
    "arabicVoc": "خَيرْ",
    "hebrew": "טוב",
    "translit": "ח׳יר"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "دخن",
    "arabicVoc": "دَخَّنَ",
    "hebrew": "עישן",
    "translit": "דח׳נ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "دولي دولي",
    "arabicVoc": "دَوْليِّ دُوَلي",
    "hebrew": "בין-לאומי",
    "translit": "דולי דולי"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "دين",
    "arabicVoc": "دِين",
    "hebrew": "דת",
    "translit": "דינ",
    "plural": "أدْيَان"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "ההוא",
    "translit": "ד׳לכ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "رأى",
    "arabicVoc": "رَأَى",
    "hebrew": "ראה",
    "translit": "ראא"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "رئيس",
    "arabicVoc": "رَئيِس",
    "hebrew": "נשיא, ראש, יו\"ר",
    "translit": "ראיס",
    "plural": "رُؤَسَاء"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "رئيس الحكومة / رئيس الوزراء",
    "arabicVoc": "رَئِيس الْحُكُومَة / رَئِيس الْوُزَرَاء",
    "hebrew": "ראש הממשלה",
    "translit": "ראיס אלחכומה / ראיס אלוזראא"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "رئيسي",
    "arabicVoc": "رَئِيسِيّ",
    "hebrew": "ראשי, עיקרי",
    "translit": "ראיסי"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "رحلة",
    "arabicVoc": "رِحْلَة",
    "hebrew": "טיול, מסע",
    "translit": "רחלה",
    "plural": "رِحْلَات"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "رسمي",
    "arabicVoc": "رَسْمِيّ",
    "hebrew": "רשמי",
    "translit": "רסמי"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "رياضة رياضي",
    "arabicVoc": "رِيَاضَة رِيَاضِيّ",
    "hebrew": "ספורט, - ספורטאי",
    "translit": "ריאצ׳ה ריאצ׳י"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "زار",
    "arabicVoc": "زَارَ",
    "hebrew": "ביקר ב",
    "translit": "זאר",
    "verbPresent": "يَزُور",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "زعيم",
    "arabicVoc": "زَعِيم",
    "hebrew": "מנהיג",
    "translit": "זעימ",
    "plural": "زُعَمَاء"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "زيارة",
    "arabicVoc": "زِيَارَة",
    "hebrew": "ביקור",
    "translit": "זיארה",
    "plural": "زِيَارَات"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "سائح",
    "arabicVoc": "سَائِح",
    "hebrew": "תייר",
    "translit": "סאאח",
    "plural": "سُيَّاح"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "ساعد",
    "arabicVoc": "سَاعَدَ",
    "hebrew": "עזר ל",
    "translit": "סאעד",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "ساعة",
    "arabicVoc": "سَاعَة",
    "hebrew": "שעה",
    "translit": "סאעה",
    "plural": "سَاعَات"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "سأل",
    "arabicVoc": "سَأَلَ",
    "hebrew": "שאל",
    "translit": "סאל"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "سكن",
    "arabicVoc": "سَكَنُ",
    "hebrew": "גר",
    "translit": "סכנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "سلام",
    "arabicVoc": "سَلاَم",
    "hebrew": "שלום",
    "translit": "סלאמ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "سمح ل",
    "arabicVoc": "سَمَحَ لِ",
    "hebrew": "הרשה ל",
    "translit": "סמח ל",
    "verbPresent": "يَسْمَحُ لِ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "سنة",
    "arabicVoc": "سَنَة",
    "hebrew": "שנה",
    "translit": "סנה",
    "plural": "سَنَوات"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "سهل",
    "arabicVoc": "سَهْل",
    "hebrew": "קל",
    "translit": "סהל"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "سياسة",
    "arabicVoc": "سِيَاسَة",
    "hebrew": "מדיניות, פוליטיקה",
    "translit": "סיאסה"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "سياسي",
    "arabicVoc": "سِيَاسِيّ",
    "hebrew": "מדיני, פוליטי, פוליטיקאי",
    "translit": "סיאסי"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "شاب",
    "arabicVoc": "شَابّ",
    "hebrew": "בחור, צעיר",
    "translit": "שאב",
    "plural": "شَبَاب"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "شارك",
    "arabicVoc": "شَارَكَ",
    "hebrew": "השתתף",
    "translit": "שארכ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "شأن",
    "arabicVoc": "شَأْن",
    "hebrew": "עניין, דבר",
    "translit": "שאנ",
    "plural": "شُؤُون"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "شخص",
    "arabicVoc": "شَخْص",
    "hebrew": "איש",
    "translit": "שח׳צ",
    "plural": "أَشْخَاص"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "شخصي",
    "arabicVoc": "شَخْصِيّ",
    "hebrew": "אישי",
    "translit": "שח׳צי"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "شرطة شرطي",
    "arabicVoc": "شُرْطَة شُرْطِيّ",
    "hebrew": "משטרה, - שוטר",
    "translit": "שרטה שרטי"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "شركة",
    "arabicVoc": "شَرِكَة",
    "hebrew": "חברה",
    "translit": "שרכה",
    "plural": "شَرِكَات"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "شعب",
    "arabicVoc": "شَعْب",
    "hebrew": "עם",
    "translit": "שעב",
    "plural": "شُعُوب"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "شمس",
    "arabicVoc": "شَمْس",
    "hebrew": "שמש",
    "translit": "שמס",
    "gender": "נקבה"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "شهر",
    "arabicVoc": "شَهْر",
    "hebrew": "חודש",
    "translit": "שהר",
    "plural": "شُهُور"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "صالون",
    "arabicVoc": "صَالُون",
    "hebrew": "סלון",
    "translit": "צאלונ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "صحفي صحافي",
    "arabicVoc": "صُحُفِيّ صِحَافي",
    "hebrew": "עיתונאי",
    "translit": "צחפי צחאפי",
    "plural": "صُحُفِيّ صِحَافيُونَ / صُحُفِيّ صِحَافيِينَ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "صرح بأن",
    "arabicVoc": "صَرَّحَ بِأَن",
    "hebrew": "הצהיר ש",
    "translit": "צרח באנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "صعب",
    "arabicVoc": "صَعْب",
    "hebrew": "קשה",
    "translit": "צעב"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "ضابط",
    "arabicVoc": "ضَابِط",
    "hebrew": "קצין",
    "translit": "צ׳אבט",
    "plural": "ضُبَّاط"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "طابق",
    "arabicVoc": "طَابِق",
    "hebrew": "קומה",
    "translit": "טאבק"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "طالب",
    "arabicVoc": "طَالِب",
    "hebrew": "תלמיד, סטודנט",
    "translit": "טאלב",
    "plural": "طُلاَّب طَلَبَة"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "طفل",
    "arabicVoc": "طِفْل",
    "hebrew": "ילד, תינוק",
    "translit": "טפל",
    "plural": "أطْفَال"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "عاقب",
    "arabicVoc": "عَاقَبَ",
    "hebrew": "העניש",
    "translit": "עאקב"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عالج",
    "arabicVoc": "عَالج",
    "hebrew": "טיפל ב",
    "translit": "עאלג׳",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عام",
    "arabicVoc": "عَامّ",
    "hebrew": "כללי",
    "translit": "עאמ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عدة",
    "arabicVoc": "عِدَّة",
    "hebrew": "כמה, מספר",
    "translit": "עדה"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عدد من",
    "arabicVoc": "عَدَدْ مِن",
    "hebrew": "כמה, מספר",
    "translit": "עדד מנ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عربي",
    "arabicVoc": "عَرَبيِّ",
    "hebrew": "ערבי",
    "translit": "ערבי",
    "plural": "عَرَب"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "عضو",
    "arabicVoc": "عُضْو",
    "hebrew": "חבר ב",
    "translit": "עצ׳ו",
    "plural": "أَعْضَاء"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "عظيم",
    "arabicVoc": "عَظِيم",
    "hebrew": "גדול, עצום",
    "translit": "עט׳ימ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "عقد",
    "arabicVoc": "عَقَدَ",
    "hebrew": "ערך, כינס",
    "translit": "עקד",
    "plural": "عَقَدُونَ / عَقَدِينَ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "علاقات",
    "arabicVoc": "عَلاَقَات",
    "hebrew": "קשרים, יחסים",
    "translit": "עלאקאת"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "علم",
    "arabicVoc": "عَلَّمَ",
    "hebrew": "לימד",
    "translit": "עלמ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "علم",
    "arabicVoc": "عَلَم",
    "hebrew": "דגל",
    "translit": "עלמ",
    "plural": "أَعْلاَم"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "عملية",
    "arabicVoc": "عَمَلِيَّة",
    "hebrew": "פעולה, תהליך, פיגוע",
    "translit": "עמליה",
    "plural": "عَمَلِيَّات"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "عند",
    "arabicVoc": "عِنَدْ",
    "hebrew": "אצל",
    "translit": "ענד"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فاز",
    "arabicVoc": "فَازَ",
    "hebrew": "זכה, זכייה, ניצחון",
    "translit": "פאז"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فتش عن",
    "arabicVoc": "فَتَّشَ عَن",
    "hebrew": "חיפש את",
    "translit": "פתש ענ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فرقة",
    "arabicVoc": "فِرْقَة",
    "hebrew": "להקה",
    "translit": "פרקה"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "فريضة",
    "arabicVoc": "فَرِيضَة",
    "hebrew": "מצווה, חובה דתית",
    "translit": "פריצ׳ה",
    "plural": "فَرَائِض"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فلاح",
    "arabicVoc": "فَلاَّحَ",
    "hebrew": "איכר",
    "translit": "פלאח",
    "plural": "فَلاَّحُونَ / فَلاَّحِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فن",
    "arabicVoc": "فَنّ",
    "hebrew": "אומנות",
    "translit": "פנ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "فنان",
    "arabicVoc": "فَنَّان",
    "hebrew": "אומן",
    "translit": "פנאנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "قال",
    "arabicVoc": "قَالَ",
    "hebrew": "אמר",
    "translit": "קאל",
    "verbPresent": "يَقُولُ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "قام",
    "arabicVoc": "قَامَ",
    "hebrew": "קם",
    "translit": "קאמ",
    "verbPresent": "يَقُومُ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "قام ب",
    "arabicVoc": "قَامَ بِ",
    "hebrew": "ערך, ביצע",
    "translit": "קאמ ב",
    "verbPresent": "يَقُومُ بِ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "قام بزيارةل",
    "arabicVoc": "قَامَ بِزيَارَةِل",
    "hebrew": "ערך ביקור ב",
    "translit": "קאמ בזיארהל"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "قامبجولة في",
    "arabicVoc": "قَامِبجَِوْلَةَ في",
    "hebrew": "ערך סיור ב",
    "translit": "קאמבג׳ולה פי"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "قرار",
    "arabicVoc": "قَرَار",
    "hebrew": "החלטה",
    "translit": "קראר",
    "plural": "قَرَارات"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "قرر",
    "arabicVoc": "قَرَّرَ",
    "hebrew": "החליט",
    "translit": "קרר"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "قميص",
    "arabicVoc": "قَمِيص",
    "hebrew": "חולצה",
    "translit": "קמיצ",
    "plural": "قُمْصَان"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "كان",
    "arabicVoc": "كَانَ",
    "hebrew": "היה",
    "translit": "כאנ",
    "verbPresent": "يَكُونُ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "كريم",
    "arabicVoc": "كَرِيم",
    "hebrew": "נכבד, נדיב",
    "translit": "כרימ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "كل عام وأنت بخير",
    "arabicVoc": "كُلّ عَام وَأَنْتَ بِخَيْر",
    "hebrew": "שנה טובה, חג שמח",
    "translit": "כל עאמ ואנת בח׳יר",
    "response": "وَأَنْتَ بِخَيْر"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "كل عام وأنت سالم",
    "arabicVoc": "كُلّ عَام وَأَنْتَ سَالِم",
    "hebrew": "שנה טובה, חג שמח",
    "translit": "כל עאמ ואנת סאלמ",
    "response": "وَأَنْتَ سَالِم"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "كلب",
    "arabicVoc": "كَلْب",
    "hebrew": "כלב",
    "translit": "כלב",
    "plural": "كِلاَب"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "كم",
    "arabicVoc": "كَمْ",
    "hebrew": "כמה",
    "translit": "כמ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "كنيس",
    "arabicVoc": "كَنِيس",
    "hebrew": "בית כנסת",
    "translit": "כניס"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "كنيسة",
    "arabicVoc": "كَنِيسَة",
    "hebrew": "כנסיה",
    "translit": "כניסה"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "كيف حالك",
    "arabicVoc": "كَيْفَ حَالُكَ",
    "hebrew": "מה שלומך?",
    "translit": "כיפ חאלכ",
    "response": "الْحَمْدُ لِلَّه"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "لاعب",
    "arabicVoc": "لَاَعِب",
    "hebrew": "שחקן",
    "translit": "לאעב",
    "plural": "لَاَعِبُونَ / لَاَعِبِينَ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "لأن",
    "arabicVoc": "لأَِن",
    "hebrew": "מפני ש",
    "translit": "לאנ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "لحم",
    "arabicVoc": "لَحْم",
    "hebrew": "בשר",
    "translit": "לחמ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مال",
    "arabicVoc": "مَال",
    "hebrew": "כסף, רכוש",
    "translit": "מאל",
    "plural": "أَمْوَال"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مبسوط",
    "arabicVoc": "مَبْسُوط",
    "hebrew": "מרוצה, שבע רצון",
    "translit": "מבסוט"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "متحف",
    "arabicVoc": "مُتْحَف",
    "hebrew": "מוזיאון",
    "translit": "מתחפ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مختلف",
    "arabicVoc": "مُخْتَلِف",
    "hebrew": "שונה",
    "translit": "מח׳תלפ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مدير",
    "arabicVoc": "مُدِير",
    "hebrew": "מנהל",
    "translit": "מדיר",
    "plural": "مُدِيرُونَ / مُدِيرِينَ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "مرحبا",
    "arabicVoc": "مَرْحَبًا",
    "hebrew": "שלום",
    "translit": "מרחבא",
    "response": "مَرْحَبْتَيْن"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مسؤول",
    "arabicVoc": "مَسْؤُول",
    "hebrew": "אחראי, פקיד בכיר",
    "translit": "מסאול",
    "plural": "مَسْؤُولُونَ / مَسْؤُولِينَ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مسؤول عن",
    "arabicVoc": "مَسْؤُولْ عَن",
    "hebrew": "אחראי ל",
    "translit": "מסאול ענ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مسابقة",
    "arabicVoc": "مُسَابَقَة",
    "hebrew": "תחרות",
    "translit": "מסאבקה"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مستشفى",
    "arabicVoc": "مُسْتَشْفَى",
    "hebrew": "בית חולים",
    "translit": "מסתשפא"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مسلم",
    "arabicVoc": "مُسْلِمَ",
    "hebrew": "מוסלמי",
    "translit": "מסלמ",
    "plural": "مُسْلِمُونَ / مُسْلِمِينَ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مسيحي",
    "arabicVoc": "مَسِيحِيَّ",
    "hebrew": "נוצרי",
    "translit": "מסיחי",
    "plural": "مَسِيحِيُّونَ / مَسِيحِيِّينَ"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "مشروبات",
    "arabicVoc": "مَشْرُوبَات",
    "hebrew": "משקאות",
    "translit": "משרובאת"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مشكلة",
    "arabicVoc": "مُشْكِلةَ",
    "hebrew": "בעיה",
    "translit": "משכלה",
    "plural": "مَشَاكِل / مُشْكِلات"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مشهور",
    "arabicVoc": "مَشْهُور",
    "hebrew": "מפורסם",
    "translit": "משהור",
    "plural": "ُونَ / ِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مطبخ",
    "arabicVoc": "مَطْبَخ",
    "hebrew": "מטבח",
    "translit": "מטבח׳"
  },
  {
    "chapter": 4,
    "part": 1,
    "arabic": "مطر",
    "arabicVoc": "مَطَر",
    "hebrew": "גשם",
    "translit": "מטר"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مطلوب",
    "arabicVoc": "مَطْلُوبَ",
    "hebrew": "מבוקש, דרוש",
    "translit": "מטלוב",
    "plural": "مَطْلُوبُونَ / مَطْلُوبِينَ"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "مع السلامة",
    "arabicVoc": "مَعَ السَّلامَة",
    "hebrew": "לך לשלום",
    "translit": "מע אלסלאמה",
    "response": "اللهُ يُسَلِّمُك"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "معطف",
    "arabicVoc": "مِعْطَف",
    "hebrew": "מעיל",
    "translit": "מעטפ",
    "plural": "مَعاطِف"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "معلم",
    "arabicVoc": "مُعَلِّم",
    "hebrew": "מורה",
    "translit": "מעלמ",
    "plural": "مُعَلِّمُونَ / مُعَلِّمِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "معلمة",
    "arabicVoc": "مُعَلِّمَة",
    "hebrew": "מורה",
    "translit": "מעלמה",
    "plural": "مُعَلِّمَات"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "مكان",
    "arabicVoc": "مَكَان",
    "hebrew": "מקום",
    "translit": "מכאנ",
    "plural": "أَمَاكِن"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مكة",
    "arabicVoc": "مَكَّة",
    "hebrew": "מכה",
    "translit": "מכה"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "ملابس",
    "arabicVoc": "مَلاَبِس",
    "hebrew": "בגדים",
    "translit": "מלאבס"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "ملعب",
    "arabicVoc": "مَلْعَب",
    "hebrew": "מגרש משחקים",
    "translit": "מלעב"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "ممتاز",
    "arabicVoc": "مُمْتَاز",
    "hebrew": "מצוין",
    "translit": "ממתאז",
    "plural": "مُمْتَازُونَ / مُمْتَازِينَ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "ممثل",
    "arabicVoc": "مَمَُثِّل",
    "hebrew": "נציג, שחקן",
    "translit": "ממת׳ל",
    "plural": "مَمَُثِّلُونَ / مَمَُثِّلِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "ممنوع",
    "arabicVoc": "مَمْنُوع",
    "hebrew": "אסור",
    "translit": "ממנוע"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "من المتوقع أن",
    "arabicVoc": "مِنْ الْمُتَوَقَّع أن",
    "hebrew": "מן הצפוי ש",
    "translit": "מנ אלמתוקע אנ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "من المقرر أن",
    "arabicVoc": "مِنْ الْمُقَرَّر أن",
    "hebrew": "הוחלט, נקבע ש",
    "translit": "מנ אלמקרר אנ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "من فضلك / فضلكم",
    "arabicVoc": "مِنْْ فَضْلِكَ / فَضْلِكُم",
    "hebrew": "בבקשה ממך/מכם",
    "translit": "מנ פצ׳לכ / פצ׳לכמ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "منافع",
    "arabicVoc": "مَنَافِع",
    "hebrew": "שירותים",
    "translit": "מנאפע"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "منع من",
    "arabicVoc": "مَنَعَ مِنْ",
    "hebrew": "מנע את- מ-, אסר את- על",
    "translit": "מנע מנ",
    "transitive": true
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مهندس",
    "arabicVoc": "مُهَنْدِس",
    "hebrew": "מהנדס",
    "translit": "מהנדס",
    "plural": "ُونَ / ِينَ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "مواطن",
    "arabicVoc": "مُوَاطِنَ",
    "hebrew": "אזרח",
    "translit": "מואטנ",
    "plural": "مُوَاطِنُونَ / مُوَاطِنِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "موجود",
    "arabicVoc": "مَوْجُود",
    "hebrew": "נמצא, ישנו",
    "translit": "מוג׳וד"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "موضوع",
    "arabicVoc": "مَوْضُوع",
    "hebrew": "נושא",
    "translit": "מוצ׳וע",
    "plural": "مَوَاضِيع مَوْضُوعَات"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "موظف",
    "arabicVoc": "مُوَظَّفَ",
    "hebrew": "פקיד",
    "translit": "מוט׳פ",
    "plural": "مُوَظَّفُونَ / مُوَظَّفِينَ"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "نبأ",
    "arabicVoc": "نَبَأ",
    "hebrew": "ידיעה",
    "translit": "נבא",
    "plural": "أَنْبَاء"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "نتيجة",
    "arabicVoc": "نَتِيجَة",
    "hebrew": "תוצאה",
    "translit": "נתיג׳ה",
    "plural": "نَتَائِج"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "نجح",
    "arabicVoc": "نجََحَ",
    "hebrew": "הצליח",
    "translit": "נג׳ח"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "نهر",
    "arabicVoc": "نَهْر",
    "hebrew": "נהר",
    "translit": "נהר"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "هاتف نقال / هاتف خلوي / هاتف محمول",
    "arabicVoc": "هَاتِف نَقَّال / هَاتِف خَلَوِيّ / هَاتِف مَحْمُول",
    "hebrew": "טלפון נייד, סלולרי",
    "translit": "האתפ נקאל / האתפ ח׳לוי / האתפ מחמול"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "هدف",
    "arabicVoc": "هَدَف",
    "hebrew": "מטרה",
    "translit": "הדפ",
    "plural": "أَهْدَاف"
  },
  {
    "chapter": 4,
    "part": 3,
    "arabic": "وافق على",
    "arabicVoc": "وَافَقَ عَلَى",
    "hebrew": "הסכים על",
    "translit": "ואפק עלא"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "وزارة",
    "arabicVoc": "وِزَارَة",
    "hebrew": "משרד (של שר)",
    "translit": "וזארה"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "وصل",
    "arabicVoc": "وَصَلِ",
    "hebrew": "הגיע",
    "translit": "וצל"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "وقت",
    "arabicVoc": "وَقْت",
    "hebrew": "זמן",
    "translit": "וקת",
    "plural": "أَوْقات"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "وقع",
    "arabicVoc": "وَقَعَ",
    "hebrew": "נמצא, שכן, נפל",
    "translit": "וקע",
    "verbPresent": "يَقَعُ"
  },
  {
    "chapter": 4,
    "part": 5,
    "arabic": "ألواقع",
    "arabicVoc": "أَلْوَاقِع",
    "hebrew": "השוכן",
    "translit": "אלואקע"
  },
  {
    "chapter": 4,
    "part": 2,
    "arabic": "وقف",
    "arabicVoc": "وَقَفَ",
    "hebrew": "עמד",
    "translit": "וקפ",
    "verbPresent": "يَقِفُ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الأحد",
    "arabicVoc": "يَوْم الْأَحَد",
    "hebrew": "יום ראשון",
    "translit": "יומ אלאחד"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الاثنين",
    "arabicVoc": "يَوْم الْاثْنَين",
    "hebrew": "יום שני",
    "translit": "יומ אלאת׳נינ"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الثلاثاء",
    "arabicVoc": "يَوْم الثُّلاَثَاء",
    "hebrew": "יום שלישי",
    "translit": "יומ אלת׳לאת׳אא"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الأربعاء",
    "arabicVoc": "يَوْم الْأَرْبِعَاء",
    "hebrew": "יום רביעי",
    "translit": "יומ אלארבעאא"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الخميس",
    "arabicVoc": "يَوْم الْخَمِيس",
    "hebrew": "יום חמישי",
    "translit": "יומ אלח׳מיס"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم الجمعة",
    "arabicVoc": "يَوْم الْجُمْعَة",
    "hebrew": "יום ששי",
    "translit": "יומ אלג׳מעה"
  },
  {
    "chapter": 4,
    "part": 4,
    "arabic": "يوم السبت",
    "arabicVoc": "يَوْم السَّبْت",
    "hebrew": "יום שבת",
    "translit": "יומ אלסבת"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أجنبي",
    "arabicVoc": "أَجْنَبيِّ",
    "hebrew": "זר",
    "translit": "אג׳נבי",
    "plural": "أَجَانِب"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إتجه / إتجاه",
    "arabicVoc": "إِتجََّه / إِتجَِّاه",
    "hebrew": "פנה, שם פניו אל / כיוון",
    "translit": "אתג׳ה / אתג׳אה"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إتحاد",
    "arabicVoc": "إِتحَِّاد",
    "hebrew": "התאחדות, פדרציה",
    "translit": "אתחאד"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إتخذ",
    "arabicVoc": "إِتخََّذَ",
    "hebrew": "נקט, קיבל (החלטה)",
    "translit": "אתח׳ד׳"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إتصال",
    "arabicVoc": "إِتِّصَال",
    "hebrew": "קשר, מגע",
    "translit": "אתצאל",
    "plural": "إِتِّصَالات"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إتفق على",
    "arabicVoc": "إِتَّفَقَ عَلَى",
    "hebrew": "הסכים על-, בעניין",
    "translit": "אתפק עלא"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إجتماع",
    "arabicVoc": "إِجْتِمَاع",
    "hebrew": "פגישה, מפגש, התכנסות",
    "translit": "אג׳תמאע"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إجتماعي",
    "arabicVoc": "إِجْتِمَاعِيّ",
    "hebrew": "חברתי, סוציאלי",
    "translit": "אג׳תמאעי"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إجراء",
    "arabicVoc": "إِجْرَاء",
    "hebrew": "אמצעי, צעד, הליך",
    "translit": "אג׳ראא",
    "plural": "إِجْرَاءات"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إحتفل ب",
    "arabicVoc": "إِحْتَفَلَ ب",
    "hebrew": "חגג את",
    "translit": "אחתפל ב"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إحتل",
    "arabicVoc": "إِحْتَل",
    "hebrew": "כבש",
    "translit": "אחתל"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إختار",
    "arabicVoc": "إِخْتَارَ",
    "hebrew": "בחר",
    "translit": "אח׳תאר"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أخذ",
    "arabicVoc": "أَخَذَ",
    "hebrew": "פועל בעתיד – התחיל ל",
    "translit": "אח׳ד׳"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إدارة",
    "arabicVoc": "إِدَارَة",
    "hebrew": "הנהלה",
    "translit": "אדארה"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إذاعة",
    "arabicVoc": "إِذَاعَة",
    "hebrew": "שידור, תחנת שידור",
    "translit": "אד׳אעה"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إرهاب",
    "arabicVoc": "إِرْهَاب",
    "hebrew": "טרור",
    "translit": "ארהאב"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إرهابي",
    "arabicVoc": "إَرْهَابيِّ",
    "hebrew": "טרוריסט",
    "translit": "ארהאבי",
    "plural": "إَرْهَابيُِّونَ / إَرْهَابيِِّينَ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أزمة",
    "arabicVoc": "أَزْمَة",
    "hebrew": "משבר",
    "translit": "אזמה",
    "plural": "أَزَمَات"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إستأنف",
    "arabicVoc": "إِسْتَأْنَفَ",
    "hebrew": "חידש",
    "translit": "אסתאנפ"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إستمر / إستمر في",
    "arabicVoc": "إِسْتَمَر / إِسْتَمَرَِّ في",
    "hebrew": "נמשך / המשיך ב",
    "translit": "אסתמר / אסתמר פי"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إستنكر",
    "arabicVoc": "إِسْتَنْكَرَ",
    "hebrew": "גינה",
    "translit": "אסתנכר"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أسرة",
    "arabicVoc": "أُسْرَة",
    "hebrew": "משפחה",
    "translit": "אסרה"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أشار إلى",
    "arabicVoc": "أَشَارََ إِلى",
    "hebrew": "הצביע על-, רמז על",
    "translit": "אשאר אלא"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إصطدم",
    "arabicVoc": "إِصْطَدَمَ",
    "hebrew": "התנגש",
    "translit": "אצטדמ"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أضاف",
    "arabicVoc": "أَضَافَ",
    "hebrew": "הוסיף",
    "translit": "אצ׳אפ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أضرب عن",
    "arabicVoc": "أَضْرَبَ عَن",
    "hebrew": "שבת מ",
    "translit": "אצ׳רב ענ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إعترف ب",
    "arabicVoc": "إِعْتَرَفَِ ب",
    "hebrew": "הכיר ב-, הודה ב",
    "translit": "אעתרפ ב"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إعتقد",
    "arabicVoc": "إِعْتَقَدَ",
    "hebrew": "חשב",
    "translit": "אעתקד"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إعتقل",
    "arabicVoc": "إِعْتَقَلَ",
    "hebrew": "עצר",
    "translit": "אעתקל"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أعرب عن",
    "arabicVoc": "أَعْرَبَ عَن",
    "hebrew": "הביע את",
    "translit": "אערב ענ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أغلبية",
    "arabicVoc": "أَغْلَبِيَّة",
    "hebrew": "רוב",
    "translit": "אע׳לביה"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أغلق",
    "arabicVoc": "أَغْلَقَ",
    "hebrew": "סגר, נעל",
    "translit": "אע׳לק"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إقترح على",
    "arabicVoc": "إِقْتَرَحَ عَلَى",
    "hebrew": "הציע את- ל",
    "translit": "אקתרח עלא",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إقتصاد",
    "arabicVoc": "إِقْتِصَاد",
    "hebrew": "כלכלה",
    "translit": "אקתצאד"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "إقتصادي",
    "arabicVoc": "إِقْتِصَادِيّ",
    "hebrew": "כלכלי",
    "translit": "אקתצאדי"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أقل",
    "arabicVoc": "أَقَلّ",
    "hebrew": "פחות מ",
    "translit": "אקל"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "أقلية",
    "arabicVoc": "أَقَلِّيَّة",
    "hebrew": "מיעוט",
    "translit": "אקליה",
    "plural": "أَقَلِّيَّات"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أكد",
    "arabicVoc": "أَكَّدَ",
    "hebrew": "הדגיש, אישר",
    "translit": "אכד"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "ألمقبل",
    "arabicVoc": "أَلْمُقْبِل",
    "hebrew": "הבא",
    "translit": "אלמקבל"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إمرأة",
    "arabicVoc": "إِمْرَأَة",
    "hebrew": "אישה ( האישה)",
    "translit": "אמראה",
    "plural": "نِسَاء أَلْمَرْأَة"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "أمن",
    "arabicVoc": "أَمْن",
    "hebrew": "ביטחון",
    "translit": "אמנ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إنتشر",
    "arabicVoc": "إِنْتَشَرَ",
    "hebrew": "התפשט, התפרס, נפוץ",
    "translit": "אנתשר"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إنتظر",
    "arabicVoc": "إِنْتَظَرَ",
    "hebrew": "חיכה",
    "translit": "אנתט׳ר"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "إنتقل",
    "arabicVoc": "إِنْتَقَلَ",
    "hebrew": "עבר",
    "translit": "אנתקל"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إنسحب",
    "arabicVoc": "إِنْسَحَبَ",
    "hebrew": "נסוג",
    "translit": "אנסחב"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "إنفجر",
    "arabicVoc": "إِنْفَجَرَ",
    "hebrew": "התפוצץ",
    "translit": "אנפג׳ר"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "أهم",
    "arabicVoc": "أَهَمّ",
    "hebrew": "חשוב יותר",
    "translit": "אהמ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "أهمية",
    "arabicVoc": "أَهمَِّيَّة",
    "hebrew": "חשיבות",
    "translit": "אהמיה"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "باع",
    "arabicVoc": "بَاعَ",
    "hebrew": "מכר",
    "translit": "באע",
    "verbPresent": "يَبِيعُ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "بذل جهودا",
    "arabicVoc": "بَذَلَ جُهُودًا",
    "hebrew": "השקיע מאמצים",
    "translit": "בד׳ל ג׳הודא"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "بعث",
    "arabicVoc": "بَعَثَ",
    "hebrew": "שלח",
    "translit": "בעת׳"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "بمناسبة",
    "arabicVoc": "بِمُنَاسَبَة",
    "hebrew": "לרגל",
    "translit": "במנאסבה"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تبادل",
    "arabicVoc": "تَبَادُل",
    "hebrew": "חילוף, התחלפות",
    "translit": "תבאדל"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "تبادل تجاري",
    "arabicVoc": "تَبَادُلّ تِجَارِي",
    "hebrew": "סחר חליפין)",
    "translit": "תבאדל תג׳ארי"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تجاري",
    "arabicVoc": "تّجَِارِي",
    "hebrew": "מסחרי",
    "translit": "תג׳ארי"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تجربة",
    "arabicVoc": "تَجْرِبَة",
    "hebrew": "ניסיון",
    "translit": "תג׳רבה",
    "plural": "تَجَارِب"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "ترأس",
    "arabicVoc": "تَرَأَّسَ",
    "hebrew": "עמד בראש",
    "translit": "תראס"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "تزوج",
    "arabicVoc": "تَزَوَّجَ",
    "hebrew": "התחתן",
    "translit": "תזוג׳"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "تسلم",
    "arabicVoc": "تَسَلَّمَ",
    "hebrew": "קיבל לידו, לקח",
    "translit": "תסלמ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تطور",
    "arabicVoc": "تَطَوُّر",
    "hebrew": "התפתחות",
    "translit": "תטור",
    "plural": "تَطَوُّرات"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تظاهر",
    "arabicVoc": "تَظَاهَرَ",
    "hebrew": "הפגין",
    "translit": "תט׳אהר"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تعزيز",
    "arabicVoc": "تَعْزيز",
    "hebrew": "חיזוק",
    "translit": "תעזיז"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تعليق",
    "arabicVoc": "تَعْلِيق",
    "hebrew": "פרשנות, תגובה, \"טוקבק\"",
    "translit": "תעליק"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "تغير",
    "arabicVoc": "تَغَيَّرَ",
    "hebrew": "השתנה",
    "translit": "תע׳יר"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "تفاصيل",
    "arabicVoc": "تَفَاصِيل",
    "hebrew": "פרטים",
    "translit": "תפאציל"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "تقرير",
    "arabicVoc": "تَقْرِير",
    "hebrew": "דו\"ח",
    "translit": "תקריר",
    "plural": "تَقَارِير"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "توجهإلى",
    "arabicVoc": "تَوَجَّهَإِلىَ",
    "hebrew": "פנה אל",
    "translit": "תוג׳האלא"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "توقع",
    "arabicVoc": "تَوَقَّعَ",
    "hebrew": "ציפה ל",
    "translit": "תוקע",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "ثورة",
    "arabicVoc": "ثَوْرَة",
    "hebrew": "מהפכה",
    "translit": "ת׳ורה"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "جدير بالذكر أن",
    "arabicVoc": "جَدِير بِالذِّكْر أَن",
    "hebrew": "ראוי לציון ש",
    "translit": "ג׳דיר באלד׳כר אנ"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "جندي",
    "arabicVoc": "جُنْدِيّ",
    "hebrew": "חייל",
    "translit": "ג׳נדי",
    "plural": "جُنُود"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "جو",
    "arabicVoc": "جَوّ",
    "hebrew": "אוויר",
    "translit": "ג׳ו"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "جوي",
    "arabicVoc": "جَوِّيّ",
    "hebrew": "אווירי",
    "translit": "ג׳וי"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "جيش",
    "arabicVoc": "جَيْش",
    "hebrew": "צבא",
    "translit": "ג׳יש"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "حاجز",
    "arabicVoc": "حَاجِز",
    "hebrew": "מחסום",
    "translit": "חאג׳ז",
    "plural": "حَوَاجِز"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "حادث",
    "arabicVoc": "حَادِث",
    "hebrew": "אירוע, מקרה, תאונה",
    "translit": "חאדת׳",
    "plural": "حَوَادِث"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "حارس",
    "arabicVoc": "حَارِس",
    "hebrew": "שומר, מאבטח/",
    "translit": "חארס",
    "plural": "حُرَّاس"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حراسة",
    "arabicVoc": "حِرَاسَة",
    "hebrew": "שמירה",
    "translit": "חראסה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حاول محاولة",
    "arabicVoc": "حَاوَل مُحَاوَلَة",
    "hebrew": "ניסה, - ניסיון",
    "translit": "חאול מחאולה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حتى",
    "arabicVoc": "حَتى",
    "hebrew": "עד, כדי ש",
    "translit": "חתא"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حد",
    "arabicVoc": "حَدّ",
    "hebrew": "גבול, גבולות",
    "translit": "חד",
    "plural": "حُدُود"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حدث",
    "arabicVoc": "حَدَثَ",
    "hebrew": "קרה, ארע",
    "translit": "חדת׳",
    "plural": "حَدَثُونَ / حَدَثِينَ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "حضر",
    "arabicVoc": "حَضَرُ",
    "hebrew": "נכח ב",
    "translit": "חצ׳ר",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "حق",
    "arabicVoc": "حَقّ",
    "hebrew": "זכות",
    "translit": "חק",
    "plural": "حُقُوق"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "حل",
    "arabicVoc": "حَلّ",
    "hebrew": "פתרון",
    "translit": "חל",
    "plural": "حُلُول"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "حماية",
    "arabicVoc": "حِمَايَة",
    "hebrew": "שמירה, הגנה",
    "translit": "חמאיה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حوالي",
    "arabicVoc": "حَوَالي",
    "hebrew": "בערך, בקירוב",
    "translit": "חואלי"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "حيث",
    "arabicVoc": "حَيْثُ",
    "hebrew": "מקום שם",
    "translit": "חית׳"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "خارج ألخارج",
    "arabicVoc": "خَارِج أَلْخَارِج",
    "hebrew": "מחוץ ל- ( - חו\"ל)",
    "translit": "ח׳ארג׳ אלח׳ארג׳"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "خبير",
    "arabicVoc": "خَبِير",
    "hebrew": "מומחה, בעל ניסיון",
    "translit": "ח׳ביר",
    "plural": "خُبَرَاء"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "خطوة",
    "arabicVoc": "خُطْوَة",
    "hebrew": "צעד",
    "translit": "ח׳טוה",
    "plural": "خُطُوات"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "داخل",
    "arabicVoc": "دَاخِل",
    "hebrew": "בתוך",
    "translit": "דאח׳ל"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "دائما",
    "arabicVoc": "دَائِمًا",
    "hebrew": "תמיד",
    "translit": "דאאמא"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "دافععن",
    "arabicVoc": "دَافَعْعَنَ",
    "hebrew": "הגן על",
    "translit": "דאפעענ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "دفاع",
    "arabicVoc": "دِفَاع",
    "hebrew": "הגנה",
    "translit": "דפאע"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "دمر",
    "arabicVoc": "دَمَّرَ",
    "hebrew": "הרס, החריב",
    "translit": "דמר"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "ذلك وذلك",
    "arabicVoc": "ذٰلِكَ وَذٰلِكَ",
    "hebrew": "ההוא - - וזאת.../",
    "translit": "ד׳לכ וד׳לכ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "لذلك / بعدذلك",
    "arabicVoc": "لِذٰلِك / بَعْدَذٰلِكَ",
    "hebrew": "לכן/ - אחר כך/",
    "translit": "לד׳לכ / בעדד׳לכ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "كذلك / مع ذلك",
    "arabicVoc": "كَذٰلِك / مَعََ ذٰلِك",
    "hebrew": "כמו כן/ – עם",
    "translit": "כד׳לכ / מע ד׳לכ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "זאת, למרות זאת/ –זה/זאת",
    "translit": "ד׳לכ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "سمعت ذلك",
    "arabicVoc": "سَمَِعْتُ ذٰلِك",
    "hebrew": "לדוגמה",
    "translit": "סמעת ד׳לכ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "رئيس الأركان",
    "arabicVoc": "رَئِيس الْأَرْكَان",
    "hebrew": "הרמטכ\"ל",
    "translit": "ראיס אלארכאנ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "رحبب",
    "arabicVoc": "رَحَّبِبَ",
    "hebrew": "קיבל את- בסבר פנים יפות",
    "translit": "רחבב"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "رغم",
    "arabicVoc": "رَغْمَ",
    "hebrew": "למרות",
    "translit": "רע׳מ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "رفض",
    "arabicVoc": "رَفَضُ",
    "hebrew": "דחה, סירב",
    "translit": "רפצ׳"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "رفع",
    "arabicVoc": "رَفَعَ",
    "hebrew": "הרים",
    "translit": "רפע"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "سائح",
    "arabicVoc": "سَائِح",
    "hebrew": "תייר/ תיירות",
    "translit": "סאאח",
    "plural": "سُيَّاح / سِيَاحَة"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "سابق",
    "arabicVoc": "سَابِق",
    "hebrew": "קודם",
    "translit": "סאבק"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "سبب",
    "arabicVoc": "سَبَب",
    "hebrew": "סיבה/ בגלל, בשל",
    "translit": "סבב",
    "plural": "أَسْبَاب / بِسَبَب"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "سريع",
    "arabicVoc": "سَرِيع",
    "hebrew": "מהיר",
    "translit": "סריע"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "سفارة / سفارة",
    "arabicVoc": "سِفَارَة / سَفَارَة",
    "hebrew": "שגרירות",
    "translit": "ספארה / ספארה",
    "plural": "سِفَارَة / سَفَارَات"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "سلاح",
    "arabicVoc": "سِلاَح",
    "hebrew": "נשק",
    "translit": "סלאח",
    "plural": "أَسْلِحَة"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "سلطة",
    "arabicVoc": "سُلْطَة",
    "hebrew": "שלטון, שליטה, רשות",
    "translit": "סלטה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "سمح",
    "arabicVoc": "سَمََح",
    "hebrew": "הרשה ל",
    "translit": "סמח",
    "plural": "سَمََحُونَ / سَمََحِينَ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "شارك",
    "arabicVoc": "شَارَك",
    "hebrew": "השתתף",
    "translit": "שארכ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "شأن",
    "arabicVoc": "شَأْن",
    "hebrew": "עניין",
    "translit": "שאנ",
    "plural": "شُؤُون"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "شغل",
    "arabicVoc": "شُغْل",
    "hebrew": "עבודה",
    "translit": "שע׳ל"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "شغل منصبا",
    "arabicVoc": "شَغَلَ مَنْصِبًا",
    "hebrew": "עבד במשרה",
    "translit": "שע׳ל מנצבא"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "شقيق",
    "arabicVoc": "شَقِيق",
    "hebrew": "אח (ביולוגי)",
    "translit": "שקיק",
    "plural": "أَشِقَّاء"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "شكل",
    "arabicVoc": "شَكَّلَ",
    "hebrew": "הרכיב, היווה",
    "translit": "שכל"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "شكل",
    "arabicVoc": "شَكْل",
    "hebrew": "צורה, אופן",
    "translit": "שכל"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "صاروخ",
    "arabicVoc": "صَارُوخ",
    "hebrew": "טיל",
    "translit": "צארוח׳",
    "plural": "صَوَارِيخ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "ضد",
    "arabicVoc": "ضِد",
    "hebrew": "נגד",
    "translit": "צ׳ד"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "طور",
    "arabicVoc": "طَوَّرَ",
    "hebrew": "פיתח",
    "translit": "טור"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "طيار",
    "arabicVoc": "طَيَّار",
    "hebrew": "טייס",
    "translit": "טיאר",
    "plural": "طَيَّارُونَ / طَيَّارِينَ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "طيران",
    "arabicVoc": "طَيَرَان",
    "hebrew": "תעופה",
    "translit": "טיראנ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "عاد",
    "arabicVoc": "عَادَ",
    "hebrew": "חזר, שב, שיבה, חזרה",
    "translit": "עאד",
    "verbPresent": "يَعُودُ عَوْدَة"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "عاش",
    "arabicVoc": "عَاشَ",
    "hebrew": "חי",
    "translit": "עאש",
    "verbPresent": "يَعِيشُ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "عبر عن",
    "arabicVoc": "عَبَّرَ عَن",
    "hebrew": "הביע, ביטא את",
    "translit": "עבר ענ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "عدد",
    "arabicVoc": "عَدَد",
    "hebrew": "מספר, גיליון (של עיתון)",
    "translit": "עדד",
    "plural": "أَعْدَاد"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "عدو",
    "arabicVoc": "عَدُوّ",
    "hebrew": "אויב",
    "translit": "עדו",
    "plural": "أَعْدَاء"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "عرض على",
    "arabicVoc": "عَرَضِ عَلَى",
    "hebrew": "הציג, הציע את ל",
    "translit": "ערצ׳ עלא",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "عسكري",
    "arabicVoc": "عَسْكّرِيَ",
    "hebrew": "צבאי",
    "translit": "עסכרי"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "عين",
    "arabicVoc": "عَينَ",
    "hebrew": "מינה את- ל",
    "translit": "עינ",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "فترة",
    "arabicVoc": "فَتْرَة",
    "hebrew": "תקופה",
    "translit": "פתרה"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "فقط",
    "arabicVoc": "فَقَطْ",
    "hebrew": "רק, בלבד",
    "translit": "פקט"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "فكرة",
    "arabicVoc": "فِكْرَة",
    "hebrew": "רעיון",
    "translit": "פכרה"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "في أعقاب",
    "arabicVoc": "فيِ أَعْقَاب",
    "hebrew": "בעקבות",
    "translit": "פי אעקאב"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "في نطاق",
    "arabicVoc": "فيِ نِطَاق",
    "hebrew": "במסגרת",
    "translit": "פי נטאק"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "قائد",
    "arabicVoc": "قَائِد",
    "hebrew": "מפקד, מנהיג",
    "translit": "קאאד",
    "plural": "قَادَة"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "قابل مقابلة",
    "arabicVoc": "قَابَل مُقَابَلَة",
    "hebrew": "פגש, ראיין, פגישה, ראיון",
    "translit": "קאבל מקאבלה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "قام بجولة",
    "arabicVoc": "قَامَ بِجَوْلَة",
    "hebrew": "ערך סיור",
    "translit": "קאמ בג׳ולה"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "قضية",
    "arabicVoc": "قَضِيَّة",
    "hebrew": "בעיה, תביעה משפטית",
    "translit": "קצ׳יה",
    "plural": "قَضَايَا"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "قطاع غزة",
    "arabicVoc": "قُطَاع غَزَّة",
    "hebrew": "רצועת עזה",
    "translit": "קטאע ע׳זה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "قوة",
    "arabicVoc": "قُوَّة",
    "hebrew": "כוח",
    "translit": "קוה",
    "plural": "قُوَّات"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "قوي",
    "arabicVoc": "قَوِّيّ",
    "hebrew": "חזק",
    "translit": "קוי"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "كافح",
    "arabicVoc": "كَافَحَ",
    "hebrew": "נאבק ב",
    "translit": "כאפח",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "كما",
    "arabicVoc": "كَمَا",
    "hebrew": "כמו כן, כמו ש",
    "translit": "כמא"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "لجنة",
    "arabicVoc": "لَجْنَة",
    "hebrew": "ועדה",
    "translit": "לג׳נה",
    "plural": "لِجَان"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "لدى",
    "arabicVoc": "لَدَى",
    "hebrew": "אצל",
    "translit": "לדא"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "لقاء",
    "arabicVoc": "لِقَاء",
    "hebrew": "פגישה",
    "translit": "לקאא"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "مؤتمر صحفي",
    "arabicVoc": "مُؤْتمََرّ صُحُفِي",
    "hebrew": "מסיבת עיתונאים",
    "translit": "מאתמר צחפי"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "مؤتمر قمة",
    "arabicVoc": "مُؤْتمََر قِمَّة",
    "hebrew": "ועידת פסגה",
    "translit": "מאתמר קמה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مؤخرا",
    "arabicVoc": "مُؤَخَّرًا",
    "hebrew": "לאחרונה",
    "translit": "מאח׳רא"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مباحثات",
    "arabicVoc": "مُبَاحَثَات",
    "hebrew": "דיונים",
    "translit": "מבאחת׳את"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مبادرة",
    "arabicVoc": "مُبَادَرَة",
    "hebrew": "יוזמה",
    "translit": "מבאדרה",
    "plural": "مُبَادَرَات"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مجموعة",
    "arabicVoc": "مَجْمُوعَة",
    "hebrew": "קבוצה",
    "translit": "מג׳מועה",
    "plural": "مَجْمُوعَات"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "متحدث بٱسم / ناطق بلسان",
    "arabicVoc": "مُتَحَدِّث بِٱسْم / نَاطِق بِلِسَان",
    "hebrew": "דובר בשם-, מטעם",
    "translit": "מתחדת׳ באסמ / נאטק בלסאנ"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "مثل",
    "arabicVoc": "مِثْل",
    "hebrew": "כמו",
    "translit": "מת׳ל"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مجال",
    "arabicVoc": "مَجَال",
    "hebrew": "תחום",
    "translit": "מג׳אל",
    "plural": "مَجَالات"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مجتمع",
    "arabicVoc": "مُجْتَمَع",
    "hebrew": "חברה",
    "translit": "מג׳תמע"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مدرسة ٱبتدائية",
    "arabicVoc": "مَدْرَسَة ٱبْتِدَائِيَّة",
    "hebrew": "בית ספר יסודי",
    "translit": "מדרסה אבתדאאיה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مدرسة إعدادية",
    "arabicVoc": "مَدْرَسَة إِعْدَادِيَّة",
    "hebrew": "חטיבת ביניים",
    "translit": "מדרסה אעדאדיה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مدرسة ثانوية",
    "arabicVoc": "مَدْرَسَة ثَانَوِيَّة",
    "hebrew": "בית ספר תיכון",
    "translit": "מדרסה ת׳אנויה"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مراسل",
    "arabicVoc": "مُرَاسِل",
    "hebrew": "כתב",
    "translit": "מראסל"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مرحلة",
    "arabicVoc": "مَرْحَلَة",
    "hebrew": "שלב",
    "translit": "מרחלה",
    "plural": "مَرَاحِل"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مسألة",
    "arabicVoc": "مَسْأَلَة",
    "hebrew": "שאלה, בעייה",
    "translit": "מסאלה",
    "plural": "مَسَائِل"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "مستشار",
    "arabicVoc": "مُسْتَشَار",
    "hebrew": "יועץ (קנצלר)",
    "translit": "מסתשאר",
    "plural": "مُسْتَشَارُونَ"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مستقبل",
    "arabicVoc": "مُسْتَقْبَل",
    "hebrew": "עתיד",
    "translit": "מסתקבל"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مسلح",
    "arabicVoc": "مُسَلَّح",
    "hebrew": "חמוש, מזוין",
    "translit": "מסלח",
    "plural": "مُسَلَّحُونَ / مُسَلَّحِينَ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مسيرة",
    "arabicVoc": "مَسِيرَة",
    "hebrew": "תהליך, צעדה, תהלוכה",
    "translit": "מסירה"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مشروع",
    "arabicVoc": "مَشْرُوع",
    "hebrew": "פרויקט, תכנית",
    "translit": "משרוע",
    "plural": "ات مَشَارِيع"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مصدر",
    "arabicVoc": "مَصْدَر",
    "hebrew": "מקור",
    "translit": "מצדר",
    "plural": "مَصَادِر"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مظاهرة",
    "arabicVoc": "مُظَاهَرَة",
    "hebrew": "הפגנה",
    "translit": "מט׳אהרה",
    "plural": "مُظَاهَرَات"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "معارضة",
    "arabicVoc": "مُعَارَضَة",
    "hebrew": "אופוזיציה",
    "translit": "מעארצ׳ה"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "معلومات",
    "arabicVoc": "مَعْلُومَات",
    "hebrew": "ידיעות, אינפורמציה",
    "translit": "מעלומאת"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "مفاوضات",
    "arabicVoc": "مُفَاوَضَات",
    "hebrew": "משא ומתן",
    "translit": "מפאוצ׳את"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مقابل",
    "arabicVoc": "مُقَابِل",
    "hebrew": "תמורת, לעומת",
    "translit": "מקאבל"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "من أجل",
    "arabicVoc": "مِنْ أَجْل",
    "hebrew": "למען, כדי",
    "translit": "מנ אג׳ל"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "مناقشات",
    "arabicVoc": "مُنَاقَشَات",
    "hebrew": "דיונים",
    "translit": "מנאקשאת"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "مناورات",
    "arabicVoc": "مُنَاوَرَات",
    "hebrew": "תמרונים",
    "translit": "מנאוראת"
  },
  {
    "chapter": 5,
    "part": 2,
    "arabic": "مندوب",
    "arabicVoc": "مَنْدُوبَ",
    "hebrew": "נציג",
    "translit": "מנדוב",
    "plural": "مَنْدُوبُونَ / مَنْدُوبِينَ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "منذ",
    "arabicVoc": "مُنْذُ",
    "hebrew": "מאז, מזה, לפני",
    "translit": "מנד׳"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "مهنة",
    "arabicVoc": "مِهْنَة",
    "hebrew": "מקצוע",
    "translit": "מהנה",
    "plural": "مِهَن"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "ناطق بلسان",
    "arabicVoc": "نَاطِق بِلِسَان",
    "hebrew": "דובר מטעם",
    "translit": "נאטק בלסאנ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "ناقش",
    "arabicVoc": "نَاقَشَ",
    "hebrew": "דן, התווכח",
    "translit": "נאקש",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "نام",
    "arabicVoc": "نَامََ",
    "hebrew": "ישן",
    "translit": "נאמ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "نجاح",
    "arabicVoc": "نَجَاح",
    "hebrew": "הצלחה",
    "translit": "נג׳אח"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "نحو",
    "arabicVoc": "نَحْوَ",
    "hebrew": "בכיוון, לעבר, בערך",
    "translit": "נחו",
    "plural": "أَنْحَاء"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "في أنحاء البلاد",
    "arabicVoc": "فِي أَنْحَاء الْبِلاد",
    "hebrew": "ברחבי הארץ",
    "translit": "פי אנחאא אלבלאד"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "نسبة / بالنسبة إلى",
    "arabicVoc": "نِسْبَة / بِالنِّسْبَةَ إِلى",
    "hebrew": "אחוז, שיעור /",
    "translit": "נסבה / באלנסבה אלא"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "ل",
    "arabicVoc": "لِ",
    "hebrew": "ביחס ל-, לגבי-, לדעת",
    "translit": "ל"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "نص",
    "arabicVoc": "نَصّ",
    "hebrew": "טקסט",
    "translit": "נצ",
    "plural": "نُصُوص"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "نظير",
    "arabicVoc": "نَظِير",
    "hebrew": "עמית",
    "translit": "נט׳יר",
    "plural": "نُظَرَاء"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "نظام",
    "arabicVoc": "نِظَام",
    "hebrew": "משטר, שלטון, סדר",
    "translit": "נט׳אמ"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "نقل",
    "arabicVoc": "نَقَلَ",
    "hebrew": "העביר",
    "translit": "נקל",
    "plural": "نَقَلُونَ / نَقَلِينَ"
  },
  {
    "chapter": 5,
    "part": 1,
    "arabic": "هام مهم",
    "arabicVoc": "هَامّّ مُهِم",
    "hebrew": "חשוב",
    "translit": "האמ מהמ"
  },
  {
    "chapter": 5,
    "part": 4,
    "arabic": "هدف",
    "arabicVoc": "هَدَفََ",
    "hebrew": "שאף ל...הציב את כמטרה",
    "translit": "הדפ",
    "plural": "هَدَفَُونَ / هَدَفَِينَ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "هوية / بطاقة هوية",
    "arabicVoc": "هُوِيَّة / بِطَاقَة هُوِيَّة",
    "hebrew": "זהות / - תעודת זהות",
    "translit": "הויה / בטאקה הויה"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "واصل",
    "arabicVoc": "وَاصَلَ",
    "hebrew": "המשיך ב",
    "translit": "ואצל",
    "transitive": true
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وجب يجب أن",
    "arabicVoc": "وَجَب يْجَِبَُ أَن",
    "hebrew": "חובה ל",
    "translit": "וג׳ב יג׳ב אנ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وسيلة",
    "arabicVoc": "وَسِيلَة",
    "hebrew": "אמצעי",
    "translit": "וסילה",
    "plural": "وَسَائِل"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وكالة / وكالة",
    "arabicVoc": "وَكَالَة / وِكَالَة",
    "hebrew": "סוכנות",
    "translit": "וכאלה / וכאלה",
    "plural": "وَكَالَة / وِكَالَات"
  },
  {
    "chapter": 5,
    "part": 3,
    "arabic": "وضع",
    "arabicVoc": "وَضْع",
    "hebrew": "מצב",
    "translit": "וצ׳ע",
    "plural": "أَوْضَاع"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وطن",
    "arabicVoc": "وَطَن",
    "hebrew": "מולדת",
    "translit": "וטנ"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وطني",
    "arabicVoc": "وَطَني",
    "hebrew": "לאומי",
    "translit": "וטני"
  },
  {
    "chapter": 5,
    "part": 5,
    "arabic": "وقف إطلاق ٱلنار",
    "arabicVoc": "وَقْف إِطْلاَق ٱلنَّار",
    "hebrew": "הפסקת אש",
    "translit": "וקפ אטלאק אלנאר"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "إتهم",
    "arabicVoc": "إِتَّهَمَ",
    "hebrew": "האשים",
    "translit": "אתהמ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "أثر",
    "arabicVoc": "أَثَّرَ",
    "hebrew": "השפיע",
    "translit": "את׳ר"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أثناء",
    "arabicVoc": "أَثْنَاء",
    "hebrew": "בזמן-, במשך",
    "translit": "את׳נאא"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "إحتاج إلى",
    "arabicVoc": "إِحْتَاجََ إلى",
    "hebrew": "נזקק ל",
    "translit": "אחתאג׳ אלא"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "إحتج على",
    "arabicVoc": "إِحْتَجَّ عَلَى",
    "hebrew": "מחה על",
    "translit": "אחתג׳ עלא"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إحترم",
    "arabicVoc": "إِحْتَرَمَ",
    "hebrew": "כיבד",
    "translit": "אחתרמ"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "آخر أخرى",
    "arabicVoc": "آخَر أُخْرَى",
    "hebrew": "אחר, נוסף",
    "translit": "אח׳ר אח׳רא",
    "gender": "נקבה"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "أدى إلى",
    "arabicVoc": "أَدَّىَ إِلى",
    "hebrew": "גרם ל-, הביא לידי",
    "translit": "אדא אלא"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إرتفع",
    "arabicVoc": "إِرْتَفَعَ",
    "hebrew": "עלה, התרומם",
    "translit": "ארתפע"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إزداد",
    "arabicVoc": "إِزْدَادَ",
    "hebrew": "גדל, התרבה",
    "translit": "אזדאד"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إستخدم",
    "arabicVoc": "إِسْتَخْدَمَ",
    "hebrew": "השתמש ב",
    "translit": "אסתח׳דמ",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إستطاع",
    "arabicVoc": "إِسْتَطَاعَ",
    "hebrew": "יכול, היה ביכולתו",
    "translit": "אסתטאע"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إستعد ل",
    "arabicVoc": "إِسْتَعَدَِّ ل",
    "hebrew": "התכונן ל",
    "translit": "אסתעד ל"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "أسير",
    "arabicVoc": "أَسِير",
    "hebrew": "שבוי, אסיר",
    "translit": "אסיר",
    "plural": "أَسْرَى"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "أصاب",
    "arabicVoc": "أَصَابَ",
    "hebrew": "פגע ב-, פצע",
    "translit": "אצאב",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "مصاب",
    "arabicVoc": "مُصَاب",
    "hebrew": "נפגע, נפצע/ - פצוע",
    "translit": "מצאב"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أصبح",
    "arabicVoc": "أَصْبَحَ",
    "hebrew": "נהיה, נעשה",
    "translit": "אצבח"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أظهر",
    "arabicVoc": "أَظْهَرَ",
    "hebrew": "הראה",
    "translit": "אט׳הר"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "إعادة",
    "arabicVoc": "إِعَادَة",
    "hebrew": "חידוש",
    "translit": "אעאדה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إعتبارامن",
    "arabicVoc": "إِعْتِبَارًاْمِن",
    "hebrew": "החל מ",
    "translit": "אעתבאראמנ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "إعتبر",
    "arabicVoc": "إِعْتَبَرَ",
    "hebrew": "חשב את- ל... נחשב ל",
    "translit": "אעתבר",
    "verbPresent": "يُعْتَبَرُ",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "أفاد",
    "arabicVoc": "أَفَادَ",
    "hebrew": "מסר (ידיעה), הודיע",
    "translit": "אפאד"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أفرج عن",
    "arabicVoc": "أَفْرَجَ عَن",
    "hebrew": "שחרר",
    "translit": "אפרג׳ ענ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "أقام",
    "arabicVoc": "أَقَامَ",
    "hebrew": "הקים, ערך, שהה, התגורר",
    "translit": "אקאמ"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أقر",
    "arabicVoc": "أَقَر",
    "hebrew": "אישר",
    "translit": "אקר"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إلا",
    "arabicVoc": "إِلا",
    "hebrew": "אלא, מלבד",
    "translit": "אלא"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "ألبحر الأبيض المتوسط",
    "arabicVoc": "أَلْبَحْرُ الْأَبْيَض الْمُتَوَسِّط",
    "hebrew": "הים התיכון",
    "translit": "אלבחר אלאביצ׳ אלמתוסט"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "ألبحر الأحمر",
    "arabicVoc": "أَلْبَحْر الْأَحْمَر",
    "hebrew": "ים סוף (הים האדום)",
    "translit": "אלבחר אלאחמר"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إلتقى",
    "arabicVoc": "إِلْتَقَى",
    "hebrew": "פגש",
    "translit": "אלתקא"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "ألعامية",
    "arabicVoc": "أَلْعَامِّيَّة",
    "hebrew": "השפה) המדוברת",
    "translit": "אלעאמיה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "ألغى",
    "arabicVoc": "أَلْغَى",
    "hebrew": "ביטל",
    "translit": "אלע׳א"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "الفصحى",
    "arabicVoc": "الْفُصْحَى",
    "hebrew": "השפה הספרותית, התקנית (שפה רהוטה)",
    "translit": "אלפצחא"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "إمكانية",
    "arabicVoc": "إمْكَانِيَّة",
    "hebrew": "אפשרות",
    "translit": "אמכאניה",
    "plural": "إمْكَانِيَّات"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "أمين عام",
    "arabicVoc": "أَمِينّ عَام",
    "hebrew": "מזכ\"ל",
    "translit": "אמינ עאמ"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إنتهى",
    "arabicVoc": "إِنْتَهَى",
    "hebrew": "הסתיים",
    "translit": "אנתהא"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "إنضم إلى",
    "arabicVoc": "إِنْضَم إَلى",
    "hebrew": "הצטרף ל",
    "translit": "אנצ׳מ אלא"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "أوضح",
    "arabicVoc": "أَوْضَحَ",
    "hebrew": "הבהיר, הסביר",
    "translit": "אוצ׳ח"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "آية",
    "arabicVoc": "آيَة",
    "hebrew": "פסוק (מן הקוראן)",
    "translit": "איה",
    "plural": "آيَات"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "إيجابي",
    "arabicVoc": "إيجَابي",
    "hebrew": "חיובי",
    "translit": "איג׳אבי"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "أيد",
    "arabicVoc": "أَيَّدَ",
    "hebrew": "תמך ב",
    "translit": "איד",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "باحث",
    "arabicVoc": "بَاحِثَ",
    "hebrew": "חוקר",
    "translit": "באחת׳",
    "plural": "بَاحِثُونَ / بَاحِثِينَ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "بث",
    "arabicVoc": "بَثّ",
    "hebrew": "שידור",
    "translit": "בת׳"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "بدون / دون",
    "arabicVoc": "بِدُونَ / دُون",
    "hebrew": "ללא, מבלי...",
    "translit": "בדונ / דונ"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "بعض ال",
    "arabicVoc": "بَعْض ال",
    "hebrew": "מקצת, חלק",
    "translit": "בעצ׳ אל"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "بل",
    "arabicVoc": "بَلْ",
    "hebrew": "יתר על כן, אדרבה",
    "translit": "בל"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "بلغ",
    "arabicVoc": "بَلَغُ",
    "hebrew": "הגיע ל",
    "translit": "בלע׳",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "بناء على",
    "arabicVoc": "بِنَاءً عَلَى",
    "hebrew": "על סמך",
    "translit": "בנאא עלא"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "بواسطة",
    "arabicVoc": "بِوَاسِطَة",
    "hebrew": "באמצעות",
    "translit": "בואסטה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "بيئة",
    "arabicVoc": "بِيئَة",
    "hebrew": "סביבה",
    "translit": "ביאה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "بينما",
    "arabicVoc": "بَيْنَمَا",
    "hebrew": "בעוד ש",
    "translit": "בינמא"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "تابع ل",
    "arabicVoc": "تَابِعِ ل",
    "hebrew": "שייך ל",
    "translit": "תאבע ל"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "تسامح",
    "arabicVoc": "تَسَامُح",
    "hebrew": "סובלנות",
    "translit": "תסאמח"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "تسوية",
    "arabicVoc": "تَسْوِيَة",
    "hebrew": "הסדר",
    "translit": "תסויה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "تضمن",
    "arabicVoc": "تَضَمَّنَ",
    "hebrew": "כלל",
    "translit": "תצ׳מנ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "تمثل",
    "arabicVoc": "تَمََثَّل",
    "hebrew": "בא לידי ביטוי ב..., התאפיין ב..",
    "translit": "תמת׳ל"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "تمنى",
    "arabicVoc": "تمََنى",
    "hebrew": "איחל",
    "translit": "תמנא"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "تهدئة / هدنة",
    "arabicVoc": "تَهْدِئَة / هُدْنَة",
    "hebrew": "רגיעה, הפסקת אש, שקט",
    "translit": "תהדאה / הדנה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "تهمة",
    "arabicVoc": "تُهْمَة",
    "hebrew": "אשמה",
    "translit": "תהמה",
    "plural": "تُهَم"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "جزء",
    "arabicVoc": "جُزْء",
    "hebrew": "חלק",
    "translit": "ג׳זא",
    "plural": "أَجْزَاء"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "جمعية",
    "arabicVoc": "جَمْعِيَّة",
    "hebrew": "אגודה, ארגון",
    "translit": "ג׳מעיה"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "جمهورية",
    "arabicVoc": "جُمْهُورِيَّة",
    "hebrew": "רפובליקה",
    "translit": "ג׳מהוריה"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "جنسية",
    "arabicVoc": "جِنْسِيَّة",
    "hebrew": "אזרחות, נתינות",
    "translit": "ג׳נסיה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "جهاز",
    "arabicVoc": "جِهَاز",
    "hebrew": "מכשיר, מנגנון",
    "translit": "ג׳האז",
    "plural": "أَجْهِزَة"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "جواز سفر",
    "arabicVoc": "جَوَاز سَفَر",
    "hebrew": "דרכון",
    "translit": "ג׳ואז ספר",
    "plural": "جَوَازَات سَفَر"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "جيد",
    "arabicVoc": "جَيِّد",
    "hebrew": "טוב",
    "translit": "ג׳יד"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "حاجز",
    "arabicVoc": "حَاجِز",
    "hebrew": "מחסום",
    "translit": "חאג׳ז",
    "plural": "حَوَاجِز"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "حركة",
    "arabicVoc": "حرَكَة",
    "hebrew": "תנועה",
    "translit": "חרכה",
    "plural": "حرَكَات"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "حرية / حرية التعبير",
    "arabicVoc": "حُرِّيَّة / حُرِّيَّة التَّعْبِير",
    "hebrew": "חופש, חירות/ חופש הביטוי",
    "translit": "חריה / חריה אלתעביר"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "حسب",
    "arabicVoc": "حَسَب",
    "hebrew": "לפי, בהתאם ל...",
    "translit": "חסב"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "حصل على",
    "arabicVoc": "حَصَلَ عَلَى",
    "hebrew": "השיג, קיבל",
    "translit": "חצל עלא"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "حقق مع في",
    "arabicVoc": "حَقَّقَِ مَعَ في",
    "hebrew": "חקר את- על",
    "translit": "חקק מע פי"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "حمل",
    "arabicVoc": "حمََلِ",
    "hebrew": "נשא",
    "translit": "חמל"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "حملة",
    "arabicVoc": "حَمْلَة",
    "hebrew": "מסע, קמפיין, מבצע",
    "translit": "חמלה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "حياة",
    "arabicVoc": "حَيَاة",
    "hebrew": "חיים",
    "translit": "חיאה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "حين حينما",
    "arabicVoc": "حِينَ حِينَمَا",
    "hebrew": "בשעה ש, בזמן...",
    "translit": "חינ חינמא"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "خطة",
    "arabicVoc": "خُطَّةُ",
    "hebrew": "תכנית",
    "translit": "ח׳טה",
    "plural": "خطَط"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "دراسة",
    "arabicVoc": "دِرَاسَة",
    "hebrew": "מחקר",
    "translit": "דראסה",
    "plural": "دِرَاسَات"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "دعا",
    "arabicVoc": "دَعَا",
    "hebrew": "הזמין, קרא ל",
    "translit": "דעא"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "دعوة",
    "arabicVoc": "دَعْوَة",
    "hebrew": "הזמנה",
    "translit": "דעוה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "دفع",
    "arabicVoc": "دَفَعَ",
    "hebrew": "שילם, דחף",
    "translit": "דפע"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "ذكرى",
    "arabicVoc": "ذِكْرَى",
    "hebrew": "יום הזיכרון, יום השנה",
    "translit": "ד׳כרא"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "رأي",
    "arabicVoc": "رَأْي",
    "hebrew": "דעה",
    "translit": "ראי",
    "plural": "آرَاء"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "رجل أعمال",
    "arabicVoc": "رَجُل أَعْمَال",
    "hebrew": "איש עסקים",
    "translit": "רג׳ל אעמאל"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "رد",
    "arabicVoc": "رَدَّ",
    "hebrew": "ענה, השיב",
    "translit": "רד"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "ردا على",
    "arabicVoc": "رَدًّا عَلَى",
    "hebrew": "בתגובה ל-, בתשובה ל",
    "translit": "רדא עלא"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "رغبة في",
    "arabicVoc": "رَغْبَةًِ في",
    "hebrew": "מתוך רצון/שאיפה ל...",
    "translit": "רע׳בה פי"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "زاد",
    "arabicVoc": "زَادَ",
    "hebrew": "עלה על, התווסף ל",
    "translit": "זאד",
    "plural": "زَادُونَ / زَادِينَ"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "زميل",
    "arabicVoc": "زَمِيل",
    "hebrew": "עמית",
    "translit": "זמיל",
    "plural": "زُمَلاَء"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "سامية أللاسامية",
    "arabicVoc": "سَامِيَّة أَللّاسَامِيَّة",
    "hebrew": "שמיות, - אנטישמיות",
    "translit": "סאמיה אללאסאמיה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سجن",
    "arabicVoc": "سِجْن",
    "hebrew": "בית-כלא, בית-סוהר",
    "translit": "סג׳נ",
    "plural": "سُجُون"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سجين",
    "arabicVoc": "سَجِين",
    "hebrew": "אסיר",
    "translit": "סג׳ינ",
    "plural": "سُجَنَاء"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سر",
    "arabicVoc": "سِرّ",
    "hebrew": "סוד",
    "translit": "סר",
    "plural": "أَسْرَار"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سعر",
    "arabicVoc": "سِعْر",
    "hebrew": "מחיר",
    "translit": "סער",
    "plural": "أَسْعَار"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سلبي",
    "arabicVoc": "سَلْبي",
    "hebrew": "שלילי",
    "translit": "סלבי"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "سوى",
    "arabicVoc": "سِوَى",
    "hebrew": "מלבד-, חוץ מ",
    "translit": "סוא"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "سيطرة",
    "arabicVoc": "سَيْطَرَة",
    "hebrew": "שליטה",
    "translit": "סיטרה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "شاطئ",
    "arabicVoc": "شَاطِئ",
    "hebrew": "חוף",
    "translit": "שאטא",
    "plural": "شَوَاطِئ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "شامل",
    "arabicVoc": "شَامِل",
    "hebrew": "כולל, מקיף",
    "translit": "שאמל"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "شبكة",
    "arabicVoc": "شَبَكَة",
    "hebrew": "רשת/",
    "translit": "שבכה",
    "plural": "ات / شَبَكَة التَّوَاصُل"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "الاجتماعي",
    "arabicVoc": "الْاجْتِمَاعِي",
    "hebrew": "רשת חברתית",
    "translit": "אלאג׳תמאעי"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "شرط",
    "arabicVoc": "شَرْط",
    "hebrew": "תנאי",
    "translit": "שרט",
    "plural": "شُرُوط"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "شك / لا شك أن,في",
    "arabicVoc": "شَك / لاَ شَكَّ أَن,ِفي",
    "hebrew": "ספק /, – אין ספק ש",
    "translit": "שכ / לא שכ אנ,פי"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "شهادة",
    "arabicVoc": "شَهَادَة",
    "hebrew": "עדות, תעודה",
    "translit": "שהאדה"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "شهد",
    "arabicVoc": "شَهِدَ",
    "hebrew": "היה עד ל",
    "translit": "שהד"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "شيء",
    "arabicVoc": "شَيْء",
    "hebrew": "דבר",
    "translit": "שיא",
    "plural": "أَشْيَاء"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "صحة",
    "arabicVoc": "صِحَّة",
    "hebrew": "בריאות, אמיתות",
    "translit": "צחה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "صراع",
    "arabicVoc": "صِرَاع",
    "hebrew": "מאבק",
    "translit": "צראע"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "صلى",
    "arabicVoc": "صَلَّى",
    "hebrew": "התפלל",
    "translit": "צלא"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "صهيوني",
    "arabicVoc": "صَهْيُوني",
    "hebrew": "ציוני",
    "translit": "צהיוני"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "ضحية",
    "arabicVoc": "ضَحِيَّة",
    "hebrew": "קורבן",
    "translit": "צ׳חיה",
    "plural": "ضَحَايَا"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "ضمن",
    "arabicVoc": "ضِمْنَ",
    "hebrew": "בתוך",
    "translit": "צ׳מנ"
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "طالب",
    "arabicVoc": "طَالَبَ",
    "hebrew": "דרש מ",
    "translit": "טאלב",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 2,
    "arabic": "طب",
    "arabicVoc": "طِبّ",
    "hebrew": "רפואה",
    "translit": "טב"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "طريقة",
    "arabicVoc": "طَرِيقَة",
    "hebrew": "אמצעי, דרך, שיטה",
    "translit": "טריקה",
    "plural": "طُرُق طَرَائِق"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "ظاهرة",
    "arabicVoc": "ظَاهِرَة",
    "hebrew": "תופעה",
    "translit": "ט׳אהרה",
    "plural": "ظَوَاهِر"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "ظروف",
    "arabicVoc": "ظُرُوف",
    "hebrew": "תנאים, נסיבות",
    "translit": "ט׳רופ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "عاجل",
    "arabicVoc": "عَاجِل",
    "hebrew": "דחוף, מבזק חדשותי",
    "translit": "עאג׳ל"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "عبر",
    "arabicVoc": "عَبْرَ",
    "hebrew": "מעבר ל-, דרך",
    "translit": "עבר"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "عدم",
    "arabicVoc": "عَدَم",
    "hebrew": "מצדר – אי-, חוסר-, היעדר",
    "translit": "עדמ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "عقب",
    "arabicVoc": "عَقِبَ",
    "hebrew": "עקב, בעקבות",
    "translit": "עקב"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "علم / علمي",
    "arabicVoc": "عِلْم / عِلْمِيّ",
    "hebrew": "ידע, מדע / – מדעי",
    "translit": "עלמ / עלמי"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "عنف",
    "arabicVoc": "عُنْف",
    "hebrew": "אלימות",
    "translit": "ענפ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "غير",
    "arabicVoc": "غَيَّرَ",
    "hebrew": "שינה",
    "translit": "ע׳יר"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "غير",
    "arabicVoc": "غَيرْ",
    "hebrew": "זולת, מלבד, חוץ מ",
    "translit": "ע׳יר"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "فرد",
    "arabicVoc": "فَرْد",
    "hebrew": "איש",
    "translit": "פרד",
    "plural": "أَفْرَاد"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "فساد",
    "arabicVoc": "فَسَاد",
    "hebrew": "שחיתות",
    "translit": "פסאד"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "قانون",
    "arabicVoc": "قَانُون",
    "hebrew": "חוק",
    "translit": "קאנונ",
    "plural": "قَوَانِين"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "قتل",
    "arabicVoc": "قَتَلَُ",
    "hebrew": "הרג",
    "translit": "קתל"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "قدر",
    "arabicVoc": "قَدَّرَ",
    "hebrew": "העריך",
    "translit": "קדר"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "قناة",
    "arabicVoc": "قَنَاة",
    "hebrew": "ערוץ, תעלה, אפיק",
    "translit": "קנאה",
    "plural": "قَنَوَات"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "قيادة / قيادي",
    "arabicVoc": "قِيَادَة / قِيَادِيّ",
    "hebrew": "מפקדה, הנהגה/ - בכיר, מפקד, מנהיג",
    "translit": "קיאדה / קיאדי"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "قيمة",
    "arabicVoc": "قِيمَة",
    "hebrew": "ערך",
    "translit": "קימה",
    "plural": "قِيَم"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "كافة",
    "arabicVoc": "كَافَّة",
    "hebrew": "כל",
    "translit": "כאפה"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "كامل",
    "arabicVoc": "كَامِل",
    "hebrew": "שלם",
    "translit": "כאמל"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "كشف",
    "arabicVoc": "كَشَفِ",
    "hebrew": "גילה, חשף",
    "translit": "כשפ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "كهرباء",
    "arabicVoc": "كَهْرَبَاء",
    "hebrew": "חשמל",
    "translit": "כהרבאא"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "كيان",
    "arabicVoc": "كِيَان",
    "hebrew": "ישות",
    "translit": "כיאנ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "لا بد من",
    "arabicVoc": "لْاَ بُدَّ مِن",
    "hebrew": "אין מנוס מ",
    "translit": "לא בד מנ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "لاجئ",
    "arabicVoc": "لَاَجِئ",
    "hebrew": "פליט",
    "translit": "לאג׳א",
    "plural": "لَاَجِئُونَ / لَاَجِئِينَ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مادة",
    "arabicVoc": "مَادَّةّ",
    "hebrew": "חומר, נושא",
    "translit": "מאדה",
    "plural": "مَوَاد"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مباشر",
    "arabicVoc": "مُبَاشِر",
    "hebrew": "ישיר",
    "translit": "מבאשר"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مباشرة",
    "arabicVoc": "مُبَاشَرَةً",
    "hebrew": "מיד, ישירות ל",
    "translit": "מבאשרה"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مبدأ",
    "arabicVoc": "مَبْدَأ",
    "hebrew": "עיקרון, יסוד",
    "translit": "מבדא",
    "plural": "مَبَادِئ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مبلغ",
    "arabicVoc": "مَبْلَغ",
    "hebrew": "סכום",
    "translit": "מבלע׳",
    "plural": "مَبَالِغ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "متبادل",
    "arabicVoc": "مُتَبَادَل",
    "hebrew": "הדדי",
    "translit": "מתבאדל"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "مثلا",
    "arabicVoc": "مَثَلاً",
    "hebrew": "למשל",
    "translit": "מת׳לא"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مجلة",
    "arabicVoc": "مَجَلَّة",
    "hebrew": "מגזין, כתב עת",
    "translit": "מג׳לה",
    "plural": "مَجَلَّات"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مجلس",
    "arabicVoc": "مَجْلِس",
    "hebrew": "מועצה",
    "translit": "מג׳לס",
    "plural": "مجَالِس"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "محكمة",
    "arabicVoc": "مَحْكَمَة",
    "hebrew": "בית משפט/",
    "translit": "מחכמה",
    "plural": "مَحَاكِم"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "ألمحكمة العليا",
    "arabicVoc": "أَلْمَحْكَمَة الْعُلْيَا",
    "hebrew": "בית המשפט העליון",
    "translit": "אלמחכמה אלעליא"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "محلي",
    "arabicVoc": "مّحََلِّي",
    "hebrew": "מקומי",
    "translit": "מחלי"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مخدرات",
    "arabicVoc": "مُخَدِّرَات",
    "hebrew": "סמים",
    "translit": "מח׳דראת"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مخيم",
    "arabicVoc": "مُخَيَّم",
    "hebrew": "מחנה",
    "translit": "מח׳ימ",
    "plural": "مُخَيَّمات"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مدة",
    "arabicVoc": "مُدَّة",
    "hebrew": "פרק זמן",
    "translit": "מדה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "ألمزيد من",
    "arabicVoc": "أْلْمَزِيد مِن",
    "hebrew": "עוד, תוספת",
    "translit": "אלמזיד מנ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "مسؤولية",
    "arabicVoc": "مَسْؤُولِيَّة",
    "hebrew": "אחריות",
    "translit": "מסאוליה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "مستوى",
    "arabicVoc": "مُسْتَوَى",
    "hebrew": "רמה, דרג, מישור",
    "translit": "מסתוא"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مستوطن",
    "arabicVoc": "مُسْتَوْطِن",
    "hebrew": "מתיישב, מתנחל",
    "translit": "מסתוטנ",
    "plural": "مُسْتَوْطِنُونَ / مُسْتَوْطِنِينَ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "مشبوه",
    "arabicVoc": "مَشْبُوه",
    "hebrew": "חשוד",
    "translit": "משבוה",
    "plural": "مَشْبُوهُونَ / مَشْبُوهِينَ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "معاهدة",
    "arabicVoc": "مُعَاهَدَة",
    "hebrew": "חוזה, הסכם, ברית",
    "translit": "מעאהדה"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "معظم",
    "arabicVoc": "مُعْظَم",
    "hebrew": "רוב",
    "translit": "מעט׳מ"
  },
  {
    "chapter": 6,
    "part": 4,
    "arabic": "معين",
    "arabicVoc": "مُعَين",
    "hebrew": "ממונה, מסוים",
    "translit": "מעינ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مقر",
    "arabicVoc": "مَقَرّ",
    "hebrew": "מטה, מושב (של מפקדה), משכן",
    "translit": "מקר"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مناسب",
    "arabicVoc": "مُنَاسِب",
    "hebrew": "מתאים",
    "translit": "מנאסב"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "من ٱلممكن",
    "arabicVoc": "مِنَ ٱلْمُمْكِن",
    "hebrew": "אפשרי, יתכן",
    "translit": "מנ אלממכנ"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "منزل",
    "arabicVoc": "مَنْزِل",
    "hebrew": "בית, משכן",
    "translit": "מנזל",
    "plural": "مَنَازِل"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "منقبل",
    "arabicVoc": "مِنِقِبَلْ",
    "hebrew": "מטעם...",
    "translit": "מנקבל"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مهاجر",
    "arabicVoc": "مُهَاجِر",
    "hebrew": "מהגר",
    "translit": "מהאג׳ר",
    "plural": "مُهَاجِرُونَ / مُهَاجِرِينَ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "مهرجان",
    "arabicVoc": "مِهْرَجَان",
    "hebrew": "חגיגה, פסטיבל",
    "translit": "מהרג׳אנ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مهمة",
    "arabicVoc": "مُهِمَّةّ",
    "hebrew": "משימה, תפקיד",
    "translit": "מהמה",
    "plural": "ات مَهَام"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "موقع",
    "arabicVoc": "مَوْقِع",
    "hebrew": "אתר (באינטרנט), עמדה",
    "translit": "מוקע",
    "plural": "مَوَاقِع"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "موقف",
    "arabicVoc": "مَوْقِف",
    "hebrew": "תחנה, עמדה",
    "translit": "מוקפ",
    "plural": "مَوَاقِف"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "موقف من",
    "arabicVoc": "مَوْقِفِ مْن",
    "hebrew": "עמדה כלפי)",
    "translit": "מוקפ מנ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "ميدان",
    "arabicVoc": "مَيْدَان",
    "hebrew": "כיכר, שטח, שדה",
    "translit": "מידאנ"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "ميزانية",
    "arabicVoc": "مِيزَانِيَّة",
    "hebrew": "תקציב",
    "translit": "מיזאניה"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "مشروع ميزانية",
    "arabicVoc": "مَشْرُوع مِيزَانِيَّة",
    "hebrew": "הצעת תקציב",
    "translit": "משרוע מיזאניה"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "نائب",
    "arabicVoc": "نَائِب",
    "hebrew": "סגן, ציר (בפרלמנט)",
    "translit": "נאאב",
    "plural": "نُوَّاب"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "ناشط / نشيط",
    "arabicVoc": "نَاشِط / نَشِيط",
    "hebrew": "פעיל",
    "translit": "נאשט / נשיט",
    "plural": "نُشَطَاء"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "نشاط",
    "arabicVoc": "نَشَاط",
    "hebrew": "פעילות",
    "translit": "נשאט"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "نفى",
    "arabicVoc": "نَفَى",
    "hebrew": "הכחיש, שלל",
    "translit": "נפא"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "نفذ",
    "arabicVoc": "نَفَّذَ",
    "hebrew": "ביצע",
    "translit": "נפד׳"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "نفس ال",
    "arabicVoc": "نَفْس ال",
    "hebrew": "אותו ה",
    "translit": "נפס אל"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "نوع",
    "arabicVoc": "نَوْع",
    "hebrew": "סוג, מין",
    "translit": "נוע",
    "plural": "أَنْوَاع"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "نووي",
    "arabicVoc": "نَوَوِيّ",
    "hebrew": "גרעיני, אטומי",
    "translit": "נווי"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "هاجم",
    "arabicVoc": "هَاجَمَ",
    "hebrew": "תקף",
    "translit": "האג׳מ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "هبط",
    "arabicVoc": "هَبَطُ",
    "hebrew": "נחת",
    "translit": "הבט"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "هجوم",
    "arabicVoc": "هُجُوم",
    "hebrew": "התקפה",
    "translit": "הג׳ומ"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "هدد",
    "arabicVoc": "هَدَّدَ",
    "hebrew": "איים על",
    "translit": "הדד",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "هكذا",
    "arabicVoc": "هٰكَذَا",
    "hebrew": "כך",
    "translit": "הכד׳א"
  },
  {
    "chapter": 6,
    "part": 5,
    "arabic": "هيئة",
    "arabicVoc": "هَيْئَة",
    "hebrew": "ארגון, גוף, צוות",
    "translit": "היאה",
    "plural": "هَيْئَات"
  },
  {
    "chapter": 6,
    "part": 3,
    "arabic": "واجه",
    "arabicVoc": "وَاجَهَ",
    "hebrew": "עמד בפני, נתקל ב, התמודד עם",
    "translit": "ואג׳ה",
    "transitive": true
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "وحده",
    "arabicVoc": "وَحْدَهُ",
    "hebrew": "לבדו",
    "translit": "וחדה"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "وصف",
    "arabicVoc": "وَصَفِ",
    "hebrew": "תאר",
    "translit": "וצפ"
  },
  {
    "chapter": 6,
    "part": 1,
    "arabic": "يوجد",
    "arabicVoc": "يُوجَدُ",
    "hebrew": "ישנו, נמצא",
    "translit": "יוג׳ד"
  }
];
