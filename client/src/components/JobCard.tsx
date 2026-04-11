import React from "react";

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{job.position}</h2>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[job.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {job.status}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-6">
        Applied on: {new Date(job.createdAt).toLocaleDateString()}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition-colors font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
