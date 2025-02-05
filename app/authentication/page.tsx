"use client";

import { useState } from "react";
import Authentication from "../components/Authentication/Authentication";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Login from "../components/Login/Login";

export default function AuthenticationPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignUpClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleBack = () => {
    setShowRegisterForm(false);
    setShowLoginForm(false);
  };

  return (
    <div>
      {showRegisterForm ? (
        <RegisterForm onBack={handleBack} />
      ) : showLoginForm ? (
        <Login />
      ) : (
        <Authentication
          onSignUpClick={handleSignUpClick}
          onLoginClick={handleLoginClick}
        />
      )}
    </div>
  );
}
