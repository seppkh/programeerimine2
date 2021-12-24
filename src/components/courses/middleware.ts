/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import { validateEntries } from '../general/validateEntriesMiddleware';
import coursesService from './service';

const validateCreateCourse = async (req: Request, res: Response, next: NextFunction) => {
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
  if (!validateEntries.isOnlyLettersAndNumber(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters',
    });
  }
  return next();
};

const validateUpdateCourse = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  const item = await coursesService.getCourseById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No course found with id ${id}`,
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
  if (!validateEntries.isOnlyLettersAndNumber(name)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Name can only contain Estonian letters',
    });
  }
  return next();
};

export { validateCreateCourse, validateUpdateCourse };
