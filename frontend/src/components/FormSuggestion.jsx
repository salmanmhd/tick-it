export default function FormSuggestion({ text, referText }) {
  return (
    <p className="text-sm text-gray-400">
      {text} <span className="underline">{referText}</span>
    </p>
  );
}
