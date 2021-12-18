import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';

const validateCreateSubject = (req: Request, res: Response, next: NextFunction) => {
  const { name, EAP } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name is required',
    });
  }
  if (!EAP) {
    return res.status(responseCodes.badRequest).json({
      error: 'EAP is required',
    });
  }

  return next();
};

const validateUpdateSubject = (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: `Id ${id} is not valid`,
    });
  }
  const { name, EAP } = req.body;
  if (!name && !EAP) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }

  return next();
};

export { validateCreateSubject, validateUpdateSubject };
