import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Game from "./components/Game";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DifficultySelection from "./components/DifficultySelection";
import LanguageSelection from "./components/LanguageSelection";
import AuthSelection from "./components/AuthSelection";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [points, setPoints] = useState(0);
    const [difficulty, setDifficulty] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

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

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    return (
        <Router>
            <div className="App">
                <div className="background">
                    <Header language={language} />
                    
                    {/* Fun Background Shapes */}
                    <div className="cloud cloud1"></div>
                    <div className="cloud cloud2"></div>
                    <div className="cloud cloud3"></div>
                    
                    
                    <Routes>
                        <Route
                            path="/"
                            element={
                                !language ? (
                                    <Navigate to="/select-language" />
                                ) : isSignedIn ? (
                                    difficulty ? (
                                        <Navigate to="/game" />
                                    ) : (
                                        <Navigate to="/select-difficulty" />
                                    )
                                ) : (
                                    <Navigate to="/auth-selection" />
                                )
                            }
                        />
                        <Route
                            path="/select-language"
                            element={<LanguageSelection onLanguageSelect={handleLanguageChange} />}
                        />
                        <Route
                            path="/auth-selection"
                            element={<AuthSelection language={language} />}
                        />
                        <Route
                            path="/game"
                            element={
                                isSignedIn && difficulty ? (
                                    <Game
                                        username={username}
                                        initialPoints={points}
                                        difficulty={difficulty}
                                        language={language}
                                        onSignOut={handleSignOut}
                                    />
                                ) : (
                                    <Navigate to="/select-difficulty" />
                                )
                            }
                        />
                        <Route
                            path="/select-difficulty"
                            element={
                                isSignedIn ? (
                                    <DifficultySelection selectDifficulty={selectDifficulty} language={language} />
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
                                    <SignIn onLoginSuccess={handleSignIn} language={language} />
                                )
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                isSignedIn ? (
                                    <Navigate to="/" />
                                ) : (
                                    <SignUp onSignUpSuccess={() => <Navigate to="/signin" />} language={language} />
                                )
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
