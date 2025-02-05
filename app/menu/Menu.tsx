"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLanguage } from "../context/LanguageContext";
import style from "./style.module.scss";
import enTranslations from "../locales/en/en.json";
import roTranslations from "../locales/ro/ro.json";
import Header from "../components/Header/Header";
import MenuOptions from "../components/MenuOptions/MenuOptions";
import GameOptions from "../components/GameOptions/GameOptions";

const Menu = () => {
  const { user, logout } = useUser();
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(enTranslations.menu);
  const [isExiting, setIsExiting] = useState(false);
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Easy");

  useEffect(() => {
    setTranslations(language === "ro" ? roTranslations.menu : enTranslations.menu);
  }, [language]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    setIsExiting(true);

    setTimeout(() => {
      logout();
    }, 500);
  };

  const handleStartGame = () => {
    setShowGameOptions(true);
  };

  const handleBackToMenu = () => {
    setShowGameOptions(false);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    console.log("Selected difficulty:", difficulty);
  };

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
      <div className={style.menu}>
        <Header language={language || "en"} />
        {showGameOptions ? (
          <GameOptions onBack={handleBackToMenu} onDifficultySelect={handleDifficultySelect} />
        ) : (
          <MenuOptions
            startGameText={translations.startGame}
            viewProfileText={translations.viewProfile}
            logoutText={translations.logout}
            userId={user.id}
            onLogout={handleLogout}
            onStartGame={handleStartGame}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
