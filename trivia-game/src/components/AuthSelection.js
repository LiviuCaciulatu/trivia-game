import React from "react";
import { useNavigate } from "react-router-dom";
import Translations from "../Translations";

const AuthSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select an option</h2>
      <button onClick={() => navigate('/signin')}>Sign In</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default AuthSelection;


