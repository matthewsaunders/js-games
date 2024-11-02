import React from "react";
import styles from "./styles.module.css";
import { RowInput } from "./RowInput";
import type { Guess } from "./types";

interface BoardProps {
  guesses: Guess[];
}

export const Board: React.FC<BoardProps> = ({ guesses }) => {
  return (
    <div className={styles.board}>
      {guesses.map((guess, index) => (
        <RowInput key={index} guess={guess} />
      ))}
    </div>
  );
};
