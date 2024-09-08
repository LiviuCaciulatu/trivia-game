import React, { useState, useEffect } from "react";
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

const Game = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
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

    // Randomly decide between a True/False question and a multiple-choice question
    const questionType = Math.random() > 0.5; // 50% chance for each type of question

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
    const isCorrect = Math.random() > 0.5; // 50% chance the statement is true

    // If true, show correct capital; if false, show a random incorrect capital
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
  };

  const handleOptionClick = (option) => {
    if (isTrueFalse) {
      const actualCapital = countries.find(
        (c) => c.country === selectedCountry.country
      ).capital;
      const isCorrect =
        (option === "True" && selectedCountry.capital === actualCapital) ||
        (option === "False" && selectedCountry.capital !== actualCapital);

      if (isCorrect) {
        setMessage("Good!");
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
      } else {
        setMessage(
          `Incorrect. The capital of ${selectedCountry.country} is ${selectedCountry.capital}.`
        );
      }
    }

    // Move to the next question after a short delay
    setTimeout(() => {
      setUsedCountries((prevUsed) => {
        const newUsedCountries = [...prevUsed, selectedCountry];
        loadNewQuestion(countries, newUsedCountries);
        return newUsedCountries;
      });
    }, 2000); // 2-second delay to allow the user to read the feedback
  };

  return (
    <div className="game-container">
      {selectedCountry && usedCountries.length < countries.length ? (
        <div>
          <h1>{isTrueFalse ? "True or False!" : "Guess the Capital!"}</h1>
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
                disabled={message !== ""} // Disable buttons after selection to prevent further clicks
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
