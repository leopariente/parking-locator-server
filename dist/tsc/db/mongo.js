"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferences = exports.editPreferences = exports.authenticateUser = exports.createUser = exports.getAllParkings = exports.deleteParking = exports.addParking = void 0;
const mongoose_1 = require("mongoose");
const parkingModel_1 = require("./models/parkingModel");
const userModel_1 = require("./models/userModel");
require('dotenv').config();
// Connection to mongo atlas
(0, mongoose_1.connect)(process.env.DATABASE_URL).catch((err) => console.log(err));
// Helper function, takes the minutes to leave user input and returns the time of expiration
function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}
// Add a parking spot to the database
async function addParking(parking) {
    const expireAt = addMinutes(parking.minutesToLeave);
    const parkingDocument = new parkingModel_1.ParkingModel({
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
exports.addParking = addParking;
// Delete a parking spot to the database
async function deleteParking(parkingId, username) {
    const parkToDelete = (await parkingModel_1.ParkingModel.findOne({
        _id: parkingId,
    }));
    // Checks if username from database is the same as the username sending the request
    if (parkToDelete.username === username) {
        await parkingModel_1.ParkingModel.deleteOne({ _id: parkingId });
    }
    else {
        throw new Error("this is not your parking!");
    }
}
exports.deleteParking = deleteParking;
async function getAllParkings() {
    return await parkingModel_1.ParkingModel.find();
}
exports.getAllParkings = getAllParkings;
async function createUser(username, password) {
    const newUser = new userModel_1.UserModel({
        username: username,
        password: password,
        preferences: "",
    });
    return await new Promise((res, rej) => {
        // save user to database
        newUser.save(function (err, user) {
            if (err) {
                rej("User with this username already exists! please choose a different username");
            }
            else
                res(user);
        });
    });
}
exports.createUser = createUser;
async function authenticateUser(username, password) {
    // fetch user and test password verification
    return await new Promise((res, rej) => {
        // checks if username in database
        userModel_1.UserModel.findOne({ username: username }, function (err, user) {
            if (err)
                rej(err);
            if (!user)
                rej("username or password is inncorrect! Please try again!");
            else {
                // test a matching password
                user.comparePassword(password, function (err, isMatch) {
                    if (err)
                        rej(err);
                    if (isMatch) {
                        res(user);
                    }
                    else
                        rej("username or password is inncorrect! Please try again!");
                });
            }
        });
    });
}
exports.authenticateUser = authenticateUser;
// Edit preferences of a user
async function editPreferences(username, preferences) {
    const filter = { username: username };
    const update = { preferences: preferences };
    return await new Promise((res, rej) => {
        userModel_1.UserModel.findOneAndUpdate(filter, update, function (err) {
            if (err)
                rej(err);
            res("Succesfully saved.");
        });
    });
}
exports.editPreferences = editPreferences;
async function getPreferences(username) {
    return await new Promise((res, rej) => {
        userModel_1.UserModel.findOne({ username: username }, function (err, user) {
            if (err)
                rej(err);
            res(user.preferences);
        });
    });
}
exports.getPreferences = getPreferences;
//# sourceMappingURL=mongo.js.map