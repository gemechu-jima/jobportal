import { User } from "./user.model";
import bcrypt from "bcryptjs";

export const getUserById = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (userId: number, data: any) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  // Prevent updating sensitive fields here if needed
  delete data.password_hash;
  delete data.id;

  await user.update(data);
  return user;
};

export const changePassword = async (userId: number, data: any) => {
  const { oldPassword, newPassword } = data;
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
  if (!isMatch) throw new Error("Incorrect current password");

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(newPassword, salt);

  await user.update({ password_hash });
  return { message: "Password changed successfully" };
};

export const deleteUser = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  await user.destroy();
  return { message: "User deleted successfully" };
};

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password_hash"] },
  });
};

export const changeUserRole = async (
  userId: number,
  role: "admin" | "employer" | "candidate",
) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  await user.update({ role });
  return user;
};

export const getUsersByRole = async (role: string) => {
  return await User.findAll({
    where: {  role: role.toLowerCase()},
    attributes: { exclude: ["password_hash"] },
  });
};
export const getUserByTelegramId = async (telegram_id: number) => {
  const user = await User.findOne({
    where: { telegram_id },
  });
  return user || null;
};
