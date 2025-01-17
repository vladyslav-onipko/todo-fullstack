import { createBrowserRouter } from 'react-router-dom';

import Root from '../components/layout/Root';
import Error from '../pages/Error';
import Index from '../pages/Index';
import Auth from '../pages/Auth';
import ProtectedRoute from '../components/ui/base/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { element: <ProtectedRoute needAuth />, children: [{ index: true, element: <Index /> }] },
      { element: <ProtectedRoute needAuth={false} />, children: [{ path: '/auth', element: <Auth /> }] },
    ],
  },
]);

export default router;
