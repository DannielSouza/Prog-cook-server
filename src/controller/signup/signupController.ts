import { Request, Response } from "express";
import { AuthService } from "../../services/signup/signupService";
import { PrismaAuthRepository } from "../../repositories/prisma/userRepository";

const prismaAuthRepository = new PrismaAuthRepository();
const authService = new AuthService(prismaAuthRepository);

export const register = async (req: Request, res: Response) => {
  console.log("Chamou a rota");
  const { name, email, bio, password, confirmPassword } = req.body;
  const files = req.files as Express.Multer.File | any;

  try {
    const user = await authService.registerUser({
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
