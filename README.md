# EduQuest Learn&Earn Platform

![generated-image](https://indigo-charming-bobcat-816.mypinata.cloud/ipfs/bafybeig4ph2a3cgh37ox2nlykocuhqsbn52aayp2oly4uc2wdzbl5t3q3e)

## Vision
EduQuest aims to revolutionize education by democratizing access to quality learning through blockchain technology. Our vision is to create a global educational ecosystem where learning is not just accessible but also rewarding. By combining AI-powered personalization with blockchain incentives, we're building a platform where students from any background can access quality education, earn while they learn, and be rewarded for their achievements.
We believe that by tokenizing educational achievements and creating a learn-to-earn model, we can bridge the gap between education and real-world value. Our platform empowers learners to take control of their educational journey while building a verifiable portfolio of skills through NFTs.


## About The Project
EduQuest is an innovative Learn-to-Earn education platform that combines blockchain technology with AI-powered personalized learning experiences. Built on the Educhain network, it revolutionizes online education by integrating YouTube content as curated learning materials with blockchain rewards and gamification.
The platform creates personalized learning paths using AI, adapting to each student's progress, preferences, and learning style. As users complete courses, participate in quizzes, and contribute to the community, they earn NFTs and points that unlock premium content and tournament entries.
Our unique YouTube-Based Learn-to-Earn model curates high-quality educational content from YouTube, organizing it into structured courses across different subjects and difficulty levels. This is combined with interactive quizzes, AI-driven progress tracking, and blockchain rewards to create an engaging educational ecosystem.

## Key Features

### Personalized Learning
AI-powered learning path recommendations
Progress-based content adaptation
Curated YouTube educational content
Interactive quizzes and assessments
Multi-level courses from primary to university

### Blockchain Integration
NFT rewards for course completion
Achievement-based NFT badges
NFT-gated premium content access
Web3 wallet integration (MetaMask)
Token-based reward system

### Tournament System
Weekly team competitions
Monthly individual tournaments
Live leaderboards
NFT prizes for winners
Point-based entry system

### Community Features
Knowledge sharing platform
Peer learning opportunities
Community challenges
Contribution rewards
Discussion forums

## Installation

1.Clone the repository
`git clone https://github.com/yourusername/EduQuest.git`
`cd EduQuest`

2.Install backend dependencies
`cd backend`
`pip install -r requirements.txt`
`python manage.py migrate`

3.Install frontend dependencies
`cd frontend`
`npm install`

4.Set up environment variables for Backend (.env):
`DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/eduquest`

5.Set up environment variables for Frontend (.env.local):

`NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WEB3_PROVIDER=https://rpc.educhain.network
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...`

6.Run the development servers
"
`Backend`
`python manage.py runserver`
"
`Frontend`
`npm run dev`
