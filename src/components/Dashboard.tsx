import React, { useState } from "react";
import BudgetCard from "./BudgetCard";
import IncomeCard from "./IncomeCard";
import ExpenseCard from "./ExpenseCard";
import CategoryCard from "./CategoryCard";
import ExpenseChart from "./ExpenseChart";
import "../Dashboard.css";

export interface ExpenseCategory {
  name: string;
  budget: number | null;
  expenses: { amount: number; description: string; date: string }[];
}

const Dashboard: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState("");
  const [incomeInput, setIncomeInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Selecciona la Categoría"
  );
  const [editingExpense, setEditingExpense] = useState<number | null>(null);

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    [
      { name: "Renta", budget: null, expenses: [] },
      { name: "Alimentos", budget: null, expenses: [] },
      { name: "Transporte", budget: null, expenses: [] },
      { name: "Servicios", budget: null, expenses: [] },
      { name: "Entretenimiento", budget: null, expenses: [] },
      { name: "Medicinas", budget: null, expenses: [] },
      { name: "Escuela", budget: null, expenses: [] },
      { name: "Ahorros", budget: null, expenses: [] },
    ]
  );

  const handleAddIncome = () => {
    const incomeValue = parseFloat(incomeInput);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert("Por favor ingrese un monto de ingresos válido y positivo.");
      return;
    }
    setTotalIncome(totalIncome + incomeValue);
    setIncomeInput("");
  };

  const handleAddExpense = () => {
    const expenseValue = parseFloat(expenseInput);
    if (isNaN(expenseValue) || expenseValue <= 0) {
      alert("Por favor ingrese un monto de gasto válido y positivo.");
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
              date: dateInput || new Date().toLocaleDateString(),
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
      <div className="flex justify-between items-start gap-4">
        <BudgetCard
          isEditingBudget={isEditingBudget}
          monthlyBudget={monthlyBudget}
          monthlyBudgetInput={monthlyBudgetInput}
          setMonthlyBudgetInput={setMonthlyBudgetInput}
          setMonthlyBudget={setMonthlyBudget}
          setIsEditingBudget={setIsEditingBudget}
        />
        {/* Hide Ingresos Totales Card */}
        {false && (
          <IncomeCard
            totalIncome={totalIncome}
            incomeInput={incomeInput}
            setIncomeInput={setIncomeInput}
            handleAddIncome={handleAddIncome}
          />
        )}
      </div>

      <div className="flex justify-between items-start gap-4">
        <ExpenseCard
          totalExpenses={totalExpenses}
          expenseInput={expenseInput}
          descriptionInput={descriptionInput}
          dateInput={dateInput}
          selectedCategory={selectedCategory}
          setExpenseInput={setExpenseInput}
          setDescriptionInput={setDescriptionInput}
          setDateInput={setDateInput}
          setSelectedCategory={setSelectedCategory}
          handleAddExpense={handleAddExpense}
          editingExpense={editingExpense}
          handleSaveEditedExpense={handleSaveEditedExpense}
          expenseCategories={expenseCategories}
        />
        <div className="graph-section">
          <h2 className="text-lg font-semibold">Distribución de Gastos</h2>
          <div className="graph-container">
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
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {expenseCategories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            handleEditExpense={() => handleEditExpense(index)}
            handleDeleteExpense={() => handleDeleteExpense(index)}
            calculatePercentage={(amount, budget) =>
              calculatePercentage(amount, budget)
            }
            alertThreshold={80}
            handleSetBudget={(budgetValue) =>
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
