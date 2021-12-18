import { RowDataPacket } from 'mysql2';

interface iNewTeacher {
  name: string,
  createdBy: number,
}

interface dbTeacher extends iNewTeacher {
  id: number;
}

interface iTeacher extends iNewTeacher, RowDataPacket {
  id: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;
}

interface iUpdateTeacher {
  id: number,
  name: string,
}

export {
  iNewTeacher, dbTeacher, iTeacher, iUpdateTeacher,
};
