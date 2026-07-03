import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log("token",token);
if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined');
}

export const bot = new Telegraf(token);

