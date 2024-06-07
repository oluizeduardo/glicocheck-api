import request from 'supertest';
import { expect } from 'chai';
import app from '../../../server.js';

describe('Gender router - Integration Tests', function () {
  let accessToken;

  before(async function () {
    const email = process.env.TEST_USER_ADMIN_EMAIL;
    const password = process.env.TEST_USER_ADMIN_PASSWORD;
    console.log(email, password);

    const res = await request(app)
      .post('/api/authentication/login')
      .send({ email, password });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('access_token');
    accessToken = res.body.access_token;
  });

  describe('GET /api/genders', function () {
    it('should return all genders', async function () {
      const res = await request(app)
        .get('/api/genders')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /api/genders', function () {
    it('should create a new gender', async function () {
      // to ensure unique description in the database.
      const description = 'Gender' + Math.random();
      const newItem = { description };
      const res = await request(app)
        .post('/api/genders')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newItem);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message');
    });
  });
});
