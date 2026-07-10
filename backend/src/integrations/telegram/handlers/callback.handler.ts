import { Context } from 'telegraf';
import { adminInlineHandler } from './admin.handler';
import { employerMessageHandler } from './employer.handler';
import { candidateMessageHandler } from './candidate.handler';
export const callbackHandler = async (ctx: Context) => {
    const data = (ctx.callbackQuery as any)?.data;

    if (!data) return;

    if (data.startsWith('ADMIN_')) {
        return adminInlineHandler(ctx);
    }
    if (data.startsWith('EMP_')) {
        return employerMessageHandler(ctx);
    }
    if (data.startsWith('CAN_')) {
        return candidateMessageHandler(ctx);
    }
    if (data.startsWith("USER")){
        return adminInlineHandler(ctx);
    }


    await ctx.answerCbQuery();
};
