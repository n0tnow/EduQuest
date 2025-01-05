import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { 
  Users, 
  Plus, 
  Star, 
  MessageSquare, 
  HelpCircle,
  Search,
  ThumbsUp,
  MessageCircle,
  Award,
  Bookmark,
  Share2,
  Filter,
  TrendingUp,
  Clock,
  Tag
} from 'lucide-react';

const CommunityPlatform = () => {
  const [activeTab, setActiveTab] = useState('allTopics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for topics
  const [topics, setTopics] = useState([
    {
      id: '1',
      title: 'How to optimize React performance?',
      description: 'Looking for best practices to make React apps faster and more efficient. Specifically interested in memo, useMemo, and useCallback usage patterns.',
      createdBy: 'JohnDoe',
      category: 'programming',
      tags: ['react', 'performance', 'optimization'],
      participants: 12,
      points: 45,
      likes: 23,
      replies: 8,
      isBookmarked: false,
      created: '2024-01-05T10:30:00',
      lastActivity: '2024-01-05T14:20:00',
      status: 'active'
    },
    {
      id: '2',
      title: 'Understanding Blockchain Basics',
      description: 'Can someone explain how consensus algorithms work in blockchain? Particularly interested in PoW vs PoS mechanisms.',
      createdBy: 'CryptoGuru',
      category: 'blockchain',
      tags: ['blockchain', 'consensus', 'crypto'],
      participants: 25,
      points: 100,
      likes: 45,
      replies: 15,
      isBookmarked: true,
      created: '2024-01-04T15:45:00',
      lastActivity: '2024-01-05T16:30:00',
      status: 'solved'
    },
    {
      id: '3',
      title: 'Web3 Development Resources',
      description: 'Collecting the best resources for learning Web3 development. Share your favorite tutorials, courses, and documentation!',
      createdBy: 'Web3Fan',
      category: 'resources',
      tags: ['web3', 'learning', 'resources'],
      participants: 34,
      points: 150,
      likes: 67,
      replies: 22,
      isBookmarked: false,
      created: '2024-01-03T09:15:00',
      lastActivity: '2024-01-05T15:45:00',
      status: 'featured'
    }
  ]);

  const categories = [
    { id: 'programming', name: 'Programming', color: 'text-blue-400' },
    { id: 'blockchain', name: 'Blockchain', color: 'text-purple-400' },
    { id: 'resources', name: 'Resources', color: 'text-green-400' },
    { id: 'questions', name: 'Questions', color: 'text-yellow-400' },
    { id: 'discussion', name: 'Discussion', color: 'text-pink-400' }
  ];

  const [newTopic, setNewTopic] = useState({ 
    title: '', 
    description: '', 
    category: '',
    tags: []
  });

  const [leaderboard, setLeaderboard] = useState([
    { 
      username: 'JohnDoe',
      points: 150,
      badges: ['Top Contributor', 'Problem Solver'],
      topics: 12,
      solutions: 25,
      streak: 7
    },
    { 
      username: 'CryptoGuru',
      points: 120,
      badges: ['Blockchain Expert', 'Mentor'],
      topics: 8,
      solutions: 18,
      streak: 5
    },
    { 
      username: 'Web3Fan',
      points: 90,
      badges: ['Rising Star'],
      topics: 6,
      solutions: 12,
      streak: 3
    }
  ]);

  const addNewTopic = () => {
    if (!newTopic.title || !newTopic.description || !newTopic.category) return;

    const newEntry = {
      id: (topics.length + 1).toString(),
      ...newTopic,
      createdBy: 'CurrentUser',
      participants: 0,
      points: 0,
      likes: 0,
      replies: 0,
      isBookmarked: false,
      created: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      status: 'active'
    };

    setTopics([newEntry, ...topics]);
    setNewTopic({ title: '', description: '', category: '', tags: [] });
    setActiveTab('allTopics');
  };

  const handleBookmark = (topicId) => {
    setTopics(topics.map(topic => 
      topic.id === topicId 
        ? { ...topic, isBookmarked: !topic.isBookmarked }
        : topic
    ));
  };

  const handleLike = (topicId) => {
    setTopics(topics.map(topic =>
      topic.id === topicId
        ? { ...topic, likes: topic.likes + 1 }
        : topic
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'featured': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filteredTopics = topics
    .filter(topic => {
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created) - new Date(a.created);
        case 'popular':
          return b.likes - a.likes;
        case 'active':
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        default:
          return 0;
      }
    });

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Community Platform</h1>
          <p className="text-gray-400">Collaborate, share knowledge, and grow together</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories & Filters */}
          <div className="space-y-6">
            {/* Create Topic Button */}
            <button
              onClick={() => setActiveTab('newTopic')}
              className="w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 
                rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Topic
            </button>

            {/* Categories */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { id: 'newest', name: 'Newest', icon: <Clock className="h-4 w-4" /> },
                  { id: 'popular', name: 'Most Popular', icon: <TrendingUp className="h-4 w-4" /> },
                  { id: 'active', name: 'Most Active', icon: <MessageCircle className="h-4 w-4" /> }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      sortBy === option.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {option.icon}
                    <span className="ml-2">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white rounded-xl 
                  border border-gray-700 focus:border-purple-500 focus:ring-2 
                  focus:ring-purple-500/20 focus:outline-none"
              />
            </div>

            {/* Topics List */}
            {activeTab === 'allTopics' && (
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-gray-800 rounded-xl p-6 transition-all duration-300 
                      hover:transform hover:scale-[1.01]"
                  >
                    {/* Topic Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white hover:text-purple-400 
                          transition-colors cursor-pointer">
                          {topic.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="text-gray-400">by {topic.createdBy}</span>
                          <span className="text-gray-400">{getTimeAgo(topic.created)}</span>
                          <span className={`px-2 py-0.5 rounded-lg border ${
                            getStatusColor(topic.status)
                          }`}>
                            {topic.status.charAt(0).toUpperCase() + topic.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookmark(topic.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          topic.isBookmarked 
                            ? 'text-purple-400 bg-purple-400/10' 
                            : 'text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Topic Content */}
                    <p className="text-gray-400 mb-4">{topic.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Topic Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleLike(topic.id)}
                          className="flex items-center text-gray-400 hover:text-purple-400 
                            transition-colors"
                        >
                          <ThumbsUp className="h-5 w-5 mr-1" />
                          <span>{topic.likes}</span>
                        </button>
                        <button
                          className="flex items-center text-gray-400 hover:text-purple-400 
                            transition-colors"
                        >
                          <MessageSquare className="h-5 w-5 mr-1" />
                          <span>{topic.replies}</span>
                        </button>
                        <div className="flex items-center text-gray-400">
                          <Users className="h-5 w-5 mr-1" />
                          <span>{topic.participants}</span>
                        </div>
                      </div>
                      <button
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* New Topic Form */}
            {activeTab === 'newTopic' && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Create New Topic</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter topic title..."
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border 
                        border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                      placeholder="Describe your topic..."
                      value={newTopic.description}
                      onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border 
                        border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Category</label>
                    <select
                      value={newTopic.category}
                      onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border 
                        border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Tags</label>
                    <input
                      type="text"
                      placeholder="Enter tags separated by commas..."
                      onChange={(e) => setNewTopic({ 
                        ...newTopic, 
                        tags: e.target.value.split(',').map(tag => tag.trim()) 
                      })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border 
                        border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setActiveTab('allTopics')}
                      className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewTopic}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg 
                        hover:bg-purple-700 transition-colors"
                    >
                      Create Topic
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {leaderboard.slice(0, 3).map((user, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 
                      to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{user.username}</div>
                      <div className="text-sm text-gray-400">{user.points} points</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 
                              text-purple-400 border border-purple-500/20"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Topics</div>
                  <div className="text-xl font-bold text-white">12</div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Solutions</div>
                  <div className="text-xl font-bold text-white">25</div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Streak</div>
                  <div className="text-xl font-bold text-white">7 days</div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-400">Reputation</div>
                  <div className="text-xl font-bold text-white">450</div>
                </div>
              </div>
            </div>

            {/* Hot Topics */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-4">Hot Topics</h3>
              <div className="space-y-3">
                {topics.slice(0, 5).sort((a, b) => b.likes - a.likes).map((topic) => (
                  <div key={topic.id} className="flex items-start space-x-3">
                    <div className="flex-1">
                      <div className="text-white font-medium hover:text-purple-400 
                        transition-colors cursor-pointer">
                        {topic.title}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{topic.likes} likes</span>
                        <span>•</span>
                        <span>{topic.replies} replies</span>
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

export default CommunityPlatform;