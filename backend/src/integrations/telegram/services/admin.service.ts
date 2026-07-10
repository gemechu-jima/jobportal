import { Context } from "telegraf";
import * as jobService from "../../../modules/jobs/job.service";
import * as userService from "../../../modules/users/user.service"
import { userInlineKeyboard } from "../keyboards/user.inline";
import { jobInlineKeyboard } from "../keyboards/job.inline";
export async function allJobs(ctx:Context){
 const jobs = await jobService.getAllJobs();

    if (!jobs.length) {
        return ctx.reply("📭 No jobs available.");
    }
    for (const job of jobs) {
        await ctx.reply(
            `${job.title}
            ${job.company_name}
             ${job.location}`,
            {
                reply_markup: jobInlineKeyboard(job.id)
            }
        );
    }

}
export async function getAllUser(ctx: Context) {
    try {
        const users = await userService.getAllUsers();

        if (!users.length) {
            return ctx.reply("📭 No users found.");
        }

        for (const user of users) {
            await ctx.reply(
   `👤 *User Information*
    🪪 *Name:* ${user.username}
    📧 *Email:* ${user.email}
    🎭 *Role:* ${user.role}
    🆔 *ID:* ${user.id}`,
                {
                    reply_markup: userInlineKeyboard(user.id )
                }
            );
        }
    } catch (error) {
        console.error(error);
        return ctx.reply("❌ Failed to load users.");
    }
}

export async function getAllEmployer(ctx: Context) {
    try {
        const users = await userService.getUsersByRole("employer");

        if (!users.length) {
            return ctx.reply("📭 No employers found.");
        }

        for (const user of users) {
            await ctx.reply(
                `👤 ${user.username}
                📧 ${user.email}
                🆔 ${user.id}`,
                {
                    reply_markup: userInlineKeyboard(user.id)
                }
            );
        }
    } catch (error) {
        console.error(error);
        return ctx.reply("❌ Failed to load employers.");
    }
}

export async function getAllCandidate(ctx:Context){
   try {
    const users=await userService.getUsersByRole("candidate")
    if(!users.length) return ctx.reply("No candidate avaiable");
    for (let user of users){
        return ctx.reply(`
            * user Information *
    🪪 *Name:* ${user.username}
    📧 *Email:* ${user.email}
    🎭 *Role:* ${user.role}
    🆔 *ID:* ${user.id}
            `,{
                reply_markup:userInlineKeyboard(user.id)
            }
        )
    }
   } catch (error) {
    
   }
}