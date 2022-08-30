"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
//@ts-ignore
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        //req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
};
//# sourceMappingURL=chackAuth.js.map