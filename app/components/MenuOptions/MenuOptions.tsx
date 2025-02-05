"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";

interface MenuOptionsProps {
  startGameText: string;
  viewProfileText: string;
  logoutText: string;
  userId: string;
  onLogout: () => void;
  onStartGame: () => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({
  startGameText,
  viewProfileText,
  logoutText,
  onLogout,
  onStartGame,
}) => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = (path: string) => {
    setIsExiting(true);

    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className={`${style.menuOptions} ${isExiting ? style.exit : ""}`}>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={onStartGame}
      >
        {startGameText}
      </button>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={() => handleNavigation(`/userProfile`)}
      >
        {viewProfileText}
      </button>
      <button className={`${style.menuButton} btn btn-info`} onClick={onLogout}>
        {logoutText}
      </button>
    </div>
  );
};

export default MenuOptions;
