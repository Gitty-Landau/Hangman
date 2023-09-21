import "./LetterBank.css";
import { useState } from "react";
function LetterBank(props) {
  function checkLetter(letter) {
    if (Object.keys(props.randomWord).length > 0) {
      const letterArr = props.randomWord.word.split("");
      for (let i = 0; i < letterArr.length; i++) {
        if (letter.toLowerCase() == letterArr[i].toLowerCase()) {
          return true;
        }
      }
    }
  }
  function isInGuessedArr(letter) {
    for (let i = 0; i < props.correctGuessArr.length; i++) {
      if (letter.toLowerCase() == props.correctGuessArr[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  function isInWrongArr(letter) {
    for (let i = 0; i < props.wrongGuessArr.length; i++) {
      if (letter.toLowerCase() == props.wrongGuessArr[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  function getButtonColor(letter) {
    if (isInGuessedArr(letter)) {
      return "green";
    } else if (isInWrongArr(letter)) {
      return "gray";
    } else {
      return "";
    }
  }
  function checkIfWon() {
    if (Object.keys(props.randomWord).length > 0) {
      {
        const letterArr = props.randomWord.word.split("");
        if (props.correctGuessArr.length == letterArr.length) {
          props.updateHasWon(true);
        }
      }
    }
  }
  function countInArray(ltr) {
    const letterArr = props.randomWord.word.split("");
    return letterArr.filter((item) => item.toLowerCase() == ltr.toLowerCase())
      .length;
  }

  const [selectedLetter, updateSelectedLetter] = useState("");
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <div className="letter_bank">
      <h3>Letter Bank</h3>
      {alphabets.map(function (letter) {
        return (
          <button
            className={getButtonColor(letter)}
            onClick={(e) => {
              e.preventDefault();
              if (!isInGuessedArr(letter) && !isInWrongArr(letter)) {
                updateSelectedLetter(letter);

                const iscorrect = checkLetter(letter);
                if (iscorrect) {
                  const numOfOccurances = countInArray(letter);
                  let guessArr = [];
                  for (let i = 0; i < numOfOccurances; i++) {
                    guessArr[i] = letter;
                  }
                  props.updateCorrectGuessArr(function (prev) {
                    return [...prev, ...guessArr];
                  });
                } else {
                  props.updateWrongGuessArr(function (prev) {
                    return [...prev, letter];
                  });
                }

                !iscorrect &&
                  props.updateTries(function (prev) {
                    return prev + 1;
                  });
                checkIfWon();
              }
            }}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
export default LetterBank;
