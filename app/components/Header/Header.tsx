import React from 'react';
import style from './Header.module.scss';
import Image from 'next/image';
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";

interface HeaderProps {
  title: string;
  welcomeMessage: string;
  language: string; // Add language prop
}

const Header: React.FC<HeaderProps> = ({ title, welcomeMessage, language }) => {
  const translations = language === "ro"
    ? roTranslations.register_form
    : enTranslations.register_form;

  return (
    <div className={style.container}>
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
          <h2 className={style.title}>{translations.title}</h2>
        </div>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.welcome}>{welcomeMessage}</h2>
        </div>
    </div>
  );
};

export default Header;
