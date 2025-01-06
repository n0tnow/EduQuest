// Course Levels
export const COURSE_LEVELS = {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced'
  };
  
  // NFT Rarities
  export const NFT_RARITIES = {
    COMMON: 'common',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary'
  };
  
  // Course Categories
  export const COURSE_CATEGORIES = {
    PROGRAMMING: 'programming',
    BLOCKCHAIN: 'blockchain',
    DESIGN: 'design',
    BUSINESS: 'business',
    MATHEMATICS: 'mathematics',
    SCIENCE: 'science'
  };
  
  // Mock Course Data
  export const MOCK_COURSES = [
    {
      id: '1',
      title: 'Introduction to Web3 Development',
      description: 'Learn the fundamentals of blockchain and Web3 development',
      level: COURSE_LEVELS.BEGINNER,
      category: COURSE_CATEGORIES.BLOCKCHAIN,
      duration: '10 hours',
      price: {
        type: 'nft',
        value: 100
      },
      requirements: [
        {
          id: 'req1',
          name: 'Basic Programming NFT',
          type: 'nft',
          minValue: 50,
          description: 'Complete basic programming course'
        }
      ],
      reward: {
        type: 'nft',
        name: 'Web3 Developer NFT',
        description: 'Proves your Web3 development skills',
        rarity: NFT_RARITIES.RARE,
        value: 150
      },
      contents: [
        {
          id: 'c1',
          title: 'Understanding Blockchain',
          type: 'video',
          duration: '45 min',
          unlocked: true
        },
        {
          id: 'c2',
          title: 'Web3 Fundamentals Quiz',
          type: 'quiz',
          unlocked: false
        }
      ],
      progress: 0
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      description: 'Master advanced JavaScript design patterns and concepts',
      level: COURSE_LEVELS.ADVANCED,
      category: COURSE_CATEGORIES.PROGRAMMING,
      duration: '15 hours',
      price: {
        type: 'token',
        value: 200
      },
      requirements: [
        {
          id: 'req2',
          name: 'JavaScript Basics NFT',
          type: 'nft',
          minValue: 100,
          description: 'Complete JavaScript fundamentals'
        }
      ],
      reward: {
        type: 'nft',
        name: 'JS Master NFT',
        description: 'Advanced JavaScript mastery proof',
        rarity: NFT_RARITIES.EPIC,
        value: 250
      },
      contents: [
        {
          id: 'c3',
          title: 'Design Patterns Overview',
          type: 'video',
          duration: '60 min',
          unlocked: true
        },
        {
          id: 'c4',
          title: 'Patterns Implementation',
          type: 'video',
          duration: '90 min',
          unlocked: false
        }
      ],
      progress: 0
    }
  ];