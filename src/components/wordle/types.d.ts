export interface Letter {
  value: string;
  existsInSolution: boolean;
  positionCorrect: boolean;
}

export interface Guess {
  letters: Letter[];
  submitted: boolean;
}

export interface State {
  guesses: Guess[];
  solved: boolean;
  word: string;
  currentGuessIndex: number;
  currentLetterIndex: number;
  // guessedLetters: Letter[];
}
