import React from 'react';

function Question({ question, onAnswer }) {
  const handleAnswerClick = (selectedOption) => {
    const isCorrect = selectedOption === question.answer;
    const feedback = isCorrect ? question.correctFeedback : question.incorrectFeedback;
    onAnswer(isCorrect, feedback);
  };

  return (
    <div className="question-container">
      <div className="question">
        <h2>{question.question}</h2>
      </div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
