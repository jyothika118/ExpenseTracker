import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import ViewExpenses from './components/ViewExpenses';
import { useState } from 'react';

function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogin = (userObj) => {
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* PROTECTED ROUTES → redirect to HOME instead of LOGIN */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} onLogout={handleLogout}/> : <Navigate to="/" />} 
        />

        <Route 
          path="/add-expense" 
          element={user ? <AddExpense user={user} /> : <Navigate to="/" />} 
        />

        <Route 
          path="/view-expenses" 
          element={user ? <ViewExpenses user={user}/> : <Navigate to="/" />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
