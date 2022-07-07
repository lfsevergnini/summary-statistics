const request = require('supertest');
const app = require('../../server');
const helpers = require('../helpers');

describe('Employees', () => {
  describe('Insert', () => {
    it('should return 401 when unauthenticated', async () => {
      const res = await request(app)
        .post('/employees');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 201 when payload is valid', async () => {
      const res = await request(app)
        .post('/employees')
        .set('Authorization', helpers.generateBearerToken())
        .send({
          name: 'Foo Bar',
          salary: 123456,
          currency: 'USD',
          department: 'Engineering',
          sub_department: 'Platform',
          on_contract: false,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('should return 400 when payload is NOT valid', async () => {
      const res = await request(app)
        .post('/employees')
        .set('Authorization', helpers.generateBearerToken())
        .send({
          salary: 'haha',
          currency: 'D',
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('Delete', () => {
    it('should return 401 when unauthenticated', async () => {
      const res = await request(app)
        .delete('/employees');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 204 when user exists', async () => {
      const res = await request(app)
        .delete('/employees/1')
        .set('Authorization', helpers.generateBearerToken());
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 when user DOES NOT exist', async () => {
      const res = await request(app)
        .delete('/employees/99999')
        .set('Authorization', helpers.generateBearerToken());
      expect(res.statusCode).toEqual(404);
    });
  });
});
