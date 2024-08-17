import React from "react";

interface BudgetCardProps {
  monthlyBudget: number | null;
  monthlyBudgetInput: string;
  isEditingBudget: boolean;
  setMonthlyBudgetInput: (value: string) => void;
  handleSetBudget: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  monthlyBudget,
  monthlyBudgetInput,
  isEditingBudget,
  setMonthlyBudgetInput,
  handleSetBudget,
}) => (
  <div className="bg-yellow-100 p-4 rounded-lg shadow mt-4">
    <h3 className="text-sm font-medium">Set Monthly Budget</h3>

    {isEditingBudget ? (
      <input
        type="number"
        value={monthlyBudgetInput}
        onChange={(e) => setMonthlyBudgetInput(e.target.value)}
        className="mt-2 p-1 border rounded w-full"
        placeholder="Enter monthly budget limit"
      />
    ) : (
      <p className="text-sm mt-2">
        Budget: $
        {monthlyBudget !== null ? monthlyBudget.toFixed(2) : "Not Set"}
      </p>
    )}

    <button
      onClick={handleSetBudget}
      className="mt-2 text-white bg-yellow-500 px-2 py-1 rounded w-full"
    >
      {isEditingBudget || monthlyBudget === null
        ? "Set Budget"
        : "Edit Budget"}
    </button>
  </div>
);

export default BudgetCard;
