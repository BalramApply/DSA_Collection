import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestions, deleteQuestion } from '../services/questionService';
import DeleteModal from '../components/DeleteModal';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaSearch, FaCog } from 'react-icons/fa';
import styles from './ManageQuestions.module.css';

const ManageQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [difficulty, setDifficulty] = useState('');

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
        limit: 15,
        ...(search && { search }),
        ...(platform && { platform }),
        ...(difficulty && { difficulty }),
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
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleEdit = (questionId) => {
    navigate(`/admin/edit-question/${questionId}`);
  };

  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!questionToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteQuestion(questionToDelete._id);
      toast.success('Question deleted successfully!');
      setShowDeleteModal(false);
      setQuestionToDelete(null);
      fetchQuestions(); // still safe
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete question');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleReset = () => {
    setSearch('');
    setPlatform('');
    setDifficulty('');
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
    <div className={styles.manageQuestionsPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1>
              <FaCog /> Manage Questions
            </h1>
            <p>Edit or delete existing questions</p>
          </div>
          <div className={styles.headerStats}>
            <span className={styles.totalCount}>Total: {pagination.total}</span>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className={styles.searchFilterSection}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchInputGroup}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search questions..."
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

            <button onClick={handleReset} className={`${styles.btn} ${styles.btnOutline}`}>
              Reset
            </button>
          </div>
        </div>

        {/* Questions Table */}
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
            <div className={styles.questionsTableContainer}>
              <table className={styles.questionsTable}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Platform</th>
                    <th>Number</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question._id}>
                      <td className={styles.titleCell}>{question.title}</td>
                      <td>{question.platform}</td>
                      <td>{question.questionNumber}</td>
                      <td>
                        <span className={getDifficultyClass(question.difficulty)}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td>{question.category}</td>
                      <td>{question.company || '-'}</td>
                      <td className={styles.actionsCell}>
                        <button
                          onClick={() => handleEdit(question._id)}
                          className={`${styles.actionBtn} ${styles.editBtn}`}
                          title="Edit Question"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(question)}
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          title="Delete Question"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setQuestionToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          questionTitle={questionToDelete?.title || ''}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
};

export default ManageQuestions;