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
            כל הזכויות שמורות לשי זמברובסקי shaike.zam@gmail.com | 
            <a href="/eula" style="color: #a7f3d0; text-decoration: none;">תנאי שימוש</a>
        </footer>
    </div>

    <script src="/js/app.js"></script>
</body>
</html>
HTML;
});

// ─── EULA Page ────────────────────────────────────────────────────────

Flight::route('GET /eula', function () {
    echo <<<'HTML'
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>תנאי שימוש - שרת משחקים</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
            direction: rtl;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 30px;
            text-align: center;
            color: #a7f3d0;
            text-shadow: 0 0 20px rgba(167, 243, 208, 0.3);
        }
        
        h2 {
            font-size: 1.5rem;
            margin: 30px 0 15px 0;
            color: #c4b5fd;
            border-bottom: 2px solid rgba(196, 181, 253, 0.3);
            padding-bottom: 8px;
        }
        
        p {
            line-height: 1.8;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        ul {
            margin: 15px 0 15px 30px;
            line-height: 1.8;
        }
        
        li {
            margin-bottom: 8px;
            font-size: 1.05rem;
        }
        
        .back-btn {
            display: inline-block;
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            color: #fff;
            padding: 12px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 30px;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .back-btn:hover {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }
        
        .highlight {
            color: #fbbf24;
            font-weight: 600;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            font-size: 14px;
            opacity: 0.7;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 20px;
                margin: 10px;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            h2 {
                font-size: 1.3rem;
            }
            
            p, li {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>תנאי שימוש</h1>
        <p><strong>תאריך עדכון אחרון:</strong> מרץ 2026</p>
        
        <h2>1. קבלת התנאים</h2>
        <p>באמצעות השימוש באתר "שרת משחקים" ובמשחקים המוצעים בו, אתה מסכים לתנאי השימוש המפורטים להלן. אם אינך מסכים לתנאים אלה, אינך רשאי להשתמש באתר.</p>
        
        <h2>2. תיאור השירות</h2>
        <p>אתר "שרת משחקים" מספק משחקי למידה חינוכיים לילדים, כולל:</p>
        <ul>
            <li>משחק זיכרון מספרים</li>
            <li>משחק זיכרון אותיות בעברית</li>
            <li>משחק "איך כותבים" - בניית מילים בעברית</li>
        </ul>
        
        <h2>2. אחריות המשתמש</h2>
        <p><span class="highlight">חשוב מאוד:</span> השימוש באתר ובמשחקים הוא על <strong>אחריותך הבלעדית</strong> ועל אחריות הוריך או אפוטרופוסים חוקיים. הנהלים הבאים חלים:</p>
        <ul>
            <li><strong>פיקוח הורי:</strong> ילדים חייבים להשתמש באתר רק תחת פיקוח ובאישור הורים</li>
            <li><strong>זמן שימוש:</strong> יש להגביל את זמן השימוש במשחקים כדי למנוע התמכרות</li>
            <li><strong>תכולה:</strong> ההורים אחראים לבדוק את התכולה ולוודא שהיא מתאימה לגיל הילד</li>
            <li><strong>בטיחות:</strong> יש להקפיד על תנאי שימוש נכונים במכשירים דיגיטליים</li>
        </ul>
        
        <h2>3. הגבלת אחריות</h2>
        <p>האתר והמשחקים מסופקים "כמות שהם" ללא כל אחריות, מפורשת או משתמעת, כולל:</p>
        <ul>
            <li>אין הבטחה לתפקוד רצוף או ללא תקלות</li>
            <li>אין הבטחה לתוצאות למידה מסוימות</li>
            <li>אין אחריות לנזקים ישירים או עקיפים שעלולים לנבוע מהשימוש</li>
            <li>אין אחריות לתכנים צדדיים או פרסומות שעלולות להופיע</li>
        </ul>
        
        <h2>4. זכויות יוצרים</h2>
        <p>כל הזכויות באתר ובמשחקים שמורות לשי זמברובסקי. אסור להעתיק, לשכפל, להפיץ או למכור חלק כלשהו מהאתר ללא קבלת רשות מפורשת בכתב.</p>
        
        <h2>5. שינויים בתנאים</h2>
        <p>הנהלת האתר רשאית לשנות את תנאי השימוש מעת לעת. שינויים יכנסו לתוקף מיד עם פרסומם באתר.</p>
        
        <h2>6. דיני ישראל</h2>
        <p>על תנאי שימוש אלה ועל השימוש באתר יחולו הדינים של מדינת ישראל בלבד.</p>
        
        <h2>7. יצירת קשר</h2>
        <p>לשאלות או בירורים בנוגע לתנאי השימוש, ניתן ליצור קשר דרך כתובת הדוא"ל: <strong>shaike.zam@gmail.com</strong></p>
        
        <div class="footer">
            <p>תנאי שימוש אלה נכתבו במטרה להגן על המשתמשים ולהבטיח שימוש אחראי ובטוח באתר.</p>
            <p>השימוש באתר מהווה הסכמה מלאה לתנאים המפורטים לעיל.</p>
        </div>
        
        <center>
            <a href="/" class="back-btn">← חזרה למשחקים</a>
        </center>
    </div>
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
