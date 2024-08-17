import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrog } from "@fortawesome/free-solid-svg-icons";

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
}) => {
  return (
    <div className="bg-green-400 p-4 rounded-lg shadow">
      <h3 className="text-md font-semibold">
        Ingresos Totales <FontAwesomeIcon icon={faFrog} />
      </h3>
      <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
      <input
        type="number"
        value={incomeInput}
        onChange={(e) => setIncomeInput(e.target.value)}
        className="mt-2 p-2 border rounded w-full text-lg"
        placeholder="Ingrese ingresos"
      />
      <button
        onClick={handleAddIncome}
        className="mt-2 text-white bg-green-600 px-3 py-2 rounded w-full text-sm font-medium"
      >
        Agregar Ingresos
      </button>
    </div>
  );
};

export default IncomeCard;
