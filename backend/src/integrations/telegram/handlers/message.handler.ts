import { Context } from "telegraf";
import { candidateMessageHandler} from "./candidate.handler";
import { employerMessageHandler} from "./employer.handler";
import { adminMessageHandler } from "./admin.handler";
import {BUTTONS} from "../constant/buttons";
export const messageHandler = async (ctx: Context) => {
    if (!("text" in ctx.message!)) return;
    const text = ctx.message.text;
    console.log("text 1", text)

    if (BUTTONS.CANDIDATE.includes(text)){
        return candidateMessageHandler(ctx);
    }

    if (BUTTONS.EMPLOYER.includes(text)) {
        return employerMessageHandler(ctx);
    }

    if (BUTTONS.ADMIN.includes(text)){
    
        return adminMessageHandler(ctx);
    }
};