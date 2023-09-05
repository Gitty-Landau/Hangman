import "./WordDisplay.css";

function WordDisplay(props) {
  let letterArr;

  if (Object.keys(props.randomWord).length > 0) {
    letterArr = props.randomWord.word.split("");
  }
  function isInGuessedArr(letter) {
    for (let i = 0; i < props.correctGuessArr.length; i++) {
      if (letter.toLowerCase() == props.correctGuessArr[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="word_area">
      {Object.keys(props.randomWord).length > 0 &&
        letterArr.map((letter) => {
          return (
            <span className="underline">
              {isInGuessedArr(letter) ? <u>{letter}</u> : "___"}
            </span>
          );
        })}
    </div>
  );
}
export default WordDisplay;
