"use client";
import React from 'react';
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import style from './style.module.scss';

import enTranslations from '../../locales/en/en.json';
import roTranslations from '../../locales/ro/ro.json';

const SelectLanguage: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const translations = language === 'ro' ? roTranslations.select_language : enTranslations.select_language;

  return (
    <div className={style.container}>
      <div className={style.selectLanguage}>
        <div className={style.selector}>
          <div className={`${style.logo}`}>
            <Image width={70} height={70} src="/svg/Logo-4.svg" alt="about us" className={style.logoImg} />
            <h1 className={`${style.logoName}`}>Trivia</h1>
          </div>
          <h2 className={style.title}>{translations.title}</h2>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`${style.btnEn} btn btn-info`}
          >
            {translations.language_en}
          </button>
          <button
            onClick={() => handleLanguageChange('ro')}
            className={`${style.btnRo} btn btn-info`}
          >
            {translations.language_ro}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguage;
