"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import JobCard from "../../components/JobCard";
import JobForm from "../../components/JobForm";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [router]);

  const handleAddJob = async (jobData: Omit<Job, "_id" | "createdAt">) => {
    try {
      const { data } = await API.post("/jobs", jobData);
      setJobs([...jobs, data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleEditJob = async (jobData: Omit<Job, "_id" | "createdAt">) => {
    try {
      const { data } = await API.put(`/jobs/${editingJob?._id}`, jobData);
      setJobs(jobs.map((job) => (job._id === editingJob?._id ? data : job)));
      setIsFormOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const openEditForm = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || job.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [jobs, searchTerm, filterStatus]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    };
    jobs.forEach((job) => {
      if (counts[job.status] !== undefined) {
        counts[job.status]++;
      }
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));
  }, [jobs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
        <button
          onClick={() => {
            setEditingJob(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          + Add New Job
        </button>
      </div>

      {jobs.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 h-80">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Application Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by company or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white min-w-[150px]"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No job applications found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={openEditForm}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <JobForm
          initialData={editingJob}
          onSubmit={editingJob ? handleEditJob : handleAddJob}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
}
