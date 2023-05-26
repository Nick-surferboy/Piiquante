import { createUser, logUserIn } from "../controllers/user";
import bcrypt from "bcrypt";
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

afterEach(() => {
  jest.restoreAllMocks();
});

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

  it("Should throw an error a validation error on an empty body", async () => {
    const mockReq = (mockRequest().body = { body: {} });
    const mockRes = mockResponse();
    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("Log in user", () => {
  it("Should return an not user find error", async () => {
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce("hashedPassword");
    jest.spyOn(User, "findOne").mockImplementationOnce(null);

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    await logUserIn(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: new Error("Email or password is incorrect") });

  });
});
