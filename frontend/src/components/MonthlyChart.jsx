// src/components/MonthlyChart.jsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MonthlyChart({ expenses }) {
  // expenses: array with { amount, date } where date is 'YYYY-MM-DD'
  const { labels, data } = useMemo(() => {
    // prepare last 12 months labels (MM YYYY)
    const now = new Date();
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() }); // month 0-11
    }
    const labels = months.map(m => {
      const d = new Date(m.year, m.month, 1);
      return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
    });

    // zero initialize
    const totals = new Array(12).fill(0);
    (expenses || []).forEach(e => {
      if (!e.date) return;
      const d = new Date(e.date);
      // find index
      for (let i = 0; i < months.length; i++) {
        if (months[i].year === d.getFullYear() && months[i].month === d.getMonth()) {
          totals[i] += Number(e.amount || 0);
          break;
        }
      }
    });

    return { labels, data: totals };
  }, [expenses]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Expense',
        data,
        // colors are picked by chart defaults; do not force colors unless requested
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
      <h3>Expenses — Last 12 Months</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}
