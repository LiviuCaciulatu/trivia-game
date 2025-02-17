"use client";

import { useGame } from "@/app/context/GameContext";
import style from "./style.module.scss";

const GameComponent = () => {
  const { questions, currentQuestionIndex, gameOver, nextQuestion } = useGame();

  if (gameOver) {
    return <h1>Game Over! 🎉</h1>;
  }

  if (!questions.length) {
    return <h1>Loading Questions...</h1>;
  }

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <h2 className={style.question}>{question.question}</h2>
      {question.options.map((option: string, index: number) => (
        <button key={index} onClick={nextQuestion} className={style.answerBtn}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default GameComponent;
