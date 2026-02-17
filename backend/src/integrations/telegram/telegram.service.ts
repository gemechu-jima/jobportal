import { bot } from './bot';

export class TelegramService {
    async sendMessage(chatId: number, message: string) {
        await bot.telegram.sendMessage(chatId, message);
    }

    async notifyEmployer(chatId: number, message: string) {
        await this.sendMessage(chatId, `Employer: ${message}`);
    }

    async notifyCandidate(chatId: number, message: string) {
        await this.sendMessage(chatId, `Candidate: ${message}`);
    }

    async notifyAdmin(chatId: number, message: string) {
        await this.sendMessage(chatId, `Admin: ${message}`);
    }
}
