const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require('../controllers/expenseController');

router.get('/', protect, getExpenses);

router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  ],
  validate,
  addExpense
);

router.delete('/:id', protect, deleteExpense);

module.exports = router;