# 🎉 Pure React.js AI Video Platform

Complete React.js application (NOT Next.js, NOT Vite) with `npm start` command.

## 🚀 Quick Start

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```
Expected: `🚀 Server on port 5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```
Expected: Opens browser at `http://localhost:3000`

## 📋 Features

✅ React 18 (Pure React with react-scripts)
✅ Express.js Backend
✅ MongoDB Database
✅ JWT Authentication
✅ Redux State Management
✅ User Registration & Login
✅ Dark Theme UI
✅ 6 Pages + Components
✅ Error-Free Code
✅ Production Ready

## 📦 What's Included

### Frontend
- React 18 with react-scripts
- Redux Toolkit for state management
- React Router for navigation
- 6 pages (Home, Login, Signup, Dashboard, Profile, etc.)
- Components (Layout, Header, Sidebar)
- API integration with Axios

### Backend
- Express.js server
- MongoDB database connection
- JWT authentication
- User & Video models
- 3 API routes (auth, video, user)

## 🔧 Configuration

Both .env files are pre-configured:

**backend/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-video
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

**frontend/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Project Structure

```
ai-video-platform/
├── frontend/                    (Pure React)
│   ├── public/                 (HTML & static files)
│   ├── src/
│   │   ├── pages/             (6 pages)
│   │   ├── components/        (Layout, Header, Sidebar)
│   │   ├── slices/            (Redux state)
│   │   ├── services/          (API calls)
│   │   ├── utils/             (Helpers)
│   │   ├── styles/            (CSS)
│   │   ├── App.js             (Main component)
│   │   └── index.js           (Entry point)
│   ├── package.json
│   └── .env
│
├── backend/                     (Node.js/Express)
│   ├── routes/                (auth, video, user)
│   ├── models/                (User, Video)
│   ├── middlewares/           (auth)
│   ├── server.js              (Main server)
│   ├── package.json
│   └── .env
│
└── README.md
```

## ✅ Commands Reference

```bash
# Frontend
cd frontend
npm install          # Install dependencies
npm start           # Start dev server
npm run build       # Build for production

# Backend
cd backend
npm install         # Install dependencies
npm start           # Start server
npm run dev         # Start with nodemon
```

## 🔐 How It Works

1. **User Registration**: POST /api/auth/register
2. **User Login**: POST /api/auth/login
3. **Get Profile**: GET /api/user/profile
4. **Get Videos**: GET /api/video/history

## 🎯 Test the App

1. Sign up with any email/password
2. Login
3. View dashboard with stats
4. Access other pages via sidebar

## 📚 Technologies Used

**Frontend:**
- React 18
- Redux Toolkit
- React Router v6
- Axios
- Tailwind CSS

**Backend:**
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

##🚀 Deployment Ready

Run `npm run build` in frontend for production build.

---

**Status**: ✅ Error-Free | ✅ Production Ready | ✅ npm start command
