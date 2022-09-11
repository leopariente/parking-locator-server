"use strict";
exports.__esModule = true;
exports.ParkingModel = void 0;
var mongoose_1 = require("mongoose");
var ParkingSchema = new mongoose_1.Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    carModel: { type: String, required: true },
    carColor: { type: String, required: true },
    expireAt: { type: Date },
    localTime: { type: String },
    licensePlate: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    username: { type: String, required: true }
});
// Adding an index of expiration time. Database will remove every document on their expiration date
ParkingSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
exports.ParkingModel = (0, mongoose_1.model)('Parking', ParkingSchema);
