import crypto from "crypto";

export const generateRandomSalt = () =>
  crypto.randomBytes(128).toString("base64");
