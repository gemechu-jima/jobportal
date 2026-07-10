import app from './src/app';
import { env } from './src/config/env';
import connectDB from './src/config/database';
import initDB from './src/config/initDB';
import { initTelegramBot } from './src/integrations/telegram';

initTelegramBot();

const startServer = async () => {
    try {
        await connectDB();
        await initDB();
        
        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
