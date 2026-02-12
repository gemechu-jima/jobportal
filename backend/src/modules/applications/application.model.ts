import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { User } from '../users/user.model';

export class Applicant extends Model {
    public id!: number;
    public user_id!: number | null;
    public name!: string;
    public email!: string;
    public phone!: string | null;
    public cv_link!: string;
    public platform!: 'website' | 'telegram' | 'facebook';
    public readonly applied_at!: Date;
}

Applicant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cv_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platform: {
            type: DataTypes.ENUM('website', 'telegram', 'facebook'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'applicants',
        timestamps: true,
        createdAt: 'applied_at',
        updatedAt: false,
    }
);

// Associations
User.hasOne(Applicant, { foreignKey: 'user_id' });
Applicant.belongsTo(User, { foreignKey: 'user_id' });
