import React, { useState } from 'react';
import CourseCard from './CourseCard';
import { Search, Filter } from 'lucide-react';
import { COURSE_LEVELS, COURSE_CATEGORIES } from '../../constants/courseTypes';

const CourseList = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Level Filter */}
          <div className="min-w-[150px]">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Levels</option>
              {Object.entries(COURSE_LEVELS).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="min-w-[150px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {Object.entries(COURSE_CATEGORIES).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <Filter size={48} className="mx-auto mb-4 text-purple-400" />
          <p className="text-xl">No courses found</p>
          <p className="text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;