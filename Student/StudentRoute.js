const express = require('express');
const { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('./StudentController');
const router = express.Router();

router.post('/', addStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
