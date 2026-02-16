import { bot } from './bot';
import { registerHandlers } from './handlers';

export const initTelegramBot = () => {
    registerHandlers(bot);

    bot.launch()
        .then(() => {
            console.log('✅ Telegram bot started');
        })
        .catch((err) => {
            console.error('❌ Telegram bot failed to start:', err);
        });
};
