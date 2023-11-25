import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (info: object) => {
  const token = jwt.sign(info, process.env.SECRET_KEY!, {
    expiresIn: "24h",
  });

  return token;
};
