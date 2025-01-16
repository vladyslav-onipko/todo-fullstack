import { createBrowserRouter } from 'react-router-dom';

import Root from '../components/layout/Root';
import Error from '../pages/Error';
import Index from '../pages/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [{ index: true, element: <Index /> }],
  },
]);

export default router;
