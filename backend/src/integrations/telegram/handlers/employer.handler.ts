import { Context } from 'telegraf';

export const employerMessageHandler = async (ctx: Context) => {
    const callbackData = (ctx.callbackQuery as any)?.data;

    if (!callbackData) return;

    if (callbackData === 'my_jobs') {
        await ctx.reply('Here are your jobs...');
    }

    if (callbackData === 'view_applications') {
        await ctx.reply('Here are job applications...');
    }

    if (callbackData === 'close_job') {
        await ctx.reply('Select job to close...');
    }

    await ctx.answerCbQuery();
};
 export const employerInlineHandler=async (ctx: Context)=>{

 }