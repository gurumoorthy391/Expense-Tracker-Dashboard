import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import TransactionTable from './components/TransactionTable';
import ErrorBanner from './components/ErrorBanner';

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${user?.token}` } };

  const handleApiError = (err, fallback) => {
    if (err.response?.status === 401) {
      // Token invalid/expired — force re-login
      setError('Session expired. Please log in again.');
      logout();
    } else if (err.response) {
      setError(err.response.data?.message || fallback);
    } else {
      setError('Cannot reach server. Is the backend running?');
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, authHeader);
      setExpenses(res.data);
    } catch (err) {
      handleApiError(err, 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await axios.post(API_URL, expense, authHeader);
      setExpenses([res.data, ...expenses]);
    } catch (err) {
      handleApiError(err, 'Failed to add transaction');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      handleApiError(err, 'Failed to delete transaction');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user]);

  if (!user) {
    return showRegister ? (
      <Register switchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login switchToRegister={() => setShowRegister(true)} />
    );
  }

  const income = expenses
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">💰 Expense Tracker</h1>
            <p className="text-gray-500 text-sm">Welcome, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <ErrorBanner message={error} onClose={() => setError('')} />

        <Dashboard income={income} expense={expense} balance={balance} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm onAdd={addExpense} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3">Transactions</h2>
            {loading ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : (
              <TransactionTable transactions={expenses} onDelete={deleteExpense} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;