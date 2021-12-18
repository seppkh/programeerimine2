/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const validateCreateLesson = (req: Request, res: Response, next: NextFunction) => {
  // createdBy väärtus on sisseloginud kasutaja id, mis on salvestatud res.locals.user.id alla:
  req.body.createdBy = res.locals.user.id;

  const {
    startTime, endTime, duration, courseId, subjectId, teacherId, roomId,
  } = req.body;

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: 'Start time is required',
    });
  }
  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: 'End time is required',
    });
  }
  if (!duration) {
    return res.status(responseCodes.badRequest).json({
      error: 'Duration is required',
    });
  }
  if (!courseId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Course ID is required',
    });
  }
  if (!subjectId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject ID is required',
    });
  }
  if (!teacherId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Teacher ID is required',
    });
  }
  if (!roomId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Room ID is required',
    });
  }
  const { comment } = req.body;

  if (!comment) req.body.comment = null;

  return next();
};

const validateUpdateLesson = (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: `Id ${id} is not valid`,
    });
  }

  const {
    startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
  } = req.body;

  if (!startTime && !endTime && !duration && !courseId && !subjectId && !teacherId && !roomId && !comment) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }

  return next();
};

export { validateCreateLesson, validateUpdateLesson };
