import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddQuestion from './pages/AddQuestion';
import EditQuestion from './pages/EditQuestion';
import ManageQuestions from './pages/ManageQuestions';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-question"
              element={
                <ProtectedRoute>
                  <AddQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-question/:id"
              element={
                <ProtectedRoute>
                  <EditQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-questions"
              element={
                <ProtectedRoute>
                  <ManageQuestions />
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                  <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
                  <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>
                    Page not found
                  </p>
                </div>
              }
            />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;