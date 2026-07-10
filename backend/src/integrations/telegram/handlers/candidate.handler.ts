import { Context } from "telegraf";
import * as candidateService from "../services/candidate.service";

export const candidateMessageHandler = async (ctx: Context) => {
    if (!("text" in ctx.message!)) return;

    const text = ctx.message.text;

    switch (text) {
        case "🔎 Browse Jobs":
            return candidateService.browseJobs(ctx);

        case "📄 My Applications":
            return candidateService.myApplications(ctx);

        case "👤 Profile":
            return candidateService.profile(ctx);

        case "❤️ Saved Jobs":
            return candidateService.savedJobs(ctx);

        default:
            return ctx.reply("Unknown command.");
    }
};

export const candidateInlineHandler=async (ctx: Context)=>{

}