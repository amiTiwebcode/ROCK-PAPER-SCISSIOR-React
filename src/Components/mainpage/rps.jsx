import React, { useEffect, useState } from "react";
import { Paper } from "../../icons/paper";
import { Rock } from "../../icons/rock";
import { Scissior } from "../../icons/scissior";
import rules from "../../icons/rules-image.png";

import Navbar from "../navbar/navbar";
import "./rps.css";
import { Cancel } from "../../icons/cancel";
import { selectSound } from "../../Audio/sound.wav";

const Rps = () => {
  const [showChoice, setShowChoice] = useState(false);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [rock, setRock] = useState(false);
  const [paper, setPaper] = useState(false);
  const [scissior, setScissior] = useState(false);

  // const [cpuChoice, setCpuChoice] = useState(false);
  const [cpuRock, setCpuRock] = useState(false);
  const [cpuPaper, setCpuPaper] = useState(false);
  const [cpuScissior, setCpuScissior] = useState(false);

  const [showRules, setShowRules] = useState(false);

  const [result, setResult] = useState("");
  const [winner, setWinner] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [disable , setDisable] = useState(true)

  const ruleImage = () => {
    setShowRules(true);
  };

  const reset = () => {
    window.location.reload();
  };
  const playerAction = (value, e) => {
    setShowChoice(true);
    var audio = document.getElementById("audio");
    audio.play();
    // var cpuWin = document.getElementById('cpuWin')
  

    var cpuNumber = getRandomInt(3);

    if (cpuNumber === 0) {
      setCpuRock(true);
      setCpuPaper(false);
      setCpuScissior(false);
    }
    if (cpuNumber === 1) {
      setCpuRock(false);
      setCpuPaper(true);
      setCpuScissior(false);
    }
    if (cpuNumber === 2) {
      setCpuRock(false);
      setCpuPaper(false);
      setCpuScissior(true);
    }

    // console.log("player", value);
    // console.log("cpu", cpuNumber);

    if (value === 0) {
      setRock(true);
      setPaper(false);
      setScissior(false);
    }
    if (value === 1) {
      setRock(false);
      setPaper(true);
      setScissior(false);
    }
    if (value === 2) {
      setRock(false);
      setPaper(false);
      setScissior(true);
    }

    let playerIndex = value.toString();
    let cpuIndex = cpuNumber.toString();

    // console.log(playerIndex + cpuIndex);

    function playRound(playerIndex, cpuIndex) {
      // alert(playerIndex.toString()+cpuIndex.toString())
      switch (playerIndex + cpuIndex) {
        case "00":
        case "11":
        case "22":
          setResult("TIE");

          break;
        case "02":
        case "10":
        case "21":
          setResult("YOU WON THIS ROUND");
          // playerScore += 1;
          setPlayerScore(playerScore + 1);
          break;
        case "20":
        case "01":
        case "12":
          setResult("CPU WON THIS ROUND ");
          // cpuScore += 1;
          setCpuScore(cpuScore + 1);
          break;
        default:
          setResult("select");
          break;
      }

      // console.log("playerScore", playerScore);
      // console.log("cpuScore", cpuScore);
    }
    playRound(playerIndex, cpuIndex);
    // do{
    //   if(playerScore===5){
    //     alert('player won')
    //   }

    // } while (playerScore || cpuScore ===5)
  };
  useEffect(() => {
    if (playerScore === 5) {
      // alert("PLAYER WINN");
      setWinner(true);
      setWinnerName("PLAYER");
      setPlayerScore(null);
      setCpuScore(null);
      setDisable(false)
      
      return;
    } else if (cpuScore === 5) {
      // alert("CPU WON");
      setWinner(true);
      setWinnerName("CPU");
      setPlayerScore(null);
      setCpuScore(null);
      setDisable(false)
      
      // let playerWin = document.getElementById('cpuWin')
      // playerWin.play()


      return;

    } 
    // let cpuWin = document.getElementById("cpuWin")
    // cpuWin.play()
  }, [cpuScore, playerScore]);

  // if(cpuScore===5){
  //   let cpuWin = document.getElementById('cpuWin')
  //     cpuWin.play()
  // }
  // if(playerScore===5){
  //   let cpuWin = document.getElementById('cpuWin')
  //     cpuWin.play()
  // }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="container">
      <Navbar />
      <div className="details">
        {/* <div className="box">
          <div className="scoreInfo">
            <div className="scoreCard">
              <div>{result}</div>
            </div>
          </div>
        </div> */}

        <div className="score-counter">
          <div className="player-counter">
            <div className="head">Player Score</div>
            <div className="score">{playerScore}</div>
          </div>
          <div className="cpu-counter">
            <div className="head">CPU &nbsp;Score</div>
            <div className="score">{cpuScore}</div>
          </div>
        </div>
      </div>

      <div className="body">
        {/* <div className="scoreCard">
          <div>
            icon
          </div>
        </div> */}

        <div className="selectionItems">
          {/* PLAYER  */}
          <div className="selection">
            <h2>Make Your Choice</h2>
          {disable===true? <>
              <div className="list">
                <button id="rock" onClick={() => playerAction(0)}>
                  <Rock />
                  <audio
                    id="audio"
                    src="https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3"
                  ></audio>
                </button>
              </div>
              <div className="list">
                <button id="paper" onClick={() => playerAction(1)}>
                  <Paper />
                </button>
              </div>
              <div className="list">
                <button id="scissior" onClick={() => playerAction(2)}>
                  <Scissior />
                </button>
              </div>
            </>:null}
           
          </div>
          {/* battlefield */}
          {winner ? (
            <div className="center-field">
              <div className="winner-name">
                {winnerName} <br /> is the Winner !
                <audio
                    id="cpuWin"
                    src="https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3"
                  ></audio>
              </div>
              <div className="reset-btn">
                <div className="reset-bttn">
                  <button onClick={reset}>PLAY &nbsp; AGAIN</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="center-field">
              {showChoice === true ? (
                <>
                  <div className="heading">BATTLE &nbsp;GROUND</div>
                  <div className="battleground">
                    <div className="area">
                      {rock === true ? (
                        <>
                          <div className="choiceR">
                            <Rock />
                          </div>
                          <div className="choice">ROCK</div>
                        </>
                      ) : null}
                      {paper === true ? (
                        <>
                          <div className="choiceP">
                            <Paper />
                          </div>
                          <div className="choice">PAPER</div>
                        </>
                      ) : null}
                      {scissior === true ? (
                        <>
                          <div className="choiceS">
                            <Scissior />
                          </div>
                          <div className="choice">SCISSIOR</div>
                        </>
                      ) : null}
                    </div>

                    <span style={{ color: "rgb(209, 83, 181)" }}>V / S</span>

                    <div className="area">
                      {" "}
                      {cpuRock === true ? (
                        <>
                          <div className="choiceR">
                            <Rock />
                          </div>
                          <div className="choice">ROCK</div>
                        </>
                      ) : null}
                      {cpuPaper === true ? (
                        <>
                          <div className="choiceP">
                            <Paper />
                          </div>
                          <div className="choice">PAPER</div>
                        </>
                      ) : null}
                      {cpuScissior === true ? (
                        <>
                          <div className="choiceS">
                            <Scissior />
                          </div>
                          <div className="choice">SCISSIOR</div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="heading">BATTLE &nbsp;GROUND</div>
                  <div className="battleground">WELCOME !</div>
                </>
              )}
              <>
                <div className="box">
                  <div className="scoreInfo">
                    <div className="scoreCard">
                      <div>{result}</div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          )}

          {/* CPU */}
          <div className="selection">
            <h2>C P U </h2>
            <div className="list">
              <button id="rock">
                <Rock />
              </button>
            </div>
            <div className="list">
              <button id="paper">
                <Paper />
              </button>
            </div>
            <div className="list">
              <button id="scissior">
                <Scissior />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="btmBody">
        <div className="reset">
          <button onClick={reset}>Restart</button>
        </div>
        <div className="reset">
          {showRules === false ? (
            <button className="rules" onClick={ruleImage}>
              Rules
            </button>
          ) : null}
        </div>
      </div>
      {showRules === true ? (
        // <div className="rule-div">
        //   <div className="resett">
        //     <div className="cancel-btn"><button className="ruless" onClick={() => setShowRules(false)}>
        //       Hide
        //     </button></div>

        //   </div>
        //   <span id="rule-image">
        //     <img src={rules} alt="" />
        //   </span>
        // </div>
        <div className="show-rule">
          <div className="cancel-btn">
            <button onClick={() => setShowRules(false)}>
              <Cancel />
            </button>
          </div>
          <div className="rule-desc">
            <img src={rules} alt="" />
            <br />
            <br />
            &#x2666; &nbsp; Rock beats Scissors. <br />
            <br />
            &#x2666; &nbsp; Paper beats Rock. <br />
            <br />
            &#x2666;&nbsp; Scissors beats Paper.
          </div>
        </div>
      ) : null}
      <div className="footer"></div>
    </div>
  );
};

export default Rps;
