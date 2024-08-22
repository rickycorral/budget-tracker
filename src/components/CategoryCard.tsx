import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog, faHouseUser, faUtensils, faCar, faLightbulb, faFilm, faPills, faSchool, faPiggyBank, faEdit, faTrashAlt, faWallet } from "@fortawesome/free-solid-svg-icons";

interface ExpenseCategory {
  name: string;
  budget: number | null;
  expenses: { amount: number; description: string; date: string }[];
}

interface CategoryCardProps {
  category: ExpenseCategory;
  handleEditExpense: () => void;
  handleDeleteExpense: () => void;
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

  const getCategoryIcon = () => {
    switch (category.name) {
      case "Renta":
        return faHouseUser; // House icon for Renta
      case "Alimentos":
        return faUtensils; // Food icon for Alimentos
      case "Transporte":
        return faCar; // Car icon for Transporte
      case "Servicios":
        return faLightbulb; // Lightbulb icon for Servicios
      case "Entretenimiento":
        return faFilm; // Film icon for Entretenimiento
      case "Medicinas":
        return faPills; // Pills icon for Medicinas
      case "Escuela":
        return faSchool; // School icon for Escuela
      case "Ahorros":
        return faPiggyBank; // Piggy bank icon for Ahorros
      default:
        return faFrog; // Default frog icon (just in case)
    }
  };

  return (
    <div className={`category-card ${cardColor}`}>
      <div className="category-card-header">
        <h3>
          {category.name} <FontAwesomeIcon icon={getCategoryIcon()} />
        </h3>
        <div className="category-card-actions">
          <FontAwesomeIcon
            icon={faWallet}
            title="Editar Presupuesto"
            className="action-icon"
            onClick={() => handleSetBudget(Number(prompt("Nuevo presupuesto:")))}
          />
          {category.expenses.length > 0 && (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                title="Editar Gasto"
                className="action-icon"
                onClick={handleEditExpense}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                title="Eliminar Gasto"
                className="action-icon"
                onClick={handleDeleteExpense}
              />
            </>
          )}
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
