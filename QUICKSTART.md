# 🚀 Quick Start Guide - Codeforces Explorer

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

---

## 📝 Quick Testing Guide

### Test User Info Lookup
Try these popular Codeforces handles:
- `tourist` (Legendary Grandmaster)
- `Benq` (Legendary Grandmaster)
- `Errichto` (International Grandmaster)
- `jiangly` (Legendary Grandmaster)
- `Um_nik` (Legendary Grandmaster)

### Test User Comparison
Compare these users:
- User 1: `tourist`
- User 2: `Benq`

### Test Rating Chart
View rating history for:
- `tourist`
- `Errichto`

### Test Problem Explorer
- Search for: "Two Sum"
- Filter by tag: "dp" or "graphs"
- Filter by rating: "1200" or "1600"

---

## 🎯 Features Checklist

- ✅ User Info Lookup - Search and display user statistics
- ✅ Contest Info - View upcoming and past contests
- ✅ Problem Explorer - Browse and filter problems
- ✅ User Comparison (Bonus) - Compare two users
- ✅ Rating Chart (Bonus) - Visualize rating history

---

## 🛠️ Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

---

## 📦 Project Highlights

- **React 18** with functional components and hooks
- **TailwindCSS** for modern, responsive styling
- **Framer Motion** for smooth animations
- **Recharts** for interactive charts
- **Axios** for API calls
- **Vite** for fast development and builds

---

## 🎨 Key Features

1. **Modern UI/UX** - Clean, professional design with dark theme
2. **Responsive** - Works on all devices (mobile, tablet, desktop)
3. **Animated** - Smooth transitions and interactions
4. **Fast** - Optimized API calls and pagination
5. **Well-Documented** - Extensive code comments

---

## 📚 API Endpoints Used

- `user.info` - User information
- `user.rating` - Rating history
- `user.status` - Submission history
- `contest.list` - Contest listings
- `problemset.problems` - Problem database

---

## 💡 Tips

- The app fetches real data from Codeforces API
- Some API calls may take a few seconds
- Problem Explorer loads all problems at once for better filtering
- Use pagination for better performance
- All components have loading states and error handling

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port.

### API Rate Limiting
Codeforces API has rate limits. If you get errors, wait a few seconds and try again.

### Slow Loading
- Problem Explorer loads ~8000 problems initially
- This is normal and only happens once
- Subsequent filtering is instant

---

**Enjoy exploring Codeforces! 🎉**
