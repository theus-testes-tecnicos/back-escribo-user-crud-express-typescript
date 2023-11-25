import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (info: object) => {
  const token = jwt.sign(info, process.env.SECRET_KEY!, {
    expiresIn: "5m",
  });

  return token;
};
