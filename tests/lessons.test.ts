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
let lessonId: number;

describe('Lessons controller', () => {
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

  describe('GET /lessons', async () => {
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/lessons');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/lessons')
        .set('Authorization', 'Bearer kkefmwlekgmlgqm');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of lessons', async () => {
      const response = await request(app)
        .get('/lessons')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lessons');
      expect(response.body.lessons).to.be.a('array');
      expect(response.body.lessons.length).to.be.gte(0);
    });
    it('responds with code 200 and array of one lesson', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lesson');
      expect(response.body.lesson).to.be.a('array');
      expect(response.body.lesson.length).to.equal(1);
    });
    it('responds with code 400 and error message if lesson with id does not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lesson found with id ${id}`);
    });
    it('responds with code 400 and error message if lessons with Course Id do not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/lessons/course/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lessons found with Course Id ${id}`);
    });
    it('responds with code 200 and array of lessons with Course Id', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/lessons/course/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lessons');
      expect(response.body.lessons).to.be.a('array');
      expect(response.body.lessons.length).to.be.gte(0);
    });
    it('responds with code 400 and error message if lessons with Subject Id do not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/lessons/subject/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lessons found with Subject Id ${id}`);
    });
    it('responds with code 200 and array of lessons with Subject Id', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/lessons/subject/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lessons');
      expect(response.body.lessons).to.be.a('array');
      expect(response.body.lessons.length).to.be.gte(0);
    });
    it('responds with code 400 and error message if lessons with Teacher Id do not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/lessons/teacher/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lessons found with Teacher Id ${id}`);
    });
    it('responds with code 200 and array of lessons with Teacher Id', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/lessons/teacher/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lessons');
      expect(response.body.lessons).to.be.a('array');
      expect(response.body.lessons.length).to.be.gte(0);
    });
    it('responds with code 400 and error message if lessons with Room Id do not exist', async () => {
      const id = 1000;
      const response = await request(app)
        .get(`/lessons/room/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lessons found with Room Id ${id}`);
    });
    it('responds with code 200 and array of lessons with Room Id', async () => {
      const id = 1;
      const response = await request(app)
        .get(`/lessons/room/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lessons');
      expect(response.body.lessons).to.be.a('array');
      expect(response.body.lessons.length).to.be.gte(0);
    });
  });

  describe('POST /lessons', async () => {
    it('responds with code 400 and error message because startTime is zero', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when startTime is an array', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because startTime is an integer', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: 50,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Start time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 400 and error message because startTime is an incorrect string', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: 'okei test',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Start time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 200 and result true if startTime is in string format YYYY', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021',
          endTime: '2021-12-26 15:00:00',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 200 and result true if startTime is in string format YYYY-MM', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12',
          endTime: '2021-12-26 15:00:00',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 200 and result true if startTime is in string format YYYY-MM-DD', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-25',
          endTime: '2021-12-26 15:00:00',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 400 and error message if startTime is in string format YYYY HH:MM:SS', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021 13:45:00',
          endTime: '2021-12-26 15:00:00',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Start time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 400 and error message because endTime is zero', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          endTime: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when endTime is an array', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 15:00:00',
          endTime: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message because endTime is an integer', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 15:00:00',
          endTime: 50,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('End time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 400 and error message because endTime is an incorrect string', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 15:00:00',
          endTime: 'okei test',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('End time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 200 and result true if endTime is in string format YYYY', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 15:00:00',
          endTime: '2021',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 200 and result true if endTime is in string format YYYY-MM', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 15:00:00',
          endTime: '2021-12',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 200 and result true if endTime is in string format YYYY-MM-DD', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-25 15:00:00',
          endTime: '2021-12-26',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 400 and error message if endTime is in string format YYYY HH:MM:SS', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-26 13:45:00',
          endTime: '2021 15:00:00',
          duration: 4,
          courseId: 1,
          subjectId: 2,
          teacherId: 3,
          roomId: 4,
          comment: 'Esitlused zoomis',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('End time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS');
    });
    it('responds with code 400 and error message because duration is zero', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          duration: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because entity id-s are zero', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: 0,
          subjectId: 0,
          teacherId: 0,
          roomId: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because of missing startTime', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          // startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Start time is required');
    });
    it('responds with code 400 and error message because of missing endTime', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          // endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('End time is required');
    });
    it('responds with code 400 and error message because of missing duration', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          // duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Duration is required');
    });
    it('responds with code 400 and error message because duration has incorrect value', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Duration must be a positive number');
    });
    it('responds with code 400 and error message because of missing Course ID', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          // courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Course ID is required');
    });
    it('responds with code 400 and error message because courseId has incorrect value', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Course ID must be a positive number');
    });
    it('responds with code 400 and error message because of missing Subject ID', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          // subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Subject ID is required');
    });
    it('responds with code 400 and error message because subjectId has incorrect value', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Subject ID must be a positive number');
    });
    it('responds with code 400 and error message because of missing Teacher ID', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          // teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Teacher ID is required');
    });
    it('responds with code 400 and error message because teacherId has incorrect value', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Teacher ID must be a positive number');
    });
    it('responds with code 400 and error message because of missing Room ID', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          // roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Room ID is required');
    });
    it('responds with code 400 and error message because roomId has incorrect value', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Room ID must be a positive number');
    });
    it('responds with code 400 and error message when comment is an array', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
          comment: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 201 and id of new lesson', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      lessonId = response.body.id;
    });
    /* it('responds with code 500 if fails to create lesson in database', async () => {
      const response = await request(app)
        .post('/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: '2021-12-16 08:00:00',
          endTime: '2021-12-16 11:15:00',
          duration: 4,
          courseId: 1,
          subjectId: 1,
          teacherId: 1,
          roomId: 1,
        });
      expect(response.statusCode).to.equal(500);
    }); */
  });

  describe('PUT /lessons/:id', async () => {
    it('responds with code 400 and error message because provided lesson id is not an integer', async () => {
      const id = 'klklgj';
      const response = await request(app)
        .put(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a number');
    });
    it('responds with code 400 and error message because provided lesson id number is not positive', async () => {
      const id = -999;
      const response = await request(app)
        .put(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Id must be a positive number');
    });
    it('responds with code 400 and error message because duration is zero', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          duration: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message because no parameters were given to be updated', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message because duration is not an integer', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          duration: 'okei',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Duration must be a positive number');
    });
    it('responds with code 400 and error message because duration is not a positive number', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          duration: -15,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Duration must be a positive number');
    });
    it('responds with code 200 and result true for duration', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          duration: 4,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
    it('responds with code 400 and error message because courseId is not a positive number', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: -15,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Course ID must be a positive number');
    });
    it('responds with code 400 and error message because subjectId is not a positive number', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          subjectId: -15,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Subject ID must be a positive number');
    });
    it('responds with code 400 and error message because teacherId is not a positive number', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          teacherId: -15,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Teacher ID must be a positive number');
    });
    it('responds with code 400 and error message because roomId is not a positive number', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          roomId: -15,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Room ID must be a positive number');
    });
    it('responds with code 400 and error message when startTime is an array', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          startTime: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and error message when endTime is an array', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          endTime: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and result true when comment is 0', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: 0,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be 0');
    });
    it('responds with code 400 and error message when comment is an array', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: [],
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Inserted value(s) cannot be an array');
    });
    it('responds with code 400 and result true when comment is undefined', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: undefined,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 200 and result true when comment is string', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: 'test',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
    it('responds with code 200 and result true when comment is null', async () => {
      const response = await request(app)
        .put(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: null,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
    it('responds with code 400 and error message if lesson with id does not exist', async () => {
      const id = 1003;
      const response = await request(app)
        .put(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseId: 4,
          comment: null,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lesson found with id ${id}`);
    });
  });

  describe('DELETE /lessons', async () => {
    it('responds with code 400 and error message if lesson with id does not exist', async () => {
      const id = 1001;
      const response = await request(app)
        .delete(`/lessons/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(`No lesson found with id ${id}`);
    });
    it('responds with code 200 and result true', async () => {
      const response = await request(app)
        .delete(`/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('result');
      expect(response.body.result).to.be.a('boolean');
      expect(response.body.result).to.equal(true);
    });
  });
});
