import clsx from 'clsx';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modifier?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  widthFull?: boolean;
}

// not finished yet
const Button: React.FC<IButtonProps> = ({
  modifier = 'primary',
  type = 'button',
  disabled,
  widthFull,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'min-w-[100px] text-[1.4rem] ml-[5px] px-4 py-2 rounded-md text-white transition duration-300',
        widthFull && 'w-full',
        modifier === 'primary' && 'bg-sky-500 hover:bg-sky-600',
        modifier === 'secondary' && 'bg-stone-500 hover:bg-stone-600',
        modifier === 'danger' && 'bg-red-500 hover:bg-red-600',
        disabled && 'opacity-50 cursor-default'
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
