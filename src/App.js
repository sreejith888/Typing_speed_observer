import "./App.css";
import { useState, useEffect } from "react";
let interval = null;
export default function App() {
  const [duration, setDuration] = useState(0);
  const [alphabet, setAlphabet] = useState("");
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [bestScore,setBestScore] = useState("0");
  const [count, setCount] = useState(0);
  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    makeid();
    setTimer();
    //setTimer();
  };
  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    if (ended) localStorage.setItem("duration", duration);
    const storedScore = localStorage.getItem("duration");
    if (storedScore > duration) {
      setBestScore(duration);
    } else {
      setBestScore(duration);
    }
    clearInterval(interval);
    setCount(0);
    setDuration(0);
  };


  const setTimer = () => {
    interval = setInterval(() => {
      setDuration((prev) => prev + 1);
      if (count >= 19) {
        setEnded(true);
        handleEnd();
      }
    }, 1000);
  };


  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    text =possible.charAt(Math.floor(Math.random() * possible.length));
    setCount(count + 1);
    setAlphabet(text);
  }


  const handleKeyDown = (e) => {
    e.preventDefault();

    const { key } = e;
    const characterText = alphabet;

    if (key === characterText) {
      makeid();
    }

    if (count >= 19) {
      handleEnd();
    }
  };
  
  return (
    <>
      <div className="App" onKeyDown={handleKeyDown} tabIndex={0}>
        <div className="container">
          <div className="header">
            <h2>Type the Alphabet</h2>
            <h3>
              Typing game to see how fast you type. Timer initiates when you
              start🙂
            </h3>
          </div>
          <div className="body">
            {count >= 19 ? <h1>"SUCCESS!"</h1> : <h1>{alphabet}</h1>}
          </div>
          <div className="footer">
            {ended ? "" : <h3>{duration}s</h3>}
          <h4>My best time :{bestScore}s</h4>
          </div>
        </div>
        {started ? "" : <button onClick={handleStart}>Start</button>}
      </div>
    </>
  );
}

