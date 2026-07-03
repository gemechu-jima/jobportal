export const adminInlineKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📋 All Jobs', callback_data: 'ADMIN_ALL_JOBS' }],
            [{ text: '👥 All Users', callback_data: 'ADMIN_ALL_USERS' }],
            [{ text: '🛑 Block User', callback_data: 'ADMIN_BLOCK_USER' }]
        ]
    }
};
