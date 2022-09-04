"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jwt = require("jsonwebtoken");
// Middleware that checks auth of user next function will only run if user is authorized
//@ts-ignore
const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error("Authentication failed!");
        }
        // verify token with secret key and pass the username to the request
        const decodedToken = jwt.verify(token, "supersecret_dont_share");
        req.body.username = decodedToken.username;
        next();
    }
    catch (err) {
        const error = new Error("Authentication failed!");
        return next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map