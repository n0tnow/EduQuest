import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import {
  Map,
  ChevronRight,
  Lock,
  CheckCircle,
  Trophy,
  Star,
  Timer,
  Users,
  Play
} from 'lucide-react';

const LearningPath = () => {
  const router = useRouter();

  // Mock kullanıcı verisi
  const userData = {
    level: 'university',
    interests: ['programming', 'blockchain'],
    completedCourses: ['course1', 'course2']
  };

  // Mock learning path verisi
  const learningPath = {
    title: "Blockchain Developer Path",
    description: "Complete learning path to become a blockchain developer",
    totalCourses: 8,
    completedCourses: 2,
    estimatedTime: "40 hours",
    difficulty: "Intermediate",
    stages: [
      {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn the basics of web development",
        status: "completed",
        courses: [
          {
            id: "course1",
            title: "HTML & CSS Basics",
            duration: "5 hours",
            completed: true,
            enrolled: 1234,
            reward: {
              points: 100,
              nft: {
                name: "Web Basics NFT",
                rarity: "common"
              }
            }
          },
          {
            id: "course2",
            title: "JavaScript Essentials",
            duration: "8 hours",
            completed: true,
            enrolled: 986,
            reward: {
              points: 150,
              nft: {
                name: "JavaScript NFT",
                rarity: "rare"
              }
            }
          }
        ]
      },
      {
        id: 2,
        title: "Blockchain Fundamentals",
        description: "Master the basics of blockchain technology",
        status: "in_progress",
        courses: [
          {
            id: "course3",
            title: "Blockchain Basics",
            duration: "6 hours",
            completed: false,
            enrolled: 756,
            reward: {
              points: 200,
              nft: {
                name: "Blockchain Beginner NFT",
                rarity: "rare"
              }
            }
          },
          {
            id: "course4",
            title: "Smart Contracts 101",
            duration: "10 hours",
            completed: false,
            locked: true,
            enrolled: 543,
            reward: {
              points: 250,
              nft: {
                name: "Smart Contract NFT",
                rarity: "epic"
              }
            }
          }
        ]
      },
      {
        id: 3,
        title: "Advanced Development",
        description: "Advanced blockchain development concepts",
        status: "locked",
        courses: [
          {
            id: "course5",
            title: "DApp Development",
            duration: "12 hours",
            completed: false,
            locked: true,
            enrolled: 432,
            reward: {
              points: 300,
              nft: {
                name: "DApp Developer NFT",
                rarity: "legendary"
              }
            }
          }
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in_progress':
        return 'text-blue-400';
      case 'locked':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-400/10 border-green-400/20';
      case 'in_progress':
        return 'bg-blue-400/10 border-blue-400/20';
      case 'locked':
        return 'bg-gray-700/50 border-gray-600/20';
      default:
        return 'bg-gray-700/50 border-gray-600/20';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Map className="h-6 w-6 text-purple-400 mr-2" />
            <h1 className="text-3xl font-bold text-white">{learningPath.title}</h1>
          </div>
          <p className="text-gray-400">{learningPath.description}</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Total Courses</div>
            <div className="text-2xl font-bold text-white">{learningPath.totalCourses}</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Completed</div>
            <div className="text-2xl font-bold text-white">{learningPath.completedCourses}</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Estimated Time</div>
            <div className="text-2xl font-bold text-white">{learningPath.estimatedTime}</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-1">Difficulty</div>
            <div className="text-2xl font-bold text-white">{learningPath.difficulty}</div>
          </div>
        </div>

        {/* Learning Path Steps */}
        <div className="space-y-8">
          {learningPath.stages.map((stage, index) => (
            <div key={stage.id} className="relative">
              {/* Connection Line */}
              {index < learningPath.stages.length - 1 && (
                <div className="absolute top-24 left-8 w-0.5 h-[calc(100%-4rem)] bg-gray-700"></div>
              )}

              {/* Stage Header */}
              <div className={`relative z-10 flex items-center mb-4 ${
                stage.status === 'locked' ? 'opacity-50' : ''
              }`}>
                <div className={`w-16 h-16 rounded-xl ${getStatusBg(stage.status)} border 
                  flex items-center justify-center`}>
                  {stage.status === 'completed' ? (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  ) : stage.status === 'locked' ? (
                    <Lock className="h-8 w-8 text-gray-500" />
                  ) : (
                    <div className="h-8 w-8 rounded-full border-4 border-blue-400" />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                  <p className="text-gray-400">{stage.description}</p>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-20">
                {stage.courses.map((course) => (
                  <div
                    key={course.id}
                    className={`bg-gray-800 rounded-xl overflow-hidden ${
                      course.locked ? 'opacity-50' : ''
                    }`}
                  >
                    {/* Course Progress Bar */}
                    {course.completed && (
                      <div className="w-full h-1 bg-green-500" />
                    )}

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                        {course.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : course.locked ? (
                          <Lock className="h-5 w-5 text-gray-500" />
                        ) : null}
                      </div>

                      {/* Course Stats */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-gray-400">
                          <Timer className="h-4 w-4 mr-1" />
                          <span className="text-sm">{course.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm">{course.enrolled} enrolled</span>
                        </div>
                      </div>

                      {/* Reward Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-purple-400">{course.reward.points} Points</span>
                        </div>
                        {!course.locked && (
                          <button
                            onClick={() => router.push(`/courses/${course.id}`)}
                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg 
                              hover:bg-purple-700 transition-colors"
                          >
                            {course.completed ? (
                              <>
                                <Star className="h-4 w-4 mr-2" />
                                Review
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearningPath;