import React from "react";
import styles from "./styles.module.css";
import { LetterInput } from "./LetterInput";
import { Keyboard } from "./Keyboard";
import type { Guess } from "./types";

interface RowInputParams {
  guess: Guess;
}

export const RowInput: React.FC<RowInputParams> = ({ guess }) => {
  return (
    <div className={styles.row}>
      {guess.letters.map((letter, index) => (
        <LetterInput key={index} letter={letter} submitted={guess.submitted} />
      ))}
    </div>
  );
};
