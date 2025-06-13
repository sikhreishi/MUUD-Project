const db = require('../config/db.config');
const Joi = require('joi');

// Validation schema for journal entry
const journalEntrySchema = Joi.object({
  user_id: Joi.number().required(),
  entry_text: Joi.string().required(),
  mood_rating: Joi.number().min(1).max(5).required(),
  timestamp: Joi.date().default(() => new Date())
});

exports.createEntry = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = journalEntrySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user_id, entry_text, mood_rating, timestamp } = value;

    // Insert into database
    const result = await db.query(
      'INSERT INTO journal_entries (user_id, entry_text, mood_rating, timestamp) VALUES ($1, $2, $3, $4) RETURNING id',
      [user_id, entry_text, mood_rating, timestamp]
    );

    res.status(201).json({
      success: true,
      entry_id: result.rows[0].id,
      message: 'Journal entry created successfully'
    });
  } catch (err) {
    console.error('Error creating journal entry:', err);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
};

exports.getUserEntries = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      'SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY timestamp DESC',
      [userId]
    );

    res.json({
      success: true,
      entries: result.rows
    });
  } catch (err) {
    console.error('Error fetching journal entries:', err);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
}; 