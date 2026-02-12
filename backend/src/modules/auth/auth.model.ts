import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';
import { User } from '../users/user.model';

export class AuthToken extends Model {
    public id!: number;
    public user_id!: number;
    public token!: string;
    public expires_at!: Date;
    public readonly created_at!: Date;
}

AuthToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'auth_tokens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    }
);

User.hasMany(AuthToken, { foreignKey: 'user_id' });
AuthToken.belongsTo(User, { foreignKey: 'user_id' });
