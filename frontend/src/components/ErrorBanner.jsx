export default function ErrorBanner({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md flex justify-between items-start mb-4">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-3 text-red-400 hover:text-red-600">
          ✕
        </button>
      )}
    </div>
  );
}