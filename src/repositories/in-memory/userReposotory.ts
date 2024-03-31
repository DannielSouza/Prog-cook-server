import { IUserRepository } from "repositories/IUserRepository";
import { UserDTO } from "../../types/UserTypes";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [
    {
      id: "test_id",
      email: "valid_email@mail.com",
      password: "valid_password",
      name: "valid_name",
      bio: "valid_bio",
      imageUrl: "valid_imageUrl",
      createdAt: new Date(),
      updatedAt: new Date(),
      sessionToken: ["valid_sessionToken"],
    },
  ];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
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

  async logout(email: string, sessionToken: string) {
    const index = this.users.findIndex((user) => user.email === email);

    const updatedSessionTokens = this.users[index].sessionToken.filter(
      (token) => token !== sessionToken
    );
    this.users[index] = {
      ...this.users[index],
      sessionToken: updatedSessionTokens,
    };

    return this.users[index];
  }
}
