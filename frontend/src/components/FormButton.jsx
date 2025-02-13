export default function FormButton({ buttonText }) {
  return (
    <button className="mb-2 me-2 mt-5 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
      {buttonText}
    </button>
  );
}
