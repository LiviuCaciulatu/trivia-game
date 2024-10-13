import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";
import './LanguageSelection.css'; // Import the CSS file

function LanguageSelection({ onLanguageSelect }) {
  const navigate = useNavigate();

  const handleLanguageClick = (lang) => {
    onLanguageSelect(lang);
    navigate("/auth-selection");
  };

  return (
    <div>
      <h1>{Translations[localStorage.getItem("language") || "en"].selectLanguage}</h1>
      <button className="language-button english" onClick={() => handleLanguageClick("en")}>
        {Translations["en"].english}
      </button>
      <button className="language-button romanian" onClick={() => handleLanguageClick("ro")}>
        {Translations["ro"].romanian}
      </button>
    </div>
  );
}

export default LanguageSelection;


