import { Request, Response } from "express";
import { SignupService } from "../../services/signup/signupService";
import { PrismaUserRepository } from "../../repositories/prisma/userRepository";

const prismaUserRepository = new PrismaUserRepository();
const signupService = new SignupService(prismaUserRepository);

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

    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
