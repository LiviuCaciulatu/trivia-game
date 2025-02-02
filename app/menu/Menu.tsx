"use client";

import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLanguage } from "../context/LanguageContext";
import style from "./style.module.scss";
import enTranslations from "../locales/en/en.json";
import roTranslations from "../locales/ro/ro.json";
import Header from "../components/Header/Header";
import MenuOptions from "../components/MenuOptions/MenuOptions";

const Menu = () => {
  const { user, logout } = useUser();
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(enTranslations.menu);
  const [isExiting, setIsExiting] = useState(false);

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

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
      <div className={style.menu}>
        <Header language={language || "en"} />
        <MenuOptions
          startGameText={translations.startGame}
          viewProfileText={translations.viewProfile}
          logoutText={translations.logout}
          userId={user.id}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Menu;
