'use client';

import { useGame } from "@/app/context/GameContext";
import GameOver from '../GameOver/GameOver';
import Image from "next/image";
import { useState } from "react";
import style from './style.module.scss';
import Navbar from "../../components/Navbar/Navbar";

const GameComponent = () => {
  const { questions, currentQuestionIndex, gameOver, nextQuestion, difficulty, loading } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const totalQuestions = difficulty === "hard" ? 30 : difficulty === "medium" ? 25 : 20;

  if (loading) {
    return <h1>Loading Questions...</h1>;
  }

  if (gameOver) {
    return <GameOver />;
  }

  if (!questions.length) {
    return <h1>Loading Questions...</h1>;
  }

  const question = questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);

      setTimeout(() => {
        nextQuestion(option);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  return (
    <div className={style.gameContainer}>
      <div className={style.navbar}>
        <Navbar />
      </div>
      <div className={style.questionCounter}>
        <p>Question {currentQuestionIndex + 1} / {totalQuestions}</p>
      </div>
      <div className={style.imageContainer}>
        <Image 
          src={question.image || "/svg/Logo-4.svg"}
          alt="Question-related visual" 
          width={300} 
          height={200} 
          className={style.questionImage} 
          priority
        />
      </div>
      <h2 className={style.question}>{question.question}</h2>

      <div className={style.answerOptions}>
        {question.options.map((option: string, index: number) => {
          let btnClass = style.answerBtn;
          
          if (selectedAnswer) {
            if (option === question.correctAnswer) {
              btnClass = style.correctAnswer;
            } else if (option === selectedAnswer) {
              btnClass = style.wrongAnswer;
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={btnClass}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameComponent;
