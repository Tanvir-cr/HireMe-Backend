import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwt_expire,
  });
};
