// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");
const fs = require("fs");
const { User, Sauce } = require("../models/models");
const FormData = require("form-data");

let token;
let user1Id;
const user1 = { email: "test@test", password: "secret" };
const sauceId = "64749bb9932d0c847015d7a9"; //"64661a80514e19d7e263b6b4";
const sauce = {
  //sauce: {
  userId: "097",
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

const file = { filename: "AL_89.jpg" };

afterAll(async () => {
  const email = user1.email;
  await User.deleteOne({ email: "test@test" });
});

describe("POST /api/auth/signup ", () => {
  it("It should respond with a created user : status 201 ", async () => {
    const response = await request(app).post("/api/auth/signup").send(user1);
    expect(response.statusCode).toBe(201);
  });

  it("It should throw an error : status 500 ", async () => {
    const response = await request(app).post("/api/auth/signup").send({ email: "test@test" });
    expect(response.statusCode).toBe(500);
  });
});

describe("POST /api/auth/login", () => {
  it("It should throw an error on user not found : status 401 ", async () => {
    const response = await request(app).post("/api/auth/login").send({ email: "false@false", password: "secret" });
    expect(response.statusCode).toBe(401);
  });

  it("It should throw an error on invalid password : status 401 ", async () => {
    const response = await request(app).post("/api/auth/login").send({ email: "test@test", password: "notgood" });
    expect(response.statusCode).toBe(401);
  });

  it("It should respond with a logged in user : status 200 ", async () => {
    const response = await request(app).post("/api/auth/login").send(user1);
    token = response.body.token;
    user1Id = response.body.userId;
    expect(response.statusCode).toBe(200);
  });
});

describe("404 - route not found", () => {
  it("Should thrown a route not found error", async () => {
    const response = await request(app).post("/api/jkfjf").send({ email: "test@test", password: "notgood" });
    expect(response.statusCode).toBe(404);
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
      .get("/api/sauces/" + sauceId)
      .set("Authorization", `bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST like one sauce /api/sauces/:id/like ", () => {
  test("It should respond with a like on the sauce in return", async () => {

    const response = await request(app)
      .post("/api/sauces/" + sauceId + "/like")
      .set("Authorization", `bearer ${token}`)
      .send({like:1, userId:user1Id});
    expect(response.statusCode).toBe(201);
  });

  test("It should respond with an 401 error auth", async () => {
    const response = await request(app)
      .post("/api/sauces/" + sauceId + "/like")
      .set("Authorization", `bearer ${token}`)
      .send({like:1, userId:"234kjhwer3"});
    expect(response.statusCode).toBe(401);
  });

});

// describe("POST /api/sauces ", () => {
//   test("It should respond with a created sauce", async (req, res, next) => {
//     //sauce1.sauce.userId = user1Id;
//     //const file = req.files;

//     const imageFile = new File([],"myfile.jpg");
//     const bodyFormData = new FormData();
//     bodyFormData.append('body', JSON.stringify(sauce));
//    // await bodyFormData.append('image', fs.createReadStream("files/data.zip"), "data.zip");
//     console.log(req.file);
//     const response = await request(app)
//       .post("/api/sauces" )
//       .set("Authorization", `bearer ${token}`)
//       .set("File", {filename:"sfed"})
//       //.send({ sauce: JSON.stringify(sauce) } , {file: imageFile});
//       //.send({body:bodyFormData});
//     // .attach('image',imageFile);
//     // .attach({ file: { filename: "Alsaer.jpg" } });
//     .send({ sauce: JSON.stringify(sauce) });
//     expect(response.statusCode).toBe(201);
//   });
// });
