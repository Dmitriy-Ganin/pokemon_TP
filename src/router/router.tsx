import { Navigate, createBrowserRouter } from 'react-router'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { AuthForm } from '../pages/AuthForm'

export const router = createBrowserRouter([
  {
    path: import.meta.env.VITE_HOME,
    element: <Home />,
  },
  {
    path: import.meta.env.VITE_AUTH,
    element: <AuthForm />,
    children: [
      {
        path: import.meta.env.VITE_LOGIN,
        element: <Login />,
      },
      {
        path: import.meta.env.VITE_REGISTER,
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={import.meta.env.VITE_HOME} />,
  },
]);