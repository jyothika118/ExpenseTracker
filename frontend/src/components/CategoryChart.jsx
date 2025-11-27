// src/components/CategoryChart.jsx
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ expenses }) {
  const { labels, data } = useMemo(() => {
    const map = {};
    (expenses || []).forEach(e => {
      const cat = e.category || 'Others';
      map[cat] = (map[cat] || 0) + Number(e.amount || 0);
    });
    const labels = Object.keys(map);
    const data = labels.map(l => map[l]);
    return { labels, data };
  }, [expenses]);

  const chartData = {
    labels,
    datasets: [{ data }],
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto 20px' }}>
      <h3>Expenses by Category</h3>
      <Doughnut data={chartData} />
    </div>
  );
}
