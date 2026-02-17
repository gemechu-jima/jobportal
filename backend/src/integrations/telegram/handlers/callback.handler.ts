import { Context } from 'telegraf';
import { adminHandler } from './admin.handler';

export const callbackHandler = async (ctx: Context) => {
    const data = (ctx.callbackQuery as any)?.data;

    if (!data) return;

    if (data.startsWith('ADMIN_')) {
        return adminHandler(ctx);
    }

    await ctx.answerCbQuery();
};
