import { Router, Request, Response } from 'express';
import { addParking, getAllParkings, deleteParking } from '../db/mongo';
// import { checkAuth } from './checkAuth';

export const parkingRoute = Router();

// app.use(checkAuth);
//@ts-ignore
parkingRoute.post("/park", (req: Request, res: Response) => {
    addParking(req.body).then(() => res.send("added successfully!"));
  })
  
  parkingRoute.delete("/park", (req: Request, res: Response) => {
    const id = req.body.id
    deleteParking(id).then(() => res.send("deleted successfully"))
  })
  
  //@ts-ignore
  parkingRoute.get("/park", (req: Request, res: Response) => {
    getAllParkings().then(documents => res.send(documents))
  })
  