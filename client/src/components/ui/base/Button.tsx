import clsx from 'clsx';

interface IButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  modifier?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

// not finished yet
const Button: React.FC<IButtonProps> = ({ modifier = 'primary', type = 'button', disabled, children, ...props }) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md',
        modifier === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-black'
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
