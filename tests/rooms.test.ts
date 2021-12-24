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
let roomId: number;

describe('Rooms controller', () => {
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

  describe('GET /rooms', async () => {
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/rooms');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/rooms')
        .set('Authorization', 'Bearer kkefmwlekgmlgqm');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of rooms', async () => {
      const response = await request(app)
        .get('/rooms')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('rooms');
      expect(response.body.rooms).to.be.a('array');
      expect(response.body.rooms.length).to.be.gte(0);
    });
    it('responds with code 200 and array of one room', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('room');
      expect(response.body.room).to.be.a('array');
      expect(response.body.room.length).to.equal(1);
    });
    it('responds with code 400 and error message if room with id does not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No room found with id ${id}`);
    });
  });

  describe('POST /rooms', async () => {
    it('responds with code 400 and error message because of missing name', async () => {
      const response = await request(app)
        .post('/rooms')
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
        .post('/rooms')
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
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rakendus--€1inform44tika',
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
        .post('/rooms')
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
        .post('/rooms')
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
    it('responds with code 201 and id of new room', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Rakendusinformaatika 3',
          createdBy: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      roomId = response.body.id;
    });
    /* it('responds with code 500 if fails to create room in database', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Mari Jalakas',
        });
      expect(response.statusCode).to.equal(500);
    }); */
  });

  describe('PUT /rooms/:id', async () => {
    it('responds with code 400 and error message because provided room id is not an integer', async () => {
      const id = 'klklgj';
      const response = await request(app)
        .put(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a number');
    });
    it('responds with code 400 and error message because provided room id number is not positive', async () => {
      const id = -999;
      const response = await request(app)
        .put(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a positive number');
    });
    it('responds with code 400 and error message because no parameters were given to be updated', async () => {
      const response = await request(app)
        .put(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message if room with id does not exist', async () => {
      const id = 1003;
      const response = await request(app)
        .put(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Käsitöö',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No room found with id ${id}`);
    });
    it('responds with code 400 and error message when name is an array', async () => {
      const response = await request(app)
        .put(`/rooms/${roomId}`)
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
        .put(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Käsitöö€€5!/',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when name is empty string', async () => {
      const response = await request(app)
        .put(`/rooms/${roomId}`)
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
        .put(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Käsitöö',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });

  describe('DELETE /rooms', async () => {
    it('responds with code 400 and error message if room with id does not exist', async () => {
      const id = 1001;
      const response = await request(app)
        .delete(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No room found with id ${id}`);
    });
    it('responds with code 200 and result true', async () => {
      const response = await request(app)
        .delete(`/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });
});
