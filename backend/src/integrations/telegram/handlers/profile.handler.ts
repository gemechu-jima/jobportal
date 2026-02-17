// telegram/handlers/profile.handler.ts
import { Context } from 'telegraf';
import axios from 'axios';

export const profileHandler = async (ctx: Context) => {
    const telegramId = ctx.from?.id;
    if (!telegramId) return;

    try {
        // Call your backend API to get user profile
        const response = await axios.get(`http://localhost:2000/api/users/profile`, {
            headers: { 'x-telegram-id': telegramId } // or JWT if you have auth
        });

        const user = response.data.data;

        await ctx.reply(
            `👤 Your Profile:\n\n` +
            `Username: ${user.username}\n` +
            `Email: ${user.email}\n` +
            `Role: ${user.role}\n` +
            `${user.telegram_id ? `Telegram ID: ${user.telegram_id}` : ''}`
        );

    } catch (error) {
        console.error(error);
        await ctx.reply('⚠️ Could not fetch profile. Please try again later.');
    }
};
