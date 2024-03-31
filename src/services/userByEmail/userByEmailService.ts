import { db } from "database/db";
import { IUserRepository } from "../../repositories/IUserRepository";

class userByEmailService {
  constructor(public userRepository: IUserRepository) {}

  getUserByEmail = async (email: string) => {
    try {
      if (!email) {
        throw new Error("O e-mail é obrigatório");
      }

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { userByEmailService };
