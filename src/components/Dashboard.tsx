import React, { useState } from "react";
import ExpenseChart from "./ExpenseChart";
import CategoryCard from "./CategoryCard";
import "../Dashboard.css"; // Import the custom CSS file

interface ExpenseCategory {
  name: string;
  budget: number | null;
  expenses: { amount: number; description: string; date: string }[];
}

const Dashboard: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [incomeInput, setIncomeInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetInputs, setBudgetInputs] = useState<{ [key: number]: string }>(
    {}
  );
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    [
      { name: "Vivienda", budget: null, expenses: [] },
      { name: "Alimentos", budget: null, expenses: [] },
      { name: "Transporte", budget: null, expenses: [] },
      { name: "Servicios", budget: null, expenses: [] },
      { name: "Entretenimiento", budget: null, expenses: [] },
      { name: "Salud", budget: null, expenses: [] },
    ]
  );

  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null);
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState("");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editingExpense, setEditingExpense] = useState<number | null>(null);

  const alertThreshold = 0.9;

  const handleAddIncome = () => {
    const incomeValue = parseFloat(incomeInput);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert("Por favor, ingresa un ingreso válido.");
      return;
    }
    setTotalIncome(totalIncome + incomeValue);
    setIncomeInput("");
  };

  const handleAddExpense = () => {
    const expenseValue = parseFloat(expenseInput);
    if (isNaN(expenseValue) || expenseValue <= 0) {
      alert("Por favor, ingresa un gasto válido.");
      return;
    }

    const updatedCategories = expenseCategories.map((category) => {
      if (category.name === selectedCategory) {
        return {
          ...category,
          expenses: [
            ...category.expenses,
            {
              amount: expenseValue,
              description: descriptionInput,
              date: dateInput,
            },
          ],
        };
      }
      return category;
    });

    setTotalExpenses(totalExpenses + expenseValue);
    setExpenseCategories(updatedCategories);
    setExpenseInput("");
    setDescriptionInput("");
    setDateInput("");
  };

  const handleSetBudget = (index: number, budgetValue: number) => {
    const updatedCategories = [...expenseCategories];
    updatedCategories[index].budget = budgetValue;
    setExpenseCategories(updatedCategories);
  };

  const handleEditExpense = (index: number) => {
    setEditingExpense(index);
    const selectedExpense = expenseCategories[index].expenses[0];
    setSelectedCategory(expenseCategories[index].name);
    setExpenseInput(selectedExpense.amount.toString());
    setDescriptionInput(selectedExpense.description);
    setDateInput(selectedExpense.date);
  };

  const handleSaveEditedExpense = () => {
    if (editingExpense === null) return;

    const updatedCategories = expenseCategories.map((category, index) => {
      if (index === editingExpense) {
        return {
          ...category,
          expenses: category.expenses.map((expense, idx) =>
            idx === 0
              ? {
                  amount: parseFloat(expenseInput),
                  description: descriptionInput,
                  date: dateInput,
                }
              : expense
          ),
        };
      }
      return category;
    });

    const updatedTotalExpenses = updatedCategories.reduce(
      (total, category) =>
        total +
        category.expenses.reduce((sum, expense) => sum + expense.amount, 0),
      0
    );

    setExpenseCategories(updatedCategories);
    setTotalExpenses(updatedTotalExpenses);
    setEditingExpense(null);
    setExpenseInput("");
    setDescriptionInput("");
    setDateInput("");
  };

  const handleDeleteExpense = (index: number) => {
    const updatedCategories = expenseCategories.map((category, idx) => {
      if (idx === index) {
        return { ...category, expenses: [] };
      }
      return category;
    });

    const updatedTotalExpenses = updatedCategories.reduce(
      (total, category) =>
        total +
        category.expenses.reduce((sum, expense) => sum + expense.amount, 0),
      0
    );

    setExpenseCategories(updatedCategories);
    setTotalExpenses(updatedTotalExpenses);
  };

  const calculatePercentage = (
    amount: number,
    budget: number | null
  ): number => {
    return budget && budget > 0 ? (amount / budget) * 100 : 0;
  };

  return (
    <section className="dashboard-bg mt-4 p-4 rounded-lg shadow">
      {/* Flexbox layout for the Set Budget card and Graph */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="bg-green-200 p-4 rounded-lg shadow mt-4">
            <h3 className="text-sm font-medium">
              Establecer Presupuesto Mensual
            </h3>
            {isEditingBudget ? (
              <input
                type="number"
                value={monthlyBudgetInput}
                onChange={(e) => setMonthlyBudgetInput(e.target.value)}
                className="mt-2 p-1 border rounded w-full"
                placeholder="Ingresa el presupuesto mensual"
              />
            ) : (
              <p className="text-sm mt-2">
                Presupuesto: $
                {monthlyBudget !== null
                  ? monthlyBudget.toFixed(2)
                  : "No establecido"}
              </p>
            )}
            <button
              onClick={() => {
                if (isEditingBudget) {
                  setMonthlyBudget(parseFloat(monthlyBudgetInput));
                  setIsEditingBudget(false);
                } else {
                  setIsEditingBudget(true);
                }
              }}
              className="mt-2 text-white bg-green-500 px-2 py-1 rounded w-full"
            >
              {isEditingBudget || monthlyBudget === null
                ? "Establecer Presupuesto"
                : "Editar Presupuesto"}
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <ExpenseChart
            categories={expenseCategories.map((category) => ({
              name: category.name,
              amount: category.expenses.reduce(
                (sum, expense) => sum + expense.amount,
                0
              ),
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-green-400 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium">Ingresos Totales</h3>
          <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
          <input
            type="number"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
            placeholder="Ingresa los ingresos"
          />
          <button
            onClick={handleAddIncome}
            className="mt-2 text-white bg-green-600 px-2 py-1 rounded w-full"
          >
            Agregar Ingresos
          </button>
        </div>

        <div className="bg-green-500 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium">Gastos Totales</h3>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
          >
            <option value="" disabled hidden>
              Selecciona la Categoría
            </option>
            {expenseCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={expenseInput}
            onChange={(e) => setExpenseInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
            placeholder="Ingresa el gasto"
          />
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
            placeholder="Ingresa la descripción"
          />
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="mt-2 p-1 border rounded w-full"
          />
          <button
            onClick={
              editingExpense !== null
                ? handleSaveEditedExpense
                : handleAddExpense
            }
            className="mt-2 text-white bg-green-600 px-2 py-1 rounded w-full"
          >
            {editingExpense !== null ? "Guardar Gasto" : "Agregar Gasto"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        {monthlyBudget !== null && totalExpenses > monthlyBudget && (
          <p className="text-red-600 font-semibold">
            ¡Advertencia: Has excedido tu presupuesto mensual!
          </p>
        )}
        {monthlyBudget !== null &&
          totalExpenses >= monthlyBudget * 0.9 &&
          totalExpenses <= monthlyBudget && (
            <p className="text-yellow-600 font-semibold">
              Cuidado: Estás acercándote a tu límite de presupuesto mensual.
            </p>
          )}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {expenseCategories.map((category, index) => (
          <CategoryCard
            key={index}
            index={index}
            category={category}
            handleEditExpense={() => handleEditExpense(index)}
            handleDeleteExpense={() => handleDeleteExpense(index)}
            calculatePercentage={(amount, budget) =>
              calculatePercentage(amount, budget)
            }
            alertThreshold={alertThreshold}
            handleSetBudget={(index, budgetValue) =>
              handleSetBudget(index, budgetValue)
            }
            cardColor="bg-green-200"
          />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
