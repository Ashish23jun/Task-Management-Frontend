import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Pages/AppLayout';
import { HomePage } from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SingupPage';
import DashboardPage from './Pages/DashboardPage';
import TaskListPage from './Pages/TaskListPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/signup',
            element: <SignupPage />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/list',
            element: <TaskListPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
