import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [showSignInForm, setShowSignInForm] = useState(null);

  const handleSignIn = (username, initialPoints) => {
    setIsSignedIn(true);
    setUsername(username);
    setPoints(initialPoints);
  };

  const showSignIn = () => {
    setShowSignInForm(true);
  };

  const showSignUp = () => {
    setShowSignInForm(false);
  };

  const selectDifficulty = (level) =>{
    setDifficulty(level);
  }

  return (
    <div className="App">
      <Header />
      {isSignedIn ? (
        difficulty ? (
          <Game username={username} initialPoints={points} difficulty={difficulty} />
        ) : (
          <div>
            <h2>Select Difficulty</h2>
            <button onClick={() => selectDifficulty("novice")}>Novice</button>
            <button onClick={() => selectDifficulty("intermediate")}>Intermediate</button>
            <button onClick={() => selectDifficulty("hard")}>Hard</button>
          </div>
        )
      ) : (
        <div>
          {!showSignInForm && showSignInForm !== false ? (
            <div>
              <button onClick={showSignIn}>Sign In</button>
              <button onClick={showSignUp}>Sign Up</button>
            </div>
          ) : (
            <div>
              {showSignInForm ? (
                <SignIn onLoginSuccess={handleSignIn} />
              ) : (
                <SignUp onSignUpSuccess={showSignIn} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

