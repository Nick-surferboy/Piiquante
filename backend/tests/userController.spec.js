import { createUser } from "../controllers/user";

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
    status: jest.fn().mockReturnthis(),
    json: jest.fn().mockReturnthis(),
  };
};

describe("Register User", () => {
  it("Should create a new user", async () => {
    // await createUser()
  });
});
