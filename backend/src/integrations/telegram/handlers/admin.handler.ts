import { Context } from 'telegraf';

export const adminHandler = async (ctx: Context) => {
    const data = (ctx.callbackQuery as any)?.data;

    if (!data) return;

    if (data === 'ADMIN_ALL_JOBS') {
        await ctx.reply('Showing all jobs...');
    }

    if (data === 'ADMIN_ALL_USERS') {
        await ctx.reply('Showing all users...');
    }

    if (data === 'ADMIN_BLOCK_USER') {
        await ctx.reply('Select user to block...');
    }

    await ctx.answerCbQuery();
};
