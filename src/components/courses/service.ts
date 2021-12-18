import { FieldPacket, ResultSetHeader } from 'mysql2';
import { iNewCourse, iCourse, iUpdateCourse } from './interface';
import pool from '../../database';

const coursesService = {
  getAllCourses: async (): Promise<iCourse[] | false> => {
    try {
      const [courses]: [iCourse[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM courses T1 JOIN users ON users.id = T1.createdBy WHERE T1.dateDeleted IS NULL;');
      console.log(courses);
      return courses;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getCourseById: async (id: number): Promise<iCourse[] | string | false> => {
    try {
      const [course]: [iCourse[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM courses T1 JOIN users ON users.id = T1.createdBy WHERE T1.id = ? AND T1.dateDeleted IS NULL LIMIT 1;', [id]);
      console.log(course);
      if (course.length === 0) return 'Item is not available';
      return course;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createCourse: async (course: iNewCourse): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO courses SET name = ?, createdBy = ?, dateCreated = ?', [course.name, course.createdBy, new Date()]);
      console.log(result.insertId);

      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateCourse: async (course: iUpdateCourse): Promise<boolean> => {
    try {
      await pool.query('UPDATE courses SET name = ?, dateUpdated = ? WHERE id = ?', [course.name, new Date(), course.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeCourse: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE courses SET dateUpdated = ?, dateDeleted = ? WHERE id = ?', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default coursesService;
