import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";
import Translations from "../Translations";

const Game = ({ initialPoints, username, difficulty, language, onSignOut, isSignedIn }) => {
  const [points, setPoints] = useState(initialPoints);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const [usedCountries, setUsedCountries] = useState([]);
  const [isTrueFalse, setIsTrueFalse] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const navigate = useNavigate();
  const t = Translations[language] || Translations.en;

  // Function to fetch countries from the database
  const fetchCountriesFromDB = async () => {
    try {
      const response = await fetch("http://localhost:5000/countries");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
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

  // Function to get a random country that hasn't been used yet
  const getRandomCountry = (countries, usedCountries) => {
    const unusedCountries = countries.filter(
      (country) => !usedCountries.includes(country.country)
    );
    if (unusedCountries.length === 0) return null; // Handle case when all countries are used
    const randomIndex = Math.floor(Math.random() * unusedCountries.length);
    return unusedCountries[randomIndex];
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Load countries and start the game
  const loadCountries = async () => {
    const fetchedCountries = await fetchCountriesFromDB();
    setCountries(fetchedCountries);
    loadNewQuestion(fetchedCountries, []);
  };

  // Load a new question
  const loadNewQuestion = (allCountries, usedCountries) => {
    if (usedCountries.length === allCountries.length) {
      setMessage(t.congrats);
      stopTimer();
      return;
    }
    const questionType = Math.random() > 0.5;
    const correctCountry = getRandomCountry(allCountries, usedCountries);

    if (correctCountry) {
      if (questionType) {
        generateTrueFalseQuestion(allCountries, usedCountries, correctCountry);
      } else {
        generateMultipleChoiceQuestion(allCountries, usedCountries, correctCountry);
      }
    }
  };

  // Effect to load countries on first render and reset timer on unmount
  useEffect(() => {
    if (isFirstLoad) {
      loadCountries();
      setIsFirstLoad(false);
    }
    return () => {
      stopTimer();
    };
  }, [isFirstLoad]);

  // Effect to reset used countries when the user signs in
  useEffect(() => {
    if (isSignedIn) {
      setUsedCountries([]); // Reset used countries
    }
  }, [isSignedIn]);

  // Generate a true/false question
  const generateTrueFalseQuestion = (allCountries, usedCountries, correctCountry) => {
    const isCorrect = Math.random() > 0.5;
    const displayedCapital = isCorrect
      ? correctCountry.capital
      : getRandomCountry(allCountries, usedCountries).capital;

    setSelectedCountry({
      country: correctCountry.country,
      capital: displayedCapital,
    });

    setOptions([t.true, t.false]);
    setIsTrueFalse(true);
    setMessage("");

    stopTimer();
    startTimer(); // Start the timer here after the question is set
  };

  // Generate a multiple-choice question
  const generateMultipleChoiceQuestion = (allCountries, usedCountries, correctCountry) => {
    const incorrectOptions = new Set();

    while (incorrectOptions.size < 3) {
      const randomCountry = getRandomCountry(allCountries, usedCountries);
      if (randomCountry && randomCountry.capital !== correctCountry.capital) {
        incorrectOptions.add(randomCountry.capital);
      }
    }

    const allOptions = shuffleArray([
      ...incorrectOptions,
      correctCountry.capital,
    ]);

    setSelectedCountry(correctCountry);
    setOptions(allOptions);
    setIsTrueFalse(false);
    setMessage("");

    stopTimer();
    startTimer(); // Start the timer here after the question is set
  };

  // Handle correct answers
  const handleCorrectAnswer = async () => {
    const newPoints = points + 1;
    setPoints(newPoints);

    try {
      await fetch("http://localhost:5000/update-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, points: newPoints }),
      });
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  // Handle time expiration
  const handleTimeExpired = () => {
    if (!selectedCountry) return;

    const actualCapital = countries.find(
      (c) => c.country === selectedCountry.country
    ).capital;

    setMessage(
      t.incorrectMCQ
        .replace("{capital}", selectedCountry.capital)
        .replace("{country}", selectedCountry.country)
    );

    setTimeout(() => {
      setUsedCountries((prevUsed) => {
        const newUsedCountries = [...prevUsed, selectedCountry.country]; // Add country name to used list
        loadNewQuestion(countries, newUsedCountries);
        return newUsedCountries;
      });
    }, 2000);
  };

  // Handle option click
  const handleOptionClick = (option) => {
    stopTimer();

    if (!selectedCountry || !option) return;

    if (isTrueFalse) {
      const actualCapital = countries.find(
        (c) => c.country === selectedCountry.country
      ).capital;

      const isCorrect =
        (option === t.true && selectedCountry.capital === actualCapital) ||
        (option === t.false && selectedCountry.capital !== actualCapital);

      if (isCorrect) {
        setMessage(t.good);
        handleCorrectAnswer();
      } else {
        setMessage(
          t.incorrectTrueFalse
            .replace("{answer}", selectedCountry.capital === actualCapital ? t.true : t.false)
            .replace("{capital}", actualCapital)
            .replace("{country}", selectedCountry.country)
        );
      }
    } else {
      if (option === selectedCountry.capital) {
        setMessage(t.good);
        handleCorrectAnswer();
      } else {
        setMessage(
          t.incorrectMCQ
            .replace("{capital}", selectedCountry.capital)
            .replace("{country}", selectedCountry.country)
        );
      }
    }

    setTimeout(() => {
      setUsedCountries((prevUsed) => {
        const newUsedCountries = [...prevUsed, selectedCountry.country];
        loadNewQuestion(countries, newUsedCountries);
        return newUsedCountries;
      });
    }, 2000);
  };

  const startTimer = () => {
    let duration = 0;
    if (difficulty === "intermediate") {
      duration = 10;
    } else if (difficulty === "hard") {
      duration = 5;
    }

    if (duration > 0) {
      setTimeLeft(duration);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            handleTimeExpired();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleExitGame = () => {
    stopTimer();
    setUsedCountries([]);
    navigate("/select-difficulty");
  };

  const handleSignOutClick = () => {
    stopTimer();
    setUsedCountries([]);
    onSignOut();
    navigate("/select-language");
  };

  return (
    <div className="game-container">
      <h1>{t.triviaGame}</h1>
      <h4>{`${t.points}: ${points}`}</h4>
      <h4>{`${t.timeLeft}: ${timeLeft} ${t.seconds}`}</h4>

      {selectedCountry && (
        <div>
          <h3>
            {isTrueFalse
              ? t.isCapital
                  .replace("{capital}", selectedCountry.capital)
                  .replace("{country}", selectedCountry.country)
              : t.whatCapital.replace("{country}", selectedCountry.country)}
          </h3>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <h3>{message}</h3>

      <button className="exit-button" onClick={handleExitGame}>
        {t.exitGame}
      </button>
      <button className="signout-button" onClick={handleSignOutClick}>
        {t.signOut}
      </button>
    </div>
  );
};

export default Game;
