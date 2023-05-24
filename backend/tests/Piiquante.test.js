// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");
const { User, Sauce } = require("../models/models");

let token;
let user1Id;
const user1 = { email: "test@test", password: "secret" };
const sauce1 = "64661a80514e19d7e263b6b4"
//const sauce1 = {
  const sauce = {
    userId: "",
    name: "sauceTest",
    manufacturer: "testManufacturer",
    description: "testDescription",
    mainPepper: "testPepper",
    imageUrl: "AL_89.jpg1684429716502.jpg",
    heat: 9,
    likes: 2,
    dislikes: 4,
    usersLiked: ["sdf3434r3", "234234234"],
    usersDisliked: ["sdfsdf"],
  //},
};

afterAll(async () => {
  const email = user1.email;
  await User.deleteOne({ email: "test@test" });
});

describe("POST /api/auth/signup ", () => {
  test("It should respond with a created user : status 201 ", async () => {
    const response = await request(app).post("/api/auth/signup").send(user1);
    expect(response.statusCode).toBe(201);
  });
});

describe("POST /api/auth/login", () => {
  test("It should respond with a logged in user : status 200 ", async () => {
    const response = await request(app).post("/api/auth/login").send(user1);
    token = response.body.token;
    user1Id = response.body.userId;
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/sauces ", () => {
  test("It should respond with an array of sauces", async () => {
    const response = await request(app).get("/api/sauces").set("Authorization", `bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET one /api/sauces/:id ", () => {
  test("It should respond with one sauce in return", async () => {
    const response = await request(app)
    //.get(`/api/sauces/${sauce1}`).set("Authorization", `bearer ${token}`);
    .get("/api/sauces/" + sauce1).set("Authorization", `bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

// describe("POST like one sauce /api/sauces/:id/like ", () => {
//   test("It should respond with one sauce in return", async () => {
//     const response = await request(app)
//     .get("/api/sauces/" + sauce1 + "/like").set("Authorization", `bearer ${token}`).send({userId: "sfsdfs", like : 2});
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("POST /api/sauces ", () => {
//   test("It should respond with a created sauce", async (req, res, next) => {
//     //sauce1.sauce.userId = user1Id;
//     //req.body.sauce = sauce;
//     const response = await request(app).post("/api/sauces").set("Authorization", `bearer ${token}`).send({sauce : JSON.stringify(sauce), file : {filename : "sdf" }});
//     expect(response.statusCode).toBe(201);
//   });
// });
