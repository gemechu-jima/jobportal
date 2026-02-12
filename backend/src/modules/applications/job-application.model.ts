import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { Job } from '../jobs/job.model';
import { Applicant } from './application.model';

export class JobApplication extends Model {
    public id!: number;
    public job_id!: number;
    public applicant_id!: number;
    public status!: 'new' | 'reviewed' | 'accepted' | 'rejected';
    public applied_from!: 'website' | 'telegram' | 'facebook';
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

JobApplication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Job,
                key: 'id',
            },
        },
        applicant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Applicant,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('new', 'reviewed', 'accepted', 'rejected'),
            defaultValue: 'new',
            allowNull: false,
        },
        applied_from: {
            type: DataTypes.ENUM('website', 'telegram', 'facebook'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'job_applications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Associations
Job.hasMany(JobApplication, { foreignKey: 'job_id' });
JobApplication.belongsTo(Job, { foreignKey: 'job_id' });

Applicant.hasMany(JobApplication, { foreignKey: 'applicant_id' });
JobApplication.belongsTo(Applicant, { foreignKey: 'applicant_id' });
