import { Router, Request, Response } from "express";
import { addParking, getAllParkings, deleteParking } from "../db/mongo";
import { checkAuth } from "../checkAuth";

export const parkingRoute = Router();

//@ts-ignore
parkingRoute.get("/park", (req: Request, res: Response) => {
  getAllParkings().then((documents) => res.send(documents));
});

parkingRoute.use(checkAuth);
//@ts-ignore
parkingRoute.post("/park", (req: Request, res: Response) => {
  console.log(req.body);
  addParking(req.body).then(() => res.send("added successfully!"));
});

parkingRoute.delete("/park", (req: Request, res: Response) => {
  const id = req.body.id;
  console.log(req.body.username);
  const username = req.body.username
  deleteParking(id, username).then(() => res.send("deleted successfully"));
});
