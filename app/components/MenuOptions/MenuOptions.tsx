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
}

const MenuOptions: React.FC<MenuOptionsProps> = ({
  startGameText,
  viewProfileText,
  logoutText,
  onLogout,
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
        onClick={() => handleNavigation("/game")}
      >
        {startGameText}
      </button>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={() => handleNavigation(`/userProfile`)}
      >
        {viewProfileText}
      </button>
      <button
        className={`${style.menuButton} btn btn-info`}
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onLogout(), 500);
        }}
      >
        {logoutText}
      </button>
    </div>
  );
};

export default MenuOptions;
