// const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

//@ts-ignore
export const checkAuth = (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    //req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Error('Authentication failed!');
    return next(error);
  }
};