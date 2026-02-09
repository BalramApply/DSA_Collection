import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestionById } from '../services/questionService';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCalendar } from 'react-icons/fa';
import styles from './QuestionDetail.module.css';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const response = await getQuestionById(id);
      setQuestion(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyClass = (diff) => {
    const difficultyMap = {
      'Easy': styles.badgeEasy,
      'Medium': styles.badgeMedium,
      'Hard': styles.badgeHard,
    };
    return `${styles.badge} ${difficultyMap[diff] || ''}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading question...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>Question not found</h2>
          <Link to="/" className={`${styles.btn} ${styles.btnPrimary}`}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.questionDetailPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft /> Back to Questions
        </Link>

        <div className={styles.questionDetailCard}>
          <div className={styles.questionDetailHeader}>
            <div>
              <h1 className={styles.questionDetailTitle}>{question.title}</h1>
              <div className={styles.questionDetailMeta}>
                <span className={getDifficultyClass(question.difficulty)}>
                  {question.difficulty}
                </span>
                <span className={styles.metaDivider}>•</span>
                <span>{question.platform}</span>
                <span className={styles.metaDivider}>•</span>
                <span>#{question.questionNumber}</span>
              </div>
            </div>
          </div>

          <div className={styles.questionInfoGrid}>
            <div className={styles.infoItem}>
              <strong>Category:</strong> {question.category}
            </div>
            {question.company && (
              <div className={styles.infoItem}>
                <strong>Company:</strong>{' '}
                <span className={styles.companyTag}>{question.company}</span>
              </div>
            )}
            <div className={styles.infoItem}>
              <FaCalendar className={styles.calendarIcon} />
              <strong>Added:</strong> {formatDate(question.createdAt)}
            </div>
          </div>

          <div className={styles.questionSection}>
            <h2>Description</h2>
            <div className={styles.sectionContent}>{question.description}</div>
          </div>

          <div className={styles.questionSection}>
            <h2>Example</h2>
            <div className={`${styles.sectionContent} ${styles.exampleContent}`}>
              {question.example}
            </div>
          </div>

          <div className={styles.questionSection}>
            <h2>Java Solution</h2>
            <pre className={styles.codeBlock}>
              <code>{question.solution}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;