/* eslint-disable @typescript-eslint/no-explicit-any */
interface ITodosGridProps<T> {
  title: string;
  items: T[];
  children: (item: T) => React.ReactNode;
  itemKeyFn: (item: T) => string;
}

const TodosGrid = <T,>({ title, items, itemKeyFn, children }: ITodosGridProps<T>) => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-[4rem] text-sky-900 font-bold mb-[20px]">{title}</h2>
        <ul className="grid grid-cols-4 gap-4 grid-rows-auto">
          {items.map((item) => (
            <li key={itemKeyFn(item)}>{children(item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodosGrid;
