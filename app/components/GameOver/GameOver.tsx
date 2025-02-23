'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from "@/app/context/GameContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import style from './style.module.scss';

interface GameOverTranslations {
  gameOverTitle: string;
  yourGot: string;
  points: string;
  correct: string;
  wrong: string;
  retryGame: string;
  goToMenu: string;
}


const GameOver: React.FC = () => {
  const { correctAnswers, resetGame } = useGame(); 
  const router = useRouter();

  const { language } = useLanguage();
  
  const [translations, setTranslations] = useState<GameOverTranslations | null>(null);
  
  useEffect(() => {
    const loadTranslations = async () => {
      const translationsModule = language === "ro" 
        ? await import("../../locales/ro/ro.json")
        : await import("../../locales/en/en.json");

      setTranslations(translationsModule.gameOver);
    };
    
    loadTranslations();
  }, [language]);

  const totalQuestions = 20;
  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const wrongPercentage = 100 - correctPercentage;

  return (
    <div className={`${style.gameOver} flex flex-col items-center gap-6`}>
      <h2 className={`${style.gameOverTitle} text-2xl font-bold`}>
        {translations?.gameOverTitle}
      </h2>

      <h3 className={style.points}>
        {translations?.yourGot}: <span className={style.pointsNumber}>{correctAnswers} {translations?.points}</span>
      </h3>

      <div className={style.resultsContainer}>
        <div className={`${style.resultItem} flex flex-col items-center`}>
          <div
            className={`${style.rightProgress} radial-progress text-[#298F67]`}
            style={{ "--value": correctPercentage } as React.CSSProperties}
            role="progressbar"
          >
            {correctPercentage.toFixed(0)}%
          </div>
          <p className={`${style.rightTitle} mt-2 font-semibold`}>{translations?.correct}</p>
        </div>

        <div className={`${style.resultItem} flex flex-col items-center`}>
          <div
            className={`${style.wrongProgress} radial-progress text-[#fc4d1d]`}
            style={{ "--value": wrongPercentage } as React.CSSProperties}
            role="progressbar"
          >
            {wrongPercentage.toFixed(0)}%
          </div>
          <p className={`${style.wrongTitle} mt-2 font-semibold`}>{translations?.wrong}</p>

        </div>
      </div>

      <div className={style.btns}>
        <button
          className={`${style.btn} btn btn-info`}
          onClick={resetGame}
        >
          {translations?.retryGame}
        </button>
        <button
          className={`${style.btn} btn btn-info`}
          onClick={() => router.push("/menu")}
        >
          {translations?.goToMenu}
        </button>
      </div>
    </div>
  );
};

export default GameOver;
