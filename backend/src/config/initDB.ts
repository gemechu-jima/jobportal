import { sequelize } from './database';
import { User } from '../modules/users/user.model';
import { Job } from '../modules/jobs/job.model';
import { Applicant } from '../modules/applications/application.model';
import { JobApplication } from '../modules/applications/job-application.model';
import { AuthToken } from '../modules/auth/auth.model';

const initDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database tables synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database tables:', error);
        throw error;
    }
};

export default initDB;
