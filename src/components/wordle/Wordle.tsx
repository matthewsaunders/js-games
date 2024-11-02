import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import { Board } from "./Board";
import { Keyboard } from "./Keyboard";
import {
  LETTER_REGEX,
  INITIAL_STATE,
  MAX_GUESSES,
  MAX_LETTERS,
  EMPTY_LETTER,
} from "./constants";
import { WordleGame } from "./game";
import type { State } from "./types";
import { useWordleGame } from "./useWordleGame";
import { words } from "./words";

interface WordleProps {
  word?: string;
}

const Restart = () => {
  return (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 528.919 528.918"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            d="M70.846,324.059c3.21,3.926,8.409,3.926,11.619,0l69.162-84.621c3.21-3.926,1.698-7.108-3.372-7.108h-36.723
			c-5.07,0-8.516-4.061-7.427-9.012c18.883-85.995,95.625-150.564,187.207-150.564c105.708,0,191.706,85.999,191.706,191.706
			c0,105.709-85.998,191.707-191.706,191.707c-12.674,0-22.95,10.275-22.95,22.949s10.276,22.949,22.95,22.949
			c131.018,0,237.606-106.588,237.606-237.605c0-131.017-106.589-237.605-237.606-237.605
			c-116.961,0-214.395,84.967-233.961,196.409c-0.878,4.994-5.52,9.067-10.59,9.067H5.057c-5.071,0-6.579,3.182-3.373,7.108
			L70.846,324.059z"
          />
        </g>
      </g>
    </svg>
  );
};

export const Wordle: React.FC<WordleProps> = ({ word }) => {
  const { guesses, handleKeyDown, handleKeyboardKeyPress, startNewGame } =
    useWordleGame(word);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function restartGame() {
    startNewGame();
  }

  return (
    <div className={styles.wordle}>
      {/* <button
        className={`${styles.button} ${styles.buttonNewGame}`}
        onClick={() => restartGame()}
        onKeyDown={(e) => e.preventDefault()}
        title="New word"
      >
        <Restart />
      </button> */}
      <Board guesses={guesses} />
      <Keyboard handleKeyPress={handleKeyboardKeyPress} />
    </div>
  );
};
