import { Request, Response, NextFunction } from 'express';
import responseCodes from './responseCodes';

function isInt(value: any) {
  return !Number.isNaN(value)
          && parseInt(value, 10) === value
          && !Number.isNaN(parseInt(value, 10));
}

const validateIdNumber = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  let result = false;

  if (isInt(id)) result = true;

  if (!result) {
    return res.status(responseCodes.badRequest).json({
      error: 'Id must be a number',
    });
  }
  if (id < 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Id must be a positive number',
    });
  }

  return next();
};

export default validateIdNumber;
