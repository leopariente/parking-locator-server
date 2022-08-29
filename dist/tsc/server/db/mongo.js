"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createUser = exports.getAllParkings = exports.deleteParking = exports.addParking = void 0;
const mongoose_1 = require("mongoose");
const parkingModel_1 = require("./models/parkingModel");
const userModel_1 = require("./models/userModel");
(0, mongoose_1.connect)(`mongodb+srv://Cyber4s:ilovecode@cluster0.pluyv.mongodb.net/parking?retryWrites=true&w=majority`).catch((err) => console.log(err));
function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}
function addParking(parking) {
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
    });
    parkingDocument.save();
}
exports.addParking = addParking;
async function deleteParking(parkingId) {
    await parkingModel_1.ParkingModel.deleteOne({ _id: parkingId });
}
exports.deleteParking = deleteParking;
async function getAllParkings() {
    return await parkingModel_1.ParkingModel.find();
}
exports.getAllParkings = getAllParkings;
function createUser(username, password) {
    const testUser = new userModel_1.UserModel({
        username: username,
        password: password,
    });
    // save user to database
    testUser.save(function (err) {
        if (err)
            throw err;
    });
}
exports.createUser = createUser;
async function authenticateUser(username, password) {
    // fetch user and test password verification
    return await new Promise((res, rej) => {
        userModel_1.UserModel.findOne({ username: username }, function (err, user) {
            if (err)
                rej(err);
            if (!user)
                res("incorrect username!");
            else {
                // test a matching password
                user.comparePassword(password, function (err, isMatch) {
                    if (err)
                        rej(err);
                    console.log(password, isMatch); // -> Password: true/false
                    res("passwaord is:" + isMatch);
                });
            }
        });
    });
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=mongo.js.map