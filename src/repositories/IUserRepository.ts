import { User } from "@prisma/client";
import { UserDTO } from "../types/UserTypes";

export interface IUserRepository {
  create(user: UserDTO): Promise<User>;
  exists(email: string): Promise<Boolean>;
  addSessionToken(email: string, sessionToken: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  logout(email: string, sessionToken: string): Promise<User>;
}
