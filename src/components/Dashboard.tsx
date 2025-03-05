import React from 'react';

const Dashboard: React.FC = () => {
  const stats = {
    totalTasks: 25,
    tasksCompleted: 40,
    tasksPending: 60,
    avgCompletionTime: '3.5 hrs',
    pendingTasks: 15,
    totalTimeLapsed: '56 hrs',
    totalTimeToFinish: '24 hrs',
  };

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
              <p className="text-3xl font-bold text-green-600">{stats.tasksCompleted}%</p>
              <p className="text-gray-600">Tasks completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.tasksPending}%</p>
              <p className="text-gray-600">Tasks pending</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.avgCompletionTime}</p>
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
              <p className="text-3xl font-bold text-indigo-600">{stats.totalTimeLapsed}</p>
              <p className="text-gray-600">Total time lapsed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">{stats.totalTimeToFinish}</p>
              <p className="text-gray-600">Total time to finish</p>
              <p className="text-sm italic text-gray-500">estimated based on end time</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
