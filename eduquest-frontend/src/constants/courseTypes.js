// content-types.js
// Quiz Types
export const QUIZ_TYPES = {
    PRACTICE: 'practice',
    COURSE: 'course',
    TOURNAMENT: 'tournament'
  };
  
  // Quiz Difficulty Levels
  export const QUIZ_DIFFICULTY = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  };
  
  // Tournament Types
  export const TOURNAMENT_TYPES = {
    INDIVIDUAL: {
      DAILY: {
        type: 'daily',
        name: 'Daily Challenge',
        duration: '24h',
        reward: {
          points: 50,
          nft: {
            rarity: 'common',
            value: 50
          }
        }
      },
      WEEKLY: {
        type: 'weekly',
        name: 'Weekly League',
        duration: '7d',
        reward: {
          points: 150,
          nft: {
            rarity: 'rare',
            value: 150
          }
        }
      },
      MONTHLY: {
        type: 'monthly',
        name: 'Monthly Championship',
        duration: '30d',
        reward: {
          points: 500,
          nft: {
            rarity: 'epic',
            value: 500
          }
        }
      }
    },
    TEAM: {
      DAILY: {
        type: 'daily',
        name: 'Daily Team Battle',
        duration: '24h',
        teamSize: 3,
        reward: {
          points: 100,
          nft: {
            rarity: 'rare',
            value: 100
          }
        }
      },
      WEEKLY: {
        type: 'weekly',
        name: 'Weekly Team League',
        duration: '7d',
        teamSize: 5,
        reward: {
          points: 300,
          nft: {
            rarity: 'epic',
            value: 300
          }
        }
      },
      MONTHLY: {
        type: 'monthly',
        name: 'Monthly Team Cup',
        duration: '30d',
        teamSize: 5,
        reward: {
          points: 1000,
          nft: {
            rarity: 'legendary',
            value: 1000
          }
        }
      }
    }
  };
  
  // Course Content Types
  export const CONTENT_TYPES = {
    VIDEO: 'video',
    QUIZ: 'quiz',
    READING: 'reading',
    ASSIGNMENT: 'assignment',
    INTERACTIVE: 'interactive'
  };
  
  // Course Completion Requirements
  export const COMPLETION_REQUIREMENTS = {
    WATCH_VIDEOS: 'watch_videos',
    PASS_QUIZZES: 'pass_quizzes',
    SUBMIT_ASSIGNMENTS: 'submit_assignments',
    EARN_POINTS: 'earn_points'
  };
  
  // NFT Types and Values
  export const NFT_TYPES = {
    COURSE_COMPLETION: {
      BEGINNER: {
        value: 100,
        rarity: 'common'
      },
      INTERMEDIATE: {
        value: 200,
        rarity: 'rare'
      },
      ADVANCED: {
        value: 300,
        rarity: 'epic'
      }
    },
    ACHIEVEMENT: {
      QUIZ_MASTER: {
        value: 150,
        rarity: 'rare'
      },
      TOURNAMENT_WINNER: {
        value: 500,
        rarity: 'epic'
      },
      TEAM_CHAMPION: {
        value: 1000,
        rarity: 'legendary'
      }
    }
  };
  
  // Mock Quiz Data for Courses
  export const MOCK_QUIZ_DATA = [
    {
      id: 'q1',
      courseId: '1',
      title: 'Blockchain Fundamentals Quiz',
      questions: [
        {
          id: 1,
          question: 'What is a blockchain?',
          options: [
            'A type of cryptocurrency',
            'A distributed ledger technology',
            'A programming language',
            'A type of database'
          ],
          correctAnswer: 1,
          points: 10
        },
        // More questions...
      ],
      timeLimit: 300, // seconds
      passingScore: 70,
      reward: {
        points: 50,
        nft: {
          rarity: 'common',
          value: 50
        }
      }
    }
    // More quizzes...
  ];
  
  // Export everything we defined above
  export { 
    COURSE_LEVELS,
    COURSE_CATEGORIES,
    NFT_RARITIES,
    MOCK_COURSES
  };