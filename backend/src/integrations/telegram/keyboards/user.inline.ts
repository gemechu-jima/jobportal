export const userInlineKeyboard = (userId:number)=>({
   
                        inline_keyboard: [
                            [
                                {
                                    text: "✅ Activate",
                                    callback_data: `USER_ACTIVATE_${userId}`,
                                },
                                {
                                    text: "⛔ Deactivate",
                                    callback_data: `USER_DEACTIVATE_${userId}`,
                                },
                            ],
                            [
                                {
                                    text: "✏️ Edit",
                                    callback_data: `USER_EDIT_${userId}`,
                                },
                                {
                                    text: "🗑 Delete",
                                    callback_data: `USER_DELETE_${userId}`,
                                },
                            ],
                            [
                                {
                                    text: "📄 View Jobs",
                                    callback_data: `USER_JOBS_${userId}`,
                                },
                                {
                                    text: "📊 Statistics",
                                    callback_data: `USER_STATS_${userId}`,
                                },
                            ],
                        ],
                    
})

