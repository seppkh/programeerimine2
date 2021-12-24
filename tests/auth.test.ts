/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-unused-vars */
import request from 'supertest'; // saata päringuid api endpointidele
import { expect } from 'chai'; // kirjeldab eelduseid ja oodatud tulemusi
import { describe, it } from 'mocha'; // põhiline testide kirjutamine, aitab neid kirjutada arusaadavalt
import app from '../src/app';

const user = {
  email: 'admin@admin.ee',
  password: 'juku',
};

let token: string = '';

describe('Auth controller', async () => {
  describe('POST /login', async () => {
    it('responds with code 200 and token provided after login', async () => {
      const response = await request(app)
        .post('/login')
        .send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.a('string');
      token = response.body.token;
    });
  });
});

export default token;
