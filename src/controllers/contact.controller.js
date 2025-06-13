const db = require('../config/db.config');
const Joi = require('joi');

// Validation schema for contact
const contactSchema = Joi.object({
  user_id: Joi.number().required(),
  contact_name: Joi.string().required(),
  contact_email: Joi.string().email().required()
});

exports.addContact = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user_id, contact_name, contact_email } = value;

    // Check for existing contact with the same email for this user
    const existing = await db.query(
      'SELECT * FROM contacts WHERE user_id = $1 AND contact_email = $2',
      [user_id, contact_email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Contact with this email already exists for this user.' });
    }

    // Insert into database
    const result = await db.query(
      'INSERT INTO contacts (user_id, contact_name, contact_email) VALUES ($1, $2, $3) RETURNING id',
      [user_id, contact_name, contact_email]
    );

    res.status(201).json({
      success: true,
      contact_id: result.rows[0].id,
      message: 'Contact added successfully'
    });
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).json({ error: 'Failed to add contact' });
  }
};

exports.getUserContacts = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      'SELECT * FROM contacts WHERE user_id = $1 ORDER BY contact_name',
      [userId]
    );

    res.json({
      success: true,
      contacts: result.rows
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}; 