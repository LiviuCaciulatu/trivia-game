"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "../../context/UserContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";
import TopPlayers from "../TopPlayers/TopPlayers";

const Profile = () => {
  const { language } = useLanguage();
  const { user, fetchUserData } = useUser();
  const router = useRouter();

  const translations =
    language === "ro" ? roTranslations.profile : enTranslations.profile;

  useEffect(() => {
    if (!user) {
      const userId = "1";
      fetchUserData(userId);
    }
  }, [user, fetchUserData]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleBackClick = () => {
    router.push("/menu");
  };

  return (
    <div className={style.container}>
      <div className={style.userName}>
        Welcome {capitalizeFirstLetter(user.username)}
      </div>
      <div className={style.main}>
        <div className={style.subContainer}>
          <div className={style.title}>{translations.profileTitle}</div>
          <div className={style.dataContainer}>
            <div className={`${style.user} stats stats-vertical shadow`}>
              <div className={`${style.userData} stat`}>
                <div className={`${style.statTitle} stat-title`}>
                  {translations.username}
                </div>
                <div className={`${style.statValue} stat-value`}>
                  {capitalizeFirstLetter(user.username)}
                </div>
              </div>
              <div className={`${style.userData} stat`}>
                <div className={`${style.statTitle} stat-title`}>
                  {translations.age}
                </div>
                <div className={`${style.statValue} stat-value`}>
                  {user.age}
                </div>
              </div>
              <div className={`${style.userData} stat`}>
                <div className={`${style.statTitle} stat-title`}>
                  {translations.points}
                </div>
                <div className={`${style.statValue} stat-value`}>
                  {user.points}
                </div>
              </div>
              <div className={`${style.userData} stat`}>
                <div className={`${style.statTitle} stat-title`}>
                  {translations.country}
                </div>
                <div className={`${style.statValue} stat-value`}>
                  {user.country}
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightcontainer}>
            <TopPlayers />
          </div>
          <button
            className={`${style.backButton} btn btn-info`}
            onClick={handleBackClick}
          >
            {translations.backBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
