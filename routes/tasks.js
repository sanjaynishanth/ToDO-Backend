const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

// ✅ Load your User and Task models
const User = require('../models/User');
const Task = require('../models/Task');

// Existing Routes
router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

// ✅ New: Share Task Route
router.post('/:id/share', protect, async (req, res) => {
  const { emailOrUsername } = req.body;

  try {
    const userToShare = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!userToShare) return res.status(404).json({ message: 'User not found' });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only the owner can share
    if (!task.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to share this task' });
    }

    if (!task.sharedWith.includes(userToShare._id)) {
      task.sharedWith.push(userToShare._id);
      await task.save();
    }

    res.json({ message: 'Task shared successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
