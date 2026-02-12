import { User } from './user.model';


export const getUserById = async (userId: number) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password_hash'] }
    });
    if (!user) throw new Error('User not found');
    return user;
};


export const updateUser = async (userId: number, data: any) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    // Prevent updating sensitive fields here if needed
    delete data.password_hash;
    delete data.id;

    await user.update(data);
    return user;
};


export const deleteUser = async (userId: number) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.destroy();
    return { message: 'User deleted successfully' };
};


export const getAllUsers = async () => {
    return await User.findAll({
        attributes: { exclude: ['password_hash'] }
    });
};


export const changeUserRole = async (userId: number, role: 'admin' | 'employer' | 'candidate') => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    await user.update({ role });
    return user;
};


export const getUsersByRole = async (role: string) => {
    return await User.findAll({
        where: { role },
        attributes: { exclude: ['password_hash'] }
    });
};
