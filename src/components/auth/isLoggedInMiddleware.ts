/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from 'express';
import responseCodes from '../general/responseCodes';
import jwtService from '../general/services/jwtService';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  // võtab tokeni, saadab jwt verifysse, saab kinnituse kas token on valiidne ehk kas on sisse logitud
  const token = await req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'No token provided',
    });
  }
  /**
   * Verify if token is valid. Verify function returns the payload, so save the return value as payload var
   */
  const payload = await jwtService.verify(token);
  // console.log(payload);
  if (!payload) {
    return res.status(responseCodes.notAuthorized).json({
      error: 'Invalid token',
    });
  }
  /**
   * Salvesta payloadi info res.locals sisse, mille infot loevad kõik järgmised controllerid ja teenused
   */
  res.locals.user = payload;

  return next();
};

export default isLoggedIn;
