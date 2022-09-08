const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
require('dotenv').config();

// Middleware that checks auth of user next function will only run if user is authorized
// @ts-ignore
export const checkAuth = (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // verify token with secret key and pass the username to the request
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.body.username = decodedToken.username;
    next();
  } catch (err) {
    const error = new Error('Authentication failed!');
    return next(error);
  }
};
