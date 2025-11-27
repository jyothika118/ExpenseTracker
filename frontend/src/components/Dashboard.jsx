import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../styling/dashboard.css";
import api from '../utils/api';

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [totalExpense, setTotalExpense] = useState(0);

  // ASSUME monthly income = 50000
  const monthlyIncome = 50000;
  const balance = monthlyIncome - totalExpense;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await api.get(`/expenses/total/${user.id}`);
        setTotalExpense(res.data.total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotal();
  }, [user.id]);

  return (
    <div className="dashboard-container">
      
      <header className="dashboard-header">
        <h1>ExpenseTracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-welcome">
        Welcome, {user.username}
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpense.toFixed(2)}</p>
        </div>

        <div className="summary-card">
          <h3>Balance</h3>
          <p>₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="dashboard-buttons">
        <Link to="/add-expense">
          <button className="dashboard-btn">Add Expense</button>
        </Link>

        <Link to="/view-expenses">
          <button className="dashboard-btn">View Expenses</button>
        </Link>
      </div>

    </div>
  );
}
