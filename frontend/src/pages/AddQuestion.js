import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addQuestion } from '../services/questionService';
import { toast } from 'react-toastify';
import { FaPlus, FaSave } from 'react-icons/fa';
import styles from './AddQuestion.module.css';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    try {
      await addQuestion(formData);
      toast.success('Question added successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'This question already exists');
      } else {
        toast.error('Failed to add question');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
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
  };

  return (
    <div className={styles.addQuestionPage}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>
            <FaPlus /> Add New Question
          </h1>
          <p>Add a new DSA question to the platform</p>
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
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
              <FaSave /> {loading ? 'Adding...' : 'Add Question'}
            </button>
            <button type="button" onClick={handleReset} className={`${styles.btn} ${styles.btnOutline}`}>
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;