const request = require('supertest');
const app = require('../src/server'); // Make sure your server exports the app

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser_' + Date.now(),
        password: 'testpassword'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should login with correct credentials', async () => {
    const username = 'testuser_' + Date.now();
    const password = 'testpassword';

    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({ username, password });

    // Then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token');
  });
}); 