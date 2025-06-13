const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal.controller');

// Create a new journal entry
router.post('/entry', journalController.createEntry);

// Get all journal entries for a user
router.get('/user/:id', journalController.getUserEntries);

module.exports = router; 