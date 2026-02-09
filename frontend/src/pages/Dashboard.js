import React, { useState, useEffect } from 'react';
import { getDashboardAnalytics } from '../services/adminService';
import { toast } from 'react-toastify';
import { FaQuestionCircle, FaChartBar, FaCode, FaBuilding, FaClock } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getDashboardAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDifficultyClass = (diff) => {
    const difficultyMap = {
      'Easy': styles.badgeEasy,
      'Medium': styles.badgeMedium,
      'Hard': styles.badgeHard,
    };
    return `${styles.badge} ${difficultyMap[diff] || ''}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!analytics) {
    return <div className={styles.container}>Error loading dashboard</div>;
  }

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.container}>
        <div className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
          <p>Overview of all DSA questions and statistics</p>
        </div>

        {/* Total Questions Card */}
        <div className={`${styles.statsCard} ${styles.totalCard}`}>
          <div className={styles.statIcon}>
            <FaQuestionCircle />
          </div>
          <div className={styles.statContent}>
            <h3>Total Questions</h3>
            <p className={styles.statNumber}>{analytics.totalQuestions}</p>
          </div>
        </div>

        {/* Questions by Difficulty */}
        <div className={styles.analyticsSection}>
          <h2>
            <FaChartBar /> Questions by Difficulty
          </h2>
          <div className={styles.statsGrid}>
            {analytics.questionsByDifficulty.map((item) => (
              <div key={item._id} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span className={getDifficultyClass(item._id)}>{item._id}</span>
                </div>
                <p className={styles.statCount}>{item.count}</p>
                <p className={styles.statLabel}>questions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions by Platform */}
        <div className={styles.analyticsSection}>
          <h2>
            <FaCode /> Questions by Platform
          </h2>
          <div className={styles.statsGrid}>
            {analytics.questionsByPlatform.map((item) => (
              <div key={item._id} className={`${styles.statCard} ${styles.platformCard}`}>
                <h3>{item._id}</h3>
                <p className={styles.statCount}>{item.count}</p>
                <p className={styles.statLabel}>questions</p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions by Category */}
        <div className={styles.analyticsSection}>
          <h2>
            <FaChartBar /> Top Categories
          </h2>
          <div className={styles.categoryList}>
            {analytics.questionsByCategory.map((item, index) => (
              <div key={item._id} className={styles.categoryItem}>
                <span className={styles.categoryRank}>#{index + 1}</span>
                <span className={styles.categoryName}>{item._id}</span>
                <span className={styles.categoryCount}>{item.count} questions</span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions by Company */}
        {analytics.questionsByCompany.length > 0 && (
          <div className={styles.analyticsSection}>
            <h2>
              <FaBuilding /> Top Companies
            </h2>
            <div className={styles.categoryList}>
              {analytics.questionsByCompany.map((item, index) => (
                <div key={item._id} className={styles.categoryItem}>
                  <span className={styles.categoryRank}>#{index + 1}</span>
                  <span className={styles.categoryName}>{item._id}</span>
                  <span className={styles.categoryCount}>{item.count} questions</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Added Questions */}
        <div className={styles.analyticsSection}>
          <h2>
            <FaClock /> Recently Added Questions
          </h2>
          <div className={styles.recentQuestionsList}>
            {analytics.recentQuestions.map((question) => (
              <div key={question._id} className={styles.recentQuestionItem}>
                <div className={styles.questionInfo}>
                  <h4>{question.title}</h4>
                  <div className={styles.questionMetaRow}>
                    <span className={getDifficultyClass(question.difficulty)}>
                      {question.difficulty}
                    </span>
                    <span className={styles.metaText}>{question.platform}</span>
                    <span className={styles.metaText}>{question.category}</span>
                  </div>
                </div>
                <span className={styles.questionDate}>{formatDate(question.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;