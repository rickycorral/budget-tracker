import React from 'react';
import { ExpenseCategory } from './Dashboard';

const ExpenseCard: React.FC<{
  totalExpenses: number;
  expenseInput: string;
  descriptionInput: string;
  dateInput: string;
  selectedCategory: string;
  setExpenseInput: (value: string) => void;
  setDescriptionInput: (value: string) => void;
  setDateInput: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  handleAddExpense: () => void;
  editingExpense: number | null;
  handleSaveEditedExpense: () => void;
  expenseCategories: ExpenseCategory[];
}> = ({
  totalExpenses,
  expenseInput,
  descriptionInput,
  dateInput,
  selectedCategory,
  setExpenseInput,
  setDescriptionInput,
  setDateInput,
  setSelectedCategory,
  handleAddExpense,
  editingExpense,
  handleSaveEditedExpense,
  expenseCategories,
}) => {
  return (
    <div className="expense-card">
      <h3>Gastos Totales: {totalExpenses}</h3>
      <div>
        <label>Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Selecciona la Categoría
          </option>
          {expenseCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Gasto:</label>
        <input
          type="number"
          value={expenseInput}
          onChange={(e) => setExpenseInput(e.target.value)}
          placeholder="Ingresa el gasto"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          placeholder="Descripción"
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </div>
      <button
        onClick={editingExpense !== null ? handleSaveEditedExpense : handleAddExpense}
      >
        {editingExpense !== null ? "Guardar Gasto" : "Agregar Gasto"}
      </button>
    </div>
  );
};

export default ExpenseCard;
