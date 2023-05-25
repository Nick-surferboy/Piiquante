import { createUser } from "../controllers/user";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";
import { User } from "../models/models";

const mockRequest = () => {
  return {
    body: {
      email: "test@test",
      password: "secret",
    },
  };
};

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

const mockUser = {
  _id: "646d527f29d40fcd020f3948",
  email: "test@test",
  password: "hashedPassword",
};

describe("Register User", () => {
  it("Should create a new user", async () => {
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
    jest.spyOn(User, "create").mockResolvedValueOnce(mockUser);

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(bcrypt.hash).toHaveBeenCalledWith("secret", 10);
    expect(User.create).toHaveBeenCalledWith({
      email: "test@test",
      password: "hashedPassword",
    });
  });
});
