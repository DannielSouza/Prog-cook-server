import { authRepositoryInMemory } from "../repositories/in-memory/authReposotory";
import { AuthService } from "./authService";
import { TUserRequest } from "../types/UserTypes";
import * as fs from "fs";
import * as path from "path";
const bcrypt = require("bcrypt");

console.log("teste `1", bcrypt);
jest.mock("bcrypt");
console.log("teste `2", bcrypt);

describe("Create user", () => {
  const makeSut = () => {
    const authRepository = new authRepositoryInMemory();
    return new AuthService(authRepository);
  };

  it("should be able to create a new user", async () => {
    const sut = makeSut();

    (bcrypt.genSalt as any).mockResolvedValue("test");
    (bcrypt.hash as any).mockResolvedValue("test");

    const fakeImage = fs.createReadStream(
      path.resolve(__dirname, "imageTest.jpg")
    );

    const userData: TUserRequest = {
      name: "valid_name",
      bio: "Bio test",
      email: "valid_email@mail.com",
      password: "valid_password",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    const user = await sut.registerUser(userData);
    console.log(user);
    expect(user).toHaveProperty("id");
  });
});
