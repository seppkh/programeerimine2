/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/**
 * Import express framework
 */
import express, { Request, Response, Application } from 'express';

/**
  * Swagger UI for API documentation
  */
// import swaggerUi from 'swagger-ui-express';

import coursesController from './components/courses/controller';
import lessonsController from './components/lessons/controller';
import roomsController from './components/rooms/controller';
import subjectsController from './components/subjects/controller';
import teachersController from './components/teachers/controller';
import usersController from './components/users/controller';
import responseCodes from './components/general/responseCodes';

import port from './components/general/settings';
// import pathCheck from './components/general/pathCheckMiddleware';
import headers from './components/general/corsCacheHeaderMiddleware';
import authController from './components/auth/controller';

/**
 * Create express app
 */
const app: Application = express();

/**
 * Middleware for creating request body object
 */
app.use(express.json());

/**
 * Swagger API documentation
 */
// const swaggerUi = require('swagger-ui-express');
/* const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); */

/**
 * Use CORS and cache headers in app
 */
app.use(headers);
// app.use(pathCheck);

/**
 * Testing API endpoints
 */
app.get('/ping', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: 'API is working',
  });
});

/**
 * Login endpoint
 */
app.post('/login', authController.login);

/**
 * Users endpoints
 * */
app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.post('/users', usersController.createUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.removeUser);

/**
 * Courses endpoints
 * */
app.get('/courses', coursesController.getAllCourses);
app.get('/courses/:id', coursesController.getCourseById);
app.post('/courses', coursesController.createCourse);
app.put('/courses/:id', coursesController.updateCourse);
app.delete('/courses/:id', coursesController.removeCourse);

/**
 * Subjects endpoints
 * */
app.get('/subjects', subjectsController.getAllSubjects);
app.get('/subjects/:id', subjectsController.getSubjectById);
app.post('/subjects', subjectsController.createSubject);
app.put('/subjects/:id', subjectsController.updateSubject);
app.delete('/subjects/:id', subjectsController.removeSubject);

/**
 * Teachers endpoints
 * */
app.get('/teachers', teachersController.getAllTeachers);
app.get('/teachers/:id', teachersController.getTeacherById);
app.post('/teachers', teachersController.createTeacher);
app.put('/teachers/:id', teachersController.updateTeacher);
app.delete('/teachers/:id', teachersController.removeTeacher);

/**
 * Rooms endpoints
 * */
app.get('/rooms', roomsController.getAllRooms);
app.get('/rooms/:id', roomsController.getRoomById);
app.post('/rooms', roomsController.createRoom);
app.put('/rooms/:id', roomsController.updateRoom);
app.delete('/rooms/:id', roomsController.removeRoom);

/**
 * Lessons endpoints
 * */
app.get('/lessons', lessonsController.getAllLessons);
app.get('/lessons/:id', lessonsController.getLessonById);
app.post('/lessons', lessonsController.createLesson);
app.put('/lessons/:id', lessonsController.updateLesson);
app.delete('/lessons/:id', lessonsController.removeLesson);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
