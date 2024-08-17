import React from "react";

interface IncomeCardProps {
  totalIncome: number;
  incomeInput: string;
  setIncomeInput: (value: string) => void;
  handleAddIncome: () => void;
}

const IncomeCard: React.FC<IncomeCardProps> = ({
  totalIncome,
  incomeInput,
  setIncomeInput,
  handleAddIncome,
}) => (
  <div className="bg-green-100 p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium">Total Income</h3>
    <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
    <input
      type="number"
      value={incomeInput}
      onChange={(e) => setIncomeInput(e.target.value)}
      className="mt-2 p-1 border rounded w-full"
      placeholder="Enter income"
    />
    <button
      onClick={handleAddIncome}
      className="mt-2 text-white bg-green-500 px-2 py-1 rounded w-full"
    >
      Add Income
    </button>
  </div>
);

export default IncomeCard;
