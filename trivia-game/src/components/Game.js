import React, { useState, useEffect, useRef } from "react";
import "./Game.css";

const fetchCountriesRoFull = async () => {
  try {
    const response = await fetch("/CountriesEN.txt");
    const text = await response.text();

    const countries = text
      .split("\r\n\r\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
    const formattedCountries = countries.map((pair) => {
      const [country, capital] = pair.split(",").map((item) => item.trim());
      return { country, capital };
    });
    return formattedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

const getRandomCountry = (countries, usedCountries) => {
  const unusedCountries = countries.filter(
    (country) => !usedCountries.includes(country)
  );
  const randomIndex = Math.floor(Math.random() * unusedCountries.length);
  return unusedCountries[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Game = ({ initialPoints, username, difficulty }) => {
  const [points, setPoints] = useState(initialPoints)
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeleft] = useState(0);
  const timerRef = useRef(null)
  const [usedCountries, setUsedCountries] = useState([]);
  const [isTrueFalse, setIsTrueFalse] = useState(false);

  const loadCountries = async () => {
    const fetchedCountries = await fetchCountriesRoFull();
    setCountries(fetchedCountries);
    loadNewQuestion(fetchedCountries, []);
  };

  const loadNewQuestion = (allCountries, usedCountries) => {
    if (usedCountries.length === allCountries.length) {
      setMessage("Great job! You've answered all the questions!");
      return;
    }

    const questionType = Math.random() > 0.5;

    if (questionType) {
      generateTrueFalseQuestion(allCountries, usedCountries);
    } else {
      generateMultipleChoiceQuestion(allCountries, usedCountries);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const generateTrueFalseQuestion = (allCountries, usedCountries) => {
    const correctCountry = getRandomCountry(allCountries, usedCountries);
    const isCorrect = Math.random() > 0.5;

    const displayedCapital = isCorrect
      ? correctCountry.capital
      : getRandomCountry(allCountries, usedCountries).capital;

    setSelectedCountry({
      country: correctCountry.country,
      capital: displayedCapital,
    });
    setOptions(["True", "False"]);
    setIsTrueFalse(true);
    setMessage("");
    stopTimmer();
    startTimer();
  };

  const generateMultipleChoiceQuestion = (allCountries, usedCountries) => {
    const correctCountry = getRandomCountry(allCountries, usedCountries);
    const incorrectOptions = new Set();

    while (incorrectOptions.size < 3) {
      const randomCountry = getRandomCountry(allCountries, usedCountries);
      if (randomCountry.capital !== correctCountry.capital) {
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
    stopTimmer();
    startTimer();
  };

  const handleCorrectAnswer = async () => {
    setPoints(points + 1);

    try {
      await fetch("http://localhost:5000/update-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, points: 1 }),
      });
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  const handleOptionClick = (option) => {
    stopTimmer();

    if (isTrueFalse) {
      const actualCapital = countries.find(
        (c) => c.country === selectedCountry.country
      ).capital;
      const isCorrect =
        (option === "True" && selectedCountry.capital === actualCapital) ||
        (option === "False" && selectedCountry.capital !== actualCapital);

      if (isCorrect) {
        setMessage("Good!");
        handleCorrectAnswer();
      } else {
        setMessage(
          `Incorrect. The correct answer is ${
            selectedCountry.capital === actualCapital ? "True" : "False"
          }. ${actualCapital} is the capital of ${selectedCountry.country}.`
        );
      }
    } else {
      if (option === selectedCountry.capital) {
        setMessage("Good!");
        handleCorrectAnswer();
      } else {
        setMessage(
          `Incorrect. The capital of ${selectedCountry.country} is ${selectedCountry.capital}.`
        );
      }
    }

    setTimeout(() => {
      setUsedCountries((prevUsed) => {
        const newUsedCountries = [...prevUsed, selectedCountry];
        loadNewQuestion(countries, newUsedCountries);
        return newUsedCountries;
      });
    }, 2000);
  };

  const startTimer = () =>{
    let duration = 0;
    if(difficulty === "intermediate"){
      duration = 10;
    } else if (difficulty === "hard"){
      duration = 5;
    }

    if (duration>0){
      setTimeleft(duration);
      timerRef.current = setInterval(()=>{
        setTimeleft((prevTime)=>{
          if (prevTime===1){
            clearInterval(timerRef.current);
            handleOptionClick(null);
            return 0;
          }
          return prevTime - 1;
        })
      },1000)
    }
  }

  const stopTimmer = () =>{
    clearInterval(timerRef.current);
  }

return (
  <div className="game-container">
    <h1>Trivia Game</h1>
    <h3>Player: {username}</h3>
    <h3>Points: {points}</h3>

    {difficulty !== "novice" && (
      <h4>Time left: {timeLeft} seconds</h4>
    )}

    {selectedCountry && usedCountries.length < countries.length ? (
      <div>
        <h2>{isTrueFalse ? "True or False!" : "Guess the Capital!"}</h2>
        <p>
          {isTrueFalse
            ? `Is ${selectedCountry.capital} the capital of ${selectedCountry.country}?`
            : `What is the capital of ${selectedCountry.country}?`}
        </p>
        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="option-button"
              disabled={message !== ""}
            >
              {option}
            </button>
          ))}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    ) : (
      <p className="message">{message}</p>
    )}
  </div>
);
};

export default Game;