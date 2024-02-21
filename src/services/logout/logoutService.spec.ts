import { UserRepositoryInMemory } from "../../repositories/in-memory/userReposotory";
import { LogoutService } from "./logoutService";

describe("Logout User Service", () => {
  const makeSut = () => {
    const userRepository = new UserRepositoryInMemory();
    const logoutService = new LogoutService(userRepository);

    return { userRepository, logoutService };
  };
  it("should be able to logout the user", async () => {
    const { logoutService } = makeSut();

    const userData = {
      email: "valid_email@mail.com",
      sessionToken: "valid_sessionToken",
    };

    const user = await logoutService.logoutUser(userData);
    const existingSessionToken = !!user.sessionToken.find(
      (token) => token === userData.sessionToken
    );
    expect(existingSessionToken).toBe(false);
  });

  it("should throw an error if the email is not provided", async () => {
    const { logoutService } = makeSut();

    const userData: any = {
      sessionToken: "valid_sessionToken",
    };

    try {
      await logoutService.logoutUser(userData);
      fail("Expected the promise to be rejected.");
    } catch (error) {
      expect(error.message).toBe("O e-mail é obrigatório");
    }
  });

  it("should throw an error if the session token is not provided", async () => {
    const { logoutService } = makeSut();

    const userData: any = {
      email: "valid_email@mail.com",
    };

    try {
      await logoutService.logoutUser(userData);
      fail("Expected the promise to be rejected.");
    } catch (error) {
      expect(error.message).toBe("O session token é obrigatório");
    }
  });
});
