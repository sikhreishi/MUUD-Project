const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Add a new contact
router.post('/add', contactController.addContact);

// Get all contacts for a user
router.get('/user/:id', contactController.getUserContacts);

module.exports = router; 