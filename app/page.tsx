"use client";
import { useState } from "react";
import { useLanguage } from "./context/LanguageContext";
import SelectLanguage from "./components/SelectLanguage/page";
import Authentication from "./components/Authentication/page";
import RegisterForm from "./components/RegisterForm/page";

export default function Home() {
  const { language } = useLanguage();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSignUpClick = () => {
    setShowRegisterForm(true);
  };

  return (
    <div>
      {language !== 'en' && language !== 'ro' ? (
        <SelectLanguage />
      ) : showRegisterForm ? (
        <RegisterForm />
      ) : (
        <Authentication onSignUpClick={handleSignUpClick} />
      )}
    </div>
  );
}
