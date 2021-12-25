import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';
import { validateEntries } from '../general/validateEntriesMiddleware';

const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  if (firstName === 0
    || lastName === 0
    || email === 0
    || password === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }

  if (Array.isArray(firstName)
    || Array.isArray(lastName)
    || Array.isArray(email)
    || Array.isArray(password)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }

  if (firstName && validateEntries.isEmptyString(firstName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'First name cannot be an empty string',
    });
  }
  if (!firstName) {
    return res.status(responseCodes.badRequest).json({
      error: 'First name is required',
    });
  }
  if (!validateEntries.isOnlyLetters(firstName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'First name can only contain Estonian letters',
    });
  }
  if (lastName && validateEntries.isEmptyString(lastName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Last name cannot be an empty string',
    });
  }
  if (!lastName) {
    return res.status(responseCodes.badRequest).json({
      error: 'Last name is required',
    });
  }
  if (!validateEntries.isOnlyLetters(lastName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Last name can only contain Estonian letters',
    });
  }
  if (!email) {
    return res.status(responseCodes.badRequest).json({
      error: 'Email is required',
    });
  }
  if (!validateEntries.isEmail(email)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Incorrect email',
    });
  }
  if (!password) {
    return res.status(responseCodes.badRequest).json({
      error: 'Password is required',
    });
  }
  if (!validateEntries.isAtLeastFourDigits(password)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Password must have at least 4 digits',
    });
  }

  return next();
};

const validateUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);

  const item = await usersService.getUserById(id);
  if (!item || item.length === 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id ${id}`,
    });
  }

  req.body.id = id;

  const {
    firstName, lastName, email, password, role,
  } = req.body;

  if (firstName === 0
    || lastName === 0
    || email === 0
    || password === 0
    || role === 0) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be 0',
    });
  }

  if (Array.isArray(firstName)
    || Array.isArray(lastName)
    || Array.isArray(email)
    || Array.isArray(password)
    || Array.isArray(role)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Inserted value(s) cannot be an array',
    });
  }

  if (!firstName && !lastName && !email && !password && !role) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  if (firstName && validateEntries.isEmptyString(firstName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'First name cannot be an empty string',
    });
  }
  if (firstName && !validateEntries.isOnlyLetters(firstName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'First name can only contain Estonian letters',
    });
  }
  if (lastName && validateEntries.isEmptyString(lastName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Last name cannot be an empty string',
    });
  }
  if (lastName && !validateEntries.isOnlyLetters(lastName)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Last name can only contain Estonian letters',
    });
  }
  if (email && !validateEntries.isEmail(email)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Incorrect email',
    });
  }
  if (password && !validateEntries.isAtLeastFourDigits(password)) {
    return res.status(responseCodes.badRequest).json({
      error: 'Password must have at least 4 digits',
    });
  }
  if (role && !(role === 'Admin' || role === 'User')) {
    return res.status(responseCodes.badRequest).json({
      error: 'Invalid role entered',
    });
  }

  return next();
};

export { validateCreateUser, validateUpdateUser };
