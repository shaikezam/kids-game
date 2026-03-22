// ─── Shared State ──────────────────────────────────────────────────
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

  // Math game buttons
  document.getElementById("math-back-btn").addEventListener("click", goBack);
  document
    .getElementById("math-new-btn")
    .addEventListener("click", startMathGame);
  document
    .getElementById("math-play-again-btn")
    .addEventListener("click", startMathGame);

  // Odd one out game buttons
  document.getElementById("odd-back-btn").addEventListener("click", goBack);
  document
    .getElementById("odd-new-btn")
    .addEventListener("click", startOddGame);
  document
    .getElementById("odd-play-again-btn")
    .addEventListener("click", startOddGame);
});

// ─── Game Selection ─────────────────────────────────────────────────

function selectGame(game) {
  currentGame = game;

  document.querySelectorAll(".game-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.game === game);
  });

  document.getElementById("game-selector").style.display = "none";

  // Hide all areas first
  document.getElementById("game-area").style.display = "none";
  document.getElementById("quiz-area").style.display = "none";
  document.getElementById("math-area").style.display = "none";
  document.getElementById("odd-area").style.display = "none";

  if (game === "symbol-name") {
    document.getElementById("quiz-area").style.display = "block";
    startNewQuiz();
  } else if (game === "math-10" || game === "math-20") {
    document.getElementById("math-area").style.display = "block";
    startMathGame();
  } else if (game === "odd-one-out") {
    document.getElementById("odd-area").style.display = "block";
    startOddGame();
  } else {
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
  document.getElementById("math-area").style.display = "none";
  document.getElementById("odd-area").style.display = "none";
  document.getElementById("game-selector").style.display = "flex";
  document.getElementById("win-message").style.display = "none";
  document.getElementById("board").innerHTML = "";

  document.querySelectorAll(".game-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
}

// ─── Dispatchers ────────────────────────────────────────────────────

function startNewGame() {
  if (!currentGame || currentGame === "symbol-name") return;

  if (currentGame === "memory-numbers") {
    startMemoryNumbersGame();
  } else if (currentGame === "memory-hebrew") {
    startMemoryHebrewGame();
  }
}

function onCardClick(index) {
  if (currentGame === "memory-numbers") {
    onMemoryNumbersCardClick(index);
  } else if (currentGame === "memory-hebrew") {
    onMemoryHebrewCardClick(index);
  }
}

// ─── Shared Memory Game Rendering ───────────────────────────────────

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

function showMemoryWin() {
  document.getElementById("win-stats").textContent =
    "סיימתם את המשחק ב-" + gameState.moves + " מהלכים!";
  document.getElementById("win-message").style.display = "block";
}

// ─── Utility ────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
