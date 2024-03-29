import { Request } from "express";

export const getSessionToken = (req: Request) => {
  const sessionToken = req.cookies["COOK-AUTH"];

  if (!sessionToken) {
    throw new Error("Token inválido");
  }
  return sessionToken;
};
