import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.MONGO_URL || "mongodb://localhost:27017/hireme",
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire: "7d",
  payment_amount: 100,
};
