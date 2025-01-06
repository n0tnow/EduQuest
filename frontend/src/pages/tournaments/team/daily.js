import React, { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Users, Clock, Award, Timer, ArrowRight, UserPlus, UserCheck } from 'lucide-react';

const DailyTeamTournament = () => {
  const [teamTab, setTeamTab] = useState('join'); // 'join' or 'create'

  const tournament = {
    id: 'dt1',
    title: "Daily Team Challenge",
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    teamSize: 3,
    teamsRegistered: 12,
    maxTeams: 32,
    entryFeePerTeam: 150,
    duration: "30 minutes",
    rewards: [
      { 
        position: "1st Team", 
        pointsPerMember: 300,
        teamNft: "Rare Team Victory NFT",
        value: 450
      },
      { 
        position: "2nd Team", 
        pointsPerMember: 200,
        teamNft: "Uncommon Team NFT",
        value: 300
      },
      { 
        position: "3rd Team", 
        pointsPerMember: 100,
        teamNft: "Common Team NFT",
        value: 150
      }
    ],
    availableTeams: [
      {
        id: 1,
        name: "Blockchain Titans",
        members: 2,
        requiredMembers: 3,
        averageLevel: 15,
        requirements: "Min. Level 10"
      },
      {
        id: 2,
        name: "Web3 Warriors",
        members: 1,
        requiredMembers: 3,
        averageLevel: 20,
        requirements: "Min. Level 15"
      }
    ],
    rules: [
      "Each team must have exactly 3 members",
      "All team members must participate",
      "Questions are answered as a team",
      "Team captain submits final answers",
      "Points are split equally among team members"
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{tournament.title}</h1>
              <p className="text-gray-400">Team up and compete together for greater rewards</p>
            </div>
            <div className="text-right">
              <div className="text-purple-400 text-sm mb-1">Tournament Starts In</div>
              <div className="text-2xl font-bold text-white">{getTimeRemaining()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tournament Stats */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Team Size</div>
                  <div className="text-lg font-semibold text-white">{tournament.teamSize} Players</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Teams Registered</div>
                  <div className="text-lg font-semibold text-white">
                    {tournament.teamsRegistered}/{tournament.maxTeams}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="text-lg font-semibold text-white">{tournament.duration}</div>
                </div>
                <div className="text-center p-4 bg-gray-700 rounded-lg">
                  <Award className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Entry Fee</div>
                  <div className="text-lg font-semibold text-white">{tournament.entryFeePerTeam} / Team</div>
                </div>
              </div>
            </div>

            {/* Team Options */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setTeamTab('join')}
                  className={`flex-1 px-6 py-3 text-sm font-medium ${
                    teamTab === 'join' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Join Existing Team
                </button>
                <button
                  onClick={() => setTeamTab('create')}
                  className={`flex-1 px-6 py-3 text-sm font-medium ${
                    teamTab === 'create' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Create New Team
                </button>
              </div>

              <div className="p-6">
                {teamTab === 'join' ? (
                  <div className="space-y-4">
                    {tournament.availableTeams.map((team) => (
                      <div key={team.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold">{team.name}</h3>
                            <p className="text-sm text-gray-400">Avg. Level {team.averageLevel}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-purple-400">
                              {team.members}/{team.requiredMembers} Members
                            </div>
                            <div className="text-xs text-gray-400">{team.requirements}</div>
                          </div>
                        </div>
                        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Request to Join
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2" htmlFor="teamName">
                          Team Name
                        </label>
                        <input
                          type="text"
                          id="teamName"
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                          placeholder="Enter team name..."
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Team Requirements
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="minLevel"
                              className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="minLevel" className="text-gray-300">
                              Minimum Level Required
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="nftRequired"
                              className="rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="nftRequired" className="text-gray-300">
                              NFT Ownership Required
                            </label>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center mt-4">
                        <Users className="h-4 w-4 mr-2" />
                        Create Team
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Team Rules</h2>
              <ul className="space-y-3">
                {tournament.rules.map((rule, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <ArrowRight className="h-4 w-4 text-purple-400 mr-2" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rewards Card */}
          <div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Team Rewards</h2>
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
                        {reward.teamNft}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">
                        {reward.pointsPerMember} Points per Member
                      </div>
                      <div className="text-xs text-gray-500">
                        NFT Value: {reward.value}
                      </div>
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

export default DailyTeamTournament;