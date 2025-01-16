import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

import useAppDispatch from '../../hooks/app/app-dispatch';
import { autoLogin } from '../../store/auth/auth-actions';

const Root = () => {
  const initialized = useRef(true);
  const dispatch = useAppDispatch();

  if (initialized.current) {
    dispatch(autoLogin());
  }

  useEffect(() => {
    initialized.current = false;
  }, []);

  return (
    <div className="w-full h-full flex flex-col min-h-screen overflow-x-hidden">
      <div className="w-full h-[90px]" role="banner">
        <Header />
      </div>
      <main className="w-full h-screen relative" role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
