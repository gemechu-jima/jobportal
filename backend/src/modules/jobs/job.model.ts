import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { User } from '../users/user.model';

export class Job extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public company_name!: string;
    public location!: string;
    public salary_range!: string;
    public job_type!: 'full-time' | 'part-time' | 'contract' | 'remote';
    public posted_by!: number | null;
    public deadline!: Date;
    public is_active!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary_range: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        job_type: {
            type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'remote'),
            allowNull: false,
        },
        posted_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id',
            },
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'jobs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Associations
User.hasMany(Job, { foreignKey: 'posted_by' });
Job.belongsTo(User, { foreignKey: 'posted_by' });
