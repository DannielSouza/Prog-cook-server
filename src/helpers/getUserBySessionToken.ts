import { db } from "../database/db";

export const getUserBySessionToken = async (sessionToken: string) => {
  const user = await db.user.findFirst({
    where: {
      sessionToken: {
        has: sessionToken,
      },
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
};
