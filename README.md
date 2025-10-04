# 🚀 Codeforces Explorer

**Built for DJS CODESTARS 2026 Interview**

A modern, responsive React web application that integrates with the official Codeforces API to explore user profiles, contests, and problems. This project demonstrates proficiency in React fundamentals, API integration, state management, and modern UI/UX design.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=for-the-badge&logo=vite)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Components Overview](#-components-overview)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)

---

## ✨ Features

### Core Features

1. **User Info Lookup** 🔍
   - Search for any Codeforces user by handle
   - Display username, rating, rank, and problems solved
   - Color-coded ratings based on Codeforces ranking system
   - Shows additional info like country, city, organization, and contribution

2. **Contest Information** 🏆
   - View upcoming and past contests
   - Display contest name, start time, and duration
   - Tab-based navigation between upcoming and past contests
   - Real-time countdown for upcoming contests

3. **Problem Explorer** 💻
   - Browse thousands of Codeforces problems
   - Search problems by name
   - Filter by tags (e.g., dp, graphs, math)
   - Filter by difficulty rating
   - Pagination for better performance
   - Display problem tags, ratings, and solve counts

### Bonus Features

4. **User Comparison** ⚔️
   - Compare two users side by side
   - Visual highlighting of better stats
   - Compare ratings, problems solved, and contributions
   - Declare overall winner based on current rating

5. **Rating History Chart** 📈
   - Interactive line chart showing rating progression
   - Display rating changes over contests
   - Statistics: current rating, max rating, min rating, total change
   - Hover tooltips with detailed contest information
   - Built with Recharts for smooth animations

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 (Functional Components with Hooks)
- **Build Tool**: Vite 5.1.4
- **Styling**: TailwindCSS 3.4.1
- **Animations**: Framer Motion 11.0.5
- **Charts**: Recharts 2.12.0
- **HTTP Client**: Axios 1.6.7
- **Icons**: Lucide React 0.344.0

---

## 📁 Project Structure

```
codeforces-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── UserInfo.jsx           # User lookup component
│   │   ├── ContestInfo.jsx        # Contest listing component
│   │   ├── ProblemExplorer.jsx    # Problem browser component
│   │   ├── UserComparison.jsx     # User comparison (bonus)
│   │   └── RatingChart.jsx        # Rating chart (bonus)
│   ├── config/
│   │   └── api.js                 # API configuration and constants
│   ├── services/
│   │   └── codeforcesService.js   # API service functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── .env.example                   # Example environment file
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone or download the project**
   ```bash
   cd "c:/Users/DEEPAK/OneDrive/Desktop/Task 2 Windsurf"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - The `.env` file is already configured with the Codeforces API base URL
   - You can modify it if needed:
   ```
   VITE_CODEFORCES_API_BASE_URL=https://codeforces.com/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - The app will automatically open at `http://localhost:3000`

---

## 💡 Usage

### User Info Lookup
1. Enter a Codeforces handle (e.g., `tourist`, `Benq`, `Errichto`)
2. Click "Search" or press Enter
3. View user statistics including rating, rank, and problems solved

### Contest Information
1. Switch between "Upcoming" and "Past" tabs
2. View contest details including name, start time, and duration
3. Click "Refresh" to update the contest list

### Problem Explorer
1. Use the search bar to find problems by name
2. Filter by tags (e.g., "dp", "graphs", "greedy")
3. Filter by difficulty rating (800-3000)
4. Navigate through pages using pagination controls

### User Comparison (Bonus)
1. Enter two Codeforces handles
2. Click "Compare Users"
3. View side-by-side comparison with highlighted better stats

### Rating History Chart (Bonus)
1. Enter a Codeforces handle
2. Click "Show Chart"
3. View interactive rating progression chart
4. Hover over data points for detailed information

---

## 🔌 API Integration

This project uses the official **Codeforces API** (https://codeforces.com/apiHelp).

### Endpoints Used

1. **user.info** - Fetch user information
   ```
   GET https://codeforces.com/api/user.info?handles={handle}
   ```

2. **user.rating** - Fetch user rating history
   ```
   GET https://codeforces.com/api/user.rating?handle={handle}
   ```

3. **user.status** - Fetch user submissions
   ```
   GET https://codeforces.com/api/user.status?handle={handle}&from=1&count=10000
   ```

4. **contest.list** - Fetch all contests
   ```
   GET https://codeforces.com/api/contest.list
   ```

5. **problemset.problems** - Fetch all problems
   ```
   GET https://codeforces.com/api/problemset.problems
   ```

### API Service Architecture

- **Configuration**: `src/config/api.js` - Contains API base URL and endpoint definitions
- **Service Layer**: `src/services/codeforcesService.js` - Handles all API calls with error handling
- **Components**: Use service functions to fetch data and manage state with React hooks

---

## 🧩 Components Overview

### 1. UserInfo.jsx
- **Purpose**: User lookup functionality
- **State Management**: `useState` for handle input, user data, loading, and errors
- **API Calls**: Fetches user info and submission count in parallel
- **Features**: Real-time search, error handling, color-coded ratings

### 2. ContestInfo.jsx
- **Purpose**: Display upcoming and past contests
- **State Management**: Tab state, contest data, loading state
- **API Calls**: Fetches and separates contests by phase
- **Features**: Tab navigation, countdown timers, refresh functionality

### 3. ProblemExplorer.jsx
- **Purpose**: Browse and filter problems
- **State Management**: Problems list, filters, pagination
- **API Calls**: Fetches all problems once, filters client-side
- **Features**: Search, tag filter, rating filter, pagination

### 4. UserComparison.jsx (Bonus)
- **Purpose**: Compare two users
- **State Management**: Two user handles and their data
- **API Calls**: Parallel fetching of both users' data
- **Features**: Side-by-side comparison, visual highlighting, winner declaration

### 5. RatingChart.jsx (Bonus)
- **Purpose**: Visualize rating history
- **State Management**: Rating data, chart configuration
- **API Calls**: Fetches user rating history
- **Features**: Interactive chart, statistics, custom tooltips

---

## 📸 Screenshots

### Hero Section
Modern landing page with project description and tech stack badges.

### User Info Lookup
Search for users and view detailed statistics with color-coded ratings.

### Contest Information
Browse upcoming and past contests with countdown timers.

### Problem Explorer
Filter and search through thousands of problems with pagination.

### User Comparison
Compare two users side by side with visual highlighting.

### Rating History Chart
Interactive chart showing rating progression over time.

---

## 🎨 Design Highlights

- **Color Scheme**: Dark theme with Codeforces blue accent (#1E88E5)
- **Typography**: System fonts for optimal performance
- **Animations**: Smooth transitions using Framer Motion
- **Responsiveness**: Mobile-first design with TailwindCSS
- **Accessibility**: Proper focus states and semantic HTML
- **Performance**: Lazy loading, pagination, and optimized API calls

---

## 🔮 Future Enhancements

- [ ] Add user authentication to save favorite users
- [ ] Implement problem recommendations based on user rating
- [ ] Add virtual contest feature
- [ ] Include problem difficulty predictor
- [ ] Add dark/light theme toggle
- [ ] Implement progressive web app (PWA) features
- [ ] Add social sharing functionality
- [ ] Include problem submission tracker

---

## 📝 Code Comments

All components include detailed comments explaining:
- Component purpose and functionality
- State management logic
- API integration approach
- Key functions and their parameters
- UI/UX decisions

---

## 🤝 Contributing

This is a personal interview project, but suggestions are welcome!

---

## 📄 License

This project is created for educational purposes as part of the DJS CODESTARS 2026 interview process.

---

## 👨‍💻 Author

Built with ❤️ for **DJS CODESTARS 2026**

---

## 🙏 Acknowledgments

- [Codeforces](https://codeforces.com) for providing the public API
- [React](https://react.dev) for the amazing framework
- [TailwindCSS](https://tailwindcss.com) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Recharts](https://recharts.org) for beautiful charts

---

**Happy Coding! 🚀**
