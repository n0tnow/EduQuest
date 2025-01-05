import React from 'react';
import Layout from '../../../components/layout/Layout';
import { Trophy, Clock, Users, Award, Timer, ArrowRight, Crown } from 'lucide-react';

const WeeklyTeamTournament = () => {
  const tournament = {
    id: 'wt1',
    title: "Weekly Team Championship",
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    teamSize: 5,
    teamsRegistered: 20,
    maxTeams: 50,
    entryFeePerTeam: 500,
    duration: "1 week",
    rewards: [
      {
        position: "1st Team",
        pointsPerMember: 1000,
        teamNft: "Legendary Team Victory NFT",
        value: 5000,
        rarity: 'legendary',
      },
      {
        position: "2nd Team",
        pointsPerMember: 750,
        teamNft: "Epic Team NFT",
        value: 3000,
        rarity: 'epic',
      },
      {
        position: "3rd Team",
        pointsPerMember: 500,
        teamNft: "Rare Team NFT",
        value: 1500,
        rarity: 'rare',
      },
    ],
    rules: [
      "Each team must have exactly 5 members",
      "All members must actively participate",
      "Team captain submits final answers",
      "Scoring is cumulative over the week",
    ],
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const diff = tournament.endTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  const rarityStyles = {
    legendary: { backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '2px solid gold' },
    epic: { backgroundColor: 'rgba(128, 0, 128, 0.1)', border: '2px solid purple' },
    rare: { backgroundColor: 'rgba(0, 0, 255, 0.1)', border: '2px solid blue' },
    default: { backgroundColor: 'rgba(128, 128, 128, 0.1)', border: '2px solid gray' },
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">{tournament.title}</h1>
              <p className="text-gray-400">Form a team and compete for weekly glory</p>
            </div>
            <div className="text-right">
              <div className="text-purple-400 text-sm mb-1">Ends In</div>
              <div className="text-2xl font-bold text-white">{getTimeRemaining()}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                  <Timer className="h-6 w-6 text-blue-400 mx-auto mb-2" />
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

          {/* Rewards Section */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Team Rewards</h2>
            <div className="space-y-6">
              {tournament.rewards.map((reward, index) => {
                const rarity = reward.rarity?.toLowerCase() || 'default';
                const style = rarityStyles[rarity];

                return (
                  <div
                    key={index}
                    className="rounded-lg p-4"
                    style={{
                      ...style,
                      padding: '16px',
                      borderRadius: '8px',
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-lg font-semibold text-white">{reward.position}</div>
                      <div className="text-sm font-semibold" style={{ color: style.border }}>
                        {reward.teamNft}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{reward.pointsPerMember} Points per Member</div>
                    <div className="text-xs text-gray-500">NFT Value: {reward.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WeeklyTeamTournament;
