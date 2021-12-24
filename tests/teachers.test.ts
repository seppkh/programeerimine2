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
let teacherId: number;

describe('Teachers controller', () => {
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

  describe('GET /teachers', async () => {
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/teachers');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/teachers')
        .set('Authorization', 'Bearer kkefmwlekgmlgqm');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of teachers', async () => {
      const response = await request(app)
        .get('/teachers')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('teachers');
      expect(response.body.teachers).to.be.a('array');
      expect(response.body.teachers.length).to.be.gte(0);
    });
    it('responds with code 200 and array of one teacher', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('teacher');
      expect(response.body.teacher).to.be.a('array');
      expect(response.body.teacher.length).to.equal(1);
    });
    it('responds with code 400 and error message if teacher with id does not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No teacher found with id ${id}`);
    });
  });

  describe('POST /teachers', async () => {
    it('responds with code 400 and error message because of missing name', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name is required');
    });
    it('responds with code 400 and error message when name is an array', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: [],
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when name contains other symbols than letters', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Pee594k/€2ter',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when name contains numbers', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'P33t3r',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when name is empty string', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '        ',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name cannot be an empty string');
    });
    it('responds with code 400 and error message when name is empty', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name is required');
    });
    it('responds with code 201 and id of new teacher', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Jüri Jalakas',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      teacherId = response.body.id;
    });
    /* it('responds with code 500 if fails to create teacher in database', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Mari Jalakas',
        });
      expect(response.statusCode).to.equal(500);
    }); */
  });

  describe('PUT /teachers/:id', async () => {
    it('responds with code 400 and error message because provided teacher id is not an integer', async () => {
      const id = 'klklgj';
      const response = await request(app)
        .put(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a number');
    });
    it('responds with code 400 and error message because provided teacher id number is not positive', async () => {
      const id = -999;
      const response = await request(app)
        .put(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a positive number');
    });
    it('responds with code 400 and error message because no parameters were given to be updated', async () => {
      const response = await request(app)
        .put(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message if teacher with id does not exist', async () => {
      const id = 1003;
      const response = await request(app)
        .put(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Mari Jalakas',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No teacher found with id ${id}`);
    });
    it('responds with code 400 and error message when name is an array', async () => {
      const response = await request(app)
        .put(`/teachers/${teacherId}`)
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
    it('responds with code 400 and error message when name contains other symbols than letters', async () => {
      const response = await request(app)
        .put(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Pee594k/€2ter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when name contains numbers', async () => {
      const response = await request(app)
        .put(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'P33t3r',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when name is empty string', async () => {
      const response = await request(app)
        .put(`/teachers/${teacherId}`)
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
        .put(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Peeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });

  describe('DELETE /teachers', async () => {
    it('responds with code 400 and error message if teacher with id does not exist', async () => {
      const id = 1001;
      const response = await request(app)
        .delete(`/teachers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No teacher found with id ${id}`);
    });
    it('responds with code 200 and result true', async () => {
      const response = await request(app)
        .delete(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });
});
