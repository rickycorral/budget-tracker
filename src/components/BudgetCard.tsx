import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import '../css/budget-card.css'; // Import the new CSS file

interface BudgetCardProps {
  isEditingBudget: boolean;
  monthlyBudget: number | null;
  monthlyBudgetInput: string;
  setMonthlyBudgetInput: (value: string) => void;
  setMonthlyBudget: (value: number | null) => void; 
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
    } else {
      setMonthlyBudget(null); 
      alert("Por favor ingrese un presupuesto mensual válido.");
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="budget-card">
      <h3 className="text-sm font-medium">
        Presupuesto Mensual <FontAwesomeIcon icon={faFrog} />
      </h3>
      <p className="text-2xl font-bold">
        ${monthlyBudget !== null ? monthlyBudget.toFixed(2) : "0.00 MXN"}
      </p>
      {isEditingBudget ? (
        <>
          <input
            type="number"
            value={monthlyBudgetInput}
            onChange={(e) => setMonthlyBudgetInput(e.target.value)}
            className="budget-input"
            placeholder="Ingrese el límite del presupuesto mensual"
          />
          <button onClick={handleSaveBudget} className="budget-button">
            Guardar Presupuesto
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditingBudget(true)}
          className="budget-button"
        >
          Establecer Presupuesto
        </button>
      )}
    </div>
  );
};

export default React.memo(BudgetCard);
