import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import roomsService from './service';
import { iNewRoom, iUpdateRoom } from './interface';

const roomsController = {
  getAllRooms: async (req: Request, res: Response) => {
    const rooms = await roomsService.getAllRooms();
    res.status(responseCodes.ok).json({
      rooms,
    });
  },
  getRoomById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const room = await roomsService.getRoomById(id);
    if (!room || room.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      room,
    });
  },
  createRoom: async (req: Request, res: Response) => {
    const { name } = req.body;

    const createdBy = res.locals.user.id;
    const newRoom: iNewRoom = {
      name,
      createdBy,
    };
    const id = await roomsService.createRoom(newRoom);

    if (!id) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { name } = req.body;

    const room: iUpdateRoom = {
      id,
      name,
    };
    const result = await roomsService.updateRoom(room);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
  removeRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const item = await roomsService.getRoomById(id);
    if (!item || item.length === 0) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id ${id}`,
      });
    }
    const result = await roomsService.removeRoom(id);
    return res.status(responseCodes.ok).json({
      result,
    });
  },
};

export default roomsController;
