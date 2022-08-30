"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const mongo_1 = require("../db/mongo");
const jwt = require("jsonwebtoken");
exports.userRoute = (0, express_1.Router)();
//@ts-ignore
exports.userRoute.post("/login", (req, res) => {
    (0, mongo_1.authenticateUser)(req.body.username, req.body.password)
        .then((user) => {
        const token = jwt.sign({ userId: user._id, email: user.username }, 'supersecret_dont_share', { expiresIn: '1h' });
        res.json({
            userId: user._id,
            username: user.username,
            token: token
        });
    })
        .catch((response) => res.json({ response: response }));
});
//@ts-ignore
exports.userRoute.post("/signup", (req, res) => {
    (0, mongo_1.createUser)(req.body.username, req.body.password).catch(() => console.log("user already exists!"));
});
//# sourceMappingURL=userRoute.js.map