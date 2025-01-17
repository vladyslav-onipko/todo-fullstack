/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import FormInput from '../ui/form/FormInput';
import Button from '../ui/base/Button';

import useAppDispatch from '../../hooks/app/app-dispatch';
import { auth } from '../../store/auth/auth-actions';
import { userSigninValidationSchema, userSignupValidationSchema } from '../../schemas/form-validation';

type Variant = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('login');
  const dispatch = useAppDispatch();

  const schema = variant === 'login' ? userSigninValidationSchema : userSignupValidationSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: '' }, resolver: zodResolver(schema) });

  const handleToggleVariant = useCallback(() => {
    if (variant === 'login') {
      setVariant('register');
    } else {
      setVariant('login');
    }
  }, [variant]);

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === 'login') {
      try {
        const response = await dispatch(auth('signin', { email: data.email, password: data.password }));
        toast.success(response!.message || 'You have successfully signed in');
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    if (variant === 'register') {
      try {
        const response = await dispatch(
          auth('signup', { name: data.name, email: data.email, password: data.password })
        );
        toast.success(response!.message || 'You have successfully signed up');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-full">
      <h2 className="mb-[20px] text-[2.8rem] text-stone-700 text-center font-bold">
        {variant === 'login' ? 'Sign in to your account' : 'Sign up to your account'}
      </h2>
      <form
        className="min-w-[400px] mx-auto rounded-md shadow p-[20px] bg-stone-100 sm:min-w-full"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {variant === 'register' && (
          <FormInput
            label="Name"
            id="name"
            type="text"
            required
            register={register}
            errors={errors}
            disabled={isSubmitting}
          />
        )}
        <FormInput
          label="Email"
          id="email"
          type="email"
          required
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          required
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
        <div className="pb-[20px] mb-[10px] border-b border-stone-300">
          <Button type="submit" widthFull disabled={isSubmitting}>
            {variant === 'login' ? 'Sign in' : 'Sign up'}
          </Button>
        </div>
        <button
          className="border-0 bg-transparent w-full text-[1.4rem] text-gray-500 underline"
          type="button"
          onClick={handleToggleVariant}
        >
          {variant === 'login' ? 'New to app?' : 'Already have an account?'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
