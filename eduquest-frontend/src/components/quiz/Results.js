import React from 'react';
import { useRouter } from 'next/router';

const Results = ({ score, totalQuestions, earnedPoints, earnedNFT }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-800 rounded-lg p-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-white mb-6">
        Quiz Tamamlandı!
      </h2>

      <div className="space-y-4 mb-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">Doğru Cevaplar</p>
          <p className="text-3xl font-bold text-purple-400">
            {score}/{totalQuestions}
          </p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">Kazanılan Puan</p>
          <p className="text-3xl font-bold text-purple-400">
            {earnedPoints}
          </p>
        </div>

        {earnedNFT && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400">Kazanılan NFT</p>
            <p className="text-xl font-bold text-purple-400">
              {earnedNFT}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => router.push('/quiz')}
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Yeni Quiz
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-600 px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Ana Sayfa
        </button>
      </div>
    </div>
  );
};

export default Results;