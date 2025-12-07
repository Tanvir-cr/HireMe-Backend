import User from "./user.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const findUser = async (filter) => {
  return await User.findOne(filter);
};

export const findAllUsers = async () => {
  return await User.find();
};
