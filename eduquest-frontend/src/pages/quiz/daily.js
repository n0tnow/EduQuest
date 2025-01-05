import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import QuestionCard from '../../components/quiz/QuestionCard';
import Results from '../../components/quiz/Results';
import { useWeb3 } from '../../contexts/Web3Context';

const DailyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { account } = useWeb3();

  // Mock veri - gerçek veriler API'den gelecek
  const mockQuestions = [
    {
      id: 1,
      question: "JavaScript'te 'const' ve 'let' arasındaki temel fark nedir?",
      options: [
        "const ile tanımlanan değişkenler değiştirilemez",
        "let ile tanımlanan değişkenler global scope'tadır",
        "const sadece sayılar için kullanılır",
        "let sadece stringler için kullanılır"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "HTML5'te yeni eklenen semantik elementlerden hangisi makale içeriği için kullanılır?",
      options: [
        "<section>",
        "<article>",
        "<main>",
        "<content>"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "CSS Grid'de 'fr' birimi neyi temsil eder?",
      options: [
        "Fixed ratio - Sabit oran",
        "Fractional unit - Kesirli birim",
        "Free space - Boş alan",
        "Flexible range - Esnek aralık"
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswer = (answer) => {
    if (answer === 'next') {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    const isCorrect = answer === mockQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => [...prev, {
      questionId: mockQuestions[currentQuestion].id,
      userAnswer: answer,
      isCorrect
    }]);

    if (currentQuestion === mockQuestions.length - 1) {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    setIsComplete(true);
    // Quiz sonuçlarını backend'e gönder
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          answers,
          score,
          quizType: 'daily',
          walletAddress: account
        })
      });

      if (!response.ok) {
        throw new Error('Quiz sonuçları gönderilemedi');
      }

    } catch (error) {
      console.error('Quiz submit error:', error);
    }
  };

  const earnedPoints = score * 50; // Her doğru cevap için 50 puan
  const earnedNFT = score === mockQuestions.length ? "Günlük Turnuva Şampiyonu NFT" : null;

  if (isComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 p-6">
          <Results
            score={score}
            totalQuestions={mockQuestions.length}
            earnedPoints={earnedPoints}
            earnedNFT={earnedNFT}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Günlük Turnuva</h1>
            <span className="text-purple-400">
              {currentQuestion + 1} / {mockQuestions.length}
            </span>
          </div>

          <QuestionCard
            question={mockQuestions[currentQuestion].question}
            options={mockQuestions[currentQuestion].options}
            onAnswer={handleAnswer}
            timeLimit={30}
            isLast={currentQuestion === mockQuestions.length - 1}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DailyQuiz;