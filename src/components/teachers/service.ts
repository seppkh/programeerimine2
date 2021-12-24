import { FieldPacket, ResultSetHeader } from 'mysql2';
import { iNewTeacher, iTeacher, iUpdateTeacher } from './interface';
import pool from '../../database';

const teachersService = {
  getAllTeachers: async (): Promise<iTeacher[] | false> => {
    try {
      const [teachers]: [iTeacher[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM teachers T1 JOIN users ON users.id = T1.createdBy WHERE T1.dateDeleted IS NULL;');
      return teachers;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getTeacherById: async (id: number): Promise<iTeacher[] | string | false> => {
    try {
      const [teacher]: [iTeacher[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM teachers T1 JOIN users ON users.id = T1.createdBy WHERE T1.id = ? AND T1.dateDeleted IS NULL LIMIT 1;', [id]);
      return teacher;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createTeacher: async (teacher: iNewTeacher): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO teachers SET name = ?, createdBy = ?, dateCreated = ?', [teacher.name, teacher.createdBy, new Date()]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateTeacher: async (teacher: iUpdateTeacher): Promise<boolean> => {
    try {
      await pool.query('UPDATE teachers SET name = ?, dateUpdated = ? WHERE id = ?', [teacher.name, new Date(), teacher.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeTeacher: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE teachers SET dateUpdated = ?, dateDeleted = ? WHERE id = ?', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default teachersService;
