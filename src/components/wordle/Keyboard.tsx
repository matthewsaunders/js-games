import React, { useState } from "react";
import { KEYBOARD_ROWS } from "./constants";
import { KeyboardRow } from "./KeyboardRow";
import styles from "./styles.module.css";

interface KeyboardProps {
  handleKeyPress: (letter: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ handleKeyPress }) => {
  return (
    <div className={styles.keyboard}>
      {KEYBOARD_ROWS.map((row, index) => (
        <KeyboardRow
          key={index}
          letters={row}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </div>
  );
};
