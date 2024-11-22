const express = require('express');
const { 
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require('./ClassController');

const router = express.Router();

// Routes for managing classes
router.post('/',  createClass); // Create a new class
router.get('/',  getClasses); // Get all classes
router.get('/:id',  getClassById); // Get a class by ID
router.put('/:id',  updateClass); // Update a class
router.delete('/:id',  deleteClass); // Delete a class

module.exports = router;
