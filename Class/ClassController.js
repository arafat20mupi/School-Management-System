const Class = require('./ClassSchema');
const Teacher = require('../Teacher/TeacherSchema');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    // Check if the teacher exists
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const newClass = await Class.create({ name, teacherId });

    res.status(201).json({ success: true, class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create class' });
  }
};

// Get all classes (with pagination)
exports.getClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const classes = await Class.find()
      .populate('teacherId', 'name') // Populate teacher name
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalClasses = await Class.countDocuments();

    res.status(200).json({
      success: true,
      classes,
      pagination: {
        total: totalClasses,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id).populate('teacherId', 'name');
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ success: true, class: classData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch class' });
  }
};

// Update class details (e.g., name, teacher)
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, teacherId } = req.body;

    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    if (teacherId) {
      // Check if the new teacher exists
      const teacherExists = await Teacher.findById(teacherId);
      if (!teacherExists) {
        return res.status(404).json({ error: 'New teacher not found' });
      }
      classData.teacherId = teacherId;
    }

    if (name) classData.name = name;

    await classData.save();
    res.status(200).json({ success: true, class: classData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update class' });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id);
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    await classData.remove();

    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete class' });
  }
};
