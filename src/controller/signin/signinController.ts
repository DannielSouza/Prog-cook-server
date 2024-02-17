import { Request, Response } from "express";
import { PrismaAuthRepository } from "../../repositories/prisma/userRepository";
import { SigninService } from "../../services/signin/signinService";

const prismaAuthRepository = new PrismaAuthRepository();
const signinService = new SigninService(prismaAuthRepository);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await signinService.loginUser({ email, password });
    return res
      .status(200)
      .json({ message: "Usuário autenticado com sucesso", data: user });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
