const express = require('express');
const Question = require('../models/Question');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all quiz questions
router.get('/', auth, async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Add a new question (optional, admin use)
router.post('/', async (req, res) => {
  const newQ = new Question(req.body);
  await newQ.save();
  res.json({ message: 'Question added' });
});

module.exports = router;
