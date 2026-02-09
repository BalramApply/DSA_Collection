import React, { useState, useEffect, useCallback  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionById, updateQuestion } from '../services/questionService';
import { toast } from 'react-toastify';
import { FaEdit, FaSave, FaArrowLeft } from 'react-icons/fa';
import styles from './EditQuestion.module.css';

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    platform: 'LeetCode',
    questionNumber: '',
    difficulty: 'Easy',
    category: '',
    description: '',
    example: '',
    solution: '',
    company: '',
  });

  const platforms = ['LeetCode', 'GFG', 'Codeforces', 'CodeChef', 'HackerRank', 'InterviewBit', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const fetchQuestion = useCallback(async () => {
  try {
    const response = await getQuestionById(id);
    const question = response.data;

    setFormData({
      title: question.title,
      platform: question.platform,
      questionNumber: question.questionNumber,
      difficulty: question.difficulty,
      category: question.category,
      description: question.description,
      example: question.example,
      solution: question.solution,
      company: question.company || '',
    });
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch question');
    navigate('/admin/dashboard');
  } finally {
    setLoading(false);
  }
}, [id, navigate]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.questionNumber || !formData.category || 
        !formData.description || !formData.example || !formData.solution) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await updateQuestion(id, formData);
      toast.success('Question updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Update failed - possible duplicate');
      } else {
        toast.error('Failed to update question');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading question...</p>
      </div>
    );
  }

  return (
    <div className={styles.editQuestionPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>
            <FaEdit /> Edit Question
          </h1>
          <p>Update question details</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.questionForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">
                Question Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.formControl}
                placeholder="e.g., Two Sum"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="questionNumber">
                Question Number <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="questionNumber"
                name="questionNumber"
                value={formData.questionNumber}
                onChange={handleChange}
                className={styles.formControl}
                placeholder="e.g., 1"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="platform">
                Platform <span className={styles.required}>*</span>
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className={styles.formControl}
                required
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="difficulty">
                Difficulty <span className={styles.required}>*</span>
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className={styles.formControl}
                required
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">
                Category <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.formControl}
                placeholder="e.g., Array, String, DP, Tree"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company">Company (Optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.formControl}
                placeholder="e.g., Google, Amazon"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">
              Question Description <span className={styles.required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.formControl}
              rows="5"
              placeholder="Enter the complete question description..."
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="example">
              Example <span className={styles.required}>*</span>
            </label>
            <textarea
              id="example"
              name="example"
              value={formData.example}
              onChange={handleChange}
              className={styles.formControl}
              rows="4"
              placeholder="Enter at least one example with input and output..."
              required
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="solution">
              Java Solution <span className={styles.required}>*</span>
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              className={`${styles.formControl} ${styles.codeTextarea}`}
              rows="10"
              placeholder="Paste your Java solution code here..."
              required
            ></textarea>
          </div>

          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              disabled={submitting}
            >
              <FaSave /> {submitting ? 'Updating...' : 'Update Question'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel} 
              className={`${styles.btn} ${styles.btnOutline}`}
            >
              <FaArrowLeft /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;