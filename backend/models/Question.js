const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Question title is required'],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: {
        values: ['LeetCode', 'GFG', 'Codeforces', 'CodeChef', 'HackerRank', 'InterviewBit', 'Other'],
        message: '{VALUE} is not a valid platform',
      },
    },
    questionNumber: {
      type: String,
      required: [true, 'Question number is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: '{VALUE} is not a valid difficulty level',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      // Common categories: Array, String, DP, Tree, Graph, etc.
    },
    description: {
      type: String,
      required: [true, 'Question description is required'],
    },
    example: {
      type: String,
      required: [true, 'At least one example is required'],
    },
    solution: {
      type: String,
      required: [true, 'Java solution is required'],
    },
    company: {
      type: String,
      default: '',
      trim: true,
      // Optional: Google, Amazon, Microsoft, etc.
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Compound index for duplicate detection
// Combination of title + platform + questionNumber + difficulty + category must be unique
questionSchema.index(
  {
    title: 1,
    platform: 1,
    questionNumber: 1,
    difficulty: 1,
    category: 1,
  },
  {
    unique: true,
    name: 'duplicate_question_check',
  }
);

// Index for faster searches
questionSchema.index({ title: 'text' });
questionSchema.index({ platform: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ category: 1 });
questionSchema.index({ company: 1 });

// Static method to check if question already exists
questionSchema.statics.isDuplicate = async function (questionData) {
  const { title, platform, questionNumber, difficulty, category } = questionData;

  const existingQuestion = await this.findOne({
    title,
    platform,
    questionNumber,
    difficulty,
    category,
  });

  return !!existingQuestion; // Returns true if duplicate exists
};

module.exports = mongoose.model('Question', questionSchema);