# MUUD Health Backend API

## Overview
MUUD Health is a mental health and wellness application that provides features for journaling, mood tracking, and contact management. This repository contains the backend API built with Node.js, Express, and MongoDB.

## Features
- User Authentication (Register, Login, Logout)
- Journal Entry Management
- Contact Management
- Secure Password Handling
- JWT Authentication
- CORS Enabled
- Environment Variable Configuration

## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/muud
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

For development with nodemon:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Journal Entries
- `GET /api/journal` - Get all journal entries
- `GET /api/journal/:id` - Get a specific journal entry
- `POST /api/journal` - Create a new journal entry
- `PUT /api/journal/:id` - Update a journal entry
- `DELETE /api/journal/:id` - Delete a journal entry

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get a specific contact
- `POST /api/contacts` - Create a new contact
- `PUT /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

## Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Journal Entry
```http
POST /api/journal
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "My First Entry",
  "content": "Today was a great day...",
  "mood": "happy"
}
```

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security
- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend access
- Environment variables for sensitive data

## Development
- ESLint for code linting
- Prettier for code formatting
- Nodemon for development auto-reload

## Testing
```bash
npm test
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/muud](https://github.com/yourusername/muud)
