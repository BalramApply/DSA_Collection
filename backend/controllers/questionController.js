const Question = require('../models/Question');

/**
 * @desc    Get all questions with search, filter, and pagination
 * @route   GET /api/questions
 * @access  Public
 */
const getAllQuestions = async (req, res, next) => {
  try {
    const {
      search,
      platform,
      difficulty,
      category,
      company,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query object
    let query = {};

    // Search by title, platform, number, category, or company
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { platform: { $regex: search, $options: 'i' } },
        { questionNumber: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by platform
    if (platform) {
      query.platform = platform;
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Filter by company
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const questions = await Question.find(query)
      .sort({ createdAt: -1 }) // Latest first
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Question.countDocuments(query);

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single question by ID
 * @route   GET /api/questions/:id
 * @access  Public
 */
const getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add new question
 * @route   POST /api/questions
 * @access  Private (Admin only)
 */
const addQuestion = async (req, res, next) => {
  try {
    const {
      title,
      platform,
      questionNumber,
      difficulty,
      category,
      description,
      example,
      solution,
      company,
    } = req.body;

    // ✅ Check if question with same title already exists
    const existingQuestion = await Question.findOne({ title });

    if (existingQuestion) {
      return res.status(400).json({
        success: false,
        message: 'This question already exists',
      });
    }

    // ✅ Create question
    const question = await Question.create({
      title,
      platform,
      questionNumber,
      difficulty,
      category,
      description,
      example,
      solution,
      company: company || '',
    });

    res.status(201).json({
      success: true,
      message: 'Question added successfully',
      data: question,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Update question
 * @route   PUT /api/questions/:id
 * @access  Private (Admin only)
 */
const updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    // If updating core fields, check for duplicates
    const {
      title,
      platform,
      questionNumber,
      difficulty,
      category,
    } = req.body;

    if (title || platform || questionNumber || difficulty || category) {
      const checkData = {
        title: title || question.title,
        platform: platform || question.platform,
        questionNumber: questionNumber || question.questionNumber,
        difficulty: difficulty || question.difficulty,
        category: category || question.category,
      };

      // Check if another question exists with same combination (excluding current question)
      const duplicate = await Question.findOne({
        ...checkData,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'Another question already exists with this combination.',
        });
      }
    }

    // Update question
    question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete question
 * @route   DELETE /api/questions/:id
 * @access  Private (Admin only)
 */
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};