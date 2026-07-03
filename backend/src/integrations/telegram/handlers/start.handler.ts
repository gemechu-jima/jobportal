import axios from "axios";
import { Context } from "telegraf";
import { employerInlineKeyboard } from "../keyboards/employer.inline.keyboard";
import { adminInlineKeyboard } from "../keyboards/admin.inline.keyboard";
import { candidateInlineKeyboard,  } from "../keyboards/candidate.inline.keyboard";
import { candidateKeyboard } from "../keyboards/candidate.reply.keyboard";

import * as userService from "../../../modules/users/user.service"
import * as authService from "../../../modules/auth/auth.service"
const sessions = new Map<number, string>();

export const startHandler = async (ctx: Context) => {
  try {
    const telegram_id = ctx.from?.id;
    const username = ctx.from?.username || "";
    const firstName = ctx.from?.first_name || "";
    const lastName = ctx.from?.last_name || "";

    if (!telegram_id) return;

    let token: string;
    let user: any;

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${telegram_id}`
    );
    if (data.success) {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/telegram-login",
        { telegram_id }
      );

      token = data.token;
      user = data.user;
    } else {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register-with-telegram",
        {
          telegram_id,
          username,
          firstName,
          lastName,
        }
      );
      token = data.token;
      user = data.user;
    }

    sessions.set(telegram_id, token);

    switch (user.role) {
      case "admin":
        return ctx.reply("Admin Panel", adminInlineKeyboard);
      case "employer":
        return ctx.reply("Employer Panel", employerInlineKeyboard);
      default:
        return ctx.reply("Candidate Panel", candidateKeyboard);
    }
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return ctx.reply("Something went wrong. Please try again later.");
  }
};