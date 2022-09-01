import { Router, Request, Response } from 'express';
import { authenticateUser, createUser } from '../db/mongo';
const jwt = require("jsonwebtoken");

export const userRoute = Router();

//@ts-ignore
userRoute.post("/login", (req: Request, res: Response) => {
    authenticateUser(req.body.username, req.body.password)
    .then((user: any) => {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );
      res.json({
        userId: user._id,
        username: user.username,
        token: token
      })
    })
    .catch((response) => res.json({response: response}));
  })
  
  //@ts-ignore
  userRoute.post("/signup", (req: Request, res: Response) => {
    createUser(req.body.username, req.body.password).catch(() => console.log("user already exists!"));
  })