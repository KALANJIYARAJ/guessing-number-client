import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game/Game";
import Home from "./pages/home/Home";
import ScoreBoard from "./pages/scoreBoard/ScoreBoard";

function App() {
  return (
    <div className="parent-div">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/login" element={<Home />} />
          <Route path="/score-board" element={<ScoreBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
