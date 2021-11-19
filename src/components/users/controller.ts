import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';

const usersController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: (req: Request, res: Response) => {
    // console.log(req.params);
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id ${id}`,
      });
    }
    return res.status(responseCodes.ok).json({
      user,
    });
  },
  createUser: (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    const id = usersService.createUser(firstName, lastName);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const { firstName, lastName } = req.body;
    if (!firstName && !lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    usersService.updateUser(id, firstName, lastName);
    return res.status(responseCodes.noContent).json({
    });
  },
  removeUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `Course not found with id ${id}`,
      });
    }
    usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default usersController;
