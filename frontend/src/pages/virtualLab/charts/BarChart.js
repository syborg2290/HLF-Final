import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Data",
          data: Object.values(data),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 4,
          },
        },
      },
    };

    const myChart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
