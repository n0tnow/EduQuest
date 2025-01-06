import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import {
  Search,
  Filter,
  Clock,
  Users,
  Trophy,
  Tag,
  BookOpen,
  Code,
  Calculator,
  Briefcase,
  Palette,
  Globe,
  Brain
} from 'lucide-react';

const AvailableCourses = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    level: 'all',
    duration: 'all',
    nftRarity: 'all'
  });

  // Kategoriler
  const categories = [
    { id: 'programming', name: 'Programming & Development', icon: <Code className="w-4 h-4" /> },
    { id: 'mathematics', name: 'Mathematics & Science', icon: <Calculator className="w-4 h-4" /> },
    { id: 'business', name: 'Business & Economics', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'arts', name: 'Arts & Design', icon: <Palette className="w-4 h-4" /> },
    { id: 'languages', name: 'Languages', icon: <Globe className="w-4 h-4" /> },
    { id: 'personal', name: 'Personal Development', icon: <Brain className="w-4 h-4" /> }
  ];

  // Eğitim Seviyeleri
  const educationLevels = [
    { id: 'primary', name: 'Primary School (6-10)', points: 50 },
    { id: 'secondary', name: 'Secondary School (11-13)', points: 100 },
    { id: 'high', name: 'High School (14-18)', points: 150 },
    { id: 'university', name: 'University', points: 200 },
    { id: 'professional', name: 'Professional', points: 250 }
  ];

  // Kurs Süreleri
  const durations = [
    { id: 'short', name: 'Quick (0-5 hours)' },
    { id: 'medium', name: 'Standard (5-20 hours)' },
    { id: 'long', name: 'Comprehensive (20+ hours)' }
  ];

  // NFT Nadirlik Seviyeleri
  const nftRarities = [
    { id: 'common', name: 'Common', points: '100 points', color: 'text-gray-400' },
    { id: 'rare', name: 'Rare', points: '200-300 points', color: 'text-blue-400' },
    { id: 'epic', name: 'Epic', points: '400-500 points', color: 'text-purple-400' },
    { id: 'legendary', name: 'Legendary', points: '500+ points', color: 'text-yellow-400' }
  ];

  // Mock kurs verisi
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      category: 'programming',
      level: 'secondary',
      duration: 'medium',
      nftRarity: 'rare',
      description: 'Learn modern web development with HTML, CSS, and JavaScript',
      enrolled: 1234,
      hours: 15,
      requirements: ['Basic computer knowledge'],
      reward: {
        name: 'Web Developer NFT',
        points: 250
      }
    },
    // Daha fazla kurs eklenebilir...
  ];

  // Filtre fonksiyonları
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredCourses = courses.filter(course => {
    return (
      (selectedFilters.category === 'all' || course.category === selectedFilters.category) &&
      (selectedFilters.level === 'all' || course.level === selectedFilters.level) &&
      (selectedFilters.duration === 'all' || course.duration === selectedFilters.duration) &&
      (selectedFilters.nftRarity === 'all' || course.nftRarity === selectedFilters.nftRarity) &&
      (searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Available Courses</h1>
          <p className="text-gray-400 mt-2">
            Learn, earn NFTs, and unlock new opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilterChange('category', category.id)}
                className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                  selectedFilters.category === category.id
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.icon}
                <span className="ml-2 text-sm">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Education Level Filter */}
            <select
              value={selectedFilters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              className="bg-gray-700 text-white rounded-lg border border-gray-600 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            >
              <option value="all">All Levels</option>
              {educationLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name} ({level.points} points)
                </option>
              ))}
            </select>

            {/* Duration Filter */}
            <select
              value={selectedFilters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="bg-gray-700 text-white rounded-lg border border-gray-600 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            >
              <option value="all">All Durations</option>
              {durations.map(duration => (
                <option key={duration.id} value={duration.id}>
                  {duration.name}
                </option>
              ))}
            </select>

            {/* NFT Rarity Filter */}
            <select
              value={selectedFilters.nftRarity}
              onChange={(e) => handleFilterChange('nftRarity', e.target.value)}
              className="bg-gray-700 text-white rounded-lg border border-gray-600 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            >
              <option value="all">All NFT Types</option>
              {nftRarities.map(rarity => (
                <option key={rarity.id} value={rarity.id}>
                  {rarity.name} ({rarity.points})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{course.hours} hours</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">{course.enrolled} enrolled</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-400">
                        <Tag className="w-4 h-4 mr-2" />
                        {req}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-purple-400 mr-2" />
                      <span className="text-purple-400">{course.reward.points} Points</span>
                    </div>
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Filter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AvailableCourses;