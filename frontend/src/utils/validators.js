export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateAuthForm = ({ name, email, password }, isRegister) => {
  const errors = {};

  if (isRegister && !name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

  return errors;
};

export const validateTransactionForm = ({ title, amount, date }) => {
  const errors = {};

  if (!title?.trim()) errors.title = 'Title is required';
  if (!amount || Number(amount) <= 0) errors.amount = 'Amount must be greater than 0';
  if (!date) errors.date = 'Date is required';

  return errors;
};