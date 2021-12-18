import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
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

  return next();
};

const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: `Id ${id} is not valid`,
    });
  }
  req.body.id = id;

  const {
    firstName, lastName, email, password, role,
  } = req.body;
  if (!firstName && !lastName && !email && !password && !role) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }

  return next();
};

export { validateCreateUser, validateUpdateUser };
