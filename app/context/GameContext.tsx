"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLanguage } from "../context/LanguageContext";
import enTranslations from "../locales/en/en.json";
import roTranslations from "../locales/ro/ro.json";

interface Country {
  id: number;
  countryEn: string;
  countryRo: string;
  capitalEn: string;
  capitalRo: string;
  flag: string;
  map: string;
  funFactEn: string;
  funFactRo: string;
  neighbours?: string[] | string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  type: "multiple-choice" | "true-false" | "flag" | "map" | "fun-fact";
  image?: string;
}

interface GameContextProps {
  questions: Question[];
  currentQuestionIndex: number;
  gameOver: boolean;
  correctAnswers: number;
  wrongAnswers: number;
  userPoints: number;
  nextQuestion: (selectedAnswer: string) => void;
  setGameOver: (value: boolean) => void;
  resetGame: () => void;
  setUserPoints: (points: number) => void;
  difficulty: string;
  loading: boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
  updateUserContext: (newPoints: number) => void;
  difficulty: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children, updateUserContext, difficulty }) => {
  const { language } = useLanguage();
  const translations = language === "ro" ? roTranslations.game : enTranslations.game;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOverState] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questions.length) {
      console.log("Fetching questions...");
      fetchQuestions();
    }
  }, [difficulty, questions.length]);

  const fetchQuestions = async () => {
    if (questions.length > 0) return;
    console.log("Fetching questions...");
    const res = await fetch("/api/countries");
    const data: Country[] = await res.json();
    generateQuestions(data);
  };

  const generateQuestions = (countries: Country[]) => {
    console.log("Generated Questions:", countries);
    const generated: Question[] = [];
    const questionCount = difficulty === "hard" ? 30 : difficulty === "medium" ? 25 : 20;

    let allowedTypes: number[];
    if (difficulty === "hard") {
      allowedTypes = [0, 1, 2, 3, 4, 5, 6];
    } else if (difficulty === "medium") {
      allowedTypes = [0, 1, 2, 3, 4];
    } else {
      allowedTypes = [0, 1, 2];
    }

    while (generated.length < questionCount) {
      const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
      const question = generateQuestion(countries, type);
      if (question) generated.push(question);
    }

    setQuestions(generated);
    setLoading(false);
  };

  const generateQuestion = (countries: Country[], type: number): Question | null => {
    const country = countries[Math.floor(Math.random() * countries.length)];

    const capital = language === "ro" ? country.capitalRo : country.capitalEn;
    const countryName = language === "ro" ? country.countryRo : country.countryEn;
    const funFact = language === "ro" ? country.funFactRo : country.funFactEn;

    let questionType: "multiple-choice" | "true-false" | "flag" | "map" | "fun-fact" | null = null;

    if (type === 0) {
      const options = getRandomOptions(countries, language === "ro" ? "capitalRo" : "capitalEn", capital);
      questionType = "multiple-choice";
      return {
        question: translations.capitalQuestion.replace("{country}", countryName),
        options,
        correctAnswer: capital,
        type: questionType,
      };
    } else if (type === 1) {
      const options = getRandomOptions(countries, language === "ro" ? "countryRo" : "countryEn", countryName);
      questionType = "multiple-choice";
      return {
        question: translations.countryQuestion.replace("{capital}", capital),
        options,
        correctAnswer: countryName,
        type: questionType,
      };
    } else if (type === 2) {
      const isCorrect = Math.random() > 0.5;
      let fakeCountry = country;

      while (fakeCountry.countryEn === countryName) {
        fakeCountry = countries[Math.floor(Math.random() * countries.length)];
      }

      const displayedCountry = isCorrect ? country : fakeCountry;
      const displayedCountryName = language === "ro" ? displayedCountry.countryRo : displayedCountry.countryEn;

      questionType = "true-false";
      return {
        question: translations.trueFalseQuestion
          .replace("{capital}", capital)
          .replace("{country}", displayedCountryName),
        options: [translations.trueOption, translations.falseOption],
        correctAnswer: isCorrect ? translations.trueOption : translations.falseOption,
        type: questionType,
      };
    } else if (type === 3) {
      const options = getRandomOptions(countries, language === "ro" ? "countryRo" : "countryEn", countryName);
      questionType = "flag";
      return {
        question: translations.flagQuestion,
        options,
        correctAnswer: countryName,
        type: questionType,
        image: country.flag,
      };
    } else if (type === 4) {
      const options = getRandomOptions(countries, language === "ro" ? "countryRo" : "countryEn", countryName);
      questionType = "map";
      return {
        question: translations.mapQuestion,
        options,
        correctAnswer: countryName,
        type: questionType,
        image: country.map,
      };
    } else if (type === 5) {
      const options = getRandomOptions(countries, language === "ro" ? "countryRo" : "countryEn", countryName);
      questionType = "fun-fact";
      return {
        question: funFact,
        options,
        correctAnswer: countryName,
        type: questionType,
      };
    } else if (type === 6) {
      const options = getRandomOptions(countries, language === "ro" ? "countryRo" : "countryEn", countryName);

      if (!country.neighbours || country.neighbours.length === 0) {
        return null;
      }

      let formattedNeighbours = "";

      if (Array.isArray(country.neighbours)) {
        if (country.neighbours.length === 1) {
          formattedNeighbours = country.neighbours[0];
        } else {
          formattedNeighbours = country.neighbours.slice(0, -1).join(", ") + " and " + country.neighbours[country.neighbours.length - 1];
        }
      } else if (typeof country.neighbours === "string") {
        const neighboursArray = country.neighbours.split(",");
        if (neighboursArray.length === 1) {
          formattedNeighbours = neighboursArray[0];
        } else {
          formattedNeighbours = neighboursArray.slice(0, -1).join(", ") + " and " + neighboursArray[neighboursArray.length - 1];
        }
      } else {
        formattedNeighbours = "Unknown neighbours";
      }

      questionType = "multiple-choice";
      return {
        question: translations.neighbourQuestion
          .replace("{country}", language === "ro" ? country.countryRo : country.countryEn)
          .replace("{neighbours}", formattedNeighbours),
        options,
        correctAnswer: countryName,
        type: questionType,
      };
    }

    return null;
  };

  const getRandomOptions = (countries: Country[], key: keyof Country, correctValue: string): string[] => {
    const options = new Set<string>();
    while (options.size < 3) {
      const random = countries[Math.floor(Math.random() * countries.length)][key];
      if (random !== correctValue) {
        options.add(String(random));
      }
    }
    return [...options, correctValue].sort(() => Math.random() - 0.5);
  };

  const nextQuestion = (selectedAnswer: string) => {
    if (questions.length > 0) {
      const correctAnswer = questions[currentQuestionIndex]?.correctAnswer;

      if (selectedAnswer === correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setWrongAnswers((prev) => prev + 1);
      }
    }

    const totalQuestions = difficulty === "medium" ? 25 : 20;

    if (currentQuestionIndex + 1 === totalQuestions) {
      setTimeout(() => {
        setGameOverState(true);
        const newTotalPoints = userPoints + correctAnswers;
        setUserPoints(newTotalPoints);
        updateUserContext(newTotalPoints);
      }, 500);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setGameOverState(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    fetchQuestions();
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        gameOver,
        correctAnswers,
        wrongAnswers,
        userPoints,
        nextQuestion,
        setGameOver: setGameOverState,
        resetGame,
        setUserPoints,
        difficulty,
        loading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};