import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/budget-card.css"; // Ensure the CSS file is correctly imported

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

  // Format the budget value as currency
  const formatCurrency = (value: number | null) => {
    if (value === null) return "$0.00 MXN";
    const formattedValue = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    // Remove the currency symbol and append MXN to the end
    return formattedValue.replace('MXN', '').trim() + " MXN";
};


  return (
    <div className={`budget-card ${isEditingBudget ? 'expanded' : 'collapsed'}`}>
      <div className="budget-card-header" onClick={() => setIsEditingBudget(!isEditingBudget)}>
        Presupuesto Mensual
        <FontAwesomeIcon icon={isEditingBudget ? faChevronUp : faChevronDown} className="expand-icon" />
      </div>
      {isEditingBudget ? (
        <div className="budget-card-content">
          <input
            type="text"
            inputMode="numeric" // Display numeric keyboard
            pattern="[0-9]*"     // Only allow numbers
            value={monthlyBudgetInput}
            onChange={(e) => setMonthlyBudgetInput(e.target.value)}
            className="budget-input"
            placeholder="Ingrese el límite del presupuesto mensual"
          />
          <button onClick={handleSaveBudget} className="budget-button">
            Guardar Presupuesto
          </button>
        </div>
      ) : (
        <p className="budget-total">
          {formatCurrency(monthlyBudget)}
        </p>
      )}
    </div>
  );
};

export default BudgetCard;
