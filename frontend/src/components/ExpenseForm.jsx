import { useState } from 'react';
import { validateTransactionForm } from '../utils/validators';

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTransactionForm({ title, amount, date });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onAdd({ title, amount: Number(amount), category, type, date });
    setTitle('');
    setAmount('');
    setCategory('General');
    setType('expense');
    setDate(new Date().toISOString().slice(0, 10));
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <input
          className={`w-full border rounded-md px-3 py-2 ${
            errors.title ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <input
          type="number"
          step="0.01"
          className={`w-full border rounded-md px-3 py-2 ${
            errors.amount ? 'border-red-400' : 'border-gray-300'
          }`}
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
      </div>

      <input
        type="date"
        className="w-full border rounded-md px-3 py-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="w-full border rounded-md px-3 py-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Shopping</option>
        <option>Salary</option>
      </select>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Add {type === 'income' ? 'Income' : 'Expense'}
      </button>
    </form>
  );
}