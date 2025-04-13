// src/components/BudgetChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart features
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const BudgetChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.suggestedAmount, 0);

  // Generates N grey shades from dark to light
    const generateGreyShades = (count) => {
        const shades = [];
        const step = Math.floor(255 / (count + 1));
        for (let i = 1; i <= count; i++) {
        const value = step * i;
        const hex = value.toString(16).padStart(2, '0');
        shades.push(`#${hex}${hex}${hex}`);
        }
        return shades;
    };
  

    const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.suggestedAmount),
        backgroundColor: generateGreyShades(data.length),
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
              color: '#000', // white text
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return `${percent}%`;
        },
        color: '#FFF', // fill color (inside text)
        textStrokeColor: '#000', // 🖤 stroke around text
        textStrokeWidth: 2,      // 👈 how thick the stroke is
        font: {
          weight: 'bold',
          size: 14
        }
      }
    }
  };
  
  

  return (
    <div style={{ maxWidth: '400px', margin: '1rem auto' }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default BudgetChart;
