const express = require('express');
const Score = require('../models/Score');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST: Submit a score
router.post('/', auth, async (req, res) => {
  try {
    const { score } = req.body;

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }

    const newScore = new Score({ user: req.user.id, score });
    await newScore.save();

    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while submitting score' });
  }
});

// GET: Top 10 scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find()
      .populate('user', 'username')
      .sort({ score: -1 })
      .limit(10);

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
