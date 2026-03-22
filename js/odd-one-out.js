// ═══════════════════════════════════════════════════════════════════
// ODD ONE OUT — יוצא דופן (Find the one that doesn't belong)
// Full frontend logic (no API calls)
// ═══════════════════════════════════════════════════════════════════

var oddGameState = null;
var oddQuestionsPerRound = 10;

// ─── Categories with emoji items ────────────────────────────────────

var oddCategories = [
  {
    name: 'פירות',
    items: ['🍎', '🍌', '🍇', '🍊', '🍋', '🍉', '🍓', '🍒', '🍑', '🥝', '🍍', '🥭', '🫐', '🥥', '🍈'],
  },
  {
    name: 'ירקות',
    items: ['🥕', '🥒', '🍅', '🌽', '🥦', '🧅', '🧄', '🥬', '🌶️', '🥔', '🍆', '🫑', '🥜'],
  },
  {
    name: 'חיות',
    items: ['🐶', '🐱', '🐭', '🐰', '🐻', '🐸', '🐔', '🐴', '🐷', '🐟', '🦁', '🐘', '🦋', '🐢', '🐍'],
  },
  {
    name: 'כלי תחבורה',
    items: ['🚗', '✈️', '🚀', '🚲', '🚂', '🚁', '⛵', '🚌', '🚕', '🚒', '🚑', '🚜', '🛴'],
  },
  {
    name: 'ספורט',
    items: ['⚽', '🏀', '🎾', '🏐', '🏓', '🥊', '🏊', '🎿', '🏄', '🤸', '🏋️', '🎯', '🏹'],
  },
  {
    name: 'מוזיקה',
    items: ['🎸', '🎹', '🥁', '🎺', '🎻', '🎵', '🎤'],
  },
  {
    name: 'אוכל',
    items: ['🍕', '🍔', '🌮', '🍟', '🍩', '🎂', '🍦', '🍪', '🧁', '🥐', '🍿', '🥚', '🧀', '🍞', '🍫', '🍭'],
  },
  {
    name: 'טבע ומזג אוויר',
    items: ['🌞', '🌙', '⭐', '🌈', '☁️', '🔥', '💧', '❄️', '🌊', '🌺', '🌳', '⛰️', '🌵', '🍂', '🍄'],
  },
  {
    name: 'חפצים',
    items: ['📚', '✏️', '🏠', '🔑', '📱', '💻', '⌚', '📷', '🔔', '✂️', '🖊️', '💡', '🔦', '🧸'],
  },
  {
    name: 'ביגוד',
    items: ['👕', '👖', '👗', '🧥', '👟', '🎩', '🧤', '🧣', '👜', '🧦'],
  },
  {
    name: 'גוף',
    items: ['👁️', '👂', '👃', '👄', '🦷', '💪', '🦶', '✋', '🧠', '❤️'],
  },
  {
    name: 'מקומות',
    items: ['🏫', '🏥', '🏰', '⛪', '🕌', '🏟️', '🎪', '🏖️', '🌃', '🏕️'],
  },
];

// ─── Shuffle helper ─────────────────────────────────────────────────

function oddShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// ─── Generate a single question ─────────────────────────────────────

function oddGenerateQuestion(usedPairs) {
  // Pick two different categories
  var catIndices = [];
  for (var i = 0; i < oddCategories.length; i++) catIndices.push(i);
  oddShuffle(catIndices);

  var mainCatIdx = catIndices[0];
  var oddCatIdx = catIndices[1];

  // Avoid repeating the same pair too often
  var pairKey = mainCatIdx + '-' + oddCatIdx;
  var attempts = 0;
  while (usedPairs[pairKey] && attempts < 20) {
    oddShuffle(catIndices);
    mainCatIdx = catIndices[0];
    oddCatIdx = catIndices[1];
    pairKey = mainCatIdx + '-' + oddCatIdx;
    attempts++;
  }
  usedPairs[pairKey] = true;

  var mainCat = oddCategories[mainCatIdx];
  var oddCat = oddCategories[oddCatIdx];

  // Pick 3 from main category
  var mainItems = mainCat.items.slice();
  oddShuffle(mainItems);
  var threeMain = mainItems.slice(0, 3);

  // Pick 1 from odd category
  var oddItems = oddCat.items.slice();
  oddShuffle(oddItems);
  var oneOdd = oddItems[0];

  // Combine and shuffle
  var allFour = threeMain.concat([oneOdd]);
  oddShuffle(allFour);

  var oddIndex = allFour.indexOf(oneOdd);

  return {
    items: allFour,
    oddIndex: oddIndex,
    oddItem: oneOdd,
    mainCategory: mainCat.name,
    oddCategory: oddCat.name,
    hint: 'שלושה מהם ' + mainCat.name + ', מי לא שייך?',
  };
}

// ─── New Game ───────────────────────────────────────────────────────

function oddNewGame() {
  var questions = [];
  var usedPairs = {};

  for (var i = 0; i < oddQuestionsPerRound; i++) {
    questions.push(oddGenerateQuestion(usedPairs));
  }

  return {
    game: 'odd-one-out',
    title: 'יוצא דופן – מי לא שייך?',
    questions: questions,
    currentQuestion: 0,
    totalQuestions: oddQuestionsPerRound,
    correctCount: 0,
    mistakeCount: 0,
    finished: false,
  };
}

// ═══════════════════════════════════════════════════════════════════
// UI Logic
// ═══════════════════════════════════════════════════════════════════

function startOddGame() {
  isLocked = false;
  oddGameState = oddNewGame();

  document.getElementById("odd-result").style.display = "none";
  document.getElementById("odd-content").style.display = "block";
  document.getElementById("odd-title").textContent = oddGameState.title;

  updateOddStats();
  renderOddQuestion();
}

function updateOddStats() {
  document.getElementById("odd-score").textContent =
    "נכון: " + oddGameState.correctCount + "/" + oddGameState.totalQuestions;
  document.getElementById("odd-progress").textContent =
    "שאלה: " + (oddGameState.currentQuestion + 1) + "/" + oddGameState.totalQuestions;
  document.getElementById("odd-mistakes").textContent =
    "טעויות: " + oddGameState.mistakeCount;
}

function renderOddQuestion() {
  var q = oddGameState.questions[oddGameState.currentQuestion];

  // Show hint
  var hintEl = document.getElementById("odd-hint");
  hintEl.textContent = q.hint;
  hintEl.style.animation = "none";
  hintEl.offsetHeight;
  hintEl.style.animation = "fadeIn 0.4s ease";

  // Hide feedback
  document.getElementById("odd-feedback").style.display = "none";

  // Build image choices
  var choicesContainer = document.getElementById("odd-choices");
  choicesContainer.innerHTML = "";

  q.items.forEach(function (item, idx) {
    var btn = document.createElement("button");
    btn.className = "odd-choice";
    btn.textContent = item;
    btn.dataset.index = idx;

    btn.addEventListener("click", function () {
      onOddAnswer(btn, idx, q.oddIndex, q);
    });

    choicesContainer.appendChild(btn);
  });

  updateOddStats();
}

async function onOddAnswer(btn, pickedIdx, correctIdx, q) {
  if (isLocked) return;
  isLocked = true;

  var allBtns = document.querySelectorAll(".odd-choice");

  if (pickedIdx === correctIdx) {
    // Correct!
    oddGameState.correctCount++;
    btn.classList.add("odd-correct");

    // Highlight the 3 that belong
    allBtns.forEach(function (b, i) {
      if (i !== correctIdx) {
        b.classList.add("odd-belongs");
      }
      b.disabled = true;
    });

    document.getElementById("odd-feedback").textContent =
      "✅ נכון! " + q.oddItem + " (" + q.oddCategory + ") לא שייך ל" + q.mainCategory;
    document.getElementById("odd-feedback").className = "odd-feedback-correct";
    document.getElementById("odd-feedback").style.display = "block";

    await sleep(1200);

    var nextQ = oddGameState.currentQuestion + 1;
    if (nextQ >= oddGameState.totalQuestions) {
      showOddResult();
    } else {
      oddGameState.currentQuestion = nextQ;
      renderOddQuestion();
    }

    isLocked = false;
  } else {
    // Wrong
    oddGameState.mistakeCount++;
    updateOddStats();

    btn.classList.add("odd-wrong");
    btn.disabled = true;

    document.getElementById("odd-feedback").textContent = "❌ לא נכון, נסו שוב!";
    document.getElementById("odd-feedback").className = "odd-feedback-wrong";
    document.getElementById("odd-feedback").style.display = "block";

    await sleep(400);
    isLocked = false;
  }
}

function showOddResult() {
  document.getElementById("odd-content").style.display = "none";

  var resultDiv = document.getElementById("odd-result");
  var correct = oddGameState.correctCount;
  var total = oddGameState.totalQuestions;
  var mistakes = oddGameState.mistakeCount;

  var titleEl = document.getElementById("odd-result-title");
  var textEl = document.getElementById("odd-result-text");

  resultDiv.classList.remove("great", "ok", "needs-work");

  if (mistakes === 0) {
    titleEl.textContent = "🌟 מושלם!";
    textEl.textContent = "מצאתם את כל יוצאי הדופן בלי אף טעות!";
    resultDiv.classList.add("great");
  } else if (mistakes <= total) {
    titleEl.textContent = "👏 כל הכבוד!";
    textEl.textContent =
      "מצאתם " + correct + " יוצאי דופן עם " + mistakes + " טעויות בלבד.";
    resultDiv.classList.add("great");
  } else if (mistakes <= total * 2) {
    titleEl.textContent = "👍 לא רע!";
    textEl.textContent =
      "מצאתם " + correct + " יוצאי דופן עם " + mistakes + " טעויות. נסו שוב לשיפור!";
    resultDiv.classList.add("ok");
  } else {
    titleEl.textContent = "💪 אפשר להשתפר!";
    textEl.textContent =
      "מצאתם " + correct + " יוצאי דופן עם " + mistakes + " טעויות. תרגול עושה את ההבדל!";
    resultDiv.classList.add("needs-work");
  }

  resultDiv.style.display = "block";
}
