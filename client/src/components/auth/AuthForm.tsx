import { useCallback, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';

import FormInput from '../ui/form/FormInput';
import Button from '../ui/base/Button';

type Variant = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('login');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: '' } });

  const handleToggleVariant = useCallback(() => {
    if (variant === 'login') {
      setVariant('register');
    } else {
      setVariant('login');
    }
  }, [variant]);

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormInput label="Name" id="name" type="text" required register={register} errors={errors} />
        <FormInput label="Email" id="email" type="email" required register={register} errors={errors} />
        <FormInput label="Password" id="password" type="password" required register={register} errors={errors} />
        <div>
          {/* need to replace to custom button component */}
          <Button type="submit">Submit</Button>
        </div>
        <hr />
        <Button type="button" onClick={handleToggleVariant}>
          {variant === 'login' ? 'Register' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
