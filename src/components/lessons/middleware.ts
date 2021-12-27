/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import { validateEntries } from '../general/validateEntriesMiddleware';
import lessonsService from './service';

const validateCreateLesson = async (req: Request, res: Response, next: NextFunction) => {
  // createdBy väärtus on sisseloginud kasutaja id, mis on salvestatud res.locals.user.id alla:
  req.body.createdBy = res.locals.user.id;

  const {
    startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
  } = req.body;

  if (startTime === 0
    || endTime === 0
    || duration === 0
    || courseId === 0
    || subjectId === 0
    || teacherId === 0
    || roomId === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }

  if (Array.isArray(startTime)
    || Array.isArray(endTime)
    || Array.isArray(comment)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: 'Start time is required',
    });
  }
  if (!validateEntries.isDate(startTime)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Start time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS',
    });
  }
  if (startTime && validateEntries.isDate(startTime)) {
    req.body.startTime = validateEntries.convertToIsoDate(startTime);
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: 'End time is required',
    });
  }
  if (!validateEntries.isDate(endTime)) {
    return res.status(responseCodes.badRequest).json({
      error: 'End time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS',
    });
  }
  if (endTime && validateEntries.isDate(endTime)) {
    req.body.endTime = validateEntries.convertToIsoDate(endTime);
  }

  // eslint-disable-next-line prefer-template

  if (!duration) {
    return res.status(responseCodes.badRequest).json({
      error: 'Duration is required',
    });
  }
  if (!validateEntries.isPositiveNumber(duration)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Duration must be a positive number',
    });
  }
  if (!courseId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Course ID is required',
    });
  }
  if (!validateEntries.isPositiveNumber(courseId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Course ID must be a positive number',
    });
  }
  if (!subjectId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject ID is required',
    });
  }
  if (!validateEntries.isPositiveNumber(subjectId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject ID must be a positive number',
    });
  }
  if (!teacherId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Teacher ID is required',
    });
  }
  if (!validateEntries.isPositiveNumber(teacherId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Teacher ID must be a positive number',
    });
  }
  if (!roomId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Room ID is required',
    });
  }
  if (!validateEntries.isPositiveNumber(roomId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Room ID must be a positive number',
    });
  }

  if (!comment) req.body.comment = null;

  return next();
};

const validateUpdateLesson = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  const item = await lessonsService.getLessonById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No lesson found with id ${id}`,
    });
  }

  const {
    startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
  } = req.body;

  if (startTime === 0
    || endTime === 0
    || duration === 0
    || courseId === 0
    || subjectId === 0
    || teacherId === 0
    || roomId === 0
    || comment === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }

  if (Array.isArray(startTime)
    || Array.isArray(endTime)
    || Array.isArray(comment)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }

  if (!startTime && !endTime && !duration && !courseId && !subjectId && !teacherId && !roomId && !comment && comment !== null) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }

  if (startTime && !validateEntries.isDate(startTime)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Start time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS',
    });
  }
  if (startTime && validateEntries.isDate(startTime)) {
    req.body.startTime = validateEntries.convertToIsoDate(startTime);
  }

  if (endTime && !validateEntries.isDate(startTime)) {
    return res.status(responseCodes.badRequest).json({
      error: 'End time is incorrect, recommended format is YYYY-MM-DD HH:MM:SS',
    });
  }
  if (endTime && validateEntries.isDate(endTime)) {
    req.body.endTime = validateEntries.convertToIsoDate(endTime);
  }

  if (duration && !validateEntries.isPositiveNumber(duration)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Duration must be a positive number',
    });
  }
  if (courseId && !validateEntries.isPositiveNumber(courseId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Course ID must be a positive number',
    });
  }
  if (subjectId && !validateEntries.isPositiveNumber(subjectId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject ID must be a positive number',
    });
  }
  if (teacherId && !validateEntries.isPositiveNumber(teacherId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Teacher ID must be a positive number',
    });
  }
  if (roomId && !validateEntries.isPositiveNumber(roomId)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Room ID must be a positive number',
    });
  }

  return next();
};

export { validateCreateLesson, validateUpdateLesson };
