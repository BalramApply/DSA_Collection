import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCode, FaSignOutAlt, FaTachometerAlt, FaPlus, FaCog } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          <FaCode className={styles.logoIcon} />
          <span>DSA Platform</span>
        </Link>

        <div className={styles.navbarMenu}>
          <Link to="/" className={styles.navbarLink}>
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin/dashboard" className={styles.navbarLink}>
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link to="/admin/add-question" className={styles.navbarLink}>
                <FaPlus /> Add Question
              </Link>
              <Link to="/admin/manage-questions" className={styles.navbarLink}>
                <FaCog /> Manage
              </Link>
              <div className={styles.navbarAdminInfo}>
                <span className={styles.adminEmail}>{admin?.email}</span>
                <button onClick={handleLogout} className={styles.btnLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/admin/login" className={`${styles.btn} ${styles.btnPrimary}`}>
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;