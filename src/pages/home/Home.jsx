import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/");
    }
  }, []);

  //handleChange
  const handleChange = (event) => {
    setName(event.target.value);
  };

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("username", JSON.stringify(name));
    navigate("/");
  };

  return (
    <div className="parent-div">
      <form
        className="game-form"
        action=""
        onSubmit={(event) => handleSubmit(event)}
      >
        <h1 className="game-head">Start New Game!!</h1>

        <input
          className="game-input"
          type="text"
          placeholder="Enter your name"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default Home;
