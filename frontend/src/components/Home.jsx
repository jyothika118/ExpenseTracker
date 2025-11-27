// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/home.css';

export default function Home({ user }) {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header" role="banner">
        <div className="home-header-left">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <strong>ExpenseTracker</strong>
          </Link>
        </div>

        <div className="home-header-right">
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', marginRight: 12 }}>
            <span style={{ cursor: 'pointer' }}>About Us</span>
          </Link>

          {/* If user already logged in show Dashboard/Logout else show Login/Register */}
          {user ? (
            <>
              <Link to="/dashboard">
                <button style={{ marginLeft: 8 }}>Dashboard</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button style={{ marginLeft: 8 }}>Register</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Center content */}
      <main className="home-content" role="main">
        <div style={{ textAlign: 'center', maxWidth: 800, padding: '0 20px' }}>
          <div style={{ fontSize: 40, lineHeight: 1.05 }}>
            Manage your expenses simply.
          </div>
          <div style={{ marginTop: 14, fontSize: 18, fontWeight: 400 }}>
            Add transactions, track totals, and control your spending — all in one clean app.
          </div>

          <div style={{ marginTop: 28 }}>
            {user ? (
              <Link to="/dashboard">
                <button style={{ padding: '12px 22px', borderRadius: 8, fontWeight: 700 }}>
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button style={{ padding: '12px 22px', borderRadius: 8, fontWeight: 700, marginRight: 12 }}>
                    Get Started
                  </button>
                </Link>
                <Link to="/login">
                  <button style={{ padding: '12px 18px', borderRadius: 8, fontWeight: 700 }}>
                    Sign in
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
