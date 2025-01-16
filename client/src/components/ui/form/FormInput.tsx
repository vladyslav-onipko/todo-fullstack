import { type FieldErrors, type FieldValues, type UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FormInput: React.FC<IFormInputProps> = ({ label, id, disabled, required, type, register, errors, ...props }) => {
  return (
    <div className="mb-[15px] mt-[15px] pb-[5px] relative">
      <label htmlFor={id}>{label}</label>
      <input
        className={clsx(
          `
          form-input 
          block 
          rounded-md 
          border-0 
          shadow-sm 
          ring-1 
          ring-inset
           ring-gray-300 
           focus:right-2 
           focus:ring-inset`,
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50 cursor-default'
        )}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        {...props}
      />
      {errors[id] && <span className="absolute left-0 bottom-0">{errors[id].message as string}</span>}
    </div>
  );
};

export default FormInput;
