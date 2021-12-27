/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const validateLoginInput = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

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

  return next();
};

export default validateLoginInput;
