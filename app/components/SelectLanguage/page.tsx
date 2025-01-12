"use client"
import React from 'react';
import style from './style.module.scss';
import { useLanguage } from '../../context/LanguageContext';

const SelectLanguage: React.FC = () => {
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    console.log(lang)
  };

  return (
    <div className={style.container}>
      <div className={style.selectLanguage}>
        <div className={style.selector}>
          <h2 className={style.title}>Select Language</h2>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`${style.btnEn} btn btn-info`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('ro')}
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
