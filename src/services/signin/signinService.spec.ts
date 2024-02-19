import bcrypt from "bcrypt";
import { authRepositoryInMemory } from "../../repositories/in-memory/userReposotory";
import { SigninService } from "./signinService";
import { User } from "@prisma/client";
import * as generateRandomSalt from "../../helpers/generateRandomSalt";
import * as generateSessionToken from "../../helpers/generateSessionToken";

jest.mock("bcrypt");
jest.mock("../../helpers/generateRandomSalt");
jest.mock("../../helpers/generateSessionToken");

describe("Login User Service", () => {
  const makeSut = () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const authRepository = new authRepositoryInMemory();
    const signinService = new SigninService(authRepository);
    return { signinService, authRepository };
  };

  it("shoud be able to signin a user", async () => {
    const { signinService } = makeSut();

    const userData: any = {
      email: "valid_email@mail.com",
      password: "valid_password",
    };

    const user: User = await signinService.loginUser(userData);

    expect(generateRandomSalt.generateRandomSalt).toHaveBeenCalled();
    expect(generateSessionToken.generateSessionToken).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(user).toHaveProperty("id");
  });
});
