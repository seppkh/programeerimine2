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

import cors from 'cors';

import coursesController from './components/courses/controller';
import lessonsController from './components/lessons/controller';
import roomsController from './components/rooms/controller';
import subjectsController from './components/subjects/controller';
import teachersController from './components/teachers/controller';
import usersController from './components/users/controller';
import responseCodes from './components/general/responseCodes';
import isLoggedIn from './components/auth/isLoggedInMiddleware';

// import pathCheck from './components/general/pathCheckMiddleware';
import headers from './components/general/corsCacheHeaderMiddleware';
import authController from './components/auth/controller';
import isAdmin from './components/auth/isAdminMiddleware';
import { validateCreateUser, validateUpdateUser } from './components/users/middleware';
import { validateCreateSubject, validateUpdateSubject } from './components/subjects/middleware';
import { validateCreateLesson, validateUpdateLesson } from './components/lessons/middleware';
import logger from './components/general/loggerMiddleware';
import validateIdNumber from './components/general/validateIdNumberMiddleware';
import { validateCreateTeacher, validateUpdateTeacher } from './components/teachers/middleware';
import { validateCreateCourse, validateUpdateCourse } from './components/courses/middleware';
import { validateCreateRoom, validateUpdateRoom } from './components/rooms/middleware';

/**
  * Create express app
  */
const app: Application = express();

/**
  * Middleware for creating request body object
  */
app.use(express.json());

/**
  * Register CORS middleware
  */
app.use(cors());

app.use(logger);

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
app.post('/users', validateCreateUser, usersController.createUser);

/**
  * Endpoints with logging in middleware
  */
app.use(isLoggedIn);

/**
  * Users endpoints
  *
  * */
app.get('/users', isAdmin, usersController.getAllUsers);
app.get('/users/:id', validateIdNumber, usersController.getUserById);
app.put('/users/:id', isAdmin, validateIdNumber, validateUpdateUser, usersController.updateUser);
app.delete('/users/:id', isAdmin, validateIdNumber, usersController.removeUser);

/**
  * Courses endpoints
  * */
app.get('/courses', coursesController.getAllCourses);
app.get('/courses/:id', validateIdNumber, coursesController.getCourseById);
app.post('/courses', isAdmin, validateCreateCourse, coursesController.createCourse);
app.put('/courses/:id', isAdmin, validateIdNumber, validateUpdateCourse, coursesController.updateCourse);
app.delete('/courses/:id', isAdmin, validateIdNumber, coursesController.removeCourse);

/**
  * Subjects endpoints
  * */
app.get('/subjects', subjectsController.getAllSubjects);
app.get('/subjects/:id', validateIdNumber, subjectsController.getSubjectById);
app.post('/subjects', isAdmin, validateCreateSubject, subjectsController.createSubject);
app.put('/subjects/:id', isAdmin, validateIdNumber, validateUpdateSubject, subjectsController.updateSubject);
app.delete('/subjects/:id', isAdmin, validateIdNumber, subjectsController.removeSubject);

/**
  * Teachers endpoints
  * */
app.get('/teachers', teachersController.getAllTeachers);
app.get('/teachers/:id', validateIdNumber, teachersController.getTeacherById);
app.post('/teachers', isAdmin, validateCreateTeacher, teachersController.createTeacher);
app.put('/teachers/:id', isAdmin, validateIdNumber, validateUpdateTeacher, teachersController.updateTeacher);
app.delete('/teachers/:id', isAdmin, validateIdNumber, teachersController.removeTeacher);

/**
  * Rooms endpoints
  * */
app.get('/rooms', roomsController.getAllRooms);
app.get('/rooms/:id', validateIdNumber, roomsController.getRoomById);
app.post('/rooms', isAdmin, validateCreateRoom, roomsController.createRoom);
app.put('/rooms/:id', isAdmin, validateIdNumber, validateUpdateRoom, roomsController.updateRoom);
app.delete('/rooms/:id', isAdmin, validateIdNumber, roomsController.removeRoom);

/**
  * Lessons endpoints
  * */
app.get('/lessons', lessonsController.getAllLessons);
app.get('/lessons/:id', validateIdNumber, lessonsController.getLessonById);
app.get('/lessons/course/:id', validateIdNumber, lessonsController.getLessonsByCourseId);
app.get('/lessons/subject/:id', validateIdNumber, lessonsController.getLessonsBySubjectId);
app.get('/lessons/teacher/:id', validateIdNumber, lessonsController.getLessonsByTeacherId);
app.get('/lessons/room/:id', validateIdNumber, lessonsController.getLessonsByRoomId);
app.post('/lessons', isAdmin, validateCreateLesson, lessonsController.createLesson);
app.put('/lessons/:id', isAdmin, validateIdNumber, validateUpdateLesson, lessonsController.updateLesson);
app.delete('/lessons/:id', isAdmin, validateIdNumber, lessonsController.removeLesson);

export default app;
