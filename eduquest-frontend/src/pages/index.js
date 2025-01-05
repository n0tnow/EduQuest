import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Welcome to EduQuest
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
          Learn, earn, and grow with blockchain-powered education
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/about')}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </Layout>
  );
}