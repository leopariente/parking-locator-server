import { connect } from 'mongoose';
import { Parking } from '../interface';
import { ParkingModel } from './models/parkingModel';
import { UserModel } from './models/userModel';
require('dotenv').config();

// Connection to mongo atlas
connect(
  process.env.DATABASE_URL!
).catch((err) => console.log(err));

// Helper function, takes the minutes to leave user input and returns the time of expiration
function addMinutes(numOfMinutes: any, date = new Date()) {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

// Add a parking spot to the database
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
    username: parking.username,
  });
  parkingDocument.save();
}

// Delete a parking spot to the database
export async function deleteParking(
  parkingId: string,
  username: { type: string; required: true }
) {
  const parkToDelete = (await ParkingModel.findOne({
    _id: parkingId,
  })) as Parking;
  // Checks if username from database is the same as the username sending the request
  if (parkToDelete.username === username) {
    await ParkingModel.deleteOne({ _id: parkingId });
  } else {
    throw new Error('this is not your parking!');
  }
}

export async function getAllParkings() {
  return await ParkingModel.find();
}

export async function createUser(username: string, password: string) {

  return await new Promise((res, rej) => {
    if (!username || !password) rej('please fill all inputs!');
    const newUser = new UserModel({
      username: username,
      password: password,
      preferences: '',
    });
    // save user to database
    newUser.save(function (err, user: any) {
      if (err) {
        rej(
          'User with this username already exists! please choose a different username'
        );
      } else res(user);
    });
  });
}

export async function authenticateUser(username: string, password: string) {
  // fetch user and test password verification
  return await new Promise((res, rej) => {
    if (!username || !password) rej('please fill all inputs!');
    // checks if username in database
    UserModel.findOne({ username: username }, function (err: any, user: any) {
      if (err) rej(err);
      if (!user) rej('username or password is inncorrect! Please try again!');
      else {
        // test a matching password
        user.comparePassword(password, function (err: any, isMatch: any) {
          if (err) rej(err);
          if (isMatch) {
            res(user);
          } else rej('username or password is inncorrect! Please try again!');
        });
      }
    });
  });
}

// Edit preferences of a user
export async function editPreferences(username: string, preferences: string) {
  const filter = { username: username };
  const update = { preferences: preferences };
  return await new Promise((res, rej) => {
    UserModel.findOneAndUpdate(filter, update, function (err: any) {
      if (err) rej(err);
      res('Succesfully saved.');
    });
  });
}

export async function getPreferences(username: string) {
  return await new Promise((res, rej) => {
    UserModel.findOne({ username: username }, function (err: any, user: any) {
      if (err) rej(err);
      res(user.preferences);
    });
  });
}
