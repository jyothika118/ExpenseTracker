import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({username:'', email:'', password:'', confirm:''});
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if(form.password !== form.confirm){ alert('Passwords do not match'); return; }
    try {
      await api.post('/register', { username: form.username, email: form.email, password: form.password });
      alert('Registered — please login');
      nav('/login');
    } catch(err){ console.error(err); alert('Registration failed'); }
  };

  return (
     <div className="form-container">
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} required />
      <button type="submit">Register</button>
    </form>
    </div>
  );
}
