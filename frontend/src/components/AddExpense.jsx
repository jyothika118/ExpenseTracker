import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import "../styling/addExpense.css";
export default function AddExpense({ user }){
  const [form, setForm] = useState({ title:'', amount:'', category:'Food', date:'' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses", {
  title: form.title,
  amount: Number(form.amount),
  category: form.category,
  date: form.date,
  userId: user.id
});


      alert('Saved');
      nav('/view-expenses');
    } catch(err){ console.error(err); alert('Failed to save'); }
  };

  return (
    <div className="add-container">
    <form onSubmit={submit}>
      <h2>Add Expense</h2>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
      <input placeholder="Amount" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} required />
      <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
        <option>Food</option><option>Travel</option><option>Shopping</option><option>Others</option>
      </select>
      <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required />
      <button type="submit">Save</button>
    </form>
    </div>
  );
}
