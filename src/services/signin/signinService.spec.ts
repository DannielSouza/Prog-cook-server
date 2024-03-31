import bcrypt from "bcrypt";
import { UserRepositoryInMemory } from "../../repositories/in-memory/userReposotory";
import { SigninService } from "./signinService";
import { User } from "@prisma/client";

jest.mock("bcrypt");

describe("Login User Service", () => {
  const makeSut = () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const userRepository = new UserRepositoryInMemory();
    const signinService = new SigninService(userRepository);
    return { signinService, userRepository };
  };

  it("should be able to signin a user", async () => {
    const { signinService } = makeSut();

    const userData: any = {
      email: "valid_email@mail.com",
      password: "valid_password",
    };

    const user: User = await signinService.loginUser(userData);

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(user).toHaveProperty("id");
  });

  it("should throw an error if the email is not provided", async () => {
    const { signinService } = makeSut();

    const userData: any = {
      password: "valid_password",
    };

    try {
      await signinService.loginUser(userData);
      fail("Expected the promise to be rejected.");
    } catch (error) {
      expect(error.message).toBe("O e-mail é obrigatório");
    }
  });

  it("should throw an error if the password is not provided", async () => {
    const { signinService } = makeSut();

    const userData: any = {
      email: "valid_email@mail.com",
    };

    try {
      await signinService.loginUser(userData);
      fail("Expected the promise to be rejected.");
    } catch (error) {
      console.error(error.message);
      expect(error.message).toBe("A senha é obrigatória");
    }
  });
});
