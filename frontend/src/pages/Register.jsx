import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ErrorBanner from '../components/ErrorBanner';
import { validateAuthForm } from '../utils/validators';

export default function Register({ switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errors = validateAuthForm({ name, email, password }, true);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      login(res.data);
    } catch (err) {
      if (err.response) {
        setServerError(err.response.data?.message || 'Registration failed');
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
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        <ErrorBanner message={serverError} onClose={() => setServerError('')} />

        <div>
          <input
            type="text"
            placeholder="Name"
            className={`w-full border rounded-md px-3 py-2 ${
              fieldErrors.name ? 'border-red-400' : 'border-gray-300'
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
          )}
        </div>

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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}