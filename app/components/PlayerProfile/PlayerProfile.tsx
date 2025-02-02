"use client";

import React from "react";
import { useUser } from "../../context/UserContext";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";

const Profile = () => {
  const { user } = useUser();
  const { language } = useLanguage();
  const router = useRouter();
  const translations =
    language === "ro" ? roTranslations.profile : enTranslations.profile;

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () =>{
    router.push("/menu")
  }

  return (
    <div className={style.container}>
      <div className={style.userName}>
        Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
      </div>
      <div className={style.title}>{translations.profileTitle}</div>
      <div className={style.subContainer}>
          <div className={`${style.user} stats stats-vertical shadow`}>
            <div className={`${style.userData} stat`}>
              <div className={`${style.statTitle} stat-title `}>{translations.first_name}</div>
              <div className={`${style.statValue} stat-value `}>{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}</div>
            </div>
            <div className={`${style.userData} stat`}>
              <div className={`${style.statTitle} stat-title `}>{translations.last_name}</div>
              <div className={`${style.statValue} stat-value `}>{user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</div>
            </div>
            <div className={`${style.userData} stat`}>
              <div className={`${style.statTitle} stat-title `}>{translations.age}</div>
              <div className={`${style.statValue} stat-value `}>{user.age}</div>
            </div>
            <div className={`${style.userData} stat`}>
              <div className={`${style.statTitle} stat-title `}>{translations.points}</div>
              <div className={`${style.statValue} stat-value `}>{user.points}</div>
            </div>
            <div className={`${style.userData} stat`}>
              <div className={`${style.statTitle} stat-title `}>{translations.country}</div>
              <div className={`${style.statValue} stat-value `}>{user.country}</div>
            </div>
        </div>
      </div>
      <button className={`${style.backButton} btn btn-info`} onClick={handleBackClick}>
        {translations.backBtn}
      </button>
    </div>
  );
};

export default Profile;
