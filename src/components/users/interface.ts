import { RowDataPacket } from 'mysql2';

interface iNewUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: 'Admin' | 'User',
}

interface dbUser extends iNewUser {
  id: number;

}

interface iUser extends iNewUser, RowDataPacket {
  id: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;
}

interface iUpdateUser {
  id: number;
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  role?: 'Admin' | 'User';
}

export {
  iUser, dbUser, iNewUser, iUpdateUser,
};
