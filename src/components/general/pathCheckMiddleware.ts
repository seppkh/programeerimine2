/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import { Request, Response, NextFunction } from 'express';
import db from '../../db';
import responseCodes from './responseCodes';

const pathCheck = (req: Request, res: Response, next: NextFunction) => {
  const pathArray = req.path.replace('/', '').split('/');

  const dbLocation = [pathArray[0]];
  console.log(dbLocation);
  const dbNesting = db;

  /**
   * Go over db nesting. Right now it check every pathArray element from the same nesting level in db. It should search db.courses -> db.courses.groups -> db.courses.groups.items instead
   */
  for (let i = 0; i < pathArray.length; i++) {
    if (!(dbLocation[i] in dbNesting)) {
      let errorLocation = '';
      for (let j = 0; j < dbLocation.length; j++) {
        errorLocation += `/${dbLocation[j]}`;
      }
      return res.status(responseCodes.badRequest).json({
        error: `${errorLocation} is not a valid endpoint`,
      });
    }
    dbLocation.push(pathArray[i + 1]);
    console.log('PathArray: ', pathArray[i]);
    // dbNesting = `${dbNesting}.${pathArray[i]}`;
    console.log(dbLocation);
  }
  next();
  return true;
};

export default pathCheck;
