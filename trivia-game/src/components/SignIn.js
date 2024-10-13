import React, { useState } from "react";
import "./SignIn.css";
import Translations from "../Translations";

const SignIn = ({ onLoginSuccess, language }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(username, data.points);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(Translations[language].error || "Error during sign-in.");
    }
  };

  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">{Translations[language].signIn}</h2>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="sign-in-input"
          placeholder={Translations[language].usernamePlaceholder || "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="sign-in-input"
          placeholder={Translations[language].passwordPlaceholder || "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="sign-in-button">
          {Translations[language].signIn}
        </button>
      </form>
      {message && <p className="sign-in-message">{message}</p>}
    </div>
  );
};

export default SignIn;
