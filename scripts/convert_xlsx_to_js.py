#!/usr/bin/env python3
"""
סקריפט חד-פעמי: ממיר את אוצר_מילים_ערבית.xlsx לשלושה קבצי JS סטטיים
(data/vocabulary.js, data/verb-roots.js, data/verb-practice-set.js) לשימוש
ישיר באתר, ללא תלות בקריאת xlsx בדפדפן. לא רץ כחלק מהאתר עצמו.
"""
import json
import openpyxl

SRC = "אוצר_מילים_ערבית.xlsx"

wb = openpyxl.load_workbook(SRC, data_only=True)

# --- גיליון 1: אוצר מילים כללי ---
ws = wb["אוצר מילים כללי"]
rows = [r for r in ws.iter_rows(min_row=2, values_only=True) if isinstance(r[0], int)]

chapter_titles = {}
vocabulary = []
for chapter_num, chapter_title, arabic, hebrew, translit in rows:
    chapter_titles.setdefault(chapter_num, chapter_title)
    vocabulary.append({
        "chapter": chapter_num,
        "arabic": arabic.strip(),
        "hebrew": hebrew.strip(),
        "translit": translit.strip(),
    })

assert len(vocabulary) == 400, f"Expected 400 words, got {len(vocabulary)}"
assert len(chapter_titles) == 10, f"Expected 10 chapters, got {len(chapter_titles)}"

chapters = [{"num": n, "title": chapter_titles[n]} for n in sorted(chapter_titles)]

# --- גיליון 2: אוצר מילים - פעלים ---
def is_arabic_word(s):
    return isinstance(s, str) and all("؀" <= c <= "ۿ" for c in s.strip())

# הקובץ המקורי נותן את תרגום השורש כשם פועל ("לכתוב"). לצורכי האתר אנחנו
# מציגים במקום זאת את הפועל בעבר גוף הוא ("כתב"), כדי שיתאים לצורת הבסיס
# שמוצגת בכל התרגילים (עבר הוא = תבנית הבסיס של הבניינים). המרה ידנית קבועה,
# לא תרגום אוטומטי - כל 40 הערכים נבדקו ידנית.
INFINITIVE_TO_PAST = {
    "לכתוב": "כתב",
    "להבין": "הבין",
    "לשמוע": "שמע",
    "לשתות": "שתה",
    "ללכת": "הלך",
    "לחזור": "חזר",
    "לצאת": "יצא",
    "להיכנס": "נכנס",
    "לשבת": "ישב",
    "להסתכל": "הסתכל",
    "לעבוד": "עבד",
    "לשחק": "שיחק",
    "ללמוד": "למד",
    "לפתוח": "פתח",
    "לסגור": "סגר",
    "לבקש": "ביקש",
    "לדעת / להכיר": "ידע / הכיר",
    "לשנן / לשמור": "שינן / שמר",
    "לשבור": "שבר",
    "לכבס / לשטוף": "כיבס / שטף",
    "ללבוש": "לבש",
    "לרכוב": "רכב",
    "לרדת": "ירד",
    "לעלות": "עלה",
    "לשרת": "שירת",
    "לצייר": "צייר",
    "לבשל": "בישל",
    "לנטוע": "נטע",
    "לשאת / לסחוב": "נשא / סחב",
    "לדחוף / לשלם": "דחף / שילם",
    "לאסוף": "אסף",
    "לחתוך": "חתך",
    "להכות": "הכה",
    "לשלוט / לשפוט": "שלט / שפט",
    "להצליח": "הצליח",
    "להיכשל": "נכשל",
    "לרקוד": "רקד",
    "לצחוק": "צחק",
    "לקפוץ": "קפץ",
    "לשחות": "שחה",
}

ws2 = wb["אוצר מילים - פעלים"]
rows2 = [r for r in ws2.iter_rows(min_row=2, values_only=True) if is_arabic_word(r[0])]

verb_roots = []
for arabic, hebrew, translit, topic in rows2:
    root_letters = [c for c in arabic.strip() if c not in ("ـ",)]
    assert len(root_letters) == 3, f"Root not triliteral: {arabic!r} -> {root_letters}"
    hebrew_infinitive = hebrew.strip()
    assert hebrew_infinitive in INFINITIVE_TO_PAST, f"Missing past-tense mapping for: {hebrew_infinitive!r}"
    verb_roots.append({
        "root": arabic.strip(),
        "r1": root_letters[0],
        "r2": root_letters[1],
        "r3": root_letters[2],
        "hebrew": INFINITIVE_TO_PAST[hebrew_infinitive],
        "translit": translit.strip(),
        "topic": topic.strip(),
    })

assert len(verb_roots) == 40, f"Expected 40 verb roots, got {len(verb_roots)}"

with open("data/vocabulary.js", "w", encoding="utf-8") as f:
    f.write("// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py\n")
    f.write("// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.\n\n")
    f.write("const VOCAB_CHAPTERS = ")
    f.write(json.dumps(chapters, ensure_ascii=False, indent=2))
    f.write(";\n\n")
    f.write("const VOCABULARY = ")
    f.write(json.dumps(vocabulary, ensure_ascii=False, indent=2))
    f.write(";\n")

with open("data/verb-roots.js", "w", encoding="utf-8") as f:
    f.write("// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx על ידי scripts/convert_xlsx_to_js.py\n")
    f.write("// אל תערוך ידנית - ערוך את קובץ המקור והרץ מחדש את הסקריפט.\n\n")
    f.write("const VERB_ROOTS = ")
    f.write(json.dumps(verb_roots, ensure_ascii=False, indent=2))
    f.write(";\n")

# --- גיליון 5: פתרונות (סט התרגול הקבוע ל"זהה את הפועל" באתר) ---
DIGIT_TO_BINYAN_ID = {"1": "I", "2": "II", "3": "III", "4": "IV", "5": "V", "6": "VI", "7": "VII", "8": "VIII", "10": "X"}
TENSE_LABEL_TO_KEY = {"עבר": "past", "הווה/עתיד": "present", "ציווי": "imperative", "מצדר": "masdar"}
PERSON_LABEL_TO_ID = {
    "אני": "ana", "אתה": "anta", "את": "anti", "הוא": "huwa", "היא": "hiya", "אנחנו": "nahnu",
    "אתם/ן השניים": "antuma", "אתם": "antum", "אתן": "antunna",
    "הם השניים": "huma_m", "הן השתיים": "huma_f", "הם": "hum", "הן": "hunna",
}

ws5 = wb["פתרונות"]
practice_set = []
seen_combos = set()
for verb, root, binyan_digit, tense_label, person_label, translation in ws5.iter_rows(min_row=2, values_only=True):
    if verb is None:
        continue
    binyan_id = DIGIT_TO_BINYAN_ID[str(binyan_digit)]
    tense = TENSE_LABEL_TO_KEY[tense_label]
    person_id = None if person_label == "–" else PERSON_LABEL_TO_ID[person_label]
    combo = (root, binyan_id, tense, person_id)
    assert combo not in seen_combos, f"כפילות בגיליון 5: {combo}"
    seen_combos.add(combo)
    # לא שומרים ar/he - נגזרים מחדש בזמן ריצה ע"י VerbEngine.generateForm, כדי
    # למנוע כפל נתונים מול המנוע (מקור האמת היחיד לצורות המנוטות).
    practice_set.append({"root": root, "binyanId": binyan_id, "tense": tense, "personId": person_id})

assert len(practice_set) == 550, f"Expected 550 practice items, got {len(practice_set)}"

with open("data/verb-practice-set.js", "w", encoding="utf-8") as f:
    f.write("// קובץ נוצר אוטומטית מתוך אוצר_מילים_ערבית.xlsx (גיליון 'פתרונות') על ידי\n")
    f.write("// scripts/convert_xlsx_to_js.py. אל תערוך ידנית - ערוך את קובץ המקור והרץ\n")
    f.write("// מחדש את הסקריפט. כל פריט מכיל רק {root, binyanId, tense, personId}; הצורה\n")
    f.write("// המנוטה (ar/he) נגזרת מחדש ע\"י VerbEngine.generateForm בזמן ריצה.\n\n")
    f.write("const VERB_PRACTICE_SET = ")
    f.write(json.dumps(practice_set, ensure_ascii=False, indent=2))
    f.write(";\n")

print(f"OK: {len(vocabulary)} words in {len(chapters)} chapters, {len(verb_roots)} verb roots, {len(practice_set)} practice items.")
