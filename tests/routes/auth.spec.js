const request = require('supertest');
const app = require('../../server');

describe('Auth', () => {
  it('should generate a JWT token for existing user with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({
        username: 'foo',
        password: 'bar',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/token')
      .send({
        username: 'bar',
        password: 'foo',
      });
    expect(res.statusCode).toEqual(401);
  });
});
