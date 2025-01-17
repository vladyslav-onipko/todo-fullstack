export interface ITodo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  creator: string;
  creeatedAt: string;
}

export interface ITodoList {
  id: string;
  name: string;
  todosCount: number;
  creator: string;
  viewers: string[];
  createdAt: string;
}

export interface ICreateTodoListData {
  name: string;
  userId: string;
  token: string;
}

export interface IGetTodoListsData {
  userId: string;
  token: string;
  signal: AbortSignal;
}
