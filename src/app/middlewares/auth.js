import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const auth = (...roles) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ success: false, message: "No token" });
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, config.jwt_secret);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) return res.status(403).json({ success: false, message: "Access denied" });
      next();
    } catch (err) {
      next(err);
    }
  };
};
