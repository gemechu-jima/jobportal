import { Context } from 'telegraf';

export const startHandler = async (ctx: Context) => {
    try {
        await ctx.reply('👋 Welcome to Job Portal Bot!');
    } catch (error) {
        console.error('Start handler error:', error);
    }
};
