import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePromotion } from '../redux/promotionSlice';

function EditPromotions({ promo, onCancel }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: promo?.title || '',
    description: promo?.description || '',
    pourcentage: promo?.pourcentage || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePromotion({ id: promo._id, updatedPromo: form }));
    if (onCancel) onCancel(); // ✅ appel correct ici
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Modifier la Promotion</h2>
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
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Modifier
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPromotions;
