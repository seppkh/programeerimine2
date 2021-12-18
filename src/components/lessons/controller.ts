/* eslint-disable max-len */
import { Response, Request } from 'express';
import lessonsService from './service';
import responseCodes from '../general/responseCodes';
import { iNewLesson, iUpdateLesson } from './interface';

const lessonsController = {
  getAllLessons: async (req: Request, res: Response) => {
    const lessons = await lessonsService.getAllLessons();
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const lesson = await lessonsService.getLessonById(id);
    return res.status(responseCodes.ok).json({
      lesson,
    });
  },
  createLesson: async (req: Request, res: Response) => {
    const {
      startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment, createdBy,
    } = req.body;

    const newLesson: iNewLesson = {
      startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment, createdBy,
    };
    const id = await lessonsService.createLesson(newLesson);

    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateLesson: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const {
      startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
    } = req.body;

    const lesson: iUpdateLesson = {
      id,
    };

    if (startTime) lesson.startTime = startTime;
    if (endTime) lesson.endTime = endTime;
    if (duration) lesson.duration = duration;
    if (courseId) lesson.courseId = courseId;
    if (subjectId) lesson.subjectId = subjectId;
    if (teacherId) lesson.teacherId = teacherId;
    if (roomId) lesson.roomId = roomId;
    if (comment) lesson.comment = comment;

    await lessonsService.updateLesson(lesson);
    return res.status(responseCodes.ok).json({
    });
  },
  removeLesson: async (req: Request, res: Response) => {
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
    await lessonsService.removeLesson(id);
    return res.status(responseCodes.noContent).json({
    });
  },

};

export default lessonsController;
