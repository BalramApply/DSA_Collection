# DSA Question Platform - Backend API Documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB URI and other configs

# Start server
npm run dev
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 🔐 Admin Routes

### 1. Admin Login
**POST** `/admin/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "admin@dsaplatform.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "...",
      "email": "admin@dsaplatform.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Get Admin Profile
**GET** `/admin/profile`

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "admin@dsaplatform.com",
    "role": "admin",
    "isActive": true
  }
}
```

---

## 📝 Question Routes

### 1. Get All Questions (with Search & Filter)
**GET** `/questions`

**Access:** Public

**Query Parameters:**
- `search` - Search by title, platform, number, category, company
- `platform` - Filter by platform (LeetCode, GFG, etc.)
- `difficulty` - Filter by difficulty (Easy, Medium, Hard)
- `category` - Filter by category
- `company` - Filter by company
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /questions?search=array&difficulty=Easy&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "totalPages": 5,
  "currentPage": 1,
  "data": [...]
}
```

### 2. Get Single Question
**GET** `/questions/:id`

**Access:** Public

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Two Sum",
    "platform": "LeetCode",
    "questionNumber": "1",
    "difficulty": "Easy",
    "category": "Array",
    "description": "...",
    "example": "...",
    "solution": "...",
    "company": "Google",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Add Question
**POST** `/questions`

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Two Sum",
  "platform": "LeetCode",
  "questionNumber": "1",
  "difficulty": "Easy",
  "category": "Array",
  "description": "Given an array of integers...",
  "example": "Input: nums = [2,7,11,15], target = 9...",
  "solution": "class Solution { public int[] twoSum(...) {...} }",
  "company": "Google"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Question added successfully",
  "data": {...}
}
```

### 4. Update Question
**PUT** `/questions/:id`

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (same as Add Question)

### 5. Delete Question
**DELETE** `/questions/:id`

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📊 Dashboard Routes

### Get Dashboard Analytics
**GET** `/admin/dashboard`

**Access:** Private (Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalQuestions": 150,
    "questionsByDifficulty": [
      { "_id": "Easy", "count": 60 },
      { "_id": "Medium", "count": 70 },
      { "_id": "Hard", "count": 20 }
    ],
    "questionsByPlatform": [...],
    "questionsByCategory": [...],
    "questionsByCompany": [...],
    "recentQuestions": [...]
  }
}
```

---

## ⚠️ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized. No token provided."
}
```

### Duplicate Question (400)
```json
{
  "success": false,
  "message": "This question already exists with the same title, platform, number, difficulty, and category."
}
```

---

## 🔑 Default Admin Credentials

```
Email: admin@dsaplatform.com
Password: Admin@123
```

**⚠️ Change these in production!**

---

## 📦 Available Platforms

- LeetCode
- GFG (GeeksforGeeks)
- Codeforces
- CodeChef
- HackerRank
- InterviewBit
- Other

---

## 🎯 Available Difficulties

- Easy
- Medium
- Hard