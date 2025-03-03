"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import enTranslations from "../../locales/en/en.json";
import roTranslations from "../../locales/ro/ro.json";
import style from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const { language } = useLanguage();
  const { fetchUserData } = useUser();
  const router = useRouter();

  const translations =
    language === "ro" ? roTranslations.login_form : enTranslations.login_form;

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
        if (data.error === "Invalid username or password") {
          setError("Wrong username or password");
        } else {
          setError(data.error);
        }
        setTimeout(() => setError(null), 5000);
      } else {
        setSuccess("Login successful!");
        await fetchUserData(data.user.id);

        setIsExiting(true);

        setTimeout(() => {
          router.push("/menu");
        }, 300);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className={`${style.container} ${isExiting ? style.exit : ""}`}>
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
            placeholder={translations.username}
            value={formData.username}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered`}
          />
          <input
            type="password"
            name="password"
            placeholder={translations.password}
            value={formData.password}
            onChange={handleChange}
            required
            className={`${style.inputField} input input-bordered`}
          />
          <button type="submit" className={`${style.submitButton} btn btn-info`}>
            {translations.login}
          </button>
          <button
              type="button"
              onClick={onBack}
              className={`${style.backButton} btn btn-info`}
            >
              {translations.back}
            </button>

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

          {success && <div className={style.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
