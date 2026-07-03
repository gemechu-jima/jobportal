import { Context } from 'telegraf';
import { adminButtonsHandler } from './admin.handler';
import { employerButtonsHandler } from './employer.handler';
import { candidateMessageHandler } from './candidate.handler';
export const callbackHandler = async (ctx: Context) => {
    const data = (ctx.callbackQuery as any)?.data;

    if (!data) return;

    if (data.startsWith('ADMIN_')) {
        return adminButtonsHandler(ctx);
    }
    if (data.startsWith('EMP_')) {
        return employerButtonsHandler(ctx);
    }
    if (data.startsWith('CAN_')) {
        return candidateMessageHandler(ctx);
    }


    await ctx.answerCbQuery();
};
