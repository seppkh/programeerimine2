import { RowDataPacket } from 'mysql2';

interface iNewSubject {
  name: string,
  EAP: number,
  createdBy: number,
}

interface dbSubject extends iNewSubject {
  id: number;

}
interface iSubject extends iNewSubject, RowDataPacket {
  id: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;
}

interface iUpdateSubject {
  id: number,
  name: string,
  EAP: number,
}

export {
  iNewSubject, dbSubject, iSubject, iUpdateSubject,
};
