import app from './app';
import { env } from './config/env';
import connectDB from './config/database';
import initDB from './config/initDB';

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
