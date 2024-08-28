import React, { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/expense-card.css";

interface ExpenseCategory {
  name: string;
}

interface ExpenseCardProps {
  totalExpenses: number;
  expenseInput: string;
  setExpenseInput: Dispatch<SetStateAction<string>>;
  descriptionInput: string;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  dateInput: string;
  setDateInput: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  handleAddExpense: () => void;
  handleSaveEditedExpense: () => void;
  editingExpense: { categoryIndex: number; expenseIndex: number } | null;
  expenseCategories: ExpenseCategory[];
  onClick?: () => void;
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
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 1000);
  };

  return (
    <div
      className={`expense-card ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={() => {
        toggleExpand();
        if (onClick) onClick();
      }}
    >
      <div className="expense-card-header">
        <span>Agregar Gasto</span>
        <FontAwesomeIcon
          icon={faFrog}
          className={`frog-icon ${isJumping ? "animate" : ""}`}
        />
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
