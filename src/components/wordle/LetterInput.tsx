import React from "react";
import styles from "./styles.module.css";
import type { Letter } from "./types";

interface LetterInputParams {
  letter: Letter;
  submitted: boolean;
}

export const LetterInput: React.FC<LetterInputParams> = ({
  letter,
  submitted,
}) => {
  let additionalLetterClass = "";

  if (letter.positionCorrect) {
    additionalLetterClass = styles.letterCorrect;
  } else if (letter.existsInSolution) {
    additionalLetterClass = styles.letterOutOfPosition;
  } else if (letter.value !== "") {
    additionalLetterClass = styles.letterFilled;
  }

  if (submitted) {
    additionalLetterClass = `${additionalLetterClass} ${styles.letterSubmitted}`;
  }

  return (
    <div className={`${styles.letter} ${additionalLetterClass}`}>
      {letter.value}
    </div>
  );
};
