# CareerMate - AI-Powered Placement Readiness Platform

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

CareerMate is a production-quality React Native mobile application designed to bridge the gap between academic learning and industry readiness. Acting as a personalized AI Career Coach, the platform helps software engineering and full-stack development students prepare for placements through mock interviews, ATS resume analysis, and tailored career roadmaps.

## 🚀 Features

- **AI Mock Interviews (Flagship Feature)**: 5-step mock interview simulation with real-time AI feedback on technical depth, communication, and confidence.
- **ATS Resume Analysis**: Granular scoring of your resume based on Skills, Experience, Education, and Projects. Identifies missing categorized keywords (e.g., DevOps, Frameworks) and provides actionable improvements.
- **Dynamic Application Tracker**: Pipeline management for job applications with search, filtering, and summary statistical cards.
- **Interactive AI Career Coach**: A chat interface that generates custom Placement Roadmaps and provides instant feedback on skill gaps.
- **Gamified Dashboard Analytics**: Weekly progress charts, performance trends with visual indicators (↑ Improving, ↓ Declining), and an achievement badge system.
- **Professional LinkedIn-Style Profile**: Track placement readiness score, XP, target roles, and career goals seamlessly.

## 📸 Screenshots

*(Replace placeholders with actual project screenshots)*
- `Dashboard`
- `Resume Center`
- `ATS Analysis`
- `AI Coach`
- `Mock Interview`
- `Applications Tracker`
- `Profile`

## 📂 Folder Structure

```
src/
├── components/       # Reusable UI components (ScoreCard, EmptyState, Shimmer Loaders)
├── navigation/       # React Navigation setup (Tabs & Stacks)
├── screens/          # Feature modules (Dashboard, InterviewPrep, AICoach, ATS, etc.)
├── services/         # Data fetching and simulated API delay controllers
├── store/            # Global state mock implementations and user data
└── theme/            # Unified design system (Colors, Spacing, Typography)
```

## 💻 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation (Bottom Tabs, Native Stack)
- **Icons**: Ionicons (via `@expo/vector-icons`)
- **Animations**: React Native Animated API (for Skeleton/Shimmer loaders)

## 🏗️ Architecture

The application adopts a **feature-first modular architecture** combined with a robust **Services Layer** pattern.
- **Navigation**: Handled centrally via `@react-navigation/native`. Deep linking and nested stack navigation are optimized for scalability.
- **State Management**: Abstracted into isolated stores (`userStore.js`, `mockData.js`) that simulate Redux/Context behavior, preparing the app for easy integration with a real backend state management tool like Zustand or Redux Toolkit.
- **Service Layer**: All external data interactions are encapsulated in `src/services/`. Currently utilizing Promises and `setTimeout` to mimic network latency, meaning swapping to a real REST or GraphQL API is as simple as replacing the mock `fetch` calls.
- **UI States**: Implemented enterprise-grade loading (Shimmer UI), Empty, and Error states uniformly across all screens.

## 🌟 Resume-Worthy Highlights

- **Custom Data Visualizations**: Built custom bar charts and trend indicators natively without relying on heavy third-party charting libraries, optimizing bundle size.
- **Micro-Animations**: Engineered custom shimmering skeleton loaders using the `Animated` API for a premium user experience during async data fetching.
- **Robust Component Design**: Adhered to DRY principles by building highly reusable atomic components (`FeatureCard`, `SectionHeader`, `ScoreCard`) styled via a centralized design system.

## 🔮 Future Enhancements

- **Backend Integration**: Connect the `services/` layer to a Node.js/Express backend with MongoDB.
- **OpenAI Integration**: Replace the mock AI responses with actual OpenAI GPT-4 API calls for real-time interview evaluations and roadmap generation.
- **Push Notifications**: Implement Expo Notifications for interview reminders and application status updates.
- **WebRTC**: Add real-time video/audio recording for the Mock Interview feature.

---
*Designed & Developed as a Final Year Portfolio Project.*
