import "./Image.css";
import Hangman_0 from "./photos/Hangman_0.png";
import Hangman_1 from "./photos/Hangman_1.png";
import Hangman_2 from "./photos/Hangman_2.png";
import Hangman_3 from "./photos/Hangman_3.png";
import Hangman_4 from "./photos/Hangman_4.png";
import Hangman_5 from "./photos/Hangman_5.png";
import Hangman_6 from "./photos/Hangman_6.png";
import Hangman_7 from "./photos/Hangman_7.png";
import Hangman_8 from "./photos/Hangman_8.png";
import Hangman_9 from "./photos/Hangman_9.png";

function Image(props) {
  function getSource() {
    switch (props.tries) {
      case 0:
        return Hangman_0;
      case 1:
        return Hangman_1;
      case 2:
        return Hangman_2;
      case 3:
        return Hangman_3;
      case 4:
        return Hangman_4;
      case 5:
        return Hangman_5;
      case 6:
        return Hangman_6;
      case 7:
        return Hangman_7;
      case 8:
        return Hangman_8;
      default:
        return Hangman_9;
    }
  }

  return (
    <div>
      <img src={getSource()} alt="hangman" />
    </div>
  );
}
export default Image;
