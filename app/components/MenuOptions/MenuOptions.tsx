"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";
import style from "./style.module.scss";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";


interface MenuOptionsProps {
  startGameText: string;
  viewProfileText: string;
  logoutText: string;
  userId: string;
  onLogout: () => void;
  onStartGame: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({
  startGameText,
  viewProfileText,
  logoutText,
  onLogout,
  onStartGame,
}) => {
  const { language } = useLanguage();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const translations =
  language === "ro"
    ? roTranslations.register_form
    : enTranslations.register_form;

  const handleNavigation = (path: string) => {
    setIsExiting(true);

    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className={`${style.menuOptions} ${isExiting ? style.exit : ""}`}>
              <div className={style.logo}>
          <Image
            width={70}
            height={70}
            src="/svg/Logo-4.svg"
            alt="about us"
            className={style.logoImg}
          />
          <h1 className={style.logoName}>Trivia</h1>
          <h2 className={style.title}>{translations.title}</h2>
        </div>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={onStartGame}
      >
        {startGameText}
      </button>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={() => handleNavigation(`/userProfile`)}
      >
        {viewProfileText}
      </button>
      <button className={`${style.menuButton} btn btn-info`} onClick={onLogout}>
        {logoutText}
      </button>
    </div>
  );
};

export default MenuOptions;
