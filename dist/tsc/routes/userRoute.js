"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../checkAuth");
const mongo_1 = require("../db/mongo");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// User routes, CRUD requests related to user, login, signup, get and edit user preferences
exports.userRoute = (0, express_1.Router)();
//@ts-ignore
exports.userRoute.post("/login", (req, res) => {
    (0, mongo_1.authenticateUser)(req.body.username, req.body.password)
        .then((user) => {
        // create json web token and send it to user
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({
            userId: user._id,
            username: user.username,
            preferences: user.preferences,
            token: token,
        });
    })
        .catch((response) => res.json({ error: response }));
});
//@ts-ignore
exports.userRoute.post("/signup", (req, res) => {
    (0, mongo_1.createUser)(req.body.username, req.body.password)
        .then((user) => {
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({
            userId: user._id,
            username: user.username,
            preferences: user.preferences,
            token: token,
        });
    })
        .catch((response) => res.json({ error: response }));
});
//@ts-ignore
exports.userRoute.put("/preferences", checkAuth_1.checkAuth, (req, res) => {
    (0, mongo_1.editPreferences)(req.body.username, req.body.preferences).then((response) => res.send(response));
});
exports.userRoute.get("/preferences", checkAuth_1.checkAuth, (req, res) => {
    (0, mongo_1.getPreferences)(req.body.username).then((response) => {
        res.send(response);
    });
});
//# sourceMappingURL=userRoute.js.map