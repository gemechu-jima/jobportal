import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, Input, Button } from '../common';
import { toast } from 'react-toastify';

export const ProfileSection = () => {
    const { updateProfile, getProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setFormData({
                    username: profile.username,
                    email: profile.email
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateProfile(formData);
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Profile Information" subtitle="Update your personal details">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <div className="flex justify-end">
                    <Button type="submit" isLoading={isLoading}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export const SettingsSection = () => {
    const { changePassword, deleteAccount } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setIsLoading(true);
        try {
            await changePassword({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });
            toast.success("Password changed successfully!");
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            toast.error(error.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteAccount();
                toast.success("Account deleted successfully");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete account");
            }
        }
    };

    return (
        <div className="space-y-6">
            <Card title="Change Password" subtitle="Ensure your account is using a long, random password to stay secure.">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                        required
                    />
                    <Input
                        label="New Password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        required
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        required
                    />
                    <div className="flex justify-end">
                        <Button type="submit" variant="primary" isLoading={isLoading}>
                            Update Password
                        </Button>
                    </div>
                </form>
            </Card>

            <Card title="Delete Account" className="border-danger/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-text-main font-semibold">Permanently delete your account</p>
                        <p className="text-xs text-text-muted mt-1">Once your account is deleted, all of its resources and data will be permanently deleted.</p>
                    </div>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete Account
                    </Button>
                </div>
            </Card>
        </div>
    );
};
