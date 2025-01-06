import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

const QuizHome = () => {
  const router = useRouter();

  const quizTypes = [
    {
      id: 1,
      title: 'Günlük Turnuva',
      description: 'Her gün yeni sorular ve ödüller',
      reward: '50 Puan + NFT',
      path: '/quiz/daily'
    },
    {
      id: 2,
      title: 'Takım Turnuvası',
      description: 'Takımınla birlikte yarış ve kazanma şansını artır',
      reward: '100 Puan + Özel NFT',
      path: '/quiz/tournament'
    },
    {
      id: 3,
      title: 'Pratik Quiz',
      description: 'Bilgilerini test et ve deneyim kazan',
      reward: '25 Puan',
      path: '/quiz/practice'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Bilgi Yarışması</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizTypes.map((quiz) => (
            <div 
              key={quiz.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition cursor-pointer"
              onClick={() => router.push(quiz.path)}
            >
              <h2 className="text-xl font-semibold text-purple-400 mb-3">
                {quiz.title}
              </h2>
              <p className="text-gray-400 mb-4">{quiz.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-300">
                  Ödül: {quiz.reward}
                </span>
                <button 
                  className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(quiz.path);
                  }}
                >
                  Katıl
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuizHome;