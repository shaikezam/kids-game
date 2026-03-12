<?php

namespace games;

class MemoryGameNumbers
{
    private array $symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private int $pairsCount = 8; // Use 8 pairs out of 10 possible (16 cards total)

    /**
     * Create a new shuffled board.
     */
    public function newGame(): array
    {
        // Pick random symbols for this game
        $selected = $this->symbols;
        shuffle($selected);
        $selected = array_slice($selected, 0, $this->pairsCount);

        // Create pairs
        $cards = array_merge($selected, $selected);
        shuffle($cards);

        $totalPairs = $this->pairsCount;
        $revealed = array_fill(0, count($cards), false);
        $matched = array_fill(0, count($cards), false);

        return [
            'game' => 'memory-numbers',
            'title' => 'Memory Game – Numbers 0-9',
            'board' => $cards,
            'revealed' => $revealed,
            'matched' => $matched,
            'totalPairs' => $totalPairs,
            'matchedPairs' => 0,
            'moves' => 0,
            'firstFlipIndex' => null,
            'columns' => 4,
            'won' => false,
        ];
    }

    /**
     * Process a card flip.
     *
     * @param array    $board          The card values
     * @param array    $revealed       Which cards are face-up
     * @param array    $matched        Which cards are permanently matched
     * @param int      $index          The index the player is flipping
     * @param int|null $firstFlipIndex Index of the first card flipped in this turn (null if this IS the first flip)
     * @param int      $moves          Current move count
     */
    public function flip(array $board, array $revealed, array $matched, int $index, ?int $firstFlipIndex, int $moves): array
    {
        $totalPairs = count($board) / 2;

        // Don't allow flipping already matched or currently revealed cards
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

        // First flip of the pair
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
