/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import loginService from './service';

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await loginService.login(email, password);

    if (!token) {
      return res.status(responseCodes.notAuthorized).json({
        error: 'Invalid credentials',
      });
    }

    return res.status(responseCodes.ok).json({
      token,
    });
  },
};

export default authController;
