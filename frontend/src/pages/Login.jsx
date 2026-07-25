import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ErrorBanner from '../components/ErrorBanner';
import { validateAuthForm } from '../utils/validators';

export default function Login({ switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errors = validateAuthForm({ email, password }, false);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      login(res.data);
    } catch (err) {
      // Network error (backend down) vs API error (bad credentials)
      if (err.response) {
        setServerError(err.response.data?.message || 'Login failed');
      } else {
        setServerError('Cannot reach server. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <ErrorBanner message={serverError} onClose={() => setServerError('')} />

        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border rounded-md px-3 py-2 ${
              fieldErrors.email ? 'border-red-400' : 'border-gray-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded-md px-3 py-2 ${
              fieldErrors.password ? 'border-red-400' : 'border-gray-300'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={switchToRegister}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}