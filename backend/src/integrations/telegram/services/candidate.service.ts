import { Context } from "telegraf";
import { candidateInlineKeyboard } from "../keyboards/candidate.inline.keyboard";
import * as jobService from "../../../modules/jobs/job.service";

export const browseJobs = async (ctx: Context) => {
    const jobs = await jobService.getAllJobs();

    if (!jobs.length) {
        return ctx.reply("📭 No jobs available.");
    }

    for (const job of jobs) {
        await ctx.reply(
            `💼 ${job.title}
            🏢 ${job.company_name}
            📍 ${job.location}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "✅ Apply",
                                callback_data: `APPLY_${job.id}`
                            },
                            {
                                text: "❤️ Save",
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
};

export const myApplications = async (ctx: Context) => {
    // Fetch candidate applications
    return ctx.reply("My Applications");
};

export const profile = async (ctx: Context) => {
    // Fetch profile
    return ctx.reply("My Profile");
};

export const savedJobs = async (ctx: Context) => {
    // Fetch saved jobs
    return ctx.reply("Saved Jobs");
};