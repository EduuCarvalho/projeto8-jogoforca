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
  const [arrayNewWord, setArrayNewWord] = useState([]); //OK
  const [arraySelectedLetter, setArraySelectedLetter] = useState([]);
  const hidenWord = "_";
  const [hanginImg,setHanginImg] = useState([forca0, forca1, forca2, forca3, forca4, forca5, forca6]);
  const [incorrectLetter, setIncorretLetters] = useState (0);

  function HangmanGame() {
    return (
      <div className="hangman">
        <img src={hanginImg[incorrectLetter]} alt="forca" />
        <div className="choose-word" onClick={RandomWord}>
          <strong>Escolher Palavra</strong>
        </div>
        <div className="word">
          {arrayNewWord.map((l, index) =>
            arraySelectedLetter.includes(l) ? (
              <p key={index}>{l}</p>
            ) : (
              <p key={index}> {hidenWord} </p>
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
    console.log ("indice da palavra criada",indexRandom );
    console.log ("palavra criada",newWord );
    
  }

  function reset () {
    setKeyboard("letter-disable");
    setArrayNewWord ([]);
    setArraySelectedLetter([]); 

  };

/* function loseOrWin () {

  incorrectLetter.map((l,index)=> arrayNewWord.includes(l)?  : (setHanginImg(+1)));

}; */

  
  

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
  }

  function TryToAnswer() {
    return (
      <div className="answer">
        <p>Já sei a palavra!</p>
        <input></input>
        <button>Chutar</button>
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
