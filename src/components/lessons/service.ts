/* eslint-disable max-len */
import db from '../../db';
import { Lesson, NewLesson, UpdateLesson } from './interface';

const lessonsService = {
  getAllLessons: (): Lesson[] => {
    const { lessons } = db;
    return lessons;
  },
  getLessonById: (id: number): Lesson | undefined => {
    const lesson = db.lessons.find((element) => element.id === id);
    return lesson;
  },
  createLesson: (data: NewLesson): number => {
    const {
      createdBy, startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
    } = data;
    const id = db.lessons[db.lessons.length - 1].id + 1;
    db.lessons.push({
      id,
      createdBy,
      startTime,
      endTime,
      duration,
      courseId,
      subjectId,
      teacherId,
      roomId,
      comment,
    });
    return id;
  },
  updateLesson: (data: UpdateLesson): boolean => {
    const {
      id, startTime, endTime, duration, courseId, subjectId, teacherId, roomId, comment,
    } = data;
    const index = db.lessons.findIndex((element) => element.id === id);
    if (startTime) db.lessons[index].startTime = startTime;
    if (endTime) db.lessons[index].endTime = endTime;
    if (duration) db.lessons[index].duration = duration;
    if (courseId) db.lessons[index].courseId = courseId;
    if (subjectId) db.lessons[index].subjectId = subjectId;
    if (teacherId) db.lessons[index].teacherId = teacherId;
    if (roomId) db.lessons[index].roomId = roomId;
    if (comment) db.lessons[index].comment = comment;

    return true;
  },
  removeLesson: (id: number): boolean => {
    const index = db.lessons.findIndex((element) => element.id === id);
    db.lessons.splice(index, 1);
    return true;
  },
};

export default lessonsService;
