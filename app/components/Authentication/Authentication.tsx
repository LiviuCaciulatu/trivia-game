"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import style from "./style.module.scss";

import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";

interface AuthenticationProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onSignUpClick, onLoginClick }) => {
  const { language } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  const translations =
    language === "ro"
      ? roTranslations.authentication
      : enTranslations.authentication;

  const handleNavigation = (action: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      action();
    }, 500);
  };

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
      <div className={style.authentication}>
        <div className={style.selector}>
          <div className={`${style.logo}`}>
            <Image
              width={70}
              height={70}
              src="/svg/Logo-4.svg"
              alt="about us"
              className={style.logoImg}
            />
            <h1 className={`${style.logoName}`}>Trivia</h1>
          </div>
          <h2 className={style.title}>{translations.title}</h2>
          <button
            className={`${style.btnLogIn} btn btn-info`}
            onClick={() => handleNavigation(onLoginClick)}
          >
            {translations.login}
          </button>
          <button
            className={`${style.btnSignUp} btn btn-info`}
            onClick={() => handleNavigation(onSignUpClick)}
          >
            {translations.signup}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
