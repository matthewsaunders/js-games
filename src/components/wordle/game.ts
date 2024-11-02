import {
  LETTER_REGEX,
  INITIAL_STATE,
  MAX_GUESSES,
  MAX_LETTERS,
  EMPTY_LETTER,
} from "./constants";

class Letter {
  value: string;
  existsInSolution: boolean;
  positionCorrect: boolean;

  constructor() {
    this.value = '';
    this.existsInSolution = false;
    this.positionCorrect = false;
  }

  get isLetterEmpty(): boolean {
    return this.value === ''
  }
}

export class Guess {
  letters: Letter[];
  submitted: boolean;
  currentLetterIndex: number;

  constructor() {
    this.letters = this.initializeLetters();
    this.submitted = false;
    this.currentLetterIndex = 0;
  }

  initializeLetters(): Letter[] {
    const letters = [];

    for(let i = 0; i < MAX_LETTERS; i++) {
      letters.push(new Letter())
    }

    return letters;
  }

  get hasAllLettersEntered(): boolean {
    return !this.letters[MAX_LETTERS - 1].isLetterEmpty;
  }

  addLetter(letter: string) {
    // If the last letter of the guess is already entered, ignore this letter
    if (this.currentLetterIndex === MAX_LETTERS - 1 && !this.letters[this.currentLetterIndex].isLetterEmpty) {
      return
    }

    this.letters[this.currentLetterIndex].value = letter;
    this.currentLetterIndex++;
  }

  strLetters(): string[] {
    return this.letters.map(l => l.value)
  }

  print() {
    // console.log(this.letters)
    console.log(`[ ${this.strLetters().join(', ')} ]`)
  }
}

export class WordleGame {
  solved: boolean;
  word: string;
  guesses: Guess[];
  currentGuessIndex: number;

  constructor(word: string) {
    this.solved = false;
    this.word = word;
    this.guesses = this.initializeGuesses()
    this.currentGuessIndex = 0;
  }

  initializeGuesses(): Guess[] {
    const guesses = [];

    for(let i = 0; i < MAX_GUESSES; i++) {
      guesses.push(new Guess())
    }

    return guesses;
  }

  handleKeyDown(ev: KeyboardEvent): void {
    if (ev.key === "Enter") {
      console.log("Enter");
    } else if (ev.key === "Backspace") {
      console.log("Backspace");
    } else if (LETTER_REGEX.test(ev.key)) {
      console.log("Letter");
      this.addLetterToGuess(ev.key);
    }
  }

  addLetterToGuess(letter: string) {
    // Max num guesses has already been submitted
    if (this.guesses[MAX_GUESSES - 1].submitted) {
      return;
    }

    const currentGuess = this.guesses[this.currentGuessIndex];

    // If the guess is already completely entered, ignore future letters
    if (currentGuess.hasAllLettersEntered) {
      return;
    }

    currentGuess.addLetter(letter)

    this.guesses = [

      ...this.guesses
    ]


    this.printGameState()
  }

  printGameState() {
    console.log(`Word: ${this.word}`)
    for(const guess of this.guesses) {
      guess.print()
    }
  }

}
