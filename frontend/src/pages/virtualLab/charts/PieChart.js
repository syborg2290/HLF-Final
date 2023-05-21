import React from "react";
import { Bar } from "react-chartjs-2";

const ComplexChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Data",
        data: Object.values(data),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    legend: {
      display: true,
      position: "bottom",
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComplexChart;
