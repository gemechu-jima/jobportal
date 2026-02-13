import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllApplicationByEmployerId,
  updateApplicationStatus,
} from "../../services/applicationService";
import { Card, Button, Badge, Spinner, Table } from "../../components/common";
import { toast } from "react-toastify";
import type { JobApplication } from "../../types/application";

const Application = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "reviewed" | "accepted" | "rejected">("all");

  const userId = Number(user?.id);

  const fetchData = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await getAllApplicationByEmployerId(userId);
      setApplications(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleStatusUpdate = async (
    applicationId: number,
    status: "new" | "reviewed" | "accepted" | "rejected",
  ) => {
    try {
      await updateApplicationStatus(applicationId, status);
      toast.success(`Application updated to ${status}`);
      fetchData(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const columns = [
    {
      header: "Candidate",
      accessor: (item: JobApplication) => (
        <div>
          <p className="font-semibold text-text-main">{item.Applicant?.name}</p>
          <p className="text-sm text-text-muted">{item.Applicant?.email}</p>
        </div>
      ),
    },
    {
      header: "Job Title",
      accessor: (item: JobApplication) => (
        <span className="font-medium">{item.Job?.title || "Unknown Job"}</span>
      ),
    },
    {
      header: "Applied Date",
      accessor: (item: JobApplication) =>
        new Date(item.created_at).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (item: JobApplication) => (
        <Badge
          variant={
            item.status === "accepted"
              ? "success"
              : item.status === "rejected"
                ? "danger"
                : item.status === "reviewed"
                  ? "warning"
                  : "gray"
          }
        >
          {item.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (item: JobApplication) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusUpdate(item.id, "reviewed")}
          >
            Review
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleStatusUpdate(item.id, "accepted")}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleStatusUpdate(item.id, "rejected")}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-text-main mb-2">
          All Applications
        </h1>
        <p className="text-text-muted">
          Manage all incoming applications across your job postings
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 text-center">
          <p className="text-text-muted text-xs mb-1">Total</p>
          <p className="text-2xl font-bold text-primary">
            {applications.length}
          </p>
        </Card>
        {/* Add more stat cards here if needed, similar to JobApplications code */}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {(["all", "new", "reviewed", "accepted", "rejected"] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                filter === status
                  ? "bg-white dark:bg-gray-700 shadow-sm text-primary"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {status} (
              {status === "all"
                ? applications.length
                : applications.filter((a) => a.status === status).length}
              )
            </button>
          ),
        )}
      </div>

      {/* Main Content */}
      {filteredApplications.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="text-xl font-semibold text-text-main mb-2">
            No applications found
          </h3>
          <p className="text-text-muted">
            No {filter !== "all" ? filter : ""} applications to show.
          </p>
        </Card>
      ) : (
        <Card>
          <Table data={filteredApplications} columns={columns} />
        </Card>
      )}
    </div>
  );
};

export default Application;
