const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;
    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      type,
      date,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await expense.deleteOne();
  res.json({ message: 'Expense deleted' });
};