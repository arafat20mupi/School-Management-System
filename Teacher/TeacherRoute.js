const express = require('express');
const {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require('./TeacherController');
const upload = require('../Middileware/upload'); 
const router = express.Router();

// Add a new teacher
router.post('/', upload.single('profileImage'), addTeacher);

// Get all teachers
router.get('/', getAllTeachers);

// Get a single teacher by ID
router.get('/:id', getTeacherById);

// Update a teacher
router.put('/:id', upload.single('profileImage'), updateTeacher);

// Soft delete a teacher
router.delete('/:id', deleteTeacher);

module.exports = router;
