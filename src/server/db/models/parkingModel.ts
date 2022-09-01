import {Schema, model} from "mongoose";
import { Parking } from "src/server/interface";

const ParkingSchema = new Schema<Parking>({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    carModel: { type: String, required: true },
    carColor: { type: String, required: true },
    expireAt: { type: Date },
    localTime: {type: String},
    licensePlate: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    username: {type: String, required: true}
  });
  
  ParkingSchema.index({expireAt: 1}, {expireAfterSeconds: 0})

  export const ParkingModel = model("Parking", ParkingSchema);