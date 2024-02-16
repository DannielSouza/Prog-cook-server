import { IAuthRepository } from "repositories/IAuthRepository";
import { UserDTO } from "../../types/UserTypes";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";

export class authRepositoryInMemory implements IAuthRepository {
  private users: User[] = [];

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
