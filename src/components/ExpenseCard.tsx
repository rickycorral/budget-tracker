import React from "react";

interface ExpenseCardProps {
  totalExpenses: number;
  expenseInput: string;
  descriptionInput: string;
  dateInput: string;
  selectedCategory: string;
  expenseCategories: { name: string }[];
  setSelectedCategory: (value: string) => void;
  setExpenseInput: (value: string) => void;
  setDescriptionInput: (value: string) => void;
  setDateInput: (value: string) => void;
  handleAddExpense: () => void;
  editingExpense: number | null;
  handleSaveEditedExpense: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  totalExpenses,
  expenseInput,
  descriptionInput,
  dateInput,
  selectedCategory,
  expenseCategories,
  setSelectedCategory,
  setExpenseInput,
  setDescriptionInput,
  setDateInput,
  handleAddExpense,
  editingExpense,
  handleSaveEditedExpense,
}) => (
  <div className="bg-red-100 p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium">Total Expenses</h3>
    <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="mt-2 p-1 border rounded w-full"
    >
      <option value="Select Category" disabled>
        Select Category
      </option>
      {expenseCategories.map((category, index) => (
        <option key={index} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
    <input
      type="number"
      value={expenseInput}
      onChange={(e) => setExpenseInput(e.target.value)}
      className="mt-2 p-1 border rounded w-full"
      placeholder="Enter expense"
    />
    <input
      type="text"
      value={descriptionInput}
      onChange={(e) => setDescriptionInput(e.target.value)}
      className="mt-2 p-1 border rounded w-full"
      placeholder="Enter description"
    />
    <input
      type="date"
      value={dateInput}
      onChange={(e) => setDateInput(e.target.value)}
      className="mt-2 p-1 border rounded w-full"
      placeholder="Select date"
    />
    <button
      onClick={
        editingExpense !== null ? handleSaveEditedExpense : handleAddExpense
      }
      className="mt-2 text-white bg-red-500 px-2 py-1 rounded w-full"
    >
      {editingExpense !== null ? "Save Expense" : "Add Expense"}
    </button>
  </div>
);

export default ExpenseCard;
