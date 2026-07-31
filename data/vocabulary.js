// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py
// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.
//
// מקור: מאגר המילים הרשמי של משרד החינוך (כיתות ז'-י"ב, הפיקוח על הוראת
// ערבית, מאי 2015). VOCAB_CHAPTERS מחולק ל-6 "חלקים" (א'-ו') לפי רמת קושי
// מצטברת - לא לפי נושא. arabic הוא הכתיב הרגיל (ללא ניקוד, לשימוש פנימי
// בהשוואות בבוחן ובחיפוש בלבד); arabicVoc הוא הניקוד המלא כפי שסופק במקור
// (לא ניקוד ידני שלנו הפעם). translit הוא null כרגע (לא סופק במקור).
// שדות אופציונליים כשקיימים במקור: plural (צורת ריבוי), verbPresent (צורת
// עתיד/הווה של פועל), gender (מין דקדוקי), transitive (הפועל דורש מושא),
// response (ברכת המענה הנהוגה, למילות ברכה/נימוס).

const VOCAB_CHAPTERS = [
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
  },
  {
    "num": 6,
    "title": "חלק ו'"
  }
];

const VOCABULARY = [
  {
    "chapter": 1,
    "arabic": "أب",
    "arabicVoc": "أَب",
    "hebrew": "אבא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أبيض",
    "arabicVoc": "أَبْيَض",
    "hebrew": "לבן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "إبن",
    "arabicVoc": "إِبْن",
    "hebrew": "בן",
    "translit": null,
    "plural": "أَبْنَاء"
  },
  {
    "chapter": 1,
    "arabic": "أخ",
    "arabicVoc": "أَخ",
    "hebrew": "אח",
    "translit": null,
    "plural": "إخْوَة"
  },
  {
    "chapter": 1,
    "arabic": "أخت",
    "arabicVoc": "أُخْت",
    "hebrew": "אחות",
    "translit": null,
    "plural": "أَخَوَات"
  },
  {
    "chapter": 1,
    "arabic": "أديب",
    "arabicVoc": "أَدِيب",
    "hebrew": "אדיב, מנומס",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أذن",
    "arabicVoc": "أُذُن",
    "hebrew": "אוזן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أستاذ",
    "arabicVoc": "أُسْتَاذ",
    "hebrew": "מורה",
    "translit": null,
    "plural": "أَسَاتِذَة"
  },
  {
    "chapter": 1,
    "arabic": "إسرائيل",
    "arabicVoc": "إِسْرَائِيل",
    "hebrew": "ישראל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "إسم",
    "arabicVoc": "إِسْم",
    "hebrew": "שם",
    "translit": null,
    "plural": "أَسْمَاء"
  },
  {
    "chapter": 1,
    "arabic": "أكل",
    "arabicVoc": "أَكَلَ",
    "hebrew": "אכל",
    "translit": null,
    "verbPresent": "يَأْكُلُ"
  },
  {
    "chapter": 1,
    "arabic": "ألأردن",
    "arabicVoc": "أَلْأُرْدُنّ",
    "hebrew": "ירדן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ألقرآن",
    "arabicVoc": "أَلْقُرْآن",
    "hebrew": "הקוראן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "إلى",
    "arabicVoc": "إِلىَ",
    "hebrew": "ל-, אל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "إلى أين",
    "arabicVoc": "إَلىَ أَيْن",
    "hebrew": "לאן?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أم",
    "arabicVoc": "أُمّ",
    "hebrew": "אמא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أمام",
    "arabicVoc": "أَمَامَ",
    "hebrew": "מול, לפני (מקום)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أمس",
    "arabicVoc": "أِمْس",
    "hebrew": "אתמול",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنا",
    "arabicVoc": "أَنَا",
    "hebrew": "אני",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنت",
    "arabicVoc": "أَنْتَ",
    "hebrew": "אתה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنت",
    "arabicVoc": "أَنْتِ",
    "hebrew": "את",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنتم",
    "arabicVoc": "أَنْتُمْ",
    "hebrew": "אתם",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنتن",
    "arabicVoc": "أَنْتنّ",
    "hebrew": "אתן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أنف",
    "arabicVoc": "أَنْف",
    "hebrew": "אף",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أهل",
    "arabicVoc": "أَهْل",
    "hebrew": "משפחה, אנשי-, בני",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أهلا",
    "arabicVoc": "أَهْلاً",
    "hebrew": "שלום, ברוך הבא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أهلا وسهلا",
    "arabicVoc": "أَهْلًا وَسَهْلًا",
    "hebrew": "ברוך הבא",
    "translit": null,
    "response": "أَهْلًا فِيك"
  },
  {
    "chapter": 1,
    "arabic": "أو",
    "arabicVoc": "أَوْ",
    "hebrew": "או",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أورشليم القدس",
    "arabicVoc": "أُورشَلِيم الْقُدْس",
    "hebrew": "ירושלים",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أول",
    "arabicVoc": "أَوَّل",
    "hebrew": "ראשון",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "أين",
    "arabicVoc": "أَيْنَ",
    "hebrew": "היכן? איפה?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ب",
    "arabicVoc": "بِ",
    "hebrew": "ב-, באמצעות",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "باب",
    "arabicVoc": "بَاب",
    "hebrew": "דלת, שער",
    "translit": null,
    "plural": "أَبْوَاب"
  },
  {
    "chapter": 1,
    "arabic": "باص",
    "arabicVoc": "بَاص",
    "hebrew": "אוטובוס",
    "translit": null,
    "plural": "بَاصات"
  },
  {
    "chapter": 1,
    "arabic": "بدوي",
    "arabicVoc": "بَدَوِيّ",
    "hebrew": "בדווי, בדואי",
    "translit": null,
    "plural": "بَدْو"
  },
  {
    "chapter": 1,
    "arabic": "بريد",
    "arabicVoc": "بَرِيد",
    "hebrew": "דואר",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "بعد",
    "arabicVoc": "بَعْدَ",
    "hebrew": "אחרי (זמן)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "بلاد",
    "arabicVoc": "بِلاَد",
    "hebrew": "ארץ",
    "translit": null,
    "plural": "بُلْدَان",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "arabic": "بلد",
    "arabicVoc": "بَلَد",
    "hebrew": "עיר, ארץ",
    "translit": null,
    "plural": "بِلاَد",
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "arabic": "بنت",
    "arabicVoc": "بِنْت",
    "hebrew": "בת, ילדה",
    "translit": null,
    "plural": "بَنَات"
  },
  {
    "chapter": 1,
    "arabic": "بنك",
    "arabicVoc": "بَنْك",
    "hebrew": "בנק",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "بيت",
    "arabicVoc": "بَيْت",
    "hebrew": "בית",
    "translit": null,
    "plural": "بُيُوت"
  },
  {
    "chapter": 1,
    "arabic": "بيروت",
    "arabicVoc": "بَيْرُوت",
    "hebrew": "בירות (בירת לבנון)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "بين",
    "arabicVoc": "بَين",
    "hebrew": "בין",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "تل أبيب",
    "arabicVoc": "تَلّ أَبِيب",
    "hebrew": "תל-אביב",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "تلميذ",
    "arabicVoc": "تِلْمِيذ",
    "hebrew": "תלמיד",
    "translit": null,
    "plural": "تَلاَمِيذ"
  },
  {
    "chapter": 1,
    "arabic": "تلميذة",
    "arabicVoc": "تِلْمِيذَة",
    "hebrew": "תלמידה",
    "translit": null,
    "plural": "تِلْمِيذَات"
  },
  {
    "chapter": 1,
    "arabic": "تمرين",
    "arabicVoc": "تمرِين",
    "hebrew": "תרגיל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "توت",
    "arabicVoc": "تُوت",
    "hebrew": "תותים",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ثوب",
    "arabicVoc": "ثَوْب",
    "hebrew": "בגד",
    "translit": null,
    "plural": "ثِيَاب"
  },
  {
    "chapter": 1,
    "arabic": "جبل",
    "arabicVoc": "جَبَل",
    "hebrew": "הר",
    "translit": null,
    "plural": "جِبَال"
  },
  {
    "chapter": 1,
    "arabic": "جديد",
    "arabicVoc": "جَدِيد",
    "hebrew": "חדש",
    "translit": null,
    "plural": "جُدُد"
  },
  {
    "chapter": 1,
    "arabic": "جلس",
    "arabicVoc": "جَلَس",
    "hebrew": "ישב",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "جميل",
    "arabicVoc": "جَمِيل",
    "hebrew": "יפה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "حال",
    "arabicVoc": "حَال",
    "hebrew": "מצב",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "حليب",
    "arabicVoc": "حَلِيب",
    "hebrew": "חלב",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "حيفا",
    "arabicVoc": "حَيْفَا",
    "hebrew": "חיפה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "دار",
    "arabicVoc": "دَار",
    "hebrew": "בית, דירה",
    "translit": null,
    "plural": "دُور",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "arabic": "درزي",
    "arabicVoc": "دُرْزِيّ",
    "hebrew": "דרוזי",
    "translit": null,
    "plural": "دُرُوز"
  },
  {
    "chapter": 1,
    "arabic": "درس",
    "arabicVoc": "دَرَسَ",
    "hebrew": "למד",
    "translit": null,
    "verbPresent": "يَدْرُسُ"
  },
  {
    "chapter": 1,
    "arabic": "دفتر",
    "arabicVoc": "دَفْترَ",
    "hebrew": "מחברת",
    "translit": null,
    "plural": "دَفَاتِر"
  },
  {
    "chapter": 1,
    "arabic": "دكان",
    "arabicVoc": "دُكَّان",
    "hebrew": "חנות",
    "translit": null,
    "plural": "دَكَاكِين",
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "arabic": "دكتور",
    "arabicVoc": "دُكْتُور",
    "hebrew": "דוקטור, רופא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "دمشق",
    "arabicVoc": "دِمَشْق",
    "hebrew": "דמשק",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "دور",
    "arabicVoc": "دَوْر",
    "hebrew": "תור, תפקיד",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ذهب",
    "arabicVoc": "ذَهَبَ",
    "hebrew": "הלך",
    "translit": null,
    "verbPresent": "يَذْهَبُ"
  },
  {
    "chapter": 1,
    "arabic": "رأس",
    "arabicVoc": "رَأْس",
    "hebrew": "ראש",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "رأى",
    "arabicVoc": "رَأَى",
    "hebrew": "ראה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "رجع",
    "arabicVoc": "رَجَعَ",
    "hebrew": "חזר",
    "translit": null,
    "verbPresent": "يَرْجِعُ"
  },
  {
    "chapter": 1,
    "arabic": "رجل",
    "arabicVoc": "رِجْل",
    "hebrew": "רגל",
    "translit": null,
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "arabic": "رجل",
    "arabicVoc": "رَجُل",
    "hebrew": "גבר, איש",
    "translit": null,
    "plural": "رِجَال"
  },
  {
    "chapter": 1,
    "arabic": "رفيق",
    "arabicVoc": "رَفِيق",
    "hebrew": "חבר",
    "translit": null,
    "plural": "رِفَاق"
  },
  {
    "chapter": 1,
    "arabic": "ركب",
    "arabicVoc": "رَكِبَ",
    "hebrew": "נסע ב",
    "translit": null,
    "verbPresent": "يَرْكَبُ",
    "transitive": true
  },
  {
    "chapter": 1,
    "arabic": "زار",
    "arabicVoc": "زَارَ",
    "hebrew": "ביקר ב",
    "translit": null,
    "verbPresent": "يَزُور",
    "transitive": true
  },
  {
    "chapter": 1,
    "arabic": "زيارة",
    "arabicVoc": "زِيَارَة",
    "hebrew": "ביקור",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "زيت",
    "arabicVoc": "زَيْت",
    "hebrew": "שמן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "زيتون",
    "arabicVoc": "زَيْتُون",
    "hebrew": "זיתים",
    "translit": null,
    "gender": "זכר"
  },
  {
    "chapter": 1,
    "arabic": "ساعة",
    "arabicVoc": "سَاعَة",
    "hebrew": "שעה, שעון",
    "translit": null,
    "plural": "سَاعَات"
  },
  {
    "chapter": 1,
    "arabic": "سأل",
    "arabicVoc": "سَأَلَ",
    "hebrew": "שאל",
    "translit": null,
    "verbPresent": "يَسْأَلُ"
  },
  {
    "chapter": 1,
    "arabic": "سكن",
    "arabicVoc": "سَكَنَ",
    "hebrew": "גר, שכן",
    "translit": null,
    "verbPresent": "يَسْكُنُ"
  },
  {
    "chapter": 1,
    "arabic": "سلام",
    "arabicVoc": "سَلاَم",
    "hebrew": "שלום",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "سنة",
    "arabicVoc": "سَنَة",
    "hebrew": "שנה",
    "translit": null,
    "plural": "سَنَوات"
  },
  {
    "chapter": 1,
    "arabic": "سوريا",
    "arabicVoc": "سُوريَا",
    "hebrew": "סוריה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "شرب",
    "arabicVoc": "شَرِبَ",
    "hebrew": "שתה",
    "translit": null,
    "verbPresent": "يَشْرَبُ"
  },
  {
    "chapter": 1,
    "arabic": "شمس",
    "arabicVoc": "شَمْس",
    "hebrew": "שמש",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "شهر",
    "arabicVoc": "شَهْر",
    "hebrew": "חודש",
    "translit": null,
    "plural": "شُهُور"
  },
  {
    "chapter": 1,
    "arabic": "صباح",
    "arabicVoc": "صَبَاح",
    "hebrew": "בוקר",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "صباح الخير",
    "arabicVoc": "صَبَاحُ الْخَيْر",
    "hebrew": "בוקר טוב",
    "translit": null,
    "response": "صَبَاحُ النُّور"
  },
  {
    "chapter": 1,
    "arabic": "صغير",
    "arabicVoc": "صَغِير",
    "hebrew": "קטן",
    "translit": null,
    "plural": "صِغَار"
  },
  {
    "chapter": 1,
    "arabic": "صف",
    "arabicVoc": "صَفّ",
    "hebrew": "כיתה",
    "translit": null,
    "plural": "صُفُوف"
  },
  {
    "chapter": 1,
    "arabic": "ضيف",
    "arabicVoc": "ضَيْف",
    "hebrew": "אורח",
    "translit": null,
    "plural": "ضُيُوف"
  },
  {
    "chapter": 1,
    "arabic": "ظهر",
    "arabicVoc": "ظُهْر",
    "hebrew": "צהריים",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "عاصمة",
    "arabicVoc": "عَاصِمَة",
    "hebrew": "עיר בירה",
    "translit": null,
    "plural": "عَواصِم"
  },
  {
    "chapter": 1,
    "arabic": "عربي",
    "arabicVoc": "عَرَبيِّ",
    "hebrew": "ערבי",
    "translit": null,
    "plural": "عَرَب"
  },
  {
    "chapter": 1,
    "arabic": "على",
    "arabicVoc": "عَلَى",
    "hebrew": "על",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "عمان",
    "arabicVoc": "عَمَّان",
    "hebrew": "רבת-עמון (בירת ירדן)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "عمل",
    "arabicVoc": "عَمِلَ",
    "hebrew": "עבד, עשה",
    "translit": null,
    "verbPresent": "يَعْمَلُ"
  },
  {
    "chapter": 1,
    "arabic": "عند",
    "arabicVoc": "عِنْدَ",
    "hebrew": "אצל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "عين",
    "arabicVoc": "عَينْ",
    "hebrew": "עין, מעיין",
    "translit": null,
    "plural": "عُيُون",
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "arabic": "غرفة",
    "arabicVoc": "غُرْفَة",
    "hebrew": "חדר",
    "translit": null,
    "plural": "غُرَف"
  },
  {
    "chapter": 1,
    "arabic": "ف",
    "arabicVoc": "فَ",
    "hebrew": "ו-, ואז",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "فتح",
    "arabicVoc": "فَتَحَ",
    "hebrew": "פתח",
    "translit": null,
    "verbPresent": "يَفْتَحُ"
  },
  {
    "chapter": 1,
    "arabic": "في",
    "arabicVoc": "فِي",
    "hebrew": "ב-, בתוך",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "فم",
    "arabicVoc": "فَم",
    "hebrew": "פה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "قال",
    "arabicVoc": "قَالَ",
    "hebrew": "אמר",
    "translit": null,
    "verbPresent": "يَقُولُ"
  },
  {
    "chapter": 1,
    "arabic": "قبل",
    "arabicVoc": "قَبْلَ",
    "hebrew": "לפני (זמן)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "قرأ",
    "arabicVoc": "قَرَأَ",
    "hebrew": "קרא",
    "translit": null,
    "verbPresent": "يَقْرَأُ"
  },
  {
    "chapter": 1,
    "arabic": "قريب من",
    "arabicVoc": "قَرِيبْ مِن",
    "hebrew": "קרוב ל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "قليل",
    "arabicVoc": "قَلِيل",
    "hebrew": "מעט, קצת",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "قهوة",
    "arabicVoc": "قَهْوَة",
    "hebrew": "קפה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "كاتب",
    "arabicVoc": "كَاتِب",
    "hebrew": "סופר, פקיד",
    "translit": null,
    "plural": "كُتَّاب"
  },
  {
    "chapter": 1,
    "arabic": "كان",
    "arabicVoc": "كَانَ",
    "hebrew": "היה",
    "translit": null,
    "verbPresent": "يَكُونُ"
  },
  {
    "chapter": 1,
    "arabic": "كبير",
    "arabicVoc": "كَبِير",
    "hebrew": "גדול",
    "translit": null,
    "plural": "كِبَار"
  },
  {
    "chapter": 1,
    "arabic": "كتاب",
    "arabicVoc": "كِتَاب",
    "hebrew": "ספר",
    "translit": null,
    "plural": "كُتُب"
  },
  {
    "chapter": 1,
    "arabic": "كتب",
    "arabicVoc": "كَتَبَ",
    "hebrew": "כתב",
    "translit": null,
    "verbPresent": "يَكْتُبُ"
  },
  {
    "chapter": 1,
    "arabic": "كثير",
    "arabicVoc": "كَثِيرَ",
    "hebrew": "רב, הרבה",
    "translit": null,
    "plural": "كَثِيرُون"
  },
  {
    "chapter": 1,
    "arabic": "كل",
    "arabicVoc": "كُلّ",
    "hebrew": "כל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "كلب",
    "arabicVoc": "كَلْب",
    "hebrew": "כלב",
    "translit": null,
    "plural": "كِلاَب"
  },
  {
    "chapter": 1,
    "arabic": "كيف",
    "arabicVoc": "كَيْفَ",
    "hebrew": "איך",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "كيف حالك",
    "arabicVoc": "كَيْفَ حَالُكَ",
    "hebrew": "מה שלומך?",
    "translit": null,
    "response": "مَبْسُوط / مَبْسُوطَة"
  },
  {
    "chapter": 1,
    "arabic": "ل",
    "arabicVoc": "لِ",
    "hebrew": "ל",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "لا",
    "arabicVoc": "لَا",
    "hebrew": "לא (גם מילת שלילה להווה עתיד)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "لبس",
    "arabicVoc": "لَبِسَ",
    "hebrew": "לבש",
    "translit": null,
    "verbPresent": "يَلْبَسُ"
  },
  {
    "chapter": 1,
    "arabic": "لبنان",
    "arabicVoc": "لُبْنَان",
    "hebrew": "לבנון",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "لغة",
    "arabicVoc": "لُغَة",
    "hebrew": "שפה",
    "translit": null,
    "plural": "لُغَات"
  },
  {
    "chapter": 1,
    "arabic": "لماذا",
    "arabicVoc": "لِمَاذَا",
    "hebrew": "למה? מדוע?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "لوح",
    "arabicVoc": "لَوْح",
    "hebrew": "לוח",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ليل / ليلة",
    "arabicVoc": "لَيْل / لَيْلَة",
    "hebrew": "לילה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ما",
    "arabicVoc": "مَا",
    "hebrew": "לא (לשלילת העבר)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ما",
    "arabicVoc": "مَا",
    "hebrew": "מה? (מילת שאלה לפני שם עצם)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ماذا",
    "arabicVoc": "مَاذَا",
    "hebrew": "מה? (מילת שאלה לפני פועל)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "مدرسة",
    "arabicVoc": "مَدْرَسَة",
    "hebrew": "בית-ספר",
    "translit": null,
    "plural": "مَدارِس"
  },
  {
    "chapter": 1,
    "arabic": "مدير",
    "arabicVoc": "مُدِير",
    "hebrew": "מנהל",
    "translit": null,
    "plural": "مُدِيرُونَ / مُدَرَاء"
  },
  {
    "chapter": 1,
    "arabic": "مدينة",
    "arabicVoc": "مَدِينَة",
    "hebrew": "עיר",
    "translit": null,
    "plural": "مُدُن"
  },
  {
    "chapter": 1,
    "arabic": "مرحبا",
    "arabicVoc": "مَرْحَبًا",
    "hebrew": "שלום, ברוך הבא",
    "translit": null,
    "response": "مَرْحَبْتَيْن"
  },
  {
    "chapter": 1,
    "arabic": "مطبخ",
    "arabicVoc": "مَطْبَخ",
    "hebrew": "מטבח",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "مطر",
    "arabicVoc": "مَطَر",
    "hebrew": "גשם",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "مع",
    "arabicVoc": "مَعَ",
    "hebrew": "עם",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "معلم",
    "arabicVoc": "مُعَلِّمَ",
    "hebrew": "מורה",
    "translit": null,
    "plural": "مُعَلِّمُون"
  },
  {
    "chapter": 1,
    "arabic": "مكة",
    "arabicVoc": "مَكَّة",
    "hebrew": "מכה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "مكتب",
    "arabicVoc": "مَكْتَب",
    "hebrew": "משרד",
    "translit": null,
    "plural": "مَكَاتِب"
  },
  {
    "chapter": 1,
    "arabic": "مكتوب",
    "arabicVoc": "مَكْتوب",
    "hebrew": "מכתב",
    "translit": null,
    "plural": "مَكَاتِيب"
  },
  {
    "chapter": 1,
    "arabic": "ملك",
    "arabicVoc": "مَلِك",
    "hebrew": "מלך",
    "translit": null,
    "plural": "مُلُوك"
  },
  {
    "chapter": 1,
    "arabic": "من",
    "arabicVoc": "مِنْ",
    "hebrew": "מ-, מן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "من أين",
    "arabicVoc": "مِنَ أَيْنَ",
    "hebrew": "מהיכן?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "من",
    "arabicVoc": "مَنْ",
    "hebrew": "מי?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "نحن",
    "arabicVoc": "نَحْنُ",
    "hebrew": "אנחנו",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "نزل",
    "arabicVoc": "نَزَلَ",
    "hebrew": "ירד",
    "translit": null,
    "verbPresent": "يَنْزِلُ"
  },
  {
    "chapter": 1,
    "arabic": "نعم",
    "arabicVoc": "نَعَمْ",
    "hebrew": "כן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "نهر",
    "arabicVoc": "نَهْر",
    "hebrew": "נהר",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هذا",
    "arabicVoc": "هٰذَا",
    "hebrew": "זה, הזה",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هذه",
    "arabicVoc": "هٰذِهِ",
    "hebrew": "זאת, הזאת",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هل",
    "arabicVoc": "هَلْ",
    "hebrew": "האם?",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هم",
    "arabicVoc": "هُمْ",
    "hebrew": "הם",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هن",
    "arabicVoc": "هُن",
    "hebrew": "הן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هنا",
    "arabicVoc": "هُنَا",
    "hebrew": "כאן",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هناك",
    "arabicVoc": "هُنَاكَ",
    "hebrew": "שם",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هو",
    "arabicVoc": "هُوَ",
    "hebrew": "הוא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "هي",
    "arabicVoc": "هِيَ",
    "hebrew": "היא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "و",
    "arabicVoc": "وَ",
    "hebrew": "ו",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ورد",
    "arabicVoc": "وَرْد",
    "hebrew": "פרחים, ורדים",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "وزير",
    "arabicVoc": "وَزِير",
    "hebrew": "שר",
    "translit": null,
    "plural": "وُزَرَاء"
  },
  {
    "chapter": 1,
    "arabic": "وصل",
    "arabicVoc": "وَصَلَ",
    "hebrew": "הגיע, בא",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "ولد",
    "arabicVoc": "وَلَد",
    "hebrew": "ילד",
    "translit": null,
    "plural": "أَوْلاد"
  },
  {
    "chapter": 1,
    "arabic": "يا",
    "arabicVoc": "يَا",
    "hebrew": "הוי (מילת קריאה, פנייה)",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "يافا",
    "arabicVoc": "يَافَا",
    "hebrew": "יפו",
    "translit": null
  },
  {
    "chapter": 1,
    "arabic": "يد",
    "arabicVoc": "يَد",
    "hebrew": "יד",
    "translit": null,
    "gender": "נקבה"
  },
  {
    "chapter": 1,
    "arabic": "يهودي",
    "arabicVoc": "يَهُودِيّ",
    "hebrew": "יהודי",
    "translit": null,
    "plural": "يَهُود"
  },
  {
    "chapter": 1,
    "arabic": "يوم",
    "arabicVoc": "يَوْم",
    "hebrew": "יום",
    "translit": null,
    "plural": "أَيَّام"
  },
  {
    "chapter": 2,
    "arabic": "أخذ",
    "arabicVoc": "أَخَذَ",
    "hebrew": "לקח",
    "translit": null,
    "verbPresent": "يَأْخُذُ"
  },
  {
    "chapter": 2,
    "arabic": "أخير",
    "arabicVoc": "أَخِير",
    "hebrew": "אחרון",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أراد",
    "arabicVoc": "أَرَادَ",
    "hebrew": "רצה",
    "translit": null,
    "verbPresent": "يُرِيدُ"
  },
  {
    "chapter": 2,
    "arabic": "أرض",
    "arabicVoc": "أَرْض",
    "hebrew": "אדמה, ארץ",
    "translit": null,
    "plural": "أَرَاضِي",
    "gender": "נקבה"
  },
  {
    "chapter": 2,
    "arabic": "أركان ٱلإسلام",
    "arabicVoc": "أَرْكَان ٱلْإِسْلاَم",
    "hebrew": "עמודי האסלאם, מצוות היסוד של האסלאם",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أريحا",
    "arabicVoc": "أَرِيحَا",
    "hebrew": "יריחו",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أسبوع",
    "arabicVoc": "أُسْبُوع",
    "hebrew": "שבוע",
    "translit": null,
    "plural": "أَسَابِيع"
  },
  {
    "chapter": 2,
    "arabic": "ألإسلام",
    "arabicVoc": "أَلْإِسْلاَم",
    "hebrew": "אסלאם",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألجليل",
    "arabicVoc": "أَلْجَلِيل",
    "hebrew": "הגליל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألحج",
    "arabicVoc": "أَلْحَجّ",
    "hebrew": "העלייה לרגל (ממצוות היסוד באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألحمد لله",
    "arabicVoc": "أَلْحَمْدُ لِلّٰه",
    "hebrew": "השבח לאל, תודה לאל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألزكاة",
    "arabicVoc": "أَلزَّكَاة",
    "hebrew": "הצדקה (ממצוות היסוד באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألشهادة",
    "arabicVoc": "أَلشَّهَادَة",
    "hebrew": "העדות (ממצוות היסוד באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألصلاة",
    "arabicVoc": "أَلصَّلاَة",
    "hebrew": "התפילה (ממצוות היסוד באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألصوم",
    "arabicVoc": "أَلصَّوْم",
    "hebrew": "הצום (ממצוות היסוד באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألعراق",
    "arabicVoc": "أَلْعِرَاق",
    "hebrew": "עיראק",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألقادم",
    "arabicVoc": "ألْقَادِم",
    "hebrew": "הבא",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألقاهرة",
    "arabicVoc": "أَلْقَاهِرَة",
    "hebrew": "קהיר",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألكعبة",
    "arabicVoc": "أَلْكَعْبَة",
    "hebrew": "הכעבה (במכה)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألكويت",
    "arabicVoc": "أَلْكُوَيْت",
    "hebrew": "כווית",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أالله",
    "arabicVoc": "أَالله",
    "hebrew": "אללה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألماضي",
    "arabicVoc": "أَلْمَاضِي",
    "hebrew": "שעבר (יום, שבוע וכד')",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ألمملكة ٱلعربية ٱلسعودية",
    "arabicVoc": "أَلْمَمْلَكة ٱلْعَرَبِيّة ٱلسُّعُودِيّة",
    "hebrew": "ערב הסעודית",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أليابان",
    "arabicVoc": "أَلْيَابَان",
    "hebrew": "יפן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أمر",
    "arabicVoc": "أَمَرَ",
    "hebrew": "ציווה",
    "translit": null,
    "verbPresent": "يَأْمُرُ"
  },
  {
    "chapter": 2,
    "arabic": "أمس ٱلأول",
    "arabicVoc": "أَمْسِ ٱلْأَوَّل",
    "hebrew": "שלשום",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أمير",
    "arabicVoc": "أَمِير",
    "hebrew": "נסיך",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أميركا",
    "arabicVoc": "أَمِيركَا",
    "hebrew": "אמריקה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "إنسان",
    "arabicVoc": "إِنْسَان",
    "hebrew": "בן-אדם, איש",
    "translit": null,
    "plural": "نَاس"
  },
  {
    "chapter": 2,
    "arabic": "أوروبا",
    "arabicVoc": "أُورُوبَّا",
    "hebrew": "אירופה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أولى أول",
    "arabicVoc": "أُولى أَوَّل",
    "hebrew": "ראשונה (- ראשון)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أي",
    "arabicVoc": "أَيّ",
    "hebrew": "איזה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "إيران",
    "arabicVoc": "إِيرَان",
    "hebrew": "איראן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "أيضا",
    "arabicVoc": "أَيْضًا",
    "hebrew": "גם כן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "باريس",
    "arabicVoc": "بَارِيس",
    "hebrew": "פריס",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بحر",
    "arabicVoc": "بَحْر",
    "hebrew": "ים",
    "translit": null,
    "plural": "بحِار بحو ر"
  },
  {
    "chapter": 2,
    "arabic": "بدأ",
    "arabicVoc": "بَدَأَ",
    "hebrew": "התחיל",
    "translit": null,
    "verbPresent": "يَبْدَأُ"
  },
  {
    "chapter": 2,
    "arabic": "بريطانيا",
    "arabicVoc": "بَرِيطَانِيَا",
    "hebrew": "בריטניה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بستان",
    "arabicVoc": "بُسْتَان",
    "hebrew": "גן",
    "translit": null,
    "plural": "بَسَاتِين"
  },
  {
    "chapter": 2,
    "arabic": "بصل",
    "arabicVoc": "بَصَل",
    "hebrew": "בצל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بعد الظهر",
    "arabicVoc": "بَعْدَ الظُّهْر",
    "hebrew": "אחר הצהרים",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بعيد عن",
    "arabicVoc": "بَعِيدْ عَن",
    "hebrew": "רחוק מ",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بغداد",
    "arabicVoc": "بَغْدَاد",
    "hebrew": "בגדאד (בירת עיראק)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بلدية",
    "arabicVoc": "بَلَدِيَّة",
    "hebrew": "עירייה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "بنى",
    "arabicVoc": "بَنَى",
    "hebrew": "בנה",
    "translit": null,
    "verbPresent": "يَبْنِي"
  },
  {
    "chapter": 2,
    "arabic": "تحت",
    "arabicVoc": "تَحْتَ",
    "hebrew": "תחת, מתחת ל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ترك",
    "arabicVoc": "تَرَكَ",
    "hebrew": "עזב, השאיר",
    "translit": null,
    "verbPresent": "يَتْرُكُ"
  },
  {
    "chapter": 2,
    "arabic": "تعبان",
    "arabicVoc": "تَعْبَان",
    "hebrew": "עייף",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "تلفزيون",
    "arabicVoc": "تِلِفِزْيُون",
    "hebrew": "טלוויזיה",
    "translit": null,
    "plural": "تِلِفِزْيُونات"
  },
  {
    "chapter": 2,
    "arabic": "تلفون",
    "arabicVoc": "تِلِفُون",
    "hebrew": "טלפון",
    "translit": null,
    "plural": "تِلِفُونات"
  },
  {
    "chapter": 2,
    "arabic": "تلك",
    "arabicVoc": "تِلْكَ",
    "hebrew": "ההיא",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ثم",
    "arabicVoc": "ثمّ",
    "hebrew": "אחר כך",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "جار",
    "arabicVoc": "جَار",
    "hebrew": "שכן",
    "translit": null,
    "plural": "جِيرَان"
  },
  {
    "chapter": 2,
    "arabic": "جد",
    "arabicVoc": "جَدّ",
    "hebrew": "סב",
    "translit": null,
    "plural": "أَجْدَاد"
  },
  {
    "chapter": 2,
    "arabic": "جدة",
    "arabicVoc": "جَدَّة",
    "hebrew": "סבתא",
    "translit": null,
    "plural": "جَدَّات"
  },
  {
    "chapter": 2,
    "arabic": "جدا",
    "arabicVoc": "جِدًّا",
    "hebrew": "מאוד",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "جملة",
    "arabicVoc": "جُمْلة",
    "hebrew": "משפט",
    "translit": null,
    "plural": "جُمَل"
  },
  {
    "chapter": 2,
    "arabic": "جنوب",
    "arabicVoc": "جَنُوب",
    "hebrew": "דרום",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "جنوبي",
    "arabicVoc": "جَنُوبي",
    "hebrew": "דרומי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "جواب",
    "arabicVoc": "جَوَاب",
    "hebrew": "תשובה",
    "translit": null,
    "plural": "أَجْوِبَة"
  },
  {
    "chapter": 2,
    "arabic": "حاسوب",
    "arabicVoc": "حَاسُوب",
    "hebrew": "מחשב",
    "translit": null,
    "plural": "حَوَاسِيب"
  },
  {
    "chapter": 2,
    "arabic": "حفلة",
    "arabicVoc": "حَفْلَة",
    "hebrew": "מסיבה, חגיגה",
    "translit": null,
    "plural": "حَفَلاَت"
  },
  {
    "chapter": 2,
    "arabic": "حكاية",
    "arabicVoc": "حِكَايَة",
    "hebrew": "סיפור",
    "translit": null,
    "plural": "حِكَايَات"
  },
  {
    "chapter": 2,
    "arabic": "حكومة",
    "arabicVoc": "حُكُومَة",
    "hebrew": "ממשלה",
    "translit": null,
    "plural": "حُكُومَات"
  },
  {
    "chapter": 2,
    "arabic": "خال",
    "arabicVoc": "خَال",
    "hebrew": "דוד (מצד האם)",
    "translit": null,
    "plural": "أَخْوَال"
  },
  {
    "chapter": 2,
    "arabic": "خرج",
    "arabicVoc": "خَرَجَ",
    "hebrew": "יצא",
    "translit": null,
    "verbPresent": "يَخْرُجُ"
  },
  {
    "chapter": 2,
    "arabic": "خلال",
    "arabicVoc": "خِلاَلَ",
    "hebrew": "במשך, תוך (זמן)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "دخل",
    "arabicVoc": "دَخَلَ",
    "hebrew": "נכנס",
    "translit": null,
    "verbPresent": "يَدْخُلُ"
  },
  {
    "chapter": 2,
    "arabic": "درس",
    "arabicVoc": "دَرْس",
    "hebrew": "שיעור",
    "translit": null,
    "plural": "دُرُوس"
  },
  {
    "chapter": 2,
    "arabic": "دمشق",
    "arabicVoc": "دِمَشْق",
    "hebrew": "דמשק (בירת סוריה)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "دولة",
    "arabicVoc": "دَوْلَة",
    "hebrew": "מדינה",
    "translit": null,
    "plural": "دُوَل"
  },
  {
    "chapter": 2,
    "arabic": "دين",
    "arabicVoc": "دِين",
    "hebrew": "דת",
    "translit": null,
    "plural": "أَدْيَان"
  },
  {
    "chapter": 2,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "ההוא",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "رئيس",
    "arabicVoc": "رَئِيس",
    "hebrew": "נשיא, ראש",
    "translit": null,
    "plural": "رُؤَسَاء"
  },
  {
    "chapter": 2,
    "arabic": "رئيس الحكومة",
    "arabicVoc": "رَئِيس الْحُكُومَة",
    "hebrew": "ראש הממשלה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "رسالة",
    "arabicVoc": "رِسَالَة",
    "hebrew": "איגרת, מכתב",
    "translit": null,
    "plural": "رَسَائِل"
  },
  {
    "chapter": 2,
    "arabic": "رمضان",
    "arabicVoc": "رَمَضَان",
    "hebrew": "רמצ'אן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "زرع",
    "arabicVoc": "زَرَعَ",
    "hebrew": "זרע",
    "translit": null,
    "verbPresent": "يُزْرَعَ"
  },
  {
    "chapter": 2,
    "arabic": "زمان",
    "arabicVoc": "زَمَان",
    "hebrew": "זמן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "سؤال",
    "arabicVoc": "سُؤَال",
    "hebrew": "שאלה",
    "translit": null,
    "plural": "أَسْئِلَة"
  },
  {
    "chapter": 2,
    "arabic": "سافر",
    "arabicVoc": "سَافَرَ",
    "hebrew": "נסע",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "سمع",
    "arabicVoc": "سَمَِع",
    "hebrew": "שמע",
    "translit": null,
    "verbPresent": "يَسْمَعُ"
  },
  {
    "chapter": 2,
    "arabic": "سورة",
    "arabicVoc": "سُورَة",
    "hebrew": "סורה (פרק, פרשה בקוראן)",
    "translit": null,
    "plural": "سُوَر"
  },
  {
    "chapter": 2,
    "arabic": "سوق",
    "arabicVoc": "سُوق",
    "hebrew": "זו\"נ – שוק",
    "translit": null,
    "plural": "أَسْوَاق",
    "gender": "נקבה"
  },
  {
    "chapter": 2,
    "arabic": "شارع",
    "arabicVoc": "شَارِع",
    "hebrew": "רחוב",
    "translit": null,
    "plural": "شَوَارِع"
  },
  {
    "chapter": 2,
    "arabic": "شباك",
    "arabicVoc": "شُبَّاك",
    "hebrew": "חלון",
    "translit": null,
    "plural": "شَبَابِيك"
  },
  {
    "chapter": 2,
    "arabic": "شتاء",
    "arabicVoc": "شِتَاء",
    "hebrew": "חורף",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "شجرة",
    "arabicVoc": "شَجَرَة",
    "hebrew": "עץ",
    "translit": null,
    "plural": "أَشْجَار"
  },
  {
    "chapter": 2,
    "arabic": "شرق",
    "arabicVoc": "شَرْق",
    "hebrew": "מזרח",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "شرقي",
    "arabicVoc": "شَرْقِيّ",
    "hebrew": "מזרחי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "شكرا على",
    "arabicVoc": "شُكْرًا عَلَى",
    "hebrew": "תודה על",
    "translit": null,
    "response": "عَفْوًا"
  },
  {
    "chapter": 2,
    "arabic": "شمال",
    "arabicVoc": "شَمَال",
    "hebrew": "צפון, שמאל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "شمالي",
    "arabicVoc": "شّمََالي",
    "hebrew": "צפוני, שמאלי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "شيخ",
    "arabicVoc": "شَيْخ",
    "hebrew": "שיח', זקן",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "صيف",
    "arabicVoc": "صَيْف",
    "hebrew": "קיץ",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "ضحك",
    "arabicVoc": "ضَحِكَ",
    "hebrew": "צחק",
    "translit": null,
    "verbPresent": "يَضْحَكُ"
  },
  {
    "chapter": 2,
    "arabic": "طاولة",
    "arabicVoc": "طَاوِلَة",
    "hebrew": "שולחן",
    "translit": null,
    "plural": "طَاوِلَات"
  },
  {
    "chapter": 2,
    "arabic": "طبيب",
    "arabicVoc": "طَبِيب",
    "hebrew": "רופא",
    "translit": null,
    "plural": "أَطِبَّاء"
  },
  {
    "chapter": 2,
    "arabic": "طريق",
    "arabicVoc": "طَريق",
    "hebrew": "דרך, כביש",
    "translit": null,
    "plural": "طُرُق"
  },
  {
    "chapter": 2,
    "arabic": "طلب",
    "arabicVoc": "طَلَبَ",
    "hebrew": "ביקש",
    "translit": null,
    "verbPresent": "يَطْلُبُ"
  },
  {
    "chapter": 2,
    "arabic": "طويل",
    "arabicVoc": "طَوِيل",
    "hebrew": "ארוך, גבוה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "طيب",
    "arabicVoc": "طَيِّب",
    "hebrew": "טוב",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عائلة",
    "arabicVoc": "عائِلَة",
    "hebrew": "משפחה",
    "translit": null,
    "plural": "عائِلَات"
  },
  {
    "chapter": 2,
    "arabic": "عرف",
    "arabicVoc": "عَرَفَ",
    "hebrew": "ידע, הכיר",
    "translit": null,
    "verbPresent": "يَعْرِفُ"
  },
  {
    "chapter": 2,
    "arabic": "عسل",
    "arabicVoc": "عَسَل",
    "hebrew": "דבש",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عطلة",
    "arabicVoc": "عُطْلَة",
    "hebrew": "חופשה",
    "translit": null,
    "plural": "عُطْلَات"
  },
  {
    "chapter": 2,
    "arabic": "عكا",
    "arabicVoc": "عَكَّا",
    "hebrew": "עכו",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عم",
    "arabicVoc": "عَمّ",
    "hebrew": "דוד (מצד האב)",
    "translit": null,
    "plural": "أَعْمَام"
  },
  {
    "chapter": 2,
    "arabic": "عمل",
    "arabicVoc": "عَمَل",
    "hebrew": "עבודה",
    "translit": null,
    "plural": "أَعْمَال"
  },
  {
    "chapter": 2,
    "arabic": "عن",
    "arabicVoc": "عَنْ",
    "hebrew": "על, אודות",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عندما",
    "arabicVoc": "عِنْدَمَا",
    "hebrew": "כאשר",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عنوان",
    "arabicVoc": "عُنْوَان",
    "hebrew": "כתובת, כותרת",
    "translit": null,
    "plural": "عَنَاوِين"
  },
  {
    "chapter": 2,
    "arabic": "عيد",
    "arabicVoc": "عِيد",
    "hebrew": "חג",
    "translit": null,
    "plural": "أَعْيَاد"
  },
  {
    "chapter": 2,
    "arabic": "عيد الأضحى",
    "arabicVoc": "عِيدُ الْأَضْحَى",
    "hebrew": "חג הקרבן (באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عيد الفطر",
    "arabicVoc": "عِيدُ الْفِطْر",
    "hebrew": "חג הפסקת הצום (באסלאם)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "عيد ميلاد",
    "arabicVoc": "عِيد مِيلاَد",
    "hebrew": "יום הולדת",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "غدا",
    "arabicVoc": "غَدًا",
    "hebrew": "מחר",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "غرب",
    "arabicVoc": "غَرْب",
    "hebrew": "מערב",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "غربي",
    "arabicVoc": "غَرْبيّ",
    "hebrew": "מערבי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "فرنسا",
    "arabicVoc": "فَرَنْسَا",
    "hebrew": "צרפת",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "فلاح",
    "arabicVoc": "فَلاَّح",
    "hebrew": "איכר",
    "translit": null,
    "plural": "فَلاَّحُونَ"
  },
  {
    "chapter": 2,
    "arabic": "فندق",
    "arabicVoc": "فُنْدُق",
    "hebrew": "בית מלון, פונדק",
    "translit": null,
    "plural": "فَنادِق"
  },
  {
    "chapter": 2,
    "arabic": "فهم",
    "arabicVoc": "فَهِمَ",
    "hebrew": "הבין",
    "translit": null,
    "verbPresent": "يَفْهَمُ"
  },
  {
    "chapter": 2,
    "arabic": "فوق",
    "arabicVoc": "فَوْقَ",
    "hebrew": "על, מעל",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "فيلم",
    "arabicVoc": "فِيلم",
    "hebrew": "סרט",
    "translit": null,
    "plural": "أَفْلام"
  },
  {
    "chapter": 2,
    "arabic": "قام",
    "arabicVoc": "قَامَ",
    "hebrew": "קם",
    "translit": null,
    "verbPresent": "يَقُومُ"
  },
  {
    "chapter": 2,
    "arabic": "قام ب",
    "arabicVoc": "قَامَ بِ",
    "hebrew": "עסק ב-, ערך",
    "translit": null,
    "verbPresent": "يَقُومُ بِ"
  },
  {
    "chapter": 2,
    "arabic": "قام بزيارة",
    "arabicVoc": "قَامَ بِزِيَارَة",
    "hebrew": "ערך ביקור)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "قد",
    "arabicVoc": "قَدْ",
    "hebrew": "כבר (מילית להדגשת העבר)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "قدم",
    "arabicVoc": "قَدِمَ",
    "hebrew": "בא",
    "translit": null,
    "verbPresent": "يَقْدَمُ"
  },
  {
    "chapter": 2,
    "arabic": "قديم",
    "arabicVoc": "قَدِيم",
    "hebrew": "ישן, עתיק, קדום",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "قرية",
    "arabicVoc": "قَرْيَة",
    "hebrew": "כפר",
    "translit": null,
    "plural": "قُرَى قُرًى"
  },
  {
    "chapter": 2,
    "arabic": "قصة",
    "arabicVoc": "قِصَّة",
    "hebrew": "סיפור",
    "translit": null,
    "plural": "قِصَص"
  },
  {
    "chapter": 2,
    "arabic": "قصير",
    "arabicVoc": "قَصِير",
    "hebrew": "קצר, נמוך",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "قلم",
    "arabicVoc": "قَلَم",
    "hebrew": "עט",
    "translit": null,
    "plural": "أَقْلام"
  },
  {
    "chapter": 2,
    "arabic": "كرسي",
    "arabicVoc": "كُرْسِيٍّ",
    "hebrew": "כיסא",
    "translit": null,
    "plural": "كَرَاسِي كَرَاس"
  },
  {
    "chapter": 2,
    "arabic": "كلام",
    "arabicVoc": "كَلام",
    "hebrew": "דיבור, דברים",
    "translit": null,
    "gender": "זכר"
  },
  {
    "chapter": 2,
    "arabic": "لندن",
    "arabicVoc": "لَنْدَن",
    "hebrew": "לונדון",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "مبروك على",
    "arabicVoc": "مَبْرُوك عَلَى",
    "hebrew": "מזל טוב, תתחדש",
    "translit": null,
    "response": "اللهُ يُبَارِكْ فِيكَ"
  },
  {
    "chapter": 2,
    "arabic": "متى",
    "arabicVoc": "مَتىَ",
    "hebrew": "מתי?",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "مركز",
    "arabicVoc": "مَرْكَز",
    "hebrew": "מרכז",
    "translit": null,
    "plural": "مَرَاكِز"
  },
  {
    "chapter": 2,
    "arabic": "مركزي",
    "arabicVoc": "مَرْكَزِيّ",
    "hebrew": "מרכזי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "مريض",
    "arabicVoc": "مَرِيض",
    "hebrew": "חולה",
    "translit": null,
    "plural": "مَرْضَى"
  },
  {
    "chapter": 2,
    "arabic": "مساء",
    "arabicVoc": "مَسَاء",
    "hebrew": "ערב",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "مساء الخير",
    "arabicVoc": "مَسَاءُ الْخَير",
    "hebrew": "ערב טוב",
    "translit": null,
    "response": "مَسَاءُ النُّور"
  },
  {
    "chapter": 2,
    "arabic": "مسجد",
    "arabicVoc": "مَسْجِد",
    "hebrew": "מסגד",
    "translit": null,
    "plural": "مَسَاجِد"
  },
  {
    "chapter": 2,
    "arabic": "مسلم",
    "arabicVoc": "مُسْلِم",
    "hebrew": "מוסלמי",
    "translit": null,
    "plural": "مُسْلِمُوَن"
  },
  {
    "chapter": 2,
    "arabic": "مسيحي",
    "arabicVoc": "مَسِيحِيَّ",
    "hebrew": "נוצרי",
    "translit": null,
    "plural": "مَسِيحِيُّون"
  },
  {
    "chapter": 2,
    "arabic": "مصر",
    "arabicVoc": "مِصْر",
    "hebrew": "מצרים",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "مكان",
    "arabicVoc": "مَكَان",
    "hebrew": "מקום",
    "translit": null,
    "plural": "أَمَاكِن"
  },
  {
    "chapter": 2,
    "arabic": "مكتبة",
    "arabicVoc": "مَكْتَبَة",
    "hebrew": "ספרייה, מכתבה",
    "translit": null,
    "plural": "مَكْتَبَات"
  },
  {
    "chapter": 2,
    "arabic": "ممتاز",
    "arabicVoc": "مُمْتَاز",
    "hebrew": "מצוין",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "نبي",
    "arabicVoc": "نَبيِّ",
    "hebrew": "נביא",
    "translit": null,
    "plural": "أنْبِيَاء"
  },
  {
    "chapter": 2,
    "arabic": "هؤلاء",
    "arabicVoc": "هٰؤُلاءِ",
    "hebrew": "אלה, האלה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "والد",
    "arabicVoc": "وَالِد",
    "hebrew": "אב, הורה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "والدة",
    "arabicVoc": "وَالِدَة",
    "hebrew": "אם",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "وراء",
    "arabicVoc": "وَراءَ",
    "hebrew": "מאחורי (מקום)",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "وظيفة",
    "arabicVoc": "وَظِيفَة",
    "hebrew": "מטלה, תפקיד, משרה",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "وقف",
    "arabicVoc": "وَقَفَ",
    "hebrew": "עמד",
    "translit": null,
    "verbPresent": "يَقِفُ"
  },
  {
    "chapter": 2,
    "arabic": "يمين",
    "arabicVoc": "يَمِين",
    "hebrew": "ימין",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "يوم ٱلأحد",
    "arabicVoc": "يَوْم ٱلْأَحَد",
    "hebrew": "יום ראשון",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "يوم ٱلجمعة",
    "arabicVoc": "يَوْم ٱلْجُمْعَة",
    "hebrew": "יום שישי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "يوم ٱلخميس",
    "arabicVoc": "يَوْم ٱلْخَمِيس",
    "hebrew": "יום חמישי",
    "translit": null
  },
  {
    "chapter": 2,
    "arabic": "يوم ٱلسبت",
    "arabicVoc": "يَوْم ٱلسَّبْت",
    "hebrew": "יום שבת",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إتفاق",
    "arabicVoc": "إِتِّفَاق",
    "hebrew": "הסכם",
    "translit": null,
    "plural": "إِتِّفَاقات"
  },
  {
    "chapter": 3,
    "arabic": "إجتماع",
    "arabicVoc": "إجْتِمَاع",
    "hebrew": "פגישה, כינוס",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إجتمعب مع",
    "arabicVoc": "إَجْتَمَعَبِ مَع",
    "hebrew": "נפגש עם",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أحب",
    "arabicVoc": "أَحَبَّ",
    "hebrew": "אהב, רצה",
    "translit": null,
    "verbPresent": "يُحِبُّ"
  },
  {
    "chapter": 3,
    "arabic": "أحمر",
    "arabicVoc": "أَحْمَر",
    "hebrew": "אדום",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أخضر",
    "arabicVoc": "أَخْضَر",
    "hebrew": "ירוק",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أربع / ة",
    "arabicVoc": "أَرْبَع / ة",
    "hebrew": "ארבע/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أزرق",
    "arabicVoc": "أَزْرَق",
    "hebrew": "כחול",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إستغرق",
    "arabicVoc": "إِسْتَغْرَقَ",
    "hebrew": "נמשך, ארך",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إستراحة",
    "arabicVoc": "إِسْترَِاحَة",
    "hebrew": "הפסקה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إستقبل",
    "arabicVoc": "إِسْتَقْبَلَ",
    "hebrew": "קיבל את פני",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إستمع إلى",
    "arabicVoc": "إِسْتَمَعََ إلى",
    "hebrew": "הקשיב ל...",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أسود",
    "arabicVoc": "أَسْوَد",
    "hebrew": "שחור",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إشترك",
    "arabicVoc": "إِشْتَرَكَ",
    "hebrew": "השתתף",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أصغر",
    "arabicVoc": "أَصْغَر",
    "hebrew": "יותר קטן",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أصفر",
    "arabicVoc": "أَصْفَر",
    "hebrew": "צהוב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إفريقيا",
    "arabicVoc": "إِفْرِيقِيَا",
    "hebrew": "אפריקה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أكبر",
    "arabicVoc": "أَكْبرَ",
    "hebrew": "יותר גדול",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألأمم ٱلمتحدة",
    "arabicVoc": "ألْأُمَم ٱلْمُتَّحِدَة",
    "hebrew": "האו\"ם",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألتي",
    "arabicVoc": "أَلَّتي",
    "hebrew": "אשר (היא)",
    "translit": null,
    "gender": "נקבה"
  },
  {
    "chapter": 3,
    "arabic": "ألخليل",
    "arabicVoc": "أَلْخَلِيل",
    "hebrew": "חברון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألذي",
    "arabicVoc": "أَلَّذِي",
    "hebrew": "אשר (הוא)",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألذين",
    "arabicVoc": "أَلَّذِينَ",
    "hebrew": "אשר (הם)",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألشرق ٱلأوسط",
    "arabicVoc": "أَلشَّرْق ٱلْأَوْسَط",
    "hebrew": "המזרח התיכון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألضفة ٱلغربية",
    "arabicVoc": "أَلضِّفَّة ٱلْغَرْبِيَّة",
    "hebrew": "הגדה המערבית",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أللواتي",
    "arabicVoc": "أَللّوَاتيِ",
    "hebrew": "אשר (הן)",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألمانيا",
    "arabicVoc": "أَلْمَانياَ",
    "hebrew": "גרמניה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألناصرة",
    "arabicVoc": "ألنَّاصِرَة",
    "hebrew": "נצרת",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ألولايات ٱلمتحدة",
    "arabicVoc": "أَلْوِلاَيات ٱلْمُتَّحِدَة",
    "hebrew": "ארה\"ב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أما ف",
    "arabicVoc": "أَمَّا فَ",
    "hebrew": "באשר ל- הרי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إمتحان",
    "arabicVoc": "إِمْتِحَان",
    "hebrew": "מבחן",
    "translit": null,
    "plural": "إِمْتِحَانات"
  },
  {
    "chapter": 3,
    "arabic": "إمرأة",
    "arabicVoc": "إِمْرَأَة",
    "hebrew": "אישה",
    "translit": null,
    "plural": "نِسَاء"
  },
  {
    "chapter": 3,
    "arabic": "إنتخب",
    "arabicVoc": "إَنْتَخَب",
    "hebrew": "בחר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إنتظر",
    "arabicVoc": "إَنْتَظَر",
    "hebrew": "חיכה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "بٱلقرب من",
    "arabicVoc": "بِٱلْقُرْبْ مِن",
    "hebrew": "בקרבת",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "بداية",
    "arabicVoc": "بِدَايَة",
    "hebrew": "התחלה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "برنامج",
    "arabicVoc": "بَرْنَامَج",
    "hebrew": "תכנית",
    "translit": null,
    "plural": "بَرَامِج"
  },
  {
    "chapter": 3,
    "arabic": "بقي",
    "arabicVoc": "بَقِي",
    "hebrew": "נשאר",
    "translit": null,
    "verbPresent": "يَبْقَى"
  },
  {
    "chapter": 3,
    "arabic": "بكى",
    "arabicVoc": "بَكَى",
    "hebrew": "בכה",
    "translit": null,
    "verbPresent": "يَبْكِي"
  },
  {
    "chapter": 3,
    "arabic": "تاجر",
    "arabicVoc": "تَاجِر",
    "hebrew": "סוחר",
    "translit": null,
    "plural": "تُجَّار"
  },
  {
    "chapter": 3,
    "arabic": "تأريخ",
    "arabicVoc": "تَأرِيخْ",
    "hebrew": "היסטוריה, תאריך",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تجارة",
    "arabicVoc": "تِجَارَة",
    "hebrew": "מסחר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تسع / ة",
    "arabicVoc": "تِسْع / ة",
    "hebrew": "תשע/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تفضل / تفضلي",
    "arabicVoc": "تَفَضَّلْ / تَفَضَّلي",
    "hebrew": "בבקשה! התכבד/י!",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ثلاث / ة",
    "arabicVoc": "ثَلاث / ة",
    "hebrew": "שלוש/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ثمان",
    "arabicVoc": "ثَمَانٍ",
    "hebrew": "שמונה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ثمانية",
    "arabicVoc": "ثَمَانِيَة",
    "hebrew": "שמונה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "جاء",
    "arabicVoc": "جَاءَ",
    "hebrew": "בא",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "جامعة",
    "arabicVoc": "جَامِعَة",
    "hebrew": "אוניברסיטה",
    "translit": null,
    "plural": "جَامِعَات"
  },
  {
    "chapter": 3,
    "arabic": "ألجامعة العربية",
    "arabicVoc": "أَلْجَامِعَة الْعَرَبِيَّة",
    "hebrew": "הליגה הערבית)",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "جريدة",
    "arabicVoc": "جَرِيدَة",
    "hebrew": "עיתון",
    "translit": null,
    "plural": "جَرَائِد"
  },
  {
    "chapter": 3,
    "arabic": "جلسة",
    "arabicVoc": "جَلْسَة",
    "hebrew": "ישיבה",
    "translit": null,
    "plural": "جَلَسَات"
  },
  {
    "chapter": 3,
    "arabic": "حرب",
    "arabicVoc": "حَرْب",
    "hebrew": "מלחמה",
    "translit": null,
    "plural": "حُرُوب"
  },
  {
    "chapter": 3,
    "arabic": "حزب",
    "arabicVoc": "حِزْب",
    "hebrew": "מפלגה",
    "translit": null,
    "plural": "أَحْزَاب"
  },
  {
    "chapter": 3,
    "arabic": "حضر",
    "arabicVoc": "حَضَّرَ",
    "hebrew": "הכין",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "حمام",
    "arabicVoc": "حَمَّام",
    "hebrew": "אמבטיה, מקלחת",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "خارطة خريطة",
    "arabicVoc": "خَارِطَة خَرِيطَة",
    "hebrew": "מפה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "خبز",
    "arabicVoc": "خُبْز",
    "hebrew": "לחם",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "خليج",
    "arabicVoc": "خَلِيج",
    "hebrew": "מפרץ",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "خمس / ة",
    "arabicVoc": "خَمْس / ة",
    "hebrew": "חמש/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ذكر",
    "arabicVoc": "ذَكَرَ",
    "hebrew": "זכר, ציין",
    "translit": null,
    "verbPresent": "يَذْكُرُ"
  },
  {
    "chapter": 3,
    "arabic": "راكب",
    "arabicVoc": "رَاكِب",
    "hebrew": "נוסע",
    "translit": null,
    "plural": "رُكَّاب"
  },
  {
    "chapter": 3,
    "arabic": "رئيس البلدية",
    "arabicVoc": "رَئِيس الْبَلَدِيَّة",
    "hebrew": "ראש העיר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "رئيسي",
    "arabicVoc": "رَئِيسِيّ",
    "hebrew": "ראשי, עיקרי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "رحلة",
    "arabicVoc": "رِحْلَة",
    "hebrew": "טיול",
    "translit": null,
    "plural": "رِحْلَات"
  },
  {
    "chapter": 3,
    "arabic": "رسمي",
    "arabicVoc": "رَسْمِيّ",
    "hebrew": "רשמי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "زوج / ة",
    "arabicVoc": "زَوْج / ة",
    "hebrew": "בעל/ אשת, בן/בת-זוג",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ساحة",
    "arabicVoc": "سَاحَة",
    "hebrew": "חצר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ساحل",
    "arabicVoc": "سَاحِل",
    "hebrew": "חוף",
    "translit": null,
    "plural": "سَوَاحِل"
  },
  {
    "chapter": 3,
    "arabic": "ساكن",
    "arabicVoc": "سَاكِن",
    "hebrew": "תושב",
    "translit": null,
    "plural": "سُكّان"
  },
  {
    "chapter": 3,
    "arabic": "سبع / ة",
    "arabicVoc": "سَبْع / ة",
    "hebrew": "שבע/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ست / ة",
    "arabicVoc": "سِتّ / ة",
    "hebrew": "שש/ה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "سفير",
    "arabicVoc": "سَفِير",
    "hebrew": "שגריר",
    "translit": null,
    "plural": "سُفَرَاء"
  },
  {
    "chapter": 3,
    "arabic": "سيارة",
    "arabicVoc": "سَيارَة",
    "hebrew": "מכונית",
    "translit": null,
    "plural": "سَيارَات"
  },
  {
    "chapter": 3,
    "arabic": "سيد",
    "arabicVoc": "سَيِّد",
    "hebrew": "אדון, מר",
    "translit": null,
    "plural": "سَادَة"
  },
  {
    "chapter": 3,
    "arabic": "سيدة",
    "arabicVoc": "سَيِّدَة",
    "hebrew": "גברת",
    "translit": null,
    "plural": "سَيِّدَات"
  },
  {
    "chapter": 3,
    "arabic": "شاهد",
    "arabicVoc": "شَاهَدَ",
    "hebrew": "צפה ב-, ראה",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 3,
    "arabic": "شاي",
    "arabicVoc": "شَاي",
    "hebrew": "תה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "شكر",
    "arabicVoc": "شَكَرَ",
    "hebrew": "הודה ל",
    "translit": null,
    "verbPresent": "يَشْكُرُ",
    "transitive": true
  },
  {
    "chapter": 3,
    "arabic": "صاحب",
    "arabicVoc": "صَاحِب",
    "hebrew": "חבר, בעל (רכוש)",
    "translit": null,
    "plural": "أَصْحَاب"
  },
  {
    "chapter": 3,
    "arabic": "صحيح",
    "arabicVoc": "صَحِيح",
    "hebrew": "נכון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "صحيفة",
    "arabicVoc": "صَحِيفَة",
    "hebrew": "עיתון",
    "translit": null,
    "plural": "صُحُف"
  },
  {
    "chapter": 3,
    "arabic": "صديق",
    "arabicVoc": "صَدِيق",
    "hebrew": "חבר, ידיד",
    "translit": null,
    "plural": "أَصْدِقَاء"
  },
  {
    "chapter": 3,
    "arabic": "صفحة",
    "arabicVoc": "صَفْحَة",
    "hebrew": "עמוד (בספר)",
    "translit": null,
    "plural": "صَفَحَات"
  },
  {
    "chapter": 3,
    "arabic": "صورة",
    "arabicVoc": "صُورَة",
    "hebrew": "תמונה, צורה",
    "translit": null,
    "plural": "صُوَر"
  },
  {
    "chapter": 3,
    "arabic": "طائرة",
    "arabicVoc": "طَائِرَة",
    "hebrew": "מטוס",
    "translit": null,
    "plural": "طَائِرَات"
  },
  {
    "chapter": 3,
    "arabic": "طالب",
    "arabicVoc": "طَالِب",
    "hebrew": "סטודנט",
    "translit": null,
    "plural": "طُلاَّب"
  },
  {
    "chapter": 3,
    "arabic": "طبريا",
    "arabicVoc": "طَبرَِيَّا",
    "hebrew": "טבריה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "طعام",
    "arabicVoc": "طَعَام",
    "hebrew": "אוכל, מזון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "عاد",
    "arabicVoc": "عَادَ",
    "hebrew": "חזר",
    "translit": null,
    "verbPresent": "يَعُودُ"
  },
  {
    "chapter": 3,
    "arabic": "عالم",
    "arabicVoc": "عَالمَ",
    "hebrew": "עולם",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "عام",
    "arabicVoc": "عَام",
    "hebrew": "שנה",
    "translit": null,
    "plural": "أَعْوَام"
  },
  {
    "chapter": 3,
    "arabic": "عامل",
    "arabicVoc": "عَامِل",
    "hebrew": "פועל, עובד",
    "translit": null,
    "plural": "عُمَّال"
  },
  {
    "chapter": 3,
    "arabic": "عزيز",
    "arabicVoc": "عَزِيز",
    "hebrew": "יקר, אהוב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "عشر",
    "arabicVoc": "عَشْر",
    "hebrew": "עשר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "عشرة",
    "arabicVoc": "عَشَرَة",
    "hebrew": "עשרה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "عظيم",
    "arabicVoc": "عَظِيم",
    "hebrew": "גדול, עצום",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "علم",
    "arabicVoc": "عَلَّمَ",
    "hebrew": "לימד",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "غادر",
    "arabicVoc": "غَادَرَ",
    "hebrew": "עזב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "غرب",
    "arabicVoc": "غَرْب",
    "hebrew": "מערב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "غزة",
    "arabicVoc": "غَزَّة",
    "hebrew": "עזה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "غني",
    "arabicVoc": "غَنيِّ",
    "hebrew": "עשיר",
    "translit": null,
    "plural": "أَغْنِيَاء"
  },
  {
    "chapter": 3,
    "arabic": "فجأة",
    "arabicVoc": "فَجْأَةً",
    "hebrew": "פתאום",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "فريق",
    "arabicVoc": "فَرِيق",
    "hebrew": "קבוצה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "فصل",
    "arabicVoc": "فَصْل",
    "hebrew": "עונה, פרק",
    "translit": null,
    "plural": "فُصُول"
  },
  {
    "chapter": 3,
    "arabic": "فقير",
    "arabicVoc": "فَقِير",
    "hebrew": "עני",
    "translit": null,
    "plural": "فُقَرَاء"
  },
  {
    "chapter": 3,
    "arabic": "فكر في",
    "arabicVoc": "فَكَّرَ في",
    "hebrew": "הרהר ב-, חשב על",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "فنجان",
    "arabicVoc": "فِنْجَان",
    "hebrew": "ספל",
    "translit": null,
    "plural": "فَنَاجِين"
  },
  {
    "chapter": 3,
    "arabic": "قدم",
    "arabicVoc": "قَدَّمَ",
    "hebrew": "הגיש",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "قراءة",
    "arabicVoc": "قِرَاءَة",
    "hebrew": "קריאה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "قطار",
    "arabicVoc": "قِطَار",
    "hebrew": "רכבת",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "قعد",
    "arabicVoc": "قَعَدَ",
    "hebrew": "ישב",
    "translit": null,
    "verbPresent": "يَقْعُدُ"
  },
  {
    "chapter": 3,
    "arabic": "كرة",
    "arabicVoc": "كُرَة",
    "hebrew": "כדור",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "كلمة",
    "arabicVoc": "كَلِمَة",
    "hebrew": "מילה",
    "translit": null,
    "plural": "كَلِمَات"
  },
  {
    "chapter": 3,
    "arabic": "لاعب",
    "arabicVoc": "لَاَعِب",
    "hebrew": "שחקן",
    "translit": null,
    "plural": "لاَعِبُون"
  },
  {
    "chapter": 3,
    "arabic": "لعب",
    "arabicVoc": "لَعِبَ",
    "hebrew": "שיחק",
    "translit": null,
    "verbPresent": "يَلْعَبُ"
  },
  {
    "chapter": 3,
    "arabic": "لقاء",
    "arabicVoc": "لِقَاء",
    "hebrew": "פגישה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "إلى اللقاء",
    "arabicVoc": "إِلىَ اللِّقَاء",
    "hebrew": "להתראות",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "لما",
    "arabicVoc": "لَمَّا",
    "hebrew": "כאשר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "لون",
    "arabicVoc": "لَوْن",
    "hebrew": "צבע",
    "translit": null,
    "plural": "أَلْوَان"
  },
  {
    "chapter": 3,
    "arabic": "ماء",
    "arabicVoc": "مَاء",
    "hebrew": "מים",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "مأكولات",
    "arabicVoc": "مَأْكُولاَت",
    "hebrew": "מאכלים",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "مباراة",
    "arabicVoc": "مُبَارَاة",
    "hebrew": "תחרות",
    "translit": null,
    "plural": "مُبَارَيَات"
  },
  {
    "chapter": 3,
    "arabic": "محادثات",
    "arabicVoc": "مُحَادَثَات",
    "hebrew": "שיחות",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "محطة",
    "arabicVoc": "مَحَطَّة",
    "hebrew": "תחנה",
    "translit": null,
    "plural": "مَحَطَّات"
  },
  {
    "chapter": 3,
    "arabic": "مرة",
    "arabicVoc": "مَرَّة",
    "hebrew": "פעם",
    "translit": null,
    "plural": "مَرَّات"
  },
  {
    "chapter": 3,
    "arabic": "مشغول",
    "arabicVoc": "مَشْغُول",
    "hebrew": "עסוק, תפוס (מקום, קו...)",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "مشكلة",
    "arabicVoc": "مُشْكِلَة",
    "hebrew": "בעיה",
    "translit": null,
    "plural": "مَشَاكِل"
  },
  {
    "chapter": 3,
    "arabic": "مشهور",
    "arabicVoc": "مَشْهُور",
    "hebrew": "מפורסם",
    "translit": null,
    "plural": "مَشْهُورُون"
  },
  {
    "chapter": 3,
    "arabic": "مطار",
    "arabicVoc": "مَطَار",
    "hebrew": "שדה תעופה",
    "translit": null,
    "plural": "مَطَارات"
  },
  {
    "chapter": 3,
    "arabic": "مطعم",
    "arabicVoc": "مَطْعَم",
    "hebrew": "מסעדה",
    "translit": null,
    "plural": "مَطَاعِم"
  },
  {
    "chapter": 3,
    "arabic": "مطلوب",
    "arabicVoc": "مَطْلُوبَ",
    "hebrew": "מבוקש, דרוש",
    "translit": null,
    "plural": "مَطْلُوبُون"
  },
  {
    "chapter": 3,
    "arabic": "معا",
    "arabicVoc": "مَعًا",
    "hebrew": "יחד",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "مفهوم",
    "arabicVoc": "مَفْهُوم",
    "hebrew": "מובן",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "مقدس",
    "arabicVoc": "مُقَدَّس",
    "hebrew": "קדוש",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ممثل",
    "arabicVoc": "مُمَثِّل",
    "hebrew": "נציג, שחקן (תיאטרון)",
    "translit": null,
    "plural": "مُمَثِّلُون"
  },
  {
    "chapter": 3,
    "arabic": "ممنوع",
    "arabicVoc": "مَمْنُوع",
    "hebrew": "אסור",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "منطقة",
    "arabicVoc": "مِنْطَقَة",
    "hebrew": "אזור",
    "translit": null,
    "plural": "مَنَاطِق"
  },
  {
    "chapter": 3,
    "arabic": "منظمة",
    "arabicVoc": "مُنَظَّمَة",
    "hebrew": "ארגון",
    "translit": null,
    "plural": "مُنَظَّمَات"
  },
  {
    "chapter": 3,
    "arabic": "مهندس",
    "arabicVoc": "مُهَنْدِسَ",
    "hebrew": "מהנדס",
    "translit": null,
    "plural": "مُهَنْدِسُون"
  },
  {
    "chapter": 3,
    "arabic": "موضوع",
    "arabicVoc": "مَوْضُوع",
    "hebrew": "נושא",
    "translit": null,
    "plural": "مَوَاضِيع"
  },
  {
    "chapter": 3,
    "arabic": "نابلس",
    "arabicVoc": "نَابْلُس",
    "hebrew": "שכם",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "نشر",
    "arabicVoc": "نَشَرَ",
    "hebrew": "פרסם",
    "translit": null,
    "verbPresent": "يَنْشُرُ"
  },
  {
    "chapter": 3,
    "arabic": "نصف",
    "arabicVoc": "نِصْف",
    "hebrew": "חצי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "نظر إلى",
    "arabicVoc": "نَظَرَ إِلَى",
    "hebrew": "הביט, הסתכל",
    "translit": null,
    "verbPresent": "يَنْظُرُ إِلَى"
  },
  {
    "chapter": 3,
    "arabic": "نظيف",
    "arabicVoc": "نَظِيف",
    "hebrew": "נקי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ناية",
    "arabicVoc": "نَِاية",
    "hebrew": "סוף",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "هاتف",
    "arabicVoc": "هَاتِف",
    "hebrew": "טלפון",
    "translit": null,
    "plural": "هَوَاتِف"
  },
  {
    "chapter": 3,
    "arabic": "هام",
    "arabicVoc": "هَامّ",
    "hebrew": "חשוב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "هدية",
    "arabicVoc": "هَدِيَّة",
    "hebrew": "מתנה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "هرم",
    "arabicVoc": "هَرَم",
    "hebrew": "פירמידה",
    "translit": null,
    "plural": "أَهْرَام"
  },
  {
    "chapter": 3,
    "arabic": "واحد",
    "arabicVoc": "وَاحِد",
    "hebrew": "אחד",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "واسع",
    "arabicVoc": "وَاسِع",
    "hebrew": "מרווח, רחב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "واشنطن",
    "arabicVoc": "وَاشِنْطُن",
    "hebrew": "וושינגטון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وجد",
    "arabicVoc": "وَجَدَ",
    "hebrew": "מצא",
    "translit": null,
    "verbPresent": "يَجِدُ"
  },
  {
    "chapter": 3,
    "arabic": "وزير التربية",
    "arabicVoc": "وَزِير التَّرْبِيَة",
    "hebrew": "שר החינוך",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وزير الثقافة",
    "arabicVoc": "وَزِير الثَّقَافَة",
    "hebrew": "שר התרבות",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وزير ٱلخارجية",
    "arabicVoc": "وَزِيرِ ٱلْخَارِجيَّة",
    "hebrew": "שר החוץ",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وزير ٱلداخلية",
    "arabicVoc": "وَزِير ٱلدَّاخِلِيَّة",
    "hebrew": "שר הפנים",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وزير ٱلدفاع",
    "arabicVoc": "وَزِير ٱلدِّفَاع",
    "hebrew": "שר הביטחון",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وزير ٱلمالية",
    "arabicVoc": "وَزِير ٱلْمَالِيَّة",
    "hebrew": "שר האוצר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "وضع",
    "arabicVoc": "وَضَعَ",
    "hebrew": "שם, הניח",
    "translit": null,
    "verbPresent": "يَضَعُ"
  },
  {
    "chapter": 3,
    "arabic": "وفد",
    "arabicVoc": "وَفْد",
    "hebrew": "משלחת",
    "translit": null,
    "plural": "وُفُود"
  },
  {
    "chapter": 3,
    "arabic": "وقع",
    "arabicVoc": "وَقَعَ",
    "hebrew": "נפל, שכן (עיר, כפר), התרחש",
    "translit": null,
    "verbPresent": "يَقَعُ"
  },
  {
    "chapter": 3,
    "arabic": "وقع على",
    "arabicVoc": "وَقَّعَ عَلَى",
    "hebrew": "חתם על",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "فصول السنة",
    "arabicVoc": "فُصُول السَّنَة",
    "hebrew": "עונות השנה",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "صيف",
    "arabicVoc": "صَيْف",
    "hebrew": "קיץ",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "خريف",
    "arabicVoc": "خَرِيف",
    "hebrew": "סתיו",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "شتاء",
    "arabicVoc": "شِتَاء",
    "hebrew": "חורף",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "ربيع",
    "arabicVoc": "رَبِيع",
    "hebrew": "אביב",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "كانون الثاني",
    "arabicVoc": "كَانُون الثَّانِي",
    "hebrew": "ינואר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "شباط",
    "arabicVoc": "شُبَاط",
    "hebrew": "פברואר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "آذار",
    "arabicVoc": "آذَار",
    "hebrew": "מרץ",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "نيسان",
    "arabicVoc": "نِيسَان",
    "hebrew": "אפריל",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أيار",
    "arabicVoc": "أَيَّار",
    "hebrew": "מאי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "حزيران",
    "arabicVoc": "حَزِيرَان",
    "hebrew": "יוני",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تموز",
    "arabicVoc": "تَمُّوز",
    "hebrew": "יולי",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "آب",
    "arabicVoc": "آب",
    "hebrew": "אוגוסט",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "أيلول",
    "arabicVoc": "أَيْلُول",
    "hebrew": "ספטמבר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تشرين الأول",
    "arabicVoc": "تِشْرِين الْأَوَّل",
    "hebrew": "אוקטובר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "تشرين الثاني",
    "arabicVoc": "تِشْرِين الثَّانِي",
    "hebrew": "נובמבר",
    "translit": null
  },
  {
    "chapter": 3,
    "arabic": "كانون الأول",
    "arabicVoc": "كَانُون الْأَوَّل",
    "hebrew": "דצמבר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "أجاب",
    "arabicVoc": "أَجَابَ",
    "hebrew": "ענה",
    "translit": null,
    "verbPresent": "يُجُِيب"
  },
  {
    "chapter": 4,
    "arabic": "أجرى",
    "arabicVoc": "أَجْرَى",
    "hebrew": "ניהל, ערך",
    "translit": null,
    "verbPresent": "يُجْرِي"
  },
  {
    "chapter": 4,
    "arabic": "أديب",
    "arabicVoc": "أَدِيب",
    "hebrew": "סופר, אדיב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "أراد",
    "arabicVoc": "أَرَادَ",
    "hebrew": "רצה",
    "translit": null,
    "verbPresent": "يُريدُ"
  },
  {
    "chapter": 4,
    "arabic": "أرسل",
    "arabicVoc": "أَرْسَلَ",
    "hebrew": "שלח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إستعمل",
    "arabicVoc": "إِسْتَعْمَلَ",
    "hebrew": "השתמש ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "إستقلال",
    "arabicVoc": "إِسْتِقْلال",
    "hebrew": "עצמאות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إشترى",
    "arabicVoc": "إِشْتَرَى",
    "hebrew": "קנה",
    "translit": null,
    "verbPresent": "يَشْترَِي"
  },
  {
    "chapter": 4,
    "arabic": "إصبع",
    "arabicVoc": "إِصْبَع",
    "hebrew": "אצבע",
    "translit": null,
    "plural": "أَصَابع",
    "gender": "נקבה"
  },
  {
    "chapter": 4,
    "arabic": "أعطى",
    "arabicVoc": "أَعْطَى",
    "hebrew": "נתן את ל",
    "translit": null,
    "verbPresent": "يُعْطِي",
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "أعلن",
    "arabicVoc": "أَعْلَنَ",
    "hebrew": "הודיע",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إفتتح",
    "arabicVoc": "إَفْتَتَح",
    "hebrew": "פתח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إقترب من",
    "arabicVoc": "إْقْتَرَبَ مِن",
    "hebrew": "התקרב אל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "أكثر من",
    "arabicVoc": "أَكْثَرْ مِن",
    "hebrew": "יותר מ",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ألآن",
    "arabicVoc": "أَلْآنَ",
    "hebrew": "עכשיו",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ألتوراة",
    "arabicVoc": "أَلتَّوْرَاة",
    "hebrew": "התורה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ألصوم / ألصيام",
    "arabicVoc": "أَلصَّوْم / أَلصِّيَام",
    "hebrew": "הצום",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ألمسيحية",
    "arabicVoc": "أَلْمَسِيحِيَّة",
    "hebrew": "הנצרות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إلى اللقاء",
    "arabicVoc": "إِلَى اللِّقَاء",
    "hebrew": "להתראות",
    "translit": null,
    "response": "مَعَ السَّلامَة"
  },
  {
    "chapter": 4,
    "arabic": "أليهودية",
    "arabicVoc": "أَلْيَهُودِيَّة",
    "hebrew": "היהדות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إمتحن",
    "arabicVoc": "إِمْتَحَنَ",
    "hebrew": "בחן",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "أمر",
    "arabicVoc": "أَمْر",
    "hebrew": "עניין",
    "translit": null,
    "plural": "أُمُور"
  },
  {
    "chapter": 4,
    "arabic": "أمر",
    "arabicVoc": "أَمْر",
    "hebrew": "צו, פקודה",
    "translit": null,
    "plural": "أَوَامِر"
  },
  {
    "chapter": 4,
    "arabic": "أمير",
    "arabicVoc": "أَمِير",
    "hebrew": "נסיך, אמיר",
    "translit": null,
    "plural": "أُمَرَاء"
  },
  {
    "chapter": 4,
    "arabic": "إنتخابات",
    "arabicVoc": "إنْتِخَابَات",
    "hebrew": "בחירות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إنعقد",
    "arabicVoc": "إِنْعَقَدَ",
    "hebrew": "נערך",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "إنقطع",
    "arabicVoc": "إِنْقَطَعَ",
    "hebrew": "ניתק, נפסק",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "أهل",
    "arabicVoc": "أَهْل",
    "hebrew": "בני משפחה, אנשי-, הורים",
    "translit": null,
    "plural": "أَهَالي َأَهٍال"
  },
  {
    "chapter": 4,
    "arabic": "أول أولى",
    "arabicVoc": "أَوَّل أُولىَ",
    "hebrew": "ראשון, – ראשונה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "بحث في",
    "arabicVoc": "بحََث فِي",
    "hebrew": "דן ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "برلمان",
    "arabicVoc": "بَرْلَمَان",
    "hebrew": "פרלמנט",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "بطيخ",
    "arabicVoc": "بِطِّيخ",
    "hebrew": "אבטיחים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "بعد غد",
    "arabicVoc": "بَعْدَ غَد",
    "hebrew": "מחרתיים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "بنطلون",
    "arabicVoc": "بَنْطَلُون",
    "hebrew": "מכנסיים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "بنك",
    "arabicVoc": "بَنْك",
    "hebrew": "בנק",
    "translit": null,
    "plural": "بُنُوك"
  },
  {
    "chapter": 4,
    "arabic": "بنى",
    "arabicVoc": "بَنَى",
    "hebrew": "בנה",
    "translit": null,
    "verbPresent": "يَبْنِي"
  },
  {
    "chapter": 4,
    "arabic": "تجول",
    "arabicVoc": "تَجََوَّل",
    "hebrew": "טייל, סייר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تحدث",
    "arabicVoc": "تَحََدَّث",
    "hebrew": "שוחח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تطور",
    "arabicVoc": "تَطَوَّرَ",
    "hebrew": "התפתח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تعاون",
    "arabicVoc": "تَعَاوَنَ",
    "hebrew": "שיתף פעולה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تعايش",
    "arabicVoc": "تَعَايُش",
    "hebrew": "דו קיום",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تعلم",
    "arabicVoc": "تَعَلَّمَ",
    "hebrew": "למד",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "!تفضل",
    "arabicVoc": "!ْتَفَضَّل",
    "hebrew": "! (ציווי) - בבקשה! התכבד!",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تقدم",
    "arabicVoc": "تَقَدَّمَ",
    "hebrew": "התקדם",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تكلم",
    "arabicVoc": "تَكَلَّمَ",
    "hebrew": "דיבר, שוחח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تلك",
    "arabicVoc": "تِلْكَ",
    "hebrew": "היא, ההיא",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تمرين",
    "arabicVoc": "تَمْرِين",
    "hebrew": "תרגיל",
    "translit": null,
    "plural": "تَمَارِين"
  },
  {
    "chapter": 4,
    "arabic": "تناول",
    "arabicVoc": "تَنَاوَلَ",
    "hebrew": "טיפל ב-, עסק ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "تنظيم",
    "arabicVoc": "تَنْظِيم",
    "hebrew": "ארגון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "توجه",
    "arabicVoc": "تَوَجَّهَ",
    "hebrew": "פנה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "تين",
    "arabicVoc": "تِين",
    "hebrew": "תאנים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ثقافة",
    "arabicVoc": "ثَقَافَة",
    "hebrew": "תרבות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "جائزة",
    "arabicVoc": "جَائِزَة",
    "hebrew": "פרס",
    "translit": null,
    "plural": "جَوَائِز"
  },
  {
    "chapter": 4,
    "arabic": "جانب",
    "arabicVoc": "جَانِب",
    "hebrew": "צד",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "جبل",
    "arabicVoc": "جَبَل",
    "hebrew": "הר",
    "translit": null,
    "plural": "جِبَال"
  },
  {
    "chapter": 4,
    "arabic": "جسم",
    "arabicVoc": "جِسْم",
    "hebrew": "גוף",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "جميع",
    "arabicVoc": "جَمِيع",
    "hebrew": "כל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "جولة",
    "arabicVoc": "جَوْلَة",
    "hebrew": "סיור",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "جيد",
    "arabicVoc": "جَيِّد",
    "hebrew": "טוב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "حاج",
    "arabicVoc": "حَاجّ",
    "hebrew": "עולה-רגל",
    "translit": null,
    "plural": "حُجَّاج"
  },
  {
    "chapter": 4,
    "arabic": "حال / حالة",
    "arabicVoc": "حَال / حَالَة",
    "hebrew": "מצב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "حديث",
    "arabicVoc": "حَدِيث",
    "hebrew": "חדיש, מודרני, חדית' (מסורת מוסלמית)",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "حذاء",
    "arabicVoc": "حِذَاء",
    "hebrew": "נעל",
    "translit": null,
    "plural": "أَحْذِيَة"
  },
  {
    "chapter": 4,
    "arabic": "حرف",
    "arabicVoc": "حَرْف",
    "hebrew": "אות",
    "translit": null,
    "plural": "حُرُوف"
  },
  {
    "chapter": 4,
    "arabic": "حضر",
    "arabicVoc": "حَضَرُ",
    "hebrew": "נכח ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "حليب",
    "arabicVoc": "حَلِيب",
    "hebrew": "חלב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "حول",
    "arabicVoc": "حَوْلَ",
    "hebrew": "מסביב ל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "خاص",
    "arabicVoc": "خَاصّ",
    "hebrew": "מיוחד, פרטי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "خبر",
    "arabicVoc": "خَبرَ",
    "hebrew": "ידיעה, חדשה",
    "translit": null,
    "plural": "أَخْبَار"
  },
  {
    "chapter": 4,
    "arabic": "خير",
    "arabicVoc": "خَيرْ",
    "hebrew": "טוב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "دخن",
    "arabicVoc": "دَخَّنَ",
    "hebrew": "עישן",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "دولي دولي",
    "arabicVoc": "دَوْليِّ دُوَلي",
    "hebrew": "בין-לאומי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "دين",
    "arabicVoc": "دِين",
    "hebrew": "דת",
    "translit": null,
    "plural": "أدْيَان"
  },
  {
    "chapter": 4,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "ההוא",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "رأى",
    "arabicVoc": "رَأَى",
    "hebrew": "ראה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "رئيس",
    "arabicVoc": "رَئيِس",
    "hebrew": "נשיא, ראש, יו\"ר",
    "translit": null,
    "plural": "رُؤَسَاء"
  },
  {
    "chapter": 4,
    "arabic": "رئيس الحكومة / رئيس الوزراء",
    "arabicVoc": "رَئِيس الْحُكُومَة / رَئِيس الْوُزَرَاء",
    "hebrew": "ראש הממשלה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "رئيسي",
    "arabicVoc": "رَئِيسِيّ",
    "hebrew": "ראשי, עיקרי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "رحلة",
    "arabicVoc": "رِحْلَة",
    "hebrew": "טיול, מסע",
    "translit": null,
    "plural": "رِحْلَات"
  },
  {
    "chapter": 4,
    "arabic": "رسمي",
    "arabicVoc": "رَسْمِيّ",
    "hebrew": "רשמי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "رياضة رياضي",
    "arabicVoc": "رِيَاضَة رِيَاضِيّ",
    "hebrew": "ספורט, - ספורטאי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "زار",
    "arabicVoc": "زَارَ",
    "hebrew": "ביקר ב",
    "translit": null,
    "verbPresent": "يَزُور",
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "زعيم",
    "arabicVoc": "زَعِيم",
    "hebrew": "מנהיג",
    "translit": null,
    "plural": "زُعَمَاء"
  },
  {
    "chapter": 4,
    "arabic": "زيارة",
    "arabicVoc": "زِيَارَة",
    "hebrew": "ביקור",
    "translit": null,
    "plural": "زِيَارَات"
  },
  {
    "chapter": 4,
    "arabic": "سائح",
    "arabicVoc": "سَائِح",
    "hebrew": "תייר",
    "translit": null,
    "plural": "سُيَّاح"
  },
  {
    "chapter": 4,
    "arabic": "ساعد",
    "arabicVoc": "سَاعَدَ",
    "hebrew": "עזר ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "ساعة",
    "arabicVoc": "سَاعَة",
    "hebrew": "שעה",
    "translit": null,
    "plural": "سَاعَات"
  },
  {
    "chapter": 4,
    "arabic": "سأل",
    "arabicVoc": "سَأَلَ",
    "hebrew": "שאל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "سكن",
    "arabicVoc": "سَكَنُ",
    "hebrew": "גר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "سلام",
    "arabicVoc": "سَلاَم",
    "hebrew": "שלום",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "سمح ل",
    "arabicVoc": "سَمَحَ لِ",
    "hebrew": "הרשה ל",
    "translit": null,
    "verbPresent": "يَسْمَحُ لِ"
  },
  {
    "chapter": 4,
    "arabic": "سنة",
    "arabicVoc": "سَنَة",
    "hebrew": "שנה",
    "translit": null,
    "plural": "سَنَوات"
  },
  {
    "chapter": 4,
    "arabic": "سهل",
    "arabicVoc": "سَهْل",
    "hebrew": "קל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "سياسة",
    "arabicVoc": "سِيَاسَة",
    "hebrew": "מדיניות, פוליטיקה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "سياسي",
    "arabicVoc": "سِيَاسِيّ",
    "hebrew": "מדיני, פוליטי, פוליטיקאי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "شاب",
    "arabicVoc": "شَابّ",
    "hebrew": "בחור, צעיר",
    "translit": null,
    "plural": "شَبَاب"
  },
  {
    "chapter": 4,
    "arabic": "شارك",
    "arabicVoc": "شَارَكَ",
    "hebrew": "השתתף",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "شأن",
    "arabicVoc": "شَأْن",
    "hebrew": "עניין, דבר",
    "translit": null,
    "plural": "شُؤُون"
  },
  {
    "chapter": 4,
    "arabic": "شخص",
    "arabicVoc": "شَخْص",
    "hebrew": "איש",
    "translit": null,
    "plural": "أَشْخَاص"
  },
  {
    "chapter": 4,
    "arabic": "شخصي",
    "arabicVoc": "شَخْصِيّ",
    "hebrew": "אישי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "شرطة شرطي",
    "arabicVoc": "شُرْطَة شُرْطِيّ",
    "hebrew": "משטרה, - שוטר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "شركة",
    "arabicVoc": "شَرِكَة",
    "hebrew": "חברה",
    "translit": null,
    "plural": "شَرِكَات"
  },
  {
    "chapter": 4,
    "arabic": "شعب",
    "arabicVoc": "شَعْب",
    "hebrew": "עם",
    "translit": null,
    "plural": "شُعُوب"
  },
  {
    "chapter": 4,
    "arabic": "شمس",
    "arabicVoc": "شَمْس",
    "hebrew": "שמש",
    "translit": null,
    "gender": "נקבה"
  },
  {
    "chapter": 4,
    "arabic": "شهر",
    "arabicVoc": "شَهْر",
    "hebrew": "חודש",
    "translit": null,
    "plural": "شُهُور"
  },
  {
    "chapter": 4,
    "arabic": "صالون",
    "arabicVoc": "صَالُون",
    "hebrew": "סלון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "صحفي صحافي",
    "arabicVoc": "صُحُفِيّ صِحَافي",
    "hebrew": "עיתונאי",
    "translit": null,
    "plural": "صُحُفِيّ صِحَافيُونَ / صُحُفِيّ صِحَافيِينَ"
  },
  {
    "chapter": 4,
    "arabic": "صرح بأن",
    "arabicVoc": "صَرَّحَ بِأَن",
    "hebrew": "הצהיר ש",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "صعب",
    "arabicVoc": "صَعْب",
    "hebrew": "קשה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ضابط",
    "arabicVoc": "ضَابِط",
    "hebrew": "קצין",
    "translit": null,
    "plural": "ضُبَّاط"
  },
  {
    "chapter": 4,
    "arabic": "طابق",
    "arabicVoc": "طَابِق",
    "hebrew": "קומה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "طالب",
    "arabicVoc": "طَالِب",
    "hebrew": "תלמיד, סטודנט",
    "translit": null,
    "plural": "طُلاَّب طَلَبَة"
  },
  {
    "chapter": 4,
    "arabic": "طفل",
    "arabicVoc": "طِفْل",
    "hebrew": "ילד, תינוק",
    "translit": null,
    "plural": "أطْفَال"
  },
  {
    "chapter": 4,
    "arabic": "عاقب",
    "arabicVoc": "عَاقَبَ",
    "hebrew": "העניש",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "عالج",
    "arabicVoc": "عَالج",
    "hebrew": "טיפל ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "عام",
    "arabicVoc": "عَامّ",
    "hebrew": "כללי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "عدة",
    "arabicVoc": "عِدَّة",
    "hebrew": "כמה, מספר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "عدد من",
    "arabicVoc": "عَدَدْ مِن",
    "hebrew": "כמה, מספר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "عربي",
    "arabicVoc": "عَرَبيِّ",
    "hebrew": "ערבי",
    "translit": null,
    "plural": "عَرَب"
  },
  {
    "chapter": 4,
    "arabic": "عضو",
    "arabicVoc": "عُضْو",
    "hebrew": "חבר ב",
    "translit": null,
    "plural": "أَعْضَاء"
  },
  {
    "chapter": 4,
    "arabic": "عظيم",
    "arabicVoc": "عَظِيم",
    "hebrew": "גדול, עצום",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "عقد",
    "arabicVoc": "عَقَدَ",
    "hebrew": "ערך, כינס",
    "translit": null,
    "plural": "عَقَدُونَ / عَقَدِينَ"
  },
  {
    "chapter": 4,
    "arabic": "علاقات",
    "arabicVoc": "عَلاَقَات",
    "hebrew": "קשרים, יחסים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "علم",
    "arabicVoc": "عَلَّمَ",
    "hebrew": "לימד",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "علم",
    "arabicVoc": "عَلَم",
    "hebrew": "דגל",
    "translit": null,
    "plural": "أَعْلاَم"
  },
  {
    "chapter": 4,
    "arabic": "عملية",
    "arabicVoc": "عَمَلِيَّة",
    "hebrew": "פעולה, תהליך, פיגוע",
    "translit": null,
    "plural": "عَمَلِيَّات"
  },
  {
    "chapter": 4,
    "arabic": "عند",
    "arabicVoc": "عِنَدْ",
    "hebrew": "אצל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "فاز",
    "arabicVoc": "فَازَ",
    "hebrew": "זכה, זכייה, ניצחון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "فتش عن",
    "arabicVoc": "فَتَّشَ عَن",
    "hebrew": "חיפש את",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "فرقة",
    "arabicVoc": "فِرْقَة",
    "hebrew": "להקה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "فريضة",
    "arabicVoc": "فَرِيضَة",
    "hebrew": "מצווה, חובה דתית",
    "translit": null,
    "plural": "فَرَائِض"
  },
  {
    "chapter": 4,
    "arabic": "فلاح",
    "arabicVoc": "فَلاَّحَ",
    "hebrew": "איכר",
    "translit": null,
    "plural": "فَلاَّحُونَ / فَلاَّحِينَ"
  },
  {
    "chapter": 4,
    "arabic": "فن",
    "arabicVoc": "فَنّ",
    "hebrew": "אומנות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "فنان",
    "arabicVoc": "فَنَّان",
    "hebrew": "אומן",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "قال",
    "arabicVoc": "قَالَ",
    "hebrew": "אמר",
    "translit": null,
    "verbPresent": "يَقُولُ"
  },
  {
    "chapter": 4,
    "arabic": "قام",
    "arabicVoc": "قَامَ",
    "hebrew": "קם",
    "translit": null,
    "verbPresent": "يَقُومُ"
  },
  {
    "chapter": 4,
    "arabic": "قام ب",
    "arabicVoc": "قَامَ بِ",
    "hebrew": "ערך, ביצע",
    "translit": null,
    "verbPresent": "يَقُومُ بِ"
  },
  {
    "chapter": 4,
    "arabic": "قام بزيارةل",
    "arabicVoc": "قَامَ بِزيَارَةِل",
    "hebrew": "ערך ביקור ב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "قامبجولة في",
    "arabicVoc": "قَامِبجَِوْلَةَ في",
    "hebrew": "ערך סיור ב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "قرار",
    "arabicVoc": "قَرَار",
    "hebrew": "החלטה",
    "translit": null,
    "plural": "قَرَارات"
  },
  {
    "chapter": 4,
    "arabic": "قرر",
    "arabicVoc": "قَرَّرَ",
    "hebrew": "החליט",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "قميص",
    "arabicVoc": "قَمِيص",
    "hebrew": "חולצה",
    "translit": null,
    "plural": "قُمْصَان"
  },
  {
    "chapter": 4,
    "arabic": "كان",
    "arabicVoc": "كَانَ",
    "hebrew": "היה",
    "translit": null,
    "verbPresent": "يَكُونُ"
  },
  {
    "chapter": 4,
    "arabic": "كريم",
    "arabicVoc": "كَرِيم",
    "hebrew": "נכבד, נדיב",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "كل عام وأنت بخير",
    "arabicVoc": "كُلّ عَام وَأَنْتَ بِخَيْر",
    "hebrew": "שנה טובה, חג שמח",
    "translit": null,
    "response": "وَأَنْتَ بِخَيْر"
  },
  {
    "chapter": 4,
    "arabic": "كل عام وأنت سالم",
    "arabicVoc": "كُلّ عَام وَأَنْتَ سَالِم",
    "hebrew": "שנה טובה, חג שמח",
    "translit": null,
    "response": "وَأَنْتَ سَالِم"
  },
  {
    "chapter": 4,
    "arabic": "كلب",
    "arabicVoc": "كَلْب",
    "hebrew": "כלב",
    "translit": null,
    "plural": "كِلاَب"
  },
  {
    "chapter": 4,
    "arabic": "كم",
    "arabicVoc": "كَمْ",
    "hebrew": "כמה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "كنيس",
    "arabicVoc": "كَنِيس",
    "hebrew": "בית כנסת",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "كنيسة",
    "arabicVoc": "كَنِيسَة",
    "hebrew": "כנסיה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "كيف حالك",
    "arabicVoc": "كَيْفَ حَالُكَ",
    "hebrew": "מה שלומך?",
    "translit": null,
    "response": "الْحَمْدُ لِلَّه"
  },
  {
    "chapter": 4,
    "arabic": "لاعب",
    "arabicVoc": "لَاَعِب",
    "hebrew": "שחקן",
    "translit": null,
    "plural": "لَاَعِبُونَ / لَاَعِبِينَ"
  },
  {
    "chapter": 4,
    "arabic": "لأن",
    "arabicVoc": "لأَِن",
    "hebrew": "מפני ש",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "لحم",
    "arabicVoc": "لَحْم",
    "hebrew": "בשר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مال",
    "arabicVoc": "مَال",
    "hebrew": "כסף, רכוש",
    "translit": null,
    "plural": "أَمْوَال"
  },
  {
    "chapter": 4,
    "arabic": "مبسوط",
    "arabicVoc": "مَبْسُوط",
    "hebrew": "מרוצה, שבע רצון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "متحف",
    "arabicVoc": "مُتْحَف",
    "hebrew": "מוזיאון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مختلف",
    "arabicVoc": "مُخْتَلِف",
    "hebrew": "שונה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مدير",
    "arabicVoc": "مُدِير",
    "hebrew": "מנהל",
    "translit": null,
    "plural": "مُدِيرُونَ / مُدِيرِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مرحبا",
    "arabicVoc": "مَرْحَبًا",
    "hebrew": "שלום",
    "translit": null,
    "response": "مَرْحَبْتَيْن"
  },
  {
    "chapter": 4,
    "arabic": "مسؤول",
    "arabicVoc": "مَسْؤُول",
    "hebrew": "אחראי, פקיד בכיר",
    "translit": null,
    "plural": "مَسْؤُولُونَ / مَسْؤُولِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مسؤول عن",
    "arabicVoc": "مَسْؤُولْ عَن",
    "hebrew": "אחראי ל",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مسابقة",
    "arabicVoc": "مُسَابَقَة",
    "hebrew": "תחרות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مستشفى",
    "arabicVoc": "مُسْتَشْفَى",
    "hebrew": "בית חולים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مسلم",
    "arabicVoc": "مُسْلِمَ",
    "hebrew": "מוסלמי",
    "translit": null,
    "plural": "مُسْلِمُونَ / مُسْلِمِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مسيحي",
    "arabicVoc": "مَسِيحِيَّ",
    "hebrew": "נוצרי",
    "translit": null,
    "plural": "مَسِيحِيُّونَ / مَسِيحِيِّينَ"
  },
  {
    "chapter": 4,
    "arabic": "مشروبات",
    "arabicVoc": "مَشْرُوبَات",
    "hebrew": "משקאות",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مشكلة",
    "arabicVoc": "مُشْكِلةَ",
    "hebrew": "בעיה",
    "translit": null,
    "plural": "مَشَاكِل / مُشْكِلات"
  },
  {
    "chapter": 4,
    "arabic": "مشهور",
    "arabicVoc": "مَشْهُور",
    "hebrew": "מפורסם",
    "translit": null,
    "plural": "ُونَ / ِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مطبخ",
    "arabicVoc": "مَطْبَخ",
    "hebrew": "מטבח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مطر",
    "arabicVoc": "مَطَر",
    "hebrew": "גשם",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "مطلوب",
    "arabicVoc": "مَطْلُوبَ",
    "hebrew": "מבוקש, דרוש",
    "translit": null,
    "plural": "مَطْلُوبُونَ / مَطْلُوبِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مع السلامة",
    "arabicVoc": "مَعَ السَّلامَة",
    "hebrew": "לך לשלום",
    "translit": null,
    "response": "اللهُ يُسَلِّمُك"
  },
  {
    "chapter": 4,
    "arabic": "معطف",
    "arabicVoc": "مِعْطَف",
    "hebrew": "מעיל",
    "translit": null,
    "plural": "مَعاطِف"
  },
  {
    "chapter": 4,
    "arabic": "معلم",
    "arabicVoc": "مُعَلِّم",
    "hebrew": "מורה",
    "translit": null,
    "plural": "مُعَلِّمُونَ / مُعَلِّمِينَ"
  },
  {
    "chapter": 4,
    "arabic": "معلمة",
    "arabicVoc": "مُعَلِّمَة",
    "hebrew": "מורה",
    "translit": null,
    "plural": "مُعَلِّمَات"
  },
  {
    "chapter": 4,
    "arabic": "مكان",
    "arabicVoc": "مَكَان",
    "hebrew": "מקום",
    "translit": null,
    "plural": "أَمَاكِن"
  },
  {
    "chapter": 4,
    "arabic": "مكة",
    "arabicVoc": "مَكَّة",
    "hebrew": "מכה",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ملابس",
    "arabicVoc": "مَلاَبِس",
    "hebrew": "בגדים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ملعب",
    "arabicVoc": "مَلْعَب",
    "hebrew": "מגרש משחקים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "ممتاز",
    "arabicVoc": "مُمْتَاز",
    "hebrew": "מצוין",
    "translit": null,
    "plural": "مُمْتَازُونَ / مُمْتَازِينَ"
  },
  {
    "chapter": 4,
    "arabic": "ممثل",
    "arabicVoc": "مَمَُثِّل",
    "hebrew": "נציג, שחקן",
    "translit": null,
    "plural": "مَمَُثِّلُونَ / مَمَُثِّلِينَ"
  },
  {
    "chapter": 4,
    "arabic": "ممنوع",
    "arabicVoc": "مَمْنُوع",
    "hebrew": "אסור",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "من المتوقع أن",
    "arabicVoc": "مِنْ الْمُتَوَقَّع أن",
    "hebrew": "מן הצפוי ש",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "من المقرر أن",
    "arabicVoc": "مِنْ الْمُقَرَّر أن",
    "hebrew": "הוחלט, נקבע ש",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "من فضلك / فضلكم",
    "arabicVoc": "مِنْْ فَضْلِكَ / فَضْلِكُم",
    "hebrew": "בבקשה ממך/מכם",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "منافع",
    "arabicVoc": "مَنَافِع",
    "hebrew": "שירותים",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "منع من",
    "arabicVoc": "مَنَعَ مِنْ",
    "hebrew": "מנע את- מ-, אסר את- על",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 4,
    "arabic": "مهندس",
    "arabicVoc": "مُهَنْدِس",
    "hebrew": "מהנדס",
    "translit": null,
    "plural": "ُونَ / ِينَ"
  },
  {
    "chapter": 4,
    "arabic": "مواطن",
    "arabicVoc": "مُوَاطِنَ",
    "hebrew": "אזרח",
    "translit": null,
    "plural": "مُوَاطِنُونَ / مُوَاطِنِينَ"
  },
  {
    "chapter": 4,
    "arabic": "موجود",
    "arabicVoc": "مَوْجُود",
    "hebrew": "נמצא, ישנו",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "موضوع",
    "arabicVoc": "مَوْضُوع",
    "hebrew": "נושא",
    "translit": null,
    "plural": "مَوَاضِيع مَوْضُوعَات"
  },
  {
    "chapter": 4,
    "arabic": "موظف",
    "arabicVoc": "مُوَظَّفَ",
    "hebrew": "פקיד",
    "translit": null,
    "plural": "مُوَظَّفُونَ / مُوَظَّفِينَ"
  },
  {
    "chapter": 4,
    "arabic": "نبأ",
    "arabicVoc": "نَبَأ",
    "hebrew": "ידיעה",
    "translit": null,
    "plural": "أَنْبَاء"
  },
  {
    "chapter": 4,
    "arabic": "نتيجة",
    "arabicVoc": "نَتِيجَة",
    "hebrew": "תוצאה",
    "translit": null,
    "plural": "نَتَائِج"
  },
  {
    "chapter": 4,
    "arabic": "نجح",
    "arabicVoc": "نجََحَ",
    "hebrew": "הצליח",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "نهر",
    "arabicVoc": "نَهْر",
    "hebrew": "נהר",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "هاتف نقال / هاتف خلوي / هاتف محمول",
    "arabicVoc": "هَاتِف نَقَّال / هَاتِف خَلَوِيّ / هَاتِف مَحْمُول",
    "hebrew": "טלפון נייד, סלולרי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "هدف",
    "arabicVoc": "هَدَف",
    "hebrew": "מטרה",
    "translit": null,
    "plural": "أَهْدَاف"
  },
  {
    "chapter": 4,
    "arabic": "وافق على",
    "arabicVoc": "وَافَقَ عَلَى",
    "hebrew": "הסכים על",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "وزارة",
    "arabicVoc": "وِزَارَة",
    "hebrew": "משרד (של שר)",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "وصل",
    "arabicVoc": "وَصَلِ",
    "hebrew": "הגיע",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "وقت",
    "arabicVoc": "وَقْت",
    "hebrew": "זמן",
    "translit": null,
    "plural": "أَوْقات"
  },
  {
    "chapter": 4,
    "arabic": "وقع",
    "arabicVoc": "وَقَعَ",
    "hebrew": "נמצא, שכן, נפל",
    "translit": null,
    "verbPresent": "يَقَعُ"
  },
  {
    "chapter": 4,
    "arabic": "ألواقع",
    "arabicVoc": "أَلْوَاقِع",
    "hebrew": "השוכן",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "وقف",
    "arabicVoc": "وَقَفَ",
    "hebrew": "עמד",
    "translit": null,
    "verbPresent": "يَقِفُ"
  },
  {
    "chapter": 4,
    "arabic": "يوم الأحد",
    "arabicVoc": "يَوْم الْأَحَد",
    "hebrew": "יום ראשון",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم الاثنين",
    "arabicVoc": "يَوْم الْاثْنَين",
    "hebrew": "יום שני",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم الثلاثاء",
    "arabicVoc": "يَوْم الثُّلاَثَاء",
    "hebrew": "יום שלישי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم الأربعاء",
    "arabicVoc": "يَوْم الْأَرْبِعَاء",
    "hebrew": "יום רביעי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم الخميس",
    "arabicVoc": "يَوْم الْخَمِيس",
    "hebrew": "יום חמישי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم الجمعة",
    "arabicVoc": "يَوْم الْجُمْعَة",
    "hebrew": "יום ששי",
    "translit": null
  },
  {
    "chapter": 4,
    "arabic": "يوم السبت",
    "arabicVoc": "يَوْم السَّبْت",
    "hebrew": "יום שבת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أجنبي",
    "arabicVoc": "أَجْنَبيِّ",
    "hebrew": "זר",
    "translit": null,
    "plural": "أَجَانِب"
  },
  {
    "chapter": 5,
    "arabic": "إتجه / إتجاه",
    "arabicVoc": "إِتجََّه / إِتجَِّاه",
    "hebrew": "פנה, שם פניו אל / כיוון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إتحاد",
    "arabicVoc": "إِتحَِّاد",
    "hebrew": "התאחדות, פדרציה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إتخذ",
    "arabicVoc": "إِتخََّذَ",
    "hebrew": "נקט, קיבל (החלטה)",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إتصال",
    "arabicVoc": "إِتِّصَال",
    "hebrew": "קשר, מגע",
    "translit": null,
    "plural": "إِتِّصَالات"
  },
  {
    "chapter": 5,
    "arabic": "إتفق على",
    "arabicVoc": "إِتَّفَقَ عَلَى",
    "hebrew": "הסכים על-, בעניין",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إجتماع",
    "arabicVoc": "إِجْتِمَاع",
    "hebrew": "פגישה, מפגש, התכנסות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إجتماعي",
    "arabicVoc": "إِجْتِمَاعِيّ",
    "hebrew": "חברתי, סוציאלי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إجراء",
    "arabicVoc": "إِجْرَاء",
    "hebrew": "אמצעי, צעד, הליך",
    "translit": null,
    "plural": "إِجْرَاءات"
  },
  {
    "chapter": 5,
    "arabic": "إحتفل ب",
    "arabicVoc": "إِحْتَفَلَ ب",
    "hebrew": "חגג את",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إحتل",
    "arabicVoc": "إِحْتَل",
    "hebrew": "כבש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إختار",
    "arabicVoc": "إِخْتَارَ",
    "hebrew": "בחר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أخذ",
    "arabicVoc": "أَخَذَ",
    "hebrew": "פועל בעתיד – התחיל ל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إدارة",
    "arabicVoc": "إِدَارَة",
    "hebrew": "הנהלה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إذاعة",
    "arabicVoc": "إِذَاعَة",
    "hebrew": "שידור, תחנת שידור",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إرهاب",
    "arabicVoc": "إِرْهَاب",
    "hebrew": "טרור",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إرهابي",
    "arabicVoc": "إَرْهَابيِّ",
    "hebrew": "טרוריסט",
    "translit": null,
    "plural": "إَرْهَابيُِّونَ / إَرْهَابيِِّينَ"
  },
  {
    "chapter": 5,
    "arabic": "أزمة",
    "arabicVoc": "أَزْمَة",
    "hebrew": "משבר",
    "translit": null,
    "plural": "أَزَمَات"
  },
  {
    "chapter": 5,
    "arabic": "إستأنف",
    "arabicVoc": "إِسْتَأْنَفَ",
    "hebrew": "חידש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إستمر / إستمر في",
    "arabicVoc": "إِسْتَمَر / إِسْتَمَرَِّ في",
    "hebrew": "נמשך / המשיך ב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إستنكر",
    "arabicVoc": "إِسْتَنْكَرَ",
    "hebrew": "גינה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أسرة",
    "arabicVoc": "أُسْرَة",
    "hebrew": "משפחה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أشار إلى",
    "arabicVoc": "أَشَارََ إِلى",
    "hebrew": "הצביע על-, רמז על",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إصطدم",
    "arabicVoc": "إِصْطَدَمَ",
    "hebrew": "התנגש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أضاف",
    "arabicVoc": "أَضَافَ",
    "hebrew": "הוסיף",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أضرب عن",
    "arabicVoc": "أَضْرَبَ عَن",
    "hebrew": "שבת מ",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إعترف ب",
    "arabicVoc": "إِعْتَرَفَِ ب",
    "hebrew": "הכיר ב-, הודה ב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إعتقد",
    "arabicVoc": "إِعْتَقَدَ",
    "hebrew": "חשב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إعتقل",
    "arabicVoc": "إِعْتَقَلَ",
    "hebrew": "עצר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أعرب عن",
    "arabicVoc": "أَعْرَبَ عَن",
    "hebrew": "הביע את",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أغلبية",
    "arabicVoc": "أَغْلَبِيَّة",
    "hebrew": "רוב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أغلق",
    "arabicVoc": "أَغْلَقَ",
    "hebrew": "סגר, נעל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إقترح على",
    "arabicVoc": "إِقْتَرَحَ عَلَى",
    "hebrew": "הציע את- ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "إقتصاد",
    "arabicVoc": "إِقْتِصَاد",
    "hebrew": "כלכלה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إقتصادي",
    "arabicVoc": "إِقْتِصَادِيّ",
    "hebrew": "כלכלי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أقل",
    "arabicVoc": "أَقَلّ",
    "hebrew": "פחות מ",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أقلية",
    "arabicVoc": "أَقَلِّيَّة",
    "hebrew": "מיעוט",
    "translit": null,
    "plural": "أَقَلِّيَّات"
  },
  {
    "chapter": 5,
    "arabic": "أكد",
    "arabicVoc": "أَكَّدَ",
    "hebrew": "הדגיש, אישר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "ألمقبل",
    "arabicVoc": "أَلْمُقْبِل",
    "hebrew": "הבא",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إمرأة",
    "arabicVoc": "إِمْرَأَة",
    "hebrew": "אישה ( האישה)",
    "translit": null,
    "plural": "نِسَاء أَلْمَرْأَة"
  },
  {
    "chapter": 5,
    "arabic": "أمن",
    "arabicVoc": "أَمْن",
    "hebrew": "ביטחון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إنتشر",
    "arabicVoc": "إِنْتَشَرَ",
    "hebrew": "התפשט, התפרס, נפוץ",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إنتظر",
    "arabicVoc": "إِنْتَظَرَ",
    "hebrew": "חיכה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إنتقل",
    "arabicVoc": "إِنْتَقَلَ",
    "hebrew": "עבר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إنسحب",
    "arabicVoc": "إِنْسَحَبَ",
    "hebrew": "נסוג",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "إنفجر",
    "arabicVoc": "إِنْفَجَرَ",
    "hebrew": "התפוצץ",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أهم",
    "arabicVoc": "أَهَمّ",
    "hebrew": "חשוב יותר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "أهمية",
    "arabicVoc": "أَهمَِّيَّة",
    "hebrew": "חשיבות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "باع",
    "arabicVoc": "بَاعَ",
    "hebrew": "מכר",
    "translit": null,
    "verbPresent": "يَبِيعُ"
  },
  {
    "chapter": 5,
    "arabic": "بذل جهودا",
    "arabicVoc": "بَذَلَ جُهُودًا",
    "hebrew": "השקיע מאמצים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "بعث",
    "arabicVoc": "بَعَثَ",
    "hebrew": "שלח",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "بمناسبة",
    "arabicVoc": "بِمُنَاسَبَة",
    "hebrew": "לרגל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تبادل",
    "arabicVoc": "تَبَادُل",
    "hebrew": "חילוף, התחלפות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تبادل تجاري",
    "arabicVoc": "تَبَادُلّ تِجَارِي",
    "hebrew": "סחר חליפין)",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تجاري",
    "arabicVoc": "تّجَِارِي",
    "hebrew": "מסחרי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تجربة",
    "arabicVoc": "تَجْرِبَة",
    "hebrew": "ניסיון",
    "translit": null,
    "plural": "تَجَارِب"
  },
  {
    "chapter": 5,
    "arabic": "ترأس",
    "arabicVoc": "تَرَأَّسَ",
    "hebrew": "עמד בראש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تزوج",
    "arabicVoc": "تَزَوَّجَ",
    "hebrew": "התחתן",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تسلم",
    "arabicVoc": "تَسَلَّمَ",
    "hebrew": "קיבל לידו, לקח",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تطور",
    "arabicVoc": "تَطَوُّر",
    "hebrew": "התפתחות",
    "translit": null,
    "plural": "تَطَوُّرات"
  },
  {
    "chapter": 5,
    "arabic": "تظاهر",
    "arabicVoc": "تَظَاهَرَ",
    "hebrew": "הפגין",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تعزيز",
    "arabicVoc": "تَعْزيز",
    "hebrew": "חיזוק",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تعليق",
    "arabicVoc": "تَعْلِيق",
    "hebrew": "פרשנות, תגובה, \"טוקבק\"",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تغير",
    "arabicVoc": "تَغَيَّرَ",
    "hebrew": "השתנה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تفاصيل",
    "arabicVoc": "تَفَاصِيل",
    "hebrew": "פרטים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "تقرير",
    "arabicVoc": "تَقْرِير",
    "hebrew": "דו\"ח",
    "translit": null,
    "plural": "تَقَارِير"
  },
  {
    "chapter": 5,
    "arabic": "توجهإلى",
    "arabicVoc": "تَوَجَّهَإِلىَ",
    "hebrew": "פנה אל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "توقع",
    "arabicVoc": "تَوَقَّعَ",
    "hebrew": "ציפה ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "ثورة",
    "arabicVoc": "ثَوْرَة",
    "hebrew": "מהפכה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "جدير بالذكر أن",
    "arabicVoc": "جَدِير بِالذِّكْر أَن",
    "hebrew": "ראוי לציון ש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "جندي",
    "arabicVoc": "جُنْدِيّ",
    "hebrew": "חייל",
    "translit": null,
    "plural": "جُنُود"
  },
  {
    "chapter": 5,
    "arabic": "جو",
    "arabicVoc": "جَوّ",
    "hebrew": "אוויר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "جوي",
    "arabicVoc": "جَوِّيّ",
    "hebrew": "אווירי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "جيش",
    "arabicVoc": "جَيْش",
    "hebrew": "צבא",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حاجز",
    "arabicVoc": "حَاجِز",
    "hebrew": "מחסום",
    "translit": null,
    "plural": "حَوَاجِز"
  },
  {
    "chapter": 5,
    "arabic": "حادث",
    "arabicVoc": "حَادِث",
    "hebrew": "אירוע, מקרה, תאונה",
    "translit": null,
    "plural": "حَوَادِث"
  },
  {
    "chapter": 5,
    "arabic": "حارس",
    "arabicVoc": "حَارِس",
    "hebrew": "שומר, מאבטח/",
    "translit": null,
    "plural": "حُرَّاس"
  },
  {
    "chapter": 5,
    "arabic": "حراسة",
    "arabicVoc": "حِرَاسَة",
    "hebrew": "שמירה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حاول محاولة",
    "arabicVoc": "حَاوَل مُحَاوَلَة",
    "hebrew": "ניסה, - ניסיון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حتى",
    "arabicVoc": "حَتى",
    "hebrew": "עד, כדי ש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حد",
    "arabicVoc": "حَدّ",
    "hebrew": "גבול, גבולות",
    "translit": null,
    "plural": "حُدُود"
  },
  {
    "chapter": 5,
    "arabic": "حدث",
    "arabicVoc": "حَدَثَ",
    "hebrew": "קרה, ארע",
    "translit": null,
    "plural": "حَدَثُونَ / حَدَثِينَ"
  },
  {
    "chapter": 5,
    "arabic": "حضر",
    "arabicVoc": "حَضَرُ",
    "hebrew": "נכח ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "حق",
    "arabicVoc": "حَقّ",
    "hebrew": "זכות",
    "translit": null,
    "plural": "حُقُوق"
  },
  {
    "chapter": 5,
    "arabic": "حل",
    "arabicVoc": "حَلّ",
    "hebrew": "פתרון",
    "translit": null,
    "plural": "حُلُول"
  },
  {
    "chapter": 5,
    "arabic": "حماية",
    "arabicVoc": "حِمَايَة",
    "hebrew": "שמירה, הגנה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حوالي",
    "arabicVoc": "حَوَالي",
    "hebrew": "בערך, בקירוב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "حيث",
    "arabicVoc": "حَيْثُ",
    "hebrew": "מקום שם",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "خارج ألخارج",
    "arabicVoc": "خَارِج أَلْخَارِج",
    "hebrew": "מחוץ ל- ( - חו\"ל)",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "خبير",
    "arabicVoc": "خَبِير",
    "hebrew": "מומחה, בעל ניסיון",
    "translit": null,
    "plural": "خُبَرَاء"
  },
  {
    "chapter": 5,
    "arabic": "خطوة",
    "arabicVoc": "خُطْوَة",
    "hebrew": "צעד",
    "translit": null,
    "plural": "خُطُوات"
  },
  {
    "chapter": 5,
    "arabic": "داخل",
    "arabicVoc": "دَاخِل",
    "hebrew": "בתוך",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "دائما",
    "arabicVoc": "دَائِمًا",
    "hebrew": "תמיד",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "دافععن",
    "arabicVoc": "دَافَعْعَنَ",
    "hebrew": "הגן על",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "دفاع",
    "arabicVoc": "دِفَاع",
    "hebrew": "הגנה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "دمر",
    "arabicVoc": "دَمَّرَ",
    "hebrew": "הרס, החריב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "ذلك وذلك",
    "arabicVoc": "ذٰلِكَ وَذٰلِكَ",
    "hebrew": "ההוא - - וזאת.../",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "لذلك / بعدذلك",
    "arabicVoc": "لِذٰلِك / بَعْدَذٰلِكَ",
    "hebrew": "לכן/ - אחר כך/",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "كذلك / مع ذلك",
    "arabicVoc": "كَذٰلِك / مَعََ ذٰلِك",
    "hebrew": "כמו כן/ – עם",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "ذلك",
    "arabicVoc": "ذٰلِكَ",
    "hebrew": "זאת, למרות זאת/ –זה/זאת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "سمعت ذلك",
    "arabicVoc": "سَمَِعْتُ ذٰلِك",
    "hebrew": "לדוגמה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "رئيس الأركان",
    "arabicVoc": "رَئِيس الْأَرْكَان",
    "hebrew": "הרמטכ\"ל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "رحبب",
    "arabicVoc": "رَحَّبِبَ",
    "hebrew": "קיבל את- בסבר פנים יפות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "رغم",
    "arabicVoc": "رَغْمَ",
    "hebrew": "למרות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "رفض",
    "arabicVoc": "رَفَضُ",
    "hebrew": "דחה, סירב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "رفع",
    "arabicVoc": "رَفَعَ",
    "hebrew": "הרים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "سائح",
    "arabicVoc": "سَائِح",
    "hebrew": "תייר/ תיירות",
    "translit": null,
    "plural": "سُيَّاح / سِيَاحَة"
  },
  {
    "chapter": 5,
    "arabic": "سابق",
    "arabicVoc": "سَابِق",
    "hebrew": "קודם",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "سبب",
    "arabicVoc": "سَبَب",
    "hebrew": "סיבה/ בגלל, בשל",
    "translit": null,
    "plural": "أَسْبَاب / بِسَبَب"
  },
  {
    "chapter": 5,
    "arabic": "سريع",
    "arabicVoc": "سَرِيع",
    "hebrew": "מהיר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "سفارة / سفارة",
    "arabicVoc": "سِفَارَة / سَفَارَة",
    "hebrew": "שגרירות",
    "translit": null,
    "plural": "سِفَارَة / سَفَارَات"
  },
  {
    "chapter": 5,
    "arabic": "سلاح",
    "arabicVoc": "سِلاَح",
    "hebrew": "נשק",
    "translit": null,
    "plural": "أَسْلِحَة"
  },
  {
    "chapter": 5,
    "arabic": "سلطة",
    "arabicVoc": "سُلْطَة",
    "hebrew": "שלטון, שליטה, רשות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "سمح",
    "arabicVoc": "سَمََح",
    "hebrew": "הרשה ל",
    "translit": null,
    "plural": "سَمََحُونَ / سَمََحِينَ"
  },
  {
    "chapter": 5,
    "arabic": "شارك",
    "arabicVoc": "شَارَك",
    "hebrew": "השתתף",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "شأن",
    "arabicVoc": "شَأْن",
    "hebrew": "עניין",
    "translit": null,
    "plural": "شُؤُون"
  },
  {
    "chapter": 5,
    "arabic": "شغل",
    "arabicVoc": "شُغْل",
    "hebrew": "עבודה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "شغل منصبا",
    "arabicVoc": "شَغَلَ مَنْصِبًا",
    "hebrew": "עבד במשרה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "شقيق",
    "arabicVoc": "شَقِيق",
    "hebrew": "אח (ביולוגי)",
    "translit": null,
    "plural": "أَشِقَّاء"
  },
  {
    "chapter": 5,
    "arabic": "شكل",
    "arabicVoc": "شَكَّلَ",
    "hebrew": "הרכיב, היווה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "شكل",
    "arabicVoc": "شَكْل",
    "hebrew": "צורה, אופן",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "صاروخ",
    "arabicVoc": "صَارُوخ",
    "hebrew": "טיל",
    "translit": null,
    "plural": "صَوَارِيخ"
  },
  {
    "chapter": 5,
    "arabic": "ضد",
    "arabicVoc": "ضِد",
    "hebrew": "נגד",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "طور",
    "arabicVoc": "طَوَّرَ",
    "hebrew": "פיתח",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "طيار",
    "arabicVoc": "طَيَّار",
    "hebrew": "טייס",
    "translit": null,
    "plural": "طَيَّارُونَ / طَيَّارِينَ"
  },
  {
    "chapter": 5,
    "arabic": "طيران",
    "arabicVoc": "طَيَرَان",
    "hebrew": "תעופה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "عاد",
    "arabicVoc": "عَادَ",
    "hebrew": "חזר, שב, שיבה, חזרה",
    "translit": null,
    "verbPresent": "يَعُودُ عَوْدَة"
  },
  {
    "chapter": 5,
    "arabic": "عاش",
    "arabicVoc": "عَاشَ",
    "hebrew": "חי",
    "translit": null,
    "verbPresent": "يَعِيشُ"
  },
  {
    "chapter": 5,
    "arabic": "عبر عن",
    "arabicVoc": "عَبَّرَ عَن",
    "hebrew": "הביע, ביטא את",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "عدد",
    "arabicVoc": "عَدَد",
    "hebrew": "מספר, גיליון (של עיתון)",
    "translit": null,
    "plural": "أَعْدَاد"
  },
  {
    "chapter": 5,
    "arabic": "عدو",
    "arabicVoc": "عَدُوّ",
    "hebrew": "אויב",
    "translit": null,
    "plural": "أَعْدَاء"
  },
  {
    "chapter": 5,
    "arabic": "عرض على",
    "arabicVoc": "عَرَضِ عَلَى",
    "hebrew": "הציג, הציע את ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "عسكري",
    "arabicVoc": "عَسْكّرِيَ",
    "hebrew": "צבאי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "عين",
    "arabicVoc": "عَينَ",
    "hebrew": "מינה את- ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "فترة",
    "arabicVoc": "فَتْرَة",
    "hebrew": "תקופה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "فقط",
    "arabicVoc": "فَقَطْ",
    "hebrew": "רק, בלבד",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "فكرة",
    "arabicVoc": "فِكْرَة",
    "hebrew": "רעיון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "في أعقاب",
    "arabicVoc": "فيِ أَعْقَاب",
    "hebrew": "בעקבות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "في نطاق",
    "arabicVoc": "فيِ نِطَاق",
    "hebrew": "במסגרת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "قائد",
    "arabicVoc": "قَائِد",
    "hebrew": "מפקד, מנהיג",
    "translit": null,
    "plural": "قَادَة"
  },
  {
    "chapter": 5,
    "arabic": "قابل مقابلة",
    "arabicVoc": "قَابَل مُقَابَلَة",
    "hebrew": "פגש, ראיין, פגישה, ראיון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "قام بجولة",
    "arabicVoc": "قَامَ بِجَوْلَة",
    "hebrew": "ערך סיור",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "قضية",
    "arabicVoc": "قَضِيَّة",
    "hebrew": "בעיה, תביעה משפטית",
    "translit": null,
    "plural": "قَضَايَا"
  },
  {
    "chapter": 5,
    "arabic": "قطاع غزة",
    "arabicVoc": "قُطَاع غَزَّة",
    "hebrew": "רצועת עזה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "قوة",
    "arabicVoc": "قُوَّة",
    "hebrew": "כוח",
    "translit": null,
    "plural": "قُوَّات"
  },
  {
    "chapter": 5,
    "arabic": "قوي",
    "arabicVoc": "قَوِّيّ",
    "hebrew": "חזק",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "كافح",
    "arabicVoc": "كَافَحَ",
    "hebrew": "נאבק ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "كما",
    "arabicVoc": "كَمَا",
    "hebrew": "כמו כן, כמו ש",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "لجنة",
    "arabicVoc": "لَجْنَة",
    "hebrew": "ועדה",
    "translit": null,
    "plural": "لِجَان"
  },
  {
    "chapter": 5,
    "arabic": "لدى",
    "arabicVoc": "لَدَى",
    "hebrew": "אצל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "لقاء",
    "arabicVoc": "لِقَاء",
    "hebrew": "פגישה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مؤتمر صحفي",
    "arabicVoc": "مُؤْتمََرّ صُحُفِي",
    "hebrew": "מסיבת עיתונאים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مؤتمر قمة",
    "arabicVoc": "مُؤْتمََر قِمَّة",
    "hebrew": "ועידת פסגה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مؤخرا",
    "arabicVoc": "مُؤَخَّرًا",
    "hebrew": "לאחרונה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مباحثات",
    "arabicVoc": "مُبَاحَثَات",
    "hebrew": "דיונים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مبادرة",
    "arabicVoc": "مُبَادَرَة",
    "hebrew": "יוזמה",
    "translit": null,
    "plural": "مُبَادَرَات"
  },
  {
    "chapter": 5,
    "arabic": "مجموعة",
    "arabicVoc": "مَجْمُوعَة",
    "hebrew": "קבוצה",
    "translit": null,
    "plural": "مَجْمُوعَات"
  },
  {
    "chapter": 5,
    "arabic": "متحدث بٱسم / ناطق بلسان",
    "arabicVoc": "مُتَحَدِّث بِٱسْم / نَاطِق بِلِسَان",
    "hebrew": "דובר בשם-, מטעם",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مثل",
    "arabicVoc": "مِثْل",
    "hebrew": "כמו",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مجال",
    "arabicVoc": "مَجَال",
    "hebrew": "תחום",
    "translit": null,
    "plural": "مَجَالات"
  },
  {
    "chapter": 5,
    "arabic": "مجتمع",
    "arabicVoc": "مُجْتَمَع",
    "hebrew": "חברה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مدرسة ٱبتدائية",
    "arabicVoc": "مَدْرَسَة ٱبْتِدَائِيَّة",
    "hebrew": "בית ספר יסודי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مدرسة إعدادية",
    "arabicVoc": "مَدْرَسَة إِعْدَادِيَّة",
    "hebrew": "חטיבת ביניים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مدرسة ثانوية",
    "arabicVoc": "مَدْرَسَة ثَانَوِيَّة",
    "hebrew": "בית ספר תיכון",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مراسل",
    "arabicVoc": "مُرَاسِل",
    "hebrew": "כתב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مرحلة",
    "arabicVoc": "مَرْحَلَة",
    "hebrew": "שלב",
    "translit": null,
    "plural": "مَرَاحِل"
  },
  {
    "chapter": 5,
    "arabic": "مسألة",
    "arabicVoc": "مَسْأَلَة",
    "hebrew": "שאלה, בעייה",
    "translit": null,
    "plural": "مَسَائِل"
  },
  {
    "chapter": 5,
    "arabic": "مستشار",
    "arabicVoc": "مُسْتَشَار",
    "hebrew": "יועץ (קנצלר)",
    "translit": null,
    "plural": "مُسْتَشَارُونَ"
  },
  {
    "chapter": 5,
    "arabic": "مستقبل",
    "arabicVoc": "مُسْتَقْبَل",
    "hebrew": "עתיד",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مسلح",
    "arabicVoc": "مُسَلَّح",
    "hebrew": "חמוש, מזוין",
    "translit": null,
    "plural": "مُسَلَّحُونَ / مُسَلَّحِينَ"
  },
  {
    "chapter": 5,
    "arabic": "مسيرة",
    "arabicVoc": "مَسِيرَة",
    "hebrew": "תהליך, צעדה, תהלוכה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مشروع",
    "arabicVoc": "مَشْرُوع",
    "hebrew": "פרויקט, תכנית",
    "translit": null,
    "plural": "ات مَشَارِيع"
  },
  {
    "chapter": 5,
    "arabic": "مصدر",
    "arabicVoc": "مَصْدَر",
    "hebrew": "מקור",
    "translit": null,
    "plural": "مَصَادِر"
  },
  {
    "chapter": 5,
    "arabic": "مظاهرة",
    "arabicVoc": "مُظَاهَرَة",
    "hebrew": "הפגנה",
    "translit": null,
    "plural": "مُظَاهَرَات"
  },
  {
    "chapter": 5,
    "arabic": "معارضة",
    "arabicVoc": "مُعَارَضَة",
    "hebrew": "אופוזיציה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "معلومات",
    "arabicVoc": "مَعْلُومَات",
    "hebrew": "ידיעות, אינפורמציה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مفاوضات",
    "arabicVoc": "مُفَاوَضَات",
    "hebrew": "משא ומתן",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مقابل",
    "arabicVoc": "مُقَابِل",
    "hebrew": "תמורת, לעומת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "من أجل",
    "arabicVoc": "مِنْ أَجْل",
    "hebrew": "למען, כדי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مناقشات",
    "arabicVoc": "مُنَاقَشَات",
    "hebrew": "דיונים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مناورات",
    "arabicVoc": "مُنَاوَرَات",
    "hebrew": "תמרונים",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مندوب",
    "arabicVoc": "مَنْدُوبَ",
    "hebrew": "נציג",
    "translit": null,
    "plural": "مَنْدُوبُونَ / مَنْدُوبِينَ"
  },
  {
    "chapter": 5,
    "arabic": "منذ",
    "arabicVoc": "مُنْذُ",
    "hebrew": "מאז, מזה, לפני",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "مهنة",
    "arabicVoc": "مِهْنَة",
    "hebrew": "מקצוע",
    "translit": null,
    "plural": "مِهَن"
  },
  {
    "chapter": 5,
    "arabic": "ناطق بلسان",
    "arabicVoc": "نَاطِق بِلِسَان",
    "hebrew": "דובר מטעם",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "ناقش",
    "arabicVoc": "نَاقَشَ",
    "hebrew": "דן, התווכח",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "نام",
    "arabicVoc": "نَامََ",
    "hebrew": "ישן",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "نجاح",
    "arabicVoc": "نَجَاح",
    "hebrew": "הצלחה",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "نحو",
    "arabicVoc": "نَحْوَ",
    "hebrew": "בכיוון, לעבר, בערך",
    "translit": null,
    "plural": "أَنْحَاء"
  },
  {
    "chapter": 5,
    "arabic": "في أنحاء البلاد",
    "arabicVoc": "فِي أَنْحَاء الْبِلاد",
    "hebrew": "ברחבי הארץ",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "نسبة / بالنسبة إلى",
    "arabicVoc": "نِسْبَة / بِالنِّسْبَةَ إِلى",
    "hebrew": "אחוז, שיעור /",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "ل",
    "arabicVoc": "لِ",
    "hebrew": "ביחס ל-, לגבי-, לדעת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "نص",
    "arabicVoc": "نَصّ",
    "hebrew": "טקסט",
    "translit": null,
    "plural": "نُصُوص"
  },
  {
    "chapter": 5,
    "arabic": "نظير",
    "arabicVoc": "نَظِير",
    "hebrew": "עמית",
    "translit": null,
    "plural": "نُظَرَاء"
  },
  {
    "chapter": 5,
    "arabic": "نظام",
    "arabicVoc": "نِظَام",
    "hebrew": "משטר, שלטון, סדר",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "نقل",
    "arabicVoc": "نَقَلَ",
    "hebrew": "העביר",
    "translit": null,
    "plural": "نَقَلُونَ / نَقَلِينَ"
  },
  {
    "chapter": 5,
    "arabic": "هام مهم",
    "arabicVoc": "هَامّّ مُهِم",
    "hebrew": "חשוב",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "هدف",
    "arabicVoc": "هَدَفََ",
    "hebrew": "שאף ל...הציב את כמטרה",
    "translit": null,
    "plural": "هَدَفَُونَ / هَدَفَِينَ"
  },
  {
    "chapter": 5,
    "arabic": "هوية / بطاقة هوية",
    "arabicVoc": "هُوِيَّة / بِطَاقَة هُوِيَّة",
    "hebrew": "זהות / - תעודת זהות",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "واصل",
    "arabicVoc": "وَاصَلَ",
    "hebrew": "המשיך ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 5,
    "arabic": "وجب يجب أن",
    "arabicVoc": "وَجَب يْجَِبَُ أَن",
    "hebrew": "חובה ל",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "وسيلة",
    "arabicVoc": "وَسِيلَة",
    "hebrew": "אמצעי",
    "translit": null,
    "plural": "وَسَائِل"
  },
  {
    "chapter": 5,
    "arabic": "وكالة / وكالة",
    "arabicVoc": "وَكَالَة / وِكَالَة",
    "hebrew": "סוכנות",
    "translit": null,
    "plural": "وَكَالَة / وِكَالَات"
  },
  {
    "chapter": 5,
    "arabic": "وضع",
    "arabicVoc": "وَضْع",
    "hebrew": "מצב",
    "translit": null,
    "plural": "أَوْضَاع"
  },
  {
    "chapter": 5,
    "arabic": "وطن",
    "arabicVoc": "وَطَن",
    "hebrew": "מולדת",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "وطني",
    "arabicVoc": "وَطَني",
    "hebrew": "לאומי",
    "translit": null
  },
  {
    "chapter": 5,
    "arabic": "وقف إطلاق ٱلنار",
    "arabicVoc": "وَقْف إِطْلاَق ٱلنَّار",
    "hebrew": "הפסקת אש",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إتهم",
    "arabicVoc": "إِتَّهَمَ",
    "hebrew": "האשים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أثر",
    "arabicVoc": "أَثَّرَ",
    "hebrew": "השפיע",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أثناء",
    "arabicVoc": "أَثْنَاء",
    "hebrew": "בזמן-, במשך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إحتاج إلى",
    "arabicVoc": "إِحْتَاجََ إلى",
    "hebrew": "נזקק ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إحتج على",
    "arabicVoc": "إِحْتَجَّ عَلَى",
    "hebrew": "מחה על",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إحترم",
    "arabicVoc": "إِحْتَرَمَ",
    "hebrew": "כיבד",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "آخر أخرى",
    "arabicVoc": "آخَر أُخْرَى",
    "hebrew": "אחר, נוסף",
    "translit": null,
    "gender": "נקבה"
  },
  {
    "chapter": 6,
    "arabic": "أدى إلى",
    "arabicVoc": "أَدَّىَ إِلى",
    "hebrew": "גרם ל-, הביא לידי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إرتفع",
    "arabicVoc": "إِرْتَفَعَ",
    "hebrew": "עלה, התרומם",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إزداد",
    "arabicVoc": "إِزْدَادَ",
    "hebrew": "גדל, התרבה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إستخدم",
    "arabicVoc": "إِسْتَخْدَمَ",
    "hebrew": "השתמש ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "إستطاع",
    "arabicVoc": "إِسْتَطَاعَ",
    "hebrew": "יכול, היה ביכולתו",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إستعد ل",
    "arabicVoc": "إِسْتَعَدَِّ ل",
    "hebrew": "התכונן ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أسير",
    "arabicVoc": "أَسِير",
    "hebrew": "שבוי, אסיר",
    "translit": null,
    "plural": "أَسْرَى"
  },
  {
    "chapter": 6,
    "arabic": "أصاب",
    "arabicVoc": "أَصَابَ",
    "hebrew": "פגע ב-, פצע",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "مصاب",
    "arabicVoc": "مُصَاب",
    "hebrew": "נפגע, נפצע/ - פצוע",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أصبح",
    "arabicVoc": "أَصْبَحَ",
    "hebrew": "נהיה, נעשה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أظهر",
    "arabicVoc": "أَظْهَرَ",
    "hebrew": "הראה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إعادة",
    "arabicVoc": "إِعَادَة",
    "hebrew": "חידוש",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إعتبارامن",
    "arabicVoc": "إِعْتِبَارًاْمِن",
    "hebrew": "החל מ",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إعتبر",
    "arabicVoc": "إِعْتَبَرَ",
    "hebrew": "חשב את- ל... נחשב ל",
    "translit": null,
    "verbPresent": "يُعْتَبَرُ",
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "أفاد",
    "arabicVoc": "أَفَادَ",
    "hebrew": "מסר (ידיעה), הודיע",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أفرج عن",
    "arabicVoc": "أَفْرَجَ عَن",
    "hebrew": "שחרר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أقام",
    "arabicVoc": "أَقَامَ",
    "hebrew": "הקים, ערך, שהה, התגורר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أقر",
    "arabicVoc": "أَقَر",
    "hebrew": "אישר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إلا",
    "arabicVoc": "إِلا",
    "hebrew": "אלא, מלבד",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ألبحر الأبيض المتوسط",
    "arabicVoc": "أَلْبَحْرُ الْأَبْيَض الْمُتَوَسِّط",
    "hebrew": "הים התיכון",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ألبحر الأحمر",
    "arabicVoc": "أَلْبَحْر الْأَحْمَر",
    "hebrew": "ים סוף (הים האדום)",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إلتقى",
    "arabicVoc": "إِلْتَقَى",
    "hebrew": "פגש",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ألعامية",
    "arabicVoc": "أَلْعَامِّيَّة",
    "hebrew": "השפה) המדוברת",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ألغى",
    "arabicVoc": "أَلْغَى",
    "hebrew": "ביטל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "الفصحى",
    "arabicVoc": "الْفُصْحَى",
    "hebrew": "השפה הספרותית, התקנית (שפה רהוטה)",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إمكانية",
    "arabicVoc": "إمْكَانِيَّة",
    "hebrew": "אפשרות",
    "translit": null,
    "plural": "إمْكَانِيَّات"
  },
  {
    "chapter": 6,
    "arabic": "أمين عام",
    "arabicVoc": "أَمِينّ عَام",
    "hebrew": "מזכ\"ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إنتهى",
    "arabicVoc": "إِنْتَهَى",
    "hebrew": "הסתיים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "إنضم إلى",
    "arabicVoc": "إِنْضَم إَلى",
    "hebrew": "הצטרף ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أوضح",
    "arabicVoc": "أَوْضَحَ",
    "hebrew": "הבהיר, הסביר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "آية",
    "arabicVoc": "آيَة",
    "hebrew": "פסוק (מן הקוראן)",
    "translit": null,
    "plural": "آيَات"
  },
  {
    "chapter": 6,
    "arabic": "إيجابي",
    "arabicVoc": "إيجَابي",
    "hebrew": "חיובי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "أيد",
    "arabicVoc": "أَيَّدَ",
    "hebrew": "תמך ב",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "باحث",
    "arabicVoc": "بَاحِثَ",
    "hebrew": "חוקר",
    "translit": null,
    "plural": "بَاحِثُونَ / بَاحِثِينَ"
  },
  {
    "chapter": 6,
    "arabic": "بث",
    "arabicVoc": "بَثّ",
    "hebrew": "שידור",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بدون / دون",
    "arabicVoc": "بِدُونَ / دُون",
    "hebrew": "ללא, מבלי...",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بعض ال",
    "arabicVoc": "بَعْض ال",
    "hebrew": "מקצת, חלק",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بل",
    "arabicVoc": "بَلْ",
    "hebrew": "יתר על כן, אדרבה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بلغ",
    "arabicVoc": "بَلَغُ",
    "hebrew": "הגיע ל",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "بناء على",
    "arabicVoc": "بِنَاءً عَلَى",
    "hebrew": "על סמך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بواسطة",
    "arabicVoc": "بِوَاسِطَة",
    "hebrew": "באמצעות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بيئة",
    "arabicVoc": "بِيئَة",
    "hebrew": "סביבה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "بينما",
    "arabicVoc": "بَيْنَمَا",
    "hebrew": "בעוד ש",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تابع ل",
    "arabicVoc": "تَابِعِ ل",
    "hebrew": "שייך ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تسامح",
    "arabicVoc": "تَسَامُح",
    "hebrew": "סובלנות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تسوية",
    "arabicVoc": "تَسْوِيَة",
    "hebrew": "הסדר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تضمن",
    "arabicVoc": "تَضَمَّنَ",
    "hebrew": "כלל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تمثل",
    "arabicVoc": "تَمََثَّل",
    "hebrew": "בא לידי ביטוי ב..., התאפיין ב..",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تمنى",
    "arabicVoc": "تمََنى",
    "hebrew": "איחל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تهدئة / هدنة",
    "arabicVoc": "تَهْدِئَة / هُدْنَة",
    "hebrew": "רגיעה, הפסקת אש, שקט",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "تهمة",
    "arabicVoc": "تُهْمَة",
    "hebrew": "אשמה",
    "translit": null,
    "plural": "تُهَم"
  },
  {
    "chapter": 6,
    "arabic": "جزء",
    "arabicVoc": "جُزْء",
    "hebrew": "חלק",
    "translit": null,
    "plural": "أَجْزَاء"
  },
  {
    "chapter": 6,
    "arabic": "جمعية",
    "arabicVoc": "جَمْعِيَّة",
    "hebrew": "אגודה, ארגון",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "جمهورية",
    "arabicVoc": "جُمْهُورِيَّة",
    "hebrew": "רפובליקה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "جنسية",
    "arabicVoc": "جِنْسِيَّة",
    "hebrew": "אזרחות, נתינות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "جهاز",
    "arabicVoc": "جِهَاز",
    "hebrew": "מכשיר, מנגנון",
    "translit": null,
    "plural": "أَجْهِزَة"
  },
  {
    "chapter": 6,
    "arabic": "جواز سفر",
    "arabicVoc": "جَوَاز سَفَر",
    "hebrew": "דרכון",
    "translit": null,
    "plural": "جَوَازَات سَفَر"
  },
  {
    "chapter": 6,
    "arabic": "جيد",
    "arabicVoc": "جَيِّد",
    "hebrew": "טוב",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حاجز",
    "arabicVoc": "حَاجِز",
    "hebrew": "מחסום",
    "translit": null,
    "plural": "حَوَاجِز"
  },
  {
    "chapter": 6,
    "arabic": "حركة",
    "arabicVoc": "حرَكَة",
    "hebrew": "תנועה",
    "translit": null,
    "plural": "حرَكَات"
  },
  {
    "chapter": 6,
    "arabic": "حرية / حرية التعبير",
    "arabicVoc": "حُرِّيَّة / حُرِّيَّة التَّعْبِير",
    "hebrew": "חופש, חירות/ חופש הביטוי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حسب",
    "arabicVoc": "حَسَب",
    "hebrew": "לפי, בהתאם ל...",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حصل على",
    "arabicVoc": "حَصَلَ عَلَى",
    "hebrew": "השיג, קיבל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حقق مع في",
    "arabicVoc": "حَقَّقَِ مَعَ في",
    "hebrew": "חקר את- על",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حمل",
    "arabicVoc": "حمََلِ",
    "hebrew": "נשא",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حملة",
    "arabicVoc": "حَمْلَة",
    "hebrew": "מסע, קמפיין, מבצע",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حياة",
    "arabicVoc": "حَيَاة",
    "hebrew": "חיים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "حين حينما",
    "arabicVoc": "حِينَ حِينَمَا",
    "hebrew": "בשעה ש, בזמן...",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "خطة",
    "arabicVoc": "خُطَّةُ",
    "hebrew": "תכנית",
    "translit": null,
    "plural": "خطَط"
  },
  {
    "chapter": 6,
    "arabic": "دراسة",
    "arabicVoc": "دِرَاسَة",
    "hebrew": "מחקר",
    "translit": null,
    "plural": "دِرَاسَات"
  },
  {
    "chapter": 6,
    "arabic": "دعا",
    "arabicVoc": "دَعَا",
    "hebrew": "הזמין, קרא ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "دعوة",
    "arabicVoc": "دَعْوَة",
    "hebrew": "הזמנה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "دفع",
    "arabicVoc": "دَفَعَ",
    "hebrew": "שילם, דחף",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ذكرى",
    "arabicVoc": "ذِكْرَى",
    "hebrew": "יום הזיכרון, יום השנה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "رأي",
    "arabicVoc": "رَأْي",
    "hebrew": "דעה",
    "translit": null,
    "plural": "آرَاء"
  },
  {
    "chapter": 6,
    "arabic": "رجل أعمال",
    "arabicVoc": "رَجُل أَعْمَال",
    "hebrew": "איש עסקים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "رد",
    "arabicVoc": "رَدَّ",
    "hebrew": "ענה, השיב",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ردا على",
    "arabicVoc": "رَدًّا عَلَى",
    "hebrew": "בתגובה ל-, בתשובה ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "رغبة في",
    "arabicVoc": "رَغْبَةًِ في",
    "hebrew": "מתוך רצון/שאיפה ל...",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "زاد",
    "arabicVoc": "زَادَ",
    "hebrew": "עלה על, התווסף ל",
    "translit": null,
    "plural": "زَادُونَ / زَادِينَ"
  },
  {
    "chapter": 6,
    "arabic": "زميل",
    "arabicVoc": "زَمِيل",
    "hebrew": "עמית",
    "translit": null,
    "plural": "زُمَلاَء"
  },
  {
    "chapter": 6,
    "arabic": "سامية أللاسامية",
    "arabicVoc": "سَامِيَّة أَللّاسَامِيَّة",
    "hebrew": "שמיות, - אנטישמיות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "سجن",
    "arabicVoc": "سِجْن",
    "hebrew": "בית-כלא, בית-סוהר",
    "translit": null,
    "plural": "سُجُون"
  },
  {
    "chapter": 6,
    "arabic": "سجين",
    "arabicVoc": "سَجِين",
    "hebrew": "אסיר",
    "translit": null,
    "plural": "سُجَنَاء"
  },
  {
    "chapter": 6,
    "arabic": "سر",
    "arabicVoc": "سِرّ",
    "hebrew": "סוד",
    "translit": null,
    "plural": "أَسْرَار"
  },
  {
    "chapter": 6,
    "arabic": "سعر",
    "arabicVoc": "سِعْر",
    "hebrew": "מחיר",
    "translit": null,
    "plural": "أَسْعَار"
  },
  {
    "chapter": 6,
    "arabic": "سلبي",
    "arabicVoc": "سَلْبي",
    "hebrew": "שלילי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "سوى",
    "arabicVoc": "سِوَى",
    "hebrew": "מלבד-, חוץ מ",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "سيطرة",
    "arabicVoc": "سَيْطَرَة",
    "hebrew": "שליטה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شاطئ",
    "arabicVoc": "شَاطِئ",
    "hebrew": "חוף",
    "translit": null,
    "plural": "شَوَاطِئ"
  },
  {
    "chapter": 6,
    "arabic": "شامل",
    "arabicVoc": "شَامِل",
    "hebrew": "כולל, מקיף",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شبكة",
    "arabicVoc": "شَبَكَة",
    "hebrew": "רשת/",
    "translit": null,
    "plural": "ات / شَبَكَة التَّوَاصُل"
  },
  {
    "chapter": 6,
    "arabic": "الاجتماعي",
    "arabicVoc": "الْاجْتِمَاعِي",
    "hebrew": "רשת חברתית",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شرط",
    "arabicVoc": "شَرْط",
    "hebrew": "תנאי",
    "translit": null,
    "plural": "شُرُوط"
  },
  {
    "chapter": 6,
    "arabic": "شك / لا شك أن,في",
    "arabicVoc": "شَك / لاَ شَكَّ أَن,ِفي",
    "hebrew": "ספק /, – אין ספק ש",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شهادة",
    "arabicVoc": "شَهَادَة",
    "hebrew": "עדות, תעודה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شهد",
    "arabicVoc": "شَهِدَ",
    "hebrew": "היה עד ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "شيء",
    "arabicVoc": "شَيْء",
    "hebrew": "דבר",
    "translit": null,
    "plural": "أَشْيَاء"
  },
  {
    "chapter": 6,
    "arabic": "صحة",
    "arabicVoc": "صِحَّة",
    "hebrew": "בריאות, אמיתות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "صراع",
    "arabicVoc": "صِرَاع",
    "hebrew": "מאבק",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "صلى",
    "arabicVoc": "صَلَّى",
    "hebrew": "התפלל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "صهيوني",
    "arabicVoc": "صَهْيُوني",
    "hebrew": "ציוני",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ضحية",
    "arabicVoc": "ضَحِيَّة",
    "hebrew": "קורבן",
    "translit": null,
    "plural": "ضَحَايَا"
  },
  {
    "chapter": 6,
    "arabic": "ضمن",
    "arabicVoc": "ضِمْنَ",
    "hebrew": "בתוך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "طالب",
    "arabicVoc": "طَالَبَ",
    "hebrew": "דרש מ",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "طب",
    "arabicVoc": "طِبّ",
    "hebrew": "רפואה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "طريقة",
    "arabicVoc": "طَرِيقَة",
    "hebrew": "אמצעי, דרך, שיטה",
    "translit": null,
    "plural": "طُرُق طَرَائِق"
  },
  {
    "chapter": 6,
    "arabic": "ظاهرة",
    "arabicVoc": "ظَاهِرَة",
    "hebrew": "תופעה",
    "translit": null,
    "plural": "ظَوَاهِر"
  },
  {
    "chapter": 6,
    "arabic": "ظروف",
    "arabicVoc": "ظُرُوف",
    "hebrew": "תנאים, נסיבות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "عاجل",
    "arabicVoc": "عَاجِل",
    "hebrew": "דחוף, מבזק חדשותי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "عبر",
    "arabicVoc": "عَبْرَ",
    "hebrew": "מעבר ל-, דרך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "عدم",
    "arabicVoc": "عَدَم",
    "hebrew": "מצדר – אי-, חוסר-, היעדר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "عقب",
    "arabicVoc": "عَقِبَ",
    "hebrew": "עקב, בעקבות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "علم / علمي",
    "arabicVoc": "عِلْم / عِلْمِيّ",
    "hebrew": "ידע, מדע / – מדעי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "عنف",
    "arabicVoc": "عُنْف",
    "hebrew": "אלימות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "غير",
    "arabicVoc": "غَيَّرَ",
    "hebrew": "שינה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "غير",
    "arabicVoc": "غَيرْ",
    "hebrew": "זולת, מלבד, חוץ מ",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "فرد",
    "arabicVoc": "فَرْد",
    "hebrew": "איש",
    "translit": null,
    "plural": "أَفْرَاد"
  },
  {
    "chapter": 6,
    "arabic": "فساد",
    "arabicVoc": "فَسَاد",
    "hebrew": "שחיתות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "قانون",
    "arabicVoc": "قَانُون",
    "hebrew": "חוק",
    "translit": null,
    "plural": "قَوَانِين"
  },
  {
    "chapter": 6,
    "arabic": "قتل",
    "arabicVoc": "قَتَلَُ",
    "hebrew": "הרג",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "قدر",
    "arabicVoc": "قَدَّرَ",
    "hebrew": "העריך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "قناة",
    "arabicVoc": "قَنَاة",
    "hebrew": "ערוץ, תעלה, אפיק",
    "translit": null,
    "plural": "قَنَوَات"
  },
  {
    "chapter": 6,
    "arabic": "قيادة / قيادي",
    "arabicVoc": "قِيَادَة / قِيَادِيّ",
    "hebrew": "מפקדה, הנהגה/ - בכיר, מפקד, מנהיג",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "قيمة",
    "arabicVoc": "قِيمَة",
    "hebrew": "ערך",
    "translit": null,
    "plural": "قِيَم"
  },
  {
    "chapter": 6,
    "arabic": "كافة",
    "arabicVoc": "كَافَّة",
    "hebrew": "כל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "كامل",
    "arabicVoc": "كَامِل",
    "hebrew": "שלם",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "كشف",
    "arabicVoc": "كَشَفِ",
    "hebrew": "גילה, חשף",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "كهرباء",
    "arabicVoc": "كَهْرَبَاء",
    "hebrew": "חשמל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "كيان",
    "arabicVoc": "كِيَان",
    "hebrew": "ישות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "لا بد من",
    "arabicVoc": "لْاَ بُدَّ مِن",
    "hebrew": "אין מנוס מ",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "لاجئ",
    "arabicVoc": "لَاَجِئ",
    "hebrew": "פליט",
    "translit": null,
    "plural": "لَاَجِئُونَ / لَاَجِئِينَ"
  },
  {
    "chapter": 6,
    "arabic": "مادة",
    "arabicVoc": "مَادَّةّ",
    "hebrew": "חומר, נושא",
    "translit": null,
    "plural": "مَوَاد"
  },
  {
    "chapter": 6,
    "arabic": "مباشر",
    "arabicVoc": "مُبَاشِر",
    "hebrew": "ישיר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مباشرة",
    "arabicVoc": "مُبَاشَرَةً",
    "hebrew": "מיד, ישירות ל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مبدأ",
    "arabicVoc": "مَبْدَأ",
    "hebrew": "עיקרון, יסוד",
    "translit": null,
    "plural": "مَبَادِئ"
  },
  {
    "chapter": 6,
    "arabic": "مبلغ",
    "arabicVoc": "مَبْلَغ",
    "hebrew": "סכום",
    "translit": null,
    "plural": "مَبَالِغ"
  },
  {
    "chapter": 6,
    "arabic": "متبادل",
    "arabicVoc": "مُتَبَادَل",
    "hebrew": "הדדי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مثلا",
    "arabicVoc": "مَثَلاً",
    "hebrew": "למשל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مجلة",
    "arabicVoc": "مَجَلَّة",
    "hebrew": "מגזין, כתב עת",
    "translit": null,
    "plural": "مَجَلَّات"
  },
  {
    "chapter": 6,
    "arabic": "مجلس",
    "arabicVoc": "مَجْلِس",
    "hebrew": "מועצה",
    "translit": null,
    "plural": "مجَالِس"
  },
  {
    "chapter": 6,
    "arabic": "محكمة",
    "arabicVoc": "مَحْكَمَة",
    "hebrew": "בית משפט/",
    "translit": null,
    "plural": "مَحَاكِم"
  },
  {
    "chapter": 6,
    "arabic": "ألمحكمة العليا",
    "arabicVoc": "أَلْمَحْكَمَة الْعُلْيَا",
    "hebrew": "בית המשפט העליון",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "محلي",
    "arabicVoc": "مّحََلِّي",
    "hebrew": "מקומי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مخدرات",
    "arabicVoc": "مُخَدِّرَات",
    "hebrew": "סמים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مخيم",
    "arabicVoc": "مُخَيَّم",
    "hebrew": "מחנה",
    "translit": null,
    "plural": "مُخَيَّمات"
  },
  {
    "chapter": 6,
    "arabic": "مدة",
    "arabicVoc": "مُدَّة",
    "hebrew": "פרק זמן",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ألمزيد من",
    "arabicVoc": "أْلْمَزِيد مِن",
    "hebrew": "עוד, תוספת",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مسؤولية",
    "arabicVoc": "مَسْؤُولِيَّة",
    "hebrew": "אחריות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مستوى",
    "arabicVoc": "مُسْتَوَى",
    "hebrew": "רמה, דרג, מישור",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مستوطن",
    "arabicVoc": "مُسْتَوْطِن",
    "hebrew": "מתיישב, מתנחל",
    "translit": null,
    "plural": "مُسْتَوْطِنُونَ / مُسْتَوْطِنِينَ"
  },
  {
    "chapter": 6,
    "arabic": "مشبوه",
    "arabicVoc": "مَشْبُوه",
    "hebrew": "חשוד",
    "translit": null,
    "plural": "مَشْبُوهُونَ / مَشْبُوهِينَ"
  },
  {
    "chapter": 6,
    "arabic": "معاهدة",
    "arabicVoc": "مُعَاهَدَة",
    "hebrew": "חוזה, הסכם, ברית",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "معظم",
    "arabicVoc": "مُعْظَم",
    "hebrew": "רוב",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "معين",
    "arabicVoc": "مُعَين",
    "hebrew": "ממונה, מסוים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مقر",
    "arabicVoc": "مَقَرّ",
    "hebrew": "מטה, מושב (של מפקדה), משכן",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مناسب",
    "arabicVoc": "مُنَاسِب",
    "hebrew": "מתאים",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "من ٱلممكن",
    "arabicVoc": "مِنَ ٱلْمُمْكِن",
    "hebrew": "אפשרי, יתכן",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "منزل",
    "arabicVoc": "مَنْزِل",
    "hebrew": "בית, משכן",
    "translit": null,
    "plural": "مَنَازِل"
  },
  {
    "chapter": 6,
    "arabic": "منقبل",
    "arabicVoc": "مِنِقِبَلْ",
    "hebrew": "מטעם...",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مهاجر",
    "arabicVoc": "مُهَاجِر",
    "hebrew": "מהגר",
    "translit": null,
    "plural": "مُهَاجِرُونَ / مُهَاجِرِينَ"
  },
  {
    "chapter": 6,
    "arabic": "مهرجان",
    "arabicVoc": "مِهْرَجَان",
    "hebrew": "חגיגה, פסטיבל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مهمة",
    "arabicVoc": "مُهِمَّةّ",
    "hebrew": "משימה, תפקיד",
    "translit": null,
    "plural": "ات مَهَام"
  },
  {
    "chapter": 6,
    "arabic": "موقع",
    "arabicVoc": "مَوْقِع",
    "hebrew": "אתר (באינטרנט), עמדה",
    "translit": null,
    "plural": "مَوَاقِع"
  },
  {
    "chapter": 6,
    "arabic": "موقف",
    "arabicVoc": "مَوْقِف",
    "hebrew": "תחנה, עמדה",
    "translit": null,
    "plural": "مَوَاقِف"
  },
  {
    "chapter": 6,
    "arabic": "موقف من",
    "arabicVoc": "مَوْقِفِ مْن",
    "hebrew": "עמדה כלפי)",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ميدان",
    "arabicVoc": "مَيْدَان",
    "hebrew": "כיכר, שטח, שדה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "ميزانية",
    "arabicVoc": "مِيزَانِيَّة",
    "hebrew": "תקציב",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "مشروع ميزانية",
    "arabicVoc": "مَشْرُوع مِيزَانِيَّة",
    "hebrew": "הצעת תקציב",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "نائب",
    "arabicVoc": "نَائِب",
    "hebrew": "סגן, ציר (בפרלמנט)",
    "translit": null,
    "plural": "نُوَّاب"
  },
  {
    "chapter": 6,
    "arabic": "ناشط / نشيط",
    "arabicVoc": "نَاشِط / نَشِيط",
    "hebrew": "פעיל",
    "translit": null,
    "plural": "نُشَطَاء"
  },
  {
    "chapter": 6,
    "arabic": "نشاط",
    "arabicVoc": "نَشَاط",
    "hebrew": "פעילות",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "نفى",
    "arabicVoc": "نَفَى",
    "hebrew": "הכחיש, שלל",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "نفذ",
    "arabicVoc": "نَفَّذَ",
    "hebrew": "ביצע",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "نفس ال",
    "arabicVoc": "نَفْس ال",
    "hebrew": "אותו ה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "نوع",
    "arabicVoc": "نَوْع",
    "hebrew": "סוג, מין",
    "translit": null,
    "plural": "أَنْوَاع"
  },
  {
    "chapter": 6,
    "arabic": "نووي",
    "arabicVoc": "نَوَوِيّ",
    "hebrew": "גרעיני, אטומי",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "هاجم",
    "arabicVoc": "هَاجَمَ",
    "hebrew": "תקף",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "هبط",
    "arabicVoc": "هَبَطُ",
    "hebrew": "נחת",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "هجوم",
    "arabicVoc": "هُجُوم",
    "hebrew": "התקפה",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "هدد",
    "arabicVoc": "هَدَّدَ",
    "hebrew": "איים על",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "هكذا",
    "arabicVoc": "هٰكَذَا",
    "hebrew": "כך",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "هيئة",
    "arabicVoc": "هَيْئَة",
    "hebrew": "ארגון, גוף, צוות",
    "translit": null,
    "plural": "هَيْئَات"
  },
  {
    "chapter": 6,
    "arabic": "واجه",
    "arabicVoc": "وَاجَهَ",
    "hebrew": "עמד בפני, נתקל ב, התמודד עם",
    "translit": null,
    "transitive": true
  },
  {
    "chapter": 6,
    "arabic": "وحده",
    "arabicVoc": "وَحْدَهُ",
    "hebrew": "לבדו",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "وصف",
    "arabicVoc": "وَصَفِ",
    "hebrew": "תאר",
    "translit": null
  },
  {
    "chapter": 6,
    "arabic": "يوجد",
    "arabicVoc": "يُوجَدُ",
    "hebrew": "ישנו, נמצא",
    "translit": null
  }
];
