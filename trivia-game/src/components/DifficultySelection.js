import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";
import "./DifficultySelection.css"; // Ensure to import the CSS file

const DifficultySelection = ({ selectDifficulty, language }) => {
  const navigate = useNavigate();

  const handleDifficultySelect = (level) => {
    selectDifficulty(level);
    navigate("/game");
  };

  return (
    <div className="difficulty-selection-container">
      <h2 className="difficulty-selection-title">
        {Translations[language].difficulty}
      </h2>
      <div className="difficulty-buttons">
        <button
          className="difficulty-button"
          onClick={() => handleDifficultySelect("novice")}
        >
          {Translations[language].easy || "Easy"}
        </button>
        <button
          className="difficulty-button"
          onClick={() => handleDifficultySelect("intermediate")}
        >
          {Translations[language].intermediate || "Intermediate"}
        </button>
        <button
          className="difficulty-button"
          onClick={() => handleDifficultySelect("hard")}
        >
          {Translations[language].hard || "Hard"}
        </button>
      </div>
    </div>
  );
};

export default DifficultySelection;



