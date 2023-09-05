import "./GameOver.css";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
function GameOver(props) {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        style={{
          content: {
            background: props.hasWon ? "turquoise" : "indianred",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          },
          overlay: {
            backgroundColor: "	rgba(95, 158, 160,0.75)",
          },
        }}
      >
        <div className="box">
          <h3>{props.text}</h3>
          <button
            onClick={() => {
              props.updateTriesfunc(0);
              props.fetchApi();
              props.updateWrongGuessArr([]);
              props.updateCorrectGuessArr([]);
              props.updateHasWon(false);
            }}
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default GameOver;
