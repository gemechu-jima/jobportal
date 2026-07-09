import { Context } from "telegraf";
import * as jobService from "../../../modules/jobs/job.service";
import * as userService from "../../../modules/users/user.service"
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
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "close",
                                callback_data: `APPLY_${job.id}`
                            },
                            {
                                text: "delete",
                                callback_data: `SAVE_${job.id}`
                            },
                            {
                                text: "📄 View Detail",
                                url: `https://example.com/jobs/${job.id}`
                            }
                        ]
                    ]
                }
            }
        );
    }

}
export async function getAllUser(ctx:Context){
   const users=await userService.getAllUsers()
   if(!users.length) return ctx.reply("No User avaliables")
    for (const user of users){
     await ctx.reply(`
        ${user.username}
        ${user.email}
        ${user.role}
        `,
        {
            reply_markup:{
                inline_keyboard:[
                    [
                        {text:"active", callback_data:`do active`},
                        {text:"inactive", callback_data:`do active`}

                    ]
                ]
            }
        }
     )
}
}

export async function getAllEmployer(ctx:Context){
   return await ctx.reply("employer here")
}

export async function getAllCandidate(ctx:Context){
return await ctx.reply("Condidate here")
}