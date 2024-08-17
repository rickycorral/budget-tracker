import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { ExpenseCategory } from "./Dashboard";

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
  const [budgetInput, setBudgetInput] = useState<string>("");
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);

  const handleBudgetSubmit = () => {
    const budgetValue = parseFloat(budgetInput);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      handleSetBudget(budgetValue);
      setIsEditingBudget(true); // Switch to editing mode
    }
  };

  const hasExpenses = category.expenses.length > 0;

  return (
    <div className={`category-card ${cardColor}`}>
      <h3>
        {category.name} <FontAwesomeIcon icon={faFrog} />
      </h3>
      <p className="category-card-total">
        Total Gasto: ${category.expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
      </p>
      {isEditingBudget ? (
        <>
          <p className="text-sm">
            Presupuesto: ${category.budget?.toFixed(2)}
          </p>
          <button
            onClick={() => setIsEditingBudget(false)}
            className="text-white bg-blue-600"
          >
            Editar Presupuesto
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full text-sm"
            placeholder="Establecer Presupuesto"
          />
          <button
            onClick={handleBudgetSubmit}
            className="text-white bg-green-600"
          >
            {isEditingBudget ? "Editar Presupuesto" : "Establecer Presupuesto"}
          </button>
        </>
      )}

      {/* Conditionally render Editar Gasto and Eliminar Gasto buttons if there are expenses */}
      {hasExpenses && (
        <>
          <button
            onClick={handleEditExpense}
            className="text-white bg-yellow-600"
          >
            Editar Gasto
          </button>
          <button
            onClick={handleDeleteExpense}
            className="text-white bg-red-600"
          >
            Eliminar Gasto
          </button>
        </>
      )}

      <div className="category-card-percentage">
        <p className="category-card-percentage-text">
          Porcentaje Gastado: {calculatePercentage(category.expenses.reduce((sum, expense) => sum + expense.amount, 0), category.budget).toFixed(2)}%
        </p>
        {calculatePercentage(category.expenses.reduce((sum, expense) => sum + expense.amount, 0), category.budget) > alertThreshold && (
          <p className="category-card-alert">
            ¡Advertencia: Ha superado el {alertThreshold}% de su presupuesto!
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
