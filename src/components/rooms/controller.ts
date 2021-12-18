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
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const room = await roomsService.getRoomById(id);
    if (!room) {
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
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
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
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const room: iUpdateRoom = {
      id,
      name,
    };
    await roomsService.updateRoom(room);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeRoom: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: `Rooms not found with id ${id}`,
      });
    }
    await roomsService.removeRoom(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default roomsController;
