import React, { useState, useEffect } from "react";
import Question from "./Question";
import Status from "./Status";
import useSound from "use-sound";
import correctSound from "./sounds/correct.mp3";
import incorrectSound from "./sounds/incorrect.mp3";
import backgroundMusic from "./sounds/background.mp3";
import Confetti from "react-confetti";
import "./App.css";
import Modal from "react-modal";
import financeQA from "./quizzes.json";

Modal.setAppElement("#root");
const GAME_NAME = "InvestEd";
const INIT_INVESTMENT = 10000;

function App() {
  const [investment, setInvestment] = useState(INIT_INVESTMENT);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playCorrectSound] = useSound(correctSound);
  const [playIncorrectSound] = useSound(incorrectSound);
  const [playBackgroundMusic, { stop }] = useSound(backgroundMusic, {
    loop: true,
  });

  const questions = financeQA.questions;

  useEffect(() => {
    if (isGameStarted) {
      playBackgroundMusic();
    }
    return () => {
      stop();
    };
  }, [isGameStarted, playBackgroundMusic, stop]);

  const handleAnswer = (isCorrect, feedback) => {
    setFeedback(feedback);
    setIsCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);

      if (isCorrect) {
        setInvestment(investment + 100);
        playCorrectSound();
      } else {
        setInvestment(investment - 100);
        playIncorrectSound();
      }

      setIsModalOpen(false);

      if (investment <= 100 && !isCorrect) {
        setGameOver(true);
      } else if (currentQuestionIndex + 1 >= questions.length) {
        setShowCongrats(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 2000); // Show feedback for 2 seconds
  };

  const startGame = () => {
    setIsGameStarted(true);
    setIsModalOpen(true);
  };

  const restartGame = () => {
    setInvestment(INIT_INVESTMENT);
    setCurrentQuestionIndex(0);
    setGameOver(false);
    setShowCongrats(false);
    setIsGameStarted(false);
  };

  if (!isGameStarted) {
    return (
      <div className="start-screen">
        <h1>{GAME_NAME}</h1>
        <h4 className="rad-lab">RAD Lab 2</h4>
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
        <div>
          <h4 className="team">Team Members</h4>
          <p>A. Premsai - 248261D</p>
          <p>W. G. N. D. Madanayaka - 248244E</p>
          <p>K. Abiram - 248203E</p>
          <p>S. Luxana - 248243B</p>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-over">
        <Confetti />
        <div className="game-over-content">
          <p>Game Over! You lost all your money.</p>
          <button onClick={restartGame} className="restart-button">
            Restart Game
          </button>
        </div>
      </div>
    );
  }

  if (showCongrats) {
    return (
      <div className="congrats">
        <Confetti />
        <div className="congrats-content">
          <h1>Congratulations!</h1>
          <p>
            You have completed the game with an investment of ${investment}.
          </p>
          <button onClick={restartGame} className="restart-button">
            Restart Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>{GAME_NAME}</h1>
      </div>
      <Status investment={investment} />
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      {showFeedback && (
        <div className={isCorrect ? "feedback-green" : "feedback-red"}>
          {feedback}
        </div>
      )}
    </div>
  );
}

export default App;
