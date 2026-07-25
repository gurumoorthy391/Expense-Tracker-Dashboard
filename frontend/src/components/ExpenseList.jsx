export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="mt-6 space-y-2">
      {expenses.length === 0 && (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      )}
      {expenses.map((exp) => (
        <div
          key={exp._id}
          className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm"
        >
          <div>
            <p className="font-medium">{exp.title}</p>
            <p className="text-sm text-gray-500">{exp.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`font-semibold ${
                exp.type === 'income' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {exp.type === 'income' ? '+' : '-'}₹{exp.amount}
            </span>
            <button
              onClick={() => onDelete(exp._id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}