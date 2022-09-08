"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
describe("POST /login", () => {
    describe("Given a username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .post("/login")
                .send({ username: "leopariente", password: "svFvafbaf" });
            expect(response.statusCode).toEqual(200);
        });
    });
    describe("When the username or password are missing", () => {
        test("should respond with an error message", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .post("/login")
                .send({ password: "svFvafbaf" });
            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual({ error: "please fill all inputs!" });
        });
    });
});
describe("POST /signup", () => {
    describe("Try to create a user that already exists", () => {
        test("should respond with a 200 status code", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .post("/signup")
                .send({ username: "leopariente", password: "svFvafbaf" });
            expect(response.body).toEqual({
                error: "User with this username already exists! please choose a different username",
            });
        });
    });
    describe("When the username or password are missing", () => {
        test("should respond with an error message", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .post("/signup")
                .send({ password: "svFvafbaf" });
            expect(response.body).toEqual({ error: "please fill all inputs!" });
        });
    });
});
describe("POST /park", () => {
    let token = "";
    beforeAll(async function () {
        const response = await (0, supertest_1.default)(server_1.app)
            .post("/login")
            .send({ username: "leopariente", password: "031301leo" });
        const data = response.body;
        token = data.token;
    });
    it("should not be able to consume the route /park since no token was sent", async () => {
        const response = await (0, supertest_1.default)(server_1.app).post("/park");
        expect(response.statusCode).toEqual(500);
    });
    it("should be able to consume the route /park since token valid was sent", async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post("/park")
            .set("Authorization", "Bearer " + token);
        expect(response.statusCode).toEqual(200);
    });
});
//# sourceMappingURL=app.test.js.map