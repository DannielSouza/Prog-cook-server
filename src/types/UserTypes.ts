import { User } from "@prisma/client";

export type TUserRequest = Omit<
  User,
  "imageUrl" | "updatedAt" | "createdAt" | "id"
> & {
  images: Express.Multer.File[];
  confirmPassword: String;
};

export type UserDTO = User & {
  updatedAt?: string;
  createdAt?: string;
  id?: string;
};
