"use client";

import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState<string | null>(null);

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

  const handleStartButtonClick = () => {
    if (selectedDifficulty === "Select Difficulty") {
      setError("Please select a difficulty before starting the game.");
    } else {
      setError("");
      handleNavigation("/game");
    }
  };

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(timer);
      }
    }, [error]);

  return (
    <div className={style.container}>
      {error && (
        <div role="alert" className={`${style.alert} alert alert-error mt-4`}>
          <span>{error}</span>
        </div>
      )}
      
      <div className={style.timer}>
        <div className={style.timerTitle}>Use Timer</div>
        <input
          type="checkbox"
          className={`${style.checkbox} toggle toggle-lg`}
          checked={useTimer}
          onChange={() => setUseTimer(!useTimer)}
        />
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
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Easy")}>
                  Easy
                </a>
              </li>
              <li>
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Medium")}>
                  Medium
                </a>
              </li>
              <li>
                <a className={style.dropdownOption} onClick={() => handleDifficultyChange("Hard")}>
                  Hard
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      
      <button
        className={`${style.backButton} btn btn-info`}
        onClick={handleStartButtonClick}
      >
        Start Game
      </button>
      
      <button className={`${style.backButton} btn btn-info`} onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default GameOptions;
