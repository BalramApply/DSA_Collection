const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { questionValidation, validate } = require('../middlewares/validationMiddleware');

/**
 * @route   GET /api/questions
 * @desc    Get all questions with search, filter, and pagination
 * @access  Public
 */
router.get('/', getAllQuestions);

/**
 * @route   GET /api/questions/:id
 * @desc    Get single question by ID
 * @access  Public
 */
router.get('/:id', getQuestionById);

/**
 * @route   POST /api/questions
 * @desc    Add new question
 * @access  Private (Admin only)
 */
router.post('/', protect, adminOnly, questionValidation, validate, addQuestion);

/**
 * @route   PUT /api/questions/:id
 * @desc    Update question
 * @access  Private (Admin only)
 */
router.put('/:id', protect, adminOnly, questionValidation, validate, updateQuestion);

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete question
 * @access  Private (Admin only)
 */
router.delete('/:id', protect, adminOnly, deleteQuestion);

module.exports = router;