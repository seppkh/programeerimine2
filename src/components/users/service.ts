/* eslint-disable max-len */
import { FieldPacket, ResultSetHeader } from 'mysql2';
// import db from '../../db';
import hashService from '../general/services/hashService';
import {
  iUser, iNewUser, iUpdateUser,
} from './interface';
import pool from '../../database';

const usersService = {
  getAllUsers: async (): Promise<iUser[] | false> => {
    try {
      const [users]: [iUser[], FieldPacket[]] = await pool.query('SELECT id, firstName, lastName, email, dateCreated, dateUpdated, dateDeleted, role FROM users WHERE dateDeleted IS NULL');
      return users;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getUserById: async (id: number): Promise<iUser[] | string | false> => {
    try {
      const [user]: [iUser[], FieldPacket[]] = await pool.query('SELECT id, firstName, lastName, email, dateCreated, dateUpdated, dateDeleted, role FROM users WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id]);
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getUserByEmail: async (email: string) => {
    try {
      const [user]: [iUser[], FieldPacket[]] = await pool.query('SELECT * FROM users WHERE email = ? AND dateDeleted IS NULL LIMIT 1', [email]);
      return user[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createUser: async (newUser: iNewUser): Promise<number | string | false> => {
    try {
      const hashedPassword = await hashService.hash(newUser.password);
      const user = {
        ...newUser,
        password: hashedPassword,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO users SET ?, dateCreated = ?', [user, new Date()]);

      return result.insertId;
    } catch (error: any) {
      console.log(error);
      if (error.sqlMessage.includes('Duplicate entry')) {
        return `Failed to create user with email ${newUser.email}`;
      }
      return false;
    }
  },
  updateUser: async (user: iUpdateUser): Promise<string | boolean> => {
    try {
      const userToUpdate = {
        ...user,
      };
      if (user.password) {
        userToUpdate.password = await hashService.hash(user.password);
      }

      const dateUpdated = new Date();
      await pool.query('UPDATE users SET ?, dateUpdated = ? WHERE id = ? AND dateDeleted IS NULL', [userToUpdate, dateUpdated, user.id]);

      return true;
    } catch (error: any) {
      console.log(error);
      if (error.sqlMessage.includes('Duplicate entry')) {
        return `Failed to update user with email ${user.email}`;
      }
      return false;
    }
  },
  removeUser: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE users SET dateUpdated = ?, dateDeleted = ? WHERE id = ? AND dateDeleted IS NULL', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default usersService;
