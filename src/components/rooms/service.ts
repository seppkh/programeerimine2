import db from '../../db';
import Room from './interface';

const roomsService = {
  getAllRooms: (): Room[] => {
    const { rooms } = db;
    return rooms;
  },
  getRoomById: (id: number): Room | undefined => {
    const room = db.rooms.find((element) => element.id === id);
    return room;
  },
  createRoom: (name: string): number => {
    const id = db.rooms[db.rooms.length - 1].id + 1;
    db.rooms.push({
      id,
      name,
    });
    return id;
  },
  updateRoom: (id: number, name: string): boolean => {
    const index = db.rooms.findIndex((element) => element.id === id);
    db.rooms[index].name = name;
    return true;
  },
  removeRoom: (id: number): boolean => {
    const index = db.rooms.findIndex((element) => element.id === id);
    db.rooms.splice(index, 1);
    return true;
  },
};

export default roomsService;
