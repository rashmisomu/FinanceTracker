const Expense = require("../models/expenseModel"); // Ensure the correct model is imported

// Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = new Expense({
        title, amount, category, description, date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ msg: 'Amount must be a positive number' });
        }
        await expense.save();
        console.log(expense);
        res.status(200).json({ msg: 'Expense added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get Expenses
exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        res.status(200).json({ msg: 'Expense Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};
