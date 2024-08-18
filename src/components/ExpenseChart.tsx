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
          "#006400", // Dark Green
          "#7FFF00", // Chartreuse
          "#ADFF2F", // Green Yellow
        ],
        hoverBackgroundColor: [
          "#00FF00", // Bright Lime Green
          "#32CD32", // Lime Green
          "#228B22", // Forest Green
          "#006400", // Dark Green
          "#7FFF00", // Chartreuse
          "#ADFF2F", // Green Yellow
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Position the legends above the chart
        align: "center" as const, // Center the legends horizontally
        labels: {
          font: {
            size: 12, // Small font size for the legends
            weight: "bold" as const, // Use 'bold' as a recognized font weight
          },
          boxWidth: 20, // Small legend color boxes
          padding: 10, // Padding around each legend item
          color: "grey",
          generateLabels: function (chart: any) {
            const originalLabels = ChartJS.overrides.pie.plugins.legend.labels.generateLabels(chart);
            return originalLabels.map((label) => ({
              ...label,
              text: ` ${label.text} `, // Adding space around text for padding
              boxWidth: 20,
              padding: 10,
              color: "grey", // Font color
              strokeStyle: "#F0F8FF", // Light green background for the labels
            }));
          },
        },
      },
    },
    maintainAspectRatio: false, // Allow manual size control
    responsive: true,
  };

  return (
    <div className="expense-chart-card">
      <div className="graph-container">
        <Pie data={data} options={options} width={50} height={50} />
      </div>
    </div>
  );
};

export default ExpenseChart;
