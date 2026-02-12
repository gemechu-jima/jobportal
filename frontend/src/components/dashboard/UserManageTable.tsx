import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Table, Badge, Button, Input, Modal } from '../common';
import { toast } from 'react-toastify';
import type { User } from '../../types/auth';

export const UserManageTable = () => {
    const { listUsers, adminDeleteUser, adminUpdateUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editData, setEditData] = useState({ username: '', email: '' });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await listUsers();
            setUsers(data);
        } catch (error: any) {
            toast.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (user: User) => {
        if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
            try {
                await adminDeleteUser(user.id);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error: any) {
                toast.error(error.message || "Failed to delete user");
            }
        }
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setEditData({ username: user.username, email: user.email });
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            await adminUpdateUser(selectedUser.id, editData);
            toast.success("User updated successfully");
            setIsEditModalOpen(false);
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || "Failed to update user");
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' as const },
        { header: 'Username', accessor: 'username' as const },
        { header: 'Email', accessor: 'email' as const },
        { 
            header: 'Role', 
            accessor: (user: User) => (
                <Badge variant={
                    user.role === 'admin' ? 'danger' : 
                    user.role === 'employer' ? 'primary' : 'gray'
                }>
                    {user.role}
                </Badge>
            )
        },
        {
            header: 'Actions',
            accessor: (user: User) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <>
            <Card title="User Management" subtitle="Manage all registered users on the platform">
                <Table 
                    data={users} 
                    columns={columns} 
                    isLoading={isLoading}
                />
            </Card>

            <Modal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                title="Edit User Profile"
            >
                <div className="space-y-4 pt-4">
                    <Input 
                        label="Username" 
                        value={editData.username} 
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })} 
                    />
                    <Input 
                        label="Email" 
                        value={editData.email} 
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })} 
                    />
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpdateUser}>Update User</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
