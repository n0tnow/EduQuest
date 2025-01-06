import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useWeb3 } from '../../contexts/Web3Context';
import { FaStar, FaMedal, FaTrophy, FaCoins } from 'react-icons/fa';

const Dashboard = () => {
  const { account } = useWeb3();
  const router = useRouter();

  const mockData = {
    user: {
      username: "TestUser",
      level: 5,
      points: 1250,
      nfts: 3,
      completedCourses: 2,
      rank: 156
    },
    recentActivities: [
      { id: 1, type: "quiz", name: "Math Quiz", score: 85, date: "2024-01-05", reward: "50 Points" },
      { id: 2, type: "course", name: "Python Basics", progress: 75, date: "2024-01-04", reward: "NFT Earned" },
      { id: 3, type: "tournament", name: "Daily Tournament", rank: 3, date: "2024-01-03", reward: "100 Points" }
    ],
    recommendedCourses: [
      { id: 1, name: "Advanced Python", level: "Intermediate", duration: "4 Hours", reward: "Rare NFT" },
      { id: 2, name: "Web Development", level: "Beginner", duration: "6 Hours", reward: "200 Points" },
      { id: 3, name: "Data Science", level: "Advanced", duration: "8 Hours", reward: "Epic NFT" }
    ]
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Top Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl shadow-lg flex items-center">
            <FaStar className="text-yellow-300 text-4xl mr-4" />
            <div>
              <h3 className="text-gray-200 mb-2">Level</h3>
              <p className="text-3xl font-bold text-white">{mockData.user.level}</p>
              <p className="text-sm text-gray-200 mt-2">Rank: #{mockData.user.rank}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg flex items-center">
            <FaCoins className="text-yellow-300 text-4xl mr-4" />
            <div>
              <h3 className="text-gray-200 mb-2">Total Points</h3>
              <p className="text-3xl font-bold text-white">{mockData.user.points}</p>
              <p className="text-sm text-gray-200 mt-2">This week: +350</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg flex items-center">
            <FaMedal className="text-yellow-300 text-4xl mr-4" />
            <div>
              <h3 className="text-gray-200 mb-2">NFT Collection</h3>
              <p className="text-3xl font-bold text-white">{mockData.user.nfts}</p>
              <p className="text-sm text-gray-200 mt-2">Rare: 2 | Epic: 1</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl shadow-lg flex items-center">
            <FaTrophy className="text-yellow-300 text-4xl mr-4" />
            <div>
              <h3 className="text-gray-200 mb-2">Completed Courses</h3>
              <p className="text-3xl font-bold text-white">{mockData.user.completedCourses}</p>
              <p className="text-sm text-gray-200 mt-2">In progress: 3</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {mockData.recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-purple-400">{activity.name}</h4>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400">{activity.reward}</p>
                      {activity.score && <p className="text-sm text-gray-300">Score: {activity.score}</p>}
                      {activity.progress && <p className="text-sm text-gray-300">Progress: %{activity.progress}</p>}
                      {activity.rank && <p className="text-sm text-gray-300">Rank: #{activity.rank}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Recommended Courses</h2>
            <div className="space-y-4">
              {mockData.recommendedCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-purple-400">{course.name}</h4>
                      <p className="text-sm text-gray-400">{course.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400">{course.reward}</p>
                      <p className="text-sm text-gray-300">{course.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/tournaments/individual/daily')}
            className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-xl text-center hover:from-purple-700 hover:to-purple-900 transition-colors group flex flex-col items-center"
          >
            <FaTrophy className="text-yellow-300 text-4xl mb-2" />
            <h3 className="text-xl font-bold text-white mb-2">Daily Tournament</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">Join the daily tournament and win rewards</p>
          </button>

          <button
            onClick={() => router.push('/tournaments/team/daily')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl text-center hover:from-blue-700 hover:to-blue-900 transition-colors group flex flex-col items-center"
          >
            <FaMedal className="text-yellow-300 text-4xl mb-2" />
            <h3 className="text-xl font-bold text-white mb-2">Team Tournament</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">Compete with your team and earn NFTs</p>
          </button>

          <button
            onClick={() => router.push('/nft-marketplace')}
            className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-xl text-center hover:from-green-700 hover:to-green-900 transition-colors group flex flex-col items-center"
          >
            <FaCoins className="text-yellow-300 text-4xl mb-2" />
            <h3 className="text-xl font-bold text-white mb-2">NFT Marketplace</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors">Explore and trade NFTs</p>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
