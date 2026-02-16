import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  Input,
  Select,
  Button,
  Badge,
  Spinner,
} from "../../components/common";
import { getAllJobs, getJobsByFilter } from "../../services/jobService";
import type { Job } from "../../types/job";

const JobListing = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
  });

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      let data;
      if (filters.keyword || filters.location || filters.type) {
        data = await getJobsByFilter(filters);
      } else {
        data = await getAllJobs();
      }
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilters({
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || "",
      type: searchParams.get("type") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);
  const recentJobs = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text-main mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-text-muted">
          Thousands of opportunities are waiting for you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card title="Filters" className="p-6">
            <div className="space-y-4">
              <Input
                label="Search Keyword"
                placeholder="Job title, company..."
                value={filters.keyword}
                onChange={(e) =>
                  setFilters({ ...filters, keyword: e.target.value })
                }
              />
              <Input
                label="Location"
                placeholder="City or Remote"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
              <Select
                label="Job Type"
                options={[
                  { label: "All Types", value: "" },
                  { label: "Full-time", value: "full-time" },
                  { label: "Part-time", value: "part-time" },
                  { label: "Contract", value: "contract" },
                  { label: "Remote", value: "remote" },
                ]}
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              />
              <Button
                variant="outline"
                fullWidth
                onClick={() =>
                  setFilters({ keyword: "", location: "", type: "" })
                }
              >
                Clear All
              </Button>
            </div>
          </Card>
        </aside>

        {/* Job List */}
        <main className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : jobs.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="text-xl font-semibold text-text-main mb-2">
                No jobs found
              </h3>
              <p className="text-text-muted">
                Try adjusting your filters to find more results.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <Link key={job.id} to={`${job.id}`}>
                  <Card className="p-6 hover:shadow-xl hover:border-primary transition-all group overflow-hidden relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                            {job.title}
                          </h2>
                          <Badge
                            variant={
                              job.job_type === "full-time"
                                ? "primary"
                                : job.job_type === "remote"
                                  ? "success"
                                  : job.job_type === "contract"
                                    ? "warning"
                                    : "gray"
                            }
                          >
                            {job.job_type.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-lg font-medium text-text-main mb-1">
                          {job.company_name}
                        </p>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-text-muted">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {job.location}
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {job.salary_range}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {new Date(job.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          className="group-hover:bg-primary/10"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Recent Jobs Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card title="Recent Postings" className="p-4">
            <div className="space-y-4">
              {recentJobs.length > 0 ? (
                <>
                  {recentJobs.map((job) => (
                    <Link
                      key={`recent-${job.id}`}
                      to={`/jobs/${job.id}`}
                      className="block group border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <h4 className="text-md font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-[15px] text-text-muted mb-1">
                        {job.company_name}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] text-primary font-medium bg-primary/5 px-2 py-0.5 rounded">
                          {job.location}
                        </span>
                        <span className="text-[12px] text-text-muted">
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}

                  {/* See More Link */}
                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      fullWidth
                      size="sm"
                      className="text-primary text-sm font-bold hover:bg-primary/5"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      See All Jobs →
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-xs text-text-muted text-center py-4">
                  No recent jobs found.
                </p>
              )}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default JobListing;
