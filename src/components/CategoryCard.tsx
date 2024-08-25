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
  alertThreshold: number;
  handleSetBudget: (budgetValue: number) => void;
  cardColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  handleEditExpense,
  handleDeleteExpense,
  calculatePercentage,
  alertThreshold,
  handleSetBudget,
  cardColor,
}) => {
  const [arrowVisible, setArrowVisible] = useState(true); // State to control arrow and text visibility

  const totalExpense = category.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const percentageSpent = calculatePercentage(totalExpense, category.budget);

  const getGradientColor = (percentage: number) => {
    if (percentage <= 50) {
      return `linear-gradient(to right, darkgreen, yellow ${percentage * 2}%)`;
    } else if (percentage <= 75) {
      return `linear-gradient(to right, darkgreen, yellow 50%, orange ${percentage * 2 - 100}%)`;
    } else {
      return `linear-gradient(to right, darkgreen, yellow 50%, orange 75%, red ${percentage - 75}%)`;
    }
  };

  const handleWalletClick = () => {
    setArrowVisible(false); // Hide the arrow and text when the wallet button is clicked
    handleSetBudget(Number(prompt("Nuevo presupuesto:"))); // Prompt for a new budget
  };

  // Function to determine which icon to display based on the category name
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
        return faWallet; // Fallback icon
    }
  };

  return (
    <div className={`category-card ${cardColor}`}>
      <div className="category-card-header">
        <h3>
          <FontAwesomeIcon icon={getCategoryIcon(category.name)} style={{ marginRight: '1px' }} /> {/* Reduced margin */}
          {category.name} {/* Category Name */}
        </h3>
        <div className="category-card-actions">
          {arrowVisible && (
            <>
              <span className="budget-text">Ingresa tu Presupuesto</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="action-icon arrow-icon" /* Adding the arrow-icon class */
              />
            </>
          )}
          <FontAwesomeIcon
            icon={faWallet}
            title="Editar Presupuesto"
            className="action-icon"
            onClick={handleWalletClick} // Handle the wallet click
          />
        </div>
      </div>
      <div className="category-card-details">
        <p className="category-card-total">
          Total Gasto: ${totalExpense.toFixed(2)}
        </p>
        <p className="text-sm">
          Presupuesto: ${category.budget?.toFixed(2)}
        </p>
      </div>
      <div className="expense-list">
        {category.expenses.map((expense, index) => (
          <div key={index} className="expense-item">
            <span>${expense.amount.toFixed(2)}</span> - <span>{expense.description}</span> - 
            <span>{format(new Date(expense.date), 'd/MMM', { locale: es })}</span> {/* Format date */}
            <FontAwesomeIcon
              icon={faEdit}
              title="Editar Gasto"
              className="action-icon expense-edit-icon"
              onClick={() => handleEditExpense(index)}
              style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue', fontSize: '.8rem' }} // Smaller size and blue color
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              title="Eliminar Gasto"
              className="action-icon expense-delete-icon"
              onClick={() => handleDeleteExpense(index)}
              style={{ marginLeft: '5px', cursor: 'pointer', color: 'red', fontSize: '.8rem' }} // Smaller size and red color
            />
          </div>
        ))}
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentageSpent}%`,
            background: getGradientColor(percentageSpent),
          }}
        >
          <span className="progress-text">
            {percentageSpent.toFixed(2)}% Gastado
          </span>
        </div>
      </div>
      {percentageSpent > alertThreshold && (
        <p className="category-card-alert">
          ¡Advertencia: Ha superado el {alertThreshold}% de su presupuesto!
        </p>
      )}
    </div>
  );
};

export default React.memo(CategoryCard);
