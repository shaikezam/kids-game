// ═══════════════════════════════════════════════════════════════════
// MATH GAME — Plus & Minus (ועוד ופחות)
// Generic: works with any maxNumber (10, 20, etc.)
// Full frontend logic (no API calls)
// ═══════════════════════════════════════════════════════════════════

var mathGameState = null;
var mathQuestionsPerRound = 10;

// ─── Game Logic ─────────────────────────────────────────────────────

function mathGameGenerateQuestion(maxNumber) {
  var isAddition = Math.random() < 0.5;
  var a, b, answer;

  if (isAddition) {
    answer = Math.floor(Math.random() * (maxNumber + 1));
    a = Math.floor(Math.random() * (answer + 1));
    b = answer - a;
    return {
      a: a,
      b: b,
      operator: '+',
      answer: answer,
      text: a + ' + ' + b + ' = ?',
    };
  } else {
    a = Math.floor(Math.random() * (maxNumber + 1));
    b = Math.floor(Math.random() * (a + 1));
    answer = a - b;
    return {
      a: a,
      b: b,
      operator: '-',
      answer: answer,
      text: a + ' - ' + b + ' = ?',
    };
  }
}

function mathGameGenerateChoices(correctAnswer, maxNumber) {
  var choices = [correctAnswer];

  while (choices.length < 4) {
    var wrong = Math.floor(Math.random() * (maxNumber + 1));
    if (choices.indexOf(wrong) === -1) {
      choices.push(wrong);
    }
  }

  for (var i = choices.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = choices[i];
    choices[i] = choices[j];
    choices[j] = tmp;
  }

  return choices;
}

function mathGameNewGame(maxNumber) {
  var questions = [];
  for (var i = 0; i < mathQuestionsPerRound; i++) {
    var q = mathGameGenerateQuestion(maxNumber);
    q.choices = mathGameGenerateChoices(q.answer, maxNumber);
    questions.push(q);
  }

  var title = 'ועוד ופחות עד ' + maxNumber;

  return {
    game: 'math',
    title: title,
    maxNumber: maxNumber,
    questions: questions,
    currentQuestion: 0,
    totalQuestions: mathQuestionsPerRound,
    correctCount: 0,
    mistakeCount: 0,
    finished: false,
  };
}

// ─── UI Entry Points ────────────────────────────────────────────────

function startMathGame() {
  isLocked = false;

  var maxNumber = 10;
  if (currentGame === 'math-20') maxNumber = 20;

  mathGameState = mathGameNewGame(maxNumber);

  document.getElementById("math-result").style.display = "none";
  document.getElementById("math-content").style.display = "block";
  document.getElementById("math-title").textContent = mathGameState.title;

  updateMathStats();
  renderMathQuestion();
}

function updateMathStats() {
  document.getElementById("math-score").textContent =
    "נכון: " + mathGameState.correctCount + "/" + mathGameState.totalQuestions;
  document.getElementById("math-progress").textContent =
    "שאלה: " + (mathGameState.currentQuestion + 1) + "/" + mathGameState.totalQuestions;
  document.getElementById("math-mistakes").textContent =
    "טעויות: " + mathGameState.mistakeCount;
}

function renderMathQuestion() {
  var q = mathGameState.questions[mathGameState.currentQuestion];

  var equationEl = document.getElementById("math-equation");
  equationEl.textContent = q.text;
  equationEl.style.animation = "none";
  equationEl.offsetHeight;
  equationEl.style.animation = "bounceIn 0.5s ease";

  document.getElementById("math-feedback").style.display = "none";

  var choicesContainer = document.getElementById("math-choices");
  choicesContainer.innerHTML = "";

  q.choices.forEach(function (choice) {
    var btn = document.createElement("button");
    btn.className = "math-choice";
    btn.textContent = choice;
    btn.dataset.value = choice;

    btn.addEventListener("click", function () {
      onMathAnswer(btn, choice, q.answer);
    });

    choicesContainer.appendChild(btn);
  });

  updateMathStats();
}

async function onMathAnswer(btn, picked, correct) {
  if (isLocked) return;
  isLocked = true;

  var allBtns = document.querySelectorAll(".math-choice");

  if (picked === correct) {
    mathGameState.correctCount++;
    btn.classList.add("math-correct");

    document.getElementById("math-feedback").textContent = "✅ נכון!";
    document.getElementById("math-feedback").className = "math-feedback-correct";
    document.getElementById("math-feedback").style.display = "block";

    allBtns.forEach(function (b) { b.disabled = true; });

    await sleep(800);

    var nextQ = mathGameState.currentQuestion + 1;
    if (nextQ >= mathGameState.totalQuestions) {
      showMathResult();
    } else {
      mathGameState.currentQuestion = nextQ;
      renderMathQuestion();
    }

    isLocked = false;
  } else {
    mathGameState.mistakeCount++;
    updateMathStats();

    btn.classList.add("math-wrong");
    btn.disabled = true;

    document.getElementById("math-feedback").textContent = "❌ לא נכון, נסו שוב!";
    document.getElementById("math-feedback").className = "math-feedback-wrong";
    document.getElementById("math-feedback").style.display = "block";

    await sleep(400);
    isLocked = false;
  }
}

function showMathResult() {
  document.getElementById("math-content").style.display = "none";

  var resultDiv = document.getElementById("math-result");
  var correct = mathGameState.correctCount;
  var total = mathGameState.totalQuestions;
  var mistakes = mathGameState.mistakeCount;

  var titleEl = document.getElementById("math-result-title");
  var textEl = document.getElementById("math-result-text");

  resultDiv.classList.remove("great", "ok", "needs-work");

  if (mistakes === 0) {
    titleEl.textContent = "🌟 מושלם!";
    textEl.textContent = "עניתם נכון על " + correct + " שאלות בלי אף טעות!";
    resultDiv.classList.add("great");
  } else if (mistakes <= total) {
    titleEl.textContent = "👏 כל הכבוד!";
    textEl.textContent =
      "עניתם נכון על " + correct + " שאלות עם " + mistakes + " טעויות בלבד.";
    resultDiv.classList.add("great");
  } else if (mistakes <= total * 2) {
    titleEl.textContent = "👍 לא רע!";
    textEl.textContent =
      "עניתם נכון על " + correct + " שאלות עם " + mistakes + " טעויות. נסו שוב לשיפור!";
    resultDiv.classList.add("ok");
  } else {
    titleEl.textContent = "💪 אפשר להשתפר!";
    textEl.textContent =
      "עניתם נכון על " + correct + " שאלות עם " + mistakes + " טעויות. תרגול עושה את ההבדל!";
    resultDiv.classList.add("needs-work");
  }

  resultDiv.style.display = "block";
}
