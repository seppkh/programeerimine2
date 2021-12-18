import { RowDataPacket } from 'mysql2';

interface iNewCourse {
  name: string,
  createdBy: number,
}

interface dbCourse extends iNewCourse {
  id: number;

}
interface iCourse extends iNewCourse, RowDataPacket {
  id: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;
}

interface iUpdateCourse {
  id: number,
  name: string,
}

export {
  iNewCourse, dbCourse, iCourse, iUpdateCourse,
};
