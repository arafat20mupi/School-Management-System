const Student = require('./StudentSchema');
const Class = require('../Class/ClassSchema');
const cloudinary = require('../Config/cloudinary');

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, classId } = req.body;

    // Check if the class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Upload profile image to Cloudinary (if provided)
    let profileImageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.secure_url;
    }

    const newStudent = await Student.create({ name, email, classId, profileImageUrl });

    // Increment the student count in the associated class
    classExists.studentCount += 1;
    await classExists.save();

    res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add student' });
  }
};

// Get all students (with pagination and class filtering)
exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, classId } = req.query;

    const filter = { isDeleted: false };
    if (classId) filter.classId = classId;

    const students = await Student.find(filter)
      .populate('classId', 'name') // Populate class name
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalStudents = await Student.countDocuments(filter);

    res.status(200).json({
      success: true,
      students,
      pagination: {
        total: totalStudents,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).populate('classId', 'name');
    if (!student || student.isDeleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

// Update a student (e.g., name, class, profile image)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, classId } = req.body;

    const student = await Student.findById(id);
    if (!student || student.isDeleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update profile image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      student.profileImageUrl = result.secure_url;
    }

    // Update other fields
    if (name) student.name = name;
    if (classId) {
      // Update the student count for old and new classes
      const oldClass = await Class.findById(student.classId);
      const newClass = await Class.findById(classId);

      if (!newClass) {
        return res.status(404).json({ error: 'New class not found' });
      }

      oldClass.studentCount -= 1;
      await oldClass.save();

      newClass.studentCount += 1;
      await newClass.save();

      student.classId = classId;
    }

    await student.save();
    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete a student (soft delete preferred)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student || student.isDeleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Soft delete the student
    student.isDeleted = true;
    await student.save();

    // Decrease the student count in the associated class
    const classData = await Class.findById(student.classId);
    classData.studentCount -= 1;
    await classData.save();

    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
