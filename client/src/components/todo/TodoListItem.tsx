import { type ITodoList } from '../../models/todo';

interface ITodoListItemProps {
  totoList: ITodoList;
}

const TodoListItem: React.FC<ITodoListItemProps> = ({ totoList }) => {
  const formatedDate = new Date(totoList.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="bg-sky-100 border border-gray-200 rounded-lg shadow-md p-6">
      <h3 className="text-[2.4rem] font-bold tracking-tight text-stone-900 mb-[5px]">{totoList.name}</h3>
      <p className="text-stone-900 mb-[5px]">
        <span className="font-medium">Todos number: </span>
        <span className="text-sky-900 font-bold">{totoList.todosCount}</span>
      </p>
      <p className="text-stone-900 text-right">
        <span className="italic text-[1.4rem]">
          Createt by <span className="text-sky-900 font-bold">{totoList.creator}</span> at {formatedDate}
        </span>
      </p>
    </article>
  );
};
export default TodoListItem;
