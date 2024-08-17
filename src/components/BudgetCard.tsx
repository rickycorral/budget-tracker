import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog } from "@fortawesome/free-solid-svg-icons";

interface BudgetCardProps {
  isEditingBudget: boolean;
  monthlyBudget: number | null;
  monthlyBudgetInput: string;
  setMonthlyBudgetInput: (value: string) => void;
  setMonthlyBudget: (value: number) => void;
  setIsEditingBudget: (value: boolean) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  isEditingBudget,
  monthlyBudget,
  monthlyBudgetInput,
  setMonthlyBudgetInput,
  setMonthlyBudget,
  setIsEditingBudget,
}) => {
  const handleSaveBudget = () => {
    const budgetValue = parseFloat(monthlyBudgetInput);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      setMonthlyBudget(budgetValue);
      setIsEditingBudget(false);
    } else {
      alert("Por favor ingrese un presupuesto mensual válido.");
    }
  };

  return (
    <div className="bg-green-400 p-4 rounded-lg shadow">
      <h3 className="text-sm font-medium">
        Presupuesto Mensual <FontAwesomeIcon icon={faFrog} />
      </h3>
      <p className="text-2xl font-bold">
        ${monthlyBudget ? monthlyBudget.toFixed(2) : "N/A"}
      </p>
      {isEditingBudget ? (
        <>
          <input
            type="number"
            value={monthlyBudgetInput}
            onChange={(e) => setMonthlyBudgetInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
            placeholder="Ingrese el límite del presupuesto mensual"
          />
          <button
            onClick={handleSaveBudget}
            className="mt-2 text-white bg-green-600 px-2 py-1 rounded w-full"
          >
            Guardar Presupuesto
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditingBudget(true)}
          className="mt-2 text-white bg-green-600 px-2 py-1 rounded w-full"
        >
          Establecer Presupuesto
        </button>
      )}
    </div>
  );
};

export default BudgetCard;
