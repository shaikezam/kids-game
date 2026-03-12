<?php

require 'vendor/autoload.php';

use games\MemoryGameNumbers;
use games\MemoryGameHebrew;
use games\SymbolNameGame;

// ─── API: Numbers Memory Game ───────────────────────────────────────

Flight::route('GET /api/memory-numbers/new', function () {
    $game = new MemoryGameNumbers();
    $data = $game->newGame();
    Flight::json($data);
});

Flight::route('POST /api/memory-numbers/flip', function () {
    $body = Flight::request()->data;
    $board = json_decode($body->board, true);
    $revealed = json_decode($body->revealed, true);
    $matched = json_decode($body->matched, true);
    $index = (int) $body->index;
    $firstFlipIndex = ($body->firstFlipIndex !== null && $body->firstFlipIndex !== '') ? (int) $body->firstFlipIndex : null;
    $moves = (int) $body->moves;

    $game = new MemoryGameNumbers();
    $result = $game->flip($board, $revealed, $matched, $index, $firstFlipIndex, $moves);
    Flight::json($result);
});

// ─── API: Hebrew Memory Game ────────────────────────────────────────

Flight::route('GET /api/memory-hebrew/new', function () {
    $game = new MemoryGameHebrew();
    $data = $game->newGame();
    Flight::json($data);
});

Flight::route('POST /api/memory-hebrew/flip', function () {
    $body = Flight::request()->data;
    $board = json_decode($body->board, true);
    $revealed = json_decode($body->revealed, true);
    $matched = json_decode($body->matched, true);
    $index = (int) $body->index;
    $firstFlipIndex = ($body->firstFlipIndex !== null && $body->firstFlipIndex !== '') ? (int) $body->firstFlipIndex : null;
    $moves = (int) $body->moves;

    $game = new MemoryGameHebrew();
    $result = $game->flip($board, $revealed, $matched, $index, $firstFlipIndex, $moves);
    Flight::json($result);
});

// ─── API: Symbol Name Game ──────────────────────────────────────────

Flight::route('GET /api/symbol-name/new', function () {
    $game = new SymbolNameGame();
    $data = $game->newGame();
    Flight::json($data);
});

Flight::route('POST /api/symbol-name/check', function () {
    $body = Flight::request()->data;
    $correctLetters = json_decode($body->correctLetters, true);
    $position = (int) $body->position;
    $pickedLetter = $body->pickedLetter;

    $game = new SymbolNameGame();
    $result = $game->checkLetter($correctLetters, $position, $pickedLetter);
    Flight::json($result);
});

// ─── Serve the main HTML page ───────────────────────────────────────

Flight::route('GET /', function () {
    echo <<<'HTML'
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>שרת משחקים</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>🎮 שרת משחקים</h1>
            <p class="subtitle">בחרו משחק להתחיל</p>
        </header>

        <nav id="game-selector">
            <button class="game-btn" data-game="memory-numbers">
                <span class="game-icon">🔢</span>
                <span class="game-label">משחק זיכרון<br><small>מספרים 0–9</small></span>
            </button>
            <button class="game-btn" data-game="memory-hebrew">
                <span class="game-icon">🔤</span>
                <span class="game-label">משחק זיכרון<br><small>אותיות א–ת</small></span>
            </button>
            <button class="game-btn" data-game="symbol-name">
                <span class="game-icon">🖼️</span>
                <span class="game-label">איך כותבים?<br><small>בנו את המילה בעברית</small></span>
            </button>
        </nav>

        <!-- Memory Game Area -->
        <div id="game-area" style="display:none;">
            <div id="game-header">
                <button id="back-btn">חזרה למשחקים ←</button>
                <h2 id="game-title"></h2>
                <div id="game-stats">
                    <span id="moves-display">מהלכים: 0</span>
                    <span id="pairs-display">זוגות: 0/0</span>
                </div>
                <button id="new-game-btn">🔄 משחק חדש</button>
            </div>
            <div id="board"></div>
            <div id="win-message" style="display:none;">
                <h2>🎉 ניצחת!</h2>
                <p id="win-stats"></p>
                <button id="play-again-btn">שחקו שוב</button>
            </div>
        </div>

        <!-- Symbol Name Quiz Area -->
        <div id="quiz-area" style="display:none;">
            <div id="quiz-header">
                <button id="quiz-back-btn">חזרה למשחקים ←</button>
                <h2 id="quiz-title"></h2>
                <div id="quiz-stats">
                    <span id="quiz-score">ניקוד: 0</span>
                    <span id="quiz-progress">שאלה: 0/0</span>
                    <span id="quiz-mistakes">טעויות: 0</span>
                </div>
                <button id="quiz-new-btn">🔄 משחק חדש</button>
            </div>

            <div id="quiz-content">
                <div id="quiz-symbol"></div>
                <p id="quiz-prompt">בחרו את האותיות לפי הסדר הנכון:</p>

                <!-- Word slots -->
                <div id="word-slots"></div>

                <!-- Letter pool -->
                <div id="letter-pool"></div>

                <!-- Feedback for wrong picks -->
                <div id="letter-feedback" style="display:none;"></div>
            </div>

            <!-- Success per word -->
            <div id="word-success" style="display:none;">
                <h3 id="word-success-text"></h3>
                <button id="next-word-btn">המילה הבאה ←</button>
            </div>

            <!-- Final result -->
            <div id="quiz-result" style="display:none;">
                <h2 id="quiz-result-title"></h2>
                <p id="quiz-result-text"></p>
                <button id="quiz-play-again-btn">שחקו שוב</button>
            </div>
        </div>
        
        <footer style="text-align: center; margin-top: 30px; padding: 15px; font-size: 16px; color: white; font-weight: bold;">
            כל הזכויות שמורות לשי זמברובסקי shaike.zam@gmail.com
        </footer>
    </div>

    <script src="/js/app.js"></script>
</body>
</html>
HTML;
});

// ─── Serve static files ─────────────────────────────────────────────

Flight::route('GET /css/style.css', function () {
    header('Content-Type: text/css');
    readfile(__DIR__ . '/css/style.css');
});

Flight::route('GET /js/app.js', function () {
    header('Content-Type: application/javascript');
    readfile(__DIR__ . '/js/app.js');
});

Flight::start();
