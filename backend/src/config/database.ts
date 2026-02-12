import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.db || 'jobportal',
    process.env.db_user || 'postgres',
    process.env.db_ps || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: 'postgres',
        logging: false, // Set to console.log if you want to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected with Sequelize');
    } catch (error) {
        console.error('Sequelize connection error:', error);
        process.exit(1);
    }
};

export { sequelize };
export default connectDB;
