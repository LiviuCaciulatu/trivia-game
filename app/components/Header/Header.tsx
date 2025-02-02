"use client";

import React from "react";
import style from "./Header.module.scss";
import Image from "next/image";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";

interface HeaderProps {
  language: string;
  isExiting?: boolean;
}

const Header: React.FC<HeaderProps> = ({ language, isExiting = false }) => {
  const translations = language === "ro"
    ? roTranslations.header
    : enTranslations.header;

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
      <div className={style.header}>
        <div className={style.logo}>
          <Image
            width={70}
            height={70}
            src="/svg/Logo-4.svg"
            alt="about us"
            className={style.logoImg}
          />
          <h1 className={style.logoName}>Trivia</h1>
        </div>
        <h2 className={style.welcome}>{translations.welcome_message}</h2>
        <h1 className={style.title}>{translations.title}</h1>
      </div>
    </div>
  );
};

export default Header;