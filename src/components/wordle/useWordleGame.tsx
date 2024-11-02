import { useState, useEffect, useReducer } from "react";
import {
  EMPTY_LETTER,
  EMPTY_GUESS,
  MAX_GUESSES,
  MAX_LETTERS,
  LETTER_REGEX,
} from "./constants";
import type { State, Guess, Letter } from "./types";
import JSConfetti from "js-confetti";
import { words } from "./words";

const intializeGuesses = (): Guess[] => [
  { ...EMPTY_GUESS },
  { ...EMPTY_GUESS },
  { ...EMPTY_GUESS },
  { ...EMPTY_GUESS },
  { ...EMPTY_GUESS },
  { ...EMPTY_GUESS },
];

const jsConfetti = new JSConfetti();

type Action =
  | { type: "addLetter"; letter: string }
  | { type: "deleteLetter" }
  | { type: "submitGuess" }
  | { type: "newGame"; word: string };

function getRand(max: number) {
  return Math.floor(Math.random() * max);
}

function getWord(word?: string) {
  return !!word ? word : words[getRand(words.length - 1)];
}

function allGuessesSubmitted(guesses: Guess[]) {
  return guesses[MAX_GUESSES - 1].submitted;
}

function isLetterEmpty(letter: Letter) {
  return letter.value === "";
}

function guessHasAllLetters(guess: Guess) {
  return !isLetterEmpty(guess.letters[MAX_LETTERS - 1]);
}

function isLetterInWord(word: string, letter: Letter) {
  return word.includes(letter.value);
}

function isLetterInPosition(word: string, letter: Letter, index: number) {
  const letterIndex = word.indexOf(letter.value);
  return letterIndex >= 0 && letterIndex === index;
}

function gradeGuessLetters(letters: Letter[], word: string) {
  return letters.map((letter, index) => {
    return {
      ...letter,
      existsInSolution: isLetterInWord(word, letter),
      positionCorrect: isLetterInPosition(word, letter, index),
    };
  });
}

function wordleReducer(state: State, action: Action): State {
  if (state.solved) {
    return state;
  }

  switch (action.type) {
    case "addLetter": {
      if (
        allGuessesSubmitted(state.guesses) ||
        guessHasAllLetters(state.guesses[state.currentGuessIndex])
      ) {
        return state;
      }

      const newLetters = [...state.guesses[state.currentGuessIndex].letters];
      newLetters[state.currentLetterIndex] = {
        ...EMPTY_LETTER,
        value: action.letter,
      };

      const newGuesses = [...state.guesses];
      newGuesses[state.currentGuessIndex] = {
        ...state.guesses[state.currentGuessIndex],
        letters: newLetters,
      };

      return {
        ...state,
        guesses: newGuesses,
        currentLetterIndex: state.currentLetterIndex + 1,
      };
    }
    case "deleteLetter": {
      const newLetterIndex = state.currentLetterIndex - 1;

      if (allGuessesSubmitted(state.guesses) || newLetterIndex < 0) {
        return state;
      }

      const newLetters = [...state.guesses[state.currentGuessIndex].letters];
      newLetters[newLetterIndex] = {
        ...EMPTY_LETTER,
      };

      const newGuesses = [...state.guesses];
      newGuesses[state.currentGuessIndex] = {
        ...state.guesses[state.currentGuessIndex],
        letters: newLetters,
      };

      return {
        ...state,
        guesses: newGuesses,
        currentLetterIndex: newLetterIndex,
      };
    }
    case "submitGuess": {
      const newGuessIndex = state.currentGuessIndex + 1;
      if (
        allGuessesSubmitted(state.guesses) ||
        !guessHasAllLetters(state.guesses[state.currentGuessIndex]) ||
        newGuessIndex > MAX_GUESSES
      ) {
        return state;
      }

      const gradedLetters = gradeGuessLetters(
        state.guesses[state.currentGuessIndex].letters,
        state.word
      );

      const updatedGuesses = [...state.guesses];
      updatedGuesses[state.currentGuessIndex] = {
        submitted: true,
        letters: gradedLetters,
      };

      const isSolved = gradedLetters.every((letter) => letter.positionCorrect);

      if (isSolved) {
        jsConfetti.addConfetti({
          confettiRadius: 4,
          confettiNumber: 500,
        });
      }

      return {
        ...state,
        guesses: updatedGuesses,
        currentGuessIndex: newGuessIndex,
        currentLetterIndex: 0,
        solved: isSolved,
      };
    }
    case "newGame": {
      return initializeGameState(action.word);
    }
    // default: {
    //   throw Error("Unknown action: " + action.type);
    // }
  }
}

function initializeGameState(word?: string): State {
  return {
    word: getWord(word),
    solved: false,
    currentGuessIndex: 0,
    currentLetterIndex: 0,
    guesses: intializeGuesses(),
  };
}

export const useWordleGame = (word?: string) => {
  const [state, dispatch] = useReducer(
    wordleReducer,
    initializeGameState(word)
  );

  console.log("word: " + state.word);

  function handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Enter") {
      dispatch({ type: "submitGuess" });
    } else if (ev.key === "Backspace") {
      dispatch({ type: "deleteLetter" });
    } else if (LETTER_REGEX.test(ev.key)) {
      dispatch({ type: "addLetter", letter: ev.key });
    }
  }

  function handleKeyboardKeyPress(letter: string) {
    if (letter === "Enter") {
      dispatch({ type: "submitGuess" });
    } else if (letter === "Backspace") {
      dispatch({ type: "deleteLetter" });
    } else if (LETTER_REGEX.test(letter)) {
      dispatch({ type: "addLetter", letter: letter });
    }
  }

  function startNewGame() {
    dispatch({ type: "newGame", word: getWord() });
  }

  return {
    solved: state.solved,
    guesses: state.guesses,
    handleKeyDown,
    handleKeyboardKeyPress,
    startNewGame,
  };
};
