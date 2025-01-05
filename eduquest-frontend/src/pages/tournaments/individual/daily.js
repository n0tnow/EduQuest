import React from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Clock, Users, Award, Timer, ArrowRight } from 'lucide-react';

const DailyTournament = () => {
  // Mock data for current tournament
  const tournament = {
    id: 1,
    title: "Daily Challenge",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: "15 minutes",
    participants: 128,
    maxParticipants: 256,
    entryFee: 50,
    rewards: [
      { position: "1st", points: 1000, nft: "Epic NFT", value: 500 },
      { position: "2nd", points: 500, nft: "Rare NFT", value: 250 },
      { position: "3rd", points: 250, nft: "Common NFT", value: 100 },
    ],
    rules: [
      "15 questions in 15 minutes",
      "No time extension",
      "Each question has equal points",
      "Incorrect answers result in point deduction"
    ]
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const diff = tournament.startTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{tournament.title}</h1>
              <p className="text-gray-400">Compete daily, earn rewards, climb the leaderboard</p>
            </div>
            <div className="text-right">
              <div className="text-purple-400 text-sm mb-1">Next Tournament</div>
              <div className="text-2xl font-bold text-white">{getTimeRemaining()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tournament Stats */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="text-lg font-semibold text-white">{tournament.duration}</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="text-lg font-semibold text-white">
                    {tournament.participants}/{tournament.maxParticipants}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Entry Fee</div>
                  <div className="text-lg font-semibold text-white">{tournament.entryFee} Points</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Timer className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Questions</div>
                  <div className="text-lg font-semibold text-white">15</div>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Tournament Rules</h2>
              <ul className="space-y-3">
                {tournament.rules.map((rule, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <ArrowRight className="h-4 w-4 text-purple-400 mr-2" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Join Button */}
            <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              Join Tournament (50 Points)
            </button>
          </div>

          {/* Rewards Card */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Rewards</h2>
            <div className="space-y-6">
              {tournament.rewards.map((reward, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-white mb-1">
                      {reward.position}
                    </div>
                    <div className="text-sm text-gray-400">
                      {reward.points} Points
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-400">
                      {reward.nft}
                    </div>
                    <div className="text-xs text-gray-400">
                      Value: {reward.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Previous Winners */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Previous Winners</h3>
              <div className="space-y-3">
                {[
                  { name: "Alex.eth", points: 950 },
                  { name: "Jane.eth", points: 920 },
                  { name: "Crypto_Master", points: 890 }
                ].map((winner, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{winner.name}</span>
                    <span className="text-purple-400">{winner.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyTournament;