"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRoute = void 0;
const express_1 = require("express");
const mongo_1 = require("../db/mongo");
// import { checkAuth } from './checkAuth';
exports.parkingRoute = (0, express_1.Router)();
// app.use(checkAuth);
//@ts-ignore
exports.parkingRoute.post("/park", (req, res) => {
    (0, mongo_1.addParking)(req.body).then(() => res.send("added successfully!"));
});
exports.parkingRoute.delete("/park", (req, res) => {
    const id = req.body.id;
    (0, mongo_1.deleteParking)(id).then(() => res.send("deleted successfully"));
});
//@ts-ignore
exports.parkingRoute.get("/park", (req, res) => {
    (0, mongo_1.getAllParkings)().then(documents => res.send(documents));
});
//# sourceMappingURL=parkingRoutes.js.map