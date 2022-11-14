import { lazy, Suspense } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import Logo from '../components/Logo';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Logo />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },

    // MAIN Routes
    {
      path: '/',
      element: <Home />,
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// MAIN
const Home = Loadable(lazy(() => import('../pages/Home')));
