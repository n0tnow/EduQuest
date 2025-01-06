import React from 'react';
import Layout from '../../components/layout/Layout';
import { BookOpen, Clock, Award, PlayCircle, Trophy, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

const MyLearning = () => {
  const router = useRouter();
  
  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: '1',
      title: 'Advanced Blockchain Development',
      description: 'Learn advanced concepts of blockchain',
      lastAccessed: new Date(),
      progress: 75,
      duration: '5h remaining',
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript',
      lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      progress: 45,
      duration: '8h remaining',
    },
    {
      id: '3',
      title: 'React Development',
      description: 'Build modern web applications',
      lastAccessed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      progress: 30,
      duration: '12h remaining',
    }
  ];

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Learning</h1>
          <p className="text-gray-400 mt-2">
            Track your progress and continue learning
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <h3 className="ml-3 text-lg font-semibold text-white">
                Enrolled Courses
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {enrolledCourses.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-400" />
              <h3 className="ml-3 text-lg font-semibold text-white">
                Learning Hours
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">24.5h</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-green-400" />
              <h3 className="ml-3 text-lg font-semibold text-white">
                Certificates Earned
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">2</p>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden">
                {/* Course Progress Bar */}
                <div className="w-full bg-gray-700 h-1">
                  <div 
                    className="bg-purple-600 h-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Last accessed: {course.lastAccessed.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-purple-400 font-semibold">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Continue
                    </button>
                    <div className="text-gray-400 text-sm">
                      {course.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Recent Achievements</h2>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  title: 'Quick Learner',
                  description: 'Completed 2 courses in a week',
                  icon: <Trophy className="h-8 w-8 text-yellow-400" />,
                  date: '2 days ago'
                },
                {
                  id: 2,
                  title: 'Quiz Master',
                  description: 'Scored 100% in 3 consecutive quizzes',
                  icon: <Award className="h-8 w-8 text-purple-400" />,
                  date: '1 week ago'
                }
              ].map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {achievement.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/courses/available')}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Explore More Courses
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyLearning;