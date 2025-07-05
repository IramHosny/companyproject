import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPromotion } from '../redux/promotionSlice';
import { getarticle } from '../redux/articleSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddPromotion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector((state) => state.article.articlelist || []);

  const [form, setForm] = useState({
    title: '',
    description: '',
    pourcentage: '',
    articleId: '', // facultatif
  });

  useEffect(() => {
    dispatch(getarticle());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, pourcentage } = form;
    if (!title || !description || !pourcentage) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    // Nettoyer l'objet avant envoi
    const dataToSend = { ...form };
    if (!dataToSend.articleId) {
      delete dataToSend.articleId;
    }

    try {
      await dispatch(addPromotion(dataToSend));
      Swal.fire('Succès', 'Promotion ajoutée avec succès.', 'success');
      setForm({ title: '', description: '', pourcentage: '', articleId: '' });
      navigate('/admin/promotions');
    } catch (error) {
      Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">🎉 Ajouter une Promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre de la promotion"
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

        <select
          name="articleId"
          value={form.articleId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">🔗 Aucun article associé (optionnel)</option>
          {articles.map((art) => (
            <option key={art._id} value={art._id}>
              {art.name || art.nom}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Ajouter la Promotion
        </button>
      </form>
    </div>
  );
}

export default AddPromotion;
