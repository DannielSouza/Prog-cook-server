import { Request, Response } from "express";
import { SignupService } from "../../services/signup/signupService";
import { PrismaAuthRepository } from "../../repositories/prisma/userRepository";

const prismaAuthRepository = new PrismaAuthRepository();
const signupService = new SignupService(prismaAuthRepository);

export const register = async (req: Request, res: Response) => {
  const { name, email, bio, password, confirmPassword } = req.body;
  const files = req.files as Express.Multer.File | any;

  try {
    const user = await signupService.registerUser({
      name,
      email,
      bio,
      password,
      confirmPassword,
      images: files,
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
