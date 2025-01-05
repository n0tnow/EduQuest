import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, Wallet, Settings, LogOut, GraduationCap, Trophy } from 'lucide-react';
import { useWeb3 } from '../../contexts/Web3Context';
import { useRouter } from 'next/router';

const Header = () => {
  const { account, connectWallet, disconnectWallet } = useWeb3();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    disconnectWallet();
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  const mockUserData = {
    username: 'John Doe',
    level: 15,
    educationLevel: 'University',
    points: 1250
  };

  return (
    <header className="fixed top-0 right-0 h-16 ml-64 w-[calc(100%-16rem)] z-40">
      <div className="h-full px-6 flex items-center justify-between bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        {/* Centered Search with Animation */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl">
          <div className={`relative mx-6 transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <div className={`absolute inset-0 bg-gray-800/50 rounded-xl blur transition-all duration-300 
              ${searchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="relative">
              <Search className={`absolute left-4 top-3 h-5 w-5 transition-colors duration-300
                ${searchFocused ? 'text-purple-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search courses, tournaments..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-800/50 text-white rounded-xl border border-gray-700 
                  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center space-x-6">
          {/* Points Display */}
          <div className="flex items-center px-3 py-1.5 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <Trophy className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold">{mockUserData.points}</span>
          </div>

          {/* Notifications */}
          <div className="relative group">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            
            {/* Notification Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg border border-gray-700 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform 
              origin-top-right">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {/* Notifications content */}
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="relative">
            {account ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white 
                    hover:bg-gray-800/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 
                    flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{mockUserData.username}</div>
                    <div className="text-xs text-gray-400">Level {mockUserData.level}</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 
                    ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                    {/* Wallet */}
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <Wallet className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-400 truncate">
                            {`${account.slice(0, 6)}...${account.slice(-4)}`}
                          </p>
                          <button
                            onClick={disconnectWallet}
                            className="text-red-400 text-xs hover:text-red-300"
                          >
                            Disconnect
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Education Level */}
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-blue-400" />
                        <div className="text-sm text-gray-400">
                          {mockUserData.educationLevel}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => router.push('/profile')}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-gray-400 hover:text-white 
                          hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-400 hover:text-red-300 
                          hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg 
                  hover:bg-purple-700 transition-colors"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;