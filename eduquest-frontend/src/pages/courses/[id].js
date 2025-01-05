import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import {
  PlayCircle,
  CheckCircle,
  Lock,
  Award,
  ChevronDown,
  ChevronUp,
  Trophy,
  Users,
  Timer,
  Star,
  BookOpen
} from 'lucide-react';
import QuizModal from '../../pages/courses/QuizModal';
import VideoPlayer from '../../pages/courses/VideoPlayer';

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Mock course data
  const course = {
    id: '1',
    title: 'Web3 Development Fundamentals',
    description: 'Learn the basics of Web3 and blockchain development',
    instructor: 'John Doe',
    enrolled: 1234,
    rating: 4.8,
    sections: [
      {
        id: 's1',
        title: 'Introduction to Web3',
        videos: [
          {
            id: 'v1',
            title: 'What is Web3?',
            duration: '10:30',
            videoId: 'VIDEO_ID_1',
            completed: true,
          },
          {
            id: 'v2',
            title: 'Blockchain Basics',
            duration: '15:45',
            videoId: 'VIDEO_ID_2',
            completed: false,
          }
        ],
        quiz: {
          id: 'q1',
          title: 'Web3 Fundamentals Quiz',
          questions: [
            {
              id: 'q1_1',
              question: 'What is Web3?',
              options: [
                'A new internet protocol',
                'Decentralized web',
                'A programming language',
                'A web browser'
              ],
              correctAnswer: 1,
              explanation: 'Web3 refers to the decentralized web, powered by blockchain technology.'
            }
          ],
          completed: false,
          requiredScore: 70,
          attempts: 0,
          maxAttempts: 3
        }
      }
    ],
    finalExam: {
      id: 'final',
      title: 'Course Final Exam',
      available: false,
      requiredProgress: 80,
      questions: [],
      reward: {
        name: 'Web3 Master NFT',
        rarity: 'legendary',
        points: 500,
        image: '🏆'
      }
    },
    progress: {
      overall: 45,
      videosCompleted: 5,
      totalVideos: 12,
      quizzesCompleted: 1,
      totalQuizzes: 3
    },
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of web development concepts',
      'Familiarity with React'
    ],
    rewards: {
      sectionNFTs: [
        {
          id: 'nft1',
          title: 'Web3 Explorer',
          type: 'bronze',
          requirement: 'Complete Section 1',
          claimed: false,
          points: 100,
          image: '🥉'
        },
        {
          id: 'nft2',
          title: 'Smart Contract Builder',
          type: 'silver',
          requirement: 'Complete Section 2',
          claimed: false,
          points: 200,
          image: '🥈'
        }
      ],
      courseNFT: {
        id: 'cnft1',
        title: 'Web3 Master',
        type: 'legendary',
        requirement: 'Complete Course with 90%+ score',
        claimed: false,
        points: 500,
        image: '🏆'
      }
    }
  };

  const handleVideoComplete = (videoId) => {
    console.log('Video completed:', videoId);
    // Update video completion status
  };

  const handleQuizStart = (quiz) => {
    setActiveQuiz(quiz);
    setShowQuizModal(true);
  };

  const handleQuizSubmit = (answers, score) => {
    console.log('Quiz submitted:', { answers, score });
    // Update quiz completion status and progress
    setShowQuizModal(false);
  };

  const getSectionStatus = (section) => {
    const totalVideos = section.videos.length;
    const completedVideos = section.videos.filter(v => v.completed).length;
    
    if (completedVideos === totalVideos && section.quiz.completed) {
      return { status: 'completed', icon: <CheckCircle className="h-5 w-5 text-green-500" /> };
    }
    if (completedVideos > 0) {
      return { status: 'in_progress', icon: <PlayCircle className="h-5 w-5 text-blue-500" /> };
    }
    return { status: 'not_started', icon: <Lock className="h-5 w-5 text-gray-500" /> };
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-gray-400 mb-4">{course.description}</p>
            
            {/* Instructor & Stats */}
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center text-gray-400">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>By {course.instructor}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Users className="h-5 w-5 mr-2" />
                <span>{course.enrolled} enrolled</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">Requirements</h3>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{course.progress.overall}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${course.progress.overall}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Videos</div>
                <div className="text-white font-semibold">
                  {course.progress.videosCompleted}/{course.progress.totalVideos}
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="text-gray-400 text-sm mb-1">Quizzes</div>
                <div className="text-white font-semibold">
                  {course.progress.quizzesCompleted}/{course.progress.totalQuizzes}
                </div>
              </div>
            </div>

            {/* Final NFT Preview */}
            {course.rewards.courseNFT && (
              <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">Course Completion NFT</h4>
                  <span className="text-3xl">{course.rewards.courseNFT.image}</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">{course.rewards.courseNFT.title}</div>
                <div className="flex items-center text-purple-400">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{course.rewards.courseNFT.points} points</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="aspect-video bg-gray-800 rounded-xl mb-4 overflow-hidden">
                <VideoPlayer
                  videoId={activeVideo.videoId}
                  onComplete={() => handleVideoComplete(activeVideo.id)}
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
                <p className="text-gray-400">Select a video to start learning</p>
              </div>
            )}

            {/* Current Video Info */}
            {activeVideo && (
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{activeVideo.title}</h3>
                <div className="flex items-center text-gray-400">
                  <Timer className="h-4 w-4 mr-2" />
                  <span>{activeVideo.duration}</span>
                </div>
              </div>
            )}
          </div>

          {/* Course Content Section */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-xl font-bold text-white mb-4">Course Content</h3>
            
            {course.sections.map((section) => {
              const sectionStatus = getSectionStatus(section);
              
              return (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    <div className="flex items-center">
                      {sectionStatus.icon}
                      <span className="text-white font-semibold ml-3">{section.title}</span>
                    </div>
                    {activeSection === section.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {activeSection === section.id && (
                    <div className="mt-2 space-y-2">
                      {section.videos.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => setActiveVideo(video)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg 
                            hover:bg-gray-700 ${activeVideo?.id === video.id ? 'bg-gray-700' : ''}`}
                        >
                          <div className="flex items-center">
                            {video.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <span className="text-gray-300">{video.title}</span>
                          </div>
                          <span className="text-gray-500 text-sm">{video.duration}</span>
                        </button>
                      ))}
                      
                      {/* Section Quiz */}
                      <button
                        onClick={() => handleQuizStart(section.quiz)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg ${
                          section.quiz.completed 
                            ? 'bg-green-900/20 hover:bg-green-900/30' 
                            : 'hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          {section.quiz.completed ? (
                            <Trophy className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <Award className="h-5 w-5 text-purple-400 mr-2" />
                          )}
                          <span className="text-gray-300">{section.quiz.title}</span>
                        </div>
                        {section.quiz.completed ? (
                          <span className="text-green-500 text-sm">Completed</span>
                        ) : (
                          <span className="text-purple-400 text-sm">Start Quiz</span>
                        )}
                      </button>

                      {/* Section NFT Reward */}
                      {section.quiz.completed && (
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-400">Section Reward</div>
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 text-purple-400 mr-1" />
                                <span className="text-purple-400">100 Points + NFT</span>
                              </div>
                            </div>
                            <button
                              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg 
                                hover:bg-purple-700 transition-colors"
                            >
                              Claim
                            </button>
                          </div>
                        </div>
                      )}
                      </div>
                  )}
                </div>
              );
            })}

            {/* Final Exam Section */}
            {course.progress.overall >= course.finalExam.requiredProgress ? (
              <div className="mt-6">
                <button
                  onClick={() => handleQuizStart(course.finalExam)}
                  className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl
                    hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-lg">Final Exam</h4>
                      <p className="text-gray-200 text-sm">Complete to earn your NFT</p>
                    </div>
                    <div className="text-3xl">{course.rewards.courseNFT.image}</div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-gray-700 rounded-xl">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="text-white font-semibold">Final Exam Locked</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Complete {course.finalExam.requiredProgress}% of the course to unlock
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quiz Modal */}
        {showQuizModal && activeQuiz && (
          <QuizModal
            quiz={activeQuiz}
            onClose={() => {
              setShowQuizModal(false);
              setActiveQuiz(null);
            }}
            onSubmit={handleQuizSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default CourseDetail;