"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";

interface GameOptionsProps {
  onBack: () => void;
  onDifficultySelect: (difficulty: string) => void;
}

const GameOptions: React.FC<GameOptionsProps> = ({ onBack, onDifficultySelect }) => {
  const { language } = useLanguage();
  const translations = language === "ro" ? roTranslations.gameOptions : enTranslations.gameOptions;

  const difficultyOptions = [
    { key: "easy", label: translations.easy },
    { key: "medium", label: translations.medium },
    { key: "hard", label: translations.hard },
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedDifficultyLabel, setSelectedDifficultyLabel] = useState(translations.easy);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  const handleDifficultyChange = (difficultyKey: string, difficultyLabel: string) => {
    console.log("Difficulty selected:", difficultyKey);
    setSelectedDifficulty(difficultyKey); 
    setSelectedDifficultyLabel(difficultyLabel);
    onDifficultySelect(difficultyKey);
    setIsDropdownOpen(false);
  };

  const handleStartButtonClick = () => {
    if (!selectedDifficulty) {
      setError(translations.errorSelectDifficulty);
    } else {
      setError("");
      handleNavigation(`/game?difficulty=${selectedDifficulty}`);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={style.container}>
      {error && (
        <div role="alert" className={`${style.alert} alert alert-error mt-4`}>
          <span>{error}</span>
        </div>
      )}
      <div className={style.difficulty}>
        <div className={`${style.difficultySelector} dropdown dropdown-right`}>
          <div className={style.difficultyTitle}>{translations.selectDifficulty}: </div>
          <div
            tabIndex={0}
            role="button"
            className={`${style.dropBtn} btn m-1`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedDifficultyLabel}
          </div>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className={`${style.dropdownContent} dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow`}
            >
              {difficultyOptions.map((option) => (
                <li key={option.key}>
                  <a
                    className={style.dropdownOption}
                    onClick={() => handleDifficultyChange(option.key, option.label)}
                  >
                    {option.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className={`${style.backButton} btn btn-info`} onClick={handleStartButtonClick}>
        {translations.startGame}
      </button>

      <button className={`${style.backButton} btn btn-info`} onClick={onBack}>
        {translations.back}
      </button>
    </div>
  );
};

export default GameOptions;
