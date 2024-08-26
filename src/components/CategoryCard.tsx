import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faEdit, faTrashAlt, faArrowRight, faHome, faCar, faUtensils, faBook, faCapsules, faPiggyBank, faBolt, faTv } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

  const getFontColor = (percentage: number) => {
    if (percentage <= 50) {
      return `#2c7a7b`; // Dark green
    } else if (percentage <= 75) {
      return `#66bb6a`; // Lighter green
    } else if (percentage <= 90) {
      return `#a5d6a7`; // Pale green
    } else {
      return `#dcedc8`; // Lightest green
    }
  };

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
          <FontAwesomeIcon icon={getCategoryIcon(category.name)} style={{ marginRight: '1px' }} />
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
                onClick={() => handleEditExpense(index)}
                style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue', fontSize: '.8rem' }}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                title="Eliminar Gasto"
                className="action-icon expense-delete-icon"
                onClick={() => handleDeleteExpense(index)}
                style={{ marginLeft: '5px', cursor: 'pointer', color: 'red', fontSize: '.8rem' }}
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
            background: `linear-gradient(90deg, #a8e6cf, #2c7a7b)`,
            color: getFontColor(percentageSpent),
            transition: 'all 0.5s ease',
          }}
        >
          <span className="progress-text">
            {percentageSpent.toFixed(2)}%
          </span>
        </div>
      </div>
      {percentageSpent > 75 && (
        <p
          className="category-card-alert"
          style={{
            color: getFontColor(percentageSpent),
            fontSize: '0.9rem',
            padding: '5px 10px',
            backgroundColor: 'rgba(157, 212, 135, 0.2)', // Light transparent green background
            borderRadius: '5px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          Cuidado! Has superado el {percentageSpent.toFixed(2)}%!
        </p>
      )}
    </div>
  );
};

export default React.memo(CategoryCard);
