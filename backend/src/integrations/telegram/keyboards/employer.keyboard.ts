export const employerKeyboard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📊 My Jobs', callback_data: 'EMP_MY_JOBS' }],
            [{ text: '👀 View Applications', callback_data: 'EMP_VIEW_APPLICATIONS' }],
            [{ text: '❌ Close Job', callback_data: 'EMP_CLOSE_JOB' }]
        ]
    }
};
