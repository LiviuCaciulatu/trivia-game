import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import Translations from "../Translations";
import useTimer from './useTimer'; // Ensure correct import path

const Game = ({ initialPoints, username, difficulty, language, onSignOut, isSignedIn }) => {
  const [points, setPoints] = useState(initialPoints);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isQuestionProcessed, setIsQuestionProcessed] = useState(false);
  const [usedCountries, setUsedCountries] = useState([]);

  const navigate = useNavigate();
  const t = Translations[language] || Translations.en; // Fallback to English if language is not defined
  const { timeLeft, startTimer, stopTimer } = useTimer();

  const countryName = selectedCountry?.country || "Unknown";
  const capitalName = selectedCountry?.capital || "Unknown";
  
  // Fetch and load countries from the database
  const fetchCountriesFromDB = async () => {
    try {
      const response = await fetch("http://localhost:5000/countries");
      if (!response.ok) throw new Error("Network response was not ok");
      const countries = await response.json();
      return countries.map(({ country, capital }) => ({
        country,
        capital,
      }));
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  };

  const loadCountries = async () => {
    const fetchedCountries = await fetchCountriesFromDB();
    setCountries(fetchedCountries);
    loadNewQuestion(fetchedCountries, []); // Start the game with the first question
  };
  
  // Utility Functions
  const getRandomCountry = (allCountries, usedCountries) => {
    const unusedCountries = allCountries.filter(
      (country) => !usedCountries.includes(country.country)
    );
    return unusedCountries[Math.floor(Math.random() * unusedCountries.length)];
  };


  const loadNewQuestion = (allCountries, usedCountries) => {
    setIsQuestionProcessed(false); // Reset question processing state

    // If all countries are used, show message and stop timer
    if (usedCountries.length === allCountries.length) {
      setMessage(t.congrats); // Game over, no more countries
      stopTimer();
      return;
    }
    
    const correctCountry = getRandomCountry(allCountries, usedCountries);
    if (!correctCountry) {
      setMessage(t.noMoreQuestions);
      return;
    }

    setSelectedCountry(correctCountry);
    
    const questionType = Math.random() > 0.5 ? 'trueFalse' : 'multipleChoice';
    generateQuestion(questionType, allCountries, correctCountry);
  };
  
  const generateQuestion = (type, allCountries, correctCountry) => {
    stopTimer(); // Ensure previous timer stops
    let timerDuration = 0; // Default timer duration

    if (difficulty === "intermediate") {
      timerDuration = 10; // 10 seconds for intermediate
    } else if (difficulty === "hard") {
      timerDuration = 5; // 5 seconds for hard
    }

    // Start timer only if duration is set (not easy)
    if (timerDuration > 0) {
      startTimer(timerDuration);
    }

    if (type === 'trueFalse') {
      const isCorrect = Math.random() > 0.5;
      const displayedCapital = isCorrect
        ? correctCountry.capital
        : getWrongCapital(allCountries, correctCountry);
      
      setOptions([t.true, t.false]);
      setMessage("");
      setSelectedCountry({ country: correctCountry.country, capital: displayedCapital });
    } else {
      const wrongCapitals = getWrongCapitals(allCountries, correctCountry, 3);
      const allOptions = shuffleArray([...wrongCapitals, correctCountry.capital]);
      
      setOptions(allOptions);
      setMessage("");
      setSelectedCountry(correctCountry);
    }
  };

  // Handle time expiration
  const handleTimeExpired = () => {
    if (!selectedCountry || isQuestionProcessed) return; // Prevent duplicate processing
    setIsQuestionProcessed(true); // Mark question as processed

    const actualCapital = countries.find(
      (c) => c.country === selectedCountry.country
    ).capital;

    // Handle wrong answer
    handleWrongAnswer(actualCapital, selectedCountry);
  };

  // UseEffect to monitor timeLeft and trigger expiration handling
  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeExpired();
    }
  }, [timeLeft]);

  // Handle correct answer logic
  const handleCorrectAnswer = async () => {
    if (isQuestionProcessed) return; // Prevent duplicate processing
    setIsQuestionProcessed(true); // Mark the question as processed

    const newPoints = points + 1;
    setPoints(newPoints);

    try {
      await fetch("http://localhost:5000/update-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, points: newPoints }),
      });

      setTimeout(() => {
        setUsedCountries((prevUsed) => {
          const newUsedCountries = [...prevUsed, selectedCountry.country];
          loadNewQuestion(countries, newUsedCountries); // Load next question
          return newUsedCountries;
        });
      }, 3000);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  // Handle wrong answer logic
  const handleWrongAnswer = (actualCapital, selectedCountry) => {
    setMessage(
      t.incorrectTrueFalse
        .replace("{answer}", selectedCountry.capital === actualCapital ? t.true : t.false)
        .replace("{capital}", actualCapital)
        .replace("{country}", selectedCountry.country)
    );

    setTimeout(() => {
      loadNewQuestion(countries, [...usedCountries, selectedCountry.country]); // Load new question after a delay
    }, 3000);
  };

  // Handle option click
  const handleOptionClick = (option) => {
    stopTimer(); // Stop timer on option click

    if (!selectedCountry || !option) return;

    const actualCapital = countries.find(
      (c) => c.country === selectedCountry.country
    ).capital;

    const isCorrect = (option === selectedCountry.capital || 
                      (option === t.true && selectedCountry.capital === actualCapital) || 
                      (option === t.false && selectedCountry.capital !== actualCapital));

    if (isCorrect) {
      setMessage(t.good);
      handleCorrectAnswer();
    } else {
      handleWrongAnswer(actualCapital, selectedCountry);
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      loadCountries();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);


  const getWrongCapital = (allCountries, correctCountry) => {
    const wrongCapitals = allCountries
      .filter((c) => c.country !== correctCountry.country)
      .map((c) => c.capital);
    return wrongCapitals[Math.floor(Math.random() * wrongCapitals.length)];
  };

  const getWrongCapitals = (allCountries, correctCountry, num) => {
    const wrongCapitals = allCountries
      .filter((c) => c.country !== correctCountry.country)
      .map((c) => c.capital);
    const shuffled = shuffleArray(wrongCapitals);
    return shuffled.slice(0, num);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Render the component
  return (
    <div className="game-container">
      <div className="game-info">
        <h2 className="user">{username}</h2>
        <h3 className="points">{points}</h3>
      {/* Display timer only for intermediate and hard difficulty */}
      {(difficulty === "intermediate" || difficulty === "hard") && (
        <h3>
          {t.timeLeft}: {timeLeft} {t.seconds}
        </h3>
      )}
      </div>
      {message && <div className="message">{message}</div>}
      {selectedCountry && (
        <div className="question">
          <h2>{options.length === 2 ? t.trueOrFalse : t.guessCapital}</h2>
          <h3>
            {options.length === 2
              ? t.isCapital.replace("{capital}", capitalName).replace("{country}", countryName)
              : t.whatCapital.replace("{country}", countryName)}
          </h3>
          <div className="options">
            {options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => navigate("/select-difficulty")}>{t.exitGame}</button>
      <button onClick={() => {
        onSignOut();
        navigate("/select-language");
      }}>{t.signOut}</button>
    </div>
  );
};

export default Game;
