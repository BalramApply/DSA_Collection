import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { getAdminProfile } from '../services/adminService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAdmin(null);
    setIsAuthenticated(false);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await getAdminProfile();
        setAdmin(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        logout();
      }
    }

    setLoading(false);
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (adminData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
