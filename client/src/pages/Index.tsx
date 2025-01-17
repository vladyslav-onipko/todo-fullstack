import { useState } from 'react';

import TodosGrid from '../components/todo/TodosGrid';
import Button from '../components/ui/base/Button';
import Modal from '../components/ui/base/Modal';
import TodoListForm from '../components/todo/TodoListForm';
import Spinner from '../components/ui/base/Spinner';
import TodoListItem from '../components/todo/TodoListItem';

import useGetTodoLists from '../hooks/todo/useGetTodoLists';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todoLists = useGetTodoLists();

  if (todoLists.isError) {
    // need to implements error state
  }
  console.log(todoLists);
  return (
    <>
      <div className="container flex justify-end">
        <Modal title="Todo" isOpen={isModalOpen} onClose={() => setIsModalOpen((isOpen) => !isOpen)}>
          <TodoListForm onCancel={() => setIsModalOpen((isOpen) => !isOpen)} />
        </Modal>
        <Button onClick={() => setIsModalOpen(true)}>Create todo category list</Button>
      </div>
      {todoLists.isLoading && <Spinner />}
      {todoLists.isSuccess && todoLists.data && (
        <TodosGrid title="My todos" items={todoLists.data} itemKeyFn={(item) => item.id}>
          {(item) => <TodoListItem totoList={item} />}
        </TodosGrid>
      )}
    </>
  );
};

export default Index;
