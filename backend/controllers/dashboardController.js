const Question = require('../models/Question');

/**
 * @desc    Get dashboard analytics
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin only)
 */
const getDashboardAnalytics = async (req, res, next) => {
  try {
    // Total questions count
    const totalQuestions = await Question.countDocuments();

    // Questions by difficulty
    const questionsByDifficulty = await Question.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Questions by platform
    const questionsByPlatform = await Question.aggregate([
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Questions by category (top 10)
    const questionsByCategory = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Questions by company (top 10, excluding empty)
    const questionsByCompany = await Question.aggregate([
      {
        $match: {
          company: { $exists: true, $ne: '' },
        },
      },
      {
        $group: {
          _id: '$company',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Recently added questions (last 10)
    const recentQuestions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title platform difficulty category createdAt');

    res.status(200).json({
      success: true,
      data: {
        totalQuestions,
        questionsByDifficulty,
        questionsByPlatform,
        questionsByCategory,
        questionsByCompany,
        recentQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardAnalytics,
};