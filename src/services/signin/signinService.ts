import { IAuthRepository } from "../../repositories/IAuthRepository";
import { TUserSigninRequest } from "../../types/UserTypes";
import bcrypt from "bcrypt";
import { generateRandomSalt } from "../../helpers/generateRandomSalt";
import { generateSessionToken } from "../../helpers/generateSessionToken";

class SigninService {
  constructor(public authRepository: IAuthRepository) {}

  loginUser = async (user: TUserSigninRequest) => {
    try {
      const { email, password } = user;

      if (!email) {
        throw new Error("O e-mail é obrigatório");
      }
      if (!password) {
        throw new Error("A senha é obrigatória");
      }

      const currentUser = await this.authRepository.findByEmail(email);
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

      const salt = generateRandomSalt();
      const sessionToken = generateSessionToken(salt, password);
      const userWithToken = await this.authRepository.addSessionToken(
        email,
        sessionToken
      );

      return userWithToken;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { SigninService };
