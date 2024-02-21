import { IUserRepository } from "repositories/IUserRepository";

interface ILogoutParams {
  email: string;
  sessionToken: string;
}

class LogoutService {
  constructor(public userRepository: IUserRepository) {}

  logoutUser = async ({ email, sessionToken }: ILogoutParams) => {
    try {
      if (!email) {
        throw new Error("O e-mail é obrigatório");
      }
      if (!sessionToken) {
        throw new Error("O session token é obrigatório");
      }

      const currentUser = await this.userRepository.findByEmail(email);
      if (!currentUser) {
        throw new Error("Usuário não encontrado");
      }

      const user = await this.userRepository.logout(email, sessionToken);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { LogoutService };
