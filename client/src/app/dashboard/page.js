'use client'
import { useState, useEffect } from 'react';
import API from '../../services/api';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get('/jobs');
        setJobs(data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [router]);

  if (loading) return <div className="p-8">Loading jobs...</div>;

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map(status => ({
      name: status,
      count: statusCounts[status]
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job Tracker Dashboard</h1>

      <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Application Analytics</h2>
          {chartData.length > 0 ? (
            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          ) : (
              <p>No data to display.</p>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
              <div key={job._id} className="border p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{job.position}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="mt-2 text-sm">Status: <span className="font-semibold">{job.status}</span></p>
              </div>
          ))}
      </div>
    </div>
  );
}
