import "./App.css";
import LetterBank from "./Components/LetterBank/LetterBank";
import Header from "./Components/Header/Header";
import Image from "./Components/Image/Image";
import WordDisplay from "./Components/WordDisplay/WordDisplay";
import { useEffect, useState } from "react";
import GameOver from "./Components/GameOver/GameOver";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
function App() {
  const [randomWord, updateRandomWord] = useState({});
  const [tries, updateTries] = useState(0);
  const [correctGuessArr, updateCorrectGuessArr] = useState([]);
  const [wrongGuessArr, updateWrongGuessarr] = useState([]);
  const [hasWon, updateHasWon] = useState(false);
  async function fetchApi() {
    try {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1"
      );
      const data = await response.json().then((e) => {
        updateRandomWord(function (prev) {
          return { ...prev, word: e[0] };
        });
        fetchDefApi(e[0]);
        console.log(randomWord);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchDefApi(word) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      const meaningArr = data[0].meanings;
      const newArr = [];
      meaningArr.forEach((meaning, index) => {
        newArr[index] = {
          partOfSpeech: meaning.partOfSpeech,
          definition: meaning.definitions[0].definition,
        };
      });
      updateRandomWord(function (prev) {
        return {
          ...prev,
          definition: newArr[0].definition,
          partOfSpeech: newArr[0].partOfSpeech,
        };
      });
      return newArr;
    } catch (error) {
      console.log(error);
    }
  }

  function checkIfWon() {
    if (Object.keys(randomWord).length > 0) {
      {
        const letterArr = randomWord.word.split("");
        if (correctGuessArr.length == letterArr.length) {
          updateHasWon(true);
        }
      }
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);
  useEffect(() => {
    checkIfWon();
  }, [correctGuessArr]);
  return (
    <div className="app">
      <GameOver
        text={
          hasWon ? (
            <div>
              {" "}
              <h1>You Won!!</h1>
              <h2>{randomWord.word}</h2>
              <h3>Definition:</h3>
              <p>{randomWord.definition}</p>
            </div>
          ) : (
            <div>
              <div>Game Over</div>
              <div>You Lost</div>
              <h2>{randomWord.word}</h2>
              <h3>Definition:</h3>
              <p>{randomWord.definition}</p>
            </div>
          )
        }
        tries={tries}
        updateTriesfunc={updateTries}
        fetchApi={fetchApi}
        updateWrongGuessArr={updateWrongGuessarr}
        updateCorrectGuessArr={updateCorrectGuessArr}
        isOpen={hasWon || tries > 9}
        updateHasWon={updateHasWon}
        hasWon={hasWon}
      ></GameOver>
      <Header></Header>
      <div className="upper_section">
        <Image tries={tries}></Image>
        <WordDisplay
          correctGuessArr={correctGuessArr}
          className="letters"
          randomWord={randomWord}
        ></WordDisplay>
      </div>
      <LetterBank
        updateTries={updateTries}
        randomWord={randomWord}
        updateWrongGuessArr={updateWrongGuessarr}
        updateCorrectGuessArr={updateCorrectGuessArr}
        wrongGuessArr={wrongGuessArr}
        correctGuessArr={correctGuessArr}
        updateHasWon={updateHasWon}
      ></LetterBank>
    </div>
  );
}

export default App;
