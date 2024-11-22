const Teacher = require('./TeacherSchema');
const cloudinary = require('../Config/cloudinary');

// Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, subject } = req.body;

    let profileImageUrl = '';
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = uploadResult.secure_url;
    }

    const teacher = new Teacher({ name, email, subject, profileImageUrl });
    await teacher.save();

    res.status(201).json({ success: true, data: teacher });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all teachers with pagination
const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = { isDeleted: false };

    const teachers = await Teacher.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Teacher.countDocuments(filter);

    res.status(200).json({ success: true, data: teachers, total: count });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get a single teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findById(id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update a teacher's details
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject } = req.body;

    let profileImageUrl;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = uploadResult.secure_url;
    }

    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { name, subject, profileImageUrl },
      { new: true }
    );

    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, data: teacher });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Soft delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
