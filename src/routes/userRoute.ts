import { Router, Request, Response } from 'express';
import { checkAuth } from '../checkAuth';
import {
  authenticateUser,
  createUser,
  editPreferences,
  getPreferences,
} from '../db/mongo';
const jwt = require('jsonwebtoken');
require('dotenv').config();

// User routes, CRUD requests related to user, login, signup, get and edit user preferences
export const userRoute = Router();

// @ts-ignore
userRoute.post('/login', (req: Request, res: Response, next) => {
  authenticateUser(req.body.username, req.body.password)
    .then((user: any) => {
      // create json web token and send it to user
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.json({
        userId: user._id,
        username: user.username,
        preferences: user.preferences,
        token: token,
      });
    })
    .catch((response) => res.json({ error: response }));
});

// @ts-ignore
userRoute.post('/signup', (req: Request, res: Response) => {
  createUser(req.body.username, req.body.password)
    .then((user: any) => {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.json({
        userId: user._id,
        username: user.username,
        preferences: user.preferences,
        token: token,
      });
    })
    .catch((response) => {
      res.json({ error: response });
    });
});

// @ts-ignore
userRoute.put('/preferences', checkAuth, (req: Request, res: Response) => {
  editPreferences(req.body.username, req.body.preferences).then((response) => res.send(response)
  );
});

userRoute.get('/preferences', checkAuth, (req: Request, res: Response) => {
  getPreferences(req.body.username).then((response: any) => {
    res.send(response);
  });
});
