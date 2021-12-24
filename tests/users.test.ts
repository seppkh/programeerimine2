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

/*
                        ********************

EMAILS on rows 23 and 766 MUST BE CHANGED to unique (non-existing) emails EVERY TIME the test is run. Existing emails are not allowed and will fail the test.

                        ********************
*/
const newUserWithUniqueEmail = {
  firstName: 'Peeter',
  lastName: 'Tamm',
  email: 'peeter11@tamm.ee',
  password: 'peeter',
};

/*
                        ********************

 * newUserWithDuplicateEmail is used to check user creation when the email already exists in database. This email should NOT be changed, unless the database gets reset. If the database gets reset, then an existing email must be entered here.

                        ********************
*/
const newUserWithDuplicateEmail = {
  firstName: 'Peeter',
  lastName: 'Tamm',
  email: 'peeter2@tamm.ee',
  password: 'peeter',
};

let token: string;
let userId: number;

describe('Users controller', () => {
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

  describe('GET /users', async () => {
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', 'Bearer kkefmwlekgmlgqm');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('users');
      expect(response.body.users).to.be.a('array');
      expect(response.body.users.length).to.be.gte(0);
    });
    it('responds with code 200 and array of one user', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('user');
      expect(response.body.user).to.be.a('array');
      expect(response.body.user.length).to.equal(1);
    });
    it('responds with code 400 and error message if user with id does not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No user found with id ${id}`);
    });
  });

  describe('POST /users', async () => {
    it('responds with code 400 and error message because first name is zero', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when first name is an array', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when first name is empty string', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name cannot be an empty string');
    });
    it('responds with code 400 and error message when first name is empty', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name is required');
    });
    it('responds with code 400 and error message when first name contains other symbols than letters', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'P!-eeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when first name contains numbers', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'P33t3r',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name can only contain Estonian letters');
    });
    it('responds with code 400 and error message because last name is zero', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because of missing last name', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name is required');
    });
    it('responds with code 400 and error message when last name is an array', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when last name is empty string', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name cannot be an empty string');
    });
    it('responds with code 400 and error message when last name is empty', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name is required');
    });
    it('responds with code 400 and error message when last name contains other symbols than letters', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'P!-reeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when last name contains numbers', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'P33t3r',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name can only contain Estonian letters');
    });
    it('responds with code 400 and error message because of missing email', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Email is required');
    });
    it('responds with code 400 and error message email does not match email format with two @ signs', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm@.gmail.com',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Incorrect email');
    });
    it('responds with code 400 and error message email does not match email format without .domain ending', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Incorrect email');
    });
    it('responds with code 400 and error message because email is an array', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because email is zero', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because of missing password', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Password is required');
    });
    it('responds with code 400 and error message because password is too short', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm.ee',
          password: 'ptr',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Password must have at least 4 digits');
    });
    it('responds with code 400 and error message because password is an array', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm.ee',
          password: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because password is zero', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
          lastName: 'Tamm',
          email: 'peeter@tamm.ee',
          password: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when newUser email already exists', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...newUserWithDuplicateEmail,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`Failed to create user with email ${newUserWithDuplicateEmail.email}`);
    });
    it('responds with code 201 and id of new user when newUser email is unique', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...newUserWithUniqueEmail,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      userId = response.body.id;
    });
    /* it('responds with code 500 if fails to create user in database', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Mari Jalakas',
        });
      expect(response.statusCode).to.equal(500);
    }); */
  });

  describe('PUT /users/:id', async () => {
    it('responds with code 400 and error message because provided user id is not an integer', async () => {
      const id = 'klklgj';
      const response = await request(app)
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a number');
    });
    it('responds with code 400 and error message because provided user id number is not positive', async () => {
      const id = -999;
      const response = await request(app)
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a positive number');
    });
    it('responds with code 400 and error message because no parameters were given to be updated', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message if user with id does not exist', async () => {
      const id = 1003;
      const response = await request(app)
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Mati',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No user found with id ${id}`);
    });
    it('responds with code 400 and error message when first name is zero', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when first name is an array', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when first name contains other symbols than letters', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'P@£eter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when first name contains numbers', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'P33t3r',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when first name is empty string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('First name cannot be an empty string');
    });
    it('responds with code 400 and error message when first name is empty', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 200 and result true when first name is string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Peeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });

    it('responds with code 400 and error message when last name is zero', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when last name is an array', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when last name contains other symbols than letters', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'T@a"#%13mm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when last name contains numbers', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'T44mm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name can only contain Estonian letters');
    });
    it('responds with code 400 and error message when last name is empty string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Last name cannot be an empty string');
    });
    it('responds with code 400 and error message when last name is empty', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 200 and result true when last name is string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'Tamm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });

    it('responds with code 400 and error message when email is zero', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when email is an array', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message email does not match email format with two @ signs', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'peeter@tamm@.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Incorrect email');
    });
    it('responds with code 400 and error message email does not match email format without .domain ending', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'peeter@tamm',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Incorrect email');
    });
    it('responds with code 400 and error message when email is empty string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: '        ',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Incorrect email');
    });
    it('responds with code 400 and error message when email is empty', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: '',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });

    /*
                        ********************

     *  Following email MUST BE CHANGED TO A UNIQUE ONE every time the test is run. Otherwise the test will fail.

                        ********************
     * */
    it('responds with code 200 and result true when email matches email format and is not a duplicate', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'margus1@tamm.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });

    it('responds with code 400 and error message because password is too short', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'ptr',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Password must have at least 4 digits');
    });
    it('responds with code 400 and error message because password is an array', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because password is zero', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 200 and result true when password is string', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'peeter',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
    it('responds with code 400 and error message because role is an array', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          role: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because role is zero', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          role: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message is role is invalid', async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          role: 'Manager',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Invalid role entered');
    });
  });

  describe('DELETE /users', async () => {
    it('responds with code 400 and error message if user with id does not exist', async () => {
      const id = 1001;
      const response = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No user found with id ${id}`);
    });
    it('responds with code 200 and result true', async () => {
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });
});
