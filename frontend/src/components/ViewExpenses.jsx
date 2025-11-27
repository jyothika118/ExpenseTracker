// src/components/ViewExpenses.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import "../styling/table.css";
import MonthlyChart from './MonthlyChart';
import CategoryChart from './CategoryChart';
import "../styling/viewExpenses.css";
export default function ViewExpenses({ user }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get(`/expenses/user/${user.id}`);
        // ensure amounts are numbers and dates in YYYY-MM-DD format
        const sorted = (res.data || []).slice().sort((a,b) => new Date(b.date) - new Date(a.date));
        setExpenses(sorted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
  }, [user.id]);

  const total = expenses.reduce((s, e) => s + (e.amount ? Number(e.amount) : 0), 0);

  const handleDelete = async (id) => {
    if (!confirm('Delete expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="view-container">
    <div style={{ padding: '20px' }}>
      {/* Charts */}
      <MonthlyChart expenses={expenses} />
      <CategoryChart expenses={expenses} />

      {/* Table */}
      <div className="table-container">
        <h2>Recent Transactions</h2>
        <table>
          <thead><tr><th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{Number(e.amount).toFixed(2)}</td>
                <td>{e.category}</td>
                <td>{e.date}</td>
                <td><button onClick={() => handleDelete(e.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-box" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <strong>Total Expense:</strong>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
    </div>
  );
}
