import { getTaskCountsApi, getTaskTimeMetricsApi } from '@/api/dashboardData.api';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksPending: 0,
    avgCompletionTime: 0, // Changed from string to number
    pendingTasks: 0,
    totalTimeLapsed: 0,
    totalTimeToFinish: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const taskCounts = await getTaskCountsApi();
        const timeMetrics = await getTaskTimeMetricsApi();

        setStats({
          totalTasks: taskCounts.totalTasks,
          tasksCompleted:
            taskCounts.totalTasks > 0
              ? (taskCounts.finishedTasks / taskCounts.totalTasks) * 100
              : 0,
          tasksPending:
            taskCounts.totalTasks > 0 ? (taskCounts.pendingTasks / taskCounts.totalTasks) * 100 : 0,
          avgCompletionTime:
            taskCounts.finishedTasks > 0
              ? timeMetrics.totalTimeTaken / taskCounts.finishedTasks
              : 0,
          pendingTasks: taskCounts.pendingTasks,
          totalTimeLapsed: timeMetrics.totalTimeLapsed,
          totalTimeToFinish: timeMetrics.totalRemainingTime,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalTasks}</p>
              <p className="text-gray-600">Total tasks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats.tasksCompleted.toFixed(1)}%
              </p>
              <p className="text-gray-600">Tasks completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.tasksPending.toFixed(1)}%</p>
              <p className="text-gray-600">Tasks pending</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {stats.avgCompletionTime.toFixed(2)} hrs
              </p>
              <p className="text-gray-600">Avg time per task</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Pending Task Summary</h2>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.pendingTasks}</p>
              <p className="text-gray-600">Pending tasks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">
                {stats.totalTimeLapsed.toFixed(2)} hrs
              </p>
              <p className="text-gray-600">Total time lapsed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">
                {stats.totalTimeToFinish.toFixed(2)} hrs
              </p>
              <p className="text-gray-600">Total time to finish</p>
              <p className="text-sm italic text-gray-500">Estimated based on end time</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
