import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import roomsService from './service';

const roomsController = {
  getAllRooms: (req: Request, res: Response) => {
    const rooms = roomsService.getAllRooms();
    res.status(responseCodes.ok).json({
      rooms,
    });
  },
  getRoomById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const room = roomsService.getRoomById(id);
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      room,
    });
  },
  createRoom: (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      return res.status(responseCodes.badRequest).json({
        error: 'Name is required',
      });
    }
    const id = roomsService.createRoom(name);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateRoom: (req: Request, res: Response) => {
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
    roomsService.updateRoom(id, name);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeRoom: (req: Request, res: Response) => {
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
    roomsService.removeRoom(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default roomsController;
