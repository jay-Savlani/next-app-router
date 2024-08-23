export default function TodoItem({ todo, id }) {
  return (
    <li className="bg-slate-700 min-h-52 rounded-lg shadow-xl text-slate-200 px-20 py-12">
      <div className="tracking-wider text-xl">{todo.todo}</div>
      <div className="flex justify-end mt-3">
        <button className="text-xl tracking-wider border border-gray-100 hover:bg-slate-600 px-5 py-3 rounded">
          {todo.comleted ? "Completed" : "Mark as Complete!"}
        </button>
      </div>
    </li>
  );
}
