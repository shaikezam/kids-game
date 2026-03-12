<?php

namespace games;

class SymbolNameGame
{
    private array $symbols = [
        // ─── פירות ──────────────────────────────────────
        ['symbol' => '🍎', 'name' => 'תפוח'],
        ['symbol' => '🍌', 'name' => 'בננה'],
        ['symbol' => '🍇', 'name' => 'ענבים'],
        ['symbol' => '🍊', 'name' => 'תפוז'],
        ['symbol' => '🍋', 'name' => 'לימון'],
        ['symbol' => '🍉', 'name' => 'אבטיח'],
        ['symbol' => '🍓', 'name' => 'תות'],
        ['symbol' => '🍒', 'name' => 'דובדבן'],
        ['symbol' => '🍑', 'name' => 'אפרסק'],
        ['symbol' => '🥝', 'name' => 'קיווי'],
        ['symbol' => '🍍', 'name' => 'אננס'],
        ['symbol' => '🥭', 'name' => 'מנגו'],
        ['symbol' => '🫐', 'name' => 'אוכמניות'],
        ['symbol' => '🥥', 'name' => 'קוקוס'],
        ['symbol' => '🍈', 'name' => 'מלון'],

        // ─── ירקות ──────────────────────────────────────
        ['symbol' => '🥕', 'name' => 'גזר'],
        ['symbol' => '🥒', 'name' => 'מלפפון'],
        ['symbol' => '🍅', 'name' => 'עגבניה'],
        ['symbol' => '🌽', 'name' => 'תירס'],
        ['symbol' => '🥦', 'name' => 'ברוקולי'],
        ['symbol' => '🧅', 'name' => 'בצל'],
        ['symbol' => '🧄', 'name' => 'שום'],
        ['symbol' => '🥬', 'name' => 'חסה'],
        ['symbol' => '🌶️', 'name' => 'פלפל'],
        ['symbol' => '🥔', 'name' => 'תפוח אדמה'],
        ['symbol' => '🍆', 'name' => 'חציל'],
        ['symbol' => '🫑', 'name' => 'גמבה'],
        ['symbol' => '🥜', 'name' => 'בוטנים'],

        // ─── חיות ───────────────────────────────────────
        ['symbol' => '🐶', 'name' => 'כלב'],
        ['symbol' => '🐱', 'name' => 'חתול'],
        ['symbol' => '🐭', 'name' => 'עכבר'],
        ['symbol' => '🐰', 'name' => 'ארנב'],
        ['symbol' => '🐻', 'name' => 'דוב'],
        ['symbol' => '🐸', 'name' => 'צפרדע'],
        ['symbol' => '🐔', 'name' => 'תרנגולת'],
        ['symbol' => '🐴', 'name' => 'סוס'],
        ['symbol' => '🐷', 'name' => 'חזיר'],
        ['symbol' => '🐟', 'name' => 'דג'],
        ['symbol' => '🦁', 'name' => 'אריה'],
        ['symbol' => '🐘', 'name' => 'פיל'],
        ['symbol' => '🦒', 'name' => 'ג׳ירפה'],
        ['symbol' => '🦋', 'name' => 'פרפר'],
        ['symbol' => '🐢', 'name' => 'צב'],
        ['symbol' => '🐍', 'name' => 'נחש'],
        ['symbol' => '🦅', 'name' => 'נשר'],
        ['symbol' => '🦉', 'name' => 'ינשוף'],
        ['symbol' => '🐝', 'name' => 'דבורה'],
        ['symbol' => '🐜', 'name' => 'נמלה'],
        ['symbol' => '🦈', 'name' => 'כריש'],
        ['symbol' => '🐙', 'name' => 'תמנון'],
        ['symbol' => '🦀', 'name' => 'סרטן'],
        ['symbol' => '🐧', 'name' => 'פינגווין'],
        ['symbol' => '🦃', 'name' => 'תרנגול הודו'],
        ['symbol' => '🐫', 'name' => 'גמל'],
        ['symbol' => '🦊', 'name' => 'שועל'],
        ['symbol' => '🐺', 'name' => 'זאב'],
        ['symbol' => '🦇', 'name' => 'עטלף'],
        ['symbol' => '🐿️', 'name' => 'סנאי'],
        ['symbol' => '🦜', 'name' => 'תוכי'],
        ['symbol' => '🕊️', 'name' => 'יונה'],
        ['symbol' => '🦢', 'name' => 'ברבור'],
        ['symbol' => '🦩', 'name' => 'פלמינגו'],
        ['symbol' => '🐊', 'name' => 'תנין'],
        ['symbol' => '🦎', 'name' => 'לטאה'],
        ['symbol' => '🐋', 'name' => 'לווייתן'],
        ['symbol' => '🐬', 'name' => 'דולפין'],
        ['symbol' => '🦭', 'name' => 'כלב ים'],
        ['symbol' => '🐄', 'name' => 'פרה'],
        ['symbol' => '🐑', 'name' => 'כבשה'],
        ['symbol' => '🐐', 'name' => 'עז'],
        ['symbol' => '🦌', 'name' => 'אייל'],
        ['symbol' => '🦔', 'name' => 'קיפוד'],
        ['symbol' => '🐈', 'name' => 'חתלתול'],

        // ─── טבע ומזג אוויר ────────────────────────────
        ['symbol' => '🌞', 'name' => 'שמש'],
        ['symbol' => '🌙', 'name' => 'ירח'],
        ['symbol' => '⭐', 'name' => 'כוכב'],
        ['symbol' => '🌈', 'name' => 'קשת'],
        ['symbol' => '☁️', 'name' => 'ענן'],
        ['symbol' => '🔥', 'name' => 'אש'],
        ['symbol' => '💧', 'name' => 'טיפה'],
        ['symbol' => '❄️', 'name' => 'שלג'],
        ['symbol' => '🌊', 'name' => 'גל'],
        ['symbol' => '🌺', 'name' => 'פרח'],
        ['symbol' => '🌳', 'name' => 'עץ'],
        ['symbol' => '⛰️', 'name' => 'הר'],
        ['symbol' => '🌵', 'name' => 'קקטוס'],
        ['symbol' => '🍂', 'name' => 'עלה'],
        ['symbol' => '🍄', 'name' => 'פטריה'],
        ['symbol' => '🌻', 'name' => 'חמניה'],
        ['symbol' => '🌹', 'name' => 'ורד'],
        ['symbol' => '🌴', 'name' => 'דקל'],
        ['symbol' => '⚡', 'name' => 'ברק'],
        ['symbol' => '🌪️', 'name' => 'סופה'],
        ['symbol' => '🏜️', 'name' => 'מדבר'],
        ['symbol' => '🏝️', 'name' => 'אי'],
        ['symbol' => '🌋', 'name' => 'הר געש'],

        // ─── כלי תחבורה ─────────────────────────────────
        ['symbol' => '🚗', 'name' => 'מכונית'],
        ['symbol' => '✈️', 'name' => 'מטוס'],
        ['symbol' => '🚀', 'name' => 'טיל'],
        ['symbol' => '🚲', 'name' => 'אופניים'],
        ['symbol' => '🚂', 'name' => 'רכבת'],
        ['symbol' => '🚁', 'name' => 'מסוק'],
        ['symbol' => '⛵', 'name' => 'מפרשית'],
        ['symbol' => '🚌', 'name' => 'אוטובוס'],
        ['symbol' => '🚕', 'name' => 'מונית'],
        ['symbol' => '🚒', 'name' => 'כבאית'],
        ['symbol' => '🚑', 'name' => 'אמבולנס'],
        ['symbol' => '🚜', 'name' => 'טרקטור'],
        ['symbol' => '🛴', 'name' => 'קורקינט'],
        ['symbol' => '🚇', 'name' => 'רכבת תחתית'],
        ['symbol' => '⛽', 'name' => 'תדלוק'],

        // ─── ספורט ──────────────────────────────────────
        ['symbol' => '⚽', 'name' => 'כדורגל'],
        ['symbol' => '🏀', 'name' => 'כדורסל'],
        ['symbol' => '🎾', 'name' => 'טניס'],
        ['symbol' => '🏐', 'name' => 'כדורעף'],
        ['symbol' => '🏓', 'name' => 'פינג פונג'],
        ['symbol' => '🥊', 'name' => 'איגרוף'],
        ['symbol' => '🏊', 'name' => 'שחייה'],
        ['symbol' => '🎿', 'name' => 'סקי'],
        ['symbol' => '🏄', 'name' => 'גלישה'],
        ['symbol' => '🤸', 'name' => 'התעמלות'],
        ['symbol' => '🏋️', 'name' => 'הרמת משקולות'],
        ['symbol' => '🎯', 'name' => 'מטרה'],
        ['symbol' => '🏹', 'name' => 'קשת וחץ'],

        // ─── מוזיקה ─────────────────────────────────────
        ['symbol' => '🎸', 'name' => 'גיטרה'],
        ['symbol' => '🎹', 'name' => 'פסנתר'],
        ['symbol' => '🥁', 'name' => 'תוף'],
        ['symbol' => '🎺', 'name' => 'חצוצרה'],
        ['symbol' => '🎻', 'name' => 'כינור'],
        ['symbol' => '🎵', 'name' => 'תו מוזיקלי'],
        ['symbol' => '🎤', 'name' => 'מיקרופון'],

        // ─── אוכל ───────────────────────────────────────
        ['symbol' => '🍕', 'name' => 'פיצה'],
        ['symbol' => '🍔', 'name' => 'המבורגר'],
        ['symbol' => '🌮', 'name' => 'טאקו'],
        ['symbol' => '🍟', 'name' => 'צ׳יפס'],
        ['symbol' => '🍩', 'name' => 'סופגניה'],
        ['symbol' => '🎂', 'name' => 'עוגה'],
        ['symbol' => '🍦', 'name' => 'גלידה'],
        ['symbol' => '🍪', 'name' => 'עוגיה'],
        ['symbol' => '🧁', 'name' => 'קאפקייק'],
        ['symbol' => '🥐', 'name' => 'קרואסון'],
        ['symbol' => '🍿', 'name' => 'פופקורן'],
        ['symbol' => '🥚', 'name' => 'ביצה'],
        ['symbol' => '🧀', 'name' => 'גבינה'],
        ['symbol' => '🍞', 'name' => 'לחם'],
        ['symbol' => '🥤', 'name' => 'שתייה'],
        ['symbol' => '☕', 'name' => 'קפה'],
        ['symbol' => '🍫', 'name' => 'שוקולד'],
        ['symbol' => '🍭', 'name' => 'סוכריה'],
        ['symbol' => '🥗', 'name' => 'סלט'],
        ['symbol' => '🍳', 'name' => 'חביתה'],

        // ─── חפצים וכלים ────────────────────────────────
        ['symbol' => '📚', 'name' => 'ספרים'],
        ['symbol' => '✏️', 'name' => 'עיפרון'],
        ['symbol' => '🏠', 'name' => 'בית'],
        ['symbol' => '🔑', 'name' => 'מפתח'],
        ['symbol' => '📱', 'name' => 'טלפון'],
        ['symbol' => '💻', 'name' => 'מחשב'],
        ['symbol' => '⌚', 'name' => 'שעון'],
        ['symbol' => '📷', 'name' => 'מצלמה'],
        ['symbol' => '🔔', 'name' => 'פעמון'],
        ['symbol' => '✂️', 'name' => 'מספריים'],
        ['symbol' => '🖊️', 'name' => 'עט'],
        ['symbol' => '📏', 'name' => 'סרגל'],
        ['symbol' => '🗺️', 'name' => 'מפה'],
        ['symbol' => '🧲', 'name' => 'מגנט'],
        ['symbol' => '💡', 'name' => 'נורה'],
        ['symbol' => '🔦', 'name' => 'פנס'],
        ['symbol' => '🧹', 'name' => 'מטאטא'],
        ['symbol' => '🪣', 'name' => 'דלי'],
        ['symbol' => '🛒', 'name' => 'עגלה'],
        ['symbol' => '🎒', 'name' => 'תיק גב'],
        ['symbol' => '👓', 'name' => 'משקפיים'],
        ['symbol' => '🧊', 'name' => 'קרח'],
        ['symbol' => '🕯️', 'name' => 'נר'],
        ['symbol' => '🪜', 'name' => 'סולם'],
        ['symbol' => '🧸', 'name' => 'דובי'],

        // ─── מקומות ומבנים ──────────────────────────────
        ['symbol' => '🏫', 'name' => 'בית ספר'],
        ['symbol' => '🏥', 'name' => 'בית חולים'],
        ['symbol' => '🏰', 'name' => 'טירה'],
        ['symbol' => '⛪', 'name' => 'כנסייה'],
        ['symbol' => '🕌', 'name' => 'מסגד'],
        ['symbol' => '🏟️', 'name' => 'אצטדיון'],
        ['symbol' => '🎪', 'name' => 'קרקס'],
        ['symbol' => '🏖️', 'name' => 'חוף'],
        ['symbol' => '🌃', 'name' => 'עיר'],
        ['symbol' => '🌾', 'name' => 'שדה'],
        ['symbol' => '🏕️', 'name' => 'מחנה'],

        // ─── גוף ותחושות ────────────────────────────────
        ['symbol' => '👁️', 'name' => 'עין'],
        ['symbol' => '👂', 'name' => 'אוזן'],
        ['symbol' => '👃', 'name' => 'אף'],
        ['symbol' => '👄', 'name' => 'פה'],
        ['symbol' => '🦷', 'name' => 'שן'],
        ['symbol' => '💪', 'name' => 'שריר'],
        ['symbol' => '🦶', 'name' => 'רגל'],
        ['symbol' => '✋', 'name' => 'יד'],
        ['symbol' => '🧠', 'name' => 'מוח'],
        ['symbol' => '❤️', 'name' => 'לב'],

        // ─── ביגוד ──────────────────────────────────────
        ['symbol' => '👕', 'name' => 'חולצה'],
        ['symbol' => '👖', 'name' => 'מכנסיים'],
        ['symbol' => '👗', 'name' => 'שמלה'],
        ['symbol' => '🧥', 'name' => 'מעיל'],
        ['symbol' => '👟', 'name' => 'נעל'],
        ['symbol' => '🎩', 'name' => 'כובע'],
        ['symbol' => '🧤', 'name' => 'כפפה'],
        ['symbol' => '🧣', 'name' => 'צעיף'],
        ['symbol' => '👜', 'name' => 'תיק'],
        ['symbol' => '🧦', 'name' => 'גרב'],

        // ─── מקצועות ────────────────────────────────────
        ['symbol' => '👨‍⚕️', 'name' => 'רופא'],
        ['symbol' => '👩‍🏫', 'name' => 'מורה'],
        ['symbol' => '👨‍🍳', 'name' => 'טבח'],
        ['symbol' => '👩‍🚒', 'name' => 'כבאי'],
        ['symbol' => '👨‍✈️', 'name' => 'טייס'],
        ['symbol' => '👩‍🔬', 'name' => 'מדענית'],
        ['symbol' => '👨‍🌾', 'name' => 'חקלאי'],
        ['symbol' => '👩‍🎨', 'name' => 'צייר'],
        ['symbol' => '🧑‍🚀', 'name' => 'אסטרונאוט'],
        ['symbol' => '💂', 'name' => 'שומר'],
    ];

    private int $questionsPerRound = 10;
    private int $extraLetters = 4;

    private array $allLetters = [
        'א',
        'ב',
        'ג',
        'ד',
        'ה',
        'ו',
        'ז',
        'ח',
        'ט',
        'י',
        'כ',
        'ל',
        'מ',
        'נ',
        'ס',
        'ע',
        'פ',
        'צ',
        'ק',
        'ר',
        'ש',
        'ת',
        'ך',
        'ם',
        'ן',
        'ף',
        'ץ'
    ];

    /**
     * Create a new round.
     */
    public function newGame(): array
    {
        $pool = $this->symbols;
        shuffle($pool);
        $selected = array_slice($pool, 0, $this->questionsPerRound);

        $questions = [];
        foreach ($selected as $item) {
            $questions[] = $this->buildQuestion($item);
        }

        return [
            'game' => 'symbol-name',
            'title' => 'איך כותבים? – בנו את המילה',
            'questions' => $questions,
            'currentQuestion' => 0,
            'score' => 0,
            'totalQuestions' => $this->questionsPerRound,
            'mistakes' => 0,
            'finished' => false,
        ];
    }

    /**
     * Build a single question.
     */
    private function buildQuestion(array $item): array
    {
        $name = $item['name'];
        $correctLetters = mb_str_split($name);
        $letterCount = count($correctLetters);

        // Collect distractor letters not in the word
        $usedLetters = array_unique($correctLetters);

        // Filter out spaces from used letters for distractor logic
        $usedNonSpace = array_filter($usedLetters, function ($l) {
            return $l !== ' ';
        });

        $available = array_diff($this->allLetters, $usedNonSpace);
        $available = array_values($available);
        shuffle($available);
        $distractors = array_slice($available, 0, $this->extraLetters);

        // Pool = correct letters (without spaces) + distractors
        $correctNonSpace = array_filter($correctLetters, function ($l) {
            return $l !== ' ';
        });
        $letterPool = array_merge(array_values($correctNonSpace), $distractors);
        shuffle($letterPool);

        return [
            'symbol' => $item['symbol'],
            'correctWord' => $name,
            'correctLetters' => $correctLetters,
            'wordLength' => $letterCount,
            'letterPool' => $letterPool,
            'hasSpaces' => in_array(' ', $correctLetters),
        ];
    }

    /**
     * Check a letter pick at a specific position.
     */
    public function checkLetter(array $correctLetters, int $position, string $pickedLetter): array
    {
        $expected = $correctLetters[$position] ?? null;
        $isCorrect = ($pickedLetter === $expected);

        return [
            'isCorrect' => $isCorrect,
            'expectedLetter' => $expected,
            'pickedLetter' => $pickedLetter,
            'position' => $position,
        ];
    }
}
