import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import {
  BookOpen,
  Clock,
  Award,
  Star,
  Trophy,
  Play,
  CheckCircle
} from 'lucide-react';

const CoursesPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState('all'); // 'all', 'inProgress', 'completed'

  // Mock kurs verisi - gerçekte API'den gelecek
  const courses = [
    {
      id: 1,
      title: 'Web Geliştirme Temelleri',
      description: 'HTML, CSS ve JavaScript ile modern web geliştirme',
      level: 'Başlangıç',
      category: 'programming',
      duration: '20 saat',
      progress: 30,
      thumbnail: 'https://www.youtube.com/watch?v=VIDEO_ID',
      videoCount: 24,
      completedVideos: 8,
      lastWatched: '2 saat önce',
      nftReward: {
        name: 'Web Developer NFT',
        rarity: 'rare',
        points: 100,
        image: '🌐'
      }
    },
    {
      id: 2,
      title: 'Python ile Veri Bilimi',
      description: 'Python kullanarak veri analizi ve görselleştirme',
      level: 'İleri Seviye',
      category: 'data-science',
      duration: '30 saat',
      progress: 75,
      thumbnail: 'https://www.youtube.com/watch?v=VIDEO_ID',
      videoCount: 36,
      completedVideos: 27,
      lastWatched: '5 saat önce',
      nftReward: {
        name: 'Data Scientist NFT',
        rarity: 'epic',
        points: 250,
        image: '📊'
      }
    },
    {
      id: 3,
      title: 'Blockchain ve Web3',
      description: 'Temel blockchain kavramları ve Web3 geliştirme',
      level: 'Orta Seviye',
      category: 'blockchain',
      duration: '25 saat',
      progress: 100,
      thumbnail: 'https://www.youtube.com/watch?v=VIDEO_ID',
      videoCount: 30,
      completedVideos: 30,
      lastWatched: '1 gün önce',
      nftReward: {
        name: 'Blockchain Master NFT',
        rarity: 'legendary',
        points: 500,
        image: '⛓️'
      }
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filter === 'inProgress') {
      return course.progress > 0 && course.progress < 100;
    }
    if (filter === 'completed') {
      return course.progress === 100;
    }
    return true;
  });

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <BookOpen className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="text-white font-semibold">Toplam Kurs</h3>
            </div>
            <p className="text-2xl font-bold text-white">{courses.length}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <Clock className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-white font-semibold">Toplam Süre</h3>
            </div>
            <p className="text-2xl font-bold text-white">75 saat</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <Trophy className="h-6 w-6 text-yellow-400 mr-2" />
              <h3 className="text-white font-semibold">Kazanılan NFT</h3>
            </div>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Tüm Dersler
          </button>
          <button
            onClick={() => setFilter('inProgress')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'inProgress' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Devam Edenler
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'completed' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Tamamlananlar
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-1">
                <div 
                  className="bg-purple-600 h-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="p-6">
                {/* Course Icon & Title */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-4xl mb-2 block">{course.nftReward.image}</span>
                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{course.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {course.level}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm">İlerleme</div>
                    <div className="text-white font-semibold">
                      {course.progress}%
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm">Video</div>
                    <div className="text-white font-semibold">
                      {course.completedVideos}/{course.videoCount}
                    </div>
                  </div>
                </div>

                {/* NFT Reward */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Kazanılacak NFT:</div>
                  <div className="flex items-center">
                    <Trophy className={`h-4 w-4 mr-2 ${getRarityColor(course.nftReward.rarity)}`} />
                    <span className={`text-sm ${getRarityColor(course.nftReward.rarity)}`}>
                      {course.nftReward.name} ({course.nftReward.points} Puan)
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 
                    transition-colors flex items-center justify-center"
                >
                  {course.progress === 100 ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Tamamlandı
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      {course.progress > 0 ? 'Devam Et' : 'Başla'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;