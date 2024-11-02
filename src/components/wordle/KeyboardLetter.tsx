import React, { useState } from "react";
import styles from "./styles.module.css";
import { ENTER_KEY, BACKSPACE_KEY } from "./constants";
import BackspaceSvg from "./backspace.svg";

interface KeyboardLetterProps {
  letter: string;
  handleKeyPress: (letter: string) => void;
}

const Backspace = () => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      data-testid="icon-backspace"
    >
      <path
        fill="var(--color-tone-1)"
        d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
      />
    </svg>
  );
};

export const KeyboardLetter: React.FC<KeyboardLetterProps> = ({
  letter,
  handleKeyPress,
}) => {
  let classes = styles.key;

  if (letter === ENTER_KEY || letter === BACKSPACE_KEY) {
    classes = `${classes} ${styles.keySpecial}`;
  }

  const isBackspace = letter === BACKSPACE_KEY;

  return (
    <button className={classes} onClick={() => handleKeyPress(letter)}>
      {isBackspace && <Backspace />}
      {!isBackspace && letter}
    </button>
  );
};
