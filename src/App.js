import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game/Game";
import Home from "./pages/home/Home";
import ScoreBoard from "./pages/scoreBoard/ScoreBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/login" element={<Home />} />
        <Route path="/score-board" element={<ScoreBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
