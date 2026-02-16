import { Context } from 'telegraf';

export const myJobsHandler = async (ctx: Context) => {
    try {
        await ctx.reply('MyJobs command received.');
    } catch (error) {
        console.error('MyJobs handler error:', error);
    }
};
