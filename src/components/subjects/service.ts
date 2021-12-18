import { FieldPacket, ResultSetHeader } from 'mysql2';
import { iNewSubject, iSubject, iUpdateSubject } from './interface';
import pool from '../../database';

const subjectsService = {
  getAllSubjects: async (): Promise<iSubject[] | false> => {
    try {
      const [subjects]: [iSubject[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.EAP, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM subjects T1 JOIN users ON users.id = T1.createdBy WHERE T1.dateDeleted IS NULL;');
      console.log(subjects);
      return subjects;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getSubjectById: async (id: number): Promise<iSubject[] | false> => {
    try {
      const [subject]: [iSubject[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.EAP, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM subjects T1 JOIN users ON users.id = T1.createdBy WHERE T1.id = ? AND T1.dateDeleted IS NULL LIMIT 1;', [id]);
      console.log(subject);
      if (subject.length === 0) return false;
      return subject;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createSubject: async (subject: iNewSubject): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO subjects SET ?, dateCreated = ?', [subject, new Date()]);
      console.log(result.insertId);

      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateSubject: async (subject: iUpdateSubject): Promise<boolean> => {
    try {
      await pool.query('UPDATE subjects SET ?, dateUpdated = ? WHERE id = ?', [subject, new Date(), subject.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeSubject: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE subjects SET dateUpdated = ?, dateDeleted = ? WHERE id = ?', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default subjectsService;
