import { IAuthRepository } from "repositories/IAuthRepository";
import { UserDTO } from "../../types/UserTypes";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";

export class authRepositoryInMemory implements IAuthRepository {
  private users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
  }

  async addSessionToken(email: string, sessionToken: string) {
    const index = this.users.findIndex((user) => user.email === email);

    if (index !== -1) {
      const updatedUser = {
        ...this.users[index],
        sessionToken: [...this.users[index].sessionToken, sessionToken],
      };

      this.users[index] = updatedUser;

      return updatedUser;
    }

    return null;
  }

  async create(user: UserDTO) {
    Object.assign(user, {
      id: randomUUID(),
    });

    this.users.push(user);
    return user;
  }
  async exists(email: string) {
    const user = this.users.some((user) => user.email === email);
    return !!user;
  }
}
