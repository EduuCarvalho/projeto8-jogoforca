import { useState } from "react";

import palavras from "./palavras";

import forca0 from "./assets/forca0.png";
/* import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png"; */

export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [wordRandom , setWordRandom] = useState("");
    const [disableKeyboard , setKeyboard] = useState('letter-disable');


  function HangmanGame() {
    return (
      <div className="hangman">
        <img src={forca0} alt="forca"/>
        <div className="choose-word" onClick={RandomWord}>
          <strong>Escolher Palavra</strong>
        </div>
        <div className="word">
          <p>{wordRandom}</p>
        </div>
      </div>
    );
  }

  function RandomWord (){
    const indexRandom = Math.floor(Math.random()*palavras.length)
    console.log(indexRandom);
    const newWord = palavras[indexRandom];
    const arrayNewWord = newWord.split('');
    const hidenWord = arrayNewWord.map((l)=> "_ ")
    const enableKeyboard = "letter-enable";
    console.log(hidenWord);
    console.log(newWord);
    setWordRandom(hidenWord);
    setKeyboard(enableKeyboard)
  };

/*   function Hanged() {
    const hangin = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
  } */
  
  


  function Keyboard(props) {
    

    return (
        <div className={disableKeyboard}> 
            {props.letter.toUpperCase()}
        </div>
    )
    
  }

  function TryToAnswer (){
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
      {alphabet.map((l,index)=> (<Keyboard letter={l} key={index}/>))}
      </div>
      <TryToAnswer/>
    </div>
  );
}
