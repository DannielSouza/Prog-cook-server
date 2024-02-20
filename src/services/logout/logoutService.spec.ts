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
});
