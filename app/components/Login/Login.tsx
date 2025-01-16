"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";
import Image from "next/image";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { language } = useLanguage();

  const translations =
    language === "ro"
      ? roTranslations.login_form
      : enTranslations.login_form;

  const errorLoginTranslations =
    language === "ro"
      ? roTranslations.error
      : enTranslations.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("Login successful!");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
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
        <form onSubmit={handleSubmit} className={style.loginForm}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered flex items-center gap-2`}
          />
          <button type="submit" className={`${style.submitButton} btn btn-info`}>
          {translations.login}
          </button>
          {error && <div className={style.error}>{error}</div>}
          {success && <div className={style.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;