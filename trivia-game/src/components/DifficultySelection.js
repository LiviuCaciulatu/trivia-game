import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";

const DifficultySelection = ({ selectDifficulty, language }) => {
  const navigate = useNavigate();

  const handleDifficultySelect = (level) => {
    selectDifficulty(level);
    navigate("/game");
  };

  return (
    <div>
      <h2>{Translations[language].difficulty}</h2>
      <button onClick={() => handleDifficultySelect("novice")}>
        {Translations[language].easy || "Easy"}
      </button>
      <button onClick={() => handleDifficultySelect("intermediate")}>
        {Translations[language].intermediate || "Intermediate"}
      </button>
      <button onClick={() => handleDifficultySelect("hard")}>
        {Translations[language].hard || "Hard"}
      </button>
    </div>
  );
};

export default DifficultySelection;


