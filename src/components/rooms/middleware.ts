/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import { validateEntries } from '../general/validateEntriesMiddleware';
import roomsService from './service';

const validateCreateRoom = async (req: Request, res: Response, next: NextFunction) => {
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

const validateUpdateRoom = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  const item = await roomsService.getRoomById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No room found with id ${id}`,
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

export { validateCreateRoom, validateUpdateRoom };
