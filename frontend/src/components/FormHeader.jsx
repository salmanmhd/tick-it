export default function FormHeader({ title, description }) {
    return (
      <>
        <h1 className="text-3xl font-medium">{title}</h1>
        <p className="mb-4 mt-2 px-2 text-sm text-gray-400">{description}</p>
      </>
    );
  }
  