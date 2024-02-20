import { IUserRepository } from "../IUserRepository";
import { db } from "../../database/db";
import { UserDTO } from "../../types/UserTypes";

export class PrismaUserRepository implements IUserRepository {
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

  async logout(email: string, sessionToken: string) {
    const user = await db.user.findUnique({
      where: { email },
    });

    const updatedSessionTokens = user.sessionToken.filter(
      (token) => token !== sessionToken
    );

    const updatedUser = await db.user.update({
      where: { email },
      data: {
        sessionToken: updatedSessionTokens,
      },
    });

    return updatedUser;
  }
}
