import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const validateCreateLesson = (req: Request, res: Response, next: NextFunction) => {
  const {
    startTime, endTime, duration, courseId, subjectId, teacherId, roomId,
  } = req.body;

  // createdBy väärtus on sisseloginud kasutaja id, mis on salvestatud res.locals.user.id alla:
  req.body.createdBy = res.locals.user.id;

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
      error: 'Course id is required',
    });
  }
  if (!subjectId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Subject id is required',
    });
  }
  if (!teacherId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Teacher id is required',
    });
  }
  if (!roomId) {
    return res.status(responseCodes.badRequest).json({
      error: 'Room id is required',
    });
  }
  const { comment } = req.body;

  if (!comment) req.body.comment = null;

  return next();
};

export default validateCreateLesson;
