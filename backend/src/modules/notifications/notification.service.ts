import { Telegraf } from 'telegraf';

const bot = process.env.TELEGRAM_BOT_TOKEN ? new Telegraf(process.env.TELEGRAM_BOT_TOKEN) : null;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * sendEmail(): Mock helper to send emails
 */
export const sendEmail = async (to: string, subject: string, body: string) => {
    // TODO: Integrate with Nodemailer or SendGrid
    console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject}`);
    console.log(`[BODY]: ${body}`);
    return { success: true, message: 'Email sent (Mock)' };
};

/**
 * sendTelegramNotification(): Send message to a specific chat or channel
 */
export const sendTelegramNotification = async (message: string) => {
    try {
        if (bot && TELEGRAM_CHAT_ID) {
            await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, message);
            return { success: true };
        } else {
            console.log(`[TELEGRAM MOCK]: ${message}`);
            return { success: true, message: 'Telegram message logged to console (Mock)' };
        }
    } catch (error: any) {
        console.error('Telegram Notification Error:', error.message);
        return { success: false, error: error.message };
    }
};

/**
 * sendApplicationNotification(): Notify employer about a new application
 */
export const sendApplicationNotification = async (data: {
    employerEmail: string;
    jobTitle: string;
    candidateName: string;
}) => {
    const { employerEmail, jobTitle, candidateName } = data;

    // Send Email
    await sendEmail(
        employerEmail,
        `New Applicant for your job: ${jobTitle}`,
        `Hello, ${candidateName} has just applied for your job posting "${jobTitle}". Visit the portal to review their CV.`
    );

    // Send Telegram
    await sendTelegramNotification(
        `🆕 New Application!\nJob: ${jobTitle}\nCandidate: ${candidateName}`
    );
};

/**
 * sendJobPostedNotification(): Notify admins or public channels about a new job
 */
export const sendJobPostedNotification = async (data: {
    jobTitle: string;
    company: string;
    location: string;
}) => {
    const message = `🚀 New Job Posted!\n\n📌 Title: ${data.jobTitle}\n🏢 Company: ${data.company}\n📍 Location: ${data.location}\n\nCheck it out on our Job Portal!`;

    await sendTelegramNotification(message);
};
