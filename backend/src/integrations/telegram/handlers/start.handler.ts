import { Context } from "telegraf";
import { employerKeyboard } from "../keyboards/employer.keyboard";
import { candidateKeyboard } from "../keyboards/candidate.keyboard";
import { adminKeyboard } from "../keyboards/admin.keyboard";
import { getUserByTelegramId } from "../../../modules/users/user.service"; // your service
import { registerWithTelegram } from "../../../modules/auth/auth.service";
export const startHandler = async (ctx: Context) => {
  const telegram_id = ctx.from?.id;
  const username = ctx.from?.username || "";
  const firstName = ctx.from?.first_name;
  const lastName = ctx.from?.last_name || "";

  if (!telegram_id) return;

  let user = await getUserByTelegramId(telegram_id);
  if (!user) {
    user = await registerWithTelegram({
      telegram_id: telegram_id,
      username,
      firstName,
      lastName,
      role: "candidate",
    });
  }
  console.log("user data", user);
  if (user.role === "admin") {
    return ctx.reply("Admin Panel", adminKeyboard);
  }

  if (user.role === "employer") {
    return ctx.reply("Employer Panel", employerKeyboard);
  }

  if (user.role === "candidate") {
    return ctx.reply("Candidate Panel", candidateKeyboard);
  }
};
