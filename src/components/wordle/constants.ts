import type { Letter, Guess, State } from './types'

export const LETTER_REGEX = /^[a-zA-Z]$/;
export const MAX_GUESSES = 6;
export const MAX_LETTERS = 5;

export const EMPTY_LETTER: Letter = {
  value: '',
  existsInSolution: false,
  positionCorrect: false,
}

export const EMPTY_GUESS: Guess = {
  letters: [
    { ...EMPTY_LETTER },
    { ...EMPTY_LETTER },
    { ...EMPTY_LETTER },
    { ...EMPTY_LETTER },
    { ...EMPTY_LETTER },
  ],
  submitted: false,
}

export const INITIAL_STATE = {
  word: '',
  guesses: [
    { ...EMPTY_GUESS },
    { ...EMPTY_GUESS },
    { ...EMPTY_GUESS },
    { ...EMPTY_GUESS },
    { ...EMPTY_GUESS },
    { ...EMPTY_GUESS },
  ],
  solved: false,
  currentGuess: 0,
};

export const ENTER_KEY = 'Enter'
export const BACKSPACE_KEY = 'Backspace'

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [ENTER_KEY, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', BACKSPACE_KEY],
]
