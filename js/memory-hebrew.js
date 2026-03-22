// ═══════════════════════════════════════════════════════════════════
// MEMORY HEBREW GAME — Full frontend logic (no API calls)
// ═══════════════════════════════════════════════════════════════════

var memoryHebrewSymbols = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר',
  'ש', 'ת'
];
var memoryHebrewPairsCount = 10;

function memoryHebrewNewGame() {
  var selected = memoryHebrewSymbols.slice();
  // Shuffle
  for (var i = selected.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = selected[i];
    selected[i] = selected[j];
    selected[j] = tmp;
  }
  selected = selected.slice(0, memoryHebrewPairsCount);

  // Create pairs and shuffle
  var cards = selected.concat(selected);
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cards[i];
    cards[i] = cards[j];
    cards[j] = tmp;
  }

  var revealed = [];
  var matched = [];
  for (var k = 0; k < cards.length; k++) {
    revealed.push(false);
    matched.push(false);
  }

  return {
    game: 'memory-hebrew',
    title: 'Memory Game – Hebrew Letters א-ת',
    board: cards,
    revealed: revealed,
    matched: matched,
    totalPairs: memoryHebrewPairsCount,
    matchedPairs: 0,
    moves: 0,
    firstFlipIndex: null,
    columns: 5,
    won: false,
  };
}

function memoryHebrewCountMatched(matched) {
  var count = 0;
  for (var i = 0; i < matched.length; i++) {
    if (matched[i]) count++;
  }
  return count / 2;
}

function memoryHebrewFlip(board, revealed, matched, index, firstFlipIndex, moves) {
  var totalPairs = board.length / 2;

  // Don't allow flipping already matched or currently revealed cards
  if (matched[index] || revealed[index]) {
    return {
      revealed: revealed,
      matched: matched,
      firstFlipIndex: firstFlipIndex,
      moves: moves,
      matchedPairs: memoryHebrewCountMatched(matched),
      totalPairs: totalPairs,
      isMatch: null,
      unmatchedIndices: null,
      won: false,
    };
  }

  // First flip of the pair
  if (firstFlipIndex === null || firstFlipIndex === undefined) {
    revealed[index] = true;
    return {
      revealed: revealed,
      matched: matched,
      firstFlipIndex: index,
      moves: moves,
      matchedPairs: memoryHebrewCountMatched(matched),
      totalPairs: totalPairs,
      isMatch: null,
      unmatchedIndices: null,
      won: false,
    };
  }

  // Second flip
  revealed[index] = true;
  moves++;

  var isMatch = (board[firstFlipIndex] === board[index]);

  if (isMatch) {
    matched[firstFlipIndex] = true;
    matched[index] = true;
  }

  var matchedPairs = memoryHebrewCountMatched(matched);
  var won = (matchedPairs === totalPairs);

  return {
    revealed: revealed,
    matched: matched,
    firstFlipIndex: null,
    moves: moves,
    matchedPairs: matchedPairs,
    totalPairs: totalPairs,
    isMatch: isMatch,
    unmatchedIndices: isMatch ? null : [firstFlipIndex, index],
    won: won,
  };
}

// ─── Entry points called from common.js dispatchers ─────────────────

function startMemoryHebrewGame() {
  isLocked = true;
  document.getElementById("win-message").style.display = "none";

  gameState = memoryHebrewNewGame();
  renderBoard();
  updateMemoryStats();
  isLocked = false;
}

async function onMemoryHebrewCardClick(index) {
  if (isLocked) return;
  if (gameState.matched[index] || gameState.revealed[index]) return;

  isLocked = true;

  var result = memoryHebrewFlip(
    gameState.board,
    gameState.revealed,
    gameState.matched,
    index,
    gameState.firstFlipIndex,
    gameState.moves
  );

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
}
