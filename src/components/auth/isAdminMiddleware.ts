/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  /*
  const role = res.locals.user.role;
  // res.locals.user = { id: 1, role: 'Admin', iat: 1638026585, exp: 1638030185 }
  if (role !== 'Admin') return false;
  */

  const { user } = res.locals;
  if (user.role !== 'Admin') {
    return res.status(responseCodes.notAuthorized).json({
      error: 'You have to be admin for this operation',
    });
  }

  return next();
};

export default isAdmin;
