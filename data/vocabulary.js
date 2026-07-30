// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py
// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.

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
    "hebrew": "שלום / היי",
    "translit": "מרחבא"
  },
  {
    "chapter": 1,
    "arabic": "أهلا",
    "hebrew": "ברוך הבא",
    "translit": "אהלא"
  },
  {
    "chapter": 1,
    "arabic": "السلام عليكم",
    "hebrew": "שלום עליכם",
    "translit": "אלסלאמ עליכמ"
  },
  {
    "chapter": 1,
    "arabic": "وداعا",
    "hebrew": "להתראות",
    "translit": "ודאעא"
  },
  {
    "chapter": 1,
    "arabic": "مع السلامة",
    "hebrew": "לך/י לשלום",
    "translit": "מע אלסלאמה"
  },
  {
    "chapter": 1,
    "arabic": "نعم",
    "hebrew": "כן",
    "translit": "נעמ"
  },
  {
    "chapter": 1,
    "arabic": "لا",
    "hebrew": "לא",
    "translit": "לא"
  },
  {
    "chapter": 1,
    "arabic": "من فضلك",
    "hebrew": "בבקשה",
    "translit": "מנ פדלכ"
  },
  {
    "chapter": 1,
    "arabic": "شكرا",
    "hebrew": "תודה",
    "translit": "שכרא"
  },
  {
    "chapter": 1,
    "arabic": "عفوا",
    "hebrew": "על לא דבר / סליחה",
    "translit": "עפוא"
  },
  {
    "chapter": 1,
    "arabic": "آسف",
    "hebrew": "מצטער",
    "translit": "אספ"
  },
  {
    "chapter": 1,
    "arabic": "صباح الخير",
    "hebrew": "בוקר טוב",
    "translit": "צבאח אלח'יר"
  },
  {
    "chapter": 1,
    "arabic": "مساء الخير",
    "hebrew": "ערב טוב",
    "translit": "מסאא אלח'יר"
  },
  {
    "chapter": 1,
    "arabic": "تصبح على خير",
    "hebrew": "לילה טוב",
    "translit": "תצבח עלא ח'יר"
  },
  {
    "chapter": 1,
    "arabic": "كيف حالك",
    "hebrew": "מה שלומך",
    "translit": "כיפ חאלכ"
  },
  {
    "chapter": 1,
    "arabic": "بخير",
    "hebrew": "בסדר / טוב",
    "translit": "בח'יר"
  },
  {
    "chapter": 1,
    "arabic": "ما اسمك",
    "hebrew": "מה שמך",
    "translit": "מא אסמכ"
  },
  {
    "chapter": 1,
    "arabic": "اسمي",
    "hebrew": "שמי",
    "translit": "אסמי"
  },
  {
    "chapter": 1,
    "arabic": "من",
    "hebrew": "מי?",
    "translit": "מנ"
  },
  {
    "chapter": 1,
    "arabic": "ماذا",
    "hebrew": "מה?",
    "translit": "מאד'א"
  },
  {
    "chapter": 1,
    "arabic": "أين",
    "hebrew": "איפה?",
    "translit": "אינ"
  },
  {
    "chapter": 1,
    "arabic": "متى",
    "hebrew": "מתי?",
    "translit": "מתא"
  },
  {
    "chapter": 1,
    "arabic": "لماذا",
    "hebrew": "למה?",
    "translit": "למאד'א"
  },
  {
    "chapter": 1,
    "arabic": "كيف",
    "hebrew": "איך?",
    "translit": "כיפ"
  },
  {
    "chapter": 1,
    "arabic": "كم",
    "hebrew": "כמה?",
    "translit": "כמ"
  },
  {
    "chapter": 1,
    "arabic": "أي",
    "hebrew": "איזה?",
    "translit": "אי"
  },
  {
    "chapter": 1,
    "arabic": "هل",
    "hebrew": "האם? (מילית שאלה)",
    "translit": "הל"
  },
  {
    "chapter": 1,
    "arabic": "و",
    "hebrew": "ו-",
    "translit": "ו"
  },
  {
    "chapter": 1,
    "arabic": "أو",
    "hebrew": "או",
    "translit": "או"
  },
  {
    "chapter": 1,
    "arabic": "لكن",
    "hebrew": "אבל",
    "translit": "לכנ"
  },
  {
    "chapter": 1,
    "arabic": "كمان",
    "hebrew": "גם",
    "translit": "כמאנ"
  },
  {
    "chapter": 1,
    "arabic": "الآن",
    "hebrew": "עכשיו",
    "translit": "אלאנ"
  },
  {
    "chapter": 1,
    "arabic": "هنا",
    "hebrew": "כאן",
    "translit": "הנא"
  },
  {
    "chapter": 1,
    "arabic": "هناك",
    "hebrew": "שם",
    "translit": "הנאכ"
  },
  {
    "chapter": 1,
    "arabic": "بالطبع/طبعاً",
    "hebrew": "כמובן",
    "translit": "באלטבע/טבעאן"
  },
  {
    "chapter": 1,
    "arabic": "جيد",
    "hebrew": "טוב (איכות)",
    "translit": "ג'יד"
  },
  {
    "chapter": 1,
    "arabic": "سيء",
    "hebrew": "רע",
    "translit": "סיא"
  },
  {
    "chapter": 1,
    "arabic": "جديد",
    "hebrew": "חדש",
    "translit": "ג'דיד"
  },
  {
    "chapter": 1,
    "arabic": "قديم",
    "hebrew": "ישן",
    "translit": "קדימ"
  },
  {
    "chapter": 1,
    "arabic": "عربي",
    "hebrew": "ערבי / ערבית",
    "translit": "ערבי"
  },
  {
    "chapter": 2,
    "arabic": "أب",
    "hebrew": "אבא",
    "translit": "אב"
  },
  {
    "chapter": 2,
    "arabic": "أم",
    "hebrew": "אמא",
    "translit": "אמ"
  },
  {
    "chapter": 2,
    "arabic": "ابن",
    "hebrew": "בן",
    "translit": "אבנ"
  },
  {
    "chapter": 2,
    "arabic": "ابنة",
    "hebrew": "בת",
    "translit": "אבנה"
  },
  {
    "chapter": 2,
    "arabic": "أخ",
    "hebrew": "אח",
    "translit": "אח'"
  },
  {
    "chapter": 2,
    "arabic": "أخت",
    "hebrew": "אחות",
    "translit": "אח'ת"
  },
  {
    "chapter": 2,
    "arabic": "جد",
    "hebrew": "סבא",
    "translit": "ג'ד"
  },
  {
    "chapter": 2,
    "arabic": "جدة",
    "hebrew": "סבתא",
    "translit": "ג'דה"
  },
  {
    "chapter": 2,
    "arabic": "عم",
    "hebrew": "דוד (מצד אב)",
    "translit": "עמ"
  },
  {
    "chapter": 2,
    "arabic": "عمة",
    "hebrew": "דודה (מצד אב)",
    "translit": "עמה"
  },
  {
    "chapter": 2,
    "arabic": "خال",
    "hebrew": "דוד (מצד אם)",
    "translit": "ח'אל"
  },
  {
    "chapter": 2,
    "arabic": "خالة",
    "hebrew": "דודה (מצד אם)",
    "translit": "ח'אלה"
  },
  {
    "chapter": 2,
    "arabic": "زوج",
    "hebrew": "בעל",
    "translit": "זוג'"
  },
  {
    "chapter": 2,
    "arabic": "زوجة",
    "hebrew": "אישה / רעיה",
    "translit": "זוג'ה"
  },
  {
    "chapter": 2,
    "arabic": "ولد",
    "hebrew": "ילד / בן",
    "translit": "ולד"
  },
  {
    "chapter": 2,
    "arabic": "بنت",
    "hebrew": "ילדה / בת",
    "translit": "בנת"
  },
  {
    "chapter": 2,
    "arabic": "رجل",
    "hebrew": "גבר",
    "translit": "רג'ל"
  },
  {
    "chapter": 2,
    "arabic": "امرأة",
    "hebrew": "אישה",
    "translit": "אמראה"
  },
  {
    "chapter": 2,
    "arabic": "طفل",
    "hebrew": "תינוק / ילד קטן",
    "translit": "טפל"
  },
  {
    "chapter": 2,
    "arabic": "شاب",
    "hebrew": "צעיר",
    "translit": "שאב"
  },
  {
    "chapter": 2,
    "arabic": "عجوز",
    "hebrew": "זקן",
    "translit": "עג'וז"
  },
  {
    "chapter": 2,
    "arabic": "صديق",
    "hebrew": "חבר",
    "translit": "צדיק"
  },
  {
    "chapter": 2,
    "arabic": "صديقة",
    "hebrew": "חברה",
    "translit": "צדיקה"
  },
  {
    "chapter": 2,
    "arabic": "جار",
    "hebrew": "שכן",
    "translit": "ג'אר"
  },
  {
    "chapter": 2,
    "arabic": "أستاذ",
    "hebrew": "מורה (ז)",
    "translit": "אסתאד'"
  },
  {
    "chapter": 2,
    "arabic": "أستاذة",
    "hebrew": "מורה (נ)",
    "translit": "אסתאד'ה"
  },
  {
    "chapter": 2,
    "arabic": "طالب",
    "hebrew": "תלמיד / סטודנט",
    "translit": "טאלב"
  },
  {
    "chapter": 2,
    "arabic": "طالبة",
    "hebrew": "תלמידה / סטודנטית",
    "translit": "טאלבה"
  },
  {
    "chapter": 2,
    "arabic": "طبيب",
    "hebrew": "רופא",
    "translit": "טביב"
  },
  {
    "chapter": 2,
    "arabic": "مهندس",
    "hebrew": "מהנדס",
    "translit": "מהנדס"
  },
  {
    "chapter": 2,
    "arabic": "اسم",
    "hebrew": "שם",
    "translit": "אסמ"
  },
  {
    "chapter": 2,
    "arabic": "عائلة",
    "hebrew": "משפחה",
    "translit": "עאאלה"
  },
  {
    "chapter": 2,
    "arabic": "ناس",
    "hebrew": "אנשים",
    "translit": "נאס"
  },
  {
    "chapter": 2,
    "arabic": "شخص",
    "hebrew": "אדם / בן אדם",
    "translit": "שח'צ"
  },
  {
    "chapter": 2,
    "arabic": "رئيس",
    "hebrew": "נשיא / מנהל",
    "translit": "ראיס"
  },
  {
    "chapter": 2,
    "arabic": "ملك",
    "hebrew": "מלך",
    "translit": "מלכ"
  },
  {
    "chapter": 2,
    "arabic": "ضيف",
    "hebrew": "אורח",
    "translit": "דיפ"
  },
  {
    "chapter": 2,
    "arabic": "حبيب",
    "hebrew": "אהוב / יקיר",
    "translit": "חביב"
  },
  {
    "chapter": 2,
    "arabic": "إنسان",
    "hebrew": "בן אנוש",
    "translit": "אנסאנ"
  },
  {
    "chapter": 2,
    "arabic": "عروس",
    "hebrew": "כלה",
    "translit": "ערוס"
  },
  {
    "chapter": 3,
    "arabic": "رأس",
    "hebrew": "ראש",
    "translit": "ראס"
  },
  {
    "chapter": 3,
    "arabic": "وجه",
    "hebrew": "פנים",
    "translit": "וג'ה"
  },
  {
    "chapter": 3,
    "arabic": "عين",
    "hebrew": "עין",
    "translit": "עינ"
  },
  {
    "chapter": 3,
    "arabic": "أذن",
    "hebrew": "אוזן",
    "translit": "אד'נ"
  },
  {
    "chapter": 3,
    "arabic": "أنف",
    "hebrew": "אף",
    "translit": "אנפ"
  },
  {
    "chapter": 3,
    "arabic": "فم",
    "hebrew": "פה",
    "translit": "פמ"
  },
  {
    "chapter": 3,
    "arabic": "لسان",
    "hebrew": "לשון",
    "translit": "לסאנ"
  },
  {
    "chapter": 3,
    "arabic": "سن",
    "hebrew": "שן",
    "translit": "סנ"
  },
  {
    "chapter": 3,
    "arabic": "شعر",
    "hebrew": "שיער",
    "translit": "שער"
  },
  {
    "chapter": 3,
    "arabic": "رقبة",
    "hebrew": "צוואר",
    "translit": "רקבה"
  },
  {
    "chapter": 3,
    "arabic": "كتف",
    "hebrew": "כתף",
    "translit": "כתפ"
  },
  {
    "chapter": 3,
    "arabic": "يد",
    "hebrew": "יד",
    "translit": "יד"
  },
  {
    "chapter": 3,
    "arabic": "إصبع",
    "hebrew": "אצבע",
    "translit": "אצבע"
  },
  {
    "chapter": 3,
    "arabic": "ظهر",
    "hebrew": "גב",
    "translit": "ז'הר"
  },
  {
    "chapter": 3,
    "arabic": "صدر",
    "hebrew": "חזה",
    "translit": "צדר"
  },
  {
    "chapter": 3,
    "arabic": "بطن",
    "hebrew": "בטן",
    "translit": "בטנ"
  },
  {
    "chapter": 3,
    "arabic": "قلب",
    "hebrew": "לב",
    "translit": "קלב"
  },
  {
    "chapter": 3,
    "arabic": "رجل",
    "hebrew": "רגל",
    "translit": "רג'ל"
  },
  {
    "chapter": 3,
    "arabic": "ركبة",
    "hebrew": "ברך",
    "translit": "רכבה"
  },
  {
    "chapter": 3,
    "arabic": "قدم",
    "hebrew": "כף רגל",
    "translit": "קדמ"
  },
  {
    "chapter": 3,
    "arabic": "جسم",
    "hebrew": "גוף",
    "translit": "ג'סמ"
  },
  {
    "chapter": 3,
    "arabic": "دم",
    "hebrew": "דם",
    "translit": "דמ"
  },
  {
    "chapter": 3,
    "arabic": "عظم",
    "hebrew": "עצם",
    "translit": "עז'מ"
  },
  {
    "chapter": 3,
    "arabic": "جلد",
    "hebrew": "עור",
    "translit": "ג'לד"
  },
  {
    "chapter": 3,
    "arabic": "حاجب",
    "hebrew": "גבה",
    "translit": "חאג'ב"
  },
  {
    "chapter": 3,
    "arabic": "رمش",
    "hebrew": "ריס",
    "translit": "רמש"
  },
  {
    "chapter": 3,
    "arabic": "شفة",
    "hebrew": "שפה (של הפה)",
    "translit": "שפה"
  },
  {
    "chapter": 3,
    "arabic": "خد",
    "hebrew": "לחי",
    "translit": "ח'ד"
  },
  {
    "chapter": 3,
    "arabic": "ذقن",
    "hebrew": "סנטר",
    "translit": "ד'קנ"
  },
  {
    "chapter": 3,
    "arabic": "ظفر",
    "hebrew": "ציפורן",
    "translit": "ז'פר"
  },
  {
    "chapter": 3,
    "arabic": "معدة",
    "hebrew": "קיבה",
    "translit": "מעדה"
  },
  {
    "chapter": 3,
    "arabic": "رئة",
    "hebrew": "ריאה",
    "translit": "ראה"
  },
  {
    "chapter": 3,
    "arabic": "كبد",
    "hebrew": "כבד",
    "translit": "כבד"
  },
  {
    "chapter": 3,
    "arabic": "عضلة",
    "hebrew": "שריר",
    "translit": "עדלה"
  },
  {
    "chapter": 3,
    "arabic": "عقل",
    "hebrew": "שכל",
    "translit": "עקל"
  },
  {
    "chapter": 3,
    "arabic": "دماغ",
    "hebrew": "מוח",
    "translit": "דמאע'"
  },
  {
    "chapter": 3,
    "arabic": "صوت",
    "hebrew": "קול",
    "translit": "צות"
  },
  {
    "chapter": 3,
    "arabic": "نفس",
    "hebrew": "נשימה / נפש",
    "translit": "נפס"
  },
  {
    "chapter": 3,
    "arabic": "مرفق",
    "hebrew": "מרפק",
    "translit": "מרפק"
  },
  {
    "chapter": 3,
    "arabic": "فخذ",
    "hebrew": "ירך",
    "translit": "פח'ד'"
  },
  {
    "chapter": 4,
    "arabic": "صفر",
    "hebrew": "אפס",
    "translit": "צפר"
  },
  {
    "chapter": 4,
    "arabic": "واحد",
    "hebrew": "אחד",
    "translit": "ואחד"
  },
  {
    "chapter": 4,
    "arabic": "اثنان",
    "hebrew": "שניים",
    "translit": "את'נאנ"
  },
  {
    "chapter": 4,
    "arabic": "ثلاثة",
    "hebrew": "שלושה",
    "translit": "ת'לאת'ה"
  },
  {
    "chapter": 4,
    "arabic": "أربعة",
    "hebrew": "ארבעה",
    "translit": "ארבעה"
  },
  {
    "chapter": 4,
    "arabic": "خمسة",
    "hebrew": "חמישה",
    "translit": "ח'מסה"
  },
  {
    "chapter": 4,
    "arabic": "ستة",
    "hebrew": "שישה",
    "translit": "סתה"
  },
  {
    "chapter": 4,
    "arabic": "سبعة",
    "hebrew": "שבעה",
    "translit": "סבעה"
  },
  {
    "chapter": 4,
    "arabic": "ثمانية",
    "hebrew": "שמונה",
    "translit": "ת'מאניה"
  },
  {
    "chapter": 4,
    "arabic": "تسعة",
    "hebrew": "תשעה",
    "translit": "תסעה"
  },
  {
    "chapter": 4,
    "arabic": "عشرة",
    "hebrew": "עשרה",
    "translit": "עשרה"
  },
  {
    "chapter": 4,
    "arabic": "عشرون",
    "hebrew": "עשרים",
    "translit": "עשרונ"
  },
  {
    "chapter": 4,
    "arabic": "مئة",
    "hebrew": "מאה",
    "translit": "מאה"
  },
  {
    "chapter": 4,
    "arabic": "يوم",
    "hebrew": "יום",
    "translit": "יומ"
  },
  {
    "chapter": 4,
    "arabic": "أسبوع",
    "hebrew": "שבוע",
    "translit": "אסבוע"
  },
  {
    "chapter": 4,
    "arabic": "شهر",
    "hebrew": "חודש",
    "translit": "שהר"
  },
  {
    "chapter": 4,
    "arabic": "سنة",
    "hebrew": "שנה",
    "translit": "סנה"
  },
  {
    "chapter": 4,
    "arabic": "ساعة",
    "hebrew": "שעה",
    "translit": "סאעה"
  },
  {
    "chapter": 4,
    "arabic": "دقيقة",
    "hebrew": "דקה",
    "translit": "דקיקה"
  },
  {
    "chapter": 4,
    "arabic": "ثانية",
    "hebrew": "שנייה",
    "translit": "ת'אניה"
  },
  {
    "chapter": 4,
    "arabic": "صباح",
    "hebrew": "בוקר",
    "translit": "צבאח"
  },
  {
    "chapter": 4,
    "arabic": "ظهر",
    "hebrew": "צהריים",
    "translit": "ז'הר"
  },
  {
    "chapter": 4,
    "arabic": "مساء",
    "hebrew": "ערב",
    "translit": "מסאא"
  },
  {
    "chapter": 4,
    "arabic": "ليل",
    "hebrew": "לילה",
    "translit": "ליל"
  },
  {
    "chapter": 4,
    "arabic": "اليوم",
    "hebrew": "היום",
    "translit": "אליומ"
  },
  {
    "chapter": 4,
    "arabic": "غدا",
    "hebrew": "מחר",
    "translit": "ע'דא"
  },
  {
    "chapter": 4,
    "arabic": "أمس",
    "hebrew": "אתמול",
    "translit": "אמס"
  },
  {
    "chapter": 4,
    "arabic": "الأحد",
    "hebrew": "יום ראשון",
    "translit": "אלאחד"
  },
  {
    "chapter": 4,
    "arabic": "الاثنين",
    "hebrew": "יום שני",
    "translit": "אלאת'נינ"
  },
  {
    "chapter": 4,
    "arabic": "الثلاثاء",
    "hebrew": "יום שלישי",
    "translit": "אלת'לאת'אא"
  },
  {
    "chapter": 4,
    "arabic": "الأربعاء",
    "hebrew": "יום רביעי",
    "translit": "אלארבעאא"
  },
  {
    "chapter": 4,
    "arabic": "الخميس",
    "hebrew": "יום חמישי",
    "translit": "אלח'מיס"
  },
  {
    "chapter": 4,
    "arabic": "الجمعة",
    "hebrew": "יום שישי",
    "translit": "אלג'מעה"
  },
  {
    "chapter": 4,
    "arabic": "السبت",
    "hebrew": "שבת",
    "translit": "אלסבת"
  },
  {
    "chapter": 4,
    "arabic": "صباحا",
    "hebrew": "בבוקר",
    "translit": "צבאחא"
  },
  {
    "chapter": 4,
    "arabic": "مساء",
    "hebrew": "בערב",
    "translit": "מסאא"
  },
  {
    "chapter": 4,
    "arabic": "الآن",
    "hebrew": "עכשיו",
    "translit": "אלאנ"
  },
  {
    "chapter": 4,
    "arabic": "وقت",
    "hebrew": "זמן",
    "translit": "וקת"
  },
  {
    "chapter": 4,
    "arabic": "دائما",
    "hebrew": "תמיד",
    "translit": "דאאמא"
  },
  {
    "chapter": 4,
    "arabic": "أبدا",
    "hebrew": "אף פעם",
    "translit": "אבדא"
  },
  {
    "chapter": 5,
    "arabic": "بيت",
    "hebrew": "בית",
    "translit": "בית"
  },
  {
    "chapter": 5,
    "arabic": "منزل",
    "hebrew": "בית / מגורים",
    "translit": "מנזל"
  },
  {
    "chapter": 5,
    "arabic": "غرفة",
    "hebrew": "חדר",
    "translit": "ע'רפה"
  },
  {
    "chapter": 5,
    "arabic": "غرفة النوم",
    "hebrew": "חדר שינה",
    "translit": "ע'רפה אלנומ"
  },
  {
    "chapter": 5,
    "arabic": "مطبخ",
    "hebrew": "מטבח",
    "translit": "מטבח'"
  },
  {
    "chapter": 5,
    "arabic": "حمام",
    "hebrew": "שירותים / אמבטיה",
    "translit": "חמאמ"
  },
  {
    "chapter": 5,
    "arabic": "صالة",
    "hebrew": "סלון",
    "translit": "צאלה"
  },
  {
    "chapter": 5,
    "arabic": "باب",
    "hebrew": "דלת",
    "translit": "באב"
  },
  {
    "chapter": 5,
    "arabic": "شباك",
    "hebrew": "חלון",
    "translit": "שבאכ"
  },
  {
    "chapter": 5,
    "arabic": "تحت",
    "hebrew": "מיטה",
    "translit": "תחת"
  },
  {
    "chapter": 5,
    "arabic": "كرسي",
    "hebrew": "כיסא",
    "translit": "כרסי"
  },
  {
    "chapter": 5,
    "arabic": "طاولة",
    "hebrew": "שולחן",
    "translit": "טאולה"
  },
  {
    "chapter": 5,
    "arabic": "خزانة",
    "hebrew": "ארון",
    "translit": "ח'זאנה"
  },
  {
    "chapter": 5,
    "arabic": "مرآة",
    "hebrew": "מראה",
    "translit": "מראה"
  },
  {
    "chapter": 5,
    "arabic": "مصباح",
    "hebrew": "מנורה",
    "translit": "מצבאח"
  },
  {
    "chapter": 5,
    "arabic": "سجادة",
    "hebrew": "שטיח",
    "translit": "סג'אדה"
  },
  {
    "chapter": 5,
    "arabic": "ستارة",
    "hebrew": "וילון",
    "translit": "סתארה"
  },
  {
    "chapter": 5,
    "arabic": "مفتاح",
    "hebrew": "מפתח",
    "translit": "מפתאח"
  },
  {
    "chapter": 5,
    "arabic": "حائط",
    "hebrew": "קיר",
    "translit": "חאאט"
  },
  {
    "chapter": 5,
    "arabic": "سقف",
    "hebrew": "תקרה",
    "translit": "סקפ"
  },
  {
    "chapter": 5,
    "arabic": "أرض",
    "hebrew": "רצפה / אדמה",
    "translit": "ארד"
  },
  {
    "chapter": 5,
    "arabic": "درج",
    "hebrew": "מדרגות",
    "translit": "דרג'"
  },
  {
    "chapter": 5,
    "arabic": "حديقة",
    "hebrew": "גינה",
    "translit": "חדיקה"
  },
  {
    "chapter": 5,
    "arabic": "ثلاجة",
    "hebrew": "מקרר",
    "translit": "ת'לאג'ה"
  },
  {
    "chapter": 5,
    "arabic": "فرن",
    "hebrew": "תנור",
    "translit": "פרנ"
  },
  {
    "chapter": 5,
    "arabic": "غسالة",
    "hebrew": "מכונת כביסה",
    "translit": "ע'סאלה"
  },
  {
    "chapter": 5,
    "arabic": "تلفزيون",
    "hebrew": "טלוויזיה",
    "translit": "תלפזיונ"
  },
  {
    "chapter": 5,
    "arabic": "هاتف",
    "hebrew": "טלפון",
    "translit": "האתפ"
  },
  {
    "chapter": 5,
    "arabic": "حاسوب",
    "hebrew": "מחשב",
    "translit": "חאסוב"
  },
  {
    "chapter": 5,
    "arabic": "كتاب",
    "hebrew": "ספר",
    "translit": "כתאב"
  },
  {
    "chapter": 5,
    "arabic": "صورة",
    "hebrew": "תמונה",
    "translit": "צורה"
  },
  {
    "chapter": 5,
    "arabic": "ساعة حائط",
    "hebrew": "שעון קיר",
    "translit": "סאעה חאאט"
  },
  {
    "chapter": 5,
    "arabic": "حوض",
    "hebrew": "כיור",
    "translit": "חוד"
  },
  {
    "chapter": 5,
    "arabic": "صابون",
    "hebrew": "סבון",
    "translit": "צאבונ"
  },
  {
    "chapter": 5,
    "arabic": "منشفة",
    "hebrew": "מגבת",
    "translit": "מנשפה"
  },
  {
    "chapter": 5,
    "arabic": "وسادة",
    "hebrew": "כרית",
    "translit": "וסאדה"
  },
  {
    "chapter": 5,
    "arabic": "بطانية",
    "hebrew": "שמיכה",
    "translit": "בטאניה"
  },
  {
    "chapter": 5,
    "arabic": "مكتب",
    "hebrew": "שולחן כתיבה / משרד",
    "translit": "מכתב"
  },
  {
    "chapter": 5,
    "arabic": "رف",
    "hebrew": "מדף",
    "translit": "רפ"
  },
  {
    "chapter": 5,
    "arabic": "سلة",
    "hebrew": "סל",
    "translit": "סלה"
  },
  {
    "chapter": 6,
    "arabic": "خبز",
    "hebrew": "לחם",
    "translit": "ח'בז"
  },
  {
    "chapter": 6,
    "arabic": "ماء",
    "hebrew": "מים",
    "translit": "מאא"
  },
  {
    "chapter": 6,
    "arabic": "حليب",
    "hebrew": "חלב",
    "translit": "חליב"
  },
  {
    "chapter": 6,
    "arabic": "لحم",
    "hebrew": "בשר",
    "translit": "לחמ"
  },
  {
    "chapter": 6,
    "arabic": "دجاج",
    "hebrew": "עוף",
    "translit": "דג'אג'"
  },
  {
    "chapter": 6,
    "arabic": "سمك",
    "hebrew": "דג",
    "translit": "סמכ"
  },
  {
    "chapter": 6,
    "arabic": "أرز",
    "hebrew": "אורז",
    "translit": "ארז"
  },
  {
    "chapter": 6,
    "arabic": "بيض",
    "hebrew": "ביצים",
    "translit": "ביד"
  },
  {
    "chapter": 6,
    "arabic": "جبن",
    "hebrew": "גבינה",
    "translit": "ג'בנ"
  },
  {
    "chapter": 6,
    "arabic": "زبدة",
    "hebrew": "חמאה",
    "translit": "זבדה"
  },
  {
    "chapter": 6,
    "arabic": "سكر",
    "hebrew": "סוכר",
    "translit": "סכר"
  },
  {
    "chapter": 6,
    "arabic": "ملح",
    "hebrew": "מלח",
    "translit": "מלח"
  },
  {
    "chapter": 6,
    "arabic": "فاكهة",
    "hebrew": "פרי",
    "translit": "פאכהה"
  },
  {
    "chapter": 6,
    "arabic": "تفاح",
    "hebrew": "תפוח",
    "translit": "תפאח"
  },
  {
    "chapter": 6,
    "arabic": "موز",
    "hebrew": "בננה",
    "translit": "מוז"
  },
  {
    "chapter": 6,
    "arabic": "برتقال",
    "hebrew": "תפוז",
    "translit": "ברתקאל"
  },
  {
    "chapter": 6,
    "arabic": "عنب",
    "hebrew": "ענבים",
    "translit": "ענב"
  },
  {
    "chapter": 6,
    "arabic": "خضار",
    "hebrew": "ירקות",
    "translit": "ח'דאר"
  },
  {
    "chapter": 6,
    "arabic": "طماطم",
    "hebrew": "עגבנייה",
    "translit": "טמאטמ"
  },
  {
    "chapter": 6,
    "arabic": "بطاطا",
    "hebrew": "תפוח אדמה",
    "translit": "בטאטא"
  },
  {
    "chapter": 6,
    "arabic": "بصل",
    "hebrew": "בצל",
    "translit": "בצל"
  },
  {
    "chapter": 6,
    "arabic": "جزر",
    "hebrew": "גזר",
    "translit": "ג'זר"
  },
  {
    "chapter": 6,
    "arabic": "قهوة",
    "hebrew": "קפה",
    "translit": "קהוה"
  },
  {
    "chapter": 6,
    "arabic": "شاي",
    "hebrew": "תה",
    "translit": "שאי"
  },
  {
    "chapter": 6,
    "arabic": "عصير",
    "hebrew": "מיץ",
    "translit": "עציר"
  },
  {
    "chapter": 6,
    "arabic": "زيت",
    "hebrew": "שמן",
    "translit": "זית"
  },
  {
    "chapter": 6,
    "arabic": "عسل",
    "hebrew": "דבש",
    "translit": "עסל"
  },
  {
    "chapter": 6,
    "arabic": "حساء",
    "hebrew": "מרק",
    "translit": "חסאא"
  },
  {
    "chapter": 6,
    "arabic": "سلطة",
    "hebrew": "סלט",
    "translit": "סלטה"
  },
  {
    "chapter": 6,
    "arabic": "حلوى",
    "hebrew": "ממתק / קינוח",
    "translit": "חלוא"
  },
  {
    "chapter": 6,
    "arabic": "مطعم",
    "hebrew": "מסעדה",
    "translit": "מטעמ"
  },
  {
    "chapter": 6,
    "arabic": "فطور",
    "hebrew": "ארוחת בוקר",
    "translit": "פטור"
  },
  {
    "chapter": 6,
    "arabic": "غداء",
    "hebrew": "ארוחת צהריים",
    "translit": "ע'דאא"
  },
  {
    "chapter": 6,
    "arabic": "عشاء",
    "hebrew": "ארוחת ערב",
    "translit": "עשאא"
  },
  {
    "chapter": 6,
    "arabic": "طعام",
    "hebrew": "אוכל",
    "translit": "טעאמ"
  },
  {
    "chapter": 6,
    "arabic": "ملعقة",
    "hebrew": "כף",
    "translit": "מלעקה"
  },
  {
    "chapter": 6,
    "arabic": "شوكة",
    "hebrew": "מזלג",
    "translit": "שוכה"
  },
  {
    "chapter": 6,
    "arabic": "سكين",
    "hebrew": "סכין",
    "translit": "סכינ"
  },
  {
    "chapter": 6,
    "arabic": "صحن",
    "hebrew": "צלחת",
    "translit": "צחנ"
  },
  {
    "chapter": 6,
    "arabic": "كوب",
    "hebrew": "כוס",
    "translit": "כוב"
  },
  {
    "chapter": 7,
    "arabic": "أحمر",
    "hebrew": "אדום",
    "translit": "אחמר"
  },
  {
    "chapter": 7,
    "arabic": "أزرق",
    "hebrew": "כחול",
    "translit": "אזרק"
  },
  {
    "chapter": 7,
    "arabic": "أصفر",
    "hebrew": "צהוב",
    "translit": "אצפר"
  },
  {
    "chapter": 7,
    "arabic": "أخضر",
    "hebrew": "ירוק",
    "translit": "אח'דר"
  },
  {
    "chapter": 7,
    "arabic": "أسود",
    "hebrew": "שחור",
    "translit": "אסוד"
  },
  {
    "chapter": 7,
    "arabic": "أبيض",
    "hebrew": "לבן",
    "translit": "אביד"
  },
  {
    "chapter": 7,
    "arabic": "بني",
    "hebrew": "חום",
    "translit": "בני"
  },
  {
    "chapter": 7,
    "arabic": "وردي",
    "hebrew": "ורוד",
    "translit": "ורדי"
  },
  {
    "chapter": 7,
    "arabic": "رمادي",
    "hebrew": "אפור",
    "translit": "רמאדי"
  },
  {
    "chapter": 7,
    "arabic": "برتقالي",
    "hebrew": "כתום",
    "translit": "ברתקאלי"
  },
  {
    "chapter": 7,
    "arabic": "كبير",
    "hebrew": "גדול",
    "translit": "כביר"
  },
  {
    "chapter": 7,
    "arabic": "صغير",
    "hebrew": "קטן",
    "translit": "צע'יר"
  },
  {
    "chapter": 7,
    "arabic": "طويل",
    "hebrew": "גבוה / ארוך",
    "translit": "טויל"
  },
  {
    "chapter": 7,
    "arabic": "قصير",
    "hebrew": "נמוך / קצר",
    "translit": "קציר"
  },
  {
    "chapter": 7,
    "arabic": "جميل",
    "hebrew": "יפה",
    "translit": "ג'מיל"
  },
  {
    "chapter": 7,
    "arabic": "قبيح",
    "hebrew": "מכוער",
    "translit": "קביח"
  },
  {
    "chapter": 7,
    "arabic": "سريع",
    "hebrew": "מהיר",
    "translit": "סריע"
  },
  {
    "chapter": 7,
    "arabic": "بطيء",
    "hebrew": "איטי",
    "translit": "בטיא"
  },
  {
    "chapter": 7,
    "arabic": "قوي",
    "hebrew": "חזק",
    "translit": "קוי"
  },
  {
    "chapter": 7,
    "arabic": "ضعيف",
    "hebrew": "חלש",
    "translit": "דעיפ"
  },
  {
    "chapter": 7,
    "arabic": "ساخن",
    "hebrew": "חם",
    "translit": "סאח'נ"
  },
  {
    "chapter": 7,
    "arabic": "بارد",
    "hebrew": "קר",
    "translit": "בארד"
  },
  {
    "chapter": 7,
    "arabic": "نظيف",
    "hebrew": "נקי",
    "translit": "נז'יפ"
  },
  {
    "chapter": 7,
    "arabic": "وسخ",
    "hebrew": "מלוכלך",
    "translit": "וסח'"
  },
  {
    "chapter": 7,
    "arabic": "سهل",
    "hebrew": "קל",
    "translit": "סהל"
  },
  {
    "chapter": 7,
    "arabic": "صعب",
    "hebrew": "קשה",
    "translit": "צעב"
  },
  {
    "chapter": 7,
    "arabic": "غني",
    "hebrew": "עשיר",
    "translit": "ע'ני"
  },
  {
    "chapter": 7,
    "arabic": "فقير",
    "hebrew": "עני",
    "translit": "פקיר"
  },
  {
    "chapter": 7,
    "arabic": "سعيد",
    "hebrew": "שמח",
    "translit": "סעיד"
  },
  {
    "chapter": 7,
    "arabic": "حزين",
    "hebrew": "עצוב",
    "translit": "חזינ"
  },
  {
    "chapter": 7,
    "arabic": "غاضب",
    "hebrew": "כועס",
    "translit": "ע'אדב"
  },
  {
    "chapter": 7,
    "arabic": "هادئ",
    "hebrew": "שקט",
    "translit": "האדא"
  },
  {
    "chapter": 7,
    "arabic": "مشغول",
    "hebrew": "עסוק",
    "translit": "משע'ול"
  },
  {
    "chapter": 7,
    "arabic": "فارغ",
    "hebrew": "ריק / פנוי",
    "translit": "פארע'"
  },
  {
    "chapter": 7,
    "arabic": "ممتلئ",
    "hebrew": "מלא",
    "translit": "ממתלא"
  },
  {
    "chapter": 7,
    "arabic": "ثقيل",
    "hebrew": "כבד (משקל)",
    "translit": "ת'קיל"
  },
  {
    "chapter": 7,
    "arabic": "خفيف",
    "hebrew": "קל (משקל)",
    "translit": "ח'פיפ"
  },
  {
    "chapter": 7,
    "arabic": "ناعم",
    "hebrew": "רך",
    "translit": "נאעמ"
  },
  {
    "chapter": 7,
    "arabic": "خشن",
    "hebrew": "מחוספס",
    "translit": "ח'שנ"
  },
  {
    "chapter": 7,
    "arabic": "لطيف",
    "hebrew": "נחמד",
    "translit": "לטיפ"
  },
  {
    "chapter": 8,
    "arabic": "شمس",
    "hebrew": "שמש",
    "translit": "שמס"
  },
  {
    "chapter": 8,
    "arabic": "قمر",
    "hebrew": "ירח",
    "translit": "קמר"
  },
  {
    "chapter": 8,
    "arabic": "نجمة",
    "hebrew": "כוכב",
    "translit": "נג'מה"
  },
  {
    "chapter": 8,
    "arabic": "سماء",
    "hebrew": "שמיים",
    "translit": "סמאא"
  },
  {
    "chapter": 8,
    "arabic": "أرض",
    "hebrew": "כדור הארץ / אדמה",
    "translit": "ארד"
  },
  {
    "chapter": 8,
    "arabic": "بحر",
    "hebrew": "ים",
    "translit": "בחר"
  },
  {
    "chapter": 8,
    "arabic": "نهر",
    "hebrew": "נהר",
    "translit": "נהר"
  },
  {
    "chapter": 8,
    "arabic": "جبل",
    "hebrew": "הר",
    "translit": "ג'בל"
  },
  {
    "chapter": 8,
    "arabic": "صحراء",
    "hebrew": "מדבר",
    "translit": "צחראא"
  },
  {
    "chapter": 8,
    "arabic": "غابة",
    "hebrew": "יער",
    "translit": "ע'אבה"
  },
  {
    "chapter": 8,
    "arabic": "شجرة",
    "hebrew": "עץ",
    "translit": "שג'רה"
  },
  {
    "chapter": 8,
    "arabic": "وردة",
    "hebrew": "ורד",
    "translit": "ורדה"
  },
  {
    "chapter": 8,
    "arabic": "زهرة",
    "hebrew": "פרח",
    "translit": "זהרה"
  },
  {
    "chapter": 8,
    "arabic": "عشب",
    "hebrew": "דשא / עשב",
    "translit": "עשב"
  },
  {
    "chapter": 8,
    "arabic": "حجر",
    "hebrew": "אבן",
    "translit": "חג'ר"
  },
  {
    "chapter": 8,
    "arabic": "رمل",
    "hebrew": "חול",
    "translit": "רמל"
  },
  {
    "chapter": 8,
    "arabic": "بحيرة",
    "hebrew": "אגם",
    "translit": "בחירה"
  },
  {
    "chapter": 8,
    "arabic": "مطر",
    "hebrew": "גשם",
    "translit": "מטר"
  },
  {
    "chapter": 8,
    "arabic": "ثلج",
    "hebrew": "שלג",
    "translit": "ת'לג'"
  },
  {
    "chapter": 8,
    "arabic": "ريح",
    "hebrew": "רוח",
    "translit": "ריח"
  },
  {
    "chapter": 8,
    "arabic": "غيم",
    "hebrew": "עננים",
    "translit": "ע'ימ"
  },
  {
    "chapter": 8,
    "arabic": "رعد",
    "hebrew": "רעם",
    "translit": "רעד"
  },
  {
    "chapter": 8,
    "arabic": "برق",
    "hebrew": "ברק",
    "translit": "ברק"
  },
  {
    "chapter": 8,
    "arabic": "حر",
    "hebrew": "חום (מזג אוויר)",
    "translit": "חר"
  },
  {
    "chapter": 8,
    "arabic": "برد",
    "hebrew": "קור",
    "translit": "ברד"
  },
  {
    "chapter": 8,
    "arabic": "طقس",
    "hebrew": "מזג אוויר",
    "translit": "טקס"
  },
  {
    "chapter": 8,
    "arabic": "فصل",
    "hebrew": "עונה",
    "translit": "פצל"
  },
  {
    "chapter": 8,
    "arabic": "ربيع",
    "hebrew": "אביב",
    "translit": "רביע"
  },
  {
    "chapter": 8,
    "arabic": "صيف",
    "hebrew": "קיץ",
    "translit": "ציפ"
  },
  {
    "chapter": 8,
    "arabic": "خريف",
    "hebrew": "סתיו",
    "translit": "ח'ריפ"
  },
  {
    "chapter": 8,
    "arabic": "شتاء",
    "hebrew": "חורף",
    "translit": "שתאא"
  },
  {
    "chapter": 8,
    "arabic": "حيوان",
    "hebrew": "חיה",
    "translit": "חיואנ"
  },
  {
    "chapter": 8,
    "arabic": "طائر",
    "hebrew": "ציפור",
    "translit": "טאאר"
  },
  {
    "chapter": 8,
    "arabic": "قطة",
    "hebrew": "חתולה",
    "translit": "קטה"
  },
  {
    "chapter": 8,
    "arabic": "كلب",
    "hebrew": "כלב",
    "translit": "כלב"
  },
  {
    "chapter": 8,
    "arabic": "أسد",
    "hebrew": "אריה",
    "translit": "אסד"
  },
  {
    "chapter": 8,
    "arabic": "سمكة",
    "hebrew": "דג (יחיד)",
    "translit": "סמכה"
  },
  {
    "chapter": 8,
    "arabic": "حشرة",
    "hebrew": "חרק",
    "translit": "חשרה"
  },
  {
    "chapter": 8,
    "arabic": "جزيرة",
    "hebrew": "אי",
    "translit": "ג'זירה"
  },
  {
    "chapter": 8,
    "arabic": "وادي",
    "hebrew": "עמק / ואדי",
    "translit": "ואדי"
  },
  {
    "chapter": 9,
    "arabic": "مدينة",
    "hebrew": "עיר",
    "translit": "מדינה"
  },
  {
    "chapter": 9,
    "arabic": "قرية",
    "hebrew": "כפר",
    "translit": "קריה"
  },
  {
    "chapter": 9,
    "arabic": "شارع",
    "hebrew": "רחוב",
    "translit": "שארע"
  },
  {
    "chapter": 9,
    "arabic": "طريق",
    "hebrew": "דרך",
    "translit": "טריק"
  },
  {
    "chapter": 9,
    "arabic": "سيارة",
    "hebrew": "מכונית",
    "translit": "סיארה"
  },
  {
    "chapter": 9,
    "arabic": "باص",
    "hebrew": "אוטובוס",
    "translit": "באצ"
  },
  {
    "chapter": 9,
    "arabic": "قطار",
    "hebrew": "רכבת",
    "translit": "קטאר"
  },
  {
    "chapter": 9,
    "arabic": "طائرة",
    "hebrew": "מטוס",
    "translit": "טאארה"
  },
  {
    "chapter": 9,
    "arabic": "سفينة",
    "hebrew": "ספינה",
    "translit": "ספינה"
  },
  {
    "chapter": 9,
    "arabic": "دراجة",
    "hebrew": "אופניים",
    "translit": "דראג'ה"
  },
  {
    "chapter": 9,
    "arabic": "محطة",
    "hebrew": "תחנה",
    "translit": "מחטה"
  },
  {
    "chapter": 9,
    "arabic": "مطار",
    "hebrew": "שדה תעופה",
    "translit": "מטאר"
  },
  {
    "chapter": 9,
    "arabic": "ميناء",
    "hebrew": "נמל",
    "translit": "מינאא"
  },
  {
    "chapter": 9,
    "arabic": "جسر",
    "hebrew": "גשר",
    "translit": "ג'סר"
  },
  {
    "chapter": 9,
    "arabic": "إشارة",
    "hebrew": "רמזור",
    "translit": "אשארה"
  },
  {
    "chapter": 9,
    "arabic": "مستشفى",
    "hebrew": "בית חולים",
    "translit": "מסתשפא"
  },
  {
    "chapter": 9,
    "arabic": "مدرسة",
    "hebrew": "בית ספר",
    "translit": "מדרסה"
  },
  {
    "chapter": 9,
    "arabic": "جامعة",
    "hebrew": "אוניברסיטה",
    "translit": "ג'אמעה"
  },
  {
    "chapter": 9,
    "arabic": "سوق",
    "hebrew": "שוק",
    "translit": "סוק"
  },
  {
    "chapter": 9,
    "arabic": "متجر",
    "hebrew": "חנות",
    "translit": "מתג'ר"
  },
  {
    "chapter": 9,
    "arabic": "بنك",
    "hebrew": "בנק",
    "translit": "בנכ"
  },
  {
    "chapter": 9,
    "arabic": "فندق",
    "hebrew": "מלון",
    "translit": "פנדק"
  },
  {
    "chapter": 9,
    "arabic": "صيدلية",
    "hebrew": "בית מרקחת",
    "translit": "צידליה"
  },
  {
    "chapter": 9,
    "arabic": "مسجد",
    "hebrew": "מסגד",
    "translit": "מסג'ד"
  },
  {
    "chapter": 9,
    "arabic": "كنيسة",
    "hebrew": "כנסייה",
    "translit": "כניסה"
  },
  {
    "chapter": 9,
    "arabic": "حديقة عامة",
    "hebrew": "פארק",
    "translit": "חדיקה עאמה"
  },
  {
    "chapter": 9,
    "arabic": "يمين",
    "hebrew": "ימין",
    "translit": "ימינ"
  },
  {
    "chapter": 9,
    "arabic": "يسار",
    "hebrew": "שמאל",
    "translit": "יסאר"
  },
  {
    "chapter": 9,
    "arabic": "أمام",
    "hebrew": "מול / לפני",
    "translit": "אמאמ"
  },
  {
    "chapter": 9,
    "arabic": "خلف",
    "hebrew": "מאחורי",
    "translit": "ח'לפ"
  },
  {
    "chapter": 9,
    "arabic": "فوق",
    "hebrew": "מעל",
    "translit": "פוק"
  },
  {
    "chapter": 9,
    "arabic": "تحت",
    "hebrew": "מתחת",
    "translit": "תחת"
  },
  {
    "chapter": 9,
    "arabic": "بجانب",
    "hebrew": "ליד",
    "translit": "בג'אנב"
  },
  {
    "chapter": 9,
    "arabic": "بين",
    "hebrew": "בין",
    "translit": "בינ"
  },
  {
    "chapter": 9,
    "arabic": "قريب",
    "hebrew": "קרוב",
    "translit": "קריב"
  },
  {
    "chapter": 9,
    "arabic": "بعيد",
    "hebrew": "רחוק",
    "translit": "בעיד"
  },
  {
    "chapter": 9,
    "arabic": "شمال",
    "hebrew": "צפון",
    "translit": "שמאל"
  },
  {
    "chapter": 9,
    "arabic": "جنوب",
    "hebrew": "דרום",
    "translit": "ג'נוב"
  },
  {
    "chapter": 9,
    "arabic": "شرق",
    "hebrew": "מזרח",
    "translit": "שרק"
  },
  {
    "chapter": 9,
    "arabic": "غرب",
    "hebrew": "מערב",
    "translit": "ע'רב"
  },
  {
    "chapter": 10,
    "arabic": "قلم",
    "hebrew": "עט",
    "translit": "קלמ"
  },
  {
    "chapter": 10,
    "arabic": "دفتر",
    "hebrew": "מחברת",
    "translit": "דפתר"
  },
  {
    "chapter": 10,
    "arabic": "ورقة",
    "hebrew": "דף",
    "translit": "ורקה"
  },
  {
    "chapter": 10,
    "arabic": "حقيبة",
    "hebrew": "תיק",
    "translit": "חקיבה"
  },
  {
    "chapter": 10,
    "arabic": "صف",
    "hebrew": "כיתה",
    "translit": "צפ"
  },
  {
    "chapter": 10,
    "arabic": "درس",
    "hebrew": "שיעור",
    "translit": "דרס"
  },
  {
    "chapter": 10,
    "arabic": "امتحان",
    "hebrew": "מבחן",
    "translit": "אמתחאנ"
  },
  {
    "chapter": 10,
    "arabic": "واجب",
    "hebrew": "שיעורי בית",
    "translit": "ואג'ב"
  },
  {
    "chapter": 10,
    "arabic": "سؤال",
    "hebrew": "שאלה",
    "translit": "סאאל"
  },
  {
    "chapter": 10,
    "arabic": "جواب",
    "hebrew": "תשובה",
    "translit": "ג'ואב"
  },
  {
    "chapter": 10,
    "arabic": "لغة",
    "hebrew": "שפה",
    "translit": "לע'ה"
  },
  {
    "chapter": 10,
    "arabic": "عمل",
    "hebrew": "עבודה",
    "translit": "עמל"
  },
  {
    "chapter": 10,
    "arabic": "وظيفة",
    "hebrew": "משרה",
    "translit": "וז'יפה"
  },
  {
    "chapter": 10,
    "arabic": "شركة",
    "hebrew": "חברה (עסקית)",
    "translit": "שרכה"
  },
  {
    "chapter": 10,
    "arabic": "مكتب",
    "hebrew": "משרד",
    "translit": "מכתב"
  },
  {
    "chapter": 10,
    "arabic": "مدير",
    "hebrew": "מנהל",
    "translit": "מדיר"
  },
  {
    "chapter": 10,
    "arabic": "موظف",
    "hebrew": "עובד",
    "translit": "מוז'פ"
  },
  {
    "chapter": 10,
    "arabic": "راتب",
    "hebrew": "משכורת",
    "translit": "ראתב"
  },
  {
    "chapter": 10,
    "arabic": "اجتماع",
    "hebrew": "פגישה",
    "translit": "אג'תמאע"
  },
  {
    "chapter": 10,
    "arabic": "مشروع",
    "hebrew": "פרויקט",
    "translit": "משרוע"
  },
  {
    "chapter": 10,
    "arabic": "هواية",
    "hebrew": "תחביב",
    "translit": "הואיה"
  },
  {
    "chapter": 10,
    "arabic": "قراءة",
    "hebrew": "קריאה",
    "translit": "קראאה"
  },
  {
    "chapter": 10,
    "arabic": "كتابة",
    "hebrew": "כתיבה",
    "translit": "כתאבה"
  },
  {
    "chapter": 10,
    "arabic": "رسم",
    "hebrew": "ציור",
    "translit": "רסמ"
  },
  {
    "chapter": 10,
    "arabic": "موسيقى",
    "hebrew": "מוזיקה",
    "translit": "מוסיקא"
  },
  {
    "chapter": 10,
    "arabic": "رياضة",
    "hebrew": "ספורט",
    "translit": "ריאדה"
  },
  {
    "chapter": 10,
    "arabic": "سباحة",
    "hebrew": "שחייה",
    "translit": "סבאחה"
  },
  {
    "chapter": 10,
    "arabic": "كرة قدم",
    "hebrew": "כדורגל",
    "translit": "כרה קדמ"
  },
  {
    "chapter": 10,
    "arabic": "سفر",
    "hebrew": "נסיעות",
    "translit": "ספר"
  },
  {
    "chapter": 10,
    "arabic": "تصوير",
    "hebrew": "צילום",
    "translit": "תצויר"
  },
  {
    "chapter": 10,
    "arabic": "طبخ",
    "hebrew": "בישול",
    "translit": "טבח'"
  },
  {
    "chapter": 10,
    "arabic": "لعبة",
    "hebrew": "משחק",
    "translit": "לעבה"
  },
  {
    "chapter": 10,
    "arabic": "فيلم",
    "hebrew": "סרט",
    "translit": "פילמ"
  },
  {
    "chapter": 10,
    "arabic": "أغنية",
    "hebrew": "שיר",
    "translit": "אע'ניה"
  },
  {
    "chapter": 10,
    "arabic": "حفلة",
    "hebrew": "מסיבה",
    "translit": "חפלה"
  },
  {
    "chapter": 10,
    "arabic": "عطلة",
    "hebrew": "חופשה",
    "translit": "עטלה"
  },
  {
    "chapter": 10,
    "arabic": "نجاح",
    "hebrew": "הצלחה",
    "translit": "נג'אח"
  },
  {
    "chapter": 10,
    "arabic": "هدف",
    "hebrew": "מטרה",
    "translit": "הדפ"
  },
  {
    "chapter": 10,
    "arabic": "مهنة",
    "hebrew": "מקצוע",
    "translit": "מהנה"
  },
  {
    "chapter": 10,
    "arabic": "فرصة",
    "hebrew": "הזדמנות",
    "translit": "פרצה"
  }
];
