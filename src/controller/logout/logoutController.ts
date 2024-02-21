import { Request, Response } from "express";
import { getSessionToken } from "../../helpers/getSessionToken";
import { getUserBySessionToken } from "../../helpers/getUserBySessionToken";
import { PrismaUserRepository } from "../../repositories/prisma/userRepository";
import { LogoutService } from "../../services/logout/logoutService";

const prismaUserRepository = new PrismaUserRepository();
const logoutService = new LogoutService(prismaUserRepository);

export const logout = async (req: Request, res: Response) => {
  try {
    const token = await getSessionToken(req);
    const user = await getUserBySessionToken(token);

    await logoutService.logoutUser({ email: user.email, sessionToken: token });
    res.status(200).json({ message: "Usuário desconectado com sucesso" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
