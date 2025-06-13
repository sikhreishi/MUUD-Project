const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MUUD Health API' });
});

// Import routes
const journalRoutes = require('./routes/journal.routes');
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', authMiddleware, journalRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 