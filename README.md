# 🚀 DSA Question Platform (MERN Stack)

A full-stack web application for storing, browsing, and managing Data Structures & Algorithms questions from various coding platforms like LeetCode, GeeksforGeeks, Codeforces, and more.

---

## ✨ Features

### 👥 User Types

#### 1. **Normal Users (Public)**
- ✅ Browse all DSA questions
- 🔍 Search questions by title, platform, number, category, company
- 🎯 Filter by platform, difficulty, category
- 📄 View complete question details with solutions
- ❌ No login required

#### 2. **Admin**
- 🔐 Secure login with JWT authentication
- ➕ Add new questions
- 📊 View dashboard analytics
- 🚫 Automatic duplicate question detection
- 📈 Analytics: questions by difficulty, platform, category, company

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)

### Frontend
- **React.js**
- **React Router** (Navigation)
- **Axios** (HTTP client)
- **React Toastify** (Notifications)
- **React Icons**

---

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd dsa-platform
```

### 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configurations
# Required: MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# Start backend server
npm run dev
```

Backend runs on: **http://localhost:5000**

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

Frontend runs on: **http://localhost:3000**

---

## 🔑 Default Admin Credentials

```
Email: admin@dsaplatform.com
Password: Admin@123
```

⚠️ **Important**: Change these credentials in production!

---

## 🌐 API Endpoints

### Public Routes
- `GET /api/questions` - Get all questions (with search & filter)
- `GET /api/questions/:id` - Get single question

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `GET /api/admin/dashboard` - Get analytics
- `POST /api/questions` - Add question (Admin only)
- `PUT /api/questions/:id` - Update question (Admin only)
- `DELETE /api/questions/:id` - Delete question (Admin only)

---

## 🎯 Key Features

### 🚫 Duplicate Question Detection
Questions are duplicates if they match ALL:
- Title + Platform + Question Number + Difficulty + Category

### 🔍 Search & Filter
- **Search**: Title, platform, number, category, company
- **Filters**: Platform, difficulty, category
- **Pagination**: 10 questions per page

### 📊 Admin Dashboard
- Total questions count
- Questions by difficulty (Easy/Medium/Hard)
- Questions by platform
- Top 10 categories
- Top 10 companies
- Recently added questions

---

## 🧪 Testing

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend
```bash
cd frontend
npm start
```

### 3. Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

---

## 📝 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@dsaplatform.com
ADMIN_PASSWORD=Admin@123
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

**Happy Coding! 🎉**