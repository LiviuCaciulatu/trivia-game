"use client";
import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import { useLanguage } from "../../context/LanguageContext";

const SelectLanguage: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className={style.container}>
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
          <h2 className={style.title}>Select Language</h2>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`${style.btnEn} btn btn-info`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("ro")}
            className={`${style.btnRo} btn btn-info`}
          >
            Romana
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguage;
