import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    // Generate dynamic background colors based on the values
    const backgroundColor = values.map((value) => {
      // Define your custom logic for assigning colors based on the value
      if (value > 0.5) {
        return "rgba(245, 69, 66, 0.7)"; // Red color
      } else if (value > 0.3) {
        return "rgba(227, 205, 9, 0.7)"; // Yellow color
      } else {
        return "rgba(8, 161, 41, 0.7)"; // Green color
      }
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: "Data",
          data: values,
          backgroundColor,
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
