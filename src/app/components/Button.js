export default function Button({ children, ...rest }) {
  return (
    <button
      className="text-slate-500 hover:text-slate-700 text-lg tracking-wide"
      {...rest}
    >
      {children}
    </button>
  );
}
