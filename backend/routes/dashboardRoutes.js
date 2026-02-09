const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard analytics
 * @access  Private (Admin only)
 */
router.get('/', protect, adminOnly, getDashboardAnalytics);

module.exports = router;