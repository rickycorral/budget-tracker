import React from "react";

interface ExpenseCardProps {
  totalExpenses: number;
  expenseInput: string;
  setExpenseInput: (input: string) => void;
  descriptionInput: string;
  setDescriptionInput: (input: string) => void;
  dateInput: string;
  setDateInput: (input: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleAddExpense: () => void;
  handleSaveEditedExpense: () => void;  // Add this line
  editingExpense: { categoryIndex: number; expenseIndex: number } | null;  // Add this line if it wasn't present
  expenseCategories: { name: string }[];
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  totalExpenses,
  expenseInput,
  setExpenseInput,
  descriptionInput,
  setDescriptionInput,
  dateInput,
  setDateInput,
  selectedCategory,
  setSelectedCategory,
  handleAddExpense,
  handleSaveEditedExpense,  // Add this line
  editingExpense,  // Add this line if it wasn't present
  expenseCategories,
}) => {
  return (
    <div className="expense-card">
      <h2 className="expense-card-header">Agregar Gasto</h2>
      <p>Total Gastos: {totalExpenses}</p>
      <div className="form-row">
        <label>Categoría</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Seleccionar Categoría</option>
          {expenseCategories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Monto</label>
        <input
          type="number"
          value={expenseInput}
          onChange={(e) => setExpenseInput(e.target.value)}
          placeholder="Ingrese el monto"
        />
      </div>
      <div className="form-row">
        <label>Descripción</label>
        <input
          type="text"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          placeholder="Descripción del gasto"
        />
      </div>
      <div className="form-row">
        <label>Fecha</label>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </div>
      <button onClick={handleAddExpense} className="expense-card-button">
        Agregar Gasto
      </button>
      {editingExpense && (
        <button onClick={handleSaveEditedExpense} className="expense-card-button">
          Guardar Cambios
        </button>
      )}
    </div>
  );
};

export default ExpenseCard;
