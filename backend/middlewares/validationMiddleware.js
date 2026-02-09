const { body, validationResult } = require('express-validator');

/**
 * Validation rules for admin login
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Validation rules for adding/updating questions
 */
const questionValidation = [
  body('title').trim().notEmpty().withMessage('Question title is required'),
  body('platform')
    .trim()
    .notEmpty()
    .withMessage('Platform is required')
    .isIn(['LeetCode', 'GFG', 'Codeforces', 'CodeChef', 'HackerRank', 'InterviewBit', 'Other'])
    .withMessage('Invalid platform'),
  body('questionNumber')
    .trim()
    .notEmpty()
    .withMessage('Question number is required'),
  body('difficulty')
    .trim()
    .notEmpty()
    .withMessage('Difficulty is required')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Question description is required'),
  body('example')
    .trim()
    .notEmpty()
    .withMessage('At least one example is required'),
  body('solution')
    .trim()
    .notEmpty()
    .withMessage('Java solution is required'),
  body('company')
    .optional()
    .trim(),
];

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  loginValidation,
  questionValidation,
  validate,
};