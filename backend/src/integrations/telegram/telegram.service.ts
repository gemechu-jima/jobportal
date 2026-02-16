import { bot } from './bot';

export const sendTelegramMessage = async (
    telegramId: string | number,
    message: string
) => {
    try {
        await bot.telegram.sendMessage(telegramId, message);
    } catch (error) {
        console.error('Error sending telegram message:', error);
    }
};
