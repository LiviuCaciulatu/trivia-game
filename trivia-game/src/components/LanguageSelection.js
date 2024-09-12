import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";

function LanguageSelection({ onLanguageSelect }) {
  const navigate = useNavigate();

  const handleLanguageClick = (lang) => {
    onLanguageSelect(lang);
    navigate("/auth-selection");
  };

  return (
    <div>
      <h1>{Translations[localStorage.getItem("language") || "en"].selectLanguage}</h1>
      <button onClick={() => handleLanguageClick("en")}>
        {Translations["en"].english}
      </button>
      <button onClick={() => handleLanguageClick("ro")}>
        {Translations["ro"].romanian}
      </button>
    </div>
  );
}

export default LanguageSelection;

