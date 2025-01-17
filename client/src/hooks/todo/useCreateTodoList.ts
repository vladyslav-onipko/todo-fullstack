import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createTodoList as create } from '../../libs/http';
import { type ICreateTodoListData } from '../../models/todo';
import { HttpErrorMessage } from '../../utils/constants';

const useCreateTodoList = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo-lists'] });
      toast.success('Todo list created successfully');
    },
    onError: (error) => {
      toast.error(error.message || HttpErrorMessage.Default);
    },
  });

  const createTodoList = (data: ICreateTodoListData) => {
    mutate(data);
  };
  return { createTodoList, isSuccess, isError, isPending };
};

export default useCreateTodoList;
