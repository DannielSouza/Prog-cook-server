import bcrypt from "bcrypt";
import { uploadImage } from "../../helpers/imageUploader";
import { TUserSignupRequest, UserDTO } from "../../types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "@prisma/client";

class SignupService {
  constructor(public userRepository: IUserRepository) {}

  registerUser = async (user: TUserSignupRequest): Promise<User> => {
    const { name, email, bio, password, confirmPassword, images } = user;
    try {
      if (!name) {
        throw new Error("O nome é obrigatório");
      }
      if (!email) {
        throw new Error("O e-mail é obrigatório");
      }
      if (!images || !images?.[0]) {
        throw new Error("A imagem é obrigatória");
      }
      if (!password) {
        throw new Error("A senha é obrigatória");
      }
      if (!confirmPassword) {
        throw new Error("A confirmação de senha é obrigatória");
      }
      if (password !== confirmPassword) {
        throw new Error("As senhas são diferentes");
      }

      const isUserExist = await this.userRepository.exists(email);

      if (isUserExist) {
        throw new Error("O e-mail já está em uso");
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      let imageUrl = "";
      for (const file of images) {
        imageUrl = await uploadImage(
          file.buffer,
          `user/${new Date().getUTCMilliseconds() * (Math.random() * 1000)}`
        );
      }

      const user = await this.userRepository.create({
        email,
        name,
        imageUrl,
        bio,
        password: passwordHash,
      } as UserDTO);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export { SignupService };
