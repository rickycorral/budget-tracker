import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/expense-card.css"; // Ensure the CSS file is correctly imported

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
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the expanded/collapsed state

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`expense-card ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className={`expense-card-header ${isExpanded ? "" : "collapsed-header"}`} onClick={toggleExpand}>
        <FontAwesomeIcon icon={faFrog} className="fa-frog" />
        Agregar Gasto
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="expand-icon"
        />
      </div>
      {isExpanded && (
        <div className="expense-card-content">
          <p className="category-card-total">Total Gastos: ${totalExpenses.toFixed(2)}</p>
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
          <button onClick={handleAddExpense} className="expense-card-button">
            Agregar Gasto
          </button>
          {editingExpense && (
            <button onClick={handleSaveEditedExpense} className="expense-card-button">
              Guardar Cambios
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
