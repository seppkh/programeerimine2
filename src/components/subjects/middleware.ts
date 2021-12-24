import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import { validateEntries } from '../general/validateEntriesMiddleware';
import subjectsService from './service';

const validateCreateSubject = async (req: Request, res: Response, next: NextFunction) => {
  const { name, EAP } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name is required',
    });
  }
  if (Array.isArray(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }
  if (validateEntries.isEmptyString(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name cannot be an empty string',
    });
  }
  if (!validateEntries.isOnlyLettersAndNumber(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters and numbers',
    });
  }
  if (EAP === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }
  if (!EAP) {
    return res.status(responseCodes.badRequest).json({
      error: 'EAP is required',
    });
  }
  if (!validateEntries.isPositiveNumber(EAP)) {
    return res.status(responseCodes.badRequest).json({
      error: 'EAP must be a positive number',
    });
  }

  return next();
};

const validateUpdateSubject = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  const item = await subjectsService.getSubjectById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No subject found with id ${id}`,
    });
  }

  const { name, EAP } = req.body;

  if (EAP === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }
  if (name && Array.isArray(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }
  if (!name && !EAP) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  if (name && validateEntries.isEmptyString(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name cannot be an empty string',
    });
  }
  if (name && !validateEntries.isOnlyLettersAndNumber(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters and numbers',
    });
  }
  if (EAP && !validateEntries.isPositiveNumber(EAP)) {
    return res.status(responseCodes.badRequest).json({
      error: 'EAP must be a positive number',
    });
  }

  return next();
};

export { validateCreateSubject, validateUpdateSubject };
