import React from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Clock, Users, Award, Timer, ArrowRight, Crown, Zap } from 'lucide-react';

const WeeklyTournament = () => {
  // Mock data for weekly tournament
  const tournament = {
    id: 2,
    title: "Weekly Championship",
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    phases: [
      { name: "Qualification Round", duration: "3 days", status: "active" },
      { name: "Quarter Finals", duration: "1 day", status: "upcoming" },
      { name: "Semi Finals", duration: "4 hours", status: "upcoming" },
      { name: "Finals", duration: "2 hours", status: "upcoming" }
    ],
    participants: 512,
    maxParticipants: 1000,
    entryFee: 150,
    rewards: [
      { 
        position: "1st", 
        points: 5000, 
        nft: "Legendary NFT", 
        value: 1000,
        additionalRewards: ["Access to Monthly Elite Tournament", "Special Profile Badge"] 
      },
      { 
        position: "2nd", 
        points: 2500, 
        nft: "Epic NFT", 
        value: 500,
        additionalRewards: ["Access to Monthly Elite Tournament"] 
      },
      { 
        position: "3rd", 
        points: 1000, 
        nft: "Rare NFT", 
        value: 250,
        additionalRewards: ["Special Profile Badge"] 
      }
    ],
    rules: [
      "Multiple rounds over the week",
      "Top 256 qualify for Quarter Finals",
      "Top 64 advance to Semi Finals",
      "Top 16 compete in Finals",
      "Points are accumulated throughout all rounds",
      "Minimum 70% accuracy required to advance"
    ],
    currentLeaders: [
      { name: "CryptoKing", points: 4200, winStreak: 5 },
      { name: "BlockMaster", points: 3800, winStreak: 3 },
      { name: "ETHWarrior", points: 3600, winStreak: 4 }
    ]
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const diff = tournament.endTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{tournament.title}</h1>
              <p className="text-gray-400">Compete in multi-stage tournament for legendary rewards</p>
            </div>
            <div className="text-right">
              <div className="text-purple-400 text-sm mb-1">Time Remaining</div>
              <div className="text-2xl font-bold text-white">{getTimeRemaining()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info and Phases */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tournament Stats */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Prize Pool</div>
                  <div className="text-lg font-semibold text-white">5000 Points</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="text-lg font-semibold text-white">
                    {tournament.participants}/{tournament.maxParticipants}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Award className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Entry Fee</div>
                  <div className="text-lg font-semibold text-white">{tournament.entryFee} Points</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Crown className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Rounds</div>
                  <div className="text-lg font-semibold text-white">4</div>
                </div>
              </div>
            </div>

            {/* Tournament Phases */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Tournament Phases</h2>
              <div className="space-y-4">
                {tournament.phases.map((phase, index) => (
                  <div key={index} className="flex items-center bg-gray-700 rounded-lg p-4">
                    <div className={`w-3 h-3 rounded-full mr-4 ${
                      phase.status === 'active' ? 'bg-green-500' :
                      phase.status === 'upcoming' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{phase.name}</div>
                      <div className="text-sm text-gray-400">{phase.duration}</div>
                    </div>
                    <div className={`text-sm ${
                      phase.status === 'active' ? 'text-green-400' :
                      phase.status === 'upcoming' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                    </div>
                  </div>
                ))}
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
              Join Weekly Championship (150 Points)
            </button>
          </div>

          {/* Rewards and Leaderboard */}
          <div className="space-y-6">
            {/* Rewards Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Rewards</h2>
              <div className="space-y-6">
                {tournament.rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-semibold text-white">
                        {reward.position}
                      </div>
                      <div className="text-sm font-semibold text-purple-400">
                        {reward.nft}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">
                        {reward.points} Points
                      </div>
                      <div className="text-xs text-gray-500">
                        NFT Value: {reward.value}
                      </div>
                      {reward.additionalRewards.map((extra, i) => (
                        <div key={i} className="flex items-center text-xs text-green-400">
                          <Zap className="h-3 w-3 mr-1" />
                          {extra}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Leaders */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Current Leaders</h2>
              <div className="space-y-4">
                {tournament.currentLeaders.map((leader, index) => (
                  <div 
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-semibold">{leader.name}</div>
                      <div className="text-sm text-purple-400">{leader.points} pts</div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {leader.winStreak} Win Streak 🔥
                    </div>
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

export default WeeklyTournament;