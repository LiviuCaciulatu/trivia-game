'use client';

import { useGame } from "@/app/context/GameContext";
import GameOver from '../GameOver/GameOver';
import Image from "next/image";
import style from './style.module.scss';

const GameComponent = () => {
  const { questions, currentQuestionIndex, gameOver, nextQuestion, difficulty, loading } = useGame();
  console.log("Game Difficulty", difficulty)

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

  return (
    <div className={style.gameContainer}>
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

      <div>
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => nextQuestion(option)}
            className={`${style.answerBtn} btn btn-info`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameComponent;
