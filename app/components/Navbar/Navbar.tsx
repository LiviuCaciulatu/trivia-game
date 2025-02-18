"use client";

import React from "react";
import style from "./style.module.scss";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import { useRouter } from "next/navigation";
import { useGame } from "../../context/GameContext";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { language } = useLanguage();
  const translations =
    language === "ro" ? roTranslations.navbar : enTranslations.navbar;
  const router = useRouter();

  const { resetGame } = useGame();

  const restartGame = () => {
    resetGame();
    router.push("/game");
  };

  const { logout } = useUser();

  const logOut = () => {
    console.log("User logged out");

    logout();
    setTimeout(() => {
      router.push("/authentication");
    }, 500);
  };

  return (
    <div className={style.container}>
      <div className={`${style.drawer} drawer drawer-end`}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className={`${style.drawerContent} drawer-content`}>
          <div className={style.title}>Trivia</div>
          <label
            htmlFor="my-drawer"
            className={`${style.btn} btn btn-primary drawer-button`}
          >
            {translations.menu}
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className={`${style.menu} menu bg-base-200 text-base-content min-h-full w-80 p-4`}
          >
            <li>
              <a className={style.menuItem} onClick={restartGame}>
                {translations.newGame === "New Game"
                  ? "Restart Game"
                  : translations.newGame}
              </a>
            </li>
            <li>
              <a
                className={style.menuItem}
                onClick={() => router.push("/userProfile")}
              >
                {translations.yourProfile}
              </a>
            </li>
            <li>
              <a
                className={style.menuItem}
                onClick={() => router.push("/menu")}
              >
                {translations.quit}
              </a>
            </li>
            <li>
              <a className={style.menuItem} onClick={logOut}>
                {translations.logOut}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
