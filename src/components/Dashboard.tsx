import React, { useState, useEffect } from "react";
import BudgetCard from "./BudgetCard";
import ExpenseCard from "./ExpenseCard";
import CategoryCard from "./CategoryCard";
import ExpenseChart from "./ExpenseChart";
import "../css/main.css";
import Header from "./Header";

export interface ExpenseCategory {
  name: string;
  budget: number | null;
  expenses: { amount: number; description: string; date: string }[];
}

const Dashboard: React.FC = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Selecciona la Categoría");
  const [editingExpense, setEditingExpense] = useState<{
    categoryIndex: number;
    expenseIndex: number;
  } | null>(null);

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    () => {
      const savedCategories = localStorage.getItem("expenseCategories");
      return savedCategories ? JSON.parse(savedCategories) : [
        { name: "Renta", budget: null, expenses: [] },
        { name: "Alimentos", budget: null, expenses: [] },
        { name: "Transporte", budget: null, expenses: [] },
        { name: "Servicios", budget: null, expenses: [] },
        { name: "Entretenimiento", budget: null, expenses: [] },
        { name: "Medicinas", budget: null, expenses: [] },
        { name: "Escuela", budget: null, expenses: [] },
        { name: "Ahorros", budget: null, expenses: [] },
      ];
    }
  );

  useEffect(() => {
    const savedBudget = localStorage.getItem("monthlyBudget");
    if (savedBudget) setMonthlyBudget(parseFloat(savedBudget));
  }, []);

  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget?.toString() || "");
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  }, [monthlyBudget, expenseCategories]);

  const totalExpenses = expenseCategories.reduce(
    (total, category) =>
      total +
      category.expenses.reduce((sum, expense) => sum + expense.amount, 0),
    0
  );

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

    setExpenseCategories(updatedCategories);
    resetExpenseForm();
  };

  const resetExpenseForm = () => {
    setExpenseInput("");
    setDescriptionInput("");
    setDateInput("");
    setSelectedCategory("Selecciona la Categoría");
    setEditingExpense(null);
  };

  const handleEditExpense = (categoryIndex: number, expenseIndex: number) => {
    const selectedCategory = expenseCategories[categoryIndex];
    const selectedExpense = selectedCategory.expenses[expenseIndex];

    setSelectedCategory(selectedCategory.name);
    setExpenseInput(selectedExpense.amount.toString());
    setDescriptionInput(selectedExpense.description);
    setDateInput(selectedExpense.date);

    setEditingExpense({ categoryIndex, expenseIndex });
  };

  const handleSaveEditedExpense = () => {
    if (!editingExpense) return;

    const { categoryIndex, expenseIndex } = editingExpense;
    const updatedCategories = [...expenseCategories];

    updatedCategories[categoryIndex].expenses[expenseIndex] = {
      amount: parseFloat(expenseInput),
      description: descriptionInput,
      date: dateInput,
    };

    setExpenseCategories(updatedCategories);
    resetExpenseForm();
  };

  const handleDeleteExpense = (categoryIndex: number, expenseIndex: number) => {
    const updatedCategories = expenseCategories.map((category, idx) => {
      if (idx === categoryIndex) {
        return {
          ...category,
          expenses: category.expenses.filter(
            (_, expIdx) => expIdx !== expenseIndex
          ),
        };
      }
      return category;
    });

    setExpenseCategories(updatedCategories);
  };

  const handleSetBudget = (categoryIndex: number, budgetValue: number) => {
    const updatedCategories = expenseCategories.map((category, idx) => {
      if (idx === categoryIndex) {
        return {
          ...category,
          budget: budgetValue,
        };
      }
      return category;
    });

    setExpenseCategories(updatedCategories);
  };

  const calculatePercentage = (
    amount: number,
    budget: number | null
  ): number => {
    return budget && budget > 0 ? (amount / budget) * 100 : 0;
  };

  return (
    <section className="dashboard-bg mt-4 p-4 rounded-lg shadow">
      <Header />
      <div className="flex justify-between items-start gap-4">
        <BudgetCard
          isEditingBudget={isEditingBudget}
          monthlyBudget={monthlyBudget}
          monthlyBudgetInput={monthlyBudgetInput}
          setMonthlyBudgetInput={setMonthlyBudgetInput}
          setMonthlyBudget={setMonthlyBudget}
          setIsEditingBudget={setIsEditingBudget}
        />
      </div>

      <div className="graph-and-expenses-container">
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
          handleSaveEditedExpense={handleSaveEditedExpense} 
          editingExpense={editingExpense}
          expenseCategories={expenseCategories}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {expenseCategories.map((category, index) => (
          <CategoryCard
            key={index}
            category={category}
            calculatePercentage={(amount, budget) =>
              calculatePercentage(amount, budget)
            }
            alertThreshold={80}
            handleSetBudget={(budgetValue) =>
              handleSetBudget(index, budgetValue)
            }
            handleEditExpense={(expenseIndex) =>
              handleEditExpense(index, expenseIndex)
            }
            handleDeleteExpense={(expenseIndex) =>
              handleDeleteExpense(index, expenseIndex)
            }
            cardColor="bg-green-200"
          />
        ))}
      </div>

      <div className="graph-section mt-4">
        <ExpenseChart
          categories={expenseCategories.map((category) => ({
            name: category.name,
            amount: category.expenses.reduce(
              (sum, expense) => sum + expense.amount,
              0
            ),
            description: category.expenses
              .map((expense) => expense.description)
              .join(", "),
          }))}
        />
      </div>
    </section>
  );
};

export default Dashboard;
