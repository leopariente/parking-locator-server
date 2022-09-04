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
  addParking(req.body)
  .then(() => res.send("added successfully!"))
  .catch(() => res.send("Car model, Car Color and minutes to leave are mandatory!"));
});

parkingRoute.delete("/park", (req: Request, res: Response) => {
  const id = req.body.id;
  console.log(req.body.username);
  const username = req.body.username;
  deleteParking(id, username).then(() => res.send("deleted successfully"));
});
