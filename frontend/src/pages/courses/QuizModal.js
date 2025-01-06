import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Trophy } from 'lucide-react';

const QuizModal = ({ quiz, onClose, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== quiz.questions.length) {
      alert('Please answer all questions');
      return;
    }

    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);

    if (finalScore >= quiz.requiredScore) {
      onSubmit(answers, finalScore);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!showResults ? (
          <>
            {/* Questions */}
            <div className="space-y-6">
              {quiz.questions.map((question, qIndex) => (
                <div key={question.id} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-white font-semibold mb-4">
                    {qIndex + 1}. {question.question}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-3 rounded-lg cursor-pointer ${
                          answers[question.id] === index
                            ? 'bg-purple-600'
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={answers[question.id] === index}
                          onChange={() => handleAnswer(question.id, index)}
                          className="hidden"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
              >
                Submit Quiz
              </button>
            </div>
          </>
        ) : (
          // Results View
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              score >= quiz.requiredScore
                ? 'bg-green-500/20'
                : 'bg-red-500/20'
            }`}>
              {score >= quiz.requiredScore ? (
                <Trophy className="h-12 w-12 text-green-500" />
              ) : (
                <AlertCircle className="h-12 w-12 text-red-500" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Your Score: {score}%
            </h3>

            <p className={`text-lg mb-6 ${
              score >= quiz.requiredScore
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {score >= quiz.requiredScore
                ? 'Congratulations! You passed the quiz!'
                : `Required score: ${quiz.requiredScore}%. Try again!`}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                {score >= quiz.requiredScore ? 'Continue' : 'Close'}
              </button>
              {score < quiz.requiredScore && (
                <button
                  onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;