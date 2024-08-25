import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/expense-chart.css"; // Ensure you import the correct CSS file

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  categories: { name: string; amount: number; description: string }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.amount),
        backgroundColor: [
          "#00FF00", "#32CD32", "#228B22", "#87CEEB",
          "#4169E1", "#DAA520", "#DC143C", "#FF4500",
        ],
        hoverBackgroundColor: [
          "#00FF00", "#32CD32", "#228B22", "#87CEEB",
          "#4169E1", "#DAA520", "#DC143C", "#FF4500",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "center" as const,
        labels: {
          font: {
            size: 14,
            weight: "bold" as const,
          },
          boxWidth: 25,
          padding: 20,
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw || 0;
            return `$${value.toFixed(2)}`;
          },
          afterLabel: function (tooltipItem: any) {
            const descriptions = categories[tooltipItem.dataIndex].description.split(', ');
            return descriptions.map(desc => `• ${desc}`).join('\n');
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1,
  };

  return (
    <div className={`expense-chart-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="chart-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="chart-title">Gastos por Categoría</h3>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="expand-icon" />
      </div>
      {isExpanded && (
        <div className="graph-container">
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
