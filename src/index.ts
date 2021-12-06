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
import isLoggedIn from './components/auth/isLoggedInMiddleware';
import validateCreateLesson from './components/lessons/middleware';

import port from './components/general/settings';
// import pathCheck from './components/general/pathCheckMiddleware';
import headers from './components/general/corsCacheHeaderMiddleware';
import authController from './components/auth/controller';
import isAdmin from './components/auth/isAdminMiddleware';

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
 * Endpoints without logging in middleware
 */
app.post('/login', authController.login);
app.post('/users', usersController.createUser);

/**
 * Endpoints with logging in middleware
 */
app.use(isLoggedIn);

/**
 * Users endpoints
 *
 * */
app.get('/users', isAdmin, usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.put('/users/:id', isAdmin, usersController.updateUser);
app.delete('/users/:id', isAdmin, usersController.removeUser);

/**
 * Courses endpoints
 * */
app.get('/courses', coursesController.getAllCourses);
app.get('/courses/:id', coursesController.getCourseById);
app.post('/courses', isAdmin, coursesController.createCourse);
app.put('/courses/:id', isAdmin, coursesController.updateCourse);
app.delete('/courses/:id', isAdmin, coursesController.removeCourse);

/**
 * Subjects endpoints
 * */
app.get('/subjects', subjectsController.getAllSubjects);
app.get('/subjects/:id', subjectsController.getSubjectById);
app.post('/subjects', isAdmin, subjectsController.createSubject);
app.put('/subjects/:id', isAdmin, subjectsController.updateSubject);
app.delete('/subjects/:id', isAdmin, subjectsController.removeSubject);

/**
 * Teachers endpoints
 * */
app.get('/teachers', teachersController.getAllTeachers);
app.get('/teachers/:id', teachersController.getTeacherById);
app.post('/teachers', isAdmin, teachersController.createTeacher);
app.put('/teachers/:id', isAdmin, teachersController.updateTeacher);
app.delete('/teachers/:id', isAdmin, teachersController.removeTeacher);

/**
 * Rooms endpoints
 * */
app.get('/rooms', roomsController.getAllRooms);
app.get('/rooms/:id', roomsController.getRoomById);
app.post('/rooms', isAdmin, roomsController.createRoom);
app.put('/rooms/:id', isAdmin, roomsController.updateRoom);
app.delete('/rooms/:id', isAdmin, roomsController.removeRoom);

/**
 * Lessons endpoints
 * */
app.get('/lessons', lessonsController.getAllLessons);
app.get('/lessons/:id', lessonsController.getLessonById);
app.post('/lessons', isAdmin, validateCreateLesson, lessonsController.createLesson);
app.put('/lessons/:id', isAdmin, lessonsController.updateLesson);
app.delete('/lessons/:id', isAdmin, lessonsController.removeLesson);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
