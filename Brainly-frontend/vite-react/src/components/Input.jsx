export function Input({ type = "text", placeholder, reference }) {
  return (
    <div>
      <input
        ref={reference}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 border rounded w-full"
      />
    </div>
  );
}