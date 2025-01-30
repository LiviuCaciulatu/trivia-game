"use client";

import { useState } from "react";
import Authentication from "../components/Authentication/Authentication";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Login from "../components/Login/Login";
import TriviaMap from "../components/TriviaMap/TriviaMap";

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

  return (
    <div>
      {showRegisterForm ? (
        <RegisterForm />
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
