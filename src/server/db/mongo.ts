import { connect } from "mongoose";
import { Parking } from "../interface";
import { ParkingModel } from "./models/parkingModel";

connect(
  `mongodb+srv://Cyber4s:ilovecode@cluster0.pluyv.mongodb.net/parking?retryWrites=true&w=majority`
).catch((err) => console.log(err));


function addMinutes(numOfMinutes: any, date = new Date()) {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

export function addParking(parking: Parking) {
  const expireAt = addMinutes(parking.minutesToLeave!);
  const parkingDocument = new ParkingModel({
    lat: parking.lat,
    lon: parking.lon,
    carModel: parking.carModel,
    carColor: parking.carColor,
    expireAt: expireAt,
    localTime: expireAt.toLocaleTimeString(),
    licensePlate: parking.licensePlate,
    phoneNumber: parking.phoneNumber,
  });
  parkingDocument.save();
}

export async function deleteParking(parkingId: string) {
  await ParkingModel.deleteOne({ _id: parkingId });
}

export async function getAllParkings() {
  return await ParkingModel.find();
}

