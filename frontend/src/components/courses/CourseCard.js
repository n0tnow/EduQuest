import React from 'react';
import { useRouter } from 'next/router';
import { Book, Clock, Award } from 'lucide-react';

const CourseCard = ({ course }) => {
  const router = useRouter();

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400';
      case 'rare':
        return 'text-blue-400';
      case 'epic':
        return 'text-purple-400';
      case 'legendary':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm">{course.description}</p>
          </div>
          {course.progress !== undefined && (
            <div className="bg-gray-700 px-3 py-1 rounded-full">
              <span className="text-purple-400 text-sm">{course.progress}%</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(course.level)} bg-gray-700`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
            {course.category}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-gray-700 flex items-center gap-1">
            <Clock size={14} />
            <span className="text-gray-300">{course.duration}</span>
          </span>
        </div>

        <div className="space-y-4">
          {/* Requirements */}
          {course.requirements.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-2">Requirements:</p>
              {course.requirements.map((req) => (
                <div key={req.id} className="flex items-center gap-2 text-sm">
                  <Book size={14} className="text-purple-400" />
                  <span className="text-gray-300">{req.description}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reward */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Reward:</p>
            <div className="flex items-center gap-2">
              <Award size={16} className={getRarityColor(course.reward.rarity)} />
              <span className="text-gray-300 text-sm">{course.reward.name}</span>
              <span className={`text-sm ${getRarityColor(course.reward.rarity)}`}>
                ({course.reward.value} points)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-400">Price:</span>
            <span className="ml-2 text-purple-400">
              {course.price.value} {course.price.type === 'nft' ? 'NFT Points' : 'Tokens'}
            </span>
          </div>
          <button
            onClick={() => router.push(`/courses/${course.id}`)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;