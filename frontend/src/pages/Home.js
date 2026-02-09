import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuestions } from '../services/questionService';
import { toast } from 'react-toastify';
import { FaSearch, FaFilter } from 'react-icons/fa';
import styles from './Home.module.css';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  // Filters
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');

  const platforms = [
    'LeetCode',
    'GFG',
    'Codeforces',
    'CodeChef',
    'HackerRank',
    'InterviewBit',
    'Other',
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: 10,
        ...(search && { search }),
        ...(platform && { platform }),
        ...(difficulty && { difficulty }),
        ...(category && { category }),
      };

      const response = await getAllQuestions(params);

      setQuestions(response.data);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        total: response.total,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  }, [
    pagination.currentPage,
    search,
    platform,
    difficulty,
    category,
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleReset = () => {
    setSearch('');
    setPlatform('');
    setDifficulty('');
    setCategory('');
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const getDifficultyClass = (diff) => {
    const difficultyMap = {
      'Easy': styles.badgeEasy,
      'Medium': styles.badgeMedium,
      'Hard': styles.badgeHard,
    };
    return `${styles.badge} ${difficultyMap[diff] || ''}`;
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>DSA Questions</h1>
          <p>Explore {pagination.total} coding problems from various platforms</p>
        </div>

        {/* Search & Filter Section */}
        <div className={styles.searchFilterSection}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchInputGroup}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by title, platform, number, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
              Search
            </button>
          </form>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <FaFilter className={styles.filterIcon} />
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Platforms</option>
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Difficulties</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Category (e.g., Array)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.filterInput}
              />

              <button onClick={handleReset} className={`${styles.btn} ${styles.btnOutline}`}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className={styles.noQuestions}>
            <p>No questions found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className={styles.questionsGrid}>
              {questions.map((question) => (
                <Link
                  key={question._id}
                  to={`/questions/${question._id}`}
                  className={styles.questionCard}
                >
                  <div className={styles.questionHeader}>
                    <h3 className={styles.questionTitle}>{question.title}</h3>
                    <span className={getDifficultyClass(question.difficulty)}>
                      {question.difficulty}
                    </span>
                  </div>

                  <div className={styles.questionMeta}>
                    <span className={styles.metaItem}>
                      <strong>Platform:</strong> {question.platform}
                    </span>
                    <span className={styles.metaItem}>
                      <strong>Number:</strong> {question.questionNumber}
                    </span>
                    <span className={styles.metaItem}>
                      <strong>Category:</strong> {question.category}
                    </span>
                    {question.company && (
                      <span className={`${styles.metaItem} ${styles.company}`}>
                        <strong>Company:</strong> {question.company}
                      </span>
                    )}
                  </div>

                  <p className={styles.questionDescription}>
                    {question.description.substring(0, 150)}...
                  </p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button
                onClick={() =>
                  setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
                }
                disabled={pagination.currentPage === 1}
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                Previous
              </button>
              <span className={styles.pageInfo}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
                }
                disabled={pagination.currentPage === pagination.totalPages}
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;