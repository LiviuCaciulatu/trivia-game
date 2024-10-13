import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";
import './AuthSelection.css';

const AuthSelection = ({ language }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="auth-button sign-in" onClick={() => navigate('/signin')}>
        {Translations[language].signIn}
      </button>
      <button className="auth-button sign-up" onClick={() => navigate('/signup')}>
        {Translations[language].signUp}
      </button>
    </div>
  );
};

export default AuthSelection;




