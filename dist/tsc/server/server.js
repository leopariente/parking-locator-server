"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
// import { Parking } from "./interface";
const mongo_1 = require("./db/mongo");
const mongo_2 = require("./db/mongo");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
const root = path_1.default.join(process.cwd(), 'dist');
app.use(express_1.default.static(root));
app.post("/park", (req, res) => {
    (0, mongo_1.addParking)(req.body);
    res.send("got the request!");
});
app.delete("/park", (req, res) => {
    const id = req.body.id;
    (0, mongo_1.deleteParking)(id).then(() => res.send("deleted successfully"));
});
//@ts-ignore
app.get("/park", (req, res) => {
    (0, mongo_1.getAllParkings)().then(documents => res.send(documents));
});
//@ts-ignore
app.get("/login", (req, res) => {
    (0, mongo_1.authenticateUser)(req.body.username, req.body.password)
        .then((response) => res.send(response));
});
//@ts-ignore
app.get("signup", (req, res) => {
    (0, mongo_2.createUser)(req.body.username, req.body.password);
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Hosted: http://localhost:' + port);
});
//# sourceMappingURL=server.js.map