function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-emerald-500 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
