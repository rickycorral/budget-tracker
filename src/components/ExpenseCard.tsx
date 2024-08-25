import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog } from "@fortawesome/free-solid-svg-icons"; // Import the frog icon from FontAwesome

interface ExpenseCardProps {
  totalExpenses: number;
  expenseInput: string;
  setExpenseInput: (input: string) => void;
  descriptionInput: string;
  setDescriptionInput: (input: string) => void;
  dateInput: string;
  setDateInput: (input: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleAddExpense: () => void;
  handleSaveEditedExpense: () => void;
  editingExpense: { categoryIndex: number; expenseIndex: number } | null;
  expenseCategories: { name: string }[];
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  totalExpenses,
  expenseInput,
  setExpenseInput,
  descriptionInput,
  setDescriptionInput,
  dateInput,
  setDateInput,
  selectedCategory,
  setSelectedCategory,
  handleAddExpense,
  handleSaveEditedExpense,
  editingExpense,
  expenseCategories,
}) => {
  const [animateFrog, setAnimateFrog] = useState(false);

  const handleButtonClick = () => {
    setAnimateFrog(true);
    handleAddExpense();
    setTimeout(() => setAnimateFrog(false), 1500); // Reset the animation after 1.5 seconds
  };

  return (
    <div className="expense-card">
      <h2 className="expense-card-header">Agregar Gasto</h2>
      <div className="total-gastos-container">
        <p className="category-card-total">Total Gastos: ${totalExpenses.toFixed(2)}</p>
        <FontAwesomeIcon icon={faFrog} className={`frog-icon ${animateFrog ? 'animate' : ''}`} /> {/* Add Frog Icon */}
      </div>
      <div className="form-row">
        <label>Categoría</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Seleccionar Categoría</option>
          {expenseCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Monto</label>
        <input
          type="number"
          value={expenseInput}
          onChange={(e) => setExpenseInput(e.target.value)}
          placeholder="Ingrese el monto"
        />
      </div>
      <div className="form-row">
        <label>Descripción</label>
        <input
          type="text"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          placeholder="Descripción del gasto"
        />
      </div>
      <div className="form-row">
        <label>Fecha</label>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </div>
      <button onClick={handleButtonClick} className="expense-card-button">
        Agregar Gasto
      </button>
      {editingExpense && (
        <button onClick={handleSaveEditedExpense} className="expense-card-button">
          Guardar Cambios
        </button>
      )}
    </div>
  );
};

export default ExpenseCard;
