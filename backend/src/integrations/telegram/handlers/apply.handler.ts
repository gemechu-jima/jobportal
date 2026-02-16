import { Context } from 'telegraf';

export const applyHandler = async (ctx: Context) => {
    try {
        await ctx.reply('Apply command received.');
    } catch (error) {
        console.error('Apply handler error:', error);
    }
};
