import React, { useState, useEffect } from "react";
import './Game.css';

const fetchCountriesRoFull = async () => {
    try {
        const response = await fetch('/CountriesRO.txt');
        const text = await response.text();

        const countries = text.split("\r\n\r\n").map(word => word.trim()).filter(word => word.length > 0);
        const formattedCountries = countries.map(pair => {
            const [country, capital] = pair.split(',').map(item => item.trim());
            return { country, capital };
        });
        return formattedCountries;

    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

const getRandomCountry = (countries, usedCountries) => {
    const unusedCountries = countries.filter(country => !usedCountries.includes(country));
    const randomIndex = Math.floor(Math.random() * unusedCountries.length);
    return unusedCountries[randomIndex];
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Game = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [usedCountries, setUsedCountries] = useState([]);

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

        const correctCountry = getRandomCountry(allCountries, usedCountries);
        const incorrectOptions = [];

        while (incorrectOptions.length < 3) {
            const randomCountry = getRandomCountry(allCountries, usedCountries);
            if (randomCountry.capital !== correctCountry.capital) {
                incorrectOptions.push(randomCountry.capital);
            }
        }

        const allOptions = shuffleArray([...incorrectOptions, correctCountry.capital]);
        setSelectedCountry(correctCountry);
        setOptions(allOptions);
        setMessage('');
    };

    useEffect(() => {
        loadCountries();
    }, []);

    const handleOptionClick = (option) => {
        if (option === selectedCountry.capital) {
            setMessage("Good!");

            setUsedCountries(prevUsed => {
                const newUsedCountries = [...prevUsed, selectedCountry];
                setTimeout(() => {
                    loadNewQuestion(countries, newUsedCountries);
                }, 1000); // 1-second delay
                return newUsedCountries;
            });
        } else {
            alert("Incorrect. Try again!");
        }
    };

    return (
        <div className="game-container">
            {selectedCountry && usedCountries.length < countries.length ? (
                <div>
                    <h1>Guess the Capital!</h1>
                    <p>What is the capital of <strong>{selectedCountry.country}</strong>?</p>
                    <div className="options-container">
                        {options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleOptionClick(option)} 
                                className="option-button"
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
}

export default Game;
