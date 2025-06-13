const db = require('../config/db.config');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

exports.register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, password } = value;
    // Check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    const result = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json({
      success: true,
      user: { id: result.rows[0].id, username: result.rows[0].username },
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, password } = value;
    // Find user
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = userResult.rows[0];
    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate JWT
    const token = jwt.sign({ user_id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username },
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
}; 