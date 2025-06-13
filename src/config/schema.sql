-- Create journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    entry_text TEXT NOT NULL,
    mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 5),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id); 