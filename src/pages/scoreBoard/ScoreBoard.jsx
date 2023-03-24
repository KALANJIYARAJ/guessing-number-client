import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ScoreBoard.css";
import axios from "axios";

function ScoreBoard() {
  //variabe declaration
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  //for login check
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    } else {
      getScores();
    }
  }, []);

  //get scores
  const getScores = async () => {
    const { data } = await axios.get(
      `https://guessing-number-server.onrender.com/api/score/get`
    );
    setScores(data);
  };
  return (
    <div className="score-wrapper">
      <div className="score-headDiv">ScoreBoard</div>

      <table className="score-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date&Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => {
            return (
              <tr key={index}>
                <td>{score.username}</td>
                <td>{score.createdAt}</td>
                <td>{score.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link className="link-tag" to={"/"}>
        Back to Game
      </Link>
    </div>
  );
}

export default ScoreBoard;
