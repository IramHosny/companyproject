import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPromotion } from '../redux/promotionSlice';
import { useNavigate } from 'react-router-dom';

function AddPromotion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    pourcentage: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.pourcentage) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    dispatch(addPromotion(form));
    setForm({ title: '', description: '', pourcentage: '' }); // Réinitialisation
    navigate('/admin/promotions'); // ou juste setShowForm(false) si tu veux rester ici
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Ajouter une Promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="pourcentage"
          value={form.pourcentage}
          onChange={handleChange}
          placeholder="Pourcentage (%)"
          className="w-full p-2 border rounded"
          min="1"
          max="100"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddPromotion;
