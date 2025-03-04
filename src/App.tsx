import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Pages/AppLayout';
import { HomePage } from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SingupPage from './Pages/SingupPage';
import DashboardPage from './Pages/DashboardPage';
import TaskListPage from './Pages/TaskListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
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
        element: <SingupPage />,
      },
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
]);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
