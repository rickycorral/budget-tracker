import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
  index: number;
  handleEditExpense: () => void;
  handleDeleteExpense: () => void;
  calculatePercentage: (amount: number, budget: number | null) => number;
  alertThreshold: number;
  handleSetBudget: (index: number, budgetValue: number) => void;
  cardColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  handleEditExpense,
  handleDeleteExpense,
  calculatePercentage,
  alertThreshold,
  handleSetBudget,
  cardColor = "bg-green-200",
}) => {
  const [budgetInput, setBudgetInput] = useState<string>("");
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false);

  const percentageUsed = calculatePercentage(
    category.expenses.reduce((sum, expense) => sum + expense.amount, 0),
    category.budget
  );

  const isApproachingLimit =
    category.budget && percentageUsed >= alertThreshold * 100;
  const isOverBudget =
    category.budget && category.expenses.reduce((sum, expense) => sum + expense.amount, 0) > category.budget;

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetInput(e.target.value);
  };

  const handleSetBudgetClick = () => {
    const budgetValue = parseFloat(budgetInput);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      handleSetBudget(index, budgetValue);
      setBudgetInput(""); // Clear the input after setting the budget
      setIsEditingBudget(false); // Disable editing after setting the budget
    } else {
      alert("Por favor, ingrese un presupuesto positivo válido.");
    }
  };

  const enableBudgetEditing = () => {
    setIsEditingBudget(true);
    setBudgetInput(category.budget?.toString() || "");
  };

  return (
    <div className={`${cardColor} p-4 rounded-lg shadow relative`}>
      <h3 className="text-sm font-medium">{category.name}</h3>
      <p className="text-sm">
        Gastado: $
        {category.expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
      </p>

      {isEditingBudget || category.budget === null ? (
        <>
          <input
            type="number"
            value={budgetInput}
            onChange={handleBudgetChange}
            placeholder="Establecer Presupuesto"
            className="mt-2 p-1 border rounded w-full"
          />
          <button
            onClick={handleSetBudgetClick}
            className="mt-2 text-white bg-green-500 px-2 py-1 rounded w-full"
          >
            {category.budget === null ? "Establecer Presupuesto" : "Guardar Presupuesto"}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm mt-2">
            Presupuesto: ${category.budget.toFixed(2)}
          </p>
          <button
            onClick={enableBudgetEditing}
            className="absolute top-4 right-4 text-white bg-yellow-500 p-1 rounded text-xs w-8 h-8 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <div className="relative pt-1 mt-2">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-300">
              <div
                style={{ width: `${percentageUsed}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  isOverBudget
                    ? "bg-red-500"
                    : isApproachingLimit
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
            </div>
          </div>
        </>
      )}

      {/* Lista de gastos */}
      <ul className="mt-2">
        {category.expenses.map((expense, idx) => (
          <li key={idx} className="flex justify-between text-xs">
            <span>{expense.description}</span>
            <span>{expense.date}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Botones de Editar y Eliminar para Gastos */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={handleEditExpense}
          className="text-white bg-blue-500 p-1 rounded text-xs w-8 h-8 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={handleDeleteExpense}
          className="text-white bg-red-500 p-1 rounded text-xs w-8 h-8 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
