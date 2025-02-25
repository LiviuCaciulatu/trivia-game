"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import style from "./style.module.scss";
// import Navbar from "../components/Navbar/Navbar";
import { GameProvider } from "../context/GameContext";
import GameComponent from "../components/GameComponent/GameComponent";
import { useUser } from "../context/UserContext";

const Game = () => {
  const { user, fetchUserData, updateUserData } = useUser();
  const searchParams = useSearchParams();

  const selectedDifficulty = searchParams.get("difficulty") || "easy";

  useEffect(() => {
    if (!user) {
      const userId = "12345";
      fetchUserData(userId);
    }
  }, [user, fetchUserData]);

  const updateUserContext = (earnedPoints: number) => {
    if (user) {
      updateUserData(earnedPoints);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <GameProvider updateUserContext={updateUserContext} difficulty={selectedDifficulty}>
        {/* <Navbar /> */}
        <GameComponent />
      </GameProvider>
    </div>
  );
};

export default Game;
