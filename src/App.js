import "./style.css";

import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


  function HangmanGame() {
    return (
      <div class="hangman">
        <img src={forca0} />
        <div class="choose-word">
          <strong>Escolher Palavra</strong>
        </div>
      </div>
    );
  }

  function Hanged() {
    const hangin = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
  }

  function Keyboard(props) {
    return (
        <div class="letter-enable"> 
            {props.letter.toUpperCase()}
        </div>
    )
    
  }

  function TryToAnswer (){
    return (
        <div class="answer">
            <p>Já sei a palavra!</p>
            <input></input>
            <button>Chutar</button>
        </div>

    );
  }


  return (
    <div class="game-page">
      <HangmanGame />
      <div class="keyboard">
      {alphabet.map((l,index)=> (<Keyboard letter={l} key={index}/>))}
      </div>
      <TryToAnswer/>
    </div>
  );
}
