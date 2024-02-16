import { User } from "@prisma/client";
import { UserDTO } from "../types/UserTypes";

export interface IAuthRepository {
  create(user: UserDTO): Promise<User>;
  exists(email: string): Promise<Boolean>;
}
