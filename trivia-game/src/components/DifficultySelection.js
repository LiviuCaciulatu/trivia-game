import React from "react";
import { useNavigate } from "react-router-dom";

const DifficultySelection = ({ selectDifficulty }) => {
  const navigate = useNavigate();

  const handleDifficultySelect = (level) => {
    selectDifficulty(level);
    navigate("/game");
  };

  return (
    <div>
      <h2>Select Difficulty</h2>
      <button onClick={() => handleDifficultySelect("novice")}>Novice</button>
      <button onClick={() => handleDifficultySelect("intermediate")}>Intermediate</button>
      <button onClick={() => handleDifficultySelect("hard")}>Hard</button>
    </div>
  );
};

export default DifficultySelection;

