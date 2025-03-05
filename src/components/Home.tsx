import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <section className="flex flex-col items-center text-center mt-10 px-6">
        <h1 className="text-4xl font-bold text-gray-800">Organize Your Tasks Efficiently 🚀</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-xl">
          Stay on top of your to-do list with our easy-to-use task management app. Add, track, and
          complete your tasks seamlessly!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      <section className="mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">📅 Task Scheduling</h3>
          <p className="text-gray-600 mt-2">Set deadlines & reminders to never miss a task.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">✅ Easy Tracking</h3>
          <p className="text-gray-600 mt-2">Mark tasks as completed with a single click.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">🔔 Notifications</h3>
          <p className="text-gray-600 mt-2">Get notified about upcoming tasks & deadlines.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
