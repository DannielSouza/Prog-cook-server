import { User } from "@prisma/client";

export type TUserSignupRequest = Omit<
  User,
  "imageUrl" | "updatedAt" | "createdAt" | "id" | "sessionToken"
> & {
  images: Express.Multer.File[];
  confirmPassword: String;
};

export interface TUserSigninRequest {
  email: string;
  password: string;
}

export type UserDTO = User & {
  updatedAt?: string;
  createdAt?: string;
  id?: string;
};
