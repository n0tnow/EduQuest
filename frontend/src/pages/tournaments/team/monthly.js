import React from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Crown, Users, Award, Timer, ArrowRight } from 'lucide-react';

const TeamMonthlyTournament = () => {
  const tournament = {
    title: "Team Monthly Elite Championship",
    endTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    entryRequirements: {
      level: 20,
      teamSize: "5-10 players per team",
      entryFee: 1000,
    },
    rewards: [
      {
        position: "Champion Team",
        title: "Legendary Team Trophy NFT",
        points: 40000,
        value: 10000,
        perks: [
          "Exclusive Team Profile Theme",
          "Champion's Crown Avatar Border",
          "Free Entry to Next 3 Monthly Team Tournaments",
          "Special Course Access for Team Members",
        ],
      },
      {
        position: "Runner Up Team",
        title: "Epic Team Finalist NFT",
        points: 20000,
        value: 5000,
        perks: [
          "Elite Team Badge",
          "Free Entry to Next Team Tournament",
          "Special Team Course Access",
        ],
      },
      {
        position: "Third Place Team",
        title: "Rare Team Medal NFT",
        points: 10000,
        value: 2500,
        perks: [
          "Rare Team Badge",
          "50% Discount on Next Monthly Team Entry",
        ],
      },
    ],
    structure: [
      {
        stage: "Team Qualification Round",
        duration: "1 week",
        description: "Top 500 teams qualify",
        status: "active",
      },
      {
        stage: "Team Group Stage",
        duration: "1 week",
        description: "50 groups of 10 teams",
        status: "upcoming",
      },
      {
        stage: "Team Elimination Round",
        duration: "3 days",
        description: "Top 50 teams compete",
        status: "upcoming",
      },
      {
        stage: "Team Grand Finals",
        duration: "1 day",
        description: "Top 10 teams battle for glory",
        status: "upcoming",
      },
    ],
    rules: [
      "Teams must consist of 5-10 members",
      "Team leader registers the team and handles fees",
      "Cumulative team score determines rankings",
      "Cheating will result in entire team disqualification",
      "Time limits vary by round",
      "Missed rounds will result in team elimination",
      "Top performing teams get seeding advantages",
    ],
    hallOfChampions: [
      {
        name: "Team CryptoMasters",
        month: "December 2024",
        score: 48500,
        achievements: ["Flawless Victory", "Undefeated Streak"],
      },
      {
        name: "Blockchain Titans",
        month: "November 2024",
        score: 47200,
        achievements: ["Epic Comeback", "Highest Team Score"],
      },
    ],
  };

  const rarityColors = {
    "Champion Team": "text-yellow-400 bg-yellow-900",
    "Runner Up Team": "text-purple-400 bg-purple-900",
    "Third Place Team": "text-blue-400 bg-blue-900",
  };

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="relative mb-8 bg-gradient-to-r from-red-900 via-red-800 to-red-900 rounded-xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Crown className="h-8 w-8 text-yellow-400" />
                  <h1 className="text-3xl font-bold text-white">{tournament.title}</h1>
                </div>
                <p className="text-red-200">The ultimate challenge for elite teams</p>
              </div>
              <div className="text-right">
                <div className="text-red-200 text-sm mb-1">Tournament Ends In</div>
                <div className="text-2xl font-bold text-white">12d 0h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Requirements Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
            <h3 className="text-sm text-gray-400">Minimum Level</h3>
            <p className="text-xl font-semibold text-white">Level {tournament.entryRequirements.level}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
            <h3 className="text-sm text-gray-400">Team Size</h3>
            <p className="text-xl font-semibold text-white">{tournament.entryRequirements.teamSize}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition duration-300">
            <h3 className="text-sm text-gray-400">Entry Fee</h3>
            <p className="text-xl font-semibold text-yellow-400">{tournament.entryRequirements.entryFee} Points</p>
          </div>
        </div>

        {/* Tournament Structure */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Tournament Structure</h2>
          <div className="space-y-4">
            {tournament.structure.map((stage, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 hover:bg-gray-700 transition duration-300 p-2 rounded-lg"
              >
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full text-white ${
                    stage.status === "active" ? "bg-red-500" : "bg-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-white">{stage.stage}</h3>
                  <p className="text-sm text-gray-400">{stage.duration}</p>
                  <p className="text-sm text-gray-300">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Rewards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournament.rewards.map((reward, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${rarityColors[reward.position]} hover:shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-lg font-semibold text-white">{reward.position}</h3>
              <p className="text-sm text-gray-200">{reward.points} Points</p>
              <p className="text-sm text-gray-200">NFT Value: {reward.value}</p>
              <ul className="list-disc list-inside space-y-2 mt-4 text-gray-200">
                {reward.perks.map((perk, perkIndex) => (
                  <li key={perkIndex}>{perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tournament Rules */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Tournament Rules</h2>
          <ul className="list-disc list-inside space-y-2">
            {tournament.rules.map((rule, index) => (
              <li
                key={index}
                className="text-sm text-gray-400 hover:text-red-400 transition duration-300"
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Hall of Champions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Hall of Champions</h2>
          <div className="space-y-4">
            {tournament.hallOfChampions.map((champion, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <h3 className="text-lg font-semibold text-yellow-400">{champion.name}</h3>
                <p className="text-sm text-gray-400">{champion.month}</p>
                <p className="text-sm text-gray-400">Score: {champion.score}</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {champion.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="text-sm text-gray-400 hover:text-yellow-400 transition duration-300">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMonthlyTournament;
