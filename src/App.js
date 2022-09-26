import { useState } from "react";

import palavras from "./palavras";

import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

export default function App() {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const [currentKeyboard, setKeyboard] = useState("letter-disable");
  const [arrayNewWord, setArrayNewWord] = useState([]);
  const [arraySelectedLetter, setArraySelectedLetter] = useState([]);
  const [numberCorrectLetter, setNumberCorretletter] = useState(0);
  const hidenWord = "_";
  const hanginImg = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
  const [incorrectLetter, setIncorretLetters] = useState(0);
  const [gameWord, setGameWord] = useState("wordLetters");
  const [changeButtonInput, setChangeBurronInput] = useState("button-disable");
  const [inputTryWord, setInputTryWord] = useState("")
  const [currentlyWord, setCurrentlyWord] = useState("");
  const [inputStatus, setInputStatus] = useState(true);


  function HangmanGame() {
    return (
      <div className="hangman">
        <img src={hanginImg[incorrectLetter]} alt="forca" />
        <div className="choose-word" data-identifier="choose-word" onClick={RandomWord}>
          <strong>Escolher Palavra</strong>
        </div>
        <div className="word" >
          {arrayNewWord.map((l, index) =>
            arraySelectedLetter.includes(l.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ? (
              <p className={gameWord} key={index}>{l}</p>
            ) : (
              <p className="wordLetters" key={index}> {hidenWord} </p>
            )
          )}
        </div>
      </div>
    );
  }

  function RandomWord() {
    reset();

    setKeyboard("letter-enable");
    const indexRandom = Math.floor(Math.random() * palavras.length);
    const newWord = palavras[indexRandom];
    setArrayNewWord(newWord.split(""));
    setCurrentlyWord(newWord);
    console.log("indice da palavra criada", indexRandom);
    console.log("palavra criada", newWord);
    setChangeBurronInput("button-enable")
    setInputStatus(false);
    TryToAnswer()


  }

  function reset() {
    setKeyboard("letter-disable");
    setArrayNewWord([]);
    setArraySelectedLetter([]);
    setNumberCorretletter(0)
    setIncorretLetters(0);
    setGameWord("wordLetters");
    setInputTryWord("");
  };




  function Keyboard(props) {
    return (
      <div
        className={
          arraySelectedLetter.includes(props.letter)
            ? "letter-disable"
            : currentKeyboard
        }
        onClick={() => chooseLetter(props.index)}
      >
        {props.letter.toUpperCase()}
      </div>
    );
  }


  function chooseLetter(s) {

    const selectedLetter = [...arraySelectedLetter, alphabet[s]];
    setArraySelectedLetter(selectedLetter);
    console.log("array letras clicadas", arraySelectedLetter);

    arrayNewWord.includes(alphabet[s]) ? console.log("") : setIncorretLetters(incorrectLetter + 1);
    let newNumberCorrectLetter = numberCorrectLetter + (arrayNewWord.filter(l => (l.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === alphabet[s])).length);
    setNumberCorretletter(newNumberCorrectLetter);
    lose()
    win(newNumberCorrectLetter)
  }


  function lose() {

    if (incorrectLetter === 5) {
      setGameWord("wordLetters lose")
      setArraySelectedLetter(alphabet);
      setChangeBurronInput("button-disable")
      setInputStatus(true);
    }

  };



  function win(newNumberCorrectLetter) {
    if (newNumberCorrectLetter === arrayNewWord.length) {
      setGameWord("wordLetters win")
      setArraySelectedLetter(alphabet);
      setChangeBurronInput("button-disable")
      setInputStatus(true);
    }
  };

  function checkAnswer() {

    if (currentlyWord === inputTryWord) {
      setGameWord("wordLetters win")
      setArraySelectedLetter(alphabet);
      setInputStatus(true);
      setChangeBurronInput("button-disable")
    } else {
      setGameWord("wordLetters lose")
      setArraySelectedLetter(alphabet);
      setIncorretLetters(6);
      setInputStatus(true);
      setChangeBurronInput("button-disable")
    }

  }


  function TryToAnswer() {
    return (
      <div className="answer">
        <p>Já sei a palavra!</p>
        <input placeholder="Tente adivinhar a palavara!"
          onChange={(e) => setInputTryWord(e.target.value)}
          value={inputTryWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
          autoFocus
          disabled={inputStatus}
        ></input>
        <button onClick={checkAnswer} className={changeButtonInput}>Chutar</button>
      </div>
    );

  }

  return (
    <div className="game-page">
      <HangmanGame />
      <div className="keyboard">
        {alphabet.map((l, index) => (
          <Keyboard letter={l} key={index} index={index} />
        ))}
      </div>
      <TryToAnswer />
    </div>
  );
}
