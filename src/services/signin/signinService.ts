import { IUserRepository } from "../../repositories/IUserRepository";
import { TUserSigninRequest } from "../../types/UserTypes";
import bcrypt from "bcrypt";

class SigninService {
  constructor(public userRepository: IUserRepository) {}

  loginUser = async (user: TUserSigninRequest) => {
    try {
      const { email, password } = user;

      if (!email) {
        throw new Error("O e-mail é obrigatório");
      }
      if (!password) {
        throw new Error("A senha é obrigatória");
      }

      const currentUser = await this.userRepository.findByEmail(email);
      if (!currentUser) {
        throw new Error("Usuário não encontrado");
      }

      const checkedPassword = await bcrypt.compare(
        password,
        currentUser.password
      );
      if (!checkedPassword) {
        throw new Error("Senha inválida");
      }

      return currentUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { SigninService };
