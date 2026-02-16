import { Telegraf } from 'telegraf';
import { startHandler } from './start.handler';
import { applyHandler } from './apply.handler';
import { myJobsHandler } from './myjobs.handler';
import { telegramAuth } from '../middleware/auth.middleware';

export const registerHandlers = (bot: Telegraf) => {
    bot.start(startHandler);

    bot.command('apply', telegramAuth, applyHandler);
    bot.command('myjobs', telegramAuth, myJobsHandler);
};
