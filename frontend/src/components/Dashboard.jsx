export default function Dashboard({ income, expense, balance }) {
  const cards = [
    {
      label: 'Total Income',
      value: income,
      color: 'text-green-600',
      bg: 'bg-green-50',
      icon: '↑',
    },
    {
      label: 'Total Expense',
      value: expense,
      color: 'text-red-500',
      bg: 'bg-red-50',
      icon: '↓',
    },
    {
      label: 'Current Balance',
      value: balance,
      color: balance >= 0 ? 'text-blue-600' : 'text-red-500',
      bg: 'bg-blue-50',
      icon: '₹',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl shadow-sm p-5 ${card.bg} border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <span className={`text-lg font-bold ${card.color}`}>{card.icon}</span>
          </div>
          <p className={`text-2xl font-bold ${card.color}`}>
            ₹{card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}