import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { NewUser, UpdateUser } from './interface';
import usersService from './service';

const usersController = {
  getAllUsers: (req: Request, res: Response) => {
    // console.log(req.headers);
    // console.log('User:', res.locals.user);
    const users = usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: `Id ${id} is not valid`,
      });
    }
    if ((id !== res.locals.user.id) && (res.locals.user.role !== 'Admin')) {
      return res.status(responseCodes.notAuthorized).json({
        error: 'You have no permission for this information',
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
  createUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
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
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: 'Password is required',
      });
    }
    const newUser: NewUser = {
      firstName,
      lastName,
      email,
      password,
      role: 'User',
    };
    const id = await usersService.createUser(newUser);
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
    const {
      firstName, lastName, email, password, role,
    } = req.body;
    if (!firstName && !lastName && email ! && password ! && role !) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const updateUser: UpdateUser = {
      id, firstName, lastName, email, password, role,
    };
    usersService.updateUser(updateUser);
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
