import { IAuthRepository } from "../IAuthRepository";
import { db } from "../../database/db";
import { UserDTO } from "../../types/UserTypes";

export class PrismaAuthRepository implements IAuthRepository {
  async addSessionToken(email: string, sessionToken: string) {
    const user = await db.user.update({
      where: {
        email,
      },
      data: {
        sessionToken: {
          push: sessionToken,
        },
      },
    });

    return user;
  }

  findByEmail(email: string) {
    const user = db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(user: UserDTO) {
    const newUser = await db.user.create({
      data: user,
    });

    return newUser;
  }
  async exists(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }
}
