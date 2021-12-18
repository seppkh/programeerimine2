import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import { iNewUser, iUpdateUser } from './interface';
import usersService from './service';

const usersController = {
  getAllUsers: async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: async (req: Request, res: Response) => {
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
    const user = await usersService.getUserById(id);
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

    const newUser: iNewUser = {
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
  updateUser: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, password, role,
    } = req.body;
    const isAdmin = (res.locals.user.role === 'Admin');

    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }

    const updateUser: iUpdateUser = {
      id,
    };
    if (firstName) updateUser.firstName = firstName;
    if (lastName) updateUser.lastName = lastName;
    if (email) updateUser.email = email;
    if (password) updateUser.password = password;
    if (role && isAdmin) {
      updateUser.role = (role === 'Admin' ? 'Admin' : 'User');
    }

    const result = await usersService.updateUser(updateUser);

    if (!result) {
      return res.status(responseCodes.serverError).json({});
    }
    return res.status(responseCodes.ok).json({
      result,
    });
  },
  removeUser: async (req: Request, res: Response) => {
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
    await usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({
    });
  },
};

export default usersController;
