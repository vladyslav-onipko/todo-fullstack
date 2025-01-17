import { Outlet, Navigate } from 'react-router-dom';

import useAppSelector from '../../../hooks/app/app-selector';

const ProtectedRoute: React.FC<{ needAuth: boolean }> = ({ needAuth }) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth && !needAuth) {
    return <Navigate to="/" replace />;
  }

  if (!isAuth && needAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
