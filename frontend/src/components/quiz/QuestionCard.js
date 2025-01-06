import React, { useState } from 'react';
import Timer from './Timer';

const QuestionCard = ({ 
  question,
  options,
  onAnswer,
  timeLimit = 30,
  isLast = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    onAnswer(index);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-purple-400 font-semibold">Soru</h3>
        <Timer seconds={timeLimit} onComplete={() => !isAnswered && onAnswer(null)} />
      </div>

      <p className="text-white text-lg mb-6">{question}</p>

      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-4 rounded-lg text-left transition
              ${isAnswered && selectedAnswer === index 
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            onClick={() => handleAnswer(index)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && !isLast && (
        <div className="mt-6 text-center">
          <button
            className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            onClick={() => onAnswer('next')}
          >
            Sonraki Soru
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;