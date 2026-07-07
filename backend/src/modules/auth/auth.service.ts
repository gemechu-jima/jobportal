import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { AuthToken } from "./auth.model";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// register in two way from browser and telegram
export const register = async (userData: any) => {
  const { username, email, password, role } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password_hash,
    role: role || "candidate",
  });

  return user;
};

export const registerWithTelegramData = async (telegramData: any) => {
  const { telegram_id, username, firstName, lastName } = telegramData;

  const existingUser = await User.findOne({
    where: { telegram_id },
  });

  if (existingUser) return existingUser;

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash("123456", salt); // must be string

  const user = await User.create({
    telegram_id,
    email: username
      ? `${username}@telegram.local`
      : `${firstName}@telegram.local`,
    username: `${firstName || ""} ${lastName || ""}`.trim() || username,
    password_hash,
    role: "candidate",
  });
const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return{ user, token:accessToken};
};

/*
  login(): Verify email + password, generate JWT token
 */
export const login = async (credentials: any) => {
  const { email, password } = credentials;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Store refresh token for logout functionality
  await AuthToken.create({
    user_id: user.id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};
export const loginWithTelegramId=async (telegram_id:string)=>{
  try {
    const user=await User.findOne({where:{telegram_id}})
    if(!user){
      throw new Error("User not found")
    }
    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    // Store refresh token for logout functionality
    await AuthToken.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
}
    

/*
 logout(): Token invalidation (deletes refresh token)
 */
export const logout = async (refreshToken: string) => {
  await AuthToken.destroy({ where: { token: refreshToken } });
};
