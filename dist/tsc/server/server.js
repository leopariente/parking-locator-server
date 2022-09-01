"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const parkingRoute_1 = require("./routes/parkingRoute");
const userRoute_1 = require("./routes/userRoute");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
const root = path_1.default.join(process.cwd(), 'dist');
app.use(userRoute_1.userRoute);
app.use(parkingRoute_1.parkingRoute);
app.use(express_1.default.static(root));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
});
//# sourceMappingURL=server.js.map