"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRoute = void 0;
const express_1 = require("express");
const mongo_1 = require("../db/mongo");
const checkAuth_1 = require("../checkAuth");
exports.parkingRoute = (0, express_1.Router)();
//@ts-ignore
exports.parkingRoute.get("/park", (req, res) => {
    (0, mongo_1.getAllParkings)().then((documents) => res.send(documents));
});
exports.parkingRoute.use(checkAuth_1.checkAuth);
//@ts-ignore
exports.parkingRoute.post("/park", (req, res) => {
    (0, mongo_1.addParking)(req.body)
        .then(() => res.send("added successfully!"))
        .catch(() => res.send("Car model, Car Color and minutes to leave are mandatory!"));
});
exports.parkingRoute.delete("/park", (req, res) => {
    const id = req.body.id;
    console.log(req.body.username);
    const username = req.body.username;
    (0, mongo_1.deleteParking)(id, username).then(() => res.send("deleted successfully"));
});
//# sourceMappingURL=parkingRoute.js.map