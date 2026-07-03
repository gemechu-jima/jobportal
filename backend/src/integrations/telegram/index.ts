import { bot } from './bot';
import { startHandler } from './handlers/start.handler';
import { callbackHandler } from './handlers/callback.handler';

bot.start(startHandler);
bot.on('callback_query', callbackHandler);

export const initTelegramBot = async () => {
  try {
    await bot.launch();
    console.log("Telegram bot started");
  } catch (err) {
    console.error("Telegram launch failed:", err);
  }
};
