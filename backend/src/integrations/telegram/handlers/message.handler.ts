import { Context } from "telegraf";
import { candidateMessageHandler} from "./candidate.handler";
import { employerButtonsHandler} from "./employer.handler";
import { adminButtonsHandler } from "./admin.handler";
import {BUTTONS} from "../constant/buttons";
export const messageHandler = async (ctx: Context) => {
    if (!("text" in ctx.message!)) return;
    const text = ctx.message.text;
    console.log("text 1", text)

    if (BUTTONS.CANDIDATE.includes(text)){
        return candidateMessageHandler(ctx);
    }

    if (BUTTONS.EMPLOYER.includes(text)) {
        return employerButtonsHandler(ctx);
    }

    if (BUTTONS.ADMIN.includes(text)){
    
        return adminButtonsHandler(ctx);
    }
};