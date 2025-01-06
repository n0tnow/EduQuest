import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useWeb3 } from '../../contexts/Web3Context';
import {
  User,
  Mail,
  GraduationCap,
  Trophy,
  Wallet,
  Save,
  Link2,
  Shield,
  Star,
  Clock,
  Edit,
  Check,
  BookOpen
} from 'lucide-react';

const ProfilePage = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  // Mock user data - gerçekte API'den gelecek
  const [userData, setUserData] = useState({
    username: 'John Doe',
    email: 'john@example.com',
    educationLevel: 'university',
    interests: ['programming', 'mathematics', 'blockchain'],
    level: 15,
    points: 1250,
    completedCourses: 12,
    earnedNFTs: 8,
    achievements: [
      {
        id: 1,
        title: 'Quick Learner',
        description: 'Completed 5 courses in a week',
        date: '2024-01-01',
        icon: <Star className="h-6 w-6 text-yellow-400" />
      },
      {
        id: 2,
        title: 'Early Bird',
        description: 'Completed 10 courses before deadline',
        date: '2024-01-15',
        icon: <Clock className="h-6 w-6 text-blue-400" />
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleSave = async () => {
    try {
      // API call to update user data
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const levelProgress = (userData.points % 1000) / 10; // Her 1000 puan bir seviye

  return (
    <Layout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Kolon - Profil ve Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profil Kartı */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 
                      flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
                      <p className="text-gray-400">Level {userData.level}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {isEditing ? (
                      <Check className="h-5 w-5 text-green-400" />
                    ) : (
                      <Edit className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Level Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress to Level {userData.level + 1}</span>
                    <span>{levelProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <Trophy className="h-5 w-5 text-purple-400 mb-2" />
                    <div className="text-sm text-gray-400">Points</div>
                    <div className="text-lg font-semibold text-white">{userData.points}</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <BookOpen className="h-5 w-5 text-blue-400 mb-2" />
                    <div className="text-sm text-gray-400">Courses</div>
                    <div className="text-lg font-semibold text-white">{userData.completedCourses}</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <Star className="h-5 w-5 text-yellow-400 mb-2" />
                    <div className="text-sm text-gray-400">NFTs</div>
                    <div className="text-lg font-semibold text-white">{userData.earnedNFTs}</div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <GraduationCap className="h-5 w-5 text-green-400 mb-2" />
                    <div className="text-sm text-gray-400">Level</div>
                    <div className="text-lg font-semibold text-white">{userData.level}</div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-3" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Education Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Education Level
                    </label>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-gray-500 mr-3" />
                      <select
                        value={formData.educationLevel}
                        onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}
                        disabled={!isEditing}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 disabled:opacity-50"
                      >
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="high">High School</option>
                        <option value="university">University</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                  </div>

                  {/* Wallet Connection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Wallet Connection
                    </label>
                    <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center">
                        <Wallet className="h-5 w-5 text-purple-400 mr-3" />
                        <div>
                          {account ? (
                            <div className="text-sm text-gray-300">
                              {`${account.slice(0, 6)}...${account.slice(-4)}`}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">No wallet connected</div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={account ? disconnectWallet : connectWallet}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          account
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                        }`}
                      >
                        {account ? 'Disconnect' : 'Connect Wallet'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                        transition-colors flex items-center"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Kolon - Başarılar */}
            <div className="space-y-6">
              {/* Achievements Card */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
                <div className="space-y-4">
                  {userData.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Security</h3>
                <div className="space-y-4">
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-700/50 rounded-xl 
                      hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-purple-400 mr-3" />
                      <span className="text-gray-300">Change Password</span>
                    </div>
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-4 bg-gray-700/50 rounded-xl 
                      hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <Link2 className="h-5 w-5 text-purple-400 mr-3" />
                      <span className="text-gray-300">Connected Apps</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;