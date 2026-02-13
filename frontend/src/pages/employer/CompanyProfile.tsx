import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Badge, Spinner } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
// Assume these services exist in your project
// import { getEmployerProfile } from '../../services/employerService'; 
import { toast } from 'react-toastify';

const CompanyProfile = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Placeholder data for styling - Replace with your API call
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                // const data = await getEmployerProfile(id);
                // setProfile(data);
                
                // Mocking data for visualization
                setProfile({
                    companyName: "TechFlow Systems",
                    industry: "Software Development",
                    companySize: "50-200 Employees",
                    website: "https://techflow.example.com",
                    location: "San Francisco, CA",
                    description: "TechFlow is a leading provider of cloud-native solutions. We focus on building scalable infrastructure for the next generation of fintech applications.",
                    logo: "https://via.placeholder.com/150",
                    founded: "2015",
                    activeJobsCount: 12
                });
            } catch (error: any) {
                toast.error("Could not load company profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            {/* Header / Cover Section */}
            <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-32 bg-gradient-to-r from-primary to-blue-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12">
                        <div className="flex items-end gap-6">
                            <img 
                                src={profile.logo} 
                                alt="Logo" 
                                className="w-32 h-32 rounded-xl border-4 border-white bg-white shadow-md object-contain"
                            />
                            <div className="mb-2">
                                <h1 className="text-3xl font-bold text-text-main">{profile.companyName}</h1>
                                <p className="text-text-muted flex items-center gap-2">
                                    <span className="font-medium text-primary">{profile.industry}</span> 
                                    • {profile.location}
                                </p>
                            </div>
                        </div>
                        {user?.role === 'employer' && (
                            <Button variant="outline" className="mb-2">Edit Profile</Button>
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Stats & Links */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Website</p>
                                <a href={profile.website} className="text-primary hover:underline break-all">
                                    {profile.website}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Company Size</p>
                                <p className="font-medium">{profile.companySize}</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Founded</p>
                                <p className="font-medium">{profile.founded}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-primary/5 border-primary/10">
                        <div className="text-center">
                            <p className="text-sm text-text-muted mb-1">Active Vacancies</p>
                            <p className="text-4xl font-bold text-primary">{profile.activeJobsCount}</p>
                            <Button className="w-full mt-4" variant="primary">View All Jobs</Button>
                        </div>
                    </Card>
                </div>

                {/* Right Column: About & Content */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">About the Company</h3>
                        <div className="prose dark:prose-invert max-w-none text-text-muted leading-relaxed">
                            {profile.description}
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">Culture & Benefits</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="gray">Remote Friendly</Badge>
                            <Badge variant="gray">Health Insurance</Badge>
                            <Badge variant="gray">Stock Options</Badge>
                            <Badge variant="gray">Flexible Hours</Badge>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;