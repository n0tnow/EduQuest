# EduQuest Learn&Earn Platform

![generated-image](https://indigo-charming-bobcat-816.mypinata.cloud/ipfs/bafybeig4ph2a3cgh37ox2nlykocuhqsbn52aayp2oly4uc2wdzbl5t3q3e)

## About Me
Hello. I am Bilal Kaya, a third-year Software Engineering student at Beykoz University, studying on a full scholarship. With skills in C++, C#, Python, OOP, and web development frameworks like Django, I have built several projects, including a Bakery-Cafe Management System and a Fitness Center Management System. I am also proficient in developing RESTful APIs and working with SQL databases. I participated in several RiseIn  Bootcamps, where I deepened my knowledge of modern technologies and blockchain development. My goal is to build innovative, impactful solutions in the tech industry.

## [Project Video](https://www.youtube.com/watch?v=6NcDQXKno4k)

## Vision
EduQuest aims to revolutionize education by democratizing access to quality learning through blockchain technology. Our vision is to create a global educational ecosystem where learning is not just accessible but also rewarding. By combining AI-powered personalization with blockchain incentives, we're building a platform where students from any background can access quality education, earn while they learn, and be rewarded for their achievements.
We believe that by tokenizing educational achievements and creating a learn-to-earn model, we can bridge the gap between education and real-world value. Our platform empowers learners to take control of their educational journey while building a verifiable portfolio of skills through NFTs.

## About The Project
EduQuest is an innovative Learn-to-Earn education platform that combines blockchain technology with AI-powered personalized learning experiences. Built on the Educhain network, it revolutionizes online education by integrating YouTube content as curated learning materials with blockchain rewards and gamification.
The platform creates personalized learning paths using AI, adapting to each student's progress, preferences, and learning style. As users complete courses, participate in quizzes, and contribute to the community, they earn NFTs and points that unlock premium content and tournament entries.
Our unique YouTube-Based Learn-to-Earn model curates high-quality educational content from YouTube, organizing it into structured courses across different subjects and difficulty levels. This is combined with interactive quizzes, AI-driven progress tracking, and blockchain rewards to create an engaging educational ecosystem.

## Key Features

### Personalized Learning
-AI-powered learning path recommendations <br/>
-Progress-based content adaptation <br/>
-Curated YouTube educational content <br/>
-Interactive quizzes and assessments <br/>
-Multi-level courses from primary to university <br/>

### Blockchain Integration
-NFT rewards for course completion <br/>
-Achievement-based NFT badges <br/>
-NFT-gated premium content access <br/>
-Web3 wallet integration (MetaMask) <br/>
-Token-based reward system <br/>

### Tournament System
-Weekly team competitions <br/>
-Monthly individual tournaments <br/>
-Live leaderboards <br/>
-NFT prizes for winners <br/>
-Point-based entry system <br/>

### Community Features
-Knowledge sharing platform <br/>
-Peer learning opportunities <br/>
-Community challenges <br/>
-Contribution rewards <br/>
-Discussion forums <br/>

## Installation

1.Clone the repository <br/>
`git clone https://github.com/yourusername/EduQuest.git` <br/>
`cd EduQuest` <br/>

2.Install backend dependencies<br/>
`cd backend`<br/>
`pip install -r requirements.txt`<br/>
`python manage.py migrate`<br/>

3.Install frontend dependencies<br/>
`cd frontend`<br/>
`npm install`<br/>

4.Set up environment variables for Backend (.env):<br/>
`DEBUG=True` <br/>
`SECRET_KEY=your_secret_key` <br/>
`ALLOWED_HOSTS=localhost,127.0.0.1` <br/>
`CORS_ALLOWED_ORIGINS=http://localhost:3000`  <br/>
`DATABASE_URL=postgresql://user:password@localhost:5432/eduquest` <br/>

5.Set up environment variables for Frontend (.env.local): <br/>

`NEXT_PUBLIC_API_URL=http://localhost:8000` <br/>
`NEXT_PUBLIC_WEB3_PROVIDER=https://rpc.educhain.network` <br/>
`NEXT_PUBLIC_CONTRACT_ADDRESS=0x...` <br/>

6.Run the development servers <br/>

Backend <br/>
`python manage.py runserver` <br/>

Frontend <br/>
`npm run dev` <br/>
