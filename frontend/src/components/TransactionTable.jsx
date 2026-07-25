export default function TransactionTable({ transactions, onDelete }) {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No transactions yet.
                </td>
              </tr>
            )}
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{t.title}</td>
                <td className="px-4 py-3 text-gray-500">{t.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.type === 'income'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {t.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{formatDate(t.date)}</td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDelete(t._id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}