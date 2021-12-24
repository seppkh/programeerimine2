/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import request from 'supertest'; // saata päringuid api endpointidele
import { expect } from 'chai'; // kirjeldab eelduseid ja oodatud tulemusi
import { describe, it } from 'mocha'; // põhiline testide kirjutamine, aitab neid kirjutada arusaadavalt
import app from '../src/app';

const user = {
  email: 'admin@admin.ee',
  password: 'juku',
};

let token: string;
let subjectId: number;

describe('Subjects controller', () => {
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

  describe('GET /subjects', async () => {
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/subjects');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', 'Bearer kkefmwlekgmlgqm');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of subjects', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('subjects');
      expect(response.body.subjects).to.be.a('array');
      expect(response.body.subjects.length).to.be.gte(0);
    });
    it('responds with code 200 and array of one subject', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('subject');
      expect(response.body.subject).to.be.a('array');
      expect(response.body.subject.length).to.equal(1);
    });
    it('responds with code 400 and error message if subject with id does not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No subject found with id ${id}`);
    });
  });

  describe('POST /subjects', async () => {
    it('responds with code 400 and error message because of missing name', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name is required');
    });
    it('responds with code 400 and error message when name is an array', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when name is empty string', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name cannot be an empty string');
    });
    it('responds with code 400 and error message when name contains other symbols than letters and numbers', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rakendus--€1inform44tika',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters and numbers');
    });
    it('responds with code 400 and error message when name is empty', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name is required');
    });
    it('responds with code 400 and error message because of missing EAP', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('EAP is required');
    });
    it('responds with code 400 and error message because EAP is zero', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika',
          EAP: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because EAP has incorrect value', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika',
          EAP: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('EAP must be a positive number');
    });
    it('responds with code 400 and error message because EAP is not a positive number', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika',
          EAP: -5,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('EAP must be a positive number');
    });
    it('responds with code 201 and id of new subject', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika 3',
          EAP: 4,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      subjectId = response.body.id;
    });
    /* it('responds with code 500 if fails to create subject in database', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Mari Jalakas',
        });
      expect(response.statusCode).to.equal(500);
    }); */
  });

  describe('PUT /subjects/:id', async () => {
    it('responds with code 400 and error message because provided subject id is not an integer', async () => {
      const id = 'klklgj';
      const response = await request(app)
        .put(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a number');
    });
    it('responds with code 400 and error message because provided subject id number is not positive', async () => {
      const id = -999;
      const response = await request(app)
        .put(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a positive number');
    });
    it('responds with code 400 and error message because no parameters were given to be updated', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message if subject with id does not exist', async () => {
      const id = 1003;
      const response = await request(app)
        .put(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Käsitöö',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No subject found with id ${id}`);
    });
    it('responds with code 400 and error message when name is an array', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when name contains other symbols than letters and numbers', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Käsitöö€€5!/',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters and numbers');
    });
    it('responds with code 400 and error message when name is empty string', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '     ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name cannot be an empty string');
    });
    it('responds with code 200 and result true when name is string', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Kujundusgraafika 3',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
    it('responds with code 400 and error message because EAP is zero', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          EAP: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because EAP has incorrect value', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          EAP: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('EAP must be a positive number');
    });
    it('responds with code 400 and error message because EAP is not a positive number', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          EAP: -5,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('EAP must be a positive number');
    });
    it('responds with code 200 and result true when EAP is correct', async () => {
      const response = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          EAP: 6,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });

  describe('DELETE /subjects', async () => {
    it('responds with code 400 and error message if subject with id does not exist', async () => {
      const id = 1001;
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No subject found with id ${id}`);
    });
    it('responds with code 200 and result true', async () => {
      const response = await request(app)
        .delete(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });
});
