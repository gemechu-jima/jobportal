import { Context, MiddlewareFn } from 'telegraf';

export const telegramAuth: MiddlewareFn<Context> = async (ctx, next) => {
    try {
        const telegramId = ctx.from?.id;

        if (!telegramId) {
            await ctx.reply('Unable to identify user.');
            return;
        }

        // TODO: Replace with real DB check later
        // const user = await User.findOne(...)

        return next();
    } catch (error) {
        console.error('Telegram auth middleware error:', error);
        await ctx.reply('Authentication error.');
    }
};
