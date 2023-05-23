// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");
const { User } = require("../models/models");
const auth2 = require("../middleware/auth");

let auth = {} ;


afterAll(async () => {
  await User.deleteOne({ email: "test@test" }); 
});

beforeEach(async () => {
  //auth();
});

describe("POST /api/auth/signup ", () => {
  test("It should respond with a created user ", async () => {
    const response = await request(app).post("/api/auth/signup").send({ email: "test@test", password: "secret" });
    expect(response.statusCode).toBe(201); 
  });
});

describe("POST /api/auth/login", () => {
  test("It should respond with a logged in user ", async () => {
    const response = await request(app).post("/api/auth/login").send({ email: "test@test", password: "secret" });
    auth.token = response.body.token ;
    expect(response.statusCode).toBe(200);
  });
});


describe("GET /api/sauces ", () => {
  test("It should respond with an array of sauces", async () => {
    const response = await request(app).get("/api/sauces").set("authorization", auth.token);;
    expect(response.statusCode).toBe(200);
  });
});

