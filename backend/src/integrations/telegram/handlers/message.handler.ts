import { Context } from "telegraf";
import { candidateMessageHandler} from "./candidate.handler";
import { employerButtonsHandler} from "./employer.handler";
import { adminButtonsHandler } from "./admin.handler";

export const messageHandler = async (ctx: Context) => {
    if (!("text" in ctx.message!)) return;

    const text = ctx.message.text;

    if (
        [
            "🔎 Browse Jobs",
            "📄 My Applications",
            "👤 Profile",
            "❤️ Saved Jobs"
        ].includes(text)
    ) {
        return candidateMessageHandler(ctx);
    }

    if (
        [
            "📊 My Jobs",
            "👀 View Applications",
            "❌ Close Job"
        ].includes(text)
    ) {
        return employerButtonsHandler(ctx);
    }

    if (
        [
            "👥 Users",
            "💼 Jobs",
            "📊 Dashboard"
        ].includes(text)
    ) {
        return adminButtonsHandler(ctx);
    }
};