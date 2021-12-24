/* eslint-disable max-len */
import { Response, Request } from 'express';
import lessonsService from './service';
import responseCodes from '../general/responseCodes';
import { iNewLesson, iUpdateLesson } from './interface';
import { validateEntries } from '../general/validateEntriesMiddleware';

const lessonsController = {
  getAllLessons: async (req: Request, res: Response) => {
    const lessons = await lessonsService.getAllLessons();
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const lesson = await lessonsService.getLessonById(id);
    if (!lesson || lesson.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lesson found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      lesson,
    });
  },
  getLessonsByCourseId: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const lessons = await lessonsService.getLessonsByCourseId(id);
    if (!lessons || lessons.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lessons found with Course Id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonsBySubjectId: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const lessons = await lessonsService.getLessonsBySubjectId(id);
    if (!lessons || lessons.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lessons found with Subject Id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonsByTeacherId: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const lessons = await lessonsService.getLessonsByTeacherId(id);
    if (!lessons || lessons.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lessons found with Teacher Id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      lessons,
    });
  },
  getLessonsByRoomId: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const lessons = await lessonsService.getLessonsByRoomId(id);
    if (!lessons || lessons.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lessons found with Room Id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      lessons,
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

    if (startTime) lesson.startTime = validateEntries.convertToIsoDate(startTime);
    if (endTime) lesson.endTime = validateEntries.convertToIsoDate(endTime);
    if (duration) lesson.duration = duration;
    if (courseId) lesson.courseId = courseId;
    if (subjectId) lesson.subjectId = subjectId;
    if (teacherId) lesson.teacherId = teacherId;
    if (roomId) lesson.roomId = roomId;
    if (comment || comment === null) lesson.comment = comment;

    const result = await lessonsService.updateLesson(lesson);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
  removeLesson: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const item = await lessonsService.getLessonById(id);
    if (!item || item.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No lesson found with id ${id}`,
      });
    }
    const result = await lessonsService.removeLesson(id);
    return res.status(responseCodes.ok).json({
      result,
    });
  },

};

export default lessonsController;
