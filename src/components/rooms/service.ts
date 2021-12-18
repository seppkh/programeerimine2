import { FieldPacket, ResultSetHeader } from 'mysql2';
import { iNewRoom, iRoom, iUpdateRoom } from './interface';
import pool from '../../database';

const roomsService = {
  getAllRooms: async (): Promise<iRoom[] | false> => {
    try {
      const [rooms]: [iRoom[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM rooms T1 JOIN users ON users.id = T1.createdBy WHERE T1.dateDeleted IS NULL;');
      console.log(rooms);
      return rooms;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getRoomById: async (id: number): Promise<iRoom[] | string | false> => {
    try {
      const [room]: [iRoom[], FieldPacket[]] = await pool.query('SELECT T1.id, T1.name, T1.dateCreated, T1.dateUpdated, T1.dateDeleted, users.email AS createdBy FROM rooms T1 JOIN users ON users.id = T1.createdBy WHERE T1.id = ? AND T1.dateDeleted IS NULL LIMIT 1;', [id]);
      console.log(room);
      if (room.length === 0) return 'Item is not available';
      return room;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createRoom: async (room: iNewRoom): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO rooms SET name = ?, createdBy = ?, dateCreated = ?', [room.name, room.createdBy, new Date()]);
      console.log(result.insertId);

      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateRoom: async (room: iUpdateRoom): Promise<boolean> => {
    try {
      await pool.query('UPDATE rooms SET name = ?, dateUpdated = ? WHERE id = ?', [room.name, new Date(), room.id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeRoom: async (id: number): Promise<boolean> => {
    try {
      const dateUpdated = new Date();
      const dateDeleted = new Date();
      await pool.query('UPDATE rooms SET dateUpdated = ?, dateDeleted = ? WHERE id = ?', [dateUpdated, dateDeleted, id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default roomsService;
