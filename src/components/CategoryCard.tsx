import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faEdit, faTrashAlt, faArrowRight, faHome, faCar, faUtensils, faBook, faCapsules, faPiggyBank, faBolt, faTv } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import "../css/category-card.css"; // Ensure the CSS file is correctly imported

interface Expense {
  amount: number;
  description: string;
  date: string;
}

interface ExpenseCategory {
  name: string;
  budget: number | null;
  expenses: Expense[];
}

interface CategoryCardProps {
  category: ExpenseCategory;
  handleEditExpense: (expenseIndex: number) => void;
  handleDeleteExpense: (expenseIndex: number) => void;
  calculatePercentage: (amount: number, budget: number | null) => number;
  handleSetBudget: (budgetValue: number) => void;
  cardColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  handleEditExpense,
  handleDeleteExpense,
  calculatePercentage,
  handleSetBudget,
  cardColor,
}) => {
  const [arrowVisible, setArrowVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const totalExpense = category.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const percentageSpent = calculatePercentage(totalExpense, category.budget);

  const handleWalletClick = () => {
    setArrowVisible(false);
    handleSetBudget(Number(prompt("Nuevo presupuesto:")));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Renta":
        return faHome;
      case "Alimentos":
        return faUtensils;
      case "Transporte":
        return faCar;
      case "Servicios":
        return faBolt;
      case "Entretenimiento":
        return faTv;
      case "Medicinas":
        return faCapsules;
      case "Escuela":
        return faBook;
      case "Ahorros":
        return faPiggyBank;
      default:
        return faWallet;
    }
  };

  return (
    <div className={`category-card ${cardColor}`}>
      <div className="category-card-header" onClick={toggleExpand}>
        <h3>
          <FontAwesomeIcon icon={getCategoryIcon(category.name)} className="category-icon" />
          {category.name}
        </h3>
        <div className="category-card-actions">
          {arrowVisible && (
            <>
              <span className="budget-text">Ingresa tu Presupuesto</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="action-icon arrow-icon"
              />
            </>
          )}
          <FontAwesomeIcon
            icon={faWallet}
            title="Editar Presupuesto"
            className="action-icon"
            onClick={handleWalletClick}
          />
          <span className="expand-indicator">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="category-card-details">
          <p className="category-card-total">
            Gastado: ${totalExpense.toFixed(2)}
          </p>
          <p className="text-sm">
            Presupuesto: ${category.budget?.toFixed(2)}
          </p>
        </div>
      )}
      {isExpanded && (
        <div className="expense-list">
          {category.expenses.map((expense, index) => (
            <div key={index} className="expense-item">
              <span>${expense.amount.toFixed(2)}</span> - <span>{expense.description}</span> - 
              <span>{format(new Date(expense.date), 'd/MMM', { locale: es })}</span>
              <FontAwesomeIcon
                icon={faEdit}
                title="Editar Gasto"
                className="action-icon expense-edit-icon"
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                title="Eliminar Gasto"
                className="action-icon expense-delete-icon"
              />
            </div>
          ))}
        </div>
      )}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentageSpent}%`,
          }}
        >
          <span className="progress-text">
            {percentageSpent.toFixed(2)}%
          </span>
        </div>
      </div>
      {percentageSpent > 75 && (
        <p className="category-card-alert">
          Cuidado! Has superado el {percentageSpent.toFixed(2)}%!
        </p>
      )}
    </div>
  );
};

export default React.memo(CategoryCard);
