import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Game from "./components/Game";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DifficultySelection from "./components/DifficultySelection";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  const handleSignIn = (username, initialPoints) => {
    setIsSignedIn(true);
    setUsername(username);
    setPoints(initialPoints);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername("");
    setPoints(0);
    setDifficulty(null);
  };

  const selectDifficulty = (level) => {
    setDifficulty(level);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                difficulty ? (
                  <Navigate to="/game" />
                ) : (
                  <Navigate to="/select-difficulty" />
                )
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          
          <Route
            path="/game"
            element={
              isSignedIn && difficulty ? (
                <Game username={username} initialPoints={points} difficulty={difficulty} />
              ) : (
                <Navigate to="/select-difficulty" />
              )
            }
          />
          
          <Route
            path="/select-difficulty"
            element={
              isSignedIn ? (
                <DifficultySelection selectDifficulty={selectDifficulty} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isSignedIn ? (
                <Navigate to="/" />
              ) : (
                <SignIn onLoginSuccess={handleSignIn} />
              )
            }
          />

          <Route
            path="/signup"
            element={isSignedIn ? <Navigate to="/" /> : <SignUp onSignUpSuccess={() => <Navigate to="/signin" />} />}
          />
        </Routes>

        {isSignedIn && (
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;

