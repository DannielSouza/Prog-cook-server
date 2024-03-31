import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/userRepository";
import { userByEmailService } from "../../services/userByEmail/userByEmailService";

const prismaUserRepository = new PrismaUserRepository();
const userByEmail = new userByEmailService(prismaUserRepository);

export const findUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userByEmail.getUserByEmail(email);

    return res
      .status(200)
      .json({ message: "Usuário encontrado com sucesso", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
