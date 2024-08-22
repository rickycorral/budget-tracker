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
    setDateInput(new Date().toISOString().split('T')[0]);
  }, [setDateInput]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  return (
    <div className="expense-card">
      <h3 className="expense-card-header">
        Gastos Totales <FontAwesomeIcon icon={faFrog} />: ${totalExpenses.toFixed(2)}
      </h3>
      <div className="form-row">
        <label>Categoría:</label>
        <select
          value={selectedCategory || ""}  //Ensure the placeholder is shown if no category is selected
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">
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
      <div className="form-row date-input-container">
        <label>Fecha:</label>
        <input
          type="date"
          value={dateInput}
          onChange={handleDateChange}
          className="date-input"
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

export default React.memo(ExpenseCard);
