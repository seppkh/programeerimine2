import { RowDataPacket } from 'mysql2';

interface iNewRoom {
  name: string,
  createdBy: number,
}

interface dbRoom extends iNewRoom {
  id: number;

}
interface iRoom extends iNewRoom, RowDataPacket {
  id: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date | null;
}

interface iUpdateRoom {
  id: number,
  name: string,
}

export {
  iNewRoom, dbRoom, iRoom, iUpdateRoom,
};
