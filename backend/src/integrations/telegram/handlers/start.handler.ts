import axios from "axios";
import { Context } from "telegraf";
import { employerKeyboard } from "../keyboards/employer.keyboard";
import { candidateKeyboard } from "../keyboards/candidate.keyboard";
import { adminKeyboard } from "../keyboards/admin.keyboard";

const sessions = new Map<number, string>();

export const startHandler = async (ctx: Context) => {
  try {
    const telegram_id = ctx.from?.id;
    const username = ctx.from?.username || "";
    const firstName = ctx.from?.first_name || "";
    const lastName = ctx.from?.last_name || "";

    if (!telegram_id) return;

    // Try login first
    const loginResponse = await axios.post(
      "http://localhost:5000/auth/telegram-login",
      { telegram_id }
    );

    let { token, user } = loginResponse.data;
    sessions.set(telegram_id, token);

    // If user not found, register via API
    if (!user) {
      const registerResponse = await axios.post(
        "http://localhost:5000/auth/register-with-telegram",
        {
          telegram_id,
          username,
          firstName,
          lastName,
          role: "candidate",
        }
      );

      user = registerResponse.data.user;
      token = registerResponse.data.token;
      sessions.set(telegram_id, token);
    }

    console.log("user data", user);

    // Role-based reply
    switch (user.role) {
      case "admin":
        return ctx.reply("Admin Panel", adminKeyboard);
      case "employer":
        return ctx.reply("Employer Panel", employerKeyboard);
      default:
        return ctx.reply("Candidate Panel", candidateKeyboard);
    }
  } catch (error) {
    console.error("Error in startHandler:", error);
    return ctx.reply("Something went wrong. Please try again later.");
  }
};