import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faChevronDown,
  faFrog,
} from "@fortawesome/free-solid-svg-icons";
import "../css/savings-card.css";

interface Expense {
  amount: number;
  description: string;
  date: string;
}

interface SavingsCardProps {
  budget: number | null;
  expenses: Expense[];
  handleAddExpense: (newExpense: Expense) => void;
  handleEditExpense: (index: number) => void;
  handleDeleteExpense: (index: number) => void;
  handleSetBudget: (budget: number) => void;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  expenses,
  handleAddExpense,
  handleEditExpense,
  handleDeleteExpense,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const onAddExpense = () => {
    if (!amount || isNaN(parseFloat(amount)) || !description || !date) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const newExpense: Expense = {
      amount: parseFloat(amount),
      description,
      date: date || new Date().toISOString().split("T")[0],
    };

    handleAddExpense(newExpense);
    setAmount("");
    setDescription("");
    setDate("");
  };

  return (
    <div className={`savings-card ${expanded ? "expanded" : "collapsed"}`}>
      <div className="savings-card-header" onClick={toggleExpand}>
        <FontAwesomeIcon icon={faFrog} className="fa-frog" />
        <span>Ahorros</span>
        <FontAwesomeIcon icon={faChevronDown} className="expand-icon" />
      </div>

      {expanded && (
        <div className="savings-card-content">
          <div className="form-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Cantidad de Ahorro"
              className="styled-input"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="styled-input"
            />
          </div>
          <button onClick={onAddExpense} className="savings-card-button">
            Agregar Ahorro
          </button>

          {/* List of savings */}
          <ul className="expense-list">
            {expenses.map((expense, index) => (
              <li key={index} className="expense-item">
                <span>{expense.description}</span>
                <span>${expense.amount.toFixed(2)}</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
                <div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="action-icon"
                    onClick={() => handleEditExpense(index)}
                    title="Editar Ahorro"
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="action-icon"
                    onClick={() => handleDeleteExpense(index)}
                    title="Eliminar Ahorro"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavingsCard;
