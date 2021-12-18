/* eslint-disable max-len */
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { iLesson, iNewLesson, iUpdateLesson } from './interface';
import pool from '../../database';

const lessonsService = {
  getAllLessons: async (): Promise<iLesson[] | false> => {
    try {
      const [lessons]: [iLesson[], FieldPacket[]] = await pool.query(`SELECT T1.id, T1.startTime, T1.endTime, T1.duration,
      courses.name as course,
      subjects.name as subject,
      teachers.name as teacher,
      rooms.name as room,
      T1.comment,
      T1.dateCreated,
      T1.dateUpdated,
      T1.dateDeleted, 
      users.email AS createdBy
      FROM lessons T1
      JOIN users ON users.id = T1.createdBy
      JOIN courses ON courses.id = T1.courseId
      JOIN subjects ON subjects.id = T1.subjectId
      JOIN teachers ON teachers.id = T1.teacherId
      JOIN rooms ON rooms.id = T1.roomId
      WHERE 
      T1.dateDeleted IS NULL;`);
      console.log(lessons);
      return lessons;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getLessonById: async (id: number): Promise<iLesson[] | string | false> => {
    try {
      const [lesson]: [iLesson[], FieldPacket[]] = await pool.query(`SELECT T1.id, T1.startTime, T1.endTime, T1.duration,
      courses.name as course,
      subjects.name as subject,
      teachers.name as teacher,
      rooms.name as room,
      T1.comment,
      T1.dateCreated,
      T1.dateUpdated,
      T1.dateDeleted, 
      users.email AS createdBy
      FROM lessons T1
      JOIN users ON users.id = T1.createdBy
      JOIN courses ON courses.id = T1.courseId
      JOIN subjects ON subjects.id = T1.subjectId
      JOIN teachers ON teachers.id = T1.teacherId
      JOIN rooms ON rooms.id = T1.roomId
      WHERE T1.id = ?
      AND T1.dateDeleted IS NULL
      LIMIT 1;`, [id]);
      console.log(lesson);
      if (lesson.length === 0) return 'Item is not available';
      return lesson;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createLesson: async (lesson: iNewLesson): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO lessons SET ?, dateCreated = ?', [lesson, new Date()]);
      console.log(result.insertId);

      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateLesson: async (lesson: iUpdateLesson): Promise<boolean> => {
    try {
      await pool.query('UPDATE lessons SET ?, dateUpdated = ? WHERE id = ?', [lesson, new Date(), lesson.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeLesson: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE lessons SET dateUpdated = ?, dateDeleted = ? WHERE id = ?', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default lessonsService;
