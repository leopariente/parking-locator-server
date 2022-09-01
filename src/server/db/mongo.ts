import { connect } from "mongoose";
import { Parking } from "../interface";
import { ParkingModel } from "./models/parkingModel";
import { UserModel } from "./models/userModel";

connect(
  `mongodb+srv://Cyber4s:ilovecode@cluster0.pluyv.mongodb.net/parking?retryWrites=true&w=majority`
).catch((err) => console.log(err));


function addMinutes(numOfMinutes: any, date = new Date()) {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

export async function addParking(parking: Parking) {
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
    username: parking.username
  });
  parkingDocument.save();
}

export async function deleteParking(parkingId: string, username: {type: String, required: true}) {
  const parkToDelete = await ParkingModel.findOne({ _id: parkingId }) as Parking;
  if(parkToDelete.username === username) {
  await ParkingModel.deleteOne({ _id: parkingId });
  } else {
    throw new Error("this is not your parking!")
  }
}

export async function getAllParkings() {
  return await ParkingModel.find();
}

export async function createUser(username: string, password: string) {
  const newUser = new UserModel({
    username: username,
    password: password,
  });

  // save user to database
  newUser.save(function (err) {
    if (err) throw err;
  });
}

export async function authenticateUser(username: string, password: string) {
  // fetch user and test password verification
  return await new Promise((res, rej) => {
    UserModel.findOne({ username: username }, function (err: any, user: any) {
      if (err) rej(err);
      if (!user) rej("username or password inncorrect!") 
      else {
        // test a matching password
        user.comparePassword(password, function (err: any, isMatch: any) {
          if (err) rej(err);
          console.log(password, isMatch); // -> Password: true/false
          if (isMatch) {
          res(user);
          } else rej("username or password inncorrect!");
        });
      }
    });
  });
}
