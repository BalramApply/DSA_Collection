# DSA Question Platform - Frontend

React-based frontend for browsing and managing DSA questions.

## 🚀 Features

### Public Features
- ✅ Browse all DSA questions
- 🔍 Search by title, platform, number, category, company
- 🎯 Filter by platform, difficulty, category
- 📄 View question details with solutions
- 📱 Fully responsive design

### Admin Features
- 🔐 Secure admin login with JWT
- 📊 Dashboard with analytics
- ➕ Add new questions
- 🚫 Duplicate question detection
- 📈 View statistics by difficulty, platform, category, company

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- Backend server running on http://localhost:5000

---

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will run on **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── Navbar.css
│   └── ProtectedRoute.js      # Route protection for admin
├── context/
│   └── AuthContext.js         # Global authentication state
├── pages/
│   ├── Home.js                # Question list (public)
│   ├── QuestionDetail.js      # Question details (public)
│   ├── AdminLogin.js          # Admin login
│   ├── Dashboard.js           # Admin dashboard
│   └── AddQuestion.js         # Add question form
├── services/
│   ├── api.js                 # Axios configuration
│   ├── adminService.js        # Admin API calls
│   └── questionService.js     # Question API calls
├── styles/
│   └── global.css             # Global styles
├── App.js                     # Main app with routing
└── index.js                   # Entry point
```

---

## 🔑 Admin Access

**Default Admin Credentials:**
- Email: `admin@dsaplatform.com`
- Password: `Admin@123`

---

## 🌐 Routes

### Public Routes
- `/` - Home page (question list)
- `/questions/:id` - Question detail page
- `/admin/login` - Admin login

### Protected Routes (Admin Only)
- `/admin/dashboard` - Analytics dashboard
- `/admin/add-question` - Add new question

---

## 🎨 Key Features Explained

### Search & Filter
- **Search**: Search across title, platform, number, category, company
- **Filters**: Filter by platform, difficulty, category
- **Pagination**: 10 questions per page

### Question Detail
- Full description and examples
- Java solution with syntax highlighting
- Platform, difficulty, category tags
- Company tag (if available)

### Admin Dashboard
- Total questions count
- Questions by difficulty (Easy/Medium/Hard)
- Questions by platform
- Top 10 categories
- Top 10 companies
- Recently added questions

### Add Question
- Comprehensive form validation
- Duplicate detection
- Auto-redirect to dashboard on success

---

## 🔧 Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

---

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-toastify**: Toast notifications
- **react-icons**: Icon library

---

## 🎯 Future Enhancements

- Edit/Update questions
- Delete questions with confirmation
- User authentication (for tracking progress)
- Bookmarking questions
- Code editor integration
- Multiple language solutions

---

## 📝 Notes

- Make sure backend is running before starting frontend
- All admin routes are protected with JWT authentication
- Token is stored in localStorage
- Auto-logout on token expiration (401)

---

## 👨‍💻 Development

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

Enjoy coding! 🎉