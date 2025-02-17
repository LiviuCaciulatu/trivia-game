import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GameContextProps {
  questions: any[];
  currentQuestionIndex: number;
  gameOver: boolean;
  nextQuestion: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountriesData(data);
      generateQuestions(data);
    };

    fetchCountries();
  }, []);

  const generateQuestions = (countries: any[]) => {
    const generated: any[] = [];
    for (let i = 0; i < 20; i++) {
      const type = Math.floor(Math.random() * 3);
      const question = generateQuestion(countries, type);
      generated.push(question);
    }
    setQuestions(generated);
  };

  const generateQuestion = (countries: any[], type: number) => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const capital = country.capitalEn;
    const countryName = country.countryEn;

    if (type === 0) {
      const options = getRandomOptions(countries, "capitalEn", capital);
      return {
        question: `What is the capital of ${countryName}?`,
        options,
        correctAnswer: capital,
        type: "multiple-choice",
      };
    } else if (type === 1) {
      const options = getRandomOptions(countries, "countryEn", countryName);
      return {
        question: `${capital} is the capital of which country?`,
        options,
        correctAnswer: countryName,
        type: "multiple-choice",
      };
    } else {
      const isCorrect = Math.random() > 0.5;
      let fakeCountry = country;
      while (fakeCountry.countryEn === countryName) {
        fakeCountry = countries[Math.floor(Math.random() * countries.length)];
      }
      const displayedCountry = isCorrect ? country : fakeCountry;
      return {
        question: `Is ${capital} the capital of ${displayedCountry.countryEn}?`,
        options: ["True", "False"],
        correctAnswer: isCorrect ? "True" : "False",
        type: "true-false",
      };
    }
  };

  const getRandomOptions = (countries: any[], key: string, correctValue: string) => {
    let options = new Set();
    while (options.size < 3) {
      const random = countries[Math.floor(Math.random() * countries.length)][key];
      if (random !== correctValue) {
        options.add(random);
      }
    }
    return [...options, correctValue].sort(() => Math.random() - 0.5);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 === 20) {
      setGameOver(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <GameContext.Provider value={{ questions, currentQuestionIndex, gameOver, nextQuestion }}>
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
