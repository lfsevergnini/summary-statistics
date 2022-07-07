const request = require('supertest');
const app = require('../../server');
const helpers = require('../helpers');

describe('Statistics', () => {
  describe('Company SS', () => {
    it('should return 401 when unauthenticated', async () => {
      const res = await request(app)
        .get('/statistics');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 200 containing min, max and mean', async () => {
      const res = await request(app)
        .get('/statistics')
        .set('Authorization', helpers.generateBearerToken());
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('min');
      expect(res.body).toHaveProperty('max');
      expect(res.body).toHaveProperty('mean');
    });

    it('should return different values when "on_contract" is passed as a param', async () => {
      const res1 = await request(app)
        .get('/statistics')
        .set('Authorization', helpers.generateBearerToken());

      const res2 = await request(app)
        .get('/statistics?on_contract=1')
        .set('Authorization', helpers.generateBearerToken());

      expect(res1.statusCode).toEqual(200);
      expect(res2.statusCode).toEqual(200);

      expect(res1.body.min).not.toEqual(res2.body.min);
      expect(res1.body.max).not.toEqual(res2.body.max);
      expect(res1.body.mean).not.toEqual(res2.body.mean);
    });
  });

  describe('Department SS', () => {
    it('should return 401 when unauthenticated', async () => {
      const res = await request(app)
        .get('/statistics/departments');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 200 containing department name and its SS', async () => {
      const res = await request(app)
        .get('/statistics/departments')
        .set('Authorization', helpers.generateBearerToken());
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('department');
      expect(res.body[0]).toHaveProperty('summary');
    });
  });

  describe('Sub-Department SS', () => {
    it('should return 401 when unauthenticated', async () => {
      const res = await request(app)
        .get('/statistics/sub-departments');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 200 containing department/sub-department names and its SS', async () => {
      const res = await request(app)
        .get('/statistics/sub-departments')
        .set('Authorization', helpers.generateBearerToken());
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('department');
      expect(res.body[0]).toHaveProperty('summary');
    });
  });
});
