export const jobInlineKeyboard = (jobId:number)=>({
    
                        inline_keyboard: [
                            [
                                {
                                    text: "close",
                                    callback_data: `APPLY_${jobId}`
                                },
                                {
                                    text: "delete",
                                    callback_data: `SAVE_${jobId}`
                                },
                                {
                                    text: "📄 View Detail",
                                    url: `https://example.com/jobs/${jobId}`
                                }
                            ]
                        ]
                    })

