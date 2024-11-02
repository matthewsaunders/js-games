import React, { useState } from "react";
import { KeyboardLetter } from "./KeyboardLetter";
import styles from "./styles.module.css";

interface KeyboardRowProps {
  letters: string[];
  handleKeyPress: (letter: string) => void;
}

export const KeyboardRow: React.FC<KeyboardRowProps> = ({
  letters,
  handleKeyPress,
}) => {
  const includeSpacers = letters[0] === "A";

  return (
    <div className={styles.keyboardRow}>
      {includeSpacers && <div className={styles.keyboardSpacer}></div>}

      {letters.map((letter, index) => (
        <KeyboardLetter
          key={index}
          letter={letter}
          handleKeyPress={handleKeyPress}
        />
      ))}

      {includeSpacers && <div className={styles.keyboardSpacer}></div>}
    </div>
  );
};
