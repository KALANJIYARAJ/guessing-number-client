import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Game.css";
import axios from "axios";

function Game() {
  //variabe declaration
  const navigate = useNavigate();
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [count, setCount] = useState(0);
  const [sysNumRes, setSysNumRes] = useState("");
  const [userNum, setUserNum] = useState(null);
  const [sysNum, setSysNum] = useState(null);
  const win = ["+", "+", "+", "+"];
  const [endGame, setEndGame] = useState({
    message: "",
    score: 0,
  });
  const [isEnd, setIsEnd] = useState(false);

  //for login check
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    } else {
      let randomNum = shuffleArray(numbers).slice(0, 4).join("").toString();
      setSysNum(randomNum);
      setCount(0);
    }
  }, []);

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (count === 10) {
      {
        setIsEnd(true);
        setEndGame({
          ...endGame,
          ["message"]: "you loss the game",
          ["score"]: 0,
        });
        setUserNum("");
        updateScore(0);
        let randomNum = shuffleArray(numbers).slice(0, 4).join("").toString();
        setSysNum(randomNum);
        setCount(0);
      }
    } else {
      let sysArr = sysNum.split("");
      let userArr = userNum.split("");

      // console.log(sysArr, userArr);

      //call result function
      const result2 = result(userArr, sysArr);
      setSysNumRes(result2.join(" ").toString());

      if (JSON.stringify(win) === JSON.stringify(result2)) {
        setIsEnd(true);
        setEndGame({
          ...endGame,
          ["message"]: "you won the game",
          ["score"]: 100 - count * 10,
        });
        setUserNum("");
        updateScore(100 - count * 10);
        let randomNum = shuffleArray(numbers).slice(0, 4).join("").toString();
        setSysNum(randomNum);
        setCount(0);
      } else {
        setCount(count + 1);
        setUserNum("");
      }
    }
  };

  //update-score
  const updateScore = async (scoreval) => {
    const value = {
      username: localStorage.getItem("username"),
      score: scoreval,
    };

    // console.log(value);

    const { username, score } = value;
    await axios.post(
      `https://guessing-number-server.onrender.com/api/score/create`,
      { username, score }
    );
  };

  //gameResult
  const result = (a, b) => {
    let ans = [];

    for (let i = 0; i < 4; i++) {
      if (a[i] === b[i]) {
        ans[i] = "+";
      } else {
        for (let j = 0; j < 4; j++) {
          if (a[i] === b[j]) {
            ans[i] = "-";
            break;
          } else {
            ans[i] = "*";
          }
        }
      }
    }
    return ans;
  };

  //random number generator
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //logout
  const logoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  console.log(sysNum);

  return (
    <>
      <div className="parent-div">
        <form
          className="game-form"
          action=""
          onSubmit={(event) => handleSubmit(event)}
        >
          <h1 className="game-head">Enter Your Number!!</h1>
          <input
            className="game-input"
            type="text"
            placeholder="Enter your number"
            name="username"
            value={userNum}
            onChange={(event) => setUserNum(event.target.value)}
          />
          <button type="submit">Start Game</button>

          {isEnd ? (
            <>
              <p>{`${endGame.message} and your score is:${endGame.score} `}</p>
            </>
          ) : null}
          <p>{`your try count is:${count} and result : [${sysNumRes}]`}</p>
        </form>

        <div>
          <Link className="link-tag game-btn" type="button" to={"/score-board"}>
            View Score Board
          </Link>

          <button className="game-btn" onClick={logoutClick}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Game;
