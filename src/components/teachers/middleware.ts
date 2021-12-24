/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import { validateEntries } from '../general/validateEntriesMiddleware';
import teachersService from './service';

const validateCreateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
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
  if (!validateEntries.isOnlyLetters(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters',
    });
  }
  return next();
};

const validateUpdateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  const item = await teachersService.getTeacherById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No teacher found with id ${id}`,
    });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
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
  if (!validateEntries.isOnlyLetters(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters',
    });
  }
  return next();
};

export { validateCreateTeacher, validateUpdateTeacher };
