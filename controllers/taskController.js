const Task = require('../models/Task');

// 📄 Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { owner: req.user.id },
        { sharedWith: req.user.id }
      ]
    }).populate('sharedWith', 'email username')
    .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Create task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, owner: req.user.id });
    await newTask.save();

    // ✅ Emit real-time event
    const io = req.app.get('io');
    io.emit('taskCreated', newTask);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✏️ Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // ✅ Emit real-time update
    const io = req.app.get('io');
    io.emit('taskUpdated', updatedTask);

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    // ✅ Emit delete event
    const io = req.app.get('io');
    io.emit('taskDeleted', req.params.id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
