// ─── State ──────────────────────────────────────────────────────────
var currentGame = null;
var gameState = null;
var quizState = null;
var currentPosition = 0;
var totalMistakes = 0;
var wordsCompleted = 0;
var isLocked = false;

// ─── Boot ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".game-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectGame(btn.dataset.game);
    });
  });

  // Memory game buttons
  document.getElementById("back-btn").addEventListener("click", goBack);
  document
    .getElementById("new-game-btn")
    .addEventListener("click", startNewGame);
  document
    .getElementById("play-again-btn")
    .addEventListener("click", startNewGame);

  // Quiz game buttons
  document.getElementById("quiz-back-btn").addEventListener("click", goBack);
  document
    .getElementById("quiz-new-btn")
    .addEventListener("click", startNewQuiz);
  document
    .getElementById("next-word-btn")
    .addEventListener("click", goToNextWord);
  document
    .getElementById("quiz-play-again-btn")
    .addEventListener("click", startNewQuiz);
});

// ─── Game Selection ─────────────────────────────────────────────────

function selectGame(game) {
  currentGame = game;

  document.querySelectorAll(".game-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.game === game);
  });

  document.getElementById("game-selector").style.display = "none";

  if (game === "symbol-name") {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("quiz-area").style.display = "block";
    startNewQuiz();
  } else {
    document.getElementById("quiz-area").style.display = "none";
    document.getElementById("game-area").style.display = "block";
    startNewGame();
  }
}

function goBack() {
  currentGame = null;
  gameState = null;
  quizState = null;
  isLocked = false;

  document.getElementById("game-area").style.display = "none";
  document.getElementById("quiz-area").style.display = "none";
  document.getElementById("game-selector").style.display = "flex";
  document.getElementById("win-message").style.display = "none";
  document.getElementById("board").innerHTML = "";

  document.querySelectorAll(".game-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
}

// ═══════════════════════════════════════════════════════════════════
// MEMORY GAMES
// ═══════════════════════════════════════════════════════════════════

async function startNewGame() {
  if (!currentGame || currentGame === "symbol-name") return;

  isLocked = true;
  document.getElementById("win-message").style.display = "none";

  var apiBase =
    currentGame === "memory-numbers"
      ? "/api/memory-numbers"
      : "/api/memory-hebrew";

  try {
    var resp = await fetch(apiBase + "/new");
    gameState = await resp.json();
    renderBoard();
    updateMemoryStats();
    isLocked = false;
  } catch (err) {
    console.error("שגיאה בטעינת משחק:", err);
    isLocked = false;
  }
}

function renderBoard() {
  var board = document.getElementById("board");
  board.innerHTML = "";
  board.className = "";
  board.classList.add("cols-" + gameState.columns);

  document.getElementById("game-title").textContent = gameState.title;

  var isHebrew = currentGame === "memory-hebrew";

  gameState.board.forEach(function (symbol, index) {
    var card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    if (gameState.revealed[index]) card.classList.add("flipped");
    if (gameState.matched[index]) card.classList.add("matched");

    var inner = document.createElement("div");
    inner.className = "card-inner";

    var front = document.createElement("div");
    front.className = "card-front";

    var back = document.createElement("div");
    back.className = "card-back";
    if (isHebrew) back.classList.add("hebrew");
    back.textContent = symbol;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", function () {
      onCardClick(index);
    });

    board.appendChild(card);
  });
}

function updateMemoryStats() {
  document.getElementById("moves-display").textContent =
    "מהלכים: " + gameState.moves;
  document.getElementById("pairs-display").textContent =
    "זוגות: " + gameState.matchedPairs + "/" + gameState.totalPairs;
}

async function onCardClick(index) {
  if (isLocked) return;
  if (gameState.matched[index] || gameState.revealed[index]) return;

  isLocked = true;

  var apiBase =
    currentGame === "memory-numbers"
      ? "/api/memory-numbers"
      : "/api/memory-hebrew";

  try {
    var formData = new FormData();
    formData.append("board", JSON.stringify(gameState.board));
    formData.append("revealed", JSON.stringify(gameState.revealed));
    formData.append("matched", JSON.stringify(gameState.matched));
    formData.append("index", index);
    formData.append(
      "firstFlipIndex",
      gameState.firstFlipIndex !== null &&
        gameState.firstFlipIndex !== undefined
        ? gameState.firstFlipIndex
        : "",
    );
    formData.append("moves", gameState.moves);

    var resp = await fetch(apiBase + "/flip", {
      method: "POST",
      body: formData,
    });

    var result = await resp.json();

    gameState.revealed = result.revealed;
    gameState.matched = result.matched;
    gameState.firstFlipIndex = result.firstFlipIndex;
    gameState.moves = result.moves;
    gameState.matchedPairs = result.matchedPairs;

    var cards = document.querySelectorAll(".card");
    cards[index].classList.add("flipped");

    updateMemoryStats();

    if (result.isMatch !== null) {
      if (result.isMatch) {
        await sleep(300);
        gameState.matched.forEach(function (m, i) {
          if (m) cards[i].classList.add("matched");
        });

        if (result.won) {
          await sleep(500);
          showMemoryWin();
        }

        isLocked = false;
      } else {
        var i1 = result.unmatchedIndices[0];
        var i2 = result.unmatchedIndices[1];
        cards[i1].classList.add("mismatch");
        cards[i2].classList.add("mismatch");

        await sleep(800);

        cards[i1].classList.remove("flipped", "mismatch");
        cards[i2].classList.remove("flipped", "mismatch");

        gameState.revealed[i1] = false;
        gameState.revealed[i2] = false;

        isLocked = false;
      }
    } else {
      isLocked = false;
    }
  } catch (err) {
    console.error("שגיאה בהפיכת קלף:", err);
    isLocked = false;
  }
}

function showMemoryWin() {
  document.getElementById("win-stats").textContent =
    "סיימתם את המשחק ב-" + gameState.moves + " מהלכים!";
  document.getElementById("win-message").style.display = "block";
}

// ═══════════════════════════════════════════════════════════════════
// SYMBOL NAME QUIZ — WORD BUILDER
// ═══════════════════════════════════════════════════════════════════

async function startNewQuiz() {
  isLocked = true;
  currentPosition = 0;
  totalMistakes = 0;
  wordsCompleted = 0;

  document.getElementById("quiz-result").style.display = "none";
  document.getElementById("word-success").style.display = "none";
  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("letter-feedback").style.display = "none";

  try {
    var resp = await fetch("/api/symbol-name/new");
    quizState = await resp.json();

    document.getElementById("quiz-title").textContent = quizState.title;
    updateQuizStats();
    renderWord();
    isLocked = false;
  } catch (err) {
    console.error("שגיאה בטעינת חידון:", err);
    isLocked = false;
  }
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

  try {
    var formData = new FormData();
    formData.append("correctLetters", JSON.stringify(q.correctLetters));
    formData.append("position", currentPosition);
    formData.append("pickedLetter", pickedLetter);

    var resp = await fetch("/api/symbol-name/check", {
      method: "POST",
      body: formData,
    });

    var result = await resp.json();

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
  } catch (err) {
    console.error("שגיאה בבדיקת אות:", err);
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

// ─── Utility ────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
