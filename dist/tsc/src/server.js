"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const parkingRoute_1 = require("./routes/parkingRoute");
const userRoute_1 = require("./routes/userRoute");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.json)());
exports.app.use(userRoute_1.userRoute);
exports.app.use(parkingRoute_1.parkingRoute);
const port = process.env.PORT || 4000;
exports.app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
});
//# sourceMappingURL=server.js.map