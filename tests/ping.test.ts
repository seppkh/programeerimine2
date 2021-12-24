import request from 'supertest'; // saata päringuid api endpointidele
import { expect } from 'chai'; // kirjeldab eelduseid ja oodatud tulemusi
import { describe, it } from 'mocha'; // põhiline testide kirjutamine, aitab neid kirjutada arusaadavalt
import app from '../src/app';

describe('Ping controller', () => {
  describe('GET /ping', () => {
    it('responds with code 200 and "API is working" message', async () => {
      const response = await request(app).get('/ping');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal('API is working');
    });
  });
});
