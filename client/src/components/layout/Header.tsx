import Button from '../ui/base/Button';

import useAppDispatch from '../../hooks/app/app-dispatch';
import { logout } from '../../store/auth/auth-actions';

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="w-full h-full flex items-center justify-between px-[20px]">
      <div>logo</div>
      <div className="flex items-center justify-between ml-[10px]">
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
