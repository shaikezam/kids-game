<?php

namespace games;

/**
 * @deprecated Logic moved to frontend (js/memory-hebrew.js). Kept for backward compatibility.
 */
class MemoryGameHebrew
{
    private array $symbols = [
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
        'ת'
    ];
    private int $pairsCount = 10; // Use 10 pairs (20 cards total)

    /**
     * Create a new shuffled board.
     */
    public function newGame(): array
    {
        $selected = $this->symbols;
        shuffle($selected);
        $selected = array_slice($selected, 0, $this->pairsCount);

        $cards = array_merge($selected, $selected);
        shuffle($cards);

        $totalPairs = $this->pairsCount;
        $revealed = array_fill(0, count($cards), false);
        $matched = array_fill(0, count($cards), false);

        return [
            'game' => 'memory-hebrew',
            'title' => 'Memory Game – Hebrew Letters א-ת',
            'board' => $cards,
            'revealed' => $revealed,
            'matched' => $matched,
            'totalPairs' => $totalPairs,
            'matchedPairs' => 0,
            'moves' => 0,
            'firstFlipIndex' => null,
            'columns' => 5,
            'won' => false,
        ];
    }

    /**
     * Process a card flip.
     */
    public function flip(array $board, array $revealed, array $matched, int $index, ?int $firstFlipIndex, int $moves): array
    {
        $totalPairs = count($board) / 2;

        if ($matched[$index] || $revealed[$index]) {
            return [
                'board' => $board,
                'revealed' => $revealed,
                'matched' => $matched,
                'firstFlipIndex' => $firstFlipIndex,
                'moves' => $moves,
                'matchedPairs' => $this->countMatched($matched),
                'totalPairs' => $totalPairs,
                'isMatch' => null,
                'won' => false,
            ];
        }

        // First flip
        if ($firstFlipIndex === null) {
            $revealed[$index] = true;
            return [
                'board' => $board,
                'revealed' => $revealed,
                'matched' => $matched,
                'firstFlipIndex' => $index,
                'moves' => $moves,
                'matchedPairs' => $this->countMatched($matched),
                'totalPairs' => $totalPairs,
                'isMatch' => null,
                'won' => false,
            ];
        }

        // Second flip
        $revealed[$index] = true;
        $moves++;

        $isMatch = ($board[$firstFlipIndex] === $board[$index]);

        if ($isMatch) {
            $matched[$firstFlipIndex] = true;
            $matched[$index] = true;
        }

        $matchedPairs = $this->countMatched($matched);
        $won = ($matchedPairs === $totalPairs);

        return [
            'board' => $board,
            'revealed' => $revealed,
            'matched' => $matched,
            'firstFlipIndex' => null,
            'moves' => $moves,
            'matchedPairs' => $matchedPairs,
            'totalPairs' => $totalPairs,
            'isMatch' => $isMatch,
            'unmatchedIndices' => $isMatch ? null : [$firstFlipIndex, $index],
            'won' => $won,
        ];
    }

    private function countMatched(array $matched): int
    {
        return (int) (array_sum(array_map('intval', $matched)) / 2);
    }
}
