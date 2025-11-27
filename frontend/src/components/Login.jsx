import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import "../styling/form.css";

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      if(res.data.error) { alert(res.data.error); return; }
      onLogin(res.data);
      nav('/dashboard');
    } catch(err){ console.error(err); alert('Login failed'); }
  };

  return (
    <div className="form-container">
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}
