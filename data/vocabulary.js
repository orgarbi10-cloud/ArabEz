// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py
// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.
//
// arabic: הכתיב הערבי הרגיל (ללא ניקוד) - לשימוש פנימי בלבד (השוואות
//   בבוחן ובחיפוש). לעולם לא לדרוס ולא להציג ללומד.
// arabicVoc: אותה מילה מנוקדת - להצגה בכל מקום שבו מוצגת מילה ללומד
//   (כרטיסיות, טבלת פרק, בוחן, תוצאות בוחן, חיפוש). null אם הפרק
//   עדיין לא עבר ניקוד (בעבודה הדרגתית, פרק-פרק).
//
// קונבנציית ניקוד (arabicVoc):
// - ניקוד פנימי מלא (פתחה/דמה/כסרה/סוכון/שדה) על כל אות.
// - בלי סימן יחסה סופי (צורת הפסק): كِتَاب ולא كِتَابٌ.
//   יוצא דופן: ביטויים שהתאבנו כתוארי-פועל שומרים על התנוין -
//   مَرْحَبًا، شُكْرًا، عَفْوًا، وَدَاعًا، أَهْلًا (וכיו"ב).
// - כינוי חבור מחובר (למשל ـكَ / ـِي / ـهُ) שומר על תנועת החיבור שלו
//   במלואה - היא לא יחסה סופית להסרה: اسْمُكَ، حَالُكَ.
// - בביטוי רב-מילים, רק המילה האחרונה מאבדת את היחסה שלה; מילים
//   פנימיות (סמיכות/מוגדר ע"י מילת יחס) שומרות על תנועת החיבור:
//   صَبَاحُ الْخَير.
// - המזה המחברת (همزة الوصل, כמו ב-اسم או ال הידוע) מסומנת בתנועת
//   עזר לקריאות - כסרה כברירת מחדל, פתחה ל-"ال" הידוע בתחילת הביטוי;
//   לא מסומנת כשמילה קודמת בתוך אותו ביטוי כבר מתחברת אליה.
// - אל הידוע לפני אות שמשית: הלמ"ד ללא סימן (בולעת/מיטמעת), שד"ה על
//   האות השמשית שאחריה; לפני אות ירחית: ל' מקבלת סוכון כרגיל.

const VOCAB_CHAPTERS = [
  {
    "num": 1,
    "title": "פרק 1: יסודות, ברכות ומילות שאלה"
  },
  {
    "num": 2,
    "title": "פרק 2: משפחה ואנשים"
  },
  {
    "num": 3,
    "title": "פרק 3: גוף האדם"
  },
  {
    "num": 4,
    "title": "פרק 4: מספרים וזמן"
  },
  {
    "num": 5,
    "title": "פרק 5: בית וריהוט"
  },
  {
    "num": 6,
    "title": "פרק 6: אוכל ומשקאות"
  },
  {
    "num": 7,
    "title": "פרק 7: צבעים ותארים"
  },
  {
    "num": 8,
    "title": "פרק 8: טבע ומזג אוויר"
  },
  {
    "num": 9,
    "title": "פרק 9: עיר, תחבורה וכיוונים"
  },
  {
    "num": 10,
    "title": "פרק 10: בית ספר, עבודה ותחביבים"
  }
];

const VOCABULARY = [
  {
    "chapter": 1,
    "arabic": "مرحبا",
    "arabicVoc": "مَرْحَبًا",
    "hebrew": "שלום / היי",
    "translit": "מרחבא"
  },
  {
    "chapter": 1,
    "arabic": "أهلا",
    "arabicVoc": "أَهْلًا",
    "hebrew": "ברוך הבא",
    "translit": "אהלא"
  },
  {
    "chapter": 1,
    "arabic": "السلام عليكم",
    "arabicVoc": "اَلسَّلَامُ عَلَيْكُمْ",
    "hebrew": "שלום עליכם",
    "translit": "אלסלאמ עליכמ"
  },
  {
    "chapter": 1,
    "arabic": "وداعا",
    "arabicVoc": "وَدَاعًا",
    "hebrew": "להתראות",
    "translit": "ודאעא"
  },
  {
    "chapter": 1,
    "arabic": "مع السلامة",
    "arabicVoc": "مَعَ السَّلَامَة",
    "hebrew": "לך/י לשלום",
    "translit": "מע אלסלאמה"
  },
  {
    "chapter": 1,
    "arabic": "نعم",
    "arabicVoc": "نَعَمْ",
    "hebrew": "כן",
    "translit": "נעמ"
  },
  {
    "chapter": 1,
    "arabic": "لا",
    "arabicVoc": "لَا",
    "hebrew": "לא",
    "translit": "לא"
  },
  {
    "chapter": 1,
    "arabic": "من فضلك",
    "arabicVoc": "مِنْ فَضْلِكَ",
    "hebrew": "בבקשה",
    "translit": "מנ פדלכ"
  },
  {
    "chapter": 1,
    "arabic": "شكرا",
    "arabicVoc": "شُكْرًا",
    "hebrew": "תודה",
    "translit": "שכרא"
  },
  {
    "chapter": 1,
    "arabic": "عفوا",
    "arabicVoc": "عَفْوًا",
    "hebrew": "על לא דבר / סליחה",
    "translit": "עפוא"
  },
  {
    "chapter": 1,
    "arabic": "آسف",
    "arabicVoc": "آسِف",
    "hebrew": "מצטער",
    "translit": "אספ"
  },
  {
    "chapter": 1,
    "arabic": "صباح الخير",
    "arabicVoc": "صَبَاحُ الْخَير",
    "hebrew": "בוקר טוב",
    "translit": "צבאח אלח'יר"
  },
  {
    "chapter": 1,
    "arabic": "مساء الخير",
    "arabicVoc": "مَسَاءُ الْخَير",
    "hebrew": "ערב טוב",
    "translit": "מסאא אלח'יר"
  },
  {
    "chapter": 1,
    "arabic": "تصبح على خير",
    "arabicVoc": "تُصْبِحُ عَلَى خَيْر",
    "hebrew": "לילה טוב",
    "translit": "תצבח עלא ח'יר"
  },
  {
    "chapter": 1,
    "arabic": "كيف حالك",
    "arabicVoc": "كَيْفَ حَالُكَ",
    "hebrew": "מה שלומך",
    "translit": "כיפ חאלכ"
  },
  {
    "chapter": 1,
    "arabic": "بخير",
    "arabicVoc": "بِخَيْر",
    "hebrew": "בסדר / טוב",
    "translit": "בח'יר"
  },
  {
    "chapter": 1,
    "arabic": "ما اسمك",
    "arabicVoc": "مَا اسْمُكَ",
    "hebrew": "מה שמך",
    "translit": "מא אסמכ"
  },
  {
    "chapter": 1,
    "arabic": "اسمي",
    "arabicVoc": "اِسْمِي",
    "hebrew": "שמי",
    "translit": "אסמי"
  },
  {
    "chapter": 1,
    "arabic": "من",
    "arabicVoc": "مَنْ",
    "hebrew": "מי?",
    "translit": "מנ"
  },
  {
    "chapter": 1,
    "arabic": "ماذا",
    "arabicVoc": "مَاذَا",
    "hebrew": "מה?",
    "translit": "מאד'א"
  },
  {
    "chapter": 1,
    "arabic": "أين",
    "arabicVoc": "أَيْنَ",
    "hebrew": "איפה?",
    "translit": "אינ"
  },
  {
    "chapter": 1,
    "arabic": "متى",
    "arabicVoc": "مَتَى",
    "hebrew": "מתי?",
    "translit": "מתא"
  },
  {
    "chapter": 1,
    "arabic": "لماذا",
    "arabicVoc": "لِمَاذَا",
    "hebrew": "למה?",
    "translit": "למאד'א"
  },
  {
    "chapter": 1,
    "arabic": "كيف",
    "arabicVoc": "كَيْفَ",
    "hebrew": "איך?",
    "translit": "כיפ"
  },
  {
    "chapter": 1,
    "arabic": "كم",
    "arabicVoc": "كَمْ",
    "hebrew": "כמה?",
    "translit": "כמ"
  },
  {
    "chapter": 1,
    "arabic": "أي",
    "arabicVoc": "أَيّ",
    "hebrew": "איזה?",
    "translit": "אי"
  },
  {
    "chapter": 1,
    "arabic": "هل",
    "arabicVoc": "هَلْ",
    "hebrew": "האם? (מילית שאלה)",
    "translit": "הל"
  },
  {
    "chapter": 1,
    "arabic": "و",
    "arabicVoc": "وَ",
    "hebrew": "ו-",
    "translit": "ו"
  },
  {
    "chapter": 1,
    "arabic": "أو",
    "arabicVoc": "أَوْ",
    "hebrew": "או",
    "translit": "או"
  },
  {
    "chapter": 1,
    "arabic": "لكن",
    "arabicVoc": "لَكِنْ",
    "hebrew": "אבל",
    "translit": "לכנ"
  },
  {
    "chapter": 1,
    "arabic": "كمان",
    "arabicVoc": "كَمَان",
    "hebrew": "גם",
    "translit": "כמאנ"
  },
  {
    "chapter": 1,
    "arabic": "الآن",
    "arabicVoc": "اَلْآنَ",
    "hebrew": "עכשיו",
    "translit": "אלאנ"
  },
  {
    "chapter": 1,
    "arabic": "هنا",
    "arabicVoc": "هُنَا",
    "hebrew": "כאן",
    "translit": "הנא"
  },
  {
    "chapter": 1,
    "arabic": "هناك",
    "arabicVoc": "هُنَاكَ",
    "hebrew": "שם",
    "translit": "הנאכ"
  },
  {
    "chapter": 1,
    "arabic": "بالطبع/طبعاً",
    "arabicVoc": "بِالطَّبْع / طَبْعًا",
    "hebrew": "כמובן",
    "translit": "באלטבע/טבעאן"
  },
  {
    "chapter": 1,
    "arabic": "جيد",
    "arabicVoc": "جَيِّد",
    "hebrew": "טוב (איכות)",
    "translit": "ג'יד"
  },
  {
    "chapter": 1,
    "arabic": "سيء",
    "arabicVoc": "سَيِّئ",
    "hebrew": "רע",
    "translit": "סיא"
  },
  {
    "chapter": 1,
    "arabic": "جديد",
    "arabicVoc": "جَدِيد",
    "hebrew": "חדש",
    "translit": "ג'דיד"
  },
  {
    "chapter": 1,
    "arabic": "قديم",
    "arabicVoc": "قَدِيم",
    "hebrew": "ישן",
    "translit": "קדימ"
  },
  {
    "chapter": 1,
    "arabic": "عربي",
    "arabicVoc": "عَرَبِيّ",
    "hebrew": "ערבי / ערבית",
    "translit": "ערבי"
  },
  {
    "chapter": 2,
    "arabic": "أب",
    "arabicVoc": null,
    "hebrew": "אבא",
    "translit": "אב"
  },
  {
    "chapter": 2,
    "arabic": "أم",
    "arabicVoc": null,
    "hebrew": "אמא",
    "translit": "אמ"
  },
  {
    "chapter": 2,
    "arabic": "ابن",
    "arabicVoc": null,
    "hebrew": "בן",
    "translit": "אבנ"
  },
  {
    "chapter": 2,
    "arabic": "ابنة",
    "arabicVoc": null,
    "hebrew": "בת",
    "translit": "אבנה"
  },
  {
    "chapter": 2,
    "arabic": "أخ",
    "arabicVoc": null,
    "hebrew": "אח",
    "translit": "אח'"
  },
  {
    "chapter": 2,
    "arabic": "أخت",
    "arabicVoc": null,
    "hebrew": "אחות",
    "translit": "אח'ת"
  },
  {
    "chapter": 2,
    "arabic": "جد",
    "arabicVoc": null,
    "hebrew": "סבא",
    "translit": "ג'ד"
  },
  {
    "chapter": 2,
    "arabic": "جدة",
    "arabicVoc": null,
    "hebrew": "סבתא",
    "translit": "ג'דה"
  },
  {
    "chapter": 2,
    "arabic": "عم",
    "arabicVoc": null,
    "hebrew": "דוד (מצד אב)",
    "translit": "עמ"
  },
  {
    "chapter": 2,
    "arabic": "عمة",
    "arabicVoc": null,
    "hebrew": "דודה (מצד אב)",
    "translit": "עמה"
  },
  {
    "chapter": 2,
    "arabic": "خال",
    "arabicVoc": null,
    "hebrew": "דוד (מצד אם)",
    "translit": "ח'אל"
  },
  {
    "chapter": 2,
    "arabic": "خالة",
    "arabicVoc": null,
    "hebrew": "דודה (מצד אם)",
    "translit": "ח'אלה"
  },
  {
    "chapter": 2,
    "arabic": "زوج",
    "arabicVoc": null,
    "hebrew": "בעל",
    "translit": "זוג'"
  },
  {
    "chapter": 2,
    "arabic": "زوجة",
    "arabicVoc": null,
    "hebrew": "אישה / רעיה",
    "translit": "זוג'ה"
  },
  {
    "chapter": 2,
    "arabic": "ولد",
    "arabicVoc": null,
    "hebrew": "ילד / בן",
    "translit": "ולד"
  },
  {
    "chapter": 2,
    "arabic": "بنت",
    "arabicVoc": null,
    "hebrew": "ילדה / בת",
    "translit": "בנת"
  },
  {
    "chapter": 2,
    "arabic": "رجل",
    "arabicVoc": null,
    "hebrew": "גבר",
    "translit": "רג'ל"
  },
  {
    "chapter": 2,
    "arabic": "امرأة",
    "arabicVoc": null,
    "hebrew": "אישה",
    "translit": "אמראה"
  },
  {
    "chapter": 2,
    "arabic": "طفل",
    "arabicVoc": null,
    "hebrew": "תינוק / ילד קטן",
    "translit": "טפל"
  },
  {
    "chapter": 2,
    "arabic": "شاب",
    "arabicVoc": null,
    "hebrew": "צעיר",
    "translit": "שאב"
  },
  {
    "chapter": 2,
    "arabic": "عجوز",
    "arabicVoc": null,
    "hebrew": "זקן",
    "translit": "עג'וז"
  },
  {
    "chapter": 2,
    "arabic": "صديق",
    "arabicVoc": null,
    "hebrew": "חבר",
    "translit": "צדיק"
  },
  {
    "chapter": 2,
    "arabic": "صديقة",
    "arabicVoc": null,
    "hebrew": "חברה",
    "translit": "צדיקה"
  },
  {
    "chapter": 2,
    "arabic": "جار",
    "arabicVoc": null,
    "hebrew": "שכן",
    "translit": "ג'אר"
  },
  {
    "chapter": 2,
    "arabic": "أستاذ",
    "arabicVoc": null,
    "hebrew": "מורה (ז)",
    "translit": "אסתאד'"
  },
  {
    "chapter": 2,
    "arabic": "أستاذة",
    "arabicVoc": null,
    "hebrew": "מורה (נ)",
    "translit": "אסתאד'ה"
  },
  {
    "chapter": 2,
    "arabic": "طالب",
    "arabicVoc": null,
    "hebrew": "תלמיד / סטודנט",
    "translit": "טאלב"
  },
  {
    "chapter": 2,
    "arabic": "طالبة",
    "arabicVoc": null,
    "hebrew": "תלמידה / סטודנטית",
    "translit": "טאלבה"
  },
  {
    "chapter": 2,
    "arabic": "طبيب",
    "arabicVoc": null,
    "hebrew": "רופא",
    "translit": "טביב"
  },
  {
    "chapter": 2,
    "arabic": "مهندس",
    "arabicVoc": null,
    "hebrew": "מהנדס",
    "translit": "מהנדס"
  },
  {
    "chapter": 2,
    "arabic": "اسم",
    "arabicVoc": null,
    "hebrew": "שם",
    "translit": "אסמ"
  },
  {
    "chapter": 2,
    "arabic": "عائلة",
    "arabicVoc": null,
    "hebrew": "משפחה",
    "translit": "עאאלה"
  },
  {
    "chapter": 2,
    "arabic": "ناس",
    "arabicVoc": null,
    "hebrew": "אנשים",
    "translit": "נאס"
  },
  {
    "chapter": 2,
    "arabic": "شخص",
    "arabicVoc": null,
    "hebrew": "אדם / בן אדם",
    "translit": "שח'צ"
  },
  {
    "chapter": 2,
    "arabic": "رئيس",
    "arabicVoc": null,
    "hebrew": "נשיא / מנהל",
    "translit": "ראיס"
  },
  {
    "chapter": 2,
    "arabic": "ملك",
    "arabicVoc": null,
    "hebrew": "מלך",
    "translit": "מלכ"
  },
  {
    "chapter": 2,
    "arabic": "ضيف",
    "arabicVoc": null,
    "hebrew": "אורח",
    "translit": "דיפ"
  },
  {
    "chapter": 2,
    "arabic": "حبيب",
    "arabicVoc": null,
    "hebrew": "אהוב / יקיר",
    "translit": "חביב"
  },
  {
    "chapter": 2,
    "arabic": "إنسان",
    "arabicVoc": null,
    "hebrew": "בן אנוש",
    "translit": "אנסאנ"
  },
  {
    "chapter": 2,
    "arabic": "عروس",
    "arabicVoc": null,
    "hebrew": "כלה",
    "translit": "ערוס"
  },
  {
    "chapter": 3,
    "arabic": "رأس",
    "arabicVoc": null,
    "hebrew": "ראש",
    "translit": "ראס"
  },
  {
    "chapter": 3,
    "arabic": "وجه",
    "arabicVoc": null,
    "hebrew": "פנים",
    "translit": "וג'ה"
  },
  {
    "chapter": 3,
    "arabic": "عين",
    "arabicVoc": null,
    "hebrew": "עין",
    "translit": "עינ"
  },
  {
    "chapter": 3,
    "arabic": "أذن",
    "arabicVoc": null,
    "hebrew": "אוזן",
    "translit": "אד'נ"
  },
  {
    "chapter": 3,
    "arabic": "أنف",
    "arabicVoc": null,
    "hebrew": "אף",
    "translit": "אנפ"
  },
  {
    "chapter": 3,
    "arabic": "فم",
    "arabicVoc": null,
    "hebrew": "פה",
    "translit": "פמ"
  },
  {
    "chapter": 3,
    "arabic": "لسان",
    "arabicVoc": null,
    "hebrew": "לשון",
    "translit": "לסאנ"
  },
  {
    "chapter": 3,
    "arabic": "سن",
    "arabicVoc": null,
    "hebrew": "שן",
    "translit": "סנ"
  },
  {
    "chapter": 3,
    "arabic": "شعر",
    "arabicVoc": null,
    "hebrew": "שיער",
    "translit": "שער"
  },
  {
    "chapter": 3,
    "arabic": "رقبة",
    "arabicVoc": null,
    "hebrew": "צוואר",
    "translit": "רקבה"
  },
  {
    "chapter": 3,
    "arabic": "كتف",
    "arabicVoc": null,
    "hebrew": "כתף",
    "translit": "כתפ"
  },
  {
    "chapter": 3,
    "arabic": "يد",
    "arabicVoc": null,
    "hebrew": "יד",
    "translit": "יד"
  },
  {
    "chapter": 3,
    "arabic": "إصبع",
    "arabicVoc": null,
    "hebrew": "אצבע",
    "translit": "אצבע"
  },
  {
    "chapter": 3,
    "arabic": "ظهر",
    "arabicVoc": null,
    "hebrew": "גב",
    "translit": "ז'הר"
  },
  {
    "chapter": 3,
    "arabic": "صدر",
    "arabicVoc": null,
    "hebrew": "חזה",
    "translit": "צדר"
  },
  {
    "chapter": 3,
    "arabic": "بطن",
    "arabicVoc": null,
    "hebrew": "בטן",
    "translit": "בטנ"
  },
  {
    "chapter": 3,
    "arabic": "قلب",
    "arabicVoc": null,
    "hebrew": "לב",
    "translit": "קלב"
  },
  {
    "chapter": 3,
    "arabic": "رجل",
    "arabicVoc": null,
    "hebrew": "רגל",
    "translit": "רג'ל"
  },
  {
    "chapter": 3,
    "arabic": "ركبة",
    "arabicVoc": null,
    "hebrew": "ברך",
    "translit": "רכבה"
  },
  {
    "chapter": 3,
    "arabic": "قدم",
    "arabicVoc": null,
    "hebrew": "כף רגל",
    "translit": "קדמ"
  },
  {
    "chapter": 3,
    "arabic": "جسم",
    "arabicVoc": null,
    "hebrew": "גוף",
    "translit": "ג'סמ"
  },
  {
    "chapter": 3,
    "arabic": "دم",
    "arabicVoc": null,
    "hebrew": "דם",
    "translit": "דמ"
  },
  {
    "chapter": 3,
    "arabic": "عظم",
    "arabicVoc": null,
    "hebrew": "עצם",
    "translit": "עז'מ"
  },
  {
    "chapter": 3,
    "arabic": "جلد",
    "arabicVoc": null,
    "hebrew": "עור",
    "translit": "ג'לד"
  },
  {
    "chapter": 3,
    "arabic": "حاجب",
    "arabicVoc": null,
    "hebrew": "גבה",
    "translit": "חאג'ב"
  },
  {
    "chapter": 3,
    "arabic": "رمش",
    "arabicVoc": null,
    "hebrew": "ריס",
    "translit": "רמש"
  },
  {
    "chapter": 3,
    "arabic": "شفة",
    "arabicVoc": null,
    "hebrew": "שפה (של הפה)",
    "translit": "שפה"
  },
  {
    "chapter": 3,
    "arabic": "خد",
    "arabicVoc": null,
    "hebrew": "לחי",
    "translit": "ח'ד"
  },
  {
    "chapter": 3,
    "arabic": "ذقن",
    "arabicVoc": null,
    "hebrew": "סנטר",
    "translit": "ד'קנ"
  },
  {
    "chapter": 3,
    "arabic": "ظفر",
    "arabicVoc": null,
    "hebrew": "ציפורן",
    "translit": "ז'פר"
  },
  {
    "chapter": 3,
    "arabic": "معدة",
    "arabicVoc": null,
    "hebrew": "קיבה",
    "translit": "מעדה"
  },
  {
    "chapter": 3,
    "arabic": "رئة",
    "arabicVoc": null,
    "hebrew": "ריאה",
    "translit": "ראה"
  },
  {
    "chapter": 3,
    "arabic": "كبد",
    "arabicVoc": null,
    "hebrew": "כבד",
    "translit": "כבד"
  },
  {
    "chapter": 3,
    "arabic": "عضلة",
    "arabicVoc": null,
    "hebrew": "שריר",
    "translit": "עדלה"
  },
  {
    "chapter": 3,
    "arabic": "عقل",
    "arabicVoc": null,
    "hebrew": "שכל",
    "translit": "עקל"
  },
  {
    "chapter": 3,
    "arabic": "دماغ",
    "arabicVoc": null,
    "hebrew": "מוח",
    "translit": "דמאע'"
  },
  {
    "chapter": 3,
    "arabic": "صوت",
    "arabicVoc": null,
    "hebrew": "קול",
    "translit": "צות"
  },
  {
    "chapter": 3,
    "arabic": "نفس",
    "arabicVoc": null,
    "hebrew": "נשימה / נפש",
    "translit": "נפס"
  },
  {
    "chapter": 3,
    "arabic": "مرفق",
    "arabicVoc": null,
    "hebrew": "מרפק",
    "translit": "מרפק"
  },
  {
    "chapter": 3,
    "arabic": "فخذ",
    "arabicVoc": null,
    "hebrew": "ירך",
    "translit": "פח'ד'"
  },
  {
    "chapter": 4,
    "arabic": "صفر",
    "arabicVoc": null,
    "hebrew": "אפס",
    "translit": "צפר"
  },
  {
    "chapter": 4,
    "arabic": "واحد",
    "arabicVoc": null,
    "hebrew": "אחד",
    "translit": "ואחד"
  },
  {
    "chapter": 4,
    "arabic": "اثنان",
    "arabicVoc": null,
    "hebrew": "שניים",
    "translit": "את'נאנ"
  },
  {
    "chapter": 4,
    "arabic": "ثلاثة",
    "arabicVoc": null,
    "hebrew": "שלושה",
    "translit": "ת'לאת'ה"
  },
  {
    "chapter": 4,
    "arabic": "أربعة",
    "arabicVoc": null,
    "hebrew": "ארבעה",
    "translit": "ארבעה"
  },
  {
    "chapter": 4,
    "arabic": "خمسة",
    "arabicVoc": null,
    "hebrew": "חמישה",
    "translit": "ח'מסה"
  },
  {
    "chapter": 4,
    "arabic": "ستة",
    "arabicVoc": null,
    "hebrew": "שישה",
    "translit": "סתה"
  },
  {
    "chapter": 4,
    "arabic": "سبعة",
    "arabicVoc": null,
    "hebrew": "שבעה",
    "translit": "סבעה"
  },
  {
    "chapter": 4,
    "arabic": "ثمانية",
    "arabicVoc": null,
    "hebrew": "שמונה",
    "translit": "ת'מאניה"
  },
  {
    "chapter": 4,
    "arabic": "تسعة",
    "arabicVoc": null,
    "hebrew": "תשעה",
    "translit": "תסעה"
  },
  {
    "chapter": 4,
    "arabic": "عشرة",
    "arabicVoc": null,
    "hebrew": "עשרה",
    "translit": "עשרה"
  },
  {
    "chapter": 4,
    "arabic": "عشرون",
    "arabicVoc": null,
    "hebrew": "עשרים",
    "translit": "עשרונ"
  },
  {
    "chapter": 4,
    "arabic": "مئة",
    "arabicVoc": null,
    "hebrew": "מאה",
    "translit": "מאה"
  },
  {
    "chapter": 4,
    "arabic": "يوم",
    "arabicVoc": null,
    "hebrew": "יום",
    "translit": "יומ"
  },
  {
    "chapter": 4,
    "arabic": "أسبوع",
    "arabicVoc": null,
    "hebrew": "שבוע",
    "translit": "אסבוע"
  },
  {
    "chapter": 4,
    "arabic": "شهر",
    "arabicVoc": null,
    "hebrew": "חודש",
    "translit": "שהר"
  },
  {
    "chapter": 4,
    "arabic": "سنة",
    "arabicVoc": null,
    "hebrew": "שנה",
    "translit": "סנה"
  },
  {
    "chapter": 4,
    "arabic": "ساعة",
    "arabicVoc": null,
    "hebrew": "שעה",
    "translit": "סאעה"
  },
  {
    "chapter": 4,
    "arabic": "دقيقة",
    "arabicVoc": null,
    "hebrew": "דקה",
    "translit": "דקיקה"
  },
  {
    "chapter": 4,
    "arabic": "ثانية",
    "arabicVoc": null,
    "hebrew": "שנייה",
    "translit": "ת'אניה"
  },
  {
    "chapter": 4,
    "arabic": "صباح",
    "arabicVoc": null,
    "hebrew": "בוקר",
    "translit": "צבאח"
  },
  {
    "chapter": 4,
    "arabic": "ظهر",
    "arabicVoc": null,
    "hebrew": "צהריים",
    "translit": "ז'הר"
  },
  {
    "chapter": 4,
    "arabic": "مساء",
    "arabicVoc": null,
    "hebrew": "ערב",
    "translit": "מסאא"
  },
  {
    "chapter": 4,
    "arabic": "ليل",
    "arabicVoc": null,
    "hebrew": "לילה",
    "translit": "ליל"
  },
  {
    "chapter": 4,
    "arabic": "اليوم",
    "arabicVoc": null,
    "hebrew": "היום",
    "translit": "אליומ"
  },
  {
    "chapter": 4,
    "arabic": "غدا",
    "arabicVoc": null,
    "hebrew": "מחר",
    "translit": "ע'דא"
  },
  {
    "chapter": 4,
    "arabic": "أمس",
    "arabicVoc": null,
    "hebrew": "אתמול",
    "translit": "אמס"
  },
  {
    "chapter": 4,
    "arabic": "الأحد",
    "arabicVoc": null,
    "hebrew": "יום ראשון",
    "translit": "אלאחד"
  },
  {
    "chapter": 4,
    "arabic": "الاثنين",
    "arabicVoc": null,
    "hebrew": "יום שני",
    "translit": "אלאת'נינ"
  },
  {
    "chapter": 4,
    "arabic": "الثلاثاء",
    "arabicVoc": null,
    "hebrew": "יום שלישי",
    "translit": "אלת'לאת'אא"
  },
  {
    "chapter": 4,
    "arabic": "الأربعاء",
    "arabicVoc": null,
    "hebrew": "יום רביעי",
    "translit": "אלארבעאא"
  },
  {
    "chapter": 4,
    "arabic": "الخميس",
    "arabicVoc": null,
    "hebrew": "יום חמישי",
    "translit": "אלח'מיס"
  },
  {
    "chapter": 4,
    "arabic": "الجمعة",
    "arabicVoc": null,
    "hebrew": "יום שישי",
    "translit": "אלג'מעה"
  },
  {
    "chapter": 4,
    "arabic": "السبت",
    "arabicVoc": null,
    "hebrew": "שבת",
    "translit": "אלסבת"
  },
  {
    "chapter": 4,
    "arabic": "صباحا",
    "arabicVoc": null,
    "hebrew": "בבוקר",
    "translit": "צבאחא"
  },
  {
    "chapter": 4,
    "arabic": "مساء",
    "arabicVoc": null,
    "hebrew": "בערב",
    "translit": "מסאא"
  },
  {
    "chapter": 4,
    "arabic": "الآن",
    "arabicVoc": null,
    "hebrew": "עכשיו",
    "translit": "אלאנ"
  },
  {
    "chapter": 4,
    "arabic": "وقت",
    "arabicVoc": null,
    "hebrew": "זמן",
    "translit": "וקת"
  },
  {
    "chapter": 4,
    "arabic": "دائما",
    "arabicVoc": null,
    "hebrew": "תמיד",
    "translit": "דאאמא"
  },
  {
    "chapter": 4,
    "arabic": "أبدا",
    "arabicVoc": null,
    "hebrew": "אף פעם",
    "translit": "אבדא"
  },
  {
    "chapter": 5,
    "arabic": "بيت",
    "arabicVoc": null,
    "hebrew": "בית",
    "translit": "בית"
  },
  {
    "chapter": 5,
    "arabic": "منزل",
    "arabicVoc": null,
    "hebrew": "בית / מגורים",
    "translit": "מנזל"
  },
  {
    "chapter": 5,
    "arabic": "غرفة",
    "arabicVoc": null,
    "hebrew": "חדר",
    "translit": "ע'רפה"
  },
  {
    "chapter": 5,
    "arabic": "غرفة النوم",
    "arabicVoc": null,
    "hebrew": "חדר שינה",
    "translit": "ע'רפה אלנומ"
  },
  {
    "chapter": 5,
    "arabic": "مطبخ",
    "arabicVoc": null,
    "hebrew": "מטבח",
    "translit": "מטבח'"
  },
  {
    "chapter": 5,
    "arabic": "حمام",
    "arabicVoc": null,
    "hebrew": "שירותים / אמבטיה",
    "translit": "חמאמ"
  },
  {
    "chapter": 5,
    "arabic": "صالة",
    "arabicVoc": null,
    "hebrew": "סלון",
    "translit": "צאלה"
  },
  {
    "chapter": 5,
    "arabic": "باب",
    "arabicVoc": null,
    "hebrew": "דלת",
    "translit": "באב"
  },
  {
    "chapter": 5,
    "arabic": "شباك",
    "arabicVoc": null,
    "hebrew": "חלון",
    "translit": "שבאכ"
  },
  {
    "chapter": 5,
    "arabic": "تحت",
    "arabicVoc": null,
    "hebrew": "מיטה",
    "translit": "תחת"
  },
  {
    "chapter": 5,
    "arabic": "كرسي",
    "arabicVoc": null,
    "hebrew": "כיסא",
    "translit": "כרסי"
  },
  {
    "chapter": 5,
    "arabic": "طاولة",
    "arabicVoc": null,
    "hebrew": "שולחן",
    "translit": "טאולה"
  },
  {
    "chapter": 5,
    "arabic": "خزانة",
    "arabicVoc": null,
    "hebrew": "ארון",
    "translit": "ח'זאנה"
  },
  {
    "chapter": 5,
    "arabic": "مرآة",
    "arabicVoc": null,
    "hebrew": "מראה",
    "translit": "מראה"
  },
  {
    "chapter": 5,
    "arabic": "مصباح",
    "arabicVoc": null,
    "hebrew": "מנורה",
    "translit": "מצבאח"
  },
  {
    "chapter": 5,
    "arabic": "سجادة",
    "arabicVoc": null,
    "hebrew": "שטיח",
    "translit": "סג'אדה"
  },
  {
    "chapter": 5,
    "arabic": "ستارة",
    "arabicVoc": null,
    "hebrew": "וילון",
    "translit": "סתארה"
  },
  {
    "chapter": 5,
    "arabic": "مفتاح",
    "arabicVoc": null,
    "hebrew": "מפתח",
    "translit": "מפתאח"
  },
  {
    "chapter": 5,
    "arabic": "حائط",
    "arabicVoc": null,
    "hebrew": "קיר",
    "translit": "חאאט"
  },
  {
    "chapter": 5,
    "arabic": "سقف",
    "arabicVoc": null,
    "hebrew": "תקרה",
    "translit": "סקפ"
  },
  {
    "chapter": 5,
    "arabic": "أرض",
    "arabicVoc": null,
    "hebrew": "רצפה / אדמה",
    "translit": "ארד"
  },
  {
    "chapter": 5,
    "arabic": "درج",
    "arabicVoc": null,
    "hebrew": "מדרגות",
    "translit": "דרג'"
  },
  {
    "chapter": 5,
    "arabic": "حديقة",
    "arabicVoc": null,
    "hebrew": "גינה",
    "translit": "חדיקה"
  },
  {
    "chapter": 5,
    "arabic": "ثلاجة",
    "arabicVoc": null,
    "hebrew": "מקרר",
    "translit": "ת'לאג'ה"
  },
  {
    "chapter": 5,
    "arabic": "فرن",
    "arabicVoc": null,
    "hebrew": "תנור",
    "translit": "פרנ"
  },
  {
    "chapter": 5,
    "arabic": "غسالة",
    "arabicVoc": null,
    "hebrew": "מכונת כביסה",
    "translit": "ע'סאלה"
  },
  {
    "chapter": 5,
    "arabic": "تلفزيون",
    "arabicVoc": null,
    "hebrew": "טלוויזיה",
    "translit": "תלפזיונ"
  },
  {
    "chapter": 5,
    "arabic": "هاتف",
    "arabicVoc": null,
    "hebrew": "טלפון",
    "translit": "האתפ"
  },
  {
    "chapter": 5,
    "arabic": "حاسوب",
    "arabicVoc": null,
    "hebrew": "מחשב",
    "translit": "חאסוב"
  },
  {
    "chapter": 5,
    "arabic": "كتاب",
    "arabicVoc": null,
    "hebrew": "ספר",
    "translit": "כתאב"
  },
  {
    "chapter": 5,
    "arabic": "صورة",
    "arabicVoc": null,
    "hebrew": "תמונה",
    "translit": "צורה"
  },
  {
    "chapter": 5,
    "arabic": "ساعة حائط",
    "arabicVoc": null,
    "hebrew": "שעון קיר",
    "translit": "סאעה חאאט"
  },
  {
    "chapter": 5,
    "arabic": "حوض",
    "arabicVoc": null,
    "hebrew": "כיור",
    "translit": "חוד"
  },
  {
    "chapter": 5,
    "arabic": "صابون",
    "arabicVoc": null,
    "hebrew": "סבון",
    "translit": "צאבונ"
  },
  {
    "chapter": 5,
    "arabic": "منشفة",
    "arabicVoc": null,
    "hebrew": "מגבת",
    "translit": "מנשפה"
  },
  {
    "chapter": 5,
    "arabic": "وسادة",
    "arabicVoc": null,
    "hebrew": "כרית",
    "translit": "וסאדה"
  },
  {
    "chapter": 5,
    "arabic": "بطانية",
    "arabicVoc": null,
    "hebrew": "שמיכה",
    "translit": "בטאניה"
  },
  {
    "chapter": 5,
    "arabic": "مكتب",
    "arabicVoc": null,
    "hebrew": "שולחן כתיבה / משרד",
    "translit": "מכתב"
  },
  {
    "chapter": 5,
    "arabic": "رف",
    "arabicVoc": null,
    "hebrew": "מדף",
    "translit": "רפ"
  },
  {
    "chapter": 5,
    "arabic": "سلة",
    "arabicVoc": null,
    "hebrew": "סל",
    "translit": "סלה"
  },
  {
    "chapter": 6,
    "arabic": "خبز",
    "arabicVoc": null,
    "hebrew": "לחם",
    "translit": "ח'בז"
  },
  {
    "chapter": 6,
    "arabic": "ماء",
    "arabicVoc": null,
    "hebrew": "מים",
    "translit": "מאא"
  },
  {
    "chapter": 6,
    "arabic": "حليب",
    "arabicVoc": null,
    "hebrew": "חלב",
    "translit": "חליב"
  },
  {
    "chapter": 6,
    "arabic": "لحم",
    "arabicVoc": null,
    "hebrew": "בשר",
    "translit": "לחמ"
  },
  {
    "chapter": 6,
    "arabic": "دجاج",
    "arabicVoc": null,
    "hebrew": "עוף",
    "translit": "דג'אג'"
  },
  {
    "chapter": 6,
    "arabic": "سمك",
    "arabicVoc": null,
    "hebrew": "דג",
    "translit": "סמכ"
  },
  {
    "chapter": 6,
    "arabic": "أرز",
    "arabicVoc": null,
    "hebrew": "אורז",
    "translit": "ארז"
  },
  {
    "chapter": 6,
    "arabic": "بيض",
    "arabicVoc": null,
    "hebrew": "ביצים",
    "translit": "ביד"
  },
  {
    "chapter": 6,
    "arabic": "جبن",
    "arabicVoc": null,
    "hebrew": "גבינה",
    "translit": "ג'בנ"
  },
  {
    "chapter": 6,
    "arabic": "زبدة",
    "arabicVoc": null,
    "hebrew": "חמאה",
    "translit": "זבדה"
  },
  {
    "chapter": 6,
    "arabic": "سكر",
    "arabicVoc": null,
    "hebrew": "סוכר",
    "translit": "סכר"
  },
  {
    "chapter": 6,
    "arabic": "ملح",
    "arabicVoc": null,
    "hebrew": "מלח",
    "translit": "מלח"
  },
  {
    "chapter": 6,
    "arabic": "فاكهة",
    "arabicVoc": null,
    "hebrew": "פרי",
    "translit": "פאכהה"
  },
  {
    "chapter": 6,
    "arabic": "تفاح",
    "arabicVoc": null,
    "hebrew": "תפוח",
    "translit": "תפאח"
  },
  {
    "chapter": 6,
    "arabic": "موز",
    "arabicVoc": null,
    "hebrew": "בננה",
    "translit": "מוז"
  },
  {
    "chapter": 6,
    "arabic": "برتقال",
    "arabicVoc": null,
    "hebrew": "תפוז",
    "translit": "ברתקאל"
  },
  {
    "chapter": 6,
    "arabic": "عنب",
    "arabicVoc": null,
    "hebrew": "ענבים",
    "translit": "ענב"
  },
  {
    "chapter": 6,
    "arabic": "خضار",
    "arabicVoc": null,
    "hebrew": "ירקות",
    "translit": "ח'דאר"
  },
  {
    "chapter": 6,
    "arabic": "طماطم",
    "arabicVoc": null,
    "hebrew": "עגבנייה",
    "translit": "טמאטמ"
  },
  {
    "chapter": 6,
    "arabic": "بطاطا",
    "arabicVoc": null,
    "hebrew": "תפוח אדמה",
    "translit": "בטאטא"
  },
  {
    "chapter": 6,
    "arabic": "بصل",
    "arabicVoc": null,
    "hebrew": "בצל",
    "translit": "בצל"
  },
  {
    "chapter": 6,
    "arabic": "جزر",
    "arabicVoc": null,
    "hebrew": "גזר",
    "translit": "ג'זר"
  },
  {
    "chapter": 6,
    "arabic": "قهوة",
    "arabicVoc": null,
    "hebrew": "קפה",
    "translit": "קהוה"
  },
  {
    "chapter": 6,
    "arabic": "شاي",
    "arabicVoc": null,
    "hebrew": "תה",
    "translit": "שאי"
  },
  {
    "chapter": 6,
    "arabic": "عصير",
    "arabicVoc": null,
    "hebrew": "מיץ",
    "translit": "עציר"
  },
  {
    "chapter": 6,
    "arabic": "زيت",
    "arabicVoc": null,
    "hebrew": "שמן",
    "translit": "זית"
  },
  {
    "chapter": 6,
    "arabic": "عسل",
    "arabicVoc": null,
    "hebrew": "דבש",
    "translit": "עסל"
  },
  {
    "chapter": 6,
    "arabic": "حساء",
    "arabicVoc": null,
    "hebrew": "מרק",
    "translit": "חסאא"
  },
  {
    "chapter": 6,
    "arabic": "سلطة",
    "arabicVoc": null,
    "hebrew": "סלט",
    "translit": "סלטה"
  },
  {
    "chapter": 6,
    "arabic": "حلوى",
    "arabicVoc": null,
    "hebrew": "ממתק / קינוח",
    "translit": "חלוא"
  },
  {
    "chapter": 6,
    "arabic": "مطعم",
    "arabicVoc": null,
    "hebrew": "מסעדה",
    "translit": "מטעמ"
  },
  {
    "chapter": 6,
    "arabic": "فطور",
    "arabicVoc": null,
    "hebrew": "ארוחת בוקר",
    "translit": "פטור"
  },
  {
    "chapter": 6,
    "arabic": "غداء",
    "arabicVoc": null,
    "hebrew": "ארוחת צהריים",
    "translit": "ע'דאא"
  },
  {
    "chapter": 6,
    "arabic": "عشاء",
    "arabicVoc": null,
    "hebrew": "ארוחת ערב",
    "translit": "עשאא"
  },
  {
    "chapter": 6,
    "arabic": "طعام",
    "arabicVoc": null,
    "hebrew": "אוכל",
    "translit": "טעאמ"
  },
  {
    "chapter": 6,
    "arabic": "ملعقة",
    "arabicVoc": null,
    "hebrew": "כף",
    "translit": "מלעקה"
  },
  {
    "chapter": 6,
    "arabic": "شوكة",
    "arabicVoc": null,
    "hebrew": "מזלג",
    "translit": "שוכה"
  },
  {
    "chapter": 6,
    "arabic": "سكين",
    "arabicVoc": null,
    "hebrew": "סכין",
    "translit": "סכינ"
  },
  {
    "chapter": 6,
    "arabic": "صحن",
    "arabicVoc": null,
    "hebrew": "צלחת",
    "translit": "צחנ"
  },
  {
    "chapter": 6,
    "arabic": "كوب",
    "arabicVoc": null,
    "hebrew": "כוס",
    "translit": "כוב"
  },
  {
    "chapter": 7,
    "arabic": "أحمر",
    "arabicVoc": null,
    "hebrew": "אדום",
    "translit": "אחמר"
  },
  {
    "chapter": 7,
    "arabic": "أزرق",
    "arabicVoc": null,
    "hebrew": "כחול",
    "translit": "אזרק"
  },
  {
    "chapter": 7,
    "arabic": "أصفر",
    "arabicVoc": null,
    "hebrew": "צהוב",
    "translit": "אצפר"
  },
  {
    "chapter": 7,
    "arabic": "أخضر",
    "arabicVoc": null,
    "hebrew": "ירוק",
    "translit": "אח'דר"
  },
  {
    "chapter": 7,
    "arabic": "أسود",
    "arabicVoc": null,
    "hebrew": "שחור",
    "translit": "אסוד"
  },
  {
    "chapter": 7,
    "arabic": "أبيض",
    "arabicVoc": null,
    "hebrew": "לבן",
    "translit": "אביד"
  },
  {
    "chapter": 7,
    "arabic": "بني",
    "arabicVoc": null,
    "hebrew": "חום",
    "translit": "בני"
  },
  {
    "chapter": 7,
    "arabic": "وردي",
    "arabicVoc": null,
    "hebrew": "ורוד",
    "translit": "ורדי"
  },
  {
    "chapter": 7,
    "arabic": "رمادي",
    "arabicVoc": null,
    "hebrew": "אפור",
    "translit": "רמאדי"
  },
  {
    "chapter": 7,
    "arabic": "برتقالي",
    "arabicVoc": null,
    "hebrew": "כתום",
    "translit": "ברתקאלי"
  },
  {
    "chapter": 7,
    "arabic": "كبير",
    "arabicVoc": null,
    "hebrew": "גדול",
    "translit": "כביר"
  },
  {
    "chapter": 7,
    "arabic": "صغير",
    "arabicVoc": null,
    "hebrew": "קטן",
    "translit": "צע'יר"
  },
  {
    "chapter": 7,
    "arabic": "طويل",
    "arabicVoc": null,
    "hebrew": "גבוה / ארוך",
    "translit": "טויל"
  },
  {
    "chapter": 7,
    "arabic": "قصير",
    "arabicVoc": null,
    "hebrew": "נמוך / קצר",
    "translit": "קציר"
  },
  {
    "chapter": 7,
    "arabic": "جميل",
    "arabicVoc": null,
    "hebrew": "יפה",
    "translit": "ג'מיל"
  },
  {
    "chapter": 7,
    "arabic": "قبيح",
    "arabicVoc": null,
    "hebrew": "מכוער",
    "translit": "קביח"
  },
  {
    "chapter": 7,
    "arabic": "سريع",
    "arabicVoc": null,
    "hebrew": "מהיר",
    "translit": "סריע"
  },
  {
    "chapter": 7,
    "arabic": "بطيء",
    "arabicVoc": null,
    "hebrew": "איטי",
    "translit": "בטיא"
  },
  {
    "chapter": 7,
    "arabic": "قوي",
    "arabicVoc": null,
    "hebrew": "חזק",
    "translit": "קוי"
  },
  {
    "chapter": 7,
    "arabic": "ضعيف",
    "arabicVoc": null,
    "hebrew": "חלש",
    "translit": "דעיפ"
  },
  {
    "chapter": 7,
    "arabic": "ساخن",
    "arabicVoc": null,
    "hebrew": "חם",
    "translit": "סאח'נ"
  },
  {
    "chapter": 7,
    "arabic": "بارد",
    "arabicVoc": null,
    "hebrew": "קר",
    "translit": "בארד"
  },
  {
    "chapter": 7,
    "arabic": "نظيف",
    "arabicVoc": null,
    "hebrew": "נקי",
    "translit": "נז'יפ"
  },
  {
    "chapter": 7,
    "arabic": "وسخ",
    "arabicVoc": null,
    "hebrew": "מלוכלך",
    "translit": "וסח'"
  },
  {
    "chapter": 7,
    "arabic": "سهل",
    "arabicVoc": null,
    "hebrew": "קל",
    "translit": "סהל"
  },
  {
    "chapter": 7,
    "arabic": "صعب",
    "arabicVoc": null,
    "hebrew": "קשה",
    "translit": "צעב"
  },
  {
    "chapter": 7,
    "arabic": "غني",
    "arabicVoc": null,
    "hebrew": "עשיר",
    "translit": "ע'ני"
  },
  {
    "chapter": 7,
    "arabic": "فقير",
    "arabicVoc": null,
    "hebrew": "עני",
    "translit": "פקיר"
  },
  {
    "chapter": 7,
    "arabic": "سعيد",
    "arabicVoc": null,
    "hebrew": "שמח",
    "translit": "סעיד"
  },
  {
    "chapter": 7,
    "arabic": "حزين",
    "arabicVoc": null,
    "hebrew": "עצוב",
    "translit": "חזינ"
  },
  {
    "chapter": 7,
    "arabic": "غاضب",
    "arabicVoc": null,
    "hebrew": "כועס",
    "translit": "ע'אדב"
  },
  {
    "chapter": 7,
    "arabic": "هادئ",
    "arabicVoc": null,
    "hebrew": "שקט",
    "translit": "האדא"
  },
  {
    "chapter": 7,
    "arabic": "مشغول",
    "arabicVoc": null,
    "hebrew": "עסוק",
    "translit": "משע'ול"
  },
  {
    "chapter": 7,
    "arabic": "فارغ",
    "arabicVoc": null,
    "hebrew": "ריק / פנוי",
    "translit": "פארע'"
  },
  {
    "chapter": 7,
    "arabic": "ممتلئ",
    "arabicVoc": null,
    "hebrew": "מלא",
    "translit": "ממתלא"
  },
  {
    "chapter": 7,
    "arabic": "ثقيل",
    "arabicVoc": null,
    "hebrew": "כבד (משקל)",
    "translit": "ת'קיל"
  },
  {
    "chapter": 7,
    "arabic": "خفيف",
    "arabicVoc": null,
    "hebrew": "קל (משקל)",
    "translit": "ח'פיפ"
  },
  {
    "chapter": 7,
    "arabic": "ناعم",
    "arabicVoc": null,
    "hebrew": "רך",
    "translit": "נאעמ"
  },
  {
    "chapter": 7,
    "arabic": "خشن",
    "arabicVoc": null,
    "hebrew": "מחוספס",
    "translit": "ח'שנ"
  },
  {
    "chapter": 7,
    "arabic": "لطيف",
    "arabicVoc": null,
    "hebrew": "נחמד",
    "translit": "לטיפ"
  },
  {
    "chapter": 8,
    "arabic": "شمس",
    "arabicVoc": null,
    "hebrew": "שמש",
    "translit": "שמס"
  },
  {
    "chapter": 8,
    "arabic": "قمر",
    "arabicVoc": null,
    "hebrew": "ירח",
    "translit": "קמר"
  },
  {
    "chapter": 8,
    "arabic": "نجمة",
    "arabicVoc": null,
    "hebrew": "כוכב",
    "translit": "נג'מה"
  },
  {
    "chapter": 8,
    "arabic": "سماء",
    "arabicVoc": null,
    "hebrew": "שמיים",
    "translit": "סמאא"
  },
  {
    "chapter": 8,
    "arabic": "أرض",
    "arabicVoc": null,
    "hebrew": "כדור הארץ / אדמה",
    "translit": "ארד"
  },
  {
    "chapter": 8,
    "arabic": "بحر",
    "arabicVoc": null,
    "hebrew": "ים",
    "translit": "בחר"
  },
  {
    "chapter": 8,
    "arabic": "نهر",
    "arabicVoc": null,
    "hebrew": "נהר",
    "translit": "נהר"
  },
  {
    "chapter": 8,
    "arabic": "جبل",
    "arabicVoc": null,
    "hebrew": "הר",
    "translit": "ג'בל"
  },
  {
    "chapter": 8,
    "arabic": "صحراء",
    "arabicVoc": null,
    "hebrew": "מדבר",
    "translit": "צחראא"
  },
  {
    "chapter": 8,
    "arabic": "غابة",
    "arabicVoc": null,
    "hebrew": "יער",
    "translit": "ע'אבה"
  },
  {
    "chapter": 8,
    "arabic": "شجرة",
    "arabicVoc": null,
    "hebrew": "עץ",
    "translit": "שג'רה"
  },
  {
    "chapter": 8,
    "arabic": "وردة",
    "arabicVoc": null,
    "hebrew": "ורד",
    "translit": "ורדה"
  },
  {
    "chapter": 8,
    "arabic": "زهرة",
    "arabicVoc": null,
    "hebrew": "פרח",
    "translit": "זהרה"
  },
  {
    "chapter": 8,
    "arabic": "عشب",
    "arabicVoc": null,
    "hebrew": "דשא / עשב",
    "translit": "עשב"
  },
  {
    "chapter": 8,
    "arabic": "حجر",
    "arabicVoc": null,
    "hebrew": "אבן",
    "translit": "חג'ר"
  },
  {
    "chapter": 8,
    "arabic": "رمل",
    "arabicVoc": null,
    "hebrew": "חול",
    "translit": "רמל"
  },
  {
    "chapter": 8,
    "arabic": "بحيرة",
    "arabicVoc": null,
    "hebrew": "אגם",
    "translit": "בחירה"
  },
  {
    "chapter": 8,
    "arabic": "مطر",
    "arabicVoc": null,
    "hebrew": "גשם",
    "translit": "מטר"
  },
  {
    "chapter": 8,
    "arabic": "ثلج",
    "arabicVoc": null,
    "hebrew": "שלג",
    "translit": "ת'לג'"
  },
  {
    "chapter": 8,
    "arabic": "ريح",
    "arabicVoc": null,
    "hebrew": "רוח",
    "translit": "ריח"
  },
  {
    "chapter": 8,
    "arabic": "غيم",
    "arabicVoc": null,
    "hebrew": "עננים",
    "translit": "ע'ימ"
  },
  {
    "chapter": 8,
    "arabic": "رعد",
    "arabicVoc": null,
    "hebrew": "רעם",
    "translit": "רעד"
  },
  {
    "chapter": 8,
    "arabic": "برق",
    "arabicVoc": null,
    "hebrew": "ברק",
    "translit": "ברק"
  },
  {
    "chapter": 8,
    "arabic": "حر",
    "arabicVoc": null,
    "hebrew": "חום (מזג אוויר)",
    "translit": "חר"
  },
  {
    "chapter": 8,
    "arabic": "برد",
    "arabicVoc": null,
    "hebrew": "קור",
    "translit": "ברד"
  },
  {
    "chapter": 8,
    "arabic": "طقس",
    "arabicVoc": null,
    "hebrew": "מזג אוויר",
    "translit": "טקס"
  },
  {
    "chapter": 8,
    "arabic": "فصل",
    "arabicVoc": null,
    "hebrew": "עונה",
    "translit": "פצל"
  },
  {
    "chapter": 8,
    "arabic": "ربيع",
    "arabicVoc": null,
    "hebrew": "אביב",
    "translit": "רביע"
  },
  {
    "chapter": 8,
    "arabic": "صيف",
    "arabicVoc": null,
    "hebrew": "קיץ",
    "translit": "ציפ"
  },
  {
    "chapter": 8,
    "arabic": "خريف",
    "arabicVoc": null,
    "hebrew": "סתיו",
    "translit": "ח'ריפ"
  },
  {
    "chapter": 8,
    "arabic": "شتاء",
    "arabicVoc": null,
    "hebrew": "חורף",
    "translit": "שתאא"
  },
  {
    "chapter": 8,
    "arabic": "حيوان",
    "arabicVoc": null,
    "hebrew": "חיה",
    "translit": "חיואנ"
  },
  {
    "chapter": 8,
    "arabic": "طائر",
    "arabicVoc": null,
    "hebrew": "ציפור",
    "translit": "טאאר"
  },
  {
    "chapter": 8,
    "arabic": "قطة",
    "arabicVoc": null,
    "hebrew": "חתולה",
    "translit": "קטה"
  },
  {
    "chapter": 8,
    "arabic": "كلب",
    "arabicVoc": null,
    "hebrew": "כלב",
    "translit": "כלב"
  },
  {
    "chapter": 8,
    "arabic": "أسد",
    "arabicVoc": null,
    "hebrew": "אריה",
    "translit": "אסד"
  },
  {
    "chapter": 8,
    "arabic": "سمكة",
    "arabicVoc": null,
    "hebrew": "דג (יחיד)",
    "translit": "סמכה"
  },
  {
    "chapter": 8,
    "arabic": "حشرة",
    "arabicVoc": null,
    "hebrew": "חרק",
    "translit": "חשרה"
  },
  {
    "chapter": 8,
    "arabic": "جزيرة",
    "arabicVoc": null,
    "hebrew": "אי",
    "translit": "ג'זירה"
  },
  {
    "chapter": 8,
    "arabic": "وادي",
    "arabicVoc": null,
    "hebrew": "עמק / ואדי",
    "translit": "ואדי"
  },
  {
    "chapter": 9,
    "arabic": "مدينة",
    "arabicVoc": null,
    "hebrew": "עיר",
    "translit": "מדינה"
  },
  {
    "chapter": 9,
    "arabic": "قرية",
    "arabicVoc": null,
    "hebrew": "כפר",
    "translit": "קריה"
  },
  {
    "chapter": 9,
    "arabic": "شارع",
    "arabicVoc": null,
    "hebrew": "רחוב",
    "translit": "שארע"
  },
  {
    "chapter": 9,
    "arabic": "طريق",
    "arabicVoc": null,
    "hebrew": "דרך",
    "translit": "טריק"
  },
  {
    "chapter": 9,
    "arabic": "سيارة",
    "arabicVoc": null,
    "hebrew": "מכונית",
    "translit": "סיארה"
  },
  {
    "chapter": 9,
    "arabic": "باص",
    "arabicVoc": null,
    "hebrew": "אוטובוס",
    "translit": "באצ"
  },
  {
    "chapter": 9,
    "arabic": "قطار",
    "arabicVoc": null,
    "hebrew": "רכבת",
    "translit": "קטאר"
  },
  {
    "chapter": 9,
    "arabic": "طائرة",
    "arabicVoc": null,
    "hebrew": "מטוס",
    "translit": "טאארה"
  },
  {
    "chapter": 9,
    "arabic": "سفينة",
    "arabicVoc": null,
    "hebrew": "ספינה",
    "translit": "ספינה"
  },
  {
    "chapter": 9,
    "arabic": "دراجة",
    "arabicVoc": null,
    "hebrew": "אופניים",
    "translit": "דראג'ה"
  },
  {
    "chapter": 9,
    "arabic": "محطة",
    "arabicVoc": null,
    "hebrew": "תחנה",
    "translit": "מחטה"
  },
  {
    "chapter": 9,
    "arabic": "مطار",
    "arabicVoc": null,
    "hebrew": "שדה תעופה",
    "translit": "מטאר"
  },
  {
    "chapter": 9,
    "arabic": "ميناء",
    "arabicVoc": null,
    "hebrew": "נמל",
    "translit": "מינאא"
  },
  {
    "chapter": 9,
    "arabic": "جسر",
    "arabicVoc": null,
    "hebrew": "גשר",
    "translit": "ג'סר"
  },
  {
    "chapter": 9,
    "arabic": "إشارة",
    "arabicVoc": null,
    "hebrew": "רמזור",
    "translit": "אשארה"
  },
  {
    "chapter": 9,
    "arabic": "مستشفى",
    "arabicVoc": null,
    "hebrew": "בית חולים",
    "translit": "מסתשפא"
  },
  {
    "chapter": 9,
    "arabic": "مدرسة",
    "arabicVoc": null,
    "hebrew": "בית ספר",
    "translit": "מדרסה"
  },
  {
    "chapter": 9,
    "arabic": "جامعة",
    "arabicVoc": null,
    "hebrew": "אוניברסיטה",
    "translit": "ג'אמעה"
  },
  {
    "chapter": 9,
    "arabic": "سوق",
    "arabicVoc": null,
    "hebrew": "שוק",
    "translit": "סוק"
  },
  {
    "chapter": 9,
    "arabic": "متجر",
    "arabicVoc": null,
    "hebrew": "חנות",
    "translit": "מתג'ר"
  },
  {
    "chapter": 9,
    "arabic": "بنك",
    "arabicVoc": null,
    "hebrew": "בנק",
    "translit": "בנכ"
  },
  {
    "chapter": 9,
    "arabic": "فندق",
    "arabicVoc": null,
    "hebrew": "מלון",
    "translit": "פנדק"
  },
  {
    "chapter": 9,
    "arabic": "صيدلية",
    "arabicVoc": null,
    "hebrew": "בית מרקחת",
    "translit": "צידליה"
  },
  {
    "chapter": 9,
    "arabic": "مسجد",
    "arabicVoc": null,
    "hebrew": "מסגד",
    "translit": "מסג'ד"
  },
  {
    "chapter": 9,
    "arabic": "كنيسة",
    "arabicVoc": null,
    "hebrew": "כנסייה",
    "translit": "כניסה"
  },
  {
    "chapter": 9,
    "arabic": "حديقة عامة",
    "arabicVoc": null,
    "hebrew": "פארק",
    "translit": "חדיקה עאמה"
  },
  {
    "chapter": 9,
    "arabic": "يمين",
    "arabicVoc": null,
    "hebrew": "ימין",
    "translit": "ימינ"
  },
  {
    "chapter": 9,
    "arabic": "يسار",
    "arabicVoc": null,
    "hebrew": "שמאל",
    "translit": "יסאר"
  },
  {
    "chapter": 9,
    "arabic": "أمام",
    "arabicVoc": null,
    "hebrew": "מול / לפני",
    "translit": "אמאמ"
  },
  {
    "chapter": 9,
    "arabic": "خلف",
    "arabicVoc": null,
    "hebrew": "מאחורי",
    "translit": "ח'לפ"
  },
  {
    "chapter": 9,
    "arabic": "فوق",
    "arabicVoc": null,
    "hebrew": "מעל",
    "translit": "פוק"
  },
  {
    "chapter": 9,
    "arabic": "تحت",
    "arabicVoc": null,
    "hebrew": "מתחת",
    "translit": "תחת"
  },
  {
    "chapter": 9,
    "arabic": "بجانب",
    "arabicVoc": null,
    "hebrew": "ליד",
    "translit": "בג'אנב"
  },
  {
    "chapter": 9,
    "arabic": "بين",
    "arabicVoc": null,
    "hebrew": "בין",
    "translit": "בינ"
  },
  {
    "chapter": 9,
    "arabic": "قريب",
    "arabicVoc": null,
    "hebrew": "קרוב",
    "translit": "קריב"
  },
  {
    "chapter": 9,
    "arabic": "بعيد",
    "arabicVoc": null,
    "hebrew": "רחוק",
    "translit": "בעיד"
  },
  {
    "chapter": 9,
    "arabic": "شمال",
    "arabicVoc": null,
    "hebrew": "צפון",
    "translit": "שמאל"
  },
  {
    "chapter": 9,
    "arabic": "جنوب",
    "arabicVoc": null,
    "hebrew": "דרום",
    "translit": "ג'נוב"
  },
  {
    "chapter": 9,
    "arabic": "شرق",
    "arabicVoc": null,
    "hebrew": "מזרח",
    "translit": "שרק"
  },
  {
    "chapter": 9,
    "arabic": "غرب",
    "arabicVoc": null,
    "hebrew": "מערב",
    "translit": "ע'רב"
  },
  {
    "chapter": 10,
    "arabic": "قلم",
    "arabicVoc": null,
    "hebrew": "עט",
    "translit": "קלמ"
  },
  {
    "chapter": 10,
    "arabic": "دفتر",
    "arabicVoc": null,
    "hebrew": "מחברת",
    "translit": "דפתר"
  },
  {
    "chapter": 10,
    "arabic": "ورقة",
    "arabicVoc": null,
    "hebrew": "דף",
    "translit": "ורקה"
  },
  {
    "chapter": 10,
    "arabic": "حقيبة",
    "arabicVoc": null,
    "hebrew": "תיק",
    "translit": "חקיבה"
  },
  {
    "chapter": 10,
    "arabic": "صف",
    "arabicVoc": null,
    "hebrew": "כיתה",
    "translit": "צפ"
  },
  {
    "chapter": 10,
    "arabic": "درس",
    "arabicVoc": null,
    "hebrew": "שיעור",
    "translit": "דרס"
  },
  {
    "chapter": 10,
    "arabic": "امتحان",
    "arabicVoc": null,
    "hebrew": "מבחן",
    "translit": "אמתחאנ"
  },
  {
    "chapter": 10,
    "arabic": "واجب",
    "arabicVoc": null,
    "hebrew": "שיעורי בית",
    "translit": "ואג'ב"
  },
  {
    "chapter": 10,
    "arabic": "سؤال",
    "arabicVoc": null,
    "hebrew": "שאלה",
    "translit": "סאאל"
  },
  {
    "chapter": 10,
    "arabic": "جواب",
    "arabicVoc": null,
    "hebrew": "תשובה",
    "translit": "ג'ואב"
  },
  {
    "chapter": 10,
    "arabic": "لغة",
    "arabicVoc": null,
    "hebrew": "שפה",
    "translit": "לע'ה"
  },
  {
    "chapter": 10,
    "arabic": "عمل",
    "arabicVoc": null,
    "hebrew": "עבודה",
    "translit": "עמל"
  },
  {
    "chapter": 10,
    "arabic": "وظيفة",
    "arabicVoc": null,
    "hebrew": "משרה",
    "translit": "וז'יפה"
  },
  {
    "chapter": 10,
    "arabic": "شركة",
    "arabicVoc": null,
    "hebrew": "חברה (עסקית)",
    "translit": "שרכה"
  },
  {
    "chapter": 10,
    "arabic": "مكتب",
    "arabicVoc": null,
    "hebrew": "משרד",
    "translit": "מכתב"
  },
  {
    "chapter": 10,
    "arabic": "مدير",
    "arabicVoc": null,
    "hebrew": "מנהל",
    "translit": "מדיר"
  },
  {
    "chapter": 10,
    "arabic": "موظف",
    "arabicVoc": null,
    "hebrew": "עובד",
    "translit": "מוז'פ"
  },
  {
    "chapter": 10,
    "arabic": "راتب",
    "arabicVoc": null,
    "hebrew": "משכורת",
    "translit": "ראתב"
  },
  {
    "chapter": 10,
    "arabic": "اجتماع",
    "arabicVoc": null,
    "hebrew": "פגישה",
    "translit": "אג'תמאע"
  },
  {
    "chapter": 10,
    "arabic": "مشروع",
    "arabicVoc": null,
    "hebrew": "פרויקט",
    "translit": "משרוע"
  },
  {
    "chapter": 10,
    "arabic": "هواية",
    "arabicVoc": null,
    "hebrew": "תחביב",
    "translit": "הואיה"
  },
  {
    "chapter": 10,
    "arabic": "قراءة",
    "arabicVoc": null,
    "hebrew": "קריאה",
    "translit": "קראאה"
  },
  {
    "chapter": 10,
    "arabic": "كتابة",
    "arabicVoc": null,
    "hebrew": "כתיבה",
    "translit": "כתאבה"
  },
  {
    "chapter": 10,
    "arabic": "رسم",
    "arabicVoc": null,
    "hebrew": "ציור",
    "translit": "רסמ"
  },
  {
    "chapter": 10,
    "arabic": "موسيقى",
    "arabicVoc": null,
    "hebrew": "מוזיקה",
    "translit": "מוסיקא"
  },
  {
    "chapter": 10,
    "arabic": "رياضة",
    "arabicVoc": null,
    "hebrew": "ספורט",
    "translit": "ריאדה"
  },
  {
    "chapter": 10,
    "arabic": "سباحة",
    "arabicVoc": null,
    "hebrew": "שחייה",
    "translit": "סבאחה"
  },
  {
    "chapter": 10,
    "arabic": "كرة قدم",
    "arabicVoc": null,
    "hebrew": "כדורגל",
    "translit": "כרה קדמ"
  },
  {
    "chapter": 10,
    "arabic": "سفر",
    "arabicVoc": null,
    "hebrew": "נסיעות",
    "translit": "ספר"
  },
  {
    "chapter": 10,
    "arabic": "تصوير",
    "arabicVoc": null,
    "hebrew": "צילום",
    "translit": "תצויר"
  },
  {
    "chapter": 10,
    "arabic": "طبخ",
    "arabicVoc": null,
    "hebrew": "בישול",
    "translit": "טבח'"
  },
  {
    "chapter": 10,
    "arabic": "لعبة",
    "arabicVoc": null,
    "hebrew": "משחק",
    "translit": "לעבה"
  },
  {
    "chapter": 10,
    "arabic": "فيلم",
    "arabicVoc": null,
    "hebrew": "סרט",
    "translit": "פילמ"
  },
  {
    "chapter": 10,
    "arabic": "أغنية",
    "arabicVoc": null,
    "hebrew": "שיר",
    "translit": "אע'ניה"
  },
  {
    "chapter": 10,
    "arabic": "حفلة",
    "arabicVoc": null,
    "hebrew": "מסיבה",
    "translit": "חפלה"
  },
  {
    "chapter": 10,
    "arabic": "عطلة",
    "arabicVoc": null,
    "hebrew": "חופשה",
    "translit": "עטלה"
  },
  {
    "chapter": 10,
    "arabic": "نجاح",
    "arabicVoc": null,
    "hebrew": "הצלחה",
    "translit": "נג'אח"
  },
  {
    "chapter": 10,
    "arabic": "هدف",
    "arabicVoc": null,
    "hebrew": "מטרה",
    "translit": "הדפ"
  },
  {
    "chapter": 10,
    "arabic": "مهنة",
    "arabicVoc": null,
    "hebrew": "מקצוע",
    "translit": "מהנה"
  },
  {
    "chapter": 10,
    "arabic": "فرصة",
    "arabicVoc": null,
    "hebrew": "הזדמנות",
    "translit": "פרצה"
  }
];
