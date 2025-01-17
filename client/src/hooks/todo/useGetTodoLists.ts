import { useQuery } from '@tanstack/react-query';

import { getTodoLists } from '../../libs/http';
import useAppSelector from '../app/app-selector';

const useGetTodoLists = () => {
  const userId = useAppSelector((state) => state.auth.user.id);
  const token = useAppSelector((state) => state.auth.token)!;

  const queryData = useQuery({
    queryKey: ['todo-lists'],
    queryFn: ({ signal }) => getTodoLists({ signal, userId, token }),
  });

  return queryData;
};

export default useGetTodoLists;
