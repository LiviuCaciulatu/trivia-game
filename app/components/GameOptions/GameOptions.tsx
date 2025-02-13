"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";
import { useTimerContext } from "@/app/context/TimerContext";

interface GameOptionsProps {
  onBack: () => void;
  onDifficultySelect: (difficulty: string) => void;
}

const GameOptions: React.FC<GameOptionsProps> = ({ onBack, onDifficultySelect }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Select Difficulty");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { useTimer, setUseTimer } = useTimerContext();

    const router = useRouter();
    const [isExiting, setIsExiting] = useState(false);
  
    const handleNavigation = (path: string) => {
      setIsExiting(true);
  
      setTimeout(() => {
        router.push(path);
      }, 500);
    };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onDifficultySelect(difficulty);
    setIsDropdownOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.timer}>
        <div className={style.timerTitle}>Use Timer</div>
        <input type="checkbox" className={`${style.checkbox} toggle toggle-lg`} checked={useTimer} onChange={()=>setUseTimer(!useTimer)} />
      </div>
      <div className={style.difficulty}>
        <div className={`${style.difficultySelector} dropdown`}>
          <div
            tabIndex={0}
            role="button"
            className={`${style.dropBtn} btn m-1`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedDifficulty}
          </div>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className={`${style.dropdownContent} dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow`}
            >
              <li>
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Easy")}>Easy</a>
              </li>
              <li>
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Medium")}>Medium</a>
              </li>
              <li>
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Hard")}>Hard</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <button className={`${style.backButton} btn btn-info`} onClick={() => handleNavigation("/game")} >Start Game</button>
      <button className={`${style.backButton} btn btn-info`} onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default GameOptions;
