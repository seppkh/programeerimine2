/* eslint-disable max-len */
import { Response, Request } from 'express';
import lessonsService from './service';
import responseCodes from '../general/responseCodes';

const lessonsController = {
  getAllLessons: (req: Request, res: Response) => {
    const lessons = lessonsService.getAllLessons();
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const lesson = lessonsService.getLessonById(id);
    return res.status(responseCodes.ok).json({
      lesson,
    });
  },
  createLesson: (req: Request, res: Response) => {
    const {
      startTime, endTime, duration, courseId, subjectId, teacherId, roomId,
    } = req.body;
    let { comment } = req.body;

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
    if (!comment) comment = null;

    const id = lessonsService.createLesson({
      startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
    });
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateLesson: (req: Request, res: Response) => {
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
    lessonsService.updateLesson({
      id, startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
    });
    return res.status(responseCodes.ok).json({
    });
  },
  removeLesson: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const lesson = lessonsService.getLessonById(id);
    if (!lesson) {
      return res.status(responseCodes.badRequest).json({
        error: `Lesson not found with id ${id}`,
      });
    }
    lessonsService.removeLesson(id);
    return res.status(responseCodes.noContent).json({
    });
  },

};

export default lessonsController;
