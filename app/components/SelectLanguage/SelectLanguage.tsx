"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./style.module.scss";
import enTranslations from "../../locales/en/en.json";

interface SelectLanguageProps {
  onSelectLanguage: (lang: string) => void;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  onSelectLanguage,
}) => {
  const translations = enTranslations.select_language;
  const [isExiting, setIsExiting] = useState(false);

  const handleLanguageSelect = (lang: string) => {
    setIsExiting(true);

    setTimeout(() => {
      onSelectLanguage(lang);
    }, 500);
  };

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
      <div className={style.selectLanguage}>
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
          <div className={style.menu}>
            <h2 className={style.title}>{translations.title}</h2>
            <button
              onClick={() => handleLanguageSelect("en")}
              className={`${style.btnEn} btn btn-info`}
            >
              {translations.language_en}
            </button>
            <button
              onClick={() => handleLanguageSelect("ro")}
              className={`${style.btnRo} btn btn-info`}
            >
              {translations.language_ro}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguage;