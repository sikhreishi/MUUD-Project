const request = require('supertest');
const app = require('../src/server');

describe('Journal Endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Register and login a user to get a token
    const username = 'journaluser_' + Date.now();
    const password = 'testpassword';
    await request(app)
      .post('/api/auth/register')
      .send({ username, password });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username, password });
    token = loginRes.body.token;
    userId = loginRes.body.user.id;
  });

  it('should create a new journal entry', async () => {
    const res = await request(app)
      .post('/api/journal/entry')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: userId,
        entry_text: 'This is a test journal entry',
        mood_rating: 4
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('entry_id');
  });

  it('should fetch journal entries for the user', async () => {
    const res = await request(app)
      .get(`/api/journal/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.entries)).toBe(true);
  });
}); 