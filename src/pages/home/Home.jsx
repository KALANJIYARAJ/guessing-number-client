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

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("username", JSON.stringify(name));
    navigate("/");
  };

  return (
    <form action="" onSubmit={(event) => handleSubmit(event)}>
      <div className="brand">
        <h1>Start New Game!!</h1>
      </div>
      <input
        type="text"
        placeholder="Enter your name"
        name="username"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">Start Game</button>
    </form>
  );
}

export default Home;
