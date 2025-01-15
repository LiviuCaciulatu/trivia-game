"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";
import Image from "next/image";

const europeanCountries = [
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kazakhstan",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "Vatican City",
];

const RegisterForm = () => {
  const { language } = useLanguage();

  const translations =
    language === "ro"
      ? roTranslations.register_form
      : enTranslations.register_form;

  const errorTranslations =
    language === "ro"
      ? roTranslations.error
      : enTranslations.error;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    country: "",
    points: 0,
    date_of_birth: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth,
    };

    try {
      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (res.status === 409) {
        setError(errorTranslations.username_exists);
        setTimeout(() => setError(null), 5000);
        return;
      }

      if (!res.ok) {
        setError(errorTranslations.generic);
        setTimeout(() => setError(null), 5000);
        return;
      }

      const data = await res.json();

      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        country: "",
        points: 0,
        date_of_birth: "",
      });

    } catch (error) {
      setError(errorTranslations.generic);
      setTimeout(() => setError(null), 4000);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleClick = () => {
      setError(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.register}>
        <div className={style.logo}>
          <Image
            width={70}
            height={70}
            src="/svg/Logo-4.svg"
            alt="about us"
            className={style.logoImg}
          />
          <h1 className={style.logoName}>Trivia</h1>
          <h2 className={style.title}>{translations.title}</h2>
        </div>
        <form onSubmit={handleSubmit} className={style.sign}>
          <input
            name="first_name"
            placeholder={translations.first_name}
            value={formData.first_name}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <input
            name="last_name"
            placeholder={translations.last_name}
            value={formData.last_name}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <input
            name="username"
            placeholder={translations.username}
            value={formData.username}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <input
            name="password"
            type="password"
            placeholder={translations.password}
            value={formData.password}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className={`${style.selectField} select select-bordered w-full max-w-xs`}
          >
            <option value="" disabled>
              Select your country
            </option>
            {europeanCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <input
            name="date_of_birth"
            type="date"
            placeholder={translations.date_of_birth}
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
        </form>
          <div className="submitButtonWrapper">
            <button
              type="button"
              className={`${style.submitButton} btn btn-info`}
              onClick={handleSubmit}
            >
              {translations.register}
            </button>
          </div>
        {error && (
          <div role="alert" className={`${style.alert} alert alert-error mt-4`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
