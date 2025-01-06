import React from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Crown, Users, Award, Timer, ArrowRight, Star, Shield, Zap, Medal } from 'lucide-react';

const MonthlyTournament = () => {
  const tournament = {
    id: 3,
    title: "Monthly Elite Championship",
    endTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    requirements: {
      minLevel: 20,
      previousAchievements: ["Weekly Tournament Top 10", "75% Quiz Success Rate"],
      nftRequired: "Any Rare or better NFT"
    },
    phases: [
      { 
        name: "Qualification Round", 
        duration: "1 week", 
        status: "active",
        description: "Top 1000 players qualify"
      },
      { 
        name: "Group Stage", 
        duration: "1 week", 
        status: "upcoming",
        description: "20 groups of 50 players"
      },
      { 
        name: "Elimination Round", 
        duration: "3 days", 
        status: "upcoming",
        description: "Top 100 players compete"
      },
      { 
        name: "Grand Finals", 
        duration: "1 day", 
        status: "upcoming",
        description: "Top 20 players battle for glory"
      }
    ],
    participants: 856,
    maxParticipants: 1000,
    entryFee: 500,
    rewards: [
      { 
        position: "Champion",
        points: 20000,
        nft: "Mythical Champion NFT",
        value: 5000,
        additionalRewards: [
          "Exclusive Profile Theme",
          "Champion's Crown Avatar Border",
          "Free Entry to Next 3 Monthly Tournaments",
          "Special Course Access"
        ]
      },
      { 
        position: "Runner Up",
        points: 10000,
        nft: "Legendary Finalist NFT",
        value: 2500,
        additionalRewards: [
          "Elite Profile Badge",
          "Free Entry to Next Monthly Tournament",
          "Special Course Access"
        ]
      },
      { 
        position: "Third Place",
        points: 5000,
        nft: "Epic Medalist NFT",
        value: 1000,
        additionalRewards: [
          "Elite Profile Badge",
          "50% Discount on Next Monthly Entry"
        ]
      }
    ],
    previousChampions: [
      {
        name: "CryptoSage",
        month: "December 2024",
        score: 9850,
        achievements: ["Perfect Final Round", "Undefeated"]
      },
      {
        name: "BlockchainMaster",
        month: "November 2024",
        score: 9600,
        achievements: ["Comeback Victory"]
      }
    ],
    rules: [
      "Qualification requires minimum Level 20",
      "Previous tournament achievements needed",
      "Each round has specific scoring criteria",
      "Anti-cheating measures strictly enforced",
      "Time limits vary by round",
      "Missed rounds result in elimination",
      "Top performers get seeding advantage"
    ]
  };

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
        {/* Header with Special Design */}
        <div className="relative mb-8 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 rounded-xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Crown className="h-8 w-8 text-yellow-400" />
                  <h1 className="text-3xl font-bold text-white">{tournament.title}</h1>
                </div>
                <p className="text-purple-200">The ultimate challenge for elite learners</p>
              </div>
              <div className="text-right">
                <div className="text-purple-200 text-sm mb-1">Tournament Ends In</div>
                <div className="text-2xl font-bold text-white">{getTimeRemaining()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tournament Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Entry Requirements */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 text-purple-400 mr-2" />
                Entry Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Minimum Level</div>
                  <div className="text-lg font-semibold text-white">Level {tournament.requirements.minLevel}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">NFT Requirement</div>
                  <div className="text-lg font-semibold text-purple-400">{tournament.requirements.nftRequired}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-2">Entry Fee</div>
                  <div className="text-lg font-semibold text-yellow-400">{tournament.entryFee} Points</div>
                </div>
              </div>
            </div>

            {/* Tournament Phases with Timeline */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Tournament Structure</h2>
              <div className="space-y-4">
                {tournament.phases.map((phase, index) => (
                  <div key={index} className="relative">
                    {index !== tournament.phases.length - 1 && (
                      <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-700"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        phase.status === 'active' ? 'bg-purple-600' : 'bg-gray-700'
                      }`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-white">{phase.name}</div>
                            <div className="text-sm text-gray-400">{phase.duration}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            phase.status === 'active' ? 'bg-purple-600 text-white' :
                            'bg-gray-600 text-gray-300'
                          }`}>
                            {phase.status.toUpperCase()}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                      </div>
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
                    <ArrowRight className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rewards and Previous Champions */}
          <div className="space-y-6">
            {/* Rewards Card */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Elite Rewards</h2>
              <div className="space-y-6">
                {tournament.rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className={`relative bg-gray-700 rounded-lg p-4 ${
                      index === 0 ? 'border-2 border-yellow-500' : ''
                    }`}
                  >
                    {index === 0 && (
                      <div className="absolute -top-3 -right-3">
                        <Crown className="h-6 w-6 text-yellow-400" />
                      </div>
                    )}
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

            {/* Previous Champions */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Hall of Champions</h2>
              <div className="space-y-4">
                {tournament.previousChampions.map((champion, index) => (
                  <div 
                    key={index}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Medal className="h-5 w-5 text-yellow-400" />
                      <span className="text-white font-semibold">{champion.name}</span>
                    </div>
                    <div className="text-sm text-gray-400">{champion.month}</div>
                    <div className="text-sm text-purple-400 mt-1">Score: {champion.score}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {champion.achievements.map((achievement, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-300"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Join Button - Fixed at Bottom */}
        <div className="fixed bottom-6 right-6 left-[calc(16rem+24px)] z-10">
          <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg">
            Join Monthly Elite Championship (500 Points)
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MonthlyTournament;