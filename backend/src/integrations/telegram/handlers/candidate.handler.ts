import { Context } from 'telegraf';
import * as jobService from "../../../modules/jobs/job.service"
export const candidateButtonsHandler = async (ctx: Context) => {
    if (!("data" in ctx.callbackQuery!)) return;
    const action = ctx.callbackQuery.data;
    try {
        switch (action) {
            case "CAN_BROWSE_JOBS":
                console.log("browser jobs")
                const jobs = await jobService.getAllJobs();

                if (!jobs.length) {
                    await ctx.reply("📭 No jobs available at the moment.");
                    break;
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
                                        }
                                    ],
                                    [
                                        {
                                            text: "🌐 View Details",
                                            url: `https://yourwebsite.com/jobs/${job.id}`
                                        }
                                    ]
                                ]
                            }
                        }
                    );
                }
                break;
            case "CAN_MY_APPLICATIONS":
                console.log("my application")
                break;
            case "CAN_UPDATE_PROFILE":
                // logic implement here
                break;
            case "CAN_UPDATE_MY_APPLICATIONS":
                // logic implement here
                break
            default:
            // logic implement here


        }
    } catch (error) {
        console.error('MyJobs handler error:', error);
    }
};
