"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "../../context/UserContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";
import Image from "next/image";
import CountrySelect from "../CountrySelect";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  onBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const { fetchUserData } = useUser();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

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
    setError(null);

    try {
      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

      const loginRes = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!loginRes.ok) {
        setError(errorTranslations.generic);
        setTimeout(() => setError(null), 5000);
        return;
      }

      const loginData = await loginRes.json();
      await fetchUserData(loginData.user.id);

      setIsExiting(true);

      setTimeout(() => {
        router.push("/menu");
      }, 500);
    } catch {
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

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
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
          <CountrySelect
            value={formData.country}
            onChange={handleChange}
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <input
            name="date_of_birth"
            type="date"
            placeholder={translations.date_of_birth}
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <div className="submitButtonWrapper">
            <button
              type="submit"
              className={`${style.submitButton} btn btn-info`}
            >
              {translations.register}
            </button>
          </div>
            <button
              type="button"
              onClick={onBack}
              className={`${style.backButton} btn btn-info`}
            >
              {translations.back}
            </button>

        </form>
        {error && (
          <div role="alert" className={`${style.alert} alert alert-error mt-4`}>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
