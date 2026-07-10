 export const adminKeyboard={
     reply_markup: {
            keyboard: [
                [{text:"📊 Dashboard"}],
                [{ text: "📋 All Jobs" },{text: "👥 All Users" }],
                [{ text: "👤 Empoyer" }, { text: "Candidate" }]
            ],
            resize_keyboard: true,
            persistent: true
        }
    }