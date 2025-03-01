import fs from "node:fs";
import Config from "../Config";
import jwt from "jsonwebtoken";

export const createToken = (
  data: { id: number; code?: string },
  expiresIn?: string | number
) => {
  const privateKey = fs.readFileSync(
    Config.privateKey || "PRIVATE.pem",
    "utf-8"
  ); // Convertimos a string

  const signOptions: jwt.SignOptions = {
    algorithm: "ES512",
  };

  if (expiresIn) {
    signOptions.expiresIn =
      typeof expiresIn === "string" ? parseInt(expiresIn, 10) : expiresIn;
  }

  return jwt.sign(data, privateKey, signOptions);
};
