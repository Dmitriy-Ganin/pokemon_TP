import { Navigate, createBrowserRouter } from 'react-router'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { AuthForm } from '../pages/AuthForm'
import { ROUTES } from '../constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.AUTH,
    element: <AuthForm />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} />,
  },
]);