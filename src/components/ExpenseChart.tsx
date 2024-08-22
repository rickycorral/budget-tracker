import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  categories: { name: string; amount: number }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ categories }) => {
  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.amount),
        backgroundColor: [
          "#00FF00", // Bright Lime Green
          "#32CD32", // Lime Green
          "#228B22", // Forest Green
          "#87CEEB", // Sky Blue
          "#4169E1", // Royal Blue
          "#DAA520", // Goldenrod
          "#DC143C", // Crimson
          "#FF4500", // Orange Red
        ],
        hoverBackgroundColor: [
          "#00FF00",
          "#32CD32",
          "#228B22",
          "#87CEEB",
          "#4169E1",
          "#DAA520",
          "#DC143C",
          "#FF4500",
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
          padding: 20, // Increased padding for better spacing
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: function (value: number, context: any) {
          const total = context.chart.data.datasets[0].data.reduce(
            (sum: number, data: number) => sum + data,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 1, // Maintain square aspect ratio
  };

  return (
    <div className="expense-chart-card">
      <div className="graph-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
