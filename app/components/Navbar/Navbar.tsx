"use client";

import React from "react";
import style from "./style.module.scss";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";

const Navbar = () => {
  const { language } = useLanguage();
  const translations =
  language === "ro" ? roTranslations.navbar : enTranslations.navbar;


  return (
    <div className={style.container}>
      <div className={`${style.drawer} drawer`}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className={`${style.drawerContent} drawer-content`}>
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            {translations.menu}
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className={`${style.menu} menu bg-base-200 text-base-content min-h-full w-80 p-4`}>
            <li> 
              <a className={style.menuItem}>{translations.newGame}</a>
            </li>
            <li> 
              <a className={style.menuItem}>{translations.yourProfile}</a>
            </li>
            <li>
              <a className={style.menuItem}>{translations.quit}</a>
            </li>
            <li> 
              <a className={style.menuItem}>{translations.logOut}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
