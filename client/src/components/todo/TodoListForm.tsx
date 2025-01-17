import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from '../ui/form/FormInput';
import Button from '../ui/base/Button';

import { todoListValidationSchema } from '../../schemas/form-validation';
import useCreateTodoList from '../../hooks/todo/useCreateTodoList';
import useAppSelector from '../../hooks/app/app-selector';

interface ITodoListFormProps {
  name?: string;
  onCancel: () => void;
}

const CreateTodoListForm: React.FC<ITodoListFormProps> = ({ name, onCancel }) => {
  const token = useAppSelector((state) => state.auth.token)!;
  const userId = useAppSelector((state) => state.auth.user.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { name: name || '' }, resolver: zodResolver(todoListValidationSchema) });
  const { createTodoList, isPending } = useCreateTodoList();

  const isEditing = !!name;

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isEditing) {
      console.log(data);
    } else {
      createTodoList({ name: data.name, userId, token });
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormInput
        type="text"
        id="name"
        label="Todo list name"
        placeholder="Enter todo list name"
        disabled={isPending}
        errors={errors}
        register={register}
      />
      <div className="w-full flex justify-end mt-4">
        <Button modifier="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isEditing ? 'Update todo list' : 'Create todo list'}
        </Button>
      </div>
    </form>
  );
};

export default CreateTodoListForm;
