import { Context } from 'telegraf';
import * as adminService from "../services/admin.service"
export const adminMessageHandler = async (ctx: Context) => {

    if (!("text" in ctx.message!)) return;

    const text = ctx.message.text
    console.log("text", text)
    switch (text) {

        case "📋 All Jobs":
            return adminService.allJobs(ctx)
        case "👥 All Users":
            return adminService.getAllUser(ctx)
        case "👤 Empoyer":
            return adminService.getAllEmployer(ctx)
        case "Candidate":
            return adminService.getAllCandidate(ctx)
        default:
            return ctx.reply("Unknown command.");
    }


    
};

export const adminInlineHandler = async (ctx: Context) => {
    if (!ctx.callbackQuery || !("data" in ctx.callbackQuery)) return;

    const data = ctx.callbackQuery.data;

    switch (true) {
        case data.startsWith("USER_ACTIVATE_"):
            // call service
            break;

        case data.startsWith("USER_DEACTIVATE_"):
            // call service
            break;

        case data.startsWith("USER_DELETE_"):
            // call service
            break;

        case data.startsWith("JOB_DELETE_"):
            // call service
            break;

        case data.startsWith("JOB_CLOSE_"):
            // call service
            break;
    }

    await ctx.answerCbQuery();
};
