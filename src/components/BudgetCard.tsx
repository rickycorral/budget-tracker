import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/budget-card.css"; // Ensure the CSS file is correctly imported

interface BudgetCardProps {
  isEditingBudget: boolean;
  monthlyBudget: number | null;
  monthlyBudgetInput: string;
  setMonthlyBudgetInput: (value: string) => void;
  setMonthlyBudget: (value: number | null) => void; // Allow null for the budget value
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
  const [isExpanded, setIsExpanded] = useState(false); // Set initial state to collapsed

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`budget-card ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="budget-card-header" onClick={toggleExpand}>
        Presupuesto Mensual
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="expand-icon"
        />
      </div>
      {isExpanded && (
        <div className="budget-card-content">
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
              <button onClick={() => setIsEditingBudget(false)} className="budget-button">
                Guardar Presupuesto
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditingBudget(true)} className="budget-button">
              Establecer Presupuesto
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(BudgetCard);
