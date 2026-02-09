# 🚀 QUICK START GUIDE - DSA Platform

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free cluster at mongodb.com/atlas
- Get connection string
- Update backend/.env with your URI

### Step 3: Configure Environment

**Backend: Create `backend/.env`**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
JWT_SECRET=my_super_secret_key_12345
ADMIN_EMAIL=admin@dsaplatform.com
ADMIN_PASSWORD=Admin@123
```

**Frontend: Create `frontend/.env`**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Access Application

- **Frontend**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Credentials**: admin@dsaplatform.com / Admin@123

---

## ✅ Verify Installation

### Check Backend
Visit: http://localhost:5000/api/health

Should see:
```json
{
  "success": true,
  "message": "DSA Platform API is running"
}
```

### Check Frontend
Visit: http://localhost:3000

Should see homepage with "DSA Questions"

### Check Admin
1. Go to http://localhost:3000/admin/login
2. Login with default credentials
3. Should redirect to dashboard

---

## 🎯 Test Features

### Public Features
1. Browse questions on homepage
2. Use search bar
3. Apply filters (platform, difficulty)
4. Click any question to view details

### Admin Features
1. Login as admin
2. View dashboard analytics
3. Click "Add Question"
4. Fill form and submit
5. Verify question appears on homepage

---

## 🐛 Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB
mongod
```

### Issue: "Port 5000 already in use"
**Solution**: Kill the process or change port
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# OR change PORT in backend/.env
```

### Issue: "Admin not found"
**Solution**: Backend needs to seed admin first
```bash
# Restart backend server - it will create admin automatically
cd backend
npm run dev
```

### Issue: "CORS error in browser"
**Solution**: Check backend CORS settings
- Verify FRONTEND_URL in backend/.env matches frontend URL

---

## 📦 Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve build folder with any static server
```

---

## 🎉 You're Ready!

Now you can:
- ✅ Browse DSA questions
- ✅ Search and filter
- ✅ Add questions as admin
- ✅ View analytics

---

Need help? Check the main README.md for detailed documentation.

**Happy Coding! 🚀**