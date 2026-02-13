import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  Spinner,
  Modal,
  Input,
} from "../../components/common";
import { getJobById } from "../../services/jobService";
import { applyToJob, getMyApplications } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import type { Job } from "../../types/job";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: user?.username || "",
    phone: "",
    cv_link: "",
  });
useEffect(() => {
    const fetchJob = async () => {
        if (!id) return;
        try {
            const data = await getJobById(id);
            setJob(data);

            // --- ADD THIS PART HERE ---
            if (isAuthenticated && user?.role === 'candidate') {
                const myApps = await getMyApplications(Number(user.id));
                const alreadyApplied = myApps.some((app: any) => app.job_id === Number(id));
                setHasApplied(alreadyApplied);
            }
            // --------------------------

        } catch (error: any) {
            toast.error(error.message || 'Job not found');
            navigate('..');
        } finally {
            setIsLoading(false);
        }
    };
    fetchJob();
}, [id, navigate, isAuthenticated, user]); // Added isAuthenticated and user to dependencies

  useEffect(() => {
    if (user?.username) {
      setApplicationData((prev) => ({ ...prev, name: user.username }));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!job) return null;

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in as a candidate to apply");
      navigate("/login");
      return;
    }
    if (user?.role !== "candidate") {
      toast.warning("Only candidates can apply for jobs");
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async () => {
    if (!id) return;

    if (!applicationData.cv_link) {
      toast.error("Please provide your CV link");
      return;
    }

    setIsSubmitting(true);
    try {
      await applyToJob({
        job_id: Number(id),
        name: applicationData.name,
        phone: applicationData.phone || undefined,
        cv_link: applicationData.cv_link,
        applied_from: "website",
      });
      toast.success("Application submitted successfully!");
      setIsApplyModalOpen(false);
      setApplicationData({
        name: user?.username || "",
        phone: "",
        cv_link: "",
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to=".."
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Job Search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant={
                      job.job_type === "full-time"
                        ? "primary"
                        : job.job_type === "remote"
                          ? "success"
                          : "warning"
                    }
                  >
                    {job.job_type.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-text-muted">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-text-main mb-2">
                  {job.title}
                </h1>
                <p className="text-xl font-medium text-primary">
                  {job.company_name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-gray-100 dark:border-gray-800 mb-8">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">
                  Location
                </p>
                <p className="text-sm font-bold text-text-main">
                  {job.location}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">
                  Salary
                </p>
                <p className="text-sm font-bold text-text-main">
                  {job.salary_range || "Competitive"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">
                  Type
                </p>
                <p className="text-sm font-bold text-text-main capitalize">
                  {job.job_type.replace("-", " ")}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase mb-1">
                  Deadline
                </p>
                <p className="text-sm font-bold text-text-main">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-main mb-4">
                  Job Description
                </h3>
                <div className="prose prose-blue dark:prose-invert max-w-none text-text-muted whitespace-pre-wrap">
                  {job.description}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Sticky */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-6">
                About this role
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Applications</span>
                  <span className="font-bold text-text-main">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Views</span>
                  <span className="font-bold text-text-main">340</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Days Left</span>
                  <span className="font-bold text-danger">4 days</span>
                </div>
              </div>
              <Button
                variant={hasApplied ? "success" : "primary"}
                fullWidth
                size="lg"
                onClick={handleApplyClick}
                disabled={hasApplied}
              >
                {hasApplied ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Already Applied
                  </span>
                ) : (
                  "Apply for this job"
                )}
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-4">
                Share this job
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1">
                  LinkedIn
                </Button>
                <Button variant="ghost" className="flex-1">
                  Twitter
                </Button>
              </div>
            </Card>
          </div>
        </aside>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for this Position"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <h4 className="font-semibold text-text-main mb-1">{job.title}</h4>
            <p className="text-sm text-text-muted">{job.company_name}</p>
          </div>

          <Input
            label="Full Name"
            placeholder="Your full name"
            value={applicationData.name}
            onChange={(e) =>
              setApplicationData({ ...applicationData, name: e.target.value })
            }
            required
          />

          <Input
            label="Phone Number (Optional)"
            placeholder="+1 234 567 8900"
            value={applicationData.phone}
            onChange={(e) =>
              setApplicationData({ ...applicationData, phone: e.target.value })
            }
          />

          <Input
            label="CV/Resume Link"
            placeholder="https://drive.google.com/your-cv or https://dropbox.com/your-resume"
            value={applicationData.cv_link}
            onChange={(e) =>
              setApplicationData({
                ...applicationData,
                cv_link: e.target.value,
              })
            }
            required
          />

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-text-muted">
            <p className="font-semibold mb-2">
              📌 Tips for a successful application:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Upload your CV to Google Drive or Dropbox and share the link
              </li>
              <li>Make sure your CV is up-to-date and tailored to this role</li>
              <li>Double-check that the link is accessible</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              variant="ghost"
              onClick={() => setIsApplyModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitApplication}
              isLoading={isSubmitting}
              className="px-8"
            >
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetail;
