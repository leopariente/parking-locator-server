"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getPreferences = exports.editPreferences = exports.authenticateUser = exports.createUser = exports.getAllParkings = exports.deleteParking = exports.addParking = void 0;
var mongoose_1 = require("mongoose");
var parkingModel_1 = require("./models/parkingModel");
var userModel_1 = require("./models/userModel");
require('dotenv').config();
// Connection to mongo atlas
(0, mongoose_1.connect)(process.env.DATABASE_URL)["catch"](function (err) { return console.log(err); });
// Helper function, takes the minutes to leave user input and returns the time of expiration
function addMinutes(numOfMinutes, date) {
    if (date === void 0) { date = new Date(); }
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}
// Add a parking spot to the database
function addParking(parking) {
    return __awaiter(this, void 0, void 0, function () {
        var expireAt, parkingDocument;
        return __generator(this, function (_a) {
            expireAt = addMinutes(parking.minutesToLeave);
            parkingDocument = new parkingModel_1.ParkingModel({
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
            return [2 /*return*/];
        });
    });
}
exports.addParking = addParking;
// Delete a parking spot to the database
function deleteParking(parkingId, username) {
    return __awaiter(this, void 0, void 0, function () {
        var parkToDelete;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parkingModel_1.ParkingModel.findOne({
                        _id: parkingId
                    })];
                case 1:
                    parkToDelete = (_a.sent());
                    if (!(parkToDelete.username === username)) return [3 /*break*/, 3];
                    return [4 /*yield*/, parkingModel_1.ParkingModel.deleteOne({ _id: parkingId })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: throw new Error('this is not your parking!');
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteParking = deleteParking;
function getAllParkings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parkingModel_1.ParkingModel.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAllParkings = getAllParkings;
function createUser(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (res, rej) {
                        if (!username || !password)
                            rej('please fill all inputs!');
                        var newUser = new userModel_1.UserModel({
                            username: username,
                            password: password,
                            preferences: ''
                        });
                        // save user to database
                        newUser.save(function (err, user) {
                            if (err) {
                                rej('User with this username already exists! please choose a different username');
                            }
                            else
                                res(user);
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createUser = createUser;
function authenticateUser(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (res, rej) {
                        if (!username || !password)
                            rej('please fill all inputs!');
                        // checks if username in database
                        userModel_1.UserModel.findOne({ username: username }, function (err, user) {
                            if (err)
                                rej(err);
                            if (!user)
                                rej('username or password is inncorrect! Please try again!');
                            else {
                                // test a matching password
                                user.comparePassword(password, function (err, isMatch) {
                                    if (err)
                                        rej(err);
                                    if (isMatch) {
                                        res(user);
                                    }
                                    else
                                        rej('username or password is inncorrect! Please try again!');
                                });
                            }
                        });
                    })];
                case 1: 
                // fetch user and test password verification
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.authenticateUser = authenticateUser;
// Edit preferences of a user
function editPreferences(username, preferences) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = { username: username };
                    update = { preferences: preferences };
                    return [4 /*yield*/, new Promise(function (res, rej) {
                            userModel_1.UserModel.findOneAndUpdate(filter, update, function (err) {
                                if (err)
                                    rej(err);
                                res('Succesfully saved.');
                            });
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.editPreferences = editPreferences;
function getPreferences(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (res, rej) {
                        userModel_1.UserModel.findOne({ username: username }, function (err, user) {
                            if (err)
                                rej(err);
                            res(user.preferences);
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPreferences = getPreferences;
