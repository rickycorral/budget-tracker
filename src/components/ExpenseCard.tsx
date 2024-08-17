import React, { useEffect } from 'react';
import { ExpenseCategory } from './Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';

interface ExpenseCardProps {
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
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
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
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${
      today.toLocaleString('default', { month: 'short' })
    }/${today.getFullYear()}`;
    setDateInput(formattedDate);
  }, [setDateInput]);

  return (
    <div className="expense-card">
      <h3 className="expense-card-header">
        Gastos Totales <FontAwesomeIcon icon={faFrog} />: {totalExpenses}
      </h3>
      <div className="form-row">
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
      <div className="form-row">
        <label>Gasto:</label>
        <input
          type="number"
          value={expenseInput}
          onChange={(e) => setExpenseInput(e.target.value)}
          placeholder="Ingresa el gasto"
        />
      </div>
      <div className="form-row">
        <label>Descripción:</label>
        <input
          type="text"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          placeholder="Descripción"
        />
      </div>
      <div className="form-row">
        <label>Fecha:</label>
        <input
          type="text"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          placeholder="Fecha"
          disabled
        />
      </div>
      <button
        onClick={editingExpense !== null ? handleSaveEditedExpense : handleAddExpense}
        className="expense-card-button"
      >
        {editingExpense !== null ? "Guardar Gasto" : "Agregar Gasto"}
      </button>
    </div>
  );
};

export default ExpenseCard;
