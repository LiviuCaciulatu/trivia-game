"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useLanguage } from "../context/LanguageContext";
import style from "./style.module.scss";
import enTranslations from "../locales/en/en.json";
import roTranslations from "../locales/ro/ro.json";

const Menu = () => {
  const { user, logout } = useUser();
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(enTranslations.menu);
  const [isClient, setIsClient] = useState(false); // Client-side check
  const router = useRouter();

  // Ensure that router.push only runs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setTranslations(language === "ro" ? roTranslations.menu : enTranslations.menu);
  }, [language]);

  if (!isClient) {
    return <div>Loading...</div>; // Wait until client-side
  }

  if (!user) {
    router.push("/login"); // Only runs on client side
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout(); // Call the logout function
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <h1 className={style.title}>{translations.title}</h1>
        <h2 className={style.welcome}>Welcome, {user.username}!</h2>

        <div className={style.menuOptions}>
          <button
            className={style.menuButton}
            onClick={() => router.push("/game")}
          >
            {translations.startGame}
          </button>

          <button
            className={style.menuButton}
            onClick={() => router.push(`/profile/${user.id}`)}
          >
            {translations.viewProfile}
          </button>

          <button
            className={style.menuButton}
            onClick={handleLogout} // Trigger logout
          >
            {translations.logout}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
