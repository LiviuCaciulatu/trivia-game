import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";

const AuthSelection = ({ language }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select an option</h2>
      <button onClick={() => navigate('/signin')}>{language === "ro" ? "Inregistreaza-te" : "Sign in"}</button>
      <button onClick={() => navigate('/signup')}>{language === "ro" ? "Fa-ti cont" : "Sign up"}</button>
    </div>
  );
};

export default AuthSelection;


