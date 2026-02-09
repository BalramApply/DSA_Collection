const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { loginValidation, validate } = require('../middlewares/validationMiddleware');

/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 * @access  Public
 */
router.post('/login', loginValidation, validate, loginAdmin);

/**
 * @route   GET /api/admin/profile
 * @desc    Get admin profile (verify token)
 * @access  Private (Admin only)
 */
router.get('/profile', protect, adminOnly, getAdminProfile);

module.exports = router;