"use client";

import React  from "react";
import Timer from '../components/Timer/Timer'
// import { useState, useEffect } from "react";
// import { useUser } from "../context/UserContext";
// import { useLanguage } from "../context/LanguageContext";
import style from "./style.module.scss";
import Navbar from "../components/Navbar/Navbar";
import { GameProvider } from "../context/GameContext";
import GameComponent from "../components/GameComponent/GameComponent";

const Game = () =>{

    // const { user, logout } = useUser();
    // const { language } = useLanguage();
    // const [translations, setTranslations] = useState(enTranslations.game);

    // useEffect(() => {
    //     setTranslations(language === "ro" ? roTranslations.menu : enTranslations.menu);
    //   }, [language]);

    return(
        <div className={`${style.container}`}>
            <Navbar />
            <Timer />
            <GameProvider>
                <GameComponent />
            </GameProvider>
        </div>
    )
}

export default Game;