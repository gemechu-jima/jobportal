import { Context } from 'telegraf';
import * as adminService from "../services/admin.service"
export const adminButtonsHandler = async (ctx: Context) => {

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


    // if (data === 'ADMIN_ALL_JOBS') {
    //     await ctx.reply('Showing all jobs...');
    // }
    // if (data === 'ADMIN_ALL_USERS') {
    //     await ctx.reply('Showing all users...');
    // }

    // if (data === 'ADMIN_BLOCK_USER') {
    //     await ctx.reply('Select user to block...');
    // }
    // await ctx.answerCbQuery();
};
