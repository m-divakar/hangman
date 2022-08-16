import React, { useState, useEffect } from "react";
import { randomWord } from "./Assets/Data/words";
import "./Hangman.css";
import img0 from "./Assets/Images/0.jpg";
import img1 from "./Assets/Images/1.jpg";
import img2 from "./Assets/Images/2.jpg";
import img3 from "./Assets/Images/3.jpg";
import img4 from "./Assets/Images/4.jpg";
import img5 from "./Assets/Images/5.jpg";
import img6 from "./Assets/Images/6.jpg";

const Hangman = ({ images, maxWrong }) => {
   const [nWrong, setNWrong] = useState(0);
   const [guessed, setGuessed] = useState(new Set()); //eslint-disable-next-line
   const [answer, setAnswer] = useState(randomWord);
   const gameOver = nWrong > maxWrong;

   const reset = () => {
      setNWrong(0);
      setGuessed(new Set());
      setAnswer(randomWord);
   };
   const guessedWord = () => {
      return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
   };
   const handleGuess = (e) => {
      const ltr = e.target.value;
      setGuessed(new Set([...guessed, ltr]));
      setNWrong(nWrong + (answer.includes(ltr) ? 0 : 1));
   };
   const generateButtons = () => {
      return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
         <button
            key={ltr}
            value={ltr}
            disabled={guessed.has(ltr)}
            onClick={handleGuess}
         >
            {ltr}
         </button>
      ));
   };

   const win = guessedWord().join("") === answer;
   useEffect(() => {
      setTimeout(() => {
         win && reset();
      }, 2000);
   }, [win]);

   return (
      <div className="Hangman">
         <h1>Hangman</h1>
         <img src={images[nWrong]} alt={nWrong}></img>
         <p>Wrong:{nWrong}</p>
         <p className="Hangman-word">{gameOver ? answer : guessedWord()}</p>
         {win && <p>You Win!!</p>}
         <p className="Hangman-btns">
            {gameOver ? `You lose!!` : generateButtons()}
         </p>
         <button id="reset" onClick={reset}>
            Restart
         </button>
      </div>
   );
};

Hangman.defaultProps = {
   maxWrong: 5,
   images: [img0, img1, img2, img3, img4, img5, img6],
};

export default Hangman;
