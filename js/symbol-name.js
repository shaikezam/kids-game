// ═══════════════════════════════════════════════════════════════════
// SYMBOL NAME QUIZ — WORD BUILDER — Full frontend logic (no API calls)
// ═══════════════════════════════════════════════════════════════════

var symbolNameSymbols = [
  // ─── פירות ──────────────────────────────────────
  {symbol: '🍎', name: 'תפוח'},
  {symbol: '🍌', name: 'בננה'},
  {symbol: '🍇', name: 'ענבים'},
  {symbol: '🍊', name: 'תפוז'},
  {symbol: '🍋', name: 'לימון'},
  {symbol: '🍉', name: 'אבטיח'},
  {symbol: '🍓', name: 'תות'},
  {symbol: '🍒', name: 'דובדבן'},
  {symbol: '🍑', name: 'אפרסק'},
  {symbol: '🥝', name: 'קיווי'},
  {symbol: '🍍', name: 'אננס'},
  {symbol: '🥭', name: 'מנגו'},
  {symbol: '🫐', name: 'אוכמניות'},
  {symbol: '🥥', name: 'קוקוס'},
  {symbol: '🍈', name: 'מלון'},

  // ─── ירקות ──────────────────────────────────────
  {symbol: '🥕', name: 'גזר'},
  {symbol: '🥒', name: 'מלפפון'},
  {symbol: '🍅', name: 'עגבניה'},
  {symbol: '🌽', name: 'תירס'},
  {symbol: '🥦', name: 'ברוקולי'},
  {symbol: '🧅', name: 'בצל'},
  {symbol: '🧄', name: 'שום'},
  {symbol: '🥬', name: 'חסה'},
  {symbol: '🌶️', name: 'פלפל'},
  {symbol: '🥔', name: 'תפוח אדמה'},
  {symbol: '🍆', name: 'חציל'},
  {symbol: '🫑', name: 'גמבה'},
  {symbol: '🥜', name: 'בוטנים'},

  // ─── חיות ───────────────────────────────────────
  {symbol: '🐶', name: 'כלב'},
  {symbol: '🐱', name: 'חתול'},
  {symbol: '🐭', name: 'עכבר'},
  {symbol: '🐰', name: 'ארנב'},
  {symbol: '🐻', name: 'דוב'},
  {symbol: '🐸', name: 'צפרדע'},
  {symbol: '🐔', name: 'תרנגולת'},
  {symbol: '🐴', name: 'סוס'},
  {symbol: '🐷', name: 'חזיר'},
  {symbol: '🐟', name: 'דג'},
  {symbol: '🦁', name: 'אריה'},
  {symbol: '🐘', name: 'פיל'},
  {symbol: '🦒', name: 'ג׳ירפה'},
  {symbol: '🦋', name: 'פרפר'},
  {symbol: '🐢', name: 'צב'},
  {symbol: '🐍', name: 'נחש'},
  {symbol: '🦅', name: 'נשר'},
  {symbol: '🦉', name: 'ינשוף'},
  {symbol: '🐝', name: 'דבורה'},
  {symbol: '🐜', name: 'נמלה'},
  {symbol: '🦈', name: 'כריש'},
  {symbol: '🐙', name: 'תמנון'},
  {symbol: '🦀', name: 'סרטן'},
  {symbol: '🐧', name: 'פינגווין'},
  {symbol: '🦃', name: 'תרנגול הודו'},
  {symbol: '🐫', name: 'גמל'},
  {symbol: '🦊', name: 'שועל'},
  {symbol: '🐺', name: 'זאב'},
  {symbol: '🦇', name: 'עטלף'},
  {symbol: '🐿️', name: 'סנאי'},
  {symbol: '🦜', name: 'תוכי'},
  {symbol: '🕊️', name: 'יונה'},
  {symbol: '🦢', name: 'ברבור'},
  {symbol: '🦩', name: 'פלמינגו'},
  {symbol: '🐊', name: 'תנין'},
  {symbol: '🦎', name: 'לטאה'},
  {symbol: '🐋', name: 'לווייתן'},
  {symbol: '🐬', name: 'דולפין'},
  {symbol: '🦭', name: 'כלב ים'},
  {symbol: '🐄', name: 'פרה'},
  {symbol: '🐑', name: 'כבשה'},
  {symbol: '🐐', name: 'עז'},
  {symbol: '🦌', name: 'אייל'},
  {symbol: '🦔', name: 'קיפוד'},
  {symbol: '🐈', name: 'חתלתול'},

  // ─── טבע ומזג אוויר ────────────────────────────
  {symbol: '🌞', name: 'שמש'},
  {symbol: '🌙', name: 'ירח'},
  {symbol: '⭐', name: 'כוכב'},
  {symbol: '🌈', name: 'קשת'},
  {symbol: '☁️', name: 'ענן'},
  {symbol: '🔥', name: 'אש'},
  {symbol: '💧', name: 'טיפה'},
  {symbol: '❄️', name: 'שלג'},
  {symbol: '🌊', name: 'גל'},
  {symbol: '🌺', name: 'פרח'},
  {symbol: '🌳', name: 'עץ'},
  {symbol: '⛰️', name: 'הר'},
  {symbol: '🌵', name: 'קקטוס'},
  {symbol: '🍂', name: 'עלה'},
  {symbol: '🍄', name: 'פטריה'},
  {symbol: '🌻', name: 'חמניה'},
  {symbol: '🌹', name: 'ורד'},
  {symbol: '🌴', name: 'דקל'},
  {symbol: '⚡', name: 'ברק'},
  {symbol: '🌪️', name: 'סופה'},
  {symbol: '🏜️', name: 'מדבר'},
  {symbol: '🏝️', name: 'אי'},
  {symbol: '🌋', name: 'הר געש'},

  // ─── כלי תחבורה ─────────────────────────────────
  {symbol: '🚗', name: 'מכונית'},
  {symbol: '✈️', name: 'מטוס'},
  {symbol: '🚀', name: 'טיל'},
  {symbol: '🚲', name: 'אופניים'},
  {symbol: '🚂', name: 'רכבת'},
  {symbol: '🚁', name: 'מסוק'},
  {symbol: '⛵', name: 'מפרשית'},
  {symbol: '🚌', name: 'אוטובוס'},
  {symbol: '🚕', name: 'מונית'},
  {symbol: '🚒', name: 'כבאית'},
  {symbol: '🚑', name: 'אמבולנס'},
  {symbol: '🚜', name: 'טרקטור'},
  {symbol: '🛴', name: 'קורקינט'},
  {symbol: '🚇', name: 'רכבת תחתית'},
  {symbol: '⛽', name: 'תדלוק'},

  // ─── ספורט ──────────────────────────────────────
  {symbol: '⚽', name: 'כדורגל'},
  {symbol: '🏀', name: 'כדורסל'},
  {symbol: '🎾', name: 'טניס'},
  {symbol: '🏐', name: 'כדורעף'},
  {symbol: '🏓', name: 'פינג פונג'},
  {symbol: '🥊', name: 'איגרוף'},
  {symbol: '🏊', name: 'שחייה'},
  {symbol: '🎿', name: 'סקי'},
  {symbol: '🏄', name: 'גלישה'},
  {symbol: '🤸', name: 'התעמלות'},
  {symbol: '🏋️', name: 'הרמת משקולות'},
  {symbol: '🎯', name: 'מטרה'},
  {symbol: '🏹', name: 'קשת וחץ'},

  // ─── מוזיקה ─────────────────────────────────────
  {symbol: '🎸', name: 'גיטרה'},
  {symbol: '🎹', name: 'פסנתר'},
  {symbol: '🥁', name: 'תוף'},
  {symbol: '🎺', name: 'חצוצרה'},
  {symbol: '🎻', name: 'כינור'},
  {symbol: '🎵', name: 'תו מוזיקלי'},
  {symbol: '🎤', name: 'מיקרופון'},

  // ─── אוכל ───────────────────────────────────────
  {symbol: '🍕', name: 'פיצה'},
  {symbol: '🍔', name: 'המבורגר'},
  {symbol: '🌮', name: 'טאקו'},
  {symbol: '🍟', name: 'צ׳יפס'},
  {symbol: '🍩', name: 'סופגניה'},
  {symbol: '🎂', name: 'עוגה'},
  {symbol: '🍦', name: 'גלידה'},
  {symbol: '🍪', name: 'עוגיה'},
  {symbol: '🧁', name: 'קאפקייק'},
  {symbol: '🥐', name: 'קרואסון'},
  {symbol: '🍿', name: 'פופקורן'},
  {symbol: '🥚', name: 'ביצה'},
  {symbol: '🧀', name: 'גבינה'},
  {symbol: '🍞', name: 'לחם'},
  {symbol: '🥤', name: 'שתייה'},
  {symbol: '☕', name: 'קפה'},
  {symbol: '🍫', name: 'שוקולד'},
  {symbol: '🍭', name: 'סוכריה'},
  {symbol: '🥗', name: 'סלט'},
  {symbol: '🍳', name: 'חביתה'},

  // ─── חפצים וכלים ────────────────────────────────
  {symbol: '📚', name: 'ספרים'},
  {symbol: '✏️', name: 'עיפרון'},
  {symbol: '🏠', name: 'בית'},
  {symbol: '🔑', name: 'מפתח'},
  {symbol: '📱', name: 'טלפון'},
  {symbol: '💻', name: 'מחשב'},
  {symbol: '⌚', name: 'שעון'},
  {symbol: '📷', name: 'מצלמה'},
  {symbol: '🔔', name: 'פעמון'},
  {symbol: '✂️', name: 'מספריים'},
  {symbol: '🖊️', name: 'עט'},
  {symbol: '📏', name: 'סרגל'},
  {symbol: '🗺️', name: 'מפה'},
  {symbol: '🧲', name: 'מגנט'},
  {symbol: '💡', name: 'נורה'},
  {symbol: '🔦', name: 'פנס'},
  {symbol: '🧹', name: 'מטאטא'},
  {symbol: '🪣', name: 'דלי'},
  {symbol: '🛒', name: 'עגלה'},
  {symbol: '🎒', name: 'תיק גב'},
  {symbol: '👓', name: 'משקפיים'},
  {symbol: '🧊', name: 'קרח'},
  {symbol: '🕯️', name: 'נר'},
  {symbol: '🪜', name: 'סולם'},
  {symbol: '🧸', name: 'דובי'},

  // ─── מקומות ומבנים ──────────────────────────────
  {symbol: '🏫', name: 'בית ספר'},
  {symbol: '🏥', name: 'בית חולים'},
  {symbol: '🏰', name: 'טירה'},
  {symbol: '⛪', name: 'כנסייה'},
  {symbol: '🕌', name: 'מסגד'},
  {symbol: '🏟️', name: 'אצטדיון'},
  {symbol: '🎪', name: 'קרקס'},
  {symbol: '🏖️', name: 'חוף'},
  {symbol: '🌃', name: 'עיר'},
  {symbol: '🌾', name: 'שדה'},
  {symbol: '🏕️', name: 'מחנה'},

  // ─── גוף ותחושות ────────────────────────────────
  {symbol: '👁️', name: 'עין'},
  {symbol: '👂', name: 'אוזן'},
  {symbol: '👃', name: 'אף'},
  {symbol: '👄', name: 'פה'},
  {symbol: '🦷', name: 'שן'},
  {symbol: '💪', name: 'שריר'},
  {symbol: '🦶', name: 'רגל'},
  {symbol: '✋', name: 'יד'},
  {symbol: '🧠', name: 'מוח'},
  {symbol: '❤️', name: 'לב'},

  // ─── ביגוד ──────────────────────────────────────
  {symbol: '👕', name: 'חולצה'},
  {symbol: '👖', name: 'מכנסיים'},
  {symbol: '👗', name: 'שמלה'},
  {symbol: '🧥', name: 'מעיל'},
  {symbol: '👟', name: 'נעל'},
  {symbol: '🎩', name: 'כובע'},
  {symbol: '🧤', name: 'כפפה'},
  {symbol: '🧣', name: 'צעיף'},
  {symbol: '👜', name: 'תיק'},
  {symbol: '🧦', name: 'גרב'},

  // ─── מקצועות ────────────────────────────────────
  {symbol: '👨‍⚕️', name: 'רופא'},
  {symbol: '👩‍🏫', name: 'מורה'},
  {symbol: '👨‍🍳', name: 'טבח'},
  {symbol: '👩‍🚒', name: 'כבאי'},
  {symbol: '👨‍✈️', name: 'טייס'},
  {symbol: '👩‍🔬', name: 'מדענית'},
  {symbol: '👨‍🌾', name: 'חקלאי'},
  {symbol: '👩‍🎨', name: 'צייר'},
  {symbol: '🧑‍🚀', name: 'אסטרונאוט'},
  {symbol: '💂', name: 'שומר'},
];

var symbolNameAllLetters = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר',
  'ש', 'ת', 'ך', 'ם', 'ן', 'ף', 'ץ'
];

var symbolNameQuestionsPerRound = 10;
var symbolNameExtraLetters = 4;

// ─── Helper: split a Hebrew string into characters ──────────────────

function mbStrSplit(str) {
  var result = [];
  for (var iter = str[Symbol.iterator](), ch; !(ch = iter.next()).done; ) {
    result.push(ch.value);
  }
  return result;
}

// ─── Helper: Fisher-Yates shuffle ───────────────────────────────────

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// ─── Build a single question (port of PHP buildQuestion) ────────────

function symbolNameBuildQuestion(item) {
  var name = item.name;
  var correctLetters = mbStrSplit(name);
  var letterCount = correctLetters.length;

  // Collect unique non-space letters used in the word
  var usedNonSpace = {};
  for (var i = 0; i < correctLetters.length; i++) {
    if (correctLetters[i] !== ' ') {
      usedNonSpace[correctLetters[i]] = true;
    }
  }

  // Distractor letters not in the word
  var available = [];
  for (var i = 0; i < symbolNameAllLetters.length; i++) {
    if (!usedNonSpace[symbolNameAllLetters[i]]) {
      available.push(symbolNameAllLetters[i]);
    }
  }
  shuffleArray(available);
  var distractors = available.slice(0, symbolNameExtraLetters);

  // Pool = correct letters (without spaces) + distractors
  var correctNonSpace = [];
  for (var i = 0; i < correctLetters.length; i++) {
    if (correctLetters[i] !== ' ') {
      correctNonSpace.push(correctLetters[i]);
    }
  }
  var letterPool = correctNonSpace.concat(distractors);
  shuffleArray(letterPool);

  return {
    symbol: item.symbol,
    correctWord: name,
    correctLetters: correctLetters,
    wordLength: letterCount,
    letterPool: letterPool,
    hasSpaces: correctLetters.indexOf(' ') !== -1,
  };
}

// ─── Create a new quiz round (port of PHP newGame) ──────────────────

function symbolNameNewGame() {
  var pool = symbolNameSymbols.slice();
  shuffleArray(pool);
  var selected = pool.slice(0, symbolNameQuestionsPerRound);

  var questions = [];
  for (var i = 0; i < selected.length; i++) {
    questions.push(symbolNameBuildQuestion(selected[i]));
  }

  return {
    game: 'symbol-name',
    title: 'איך כותבים? – בנו את המילה',
    questions: questions,
    currentQuestion: 0,
    score: 0,
    totalQuestions: symbolNameQuestionsPerRound,
    mistakes: 0,
    finished: false,
  };
}

// ─── Check a letter pick (port of PHP checkLetter) ──────────────────

function symbolNameCheckLetter(correctLetters, position, pickedLetter) {
  var expected = position < correctLetters.length ? correctLetters[position] : null;
  return {
    isCorrect: (pickedLetter === expected),
    expectedLetter: expected,
    pickedLetter: pickedLetter,
    position: position,
  };
}

// ═══════════════════════════════════════════════════════════════════
// UI Logic
// ═══════════════════════════════════════════════════════════════════

function startNewQuiz() {
  isLocked = true;
  currentPosition = 0;
  totalMistakes = 0;
  wordsCompleted = 0;

  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("word-success").style.display = "none";
  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("letter-feedback").style.display = "none";

  quizState = symbolNameNewGame();

  document.getElementById("quiz-title").textContent = quizState.title;
  updateQuizStats();
  renderWord();
  isLocked = false;
}

function updateQuizStats() {
  document.getElementById("quiz-score").textContent =
    "ניקוד: " + wordsCompleted + "/" + quizState.totalQuestions;
  document.getElementById("quiz-progress").textContent =
    "מילה: " + (quizState.currentQuestion + 1) + "/" + quizState.totalQuestions;
  document.getElementById("quiz-mistakes").textContent =
    "טעויות: " + totalMistakes;
}

function renderWord() {
  var q = quizState.questions[quizState.currentQuestion];
  currentPosition = 0;

  // Symbol
  var symbolEl = document.getElementById("quiz-symbol");
  symbolEl.textContent = q.symbol;
  symbolEl.style.animation = "none";
  symbolEl.offsetHeight;
  symbolEl.style.animation = "bounceIn 0.5s ease";

  // Hide feedback and success
  document.getElementById("letter-feedback").style.display = "none";
  document.getElementById("word-success").style.display = "none";
  document.getElementById("quiz-content").style.display = "block";

  // Build word slots
  var slotsContainer = document.getElementById("word-slots");
  slotsContainer.innerHTML = "";

  for (var i = 0; i < q.wordLength; i++) {
    var slot = document.createElement("div");
    slot.className = "word-slot";
    slot.dataset.position = i;

    // If this position is a space, pre-fill it
    if (q.correctLetters[i] === " ") {
      slot.classList.add("space-slot");
      slot.textContent = " ";
    }

    slotsContainer.appendChild(slot);
  }

  // Skip leading spaces for currentPosition
  skipSpaces(q);

  // Mark current slot
  var allSlots = document.querySelectorAll(".word-slot");
  if (currentPosition < q.wordLength) {
    allSlots[currentPosition].classList.add("current");
  }

  // Build letter pool
  var poolContainer = document.getElementById("letter-pool");
  poolContainer.innerHTML = "";

  q.letterPool.forEach(function (letter, idx) {
    var btn = document.createElement("button");
    btn.className = "pool-letter";
    btn.textContent = letter;
    btn.dataset.index = idx;
    btn.dataset.letter = letter;

    btn.addEventListener("click", function () {
      onLetterPick(btn);
    });

    poolContainer.appendChild(btn);
  });

  updateQuizStats();
}

function skipSpaces(q) {
  while (
    currentPosition < q.wordLength &&
    q.correctLetters[currentPosition] === " "
  ) {
    var allSlots = document.querySelectorAll(".word-slot");
    allSlots[currentPosition].classList.add("filled");
    allSlots[currentPosition].textContent = " ";
    currentPosition++;
  }
}

async function onLetterPick(btn) {
  if (isLocked) return;
  if (btn.classList.contains("used")) return;

  isLocked = true;

  var pickedLetter = btn.dataset.letter;
  var q = quizState.questions[quizState.currentQuestion];

  var result = symbolNameCheckLetter(q.correctLetters, currentPosition, pickedLetter);

  if (result.isCorrect) {
    // Correct!
    btn.classList.add("used");

    var slots = document.querySelectorAll(".word-slot");
    slots[currentPosition].textContent = pickedLetter;
    slots[currentPosition].classList.remove("current");
    slots[currentPosition].classList.add("filled");

    document.getElementById("letter-feedback").style.display = "none";

    currentPosition++;

    // Skip any spaces
    skipSpaces(q);

    // Check if word is complete
    if (currentPosition >= q.wordLength) {
      wordsCompleted++;

      slots.forEach(function (s) {
        s.classList.add("complete");
      });

      await sleep(400);

      document.getElementById("word-success-text").textContent =
        "✅ כל הכבוד! המילה היא: " + q.correctWord;

      var nextQ = quizState.currentQuestion + 1;
      if (nextQ >= quizState.totalQuestions) {
        document.getElementById("next-word-btn").textContent =
          "צפייה בתוצאות";
      } else {
        document.getElementById("next-word-btn").textContent = "המילה הבאה ←";
      }

      document.getElementById("word-success").style.display = "block";
      updateQuizStats();
    } else {
      slots[currentPosition].classList.add("current");
    }

    isLocked = false;
  } else {
    // Wrong!
    totalMistakes++;
    updateQuizStats();

    btn.classList.add("wrong-shake");

    document.getElementById("letter-feedback").textContent =
      "❌ לא נכון, נסו שוב!";
    document.getElementById("letter-feedback").className = "wrong";
    document.getElementById("letter-feedback").style.display = "block";

    await sleep(500);
    btn.classList.remove("wrong-shake");

    isLocked = false;
  }
}

function goToNextWord() {
  var nextQ = quizState.currentQuestion + 1;

  if (nextQ >= quizState.totalQuestions) {
    showQuizResult();
    return;
  }

  quizState.currentQuestion = nextQ;
  renderWord();
}

function showQuizResult() {
  document.getElementById("quiz-content").style.display = "none";
  document.getElementById("word-success").style.display = "none";

  var resultDiv = document.getElementById("quiz-result");
  var completed = wordsCompleted;
  var total = quizState.totalQuestions;
  var mistakes = totalMistakes;

  var titleEl = document.getElementById("quiz-result-title");
  var textEl = document.getElementById("quiz-result-text");

  resultDiv.classList.remove("great", "ok", "needs-work");

  if (mistakes === 0) {
    titleEl.textContent = "🌟 מושלם!";
    textEl.textContent = "השלמתם " + completed + " מילים בלי אף טעות!";
    resultDiv.classList.add("great");
  } else if (mistakes <= total) {
    titleEl.textContent = "👏 כל הכבוד!";
    textEl.textContent =
      "השלמתם " + completed + " מילים עם " + mistakes + " טעויות בלבד.";
    resultDiv.classList.add("great");
  } else if (mistakes <= total * 2) {
    titleEl.textContent = "👍 לא רע!";
    textEl.textContent =
      "השלמתם " +
      completed +
      " מילים עם " +
      mistakes +
      " טעויות. נסו שוב לשיפור!";
    resultDiv.classList.add("ok");
  } else {
    titleEl.textContent = "💪 אפשר להשתפר!";
    textEl.textContent =
      "השלמתם " +
      completed +
      " מילים עם " +
      mistakes +
      " טעויות. תרגול עושה את ההבדל!";
    resultDiv.classList.add("needs-work");
  }

  resultDiv.style.display = "block";
}
