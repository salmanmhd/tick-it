export default function InputItem({
  labelText,
  placeholderText,
  value,
  onChange,
}) {
  return (
    <>
      <label className="mb-1 font-semibold">{labelText}</label>
      <input
        value={value}
        onChange={onChange}
        className="mb-3 h-8 w-full rounded-md border border-gray-600 bg-black px-2 focus:border-gray-400"
        type="text"
        placeholder={placeholderText}
      />
    </>
  );
}
