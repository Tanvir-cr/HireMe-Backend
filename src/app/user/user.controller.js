import catchAsync from "../../utils/catchAsync.js";
import { createUser, findUser, findAllUsers } from "./user.service.js";
import { generateToken } from "../../utils/tokenGenerator.js";
import bcrypt from "bcrypt";

export const register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashed, role });
  res.json({ success: true, user });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });
  const token = generateToken({ id: user._id, role: user.role });
  res.json({ success: true, token, user });
});

export const listUsers = catchAsync(async (req, res) => {
  const users = await findAllUsers();
  res.json({ success: true, users });
});
