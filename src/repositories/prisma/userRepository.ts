import { IUserRepository } from "../IUserRepository";
import { db } from "../../database/db";
import { UserDTO } from "../../types/UserTypes";

export class PrismaUserRepository implements IUserRepository {
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
